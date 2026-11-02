import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const OUT_DIR = 'C:\\Users\\kkpa1\\AppData\\Local\\Temp\\opencode\\portfolio-preview';
fs.mkdirSync(OUT_DIR, { recursive: true });
const BASE = process.env.BASE_URL || 'http://localhost:5174';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars']
});

const page = await browser.newPage();
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => consoleErrors.push(err.toString()));

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 60000 });
await page.waitForSelector('#home');
await new Promise((r) => setTimeout(r, 2500));

// Scroll through the page so lazy-loaded project screenshots are fetched
await page.evaluate(async () => {
  const step = Math.floor(window.innerHeight * 0.8);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 250));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 800));
});

const summary = await page.evaluate(() => {
  const sectionIds = ['home', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact'];
  const sections = Object.fromEntries(
    sectionIds.map((id) => [id, !!document.getElementById(id)])
  );
  const texts = {
    h1: document.querySelector('h1')?.textContent?.trim(),
    headings: [...document.querySelectorAll('main h2')].map((h) => h.textContent.trim().replace(/\s+/g, ' ')),
    navItems: [...document.querySelectorAll('header nav a')].map((a) => a.textContent.trim()),
    projectTitles: [...document.querySelectorAll('#projects h3')].map((h) => h.textContent.trim()),
    skillCategories: [...document.querySelectorAll('#skills h3')].map((h) => h.textContent.trim().replace(/\s+/g, ' ')),
    certTitles: [...document.querySelectorAll('#certifications h3')].map((h) => h.textContent.trim()),
    experienceRoles: [...document.querySelectorAll('#experience h3')].map((h) => h.textContent.trim()),
    achievementDates: [...document.querySelectorAll('#experience .font-mono.text-xs')].map((e) => e.textContent.trim()).slice(0, 6)
  };
  const images = [...document.images].map((img) => ({
    alt: img.alt,
    src: img.getAttribute('src'),
    loaded: img.complete && img.naturalWidth > 0,
    width: img.naturalWidth,
    height: img.naturalHeight
  }));
  return {
    sections,
    texts,
    images,
    overflowDesktop: document.documentElement.scrollWidth > window.innerWidth,
    width: window.innerWidth
  };
});

await page.screenshot({
  path: path.join(OUT_DIR, 'portfolio-desktop.png'),
  fullPage: true
});
await page.screenshot({ path: path.join(OUT_DIR, 'portfolio-hero.png') });

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await page.reload({ waitUntil: 'networkidle2' });
await new Promise((r) => setTimeout(r, 2000));
const mobile = await page.evaluate(() => ({
  overflow: document.documentElement.scrollWidth > window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  innerWidth: window.innerWidth
}));
await page.screenshot({
  path: path.join(OUT_DIR, 'portfolio-mobile.png'),
  fullPage: true
});

// Check that resume and project images return 200
const assetChecks = await page.evaluate(async () => {
  const urls = ['/resume.pdf', '/images/arjun.jpg', '/images/projects/alumniconnect.jpg', '/images/projects/animal-rescue.jpg', '/images/projects/courseline.jpg', '/images/projects/orbit.jpg'];
  const results = {};
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'GET' });
      results[url] = res.status;
    } catch (e) {
      results[url] = 'error';
    }
  }
  return results;
});

console.log(JSON.stringify({ summary, mobile, assetChecks, consoleErrors }, null, 2));
await browser.close();
