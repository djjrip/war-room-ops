$desktop = "C:\Users\Jayson Quindao\Desktop"

# 1. Clean up old scattered shortcuts
$shortcutsToRemove = @(
    "$desktop\GAME MODE ON.lnk",
    "$desktop\RESTORE NORMAL MODE.lnk",
    "$desktop\PC COMMAND CENTER.lnk",
    "$desktop\🖥️ PC COMMAND CENTER.lnk"
)

foreach ($sc in $shortcutsToRemove) {
    if (Test-Path $sc) {
        Remove-Item -Path $sc -Force -ErrorAction SilentlyContinue
        Write-Host "Removed redundant shortcut: $sc"
    }
}

# 2. Build ONE Unified App Shortcut
$WshShell = New-Object -comObject WScript.Shell
$scPath = "$desktop\APEX OS.lnk"
$Shortcut = $WshShell.CreateShortcut($scPath)
$Shortcut.TargetPath = "powershell.exe"
# Start the APEX Mission Control App silently
$Shortcut.Arguments = "-ExecutionPolicy Bypass -WindowStyle Hidden -Command `"Set-Location 'C:\Users\Jayson Quindao\Desktop\GG LOOP\MISSION_CONTROL_APP'; npm start`""
$Shortcut.WorkingDirectory = "C:\Users\Jayson Quindao\Desktop\GG LOOP\MISSION_CONTROL_APP"
$Shortcut.Description = "Launch Unified APEX Operating System Hub"
$Shortcut.Save()

Write-Host "Unified APEX OS shortcut created successfully!"
