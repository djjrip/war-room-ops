$WshShell = New-Object -comObject WScript.Shell

$scriptPath = "C:\Users\Jayson Quindao\Desktop\GG LOOP\PICE_ENGINE\Start-GameMode.ps1"

$s = $WshShell.CreateShortcut("C:\Users\Jayson Quindao\Desktop\GAME MODE ON.lnk")
$s.TargetPath = "powershell.exe"
$s.Arguments = "-ExecutionPolicy Bypass -WindowStyle Normal -File `"$scriptPath`""
$s.Description = "GG LOOP Game Mode - Optimize PC for Gaming"
$s.Save()
Write-Host "Created: GAME MODE ON shortcut"

$s2 = $WshShell.CreateShortcut("C:\Users\Jayson Quindao\Desktop\RESTORE NORMAL MODE.lnk")
$s2.TargetPath = "powershell.exe"
$s2.Arguments = "-ExecutionPolicy Bypass -WindowStyle Normal -File `"$scriptPath`" -Restore"
$s2.Description = "GG LOOP - Restore Normal PC Mode"
$s2.Save()
Write-Host "Created: RESTORE NORMAL MODE shortcut"

Write-Host "Both shortcuts are on your Desktop!"
