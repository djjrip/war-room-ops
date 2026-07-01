# Changelog

All notable changes to this project will be documented in this file.

## [2026-07-01]

### Added / Changed
- **Nexus Finance Bridge (`core/nexus-finance-bridge.js`)**: Upgraded the module to strictly enforce the "Human-in-the-Loop Financials" pillar from the Ethical Manifesto. Added `nexus-immutable-ledger` integration to log when transactions are halted by the circuit breaker and when they are cleared by a human approver. Added a placeholder `reconcileStripePayments` method to link to the SQL reconciliation engine.

### Recommendations (Not Executed)
- **Rogue GitHub Action / Duplicate PR Spam**: Regarding the unresolved rogue GitHub Action/duplicate-PR spam on `djjrip/kickama-cash-grab-hacks` (from June 29) involving accounts `@politas180` and `@jespinosa1983-cyber` — it is highly recommended that you revoke any rogue OAuth app access from your GitHub settings and disable/delete the offending workflow in that repository yourself to stop the spam loop.
- **Discord Automated Broadcast Cron**: The `live-status-dashboard.yml` cron is currently set to broadcast to every Discord text channel every 30 minutes, plus it sends an `@everyone` alert on failure. Given your previous pushback on unannounced auto-posting, you should confirm if you still want this automated broadcast active. If not, the cron schedule should be paused or the channel targeting restricted.
