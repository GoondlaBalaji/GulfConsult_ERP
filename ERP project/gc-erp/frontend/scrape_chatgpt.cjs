const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    console.log("Starting puppeteer...");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    console.log("Navigating to URL...");
    await page.goto('https://chatgpt.com/share/6a6ca73e-0fc4-83ee-ba3e-4dcc3ada03cc', { waitUntil: 'networkidle2', timeout: 60000 });
    
    console.log("Waiting for conversation to load...");
    await page.waitForSelector('.prose', { timeout: 30000 }).catch(e => console.log("Timeout waiting for .prose"));
    
    console.log("Extracting text...");
    const chatContent = await page.evaluate(() => {
        const elements = document.querySelectorAll('.prose, [data-message-author-role="user"]');
        let text = "";
        elements.forEach(el => {
            if (el.getAttribute('data-message-author-role') === 'user') {
                text += "\n\n### User:\n" + el.innerText;
            } else {
                text += "\n\n### ChatGPT:\n" + el.innerText;
            }
        });
        return text;
    });
    
    console.log("Writing to file...");
    fs.writeFileSync('chatgpt_content.md', chatContent);
    console.log("Done!");
    await browser.close();
})();
