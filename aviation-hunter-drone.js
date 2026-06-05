const { chromium } = require('playwright');
const fs = require('fs');

/**
 * THE AVIATION HUNTER DRONE
 * -------------------------------------------------------------
 * Target: DFW Aviation Hub (FBOs, Flight Schools, Charter Ops)
 * Objective: Scrape contact emails and leadership pages to locate 
 * hiring managers for Flight Operations and Dispatch roles.
 * -------------------------------------------------------------
 * Usage: Execute this via node aviation-hunter-drone.js
 */

(async () => {
    console.log('[SYSTEM] Initializing Aviation Hunter Drone...');
    console.log('[SYSTEM] Targeting Flight Schools and FBOs in Grand Prairie & Arlington...');

    // Launch headless browser
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Target search query on Google
    const searchQuery = 'site:com (Flight School OR FBO OR Aviation) "Grand Prairie" OR "Arlington" TX contact email';
    console.log(`[DRONE] Searching: ${searchQuery}`);

    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);

    // Scrape URLs from search results
    const urls = await page.$$eval('div.yuRUbf a', links => links.map(a => a.href));
    
    console.log(`[DRONE] Acquired ${urls.length} potential targets. Engaging data extraction...`);

    let acquiredLeads = [];

    // Visit each target and extract emails using Regex
    for (const url of urls) {
        try {
            console.log(`[DRONE] Infiltrating: ${url}`);
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 5000 });
            
            const pageText = await page.innerText('body');
            
            // Regex to find email addresses
            const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
            const emails = pageText.match(emailRegex);

            if (emails && emails.length > 0) {
                // Deduplicate emails
                const uniqueEmails = [...new Set(emails)];
                acquiredLeads.push({ facility: url, contacts: uniqueEmails });
                console.log(`[DRONE] SUCCESS -> Found contacts: ${uniqueEmails.join(', ')}`);
            } else {
                console.log(`[DRONE] No email detected at ${url}`);
            }
        } catch (error) {
            console.log(`[DRONE] Failed to connect to ${url} - Firewall or Timeout.`);
        }
    }

    await browser.close();

    // Output findings to an actionable dispatch file
    const logData = '=== AVIATION HUNTER DRONE: ACQUIRED TARGETS ===\n' + 
                    JSON.stringify(acquiredLeads, null, 2);
    
    fs.writeFileSync('aviation_target_manifest.txt', logData);
    
    console.log('[SYSTEM] Drone mission complete. Target manifest saved to aviation_target_manifest.txt');
    console.log('------------------------------------------------');
    console.log('NEXT ACTION: Run your auto-mailer to send the Jayson_Master_Career_Profile to these targets.');
    console.log('------------------------------------------------');
})();
