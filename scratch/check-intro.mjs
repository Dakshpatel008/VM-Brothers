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
await send('Page.addScriptToEvaluateOnNewDocument', { source: `
  window.introSamples = [];
  window.introVideo = null;
  const record = setInterval(() => {
    const root = document.querySelector('.home-intro');
    const video = document.querySelector('[data-intro-media] video');
    if (!root || !video) return;
    window.introVideo ||= video;
    const letters = [...document.querySelectorAll('.intro-char')];
    const nativeLetters = letters.filter(letter => letter.getAnimations().length > 0).length;
    const settledLetters = letters.length > 0 && letters.every(letter => {
      const animation = letter.getAnimations()[0];
      const style = getComputedStyle(letter);
      return animation?.playState === 'finished' && new DOMMatrix(style.transform).m42 === 0 && style.translate === 'none';
    });
    window.introSamples.push({phase: root.dataset.intro, same: video === window.introVideo,
      time: video.currentTime, count: document.querySelectorAll('video').length, nativeLetters, settledLetters});
    if (root.dataset.intro === 'complete') clearInterval(record);
  }, 50);
` });
for (const scenario of ['desktop', 'cached-refresh', 'mobile', 'reduced', 'resize', 'failed-video']) {
  await send('Emulation.setDeviceMetricsOverride', { width: scenario === 'mobile' ? 390 : 1440, height: scenario === 'mobile' ? 844 : 900, deviceScaleFactor: 1, mobile: scenario === 'mobile' });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: scenario === 'reduced' ? 'reduce' : 'no-preference' }] });
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: scenario === 'desktop' });
  await send('Emulation.setCPUThrottlingRate', { rate: scenario === 'desktop' ? 4 : 1 });
  await send('Network.setBlockedURLs', { urls: scenario === 'failed-video' ? ['*.mp4'] : [] });
  await send('Page.navigate', { url: `http://127.0.0.1:3000/?intro-check=${scenario}` });
  let resized = false;
  let checkedLock = false;
  let complete = false;
  let capturedTitle = false;
  for (let attempt = 0; attempt < 120; attempt++) {
    await pause(150);
    const phase = await evaluate(`document.querySelector('.home-intro')?.dataset.intro`);
    if (!capturedTitle && ['desktop', 'mobile'].includes(scenario) && await evaluate('window.introSamples?.some(sample => sample.settledLetters)')) {
      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      await writeFile(`scratch/intro-title-${scenario}.png`, Buffer.from(screenshot.data, 'base64'));
      capturedTitle = true;
    }
    if (scenario === 'desktop' && phase === 'loading' && !checkedLock && await evaluate("document.body.style.overflow === 'hidden'")) {
      await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 200, y: 200, deltaX: 0, deltaY: 500 });
      await pause(150);
      assert.equal(await evaluate('window.scrollY'), 0, 'intro allowed scrolling');
      checkedLock = true;
    }
    if (scenario === 'resize' && phase === 'loading' && !resized) {
      await send('Emulation.setDeviceMetricsOverride', { width: 1000, height: 750, deviceScaleFactor: 1, mobile: false });
      resized = true;
    }
    if (phase === 'complete') { complete = true; break; }
  }
  assert.ok(complete, `${scenario}: intro did not complete`);
  const result = await evaluate(`({samples: window.introSamples, locked: document.body.style.overflow === 'hidden', inert: !!document.querySelector('.home-intro > [inert]'), clip: getComputedStyle(document.querySelector('[data-intro-media]')).clipPath, heading: getComputedStyle(document.querySelector('h1')).opacity, title: !!document.querySelector('.intro-title')})`);
  assert.equal(result.locked, false);
  assert.equal(result.inert, false);
  assert.equal(result.clip, 'none');
  assert.equal(result.heading, '1');
  assert.equal(result.title, false);
  assert.ok(result.samples.every(sample => sample.same && sample.count === 1));
  if (['desktop', 'cached-refresh', 'mobile'].includes(scenario)) {
    assert.ok(result.samples.some(sample => sample.nativeLetters === 10), `${scenario}: native letter animation missing`);
    assert.ok(result.samples.some(sample => sample.settledLetters), `${scenario}: letters never settled at their visible position`);
  }
  if (scenario === 'desktop' || scenario === 'mobile') {
    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    await writeFile(`scratch/intro-${scenario}.png`, Buffer.from(screenshot.data, 'base64'));
  }
  await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 200, y: 200, deltaX: 0, deltaY: 500 });
  await pause(750);
  assert.ok(await evaluate('window.scrollY > 0'), `${scenario}: scrolling stayed locked`);
  console.log(`${scenario}: passed (${result.samples.length} video continuity samples)`);
}
socket.close();
