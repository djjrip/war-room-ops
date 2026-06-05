# Run as Administrator - applies HKLM registry settings
$ErrorActionPreference = "SilentlyContinue"

# HAGS - Hardware Accelerated GPU Scheduling
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" -Name "HwSchMode" -Value 2 -Type DWord
$hags = (Get-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" -Name "HwSchMode").HwSchMode
Write-Host "HAGS: $hags (want 2)"

# MMCSS - Game scheduling priority
$mme = "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile"
Set-ItemProperty -Path $mme -Name "SystemResponsiveness" -Value 0 -Type DWord
Set-ItemProperty -Path $mme -Name "NetworkThrottlingIndex" -Value 4294967295 -Type DWord
$sysResp = (Get-ItemProperty $mme -Name "SystemResponsiveness").SystemResponsiveness
Write-Host "SystemResponsiveness: $sysResp (want 0)"

$games = "$mme\Tasks\Games"
New-Item -Path $games -Force | Out-Null
Set-ItemProperty -Path $games -Name "Priority"            -Value 6      -Type DWord
Set-ItemProperty -Path $games -Name "GPU Priority"        -Value 8      -Type DWord
Set-ItemProperty -Path $games -Name "Scheduling Category" -Value "High" -Type String
Set-ItemProperty -Path $games -Name "SFIO Priority"       -Value "High" -Type String
Set-ItemProperty -Path $games -Name "Affinity"            -Value 0      -Type DWord
Set-ItemProperty -Path $games -Name "Clock Rate"          -Value 10000  -Type DWord
Set-ItemProperty -Path $games -Name "Background Only"     -Value "False"-Type String
Write-Host "Game task priority: set"

# Scheduled cleanup task
$action   = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-WindowStyle Hidden -Command [System.GC]::Collect()"
$trigger  = New-ScheduledTaskTrigger -Daily -At "3:00AM"
$settings = New-ScheduledTaskSettingsSet -Hidden -StartWhenAvailable -RunOnlyIfIdle:$false
Register-ScheduledTask -TaskName "GGLoop-DailyCleanup" -Action $action -Trigger $trigger -Settings $settings -RunLevel Highest -Force | Out-Null
$taskState = (Get-ScheduledTask -TaskName "GGLoop-DailyCleanup").State
Write-Host "Scheduled task: $taskState"

# Nagle off on all interfaces
$tcp = "HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces"
$count = 0
Get-ChildItem $tcp | ForEach-Object {
    Set-ItemProperty $_.PSPath -Name "TcpAckFrequency" -Value 1 -Type DWord
    Set-ItemProperty $_.PSPath -Name "TCPNoDelay"      -Value 1 -Type DWord
    $count++
}
Write-Host "Nagle off on $count interfaces"

Write-Host ""
Write-Host "ALL DONE. Reboot to finalize HAGS." -ForegroundColor Green
Start-Sleep -Seconds 3
