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

  // Validate the Central Orchestrator, Human Override, Immutable Ledger, Risk Engine, State Revert Engine, & Threat Mitigator
  const orchestratorPath = path.join(coreDir, 'nexus-orchestrator.js');
  const overridePath = path.join(coreDir, 'nexus-human-override.js');
  const ledgerPath = path.join(coreDir, 'nexus-immutable-ledger.js');
  const riskEnginePath = path.join(coreDir, 'nexus-risk-engine.js');
  const revertEnginePath = path.join(coreDir, 'nexus-state-revert.js');
  const mitigatorPath = path.join(coreDir, 'nexus-threat-mitigator.js');
  
  if (fs.existsSync(orchestratorPath) && fs.existsSync(overridePath) && fs.existsSync(ledgerPath) && fs.existsSync(riskEnginePath) && fs.existsSync(revertEnginePath) && fs.existsSync(mitigatorPath)) {
      const orchestrator = require(orchestratorPath);
      const humanOverride = require(overridePath);
      const ledger = require(ledgerPath);
      const riskEngine = require(riskEnginePath);
      const revertEngine = require(revertEnginePath);
      const threatMitigator = require(mitigatorPath);
      
      if (orchestrator.checkHealth() && humanOverride.checkHealth() && ledger.checkHealth() && riskEngine.checkHealth() && revertEngine.checkHealth() && threatMitigator.checkHealth()) {
          console.log("✅ Nexus Orchestrator, Human Override, Immutable Ledger, Risk Engine, State Revert Engine, & Threat Mitigator are ONLINE.");
          
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
                                    orchestrator.executeDeploymentCycle("TXN-999", 5000, { simulatePostFlightFailure: true }).then(success => {
                                        if (success === false) {
                                            console.log("✅ Simulation 1 Passed: Circuit breaker correctly halted execution.");
                                            
                                            // Now apply the manual override
                                            console.log("\n--- TRIGGERING HUMAN OVERRIDE ---");
                                            humanOverride.authorizeFinancialTransaction("TXN-999", "Jayson Quindao");
                                            
                                            // Try again, but this time simulate a post-flight failure
                                            orchestrator.executeDeploymentCycle("TXN-999", 5000, { simulatePostFlightFailure: true }).then(success2 => {
                                                if (success2 === false) {
                                                    console.log("✅ Simulation 2 Passed: Deployment failed post-flight and State Revert Engine triggered rollback.");
                                                    
                                                    // Verify Ledger
                                                    console.log("\n--- AUDITING IMMUTABLE LEDGER ---");
                                                    const history = ledger.getHistory();
                                                    if (history.length === 9) { // Breach + Abort + Director Unlock + Risk Block + Abort + Halted + Override + Success + Revert
                                                        console.log(`✅ Ledger verification passed. Trapped ${history.length} operations cryptographically.`);
                                                        console.log(JSON.stringify(history, null, 2));
                                                        console.log("\n[STATUS: PASS] Truth Gate Unlocked.");
                                                        console.log("The autonomous engine is authorized to push the diary entry.");
                                                        process.exit(0);
                                                    } else {
                                                        console.error(`❌ Truth Gate Failed: Ledger failed to accurately record the execution state. Expected 9, got ${history.length}`);
                                                        process.exit(1);
                                                    }
                                                } else {
                                                    console.error("❌ Truth Gate Failed: Orchestrator failed to trigger State Revert Engine after post-flight failure.");
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
          console.error("❌ Truth Gate Failed: Orchestrator, Override, Ledger, Risk Engine, Revert Engine, or Threat Mitigator health check failed.");
          process.exit(1);
      }
  } else {
      console.error("❌ Truth Gate Failed: Orchestrator, Override, Ledger, Risk Engine, Revert Engine, or Threat Mitigator modules are missing.");
      process.exit(1);
  }
}

runTruthGate();
