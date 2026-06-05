# Apply the remaining admin-level settings directly
$ErrorActionPreference = "SilentlyContinue"

# 1. Power plan - High Performance
$planList = powercfg /list
$hpLine = $planList | Where-Object { $_ -like "*High performance*" }
if ($hpLine) {
    $words = $hpLine -split '\s+'
    $guid = $words | Where-Object { $_ -match '^[0-9a-f]{8}-' } | Select-Object -First 1
    if ($guid) { powercfg /setactive $guid }
}
Write-Host "Power plan: $(powercfg /getactivescheme)"

# 2. HAGS
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" -Name "HwSchMode" -Value 2 -Type DWord
$hagsVal = (Get-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" -Name "HwSchMode").HwSchMode
Write-Host "HAGS value: $hagsVal (2 = enabled)"

# 3. MMCSS Game scheduling priority
$mmePath = "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile"
Set-ItemProperty -Path $mmePath -Name "SystemResponsiveness" -Value 0 -Type DWord
Set-ItemProperty -Path $mmePath -Name "NetworkThrottlingIndex" -Value 0xffffffff -Type DWord
$gameTaskPath = "$mmePath\Tasks\Games"
New-Item -Path $gameTaskPath -Force | Out-Null
Set-ItemProperty -Path $gameTaskPath -Name "GPU Priority" -Value 8 -Type DWord
Set-ItemProperty -Path $gameTaskPath -Name "Priority" -Value 6 -Type DWord
Set-ItemProperty -Path $gameTaskPath -Name "Scheduling Category" -Value "High" -Type String
Set-ItemProperty -Path $gameTaskPath -Name "SFIO Priority" -Value "High" -Type String
$sysResp = (Get-ItemProperty $mmePath -Name "SystemResponsiveness").SystemResponsiveness
Write-Host "MMCSS SystemResponsiveness: $sysResp (0 = max game priority)"

# 4. Nagle's Algorithm off
$tcpPath = "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces"
$ifaceCount = 0
Get-ChildItem $tcpPath | ForEach-Object {
    Set-ItemProperty -Path $_.PSPath -Name "TcpAckFrequency" -Value 1 -Type DWord -ErrorAction SilentlyContinue
    Set-ItemProperty -Path $_.PSPath -Name "TCPNoDelay" -Value 1 -Type DWord -ErrorAction SilentlyContinue
    $ifaceCount++
}
Write-Host "Nagle disabled on $ifaceCount interfaces"

# 5. Scheduled Task
$taskAction = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -WindowStyle Hidden -Command `"[System.GC]::Collect()`""
$taskTrigger = New-ScheduledTaskTrigger -Daily -At "3:00AM"
$taskSettings = New-ScheduledTaskSettingsSet -Hidden -RunOnlyIfIdle:$false -StartWhenAvailable
Register-ScheduledTask -TaskName "GGLoop-DailyCleanup" -Action $taskAction -Trigger $taskTrigger -Settings $taskSettings -RunLevel Highest -Force | Out-Null
$taskState = (Get-ScheduledTask -TaskName "GGLoop-DailyCleanup" -ErrorAction SilentlyContinue).State
Write-Host "Scheduled task state: $taskState"

Write-Host "Done."
