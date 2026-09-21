// Run with a Chromium debugging endpoint on port 9333 and Next on port 3000.
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const tab = await (await fetch('http://127.0.0.1:9333/json/new?about:blank', { method: 'PUT' })).json();
const socket = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
let nextId = 0;
const pending = new Map();
socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (!message.id) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(message.error); else resolve(message.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++nextId;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async expression => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await send('Emulation.setTouchEmulationEnabled', { enabled: true });
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Network.setBlockedURLs', { urls: [] });
await send('Emulation.setCPUThrottlingRate', { rate: 1 });
const waitFor = async expression => {
  for (let i = 0; i < 120; i++) {
    if (await evaluate(expression)) return;
    await pause(250);
  }
  assert.fail(`Timed out: ${expression}`);
};
const tap = async selector => {
  const point = await evaluate(`(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
  await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
};
const swipe = async () => {
  await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 190, y: 700 }] });
  for (let y = 650; y >= 200; y -= 50) {
    await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 190, y }] });
    await pause(20);
  }
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await pause(1000);
};
await send('Page.navigate', { url: 'http://127.0.0.1:3000/?mobile-scroll=' + Date.now() });
await waitFor(`document.querySelector('.home-intro')?.dataset.intro === 'complete'`);
await tap('[aria-label="Scroll to explore"]');
await pause(1500);
console.log('Explore', await evaluate(`({y:scrollY, target:document.getElementById('intro-section').getBoundingClientRect().top, body:document.body.style.overflow})`));
assert.ok(await evaluate('scrollY > 500'), 'Explore tap did not scroll');
const beforeSwipe = await evaluate('scrollY');
await swipe();
assert.ok(await evaluate('scrollY') > beforeSwipe + 100, 'Touch scrolling stopped after Explore');
await tap('[aria-label="Open menu"]');
await pause(600);
  await tap('#mobile-navigation a[href="/contact#enquiry"]');
await waitFor(`location.pathname === '/contact' && !!document.querySelector('form')`);
await pause(1500);
console.log('Contact', await evaluate(`({y:scrollY,body:document.body.style.overflow,form:document.querySelector('form').getBoundingClientRect().top})`));
assert.ok(await evaluate("document.querySelector('form').getBoundingClientRect().top < 750"), 'Contact link did not land on the form');
await swipe();
assert.ok(await evaluate('scrollY > 100'), 'Contact touch scrolling is locked');
for (let i = 0; i < 5 && await evaluate("document.querySelector('form').getBoundingClientRect().top > 750"); i++) await swipe();
assert.ok(await evaluate("document.querySelector('form').getBoundingClientRect().top < 750"), 'Contact form cannot be reached');
const screenshot = await send('Page.captureScreenshot', { format: 'png' });
await writeFile('scratch/mobile-contact-scroll.png', Buffer.from(screenshot.data, 'base64'));
console.log('Mobile Explore, touch scrolling, and contact form: passed');
for (const reduced of [false, true]) {
  await send('Emulation.setDeviceMetricsOverride', { width: 360, height: 740, deviceScaleFactor: 1, mobile: true });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }] });
  await send('Page.navigate', { url: 'http://127.0.0.1:3000/?mobile-scroll=' + Date.now() });
  await waitFor(`document.querySelector('.home-intro')?.dataset.intro === 'complete'`);
  await tap('[data-intro-content] a[href="/contact#enquiry"]');
  await waitFor(`location.pathname === '/contact' && !!document.querySelector('form')`);
  await pause(1500);
  assert.ok(await evaluate("document.querySelector('form').getBoundingClientRect().top < 650"), 'Book a Site Visit did not reveal the form');
  assert.equal(await evaluate('document.body.style.overflow'), '', 'Contact page stayed locked');
  const before = await evaluate('scrollY');
  await swipe();
  assert.ok(await evaluate('scrollY') > before + 100, 'Cannot scroll through the contact form');
  console.log(`Book a Site Visit at 360px, reduced motion ${reduced}: passed`);
}
socket.close();

