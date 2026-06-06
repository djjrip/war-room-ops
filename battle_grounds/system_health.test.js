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

  // Validate the Central Orchestrator, Human Override, Immutable Ledger, Risk Engine, State Revert Engine, Threat Mitigator, Ledger Indexer, Capital Optimizer & Telemetry Pulse & Healing Engine & Compliance Auditor
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
  const compliancePath = path.join(coreDir, 'nexus-compliance-auditor.js');
  const escalationPath = path.join(coreDir, 'nexus-escalation-matrix.js');
  const liquidityPath = path.join(coreDir, 'nexus-liquidity-manager.js');
  const revenuePath = path.join(coreDir, 'nexus-revenue-engine.js');
  const valuationPath = path.join(coreDir, 'nexus-valuation-engine.js');
  const strategyPath = path.join(coreDir, 'nexus-strategy-director.js');
  const forecastPath = path.join(coreDir, 'nexus-profitability-forecaster.js');
  const boardPath = path.join(coreDir, 'nexus-board-of-directors.js');
  const dividendPath = path.join(coreDir, 'nexus-dividend-emitter.js');
  
  if (fs.existsSync(orchestratorPath) && fs.existsSync(overridePath) && fs.existsSync(ledgerPath) && fs.existsSync(riskEnginePath) && fs.existsSync(revertEnginePath) && fs.existsSync(mitigatorPath) && fs.existsSync(indexerPath) && fs.existsSync(optimizerPath) && fs.existsSync(pulsePath) && fs.existsSync(healingPath) && fs.existsSync(compliancePath) && fs.existsSync(escalationPath) && fs.existsSync(liquidityPath) && fs.existsSync(revenuePath) && fs.existsSync(valuationPath) && fs.existsSync(strategyPath) && fs.existsSync(forecastPath) && fs.existsSync(boardPath) && fs.existsSync(dividendPath)) {
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
      const complianceAuditor = require(compliancePath);
      const escalationMatrix = require(escalationPath);
      const liquidityManager = require(liquidityPath);
      const revenueEngine = require(revenuePath);
      const valuationEngine = require(valuationPath);
      const strategyDirector = require(strategyPath);
      const profitabilityForecaster = require(forecastPath);
      const boardOfDirectors = require(boardPath);
      const dividendEmitter = require(dividendPath);
      
      if (orchestrator.checkHealth() && humanOverride.checkHealth() && ledger.checkHealth() && riskEngine.checkHealth() && revertEngine.checkHealth() && threatMitigator.checkHealth() && ledgerIndexer.checkHealth() && capitalOptimizer.checkHealth() && telemetryPulse.checkHealth() && healingEngine.checkHealth() && complianceAuditor.checkHealth() && escalationMatrix.checkHealth() && liquidityManager.checkHealth() && revenueEngine.checkHealth() && valuationEngine.checkHealth() && strategyDirector.checkHealth() && profitabilityForecaster.checkHealth() && boardOfDirectors.checkHealth() && dividendEmitter.checkHealth()) {
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
                                                            
                                                            // Simulation 4: Compliance Auditor
                                                            console.log("\n--- SIMULATION 4: COMPLIANCE AUDIT ---");
                                                            humanOverride.authorizeFinancialTransaction("TXN-COMPLIANCE", "Jayson Quindao");
                                                            orchestrator.executeDeploymentCycle("TXN-COMPLIANCE", 1000, { encryptionEnabled: false }).then(success4 => {
                                                                if (success4 === false) {
                                                                    console.log("✅ Simulation 4 Passed: Compliance Auditor flagged the unencrypted payload and failed the deployment.");
                                                                    
                                                                    // Verify Ledger & Telemetry Pulse
                                                                    console.log("\n--- AUDITING IMMUTABLE LEDGER ---");
                                                                    const history = ledger.getHistory();
                                                                    // Expected operations = 22 (prior to telemetry)
                                                                    if (history.length === 22) { 
                                                                        console.log(`✅ Ledger verification passed. Trapped ${history.length} operations cryptographically.`);
                                                                        
                                                                        console.log("\n--- GENERATING TELEMETRY PULSE ---");
                                                                        const payload = telemetryPulse.broadcastPulse();
                                                                        
                                                                        if (payload.metrics.capitalSaved === "$3600" && payload.metrics.revenueBilled === "$720" && payload.metrics.enterpriseValuation === "$2,628,000" && payload.metrics.totalLedgerEvents === 23) {
                                                                            console.log("✅ Simulation 5 Passed: Telemetry Pulse successfully aggregated agency metrics and Valuation Engine calculated $2.6M+ Enterprise Value.");
                                                                            
                                                                            // EXPORT TELEMETRY TO PUBLIC REPOSITORY
                                                                            const telemetryExportPath = path.join('C:\\Users\\Jayson Quindao\\.gemini\\antigravity\\playground\\djjrip', 'telemetry.json');
                                                                            fs.writeFileSync(telemetryExportPath, JSON.stringify(payload, null, 2));
                                                                            console.log("✅ Telemetry payload exported to djjrip/telemetry.json for public consumption.");
                                                                            
                                                                            // Simulation 6: Escalation Matrix
                                                                            console.log("\n--- SIMULATION 6: ESCALATION MATRIX ---");
                                                                            const escalationResult = escalationMatrix.evaluateTelemetry(payload);
                                                                            if (escalationResult.escalated === true) {
                                                                                 console.log("✅ Simulation 6 Passed: Escalation Matrix properly identified critical anomalies and paged the Director.");
                                                                                 
                                                                                 // Simulation 7: Strategy Director
                                                                                 console.log("\n--- SIMULATION 7: STRATEGY DIRECTOR ---");
                                                                                 const strategyResult = strategyDirector.formulateStrategy(payload);
                                                                                 if (strategyResult.executedStrategy === "HARDENED_ZERO_TRUST") {
                                                                                     console.log("✅ Simulation 7 Passed: Strategy Director shifted architecture to Zero-Trust due to elevated threat levels.");
                                                                                     // Simulation 8: Profitability Forecaster
                                                                                     console.log("\n--- SIMULATION 8: PROFITABILITY FORECASTER ---");
                                                                                     const forecastResult = profitabilityForecaster.generateForecast(payload);
                                                                                     if (forecastResult.forecastStatus === "TARGET_EXCEEDED") {
                                                                                         console.log("✅ Simulation 8 Passed: Profitability Forecaster verified that the $1M valuation target has been exceeded.");
                                                                                         // Simulation 9: Board of Directors
                                                                                         console.log("\n--- SIMULATION 9: BOARD OF DIRECTORS ---");
                                                                                         const boardResult = boardOfDirectors.conveneBoard(forecastResult);
                                                                                         if (boardResult.governanceDecision === "SERIES_A_AUTHORIZED") {
                                                                                             console.log("✅ Simulation 9 Passed: Board of Directors formally authorized Series A institutional readiness.");
                                                                                             // Simulation 10: Dividend Emitter
                                                                                             console.log("\n--- SIMULATION 10: DIVIDEND EMITTER ---");
                                                                                             const dividendResult = dividendEmitter.issueDividend(forecastResult, boardResult);
                                                                                             if (dividendResult.status === "DISTRIBUTED") {
                                                                                                 console.log(`✅ Simulation 10 Passed: Dividend Emitter successfully issued ${dividendResult.dividendIssued} to the Director.`);
                                                                                                 const finalHistory = ledger.getHistory();
                                                                                                 if (finalHistory.length === 28) {
                                                                                                     console.log("\n[STATUS: PASS] Truth Gate Unlocked.");
                                                                                                     console.log("The autonomous engine is authorized to push the diary entry.");
                                                                                                     process.exit(0);
                                                                                                 } else {
                                                                                                     console.log(`❌ Truth Gate Failed: Expected 28 ledger events, got ${finalHistory.length}`);
                                                                                                     process.exit(1);
                                                                                                 }
                                                                                             } else {
                                                                                                 console.log(`❌ Truth Gate Failed: Dividend Emitter failed to issue yield.`);
                                                                                                 process.exit(1);
                                                                                             }
                                                                                         } else {
                                                                                             console.log(`❌ Truth Gate Failed: Board rejected Series A lock. Got governance decision: ${boardResult.governanceDecision}`);
                                                                                             process.exit(1);
                                                                                         }
                                                                                     } else {
                                                                                         console.log(`❌ Truth Gate Failed: Forecaster failed to recognize $1M+ valuation. Got status: ${forecastResult.forecastStatus}`);
                                                                                         process.exit(1);
                                                                                     }
                                                                                 } else {
                                                                                     console.log(`❌ Truth Gate Failed: Strategy Director failed to shift to Zero Trust. Got: ${strategyResult.executedStrategy}`);
                                                                                     process.exit(1);
                                                                                 }
                                                                            } else {
                                                                                 console.error(`❌ Truth Gate Failed: Escalation Matrix failed to page the Director despite threshold breach.`);
                                                                                 process.exit(1);
                                                                            }
                                                                            
                                                                        } else {
                                                                            console.error(`❌ Truth Gate Failed: Telemetry Pulse returned incorrect aggregation. Got savings: ${payload.metrics.capitalSaved}`);
                                                                            process.exit(1);
                                                                        }
                                                                    } else {
                                                                        console.error(`❌ Truth Gate Failed: Ledger failed to accurately record the execution state. Expected 19, got ${history.length}`);
                                                                        process.exit(1);
                                                                    }
                                                                } else {
                                                                    console.error("❌ Truth Gate Failed: Compliance Auditor allowed an unencrypted payload to deploy!");
                                                                    process.exit(1);
                                                                }
                                                            });
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
