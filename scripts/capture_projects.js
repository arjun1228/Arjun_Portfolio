import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('client/public/images/projects');
fs.mkdirSync(OUT_DIR, { recursive: true });

const targets = [
  {
    name: 'alumniconnect',
    url: 'https://alumni-interaction-portal-hazel.vercel.app/'
  },
  {
    name: 'animal-rescue',
    url: 'https://animal-rescue-network-tau.vercel.app/'
  },
  {
    name: 'courseline',
    url: 'https://course-line.vercel.app/'
  },
  {
    name: 'orbit',
    url: 'https://orbit-eosin-kappa.vercel.app/'
  }
];

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars']
});

for (const target of targets) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  try {
    await page.goto(target.url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 3500));
    const file = path.join(OUT_DIR, `${target.name}.png`);
    await page.screenshot({ path: file });
    console.log('Saved', file);
  } catch (err) {
    console.error('Failed', target.url, err.message);
  } finally {
    await page.close();
  }
}

await browser.close();
