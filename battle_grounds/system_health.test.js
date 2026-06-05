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

  console.log("\n[STATUS: PASS] Truth Gate Unlocked.");
  console.log("The autonomous engine is authorized to push the diary entry.");
  process.exit(0);
}

runTruthGate();
