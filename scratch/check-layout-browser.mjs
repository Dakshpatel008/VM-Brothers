// Next on 3000; headless Chromium debugging on 9333.
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const base = process.argv[2] ?? "http://127.0.0.1:3000";
const tab = await (await fetch("http://127.0.0.1:9333/json/new?about:blank", { method: "PUT" })).json();
const socket = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener("open", resolve, { once: true }));
let id = 0;
const pending = new Map();
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (!message.id) return;
  const task = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) task.reject(message.error); else task.resolve(message.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  pending.set(++id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async expression => {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
const waitFor = async expression => {
  for (let i = 0; i < 80; i++) {
    if (await evaluate(expression)) return;
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  assert.fail(expression);
};
await send("Page.enable");
await send("Runtime.enable");
for (const width of [1440, 390]) {
  await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width === 390 });
  const path = "/projects/sahjanand-bunglows-row-house/layouts/2-bhk";
  await send("Page.navigate", { url: `${base}${path}` });
  await waitFor(`location.pathname === '${path}' && !!document.getElementById('home-details-heading') && document.readyState === 'complete'`);
  await evaluate("document.fonts.ready");
  assert.equal(await evaluate("document.documentElement.scrollWidth > innerWidth"), false);
  assert.equal(await evaluate("document.querySelectorAll('main [download], #layout-gallery-heading').length"), 0);
  await waitFor(`document.querySelector('main img')?.naturalWidth > 0`);
  await evaluate(`document.querySelectorAll('[aria-label="Floor drawings"] button')[1].click()`);
  await waitFor(`document.querySelector('main img')?.alt.includes('112') && document.querySelector('main img').complete && document.querySelector('main img').naturalWidth > 0`);
  await evaluate(`document.querySelector('[aria-label="Enlarge 2 BHK — sample 112"]').click()`);
  await waitFor(`!!document.querySelector('.yarl__portal')`);
  assert.ok(await evaluate(`!!document.querySelector('button[aria-label="Zoom in"]')`));
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await waitFor(`!document.querySelector('.yarl__portal')`);
  const positions = await evaluate(`(() => {
    const plan = document.querySelector('section[aria-label="Floor plan"]').getBoundingClientRect();
    const details = document.querySelector('section[aria-labelledby="home-details-heading"]').getBoundingClientRect();
    return { planBottom: plan.bottom, planTop: plan.top, detailsTop: details.top };
  })()`);
  if (width === 390) assert.ok(positions.detailsTop > positions.planBottom);
  else assert.ok(Math.abs(positions.planTop - positions.detailsTop) < 2);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  await writeFile(`scratch/layout-${width}.png`, Buffer.from(shot.data, "base64"));
  await evaluate(`document.querySelector('section[aria-labelledby="home-details-heading"] a').click()`);
  await waitFor(`location.pathname === '/contact' && location.hash === '#enquiry' && !!document.getElementById('enquiry')`);
  await waitFor(`document.getElementById('enquiry').getBoundingClientRect().top < innerHeight && document.getElementById('enquiry').getBoundingClientRect().bottom > 0`);
  console.log(`${width}px: local plan loading, selection, lightbox/zoom controls, responsive layout and enquiry navigation passed.`);
}
await send("Page.close");
socket.close();
