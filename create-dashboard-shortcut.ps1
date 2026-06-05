$WshShell = New-Object -comObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("C:\Users\Jayson Quindao\Desktop\🖥️ PC COMMAND CENTER.lnk")
$Shortcut.TargetPath = "powershell.exe"
$Shortcut.Arguments = "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"C:\Users\Jayson Quindao\Desktop\GG LOOP\PICE_ENGINE\pc-dashboard\Launch-Dashboard.ps1`""
$Shortcut.WorkingDirectory = "C:\Users\Jayson Quindao\Desktop\GG LOOP\PICE_ENGINE\pc-dashboard"
$Shortcut.Description = "Launch GG LOOP PC Command Center"
$Shortcut.Save()
Write-Host "Shortcut created on Desktop!"
