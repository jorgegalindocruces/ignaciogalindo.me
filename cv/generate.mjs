// Genera el currículum en PDF a partir de cv/curriculum.html.
// Uso: npm install && npm run cv
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const source = pathToFileURL(path.join(here, 'curriculum.html')).href;
const output = path.join(here, '..', 'curriculum-ignacio-galindo-2026.pdf');

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);
const page = await browser.newPage();
await page.goto(source, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: output, format: 'Letter', printBackground: true, pageRanges: '1' });
await browser.close();

console.log(`Currículum generado: ${path.relative(process.cwd(), output)}`);
