// core/nexus-human-override.js

/**
 * Nexus CTO: Human Override Interface
 * This module provides the secure interface for the human operator (the Agency Director)
 * to manually clear circuit breakers tripped by the autonomous infrastructure.
 */

const financeBridge = require('./nexus-finance-bridge');

class NexusHumanOverride {
    constructor() {
        this.status = "INITIALIZED";
        this.authorizedDirector = "Jayson Quindao";
    }

    authorizeFinancialTransaction(transactionId, directorSignature) {
        if (directorSignature !== this.authorizedDirector) {
            console.error(`[OVERRIDE] DENIED: Invalid Director Signature.`);
            return false;
        }

        console.log(`[OVERRIDE] SUCCESS: Director ${directorSignature} has manually approved transaction ${transactionId}. Clearing circuit breaker.`);
        // In a real system, this would write to a secure ledger. Here we simulate clearing the bridge state.
        financeBridge.clearCircuitBreaker(transactionId);
        return true;
    }

    checkHealth() {
        return this.status === "INITIALIZED";
    }
}

module.exports = new NexusHumanOverride();
