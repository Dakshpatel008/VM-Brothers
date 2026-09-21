// Run with a Chromium debugging endpoint on port 9333 and Next on port 3000.
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const tabs = await (await fetch('http://127.0.0.1:9333/json/list')).json();
const socket = new WebSocket(tabs.find(tab => tab.type === 'page').webSocketDebuggerUrl);
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
try {
  for (const [width, height] of [[1440, 900], [390, 844], [1280, 650]]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'http://127.0.0.1:3000/' });
    for (let i = 0; i < 160; i++) {
      await pause(200);
      if (await evaluate(`document.querySelector('.home-intro')?.dataset.intro === 'complete' && !!document.querySelector('#home-services[data-pinned]')`)) break;
    }
    assert.ok(await evaluate(`!!document.querySelector('#home-services[data-pinned]')`));
    assert.ok(await evaluate(`document.documentElement.classList.contains('lenis')`));
    for (const progress of [0, .5, 1, 0]) {
      await evaluate(`{
        const section = document.querySelector('#home-services');
        window.scrollTo({top: section.getBoundingClientRect().top + window.scrollY + (section.offsetHeight - innerHeight) * ${progress}, behavior: 'instant'});
      }`);
      await pause(700);
      const geometry = await evaluate(`(() => {
        const section = document.querySelector('#home-services');
        const track = section.querySelector('ul');
        const image = section.querySelector('li').lastElementChild.getBoundingClientRect();
        return { x: new DOMMatrix(getComputedStyle(track).transform).m41,
          distance: track.scrollWidth - section.firstElementChild.clientWidth, top: section.firstElementChild.getBoundingClientRect().top,
          overflow: document.documentElement.scrollWidth > innerWidth, imageHeight: image.height };
      })()`);
      assert.ok(Math.abs(geometry.x + geometry.distance * progress) < 3, JSON.stringify({progress, geometry}));
      assert.ok(Math.abs(geometry.top) < 3, 'pin drifted');
      assert.equal(geometry.overflow, false, 'page has horizontal overflow');
      assert.ok(geometry.imageHeight > 100, 'image collapsed');
    }
    await pause(1000);
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    await writeFile(`scratch/services-${width}.png`, Buffer.from(shot.data, 'base64'));
    console.log(`${width}x${height}: scroll endpoints, reverse, pinning and layout passed`);
  }
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await pause(500);
  assert.ok(await evaluate(`(() => {
    const section = document.querySelector('#home-services');
    return !section.dataset.pinned && getComputedStyle(section.querySelector('ul')).transform === 'none' && section.querySelectorAll('li').length === 6;
  })()`), 'reduced motion did not restore vertical content');
  console.log('Reduced motion: all six services restored to normal flow');
} finally {
  socket.close();
}
