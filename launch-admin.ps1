$script = "C:\Users\Jayson Quindao\.gemini\antigravity\playground\drifting-quasar\apply-admin-hklm.ps1"
Start-Process powershell -Verb RunAs -Wait -ArgumentList ("-ExecutionPolicy Bypass -File `"$script`"")
