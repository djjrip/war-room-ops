// core/nexus-ledger-indexer.js

/**
 * Nexus CTO: Ledger Analytics Indexer
 * The Immutable Ledger stores chronological history securely.
 * This Indexer acts as an O(1) lookup map over the ledger, allowing the Risk Engine
 * to instantly verify if a specific transaction ID has historical anomalies.
 */

const ledger = require('./nexus-immutable-ledger');

class NexusLedgerIndexer {
    constructor() {
        this.status = "INITIALIZED";
        this.indexMap = new Map();
    }

    // Rebuilds the fast lookup map from the source of truth
    sync() {
        const history = ledger.getHistory();
        this.indexMap.clear();
        
        for (const record of history) {
            const txId = record.details && record.details.transactionId;
            if (txId) {
                if (!this.indexMap.has(txId)) {
                    this.indexMap.set(txId, []);
                }
                this.indexMap.get(txId).push(record);
            }
        }
        console.log(`[LEDGER INDEXER] Sync complete. Indexed ${this.indexMap.size} unique transactions.`);
    }

    // O(1) lookup to check if a transaction has a troubled history
    hasHistoricalAnomalies(transactionId) {
        this.sync(); // Ensure latest data
        
        const records = this.indexMap.get(transactionId) || [];
        for (const record of records) {
            // Only true failures or active blocks should penalize future runs.
            // A circuit breaker 'DEPLOYMENT_HALTED' is just a pause for human review, not an anomaly.
            if (record.actionType === "HIGH_RISK_BLOCK" || record.actionType === "EMERGENCY_ROLLBACK") {
                return true;
            }
        }
        return false;
    }

    checkHealth() {
        return this.status === "INITIALIZED";
    }
}

module.exports = new NexusLedgerIndexer();
