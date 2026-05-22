import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('https://home.9ruby.com/ecosystem', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'eco-check.png', fullPage: false });
const imgs = await page.evaluate(() => Array.from(document.querySelectorAll('img')).map(e => e.src));
console.log('img srcs:', JSON.stringify(imgs));
await browser.close();
