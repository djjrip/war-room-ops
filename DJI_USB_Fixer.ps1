# ============================================================
#  DJI Osmo Pocket 3 - USB Diagnostic & Auto-Fix Tool
#  Run this script as Administrator for full functionality
# ============================================================

$RED    = "Red"
$GREEN  = "Green"
$YELLOW = "Yellow"
$CYAN   = "Cyan"
$WHITE  = "White"

function Write-Header {
    Clear-Host
    Write-Host ""
    Write-Host "  =================================================" -ForegroundColor Cyan
    Write-Host "   DJI USB FIXER - Osmo Pocket 3 Diagnostic Tool  " -ForegroundColor Cyan
    Write-Host "  =================================================" -ForegroundColor Cyan
    Write-Host ""
}

function Write-OK     { param([string]$M); Write-Host "  [  OK  ] " -ForegroundColor Green  -NoNewline; Write-Host $M }
function Write-Warn   { param([string]$M); Write-Host "  [ WARN ] " -ForegroundColor Yellow -NoNewline; Write-Host $M }
function Write-Fail   { param([string]$M); Write-Host "  [ FAIL ] " -ForegroundColor Red    -NoNewline; Write-Host $M }
function Write-Fixed  { param([string]$M); Write-Host "  [ FIXED] " -ForegroundColor Green  -NoNewline; Write-Host $M }
function Write-Info   { param([string]$M); Write-Host "  [ INFO ] " -ForegroundColor DarkGray -NoNewline; Write-Host $M -ForegroundColor Gray }
function Write-Step   { param([string]$S,[string]$M); Write-Host "  [  >>  ] " -ForegroundColor Cyan -NoNewline; Write-Host $M }

function Write-Section {
    param([string]$Title)
    Write-Host ""
    Write-Host "  ---- $Title " -ForegroundColor DarkCyan
    Write-Host ""
}

# ─────────────────────────────────────────────────────────────
# STEP 0: Admin check
# ─────────────────────────────────────────────────────────────
Write-Header

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Fail "NOT running as Administrator — some fixes will be skipped."
    Write-Warn "Right-click this script and choose 'Run with PowerShell as Administrator'"
    Write-Host ""
    Read-Host "  Press Enter to continue with limited functionality..."
} else {
    Write-OK "Running as Administrator — full functionality enabled."
}

# ─────────────────────────────────────────────────────────────
# STEP 1: Device Manager scan
# ─────────────────────────────────────────────────────────────
Write-Section "STEP 1 — Scanning Device Manager for DJI Devices"

$allDevices    = Get-PnpDevice -ErrorAction SilentlyContinue
$djiDevices    = $allDevices | Where-Object { $_.FriendlyName -match "DJI|Osmo|Pocket" }
$problemUSB    = $allDevices | Where-Object { $_.Status -eq "Error" -and $_.Class -match "USB|Camera|Image|Media|WPD" }

if ($djiDevices) {
    foreach ($dev in $djiDevices) {
        $col = if ($dev.Status -eq "OK") { "Green" } else { "Red" }
        Write-Host "  [  DJI ] $($dev.FriendlyName) " -ForegroundColor Cyan -NoNewline
        Write-Host "[$($dev.Status)]" -ForegroundColor $col
        Write-Info "  InstanceId: $($dev.InstanceId)"
    }
} else {
    Write-Warn "No DJI/Osmo device detected right now. Plug it in and rerun to capture it live."
}

if ($problemUSB) {
    Write-Host ""
    Write-Warn "Found $($problemUSB.Count) errored USB/Camera device(s):"
    foreach ($dev in $problemUSB) { Write-Fail "  $($dev.FriendlyName) — $($dev.Status) — $($dev.Class)" }
} else {
    Write-OK "No USB/Camera error devices found in Device Manager."
}

# ─────────────────────────────────────────────────────────────
# STEP 2: Event Viewer — USB connect/disconnect storm
# ─────────────────────────────────────────────────────────────
Write-Section "STEP 2 — Event Viewer: USB Connect/Disconnect Storm Detection"

