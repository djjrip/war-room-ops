# War Room Ops — Nexus CTO Command Center

**Autonomous security, FinOps, and operations engines for cloud-native startups.**

War Room Ops is the operational hub of the [Nexus CTO](https://github.com/djjrip) ecosystem — a collection of 100+ specialized Node.js engines that scan for vulnerabilities, optimize cloud spend, enforce financial circuit breakers, and coordinate deployments with human-in-the-loop guardrails.

Built by [Jayson Quindao](https://github.com/djjrip) · Grand Prairie, TX

---

## What This Is

Most solo founders can't afford a full security + FinOps + DevOps team. War Room Ops packages that expertise as **composable autonomous engines** — each module targets a specific failure mode (SQL injection, CSRF, orphaned IAM roles, CloudWatch cardinality traps, etc.) and logs actions to an immutable ledger.

The centerpiece is `core/nexus-orchestrator.js`, which coordinates:

- **Perimeter Guard** — environment validation before any action
- **Risk Engine** — dynamic transaction risk scoring
- **Finance Bridge** — financial audit with circuit-breaker halts
- **Cloud Deployer** — deployment state validation
- **Immutable Ledger** — append-only action log for audit trails

See [NEXUS_ARCHITECTURE.md](./NEXUS_ARCHITECTURE.md) for the full ecosystem map and [ETHICAL_MANIFESTO.md](./ETHICAL_MANIFESTO.md) for human-in-the-loop financial controls.

---

## Architecture

```
war-room-ops/
├── core/                    # 100+ Nexus engines (security sweepers, FinOps, governance)
│   ├── nexus-orchestrator.js
│   ├── nexus-csrf-sweeper.js
│   ├── nexus-sql-injection-sweeper.js
│   ├── nexus-xss-sweeper.js
│   ├── nexus-cloud-cost-optimizer.js
│   └── ...
├── battle_grounds/          # Integration tests ("Truth Gate" validation)
├── .github/workflows/       # CI: lint, TruffleHog, battle grounds
├── index.html               # Nexus Hub dashboard (local ops UI)
└── *.ps1                    # Windows admin/deployment scripts
```

Each engine follows the same pattern:

1. Accept structured telemetry (endpoints, queries, IAM policies, metrics, etc.)
2. Scan for a specific vulnerability or waste pattern
3. Log findings + remediation actions to `nexus-immutable-ledger`
4. Return capital-at-risk estimates and hardening recommendations

---

## Security Sweeper Engines (OWASP Coverage)

| Engine | Threat Class | OWASP / Category |
|--------|--------------|------------------|
| `nexus-csrf-sweeper` | Cross-Site Request Forgery | A01 Broken Access Control |
| `nexus-sql-injection-sweeper` | SQL Injection | A03 Injection |
| `nexus-xss-sweeper` | Cross-Site Scripting | A03 Injection |
| `nexus-ssrf-sweeper` | Server-Side Request Forgery | A10 SSRF |
| `nexus-bola-sweeper` | Broken Object Level Authorization | A01 Broken Access Control |
| `nexus-bfla-sweeper` | Broken Function Level Authorization | A01 Broken Access Control |
| `nexus-mass-assignment-sweeper` | Mass Assignment | A01 Broken Access Control |
| `nexus-jwt-signature-sweeper` | JWT validation failures | A07 Auth Failures |
| `nexus-hardcoded-secret-sweeper` | Secrets in source code | A02 Cryptographic Failures |
| `nexus-path-traversal-sweeper` | Path traversal | A01 Broken Access Control |
| `nexus-command-injection-sweeper` | OS command injection | A03 Injection |
| `nexus-deserialization-rce-sweeper` | Insecure deserialization | A08 Software Integrity |
| `nexus-prototype-pollution-sweeper` | Prototype pollution | A03 Injection |
| `nexus-graphql-introspection-sweeper` | GraphQL introspection exposure | A05 Security Misconfiguration |
| `nexus-open-redirect-sweeper` | Open redirects | A01 Broken Access Control |
| `nexus-nosql-injection-sweeper` | NoSQL injection | A03 Injection |
| `nexus-race-condition-sweeper` | Race conditions | A04 Insecure Design |
| `nexus-waf-payload-anomaly-sweeper` | WAF bypass patterns | A05 Security Misconfiguration |

### Cloud & Infrastructure Sweepers

| Engine | Focus |
|--------|-------|
| `nexus-iam-ghost-principal-sweeper` | Orphaned IAM users/roles |
| `nexus-iam-overprivileged-role-sweeper` | Excessive IAM permissions |
| `nexus-s3-public-exposure-sweeper` | Public S3 bucket misconfigurations |
| `nexus-unencrypted-db-sweeper` | Unencrypted database instances |
| `nexus-orphaned-resource-sweeper` | Zombie AWS resources |
| `nexus-orphaned-dns-takeover-sweeper` | DNS takeover vulnerabilities |
| `nexus-container-privilege-escalation-sweeper` | Container privilege escalation |
| `nexus-cloud-cost-optimizer` | AWS spend optimization |
| `nexus-stale-feature-flag-sweeper` | Stale feature flags in production |

---

## FinOps & Business Operations

Beyond security, `core/` includes engines for:

- **Capital & treasury** — `nexus-capital-optimizer`, `nexus-liquidity-manager`, `nexus-treasury-manager`
- **Governance** — `nexus-board-of-directors`, `nexus-compliance-auditor`, `nexus-compliance-vault`
- **Revenue** — `nexus-revenue-engine`, `nexus-pricing-optimizer`, `nexus-profitability-forecaster`
- **Reliability** — `nexus-healing-engine`, `nexus-telemetry-pulse`, `nexus-chaos-engineering`
- **Finance bridge** — `sql-reconciliation-engine` (submodule) for Stripe/ledger reconciliation

---

## Quick Start

### Prerequisites

- Node.js 20+
- PowerShell 7+ (for admin scripts on Windows)
- Git with submodule support

### Clone & validate

```bash
git clone --recurse-submodules https://github.com/djjrip/war-room-ops.git
cd war-room-ops
node battle_grounds/system_health.test.js
```

### Run the orchestrator (demo cycle)

```bash
node -e "const orch = require('./core/nexus-orchestrator'); orch.executeDeploymentCycle('txn-demo-001', 5000);"
```

### Open the local dashboard

Open `index.html` in a browser, or run the PowerShell launcher scripts for a full desktop setup:

```powershell
.\create-dashboard-shortcut.ps1
.\launch-admin.ps1
```

---

## CI/CD Pipeline

GitHub Actions (`.github/workflows/ci.yml`) runs on every push:

1. **Lint & Validate** — PowerShell syntax check across all `.ps1` scripts (Windows runner)
2. **Security Scan** — TruffleHog secret detection (verified secrets only)
3. **Truth Gate** — `battle_grounds/system_health.test.js` integration validation

---

## Related Repositories

| Repo | Role |
|------|------|
| [nexus-agent-framework](https://github.com/djjrip/nexus-agent-framework) | Core agent brain — delegates to sub-agents |
| [aws-github-pm-agent](https://github.com/djjrip/aws-github-pm-agent) | DevOps monitor for GitHub Actions + AWS |
| [aws-infrastructure-playbook](https://github.com/djjrip/aws-infrastructure-playbook) | IaC templates and CI/CD blueprints |
| [sql-reconciliation-engine](https://github.com/djjrip/sql-reconciliation-engine) | Financial reconciliation engine |
| [apex-council](https://github.com/djjrip/apex-council) | Multi-agent portfolio intelligence |

---

## Design Principles

From [ETHICAL_MANIFESTO.md](./ETHICAL_MANIFESTO.md):

1. **Human-in-the-loop financials** — no capital-moving action without explicit approval
2. **Zero-retention data privacy** — enterprise API endpoints, no training on user data
3. **Open foundations** — core frameworks are open source; monetize managed execution
4. **Transparent security** — anti-cheat validates integrity, never acts as spyware

---

## Author

**Jayson Quindao** — Hybrid Finance Operations + Full-Stack Cloud Engineer + Applied AI Builder

- Production SaaS: [ggloop.io](https://ggloop.io)
- Portfolio: [jaysonquindao-com.pages.dev](https://jaysonquindao-com.pages.dev)
- LinkedIn: [jaysonquindao](https://linkedin.com/in/jaysonquindao)

---

## License

Open source. See individual submodule licenses for bundled dependencies.
