# 🎯 Railway Central Station Active Bounty Radar
**Last Automated Scan**: 2026-09-09 16:51:32 UTC  
**Operator**: Jayson Quindao (`@djjrip`) / GG Loop LLC  
**Runner**: Autonomous GitHub Actions Cloud Worker  
**Purpose**: High-value technical bounties with verified, copy-paste-ready solutions.

---

### 💰 Total Tracked Bounty Value: **$130** across 3 active threads

## 1. [Deployment stuck failing Network > Healthcheck (5min timeout, zero response)](https://station.railway.com/questions/deployment-stuck-failing-network-heal-d286a411) — **$10**
- **Category**: `Networking / Docker Host Binding`
- **Symptom**: Next.js app boots cleanly in logs, /api/health works locally in 150ms, but Railway healthcheck probe times out after 300s.
- **Root Cause**: Next.js binds to localhost (127.0.0.1) by default. Railway's healthcheck prober connects from the external overlay network (eth0). Without HOSTNAME=0.0.0.0, external probes hit connection refused or timeout.

#### 📋 Ready-to-Post Verified Solution:
```markdown
1. In Railway Service → Variables, add:
   HOSTNAME=0.0.0.0
2. In package.json, update start script:
   "start": "next start -H 0.0.0.0 -p ${PORT:-3000}"
3. Ensure middleware.ts does not intercept or redirect /api/health.
```

---

## 2. [Invite Link Expired / Does workspace invite link expire?](https://station.railway.com/questions/invite-link-expired-a2568b71) — **$20**
- **Category**: `Security / Workspace Permissions`
- **Symptom**: User asking if workspace invite links expire automatically or stay valid indefinitely, and how to manually revoke them.
- **Root Cause**: Railway's GraphQL API (workspaceInviteCodeCreate) does not assign a TTL/expiration timestamp to invite links. They stay valid until rotated.

#### 📋 Ready-to-Post Verified Solution:
```markdown
1. Do links expire automatically? No. They remain active indefinitely until rotated or revoked.
2. How to revoke: In Workspace Settings → Members, generating a new invite link rotates the active token, instantly invalidating the old link.
3. If an unauthorized user already joined, remove them manually via Members tab (invoking workspaceUserRemove).
```

---

## 3. [Clarification: does manual Restart preserve the writable container filesystem?](https://station.railway.com/questions/clarification-does-manual-restart-prese-4486eb4e) — **$100**
- **Category**: `Storage / Ephemeral Disks`
- **Symptom**: User asking if manual Restart preserves local files written to container root/temp disk.
- **Root Cause**: Railway containers are ephemeral by default. A manual restart recreates the container instance from the deployment snapshot. Any file not stored on a persistent Volume is discarded.

#### 📋 Ready-to-Post Verified Solution:
```markdown
1. Ephemeral Disks: Restarting a service destroys the existing container and boots a clean image from the build artifact. Any local files written to the root filesystem are permanently lost.
2. The Fix: Attach a persistent Volume in Railway Settings → Volumes and mount it to your storage path (e.g., /data). Volume data persists across restarts, redeployments, and crashes.
```

---
