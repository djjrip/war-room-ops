// core/nexus-orchestrator.js

/**
 * Nexus CTO: Orchestrator
 * This is the central brain of the autonomous agency.
 * It coordinates the execution flow between the Agent Framework, the Perimeter Guard, 
 * the Finance Bridge, and the Cloud Deployer.
 */

const perimeterGuard = require('./nexus-perimeter-guard');
const financeBridge = require('./nexus-finance-bridge');
const cloudDeployer = require('./nexus-cloud-deployer');
const ledger = require('./nexus-immutable-ledger');
const riskEngine = require('./nexus-risk-engine');
const threatMitigator = require('./nexus-threat-mitigator');

class NexusOrchestrator {
    constructor() {
        this.status = "INITIALIZED";
        console.log("[ORCHESTRATOR] Booting central intelligence...");
    }

    async executeDeploymentCycle(transactionId, amount, contextPayload = { timeOfDay: "DAY_SHIFT" }) {
        console.log("\n--- INITIATING DEPLOYMENT CYCLE ---");
        
        if (threatMitigator.isSystemLocked()) {
            console.error("[ORCHESTRATOR] FATAL: System is currently in DEFCON 1 Lockdown. Execution frozen.");
            return false;
        }

        // 1. Check Security Perimeter
        let authCheck = perimeterGuard.validateEnvironmentContext();
        if (contextPayload.simulatePerimeterBreach) {
             authCheck = { authorized: false };
        }
        
        if (!authCheck.authorized) {
            console.error("[ORCHESTRATOR] FATAL: Perimeter breach detected.");
            threatMitigator.initiateLockdown("Unauthorized Execution Context");
            ledger.recordAction("ORCHESTRATOR", "DEPLOYMENT_ABORTED", { reason: "Perimeter Breach Lockdown" });
            return false;
        }

        // 2. Evaluate Dynamic Risk
        const riskAssessment = riskEngine.evaluateTransactionRisk(transactionId, amount, contextPayload);
        if (!riskAssessment.safe) {
            console.error("[ORCHESTRATOR] FATAL: Risk Engine blocked deployment. Circuit breaker preemptively tripped.");
            ledger.recordAction("ORCHESTRATOR", "DEPLOYMENT_HALTED", { reason: "Risk Score Exceeded Threshold", transactionId, score: riskAssessment.score });
            return false;
        }

        // 3. Optimize Capital
        const optimizer = require('./nexus-capital-optimizer');
        const capitalCheck = optimizer.optimizeCapital(transactionId, amount, "AWS_EU_WEST_1");
        const finalAmount = capitalCheck.optimizedAmount;

        // 4. Audit Financials
        if (!contextPayload.isHealingRetry) {
            const financeAudit = await financeBridge.auditTransaction(transactionId, finalAmount);
            if (financeAudit.status === "PENDING_APPROVAL") {
                console.warn("[ORCHESTRATOR] HALT: Circuit breaker tripped. Awaiting human approval for capital movement.");
                ledger.recordAction("ORCHESTRATOR", "DEPLOYMENT_HALTED", { reason: "Circuit Breaker Tripped", transactionId });
                return false;
            }
        }

        // 5. Deploy to Cloud
        const deploymentState = cloudDeployer.validateDeploymentState(true, true);
        if (deploymentState.ready) {
            console.log(`[ORCHESTRATOR] SUCCESS: Code deployed to ${deploymentState.target}.`);
            ledger.recordAction("ORCHESTRATOR", "DEPLOYMENT_SUCCESS", { target: deploymentState.target, transactionId });
            
            // Post-Flight Health Check (Simulated)
            if (contextPayload && contextPayload.simulatePostFlightFailure) {
                console.warn(`[ORCHESTRATOR] WARNING: Post-flight health checks failed for ${transactionId}. Engaging State Revert Engine.`);
                
                // 6. Emergency Rollback
                const revertEngine = require('./nexus-state-revert');
                revertEngine.executeRollback(transactionId, deploymentState.target);
                
                // 7. Auto-Remediation (Healing Engine)
                const healingEngine = require('./nexus-healing-engine');
                const failureSignature = contextPayload.errorSignature || "ERR_OOM_CRASH"; // Default to OOM for simulation
                const healingAttempt = healingEngine.attemptAutoRemediation(transactionId, failureSignature, contextPayload);
                
                if (healingAttempt.success) {
                     console.log(`[ORCHESTRATOR] Healing Engine provided patched config. Auto-requeuing deployment...`);
                     // Strip the post-flight failure flag so the patched run succeeds
                     const patchedContext = { ...healingAttempt.patchedConfig, simulatePostFlightFailure: false, isHealingRetry: true };
                     return await this.executeDeploymentCycle(`${transactionId}-HEALED`, amount, patchedContext);
                } else {
                     return false; // Rollback complete, but healing failed
                }
            }
            
            
            // 8. Compliance Audit (SOC2 / PCI-DSS)
            const complianceAuditor = require('./nexus-compliance-auditor');
            const auditResult = complianceAuditor.auditDeploymentConfig(transactionId, contextPayload);
            if (!auditResult.compliant) {
                return false;
            }
            
            return true;
        }
        return false;
    }

    checkHealth() {
        return this.status === "INITIALIZED" && perimeterGuard.checkHealth() && financeBridge.checkHealth() && cloudDeployer.checkHealth();
    }
}

module.exports = new NexusOrchestrator();
