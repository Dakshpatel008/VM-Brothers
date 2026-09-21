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
await send('Emulation.setScriptExecutionDisabled', { value: true });
await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
const waitFor = async expression => {
  for (let i = 0; i < 100; i++) {
    if (await evaluate(expression)) return;
    await pause(200);
  }
  assert.fail(expression);
};
for (const width of [1440, 390]) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width === 390 });
  await send('Page.navigate', { url: 'http://127.0.0.1:3000/' });
  await waitFor(`!!document.querySelector('article a[aria-label]')`);
  const projects = await evaluate(`Array.from(document.querySelectorAll('article a[aria-label]')).map(a => a.getAttribute('href'))`);
  assert.equal(projects.length, 4);
  for (const href of projects) {
    const coverage = await evaluate(`(() => {
      const link = document.querySelector('article a[href="${href}"]');
      const a = link.getBoundingClientRect(), b = link.closest('article').getBoundingClientRect();
      return Math.abs(a.width-b.width)<2 && Math.abs(a.height-b.height)<2;
    })()`);
    assert.ok(coverage, `${href}: link does not cover the full card`);
  }
  for (const href of projects) {
    await send('Page.navigate', { url: `http://127.0.0.1:3000${href}` });
    await waitFor(`location.pathname === '${href}' && !!document.getElementById('explore-projects-heading')`);
    const navigation = await evaluate(`(() => {
      const nav=document.querySelector('nav[aria-labelledby="explore-projects-heading"]');
      return {links:Array.from(nav.querySelectorAll('a')).map(a=>a.getAttribute('href')),current:nav.querySelector('[aria-current="page"]')?.getAttribute('href'),overflow:document.documentElement.scrollWidth>innerWidth};
    })()`);
    assert.deepEqual(navigation.links, projects);
    assert.equal(navigation.current, href);
    assert.equal(navigation.overflow, false);
  }
  await evaluate('document.fonts.ready');
  await pause(500);
  await evaluate(`document.getElementById('explore-projects-heading').scrollIntoView({behavior:'instant',block:'start'})`);
  await evaluate('window.scrollBy({top:-100,behavior:"instant"})');
  await pause(200);
  const screenshot=await send('Page.captureScreenshot',{format:'png'});
  await writeFile(`scratch/project-navigation-${width}.png`,Buffer.from(screenshot.data,'base64'));
  console.log(`${width}px: full-card link coverage, all four project lists, current-page labels and overflow checks passed (server-rendered markup)`);
}
await send('Page.close');
socket.close();

