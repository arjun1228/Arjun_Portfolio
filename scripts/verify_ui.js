import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = 'C:\\Users\\kkpa1\\.gemini\\antigravity\\brain\\5a80d7d3-1739-416b-a34d-96fb85ac1a5a\\screenshots';
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runVerification() {
  console.log('--- Starting UI Verification with Puppeteer ---');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const consoleWarnings = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  // Test 1: Desktop 1440px Dark Mode
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.waitForSelector('#home');
  await page.waitForSelector('#about');
  await page.waitForSelector('#experience');
  await page.waitForSelector('#projects');
  await page.waitForSelector('#skills');
  await page.waitForSelector('#certifications');
  await page.waitForSelector('#contact');

  console.log('1. Page loaded successfully on http://localhost:5173/');

  // Full page screenshot 1440px Dark
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '01_desktop_1440_dark_full.png'),
    fullPage: true
  });
  console.log('Saved: 01_desktop_1440_dark_full.png');

  // Capture Section by Section 1440px
  const sections = ['home', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact'];
  for (const sec of sections) {
    const el = await page.$(`#${sec}`);
    if (el) {
      await el.screenshot({
        path: path.join(SCREENSHOT_DIR, `section_${sec}_dark.png`)
      });
      console.log(`Saved: section_${sec}_dark.png`);
    }
  }

  // Test 2: Tablet 768px Dark Mode
  await page.setViewport({ width: 768, height: 1024 });
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '02_tablet_768_dark_full.png'),
    fullPage: true
  });
  console.log('Saved: 02_tablet_768_dark_full.png');

  // Test 3: Mobile 360px Dark Mode
  await page.setViewport({ width: 360, height: 800 });
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '03_mobile_360_dark_full.png'),
    fullPage: true
  });
  console.log('Saved: 03_mobile_360_dark_full.png');

  // Switch to Light Mode by clicking ThemeToggle
  await page.setViewport({ width: 1440, height: 900 });
  const themeBtn = await page.$('button[aria-label*="Switch to"]');
  if (themeBtn) {
    await themeBtn.click();
    await new Promise(r => setTimeout(r, 600)); // wait for theme transition
  }

  // Test 4: Desktop 1440px Light Mode
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '04_desktop_1440_light_full.png'),
    fullPage: true
  });
  console.log('Saved: 04_desktop_1440_light_full.png');

  // Capture Skills in Light Mode to verify high contrast icon tiles
  const skillsLight = await page.$('#skills');
  if (skillsLight) {
    await skillsLight.screenshot({
      path: path.join(SCREENSHOT_DIR, 'section_skills_light.png')
    });
    console.log('Saved: section_skills_light.png');
  }

  // Test 5: Mobile 360px Light Mode
  await page.setViewport({ width: 360, height: 800 });
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '05_mobile_360_light_full.png'),
    fullPage: true
  });
  console.log('Saved: 05_mobile_360_light_full.png');

  // Check overlap between project badge and action links
  const overlapCheck = await page.evaluate(() => {
    const cards = document.querySelectorAll('#projects .group');
    const results = [];
    cards.forEach((card, idx) => {
      const badge = card.querySelector('span.text-\\[11px\\]');
      const links = card.querySelector('div.flex.items-center.space-x-1');
      if (badge && links) {
        const bRect = badge.getBoundingClientRect();
        const lRect = links.getBoundingClientRect();
        const overlaps = !(
          bRect.right < lRect.left ||
          bRect.left > lRect.right ||
          bRect.bottom < lRect.top ||
          bRect.top > lRect.bottom
        );
        results.push({ cardIndex: idx, overlaps });
      }
    });
    return results;
  });
  console.log('Project badge & link overlap check:', overlapCheck);

  // Check experience card gaps
  const gapCheck = await page.evaluate(() => {
    const cards = document.querySelectorAll('#experience .rounded-2xl');
    const gaps = [];
    for (let i = 0; i < cards.length - 1; i++) {
      const r1 = cards[i].getBoundingClientRect();
      const r2 = cards[i + 1].getBoundingClientRect();
      gaps.push(r2.top - r1.bottom);
    }
    return gaps;
  });
  console.log('Experience card vertical gaps (px):', gapCheck);

  // Check console errors
  console.log('Total Console Errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  await browser.close();
  console.log('--- UI Verification Complete ---');
}

runVerification().catch(console.error);

