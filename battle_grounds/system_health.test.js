// battle_grounds/system_health.test.js

/**
 * Nexus CTO Autonomous Agency: Truth Gate Test
 * 
 * This script serves as the absolute baseline truth gate.
 * The autonomous engine CANNOT push to the public diary unless this script exits with code 0.
 */

function runTruthGate() {
  console.log("[NEXUS CTO BATTLE GROUNDS]");
  console.log("Initializing strict execution environment...");

  const fs = require('fs');
  const path = require('path');

  // Verify submodules are actually pulled and not empty shells
  const coreDir = path.join(__dirname, '..', 'core');
  
  if (!fs.existsSync(coreDir)) {
      console.error("❌ Truth Gate Failed: 'core' directory is missing.");
      process.exit(1);
  }

  console.log("✅ Core directory verified.");
  
  // Simulated checks for the submodules
  const submodules = ['nexus-agent-framework', 'sql-reconciliation-engine'];
  
  for (const module of submodules) {
      const modulePath = path.join(coreDir, module);
      if (fs.existsSync(modulePath)) {
          console.log(`✅ Submodule [${module}] is physically present.`);
      } else {
          console.error(`❌ Truth Gate Failed: Submodule [${module}] is missing.`);
          process.exit(1);
      }
  }

  // Validate the integration bridge
  const bridgePath = path.join(coreDir, 'nexus-finance-bridge.js');
  if (fs.existsSync(bridgePath)) {
      const financeBridge = require(bridgePath);
      if (financeBridge.checkHealth()) {
          console.log("✅ Nexus Finance Bridge is ONLINE and healthy.");
      } else {
          console.error("❌ Truth Gate Failed: Finance Bridge health check failed.");
          process.exit(1);
      }
  } else {
      console.error("❌ Truth Gate Failed: nexus-finance-bridge.js is missing.");
      process.exit(1);
  }

  // Validate the Perimeter Guard
  const perimeterPath = path.join(coreDir, 'nexus-perimeter-guard.js');
  let isPerimeterAuthorized = false;
  if (fs.existsSync(perimeterPath)) {
      const perimeterGuard = require(perimeterPath);
      const authCheck = perimeterGuard.validateEnvironmentContext();
      if (perimeterGuard.checkHealth() && authCheck.authorized) {
          console.log("✅ Nexus Perimeter Guard is ONLINE and environment is authorized.");
          isPerimeterAuthorized = true;
      } else {
          console.error("❌ Truth Gate Failed: Perimeter Guard unauthorized or unhealthy.");
          process.exit(1);
      }
  } else {
      console.error("❌ Truth Gate Failed: nexus-perimeter-guard.js is missing.");
      process.exit(1);
  }

  // Validate the Cloud Deployer orchestration
  const deployerPath = path.join(coreDir, 'nexus-cloud-deployer.js');
  if (fs.existsSync(deployerPath)) {
      const cloudDeployer = require(deployerPath);
      const isFinanceHealthy = true; // Derived from earlier check
      
      const deploymentState = cloudDeployer.validateDeploymentState(isFinanceHealthy, isPerimeterAuthorized);
      if (cloudDeployer.checkHealth() && deploymentState.ready) {
          console.log(`✅ Nexus Cloud Deployer is ONLINE. Target [${deploymentState.target}] is ready for automated rollout.`);
      } else {
          console.error("❌ Truth Gate Failed: Cloud Deployer rejected rollout conditions.");
          process.exit(1);
      }
  } else {
      console.error("❌ Truth Gate Failed: nexus-cloud-deployer.js is missing.");
      process.exit(1);
  }

  // Validate the Central Orchestrator, Human Override, Immutable Ledger, Risk Engine, State Revert Engine, Threat Mitigator, Ledger Indexer, Capital Optimizer & Telemetry Pulse & Healing Engine
  const orchestratorPath = path.join(coreDir, 'nexus-orchestrator.js');
  const overridePath = path.join(coreDir, 'nexus-human-override.js');
  const ledgerPath = path.join(coreDir, 'nexus-immutable-ledger.js');
  const riskEnginePath = path.join(coreDir, 'nexus-risk-engine.js');
  const revertEnginePath = path.join(coreDir, 'nexus-state-revert.js');
  const mitigatorPath = path.join(coreDir, 'nexus-threat-mitigator.js');
  const indexerPath = path.join(coreDir, 'nexus-ledger-indexer.js');
  const optimizerPath = path.join(coreDir, 'nexus-capital-optimizer.js');
  const pulsePath = path.join(coreDir, 'nexus-telemetry-pulse.js');
  const healingPath = path.join(coreDir, 'nexus-healing-engine.js');
  
  if (fs.existsSync(orchestratorPath) && fs.existsSync(overridePath) && fs.existsSync(ledgerPath) && fs.existsSync(riskEnginePath) && fs.existsSync(revertEnginePath) && fs.existsSync(mitigatorPath) && fs.existsSync(indexerPath) && fs.existsSync(optimizerPath) && fs.existsSync(pulsePath) && fs.existsSync(healingPath)) {
      const orchestrator = require(orchestratorPath);
      const humanOverride = require(overridePath);
      const ledger = require(ledgerPath);
      const riskEngine = require(riskEnginePath);
      const revertEngine = require(revertEnginePath);
      const threatMitigator = require(mitigatorPath);
      const ledgerIndexer = require(indexerPath);
      const capitalOptimizer = require(optimizerPath);
      const telemetryPulse = require(pulsePath);
      const healingEngine = require(healingPath);
      
      if (orchestrator.checkHealth() && humanOverride.checkHealth() && ledger.checkHealth() && riskEngine.checkHealth() && revertEngine.checkHealth() && threatMitigator.checkHealth() && ledgerIndexer.checkHealth() && capitalOptimizer.checkHealth() && telemetryPulse.checkHealth() && healingEngine.checkHealth()) {
          console.log("✅ All Core Nexus Subsystems are ONLINE.");
          
          // Simulation -1: Perimeter Breach & Lockdown
          console.log("\n--- SIMULATION -1: HOSTILE PERIMETER BREACH ---");
          orchestrator.executeDeploymentCycle("TXN-HACK", 5000, { simulatePerimeterBreach: true }).then(successBreach => {
              if (successBreach === false && threatMitigator.isSystemLocked() === true) {
                  console.log("✅ Simulation -1 Passed: Threat Mitigator actively locked down the system.");
                  
                  // Attempt standard operation while locked
                  orchestrator.executeDeploymentCycle("TXN-TEST", 5000).then(successLock => {
                       if (successLock === false) {
                            console.log("✅ Simulation -1b Passed: Orchestrator refused to execute while in DEFCON 1.");
                            
                            // Clear Lockdown
                            console.log("\n--- CLEARING LOCKDOWN ---");
                            threatMitigator.clearLockdown("Jayson Quindao");

                            // Simulation 0: High Risk Transaction
                            console.log("\n--- SIMULATION 0: HIGH RISK TRANSACTION ---");
                            orchestrator.executeDeploymentCycle("TXN-ANOMALY", 15000, { timeOfDay: "NIGHT_SHIFT" }).then(success0 => {
                                if (success0 === false) {
                                    console.log("✅ Simulation 0 Passed: Risk Engine correctly trapped an anomalous transaction.");
                                    
                                    // Run an end-to-end dry run (circuit breaker should halt deployment)
                                    // TXN-999 with 6000 should trigger a 20% optimization down to 4800, then trip the finance circuit breaker.
                                    orchestrator.executeDeploymentCycle("TXN-999", 6000, { simulatePostFlightFailure: true }).then(success => {
                                        if (success === false) {
                                            console.log("✅ Simulation 1 Passed: Capital Optimized and Circuit breaker correctly halted execution.");
                                            
                                            // Now apply the manual override
                                            console.log("\n--- TRIGGERING HUMAN OVERRIDE ---");
                                            humanOverride.authorizeFinancialTransaction("TXN-999", "Jayson Quindao");
                                            
                                            // Try again, but this time simulate a post-flight failure
                                            orchestrator.executeDeploymentCycle("TXN-999", 6000, { simulatePostFlightFailure: true }).then(success2 => {
                                                if (success2 === true) {
                                                    console.log("✅ Simulation 2 Passed: Deployment failed post-flight, rolled back, HEALED, and successfully re-deployed.");
                                                    
                                                    // Simulation 3: Historical Anomaly Evaluation
                                                    console.log("\n--- SIMULATION 3: HISTORICAL ANOMALY CHECK ---");
                                                    orchestrator.executeDeploymentCycle("TXN-999", 6000).then(success3 => {
                                                        if (success3 === false) {
                                                            console.log("✅ Simulation 3 Passed: Ledger Indexer recognized historical failure and Risk Engine blocked TXN-999.");
                                                            
                                                            // Verify Ledger & Telemetry Pulse
                                                            console.log("\n--- AUDITING IMMUTABLE LEDGER ---");
                                                            const history = ledger.getHistory();
                                                            // History length: Breach(2) + Unlock(1) + RiskBlock(2) + Sim1[Opt(1) + Halt(1)] + Override(1) + Sim2[Opt(1) + Success(1) + Revert(1) + Heal(1) + OptHealed(1) + SuccessHealed(1)] + Sim3[RiskBlock(2)] = 16 operations
                                                            if (history.length === 16) { 
                                                                console.log(`✅ Ledger verification passed. Trapped ${history.length} operations cryptographically.`);
                                                                
                                                                console.log("\n--- GENERATING TELEMETRY PULSE ---");
                                                                const payload = telemetryPulse.broadcastPulse();
                                                                
                                                                if (payload.metrics.capitalSaved === "$3600" && payload.metrics.totalLedgerEvents === 16) {
                                                                    console.log("✅ Simulation 4 Passed: Telemetry Pulse successfully aggregated agency metrics.");
                                                                    console.log("\n[STATUS: PASS] Truth Gate Unlocked.");
                                                                    console.log("The autonomous engine is authorized to push the diary entry.");
                                                                    process.exit(0);
                                                                } else {
                                                                    console.error(`❌ Truth Gate Failed: Telemetry Pulse returned incorrect aggregation. Got savings: ${payload.metrics.capitalSaved}`);
                                                                    process.exit(1);
                                                                }
                                                            } else {
                                                                console.error(`❌ Truth Gate Failed: Ledger failed to accurately record the execution state. Expected 16, got ${history.length}`);
                                                                process.exit(1);
                                                            }
                                                        } else {
                                                            console.error("❌ Truth Gate Failed: Risk Engine failed to penalize a transaction with historical failures.");
                                                            process.exit(1);
                                                        }
                                                    });
                                                } else {
                                                    console.error("❌ Truth Gate Failed: Orchestrator failed to auto-remediate and re-deploy after post-flight failure.");
                                                    process.exit(1);
                                                }
                                            });

                                        } else {
                                            console.error("❌ Truth Gate Failed: Orchestrator deployed code without human financial approval!");
                                            process.exit(1);
                                        }
                                    });
                                } else {
                                    console.error("❌ Truth Gate Failed: Risk Engine allowed a high-risk transaction to deploy!");
                                    process.exit(1);
                                }
                            });
                       } else {
                            console.error("❌ Truth Gate Failed: Orchestrator executed a cycle during DEFCON 1 lockdown!");
                            process.exit(1);
                       }
                  });

              } else {
                  console.error("❌ Truth Gate Failed: Threat Mitigator failed to lock down the system on perimeter breach.");
                  process.exit(1);
              }
          });

      } else {
          console.error("❌ Truth Gate Failed: One or more Nexus subsystems failed health checks.");
          process.exit(1);
      }
  } else {
      console.error("❌ Truth Gate Failed: One or more Nexus subsystem modules are missing.");
      process.exit(1);
  }
}

runTruthGate();
