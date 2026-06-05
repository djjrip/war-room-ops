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

class NexusOrchestrator {
    constructor() {
        this.status = "INITIALIZED";
        console.log("[ORCHESTRATOR] Booting central intelligence...");
    }

    async executeDeploymentCycle(transactionId, amount) {
        console.log("\n--- INITIATING DEPLOYMENT CYCLE ---");
        
        // 1. Check Security Perimeter
        const authCheck = perimeterGuard.validateEnvironmentContext();
        if (!authCheck.authorized) {
            console.error("[ORCHESTRATOR] FATAL: Perimeter breach detected. Aborting.");
            return false;
        }

        // 2. Audit Financials
        const financeAudit = await financeBridge.auditTransaction(transactionId, amount);
        if (financeAudit.status === "PENDING_APPROVAL") {
            console.warn("[ORCHESTRATOR] HALT: Circuit breaker tripped. Awaiting human approval for capital movement.");
            // We simulate that the human has not approved yet in this automated test
            return false;
        }

        // 3. Trigger Cloud Rollout
        const deploymentState = cloudDeployer.validateDeploymentState(true, true);
        if (!deploymentState.ready) {
            console.error("[ORCHESTRATOR] FATAL: Cloud Deployer rejected the rollout.");
            return false;
        }

        console.log(`[ORCHESTRATOR] SUCCESS: Code deployed to ${deploymentState.target}.`);
        return true;
    }

    checkHealth() {
        return this.status === "INITIALIZED" && perimeterGuard.checkHealth() && financeBridge.checkHealth() && cloudDeployer.checkHealth();
    }
}

module.exports = new NexusOrchestrator();
