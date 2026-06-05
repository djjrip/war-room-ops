// core/nexus-human-override.js

/**
 * Nexus CTO: Human Override Interface
 * This module provides the secure interface for the human operator (the Agency Director)
 * to manually clear circuit breakers tripped by the autonomous infrastructure.
 */

const financeBridge = require('./nexus-finance-bridge');
const ledger = require('./nexus-immutable-ledger');

class NexusHumanOverride {
    constructor() {
        this.status = "INITIALIZED";
        this.authorizedDirector = "Jayson Quindao";
    }

    authorizeFinancialTransaction(transactionId, directorSignature) {
        if (directorSignature !== this.authorizedDirector) {
            console.error(`[OVERRIDE] DENIED: Invalid Director Signature.`);
            ledger.recordAction("UNAUTHORIZED_ACTOR", "OVERRIDE_DENIED", { transactionId, signature: directorSignature });
            return false;
        }

        console.log(`[OVERRIDE] SUCCESS: Director ${directorSignature} has manually approved transaction ${transactionId}. Clearing circuit breaker.`);
        financeBridge.clearCircuitBreaker(transactionId);
        ledger.recordAction("AGENCY_DIRECTOR", "OVERRIDE_APPROVED", { transactionId, action: "Cleared Financial Circuit Breaker" });
        return true;
    }

    checkHealth() {
        return this.status === "INITIALIZED";
    }
}

module.exports = new NexusHumanOverride();