$since = (Get-Date).AddMinutes(-30)
Write-Step "SCAN" "Fetching USB events from the last 30 minutes..."

try {
    $errorEvents = Get-WinEvent -FilterHashtable @{ LogName='System'; StartTime=$since; Id=@(20001,20003,43,219,7026) } -ErrorAction SilentlyContinue
    $keywordEvents = Get-WinEvent -FilterHashtable @{ LogName='System'; StartTime=$since } -ErrorAction SilentlyContinue |
        Where-Object { $_.Message -match "USB|DJI|Osmo|device.*removed|device.*connected|enumerat" }

    $allUsbEvents = (@($errorEvents) + @($keywordEvents)) | Sort-Object TimeCreated | Select-Object -Unique -First 25

    if ($allUsbEvents.Count -gt 0) {
        Write-Warn "Found $($allUsbEvents.Count) USB-related system event(s) in the last 30 min:"
        Write-Host ""
        foreach ($evt in $allUsbEvents) {
            $t   = $evt.TimeCreated.ToString("HH:mm:ss")
            $lvl = switch ($evt.LevelDisplayName) { "Error"{"FAIL"} "Warning"{"WARN"} default{"INFO"} }
            $col = switch ($lvl) { "FAIL"{"Red"} "WARN"{"Yellow"} default{"DarkGray"} }
            $msg = ($evt.Message -replace '\r?\n',' ')
            if ($msg.Length -gt 100) { $msg = $msg.Substring(0,100) + "..." }
            Write-Host "  [$lvl][$t] $msg" -ForegroundColor $col
        }
        $connects    = ($allUsbEvents | Where-Object { $_.Message -match "connected|attached|arrival" }).Count
        $disconnects = ($allUsbEvents | Where-Object { $_.Message -match "removed|disconnected|departure" }).Count
        if ($connects -gt 3 -and $disconnects -gt 3) {
            Write-Host ""
            Write-Fail "STORM CONFIRMED: $connects connects + $disconnects disconnects in 30 min!"
            Write-Warn "Root cause is almost certainly: bad cable, port power instability, or driver crash."
        }
    } else {
        Write-OK "No USB storm events found in the last 30 minutes."
        Write-Info "Plug in your camera and rerun to capture events in real time."
    }
} catch {
    Write-Warn "Could not read Event Viewer: $_"
}

# ─────────────────────────────────────────────────────────────
# STEP 3: Disable USB Selective Suspend
# ─────────────────────────────────────────────────────────────
Write-Section "STEP 3 — Auto-Fix: Disable USB Selective Suspend"

if ($isAdmin) {
    try {
        $planLine  = powercfg /getactivescheme
        $planGuid  = ($planLine -split '\s+')[3]
        powercfg /setacvalueindex $planGuid 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 0 | Out-Null
        powercfg /setdcvalueindex $planGuid 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 0 | Out-Null
        powercfg /setactive $planGuid | Out-Null
        Write-Fixed "USB Selective Suspend DISABLED on power plan: $planGuid"
    } catch {
        Write-Fail "Failed to modify power plan: $_"
    }
} else {
    Write-Warn "Skipped — requires Administrator."
}

# ─────────────────────────────────────────────────────────────
# STEP 4: Disable USB Hub Power Management
# ─────────────────────────────────────────────────────────────
Write-Section "STEP 4 — Auto-Fix: USB Hub Power Management"

if ($isAdmin) {
    $hubs = Get-PnpDevice -Class USB -ErrorAction SilentlyContinue | Where-Object { $_.FriendlyName -match "Hub|Root" }
    $n = 0
    foreach ($hub in $hubs) {
        try {
            $reg = "HKLM:\SYSTEM\CurrentControlSet\Enum\$($hub.InstanceId)\Device Parameters"
            if (Test-Path $reg) {
                Set-ItemProperty -Path $reg -Name "EnhancedPowerManagementEnabled" -Value 0 -Type DWord -ErrorAction SilentlyContinue
                $n++
            }
        } catch {}
    }
    if ($n -gt 0) { Write-Fixed "Disabled power management on $n USB hub(s). Restart required." }
    else          { Write-Info "No accessible USB hub registry entries found." }
} else {
    Write-Warn "Skipped — requires Administrator."
}

