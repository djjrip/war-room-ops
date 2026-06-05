// core/nexus-escalation-matrix.js

/**
 * Nexus CTO: Escalation Matrix
 * An autonomous system is great until it hits a wall it can't climb.
 * The Escalation Matrix analyzes the final Telemetry Pulse of the agency.
 * If critical thresholds are breached (e.g. system lockdown, excessive security
 * blocks, or compliance violations), it automatically constructs a high-priority 
 * incident report and escalates to the Human Director (PagerDuty equivalent).
 */

const ledger = require('./nexus-immutable-ledger');

class NexusEscalationMatrix {
    constructor() {
        this.status = "INITIALIZED";
    }

    evaluateTelemetry(telemetryPayload) {
        console.log(`\n[ESCALATION MATRIX] Analyzing Telemetry Pulse for critical anomalies...`);
        
        let escalationRequired = false;
        let escalationReasons = [];

        if (telemetryPayload.systemState === "DEFCON 1 (LOCKED)") {
            escalationRequired = true;
            escalationReasons.push("SYSTEM_IN_LOCKDOWN");
        }

        // If there are more than 2 security interventions in a single reporting window, page the CTO
        if (telemetryPayload.metrics.securityInterventions > 2) {
            escalationRequired = true;
            escalationReasons.push(`HIGH_SECURITY_INTERVENTIONS (${telemetryPayload.metrics.securityInterventions})`);
        }

        if (escalationRequired) {
            console.error(`[ESCALATION MATRIX] CRITICAL: Thresholds breached. Triggering Level-1 Escalation to Director.`);
            const incidentReport = {
                incidentId: `INC-${Date.now()}`,
                severity: "SEV-1",
                reasons: escalationReasons,
                timestamp: new Date().toISOString()
            };
            
            ledger.recordAction("ESCALATION_MATRIX", "DIRECTOR_PAGED", incidentReport);
            return { escalated: true, report: incidentReport };
        }

        console.log(`[ESCALATION MATRIX] System stable. No escalation required.`);
        return { escalated: false };
    }

    checkHealth() {
        return this.status === "INITIALIZED";
    }
}

module.exports = new NexusEscalationMatrix();
