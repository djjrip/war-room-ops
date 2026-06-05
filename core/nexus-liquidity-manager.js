// core/nexus-liquidity-manager.js

/**
 * Nexus CTO: Liquidity Manager
 * The Capital Optimizer trims the fat, but the Liquidity Manager moves the cash.
 * If a deployment requires $4,800, but the primary operating account only has $3,000,
 * a standard system would fail due to insufficient funds.
 * The Liquidity Manager detects the shortfall and executes a Just-In-Time (JIT) 
 * drawdown from a credit facility or short-term treasury pool to fund the difference,
 * ensuring the Finance Bridge never sees an artificial failure.
 */

const ledger = require('./nexus-immutable-ledger');

class NexusLiquidityManager {
    constructor() {
        this.status = "INITIALIZED";
        this.primaryBalance = 3000; // Simulated starting cash
        this.creditFacility = 10000; // Simulated backup line of credit
    }

    ensureLiquidity(transactionId, requiredAmount) {
        console.log(`[LIQUIDITY MANAGER] Verifying liquid capital for ${transactionId}. Required: $${requiredAmount}`);
        
        if (requiredAmount <= this.primaryBalance) {
            console.log(`[LIQUIDITY MANAGER] Primary operating account is fully funded. No JIT draw required.`);
            return { funded: true, drawAmount: 0 };
        }

        const shortfall = requiredAmount - this.primaryBalance;
        
        if (shortfall <= this.creditFacility) {
            console.log(`[LIQUIDITY MANAGER] WARNING: Insufficient primary cash (Shortfall: $${shortfall}).`);
            console.log(`[LIQUIDITY MANAGER] Executing Just-In-Time (JIT) drawdown from Credit Facility...`);
            
            this.creditFacility -= shortfall;
            // Primary balance is technically used up to fund the rest, but for simulation we just fund it
            
            ledger.recordAction("LIQUIDITY_MANAGER", "JIT_FUNDING_EXECUTED", {
                transactionId,
                shortfallFunded: shortfall,
                remainingCredit: this.creditFacility
            });
            
            console.log(`[LIQUIDITY MANAGER] SUCCESS: Liquidity secured. Remaining credit facility: $${this.creditFacility}`);
            return { funded: true, drawAmount: shortfall };
        }

        console.error(`[LIQUIDITY MANAGER] FATAL: Agency is insolvent. Credit facility exhausted.`);
        ledger.recordAction("LIQUIDITY_MANAGER", "INSOLVENCY_DETECTED", { transactionId, requiredAmount });
        return { funded: false, drawAmount: 0 };
    }

    checkHealth() {
        return this.status === "INITIALIZED";
    }
}

module.exports = new NexusLiquidityManager();