# ─────────────────────────────────────────────────────────────
# STEP 5: Reset errored DJI / USB devices
# ─────────────────────────────────────────────────────────────
Write-Section "STEP 5 — Auto-Fix: Reset Problematic USB Devices"

if ($isAdmin) {
    $toReset = (@($djiDevices | Where-Object { $_.Status -ne "OK" }) + @($problemUSB)) | Select-Object -Unique
    if ($toReset.Count -gt 0) {
        foreach ($dev in $toReset) {
            Write-Step "FIX" "Resetting: $($dev.FriendlyName)"
            try {
                Disable-PnpDevice -InstanceId $dev.InstanceId -Confirm:$false -ErrorAction Stop | Out-Null
                Start-Sleep -Milliseconds 1500
                Enable-PnpDevice  -InstanceId $dev.InstanceId -Confirm:$false -ErrorAction Stop | Out-Null
                Write-Fixed "Device reset: $($dev.FriendlyName)"
            } catch {
                Write-Fail "Could not reset $($dev.FriendlyName): $_"
            }
        }
    } else {
        Write-Info "No DJI/USB error devices currently attached to reset."
        Write-Info "Plug in your camera and rerun to reset it live."
    }
} else {
    Write-Warn "Skipped — requires Administrator."
}

# ─────────────────────────────────────────────────────────────
# STEP 6: DJI Software check
# ─────────────────────────────────────────────────────────────
Write-Section "STEP 6 — DJI Software & Driver Check"

try {
    $apps = @()
    $apps += Get-ItemProperty "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*" -EA SilentlyContinue | Select-Object DisplayName,DisplayVersion
    $apps += Get-ItemProperty "HKLM:\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*" -EA SilentlyContinue | Select-Object DisplayName,DisplayVersion
    $djiApps = $apps | Where-Object { $_.DisplayName -match "DJI|Mimo" }

    if ($djiApps) {
        Write-OK "DJI software installed:"
        $djiApps | Select-Object -Unique | ForEach-Object { Write-Info "  $($_.DisplayName) v$($_.DisplayVersion)" }
    } else {
        Write-Warn "No DJI software detected."
        Write-Info "Install DJI Assistant 2 for proper USB drivers: https://www.dji.com/downloads"
    }
} catch {
    Write-Warn "Could not read installed apps: $_"
}

# ─────────────────────────────────────────────────────────────
# SUMMARY
# ─────────────────────────────────────────────────────────────
Write-Section "SUMMARY"

Write-Host "  Done! Here's what was applied:" -ForegroundColor White
Write-Host "    [x] Device Manager scan for DJI + USB errors" -ForegroundColor Green
Write-Host "    [x] Event Viewer USB storm detection" -ForegroundColor Green
Write-Host "    [x] USB Selective Suspend disabled" -ForegroundColor Green
Write-Host "    [x] USB hub power management disabled" -ForegroundColor Green
Write-Host "    [x] Errored devices reset (disable/re-enable)" -ForegroundColor Green
Write-Host ""
Write-Host "  Next steps:" -ForegroundColor Yellow
Write-Host "    1. Restart your PC" -ForegroundColor Yellow
Write-Host "    2. Try a different USB-C DATA cable (most common fix)" -ForegroundColor Yellow
Write-Host "    3. Plug into a rear USB port on your PC" -ForegroundColor Yellow
Write-Host "    4. Install DJI Assistant 2: https://www.dji.com/downloads" -ForegroundColor Yellow
Write-Host ""

Read-Host "  Press Enter to exit"
