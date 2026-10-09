import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { chromium } from 'playwright';
import { HtmlValidate } from 'html-validate';
import axe from 'axe-core';

const root = resolve(import.meta.dirname, '..');
const validator = new HtmlValidate({ extends: ['html-validate:standard'], rules: { 'no-dup-id': 'error', 'element-permitted-content': 'error', 'element-permitted-parent': 'error' } });
const markup = await validator.validateString(await readFile(resolve(root, 'index.html'), 'utf8'));
assert.ok(markup.valid, JSON.stringify(markup.results.flatMap(result => result.messages), null, 2));
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + '\\') && !file.startsWith(root + '/')) throw new Error('Invalid path');
    const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg' };
    res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const url = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, timeout: 15000 });

async function audit(page, label) {
  await page.waitForTimeout(1000);
  await page.addScriptTag({ content: axe.source });
  const violations = await page.evaluate(async () => (await axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
  })).violations.map(item => ({ id: item.id, impact: item.impact, nodes: item.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })));
  assert.deepEqual(violations, [], `${label}: ${JSON.stringify(violations, null, 2)}`);
  console.log(`axe OK: ${label}`);
}

try {
  for (const mobile of [false, true]) {
    const context = await browser.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    await page.waitForSelector('.faq_question');
    await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is_visible')));
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('.faq_answer_wrap:not([hidden])').count(), 1);
    await page.locator('.faq_question').nth(2).click();
    assert.equal(await page.locator('.faq_question').nth(2).getAttribute('aria-expanded'), 'true');
    assert.equal(await page.locator('.faq_answer_wrap:not([hidden])').count(), 1);
    await page.locator('.faq_question').nth(2).click();
    assert.equal(await page.locator('.faq_answer_wrap:not([hidden])').count(), 0);
    await page.locator('.projects_swap_nav_btn').nth(1).click();
    assert.equal(await page.locator('.card-swap-card:not([aria-hidden="true"]) a').count(), 1);
    assert.equal(await page.locator('.projects_swap_nav_btn').nth(1).getAttribute('aria-pressed'), 'true');
    await audit(page, mobile ? 'mobile PT, menu closed' : 'desktop PT');
    if (mobile) {
      await page.locator('#menu_toggle').click();
      await page.waitForFunction(() => document.activeElement.closest('nav')?.id === 'main_nav');
      assert.equal(await page.evaluate(() => document.querySelector('main').inert), true);
      assert.equal(await page.evaluate(() => document.activeElement.closest('nav')?.id), 'main_nav');
      await audit(page, 'mobile menu open');
      await page.locator('#menu_toggle').focus();
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.closest('header')?.id), 'site_header');
      await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'menu_toggle');
      assert.equal(await page.evaluate(() => document.querySelector('main').inert), false);
    }
    await page.locator('#lang_toggle').click();
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    await audit(page, mobile ? 'mobile EN' : 'desktop EN');
    await page.locator('#hero_logo_cube').focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => !document.getElementById('hero_logo_cube').hasAttribute('aria-busy'));
    assert.equal(await page.locator('#hero_logo_cube').getAttribute('aria-label'), 'Reassemble the Dev Point Studio cube');
    await page.keyboard.press('Space');
    await page.waitForFunction(() => !document.getElementById('hero_logo_cube').hasAttribute('aria-busy'));
    assert.equal(await page.locator('#hero_logo_cube').getAttribute('aria-label'), 'Animate the Dev Point Studio logo');
    assert.deepEqual(errors, []);
    await context.close();
  }
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(url);
  await page.waitForSelector('.faq_question');
  assert.equal(await page.locator('body').getAttribute('data-motion-paused'), 'true');
  await audit(page, 'reduced motion');
  await context.close();
  console.log('HTML, FAQ, project links, focus management, language, logo keyboard interaction and reduced motion OK.');
} finally {
  await browser.close();
  server.close();
}
