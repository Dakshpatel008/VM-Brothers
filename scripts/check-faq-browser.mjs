// Run with Next on 3000 and Chromium debugging on 9333: node scripts/check-faq-browser.mjs [base URL]
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

const click = async (selector, mobile) => {
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({behavior:'instant',block:'center'})`);
  const point = await evaluate(`(() => {const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
  if (mobile) {
    await send("Input.dispatchTouchEvent", {type:"touchStart",touchPoints:[point]});
    await send("Input.dispatchTouchEvent", {type:"touchEnd",touchPoints:[]});
  } else {
    await send("Input.dispatchMouseEvent", {type:"mousePressed",button:"left",clickCount:1,...point});
    await send("Input.dispatchMouseEvent", {type:"mouseReleased",button:"left",clickCount:1,...point});
  }
};
try {
  for (const [width, reduced] of [[1440,false],[390,false],[390,true]]) {
    await send("Emulation.setDeviceMetricsOverride", {width,height:900,deviceScaleFactor:1,mobile:width===390});
    await send("Emulation.setTouchEmulationEnabled", {enabled:width===390});
    await send("Emulation.setEmulatedMedia", {features:[{name:"prefers-reduced-motion",value:reduced?"reduce":"no-preference"}]});
    await send("Page.navigate", {url:base+"/"});
    await waitFor(`document.querySelector('.home-intro')?.dataset.intro === 'complete' && !!document.querySelector('#faq [role="tab"]')`);
    assert.equal(await evaluate(`document.querySelectorAll('#faq [role="tab"]').length`),3);
    assert.equal(await evaluate(`document.querySelector('#faq [role="tab"][aria-selected="true"]').textContent`),"General");
    assert.equal(await evaluate(`document.querySelectorAll('#faq [aria-expanded]').length`),2);
    await click('#faq [aria-expanded]',width===390);
    await waitFor(`document.querySelector('#faq [aria-expanded]').getAttribute('aria-expanded') === 'true' && document.querySelector('#faq [role="region"]').getBoundingClientRect().height > 20`);
    await click('#faq [aria-expanded]',width===390);
    await waitFor(`document.querySelector('#faq [role="region"]').getBoundingClientRect().height < 1`);
    await click('#faq [role="tab"]:nth-child(2)',width===390);
    await waitFor(`document.querySelector('#faq [role="tabpanel"]').textContent.includes('Can I book a site visit?')`);
    await click('#faq [aria-expanded]',width===390);
    await waitFor(`document.querySelector('#faq [role="region"]').getAttribute('aria-hidden') === 'false'`);
    await evaluate(`document.querySelector('#faq [role="tab"]:nth-child(2)').focus()`);
    await send("Input.dispatchKeyEvent",{type:"keyDown",key:"End",code:"End",windowsVirtualKeyCode:35});
    await waitFor(`document.querySelector('#faq [role="tabpanel"]').textContent.includes('Are the prices shown')`);
    assert.equal(await evaluate("document.activeElement.textContent"),"Pricing");
    await send("Input.dispatchKeyEvent",{type:"keyDown",key:"ArrowRight",code:"ArrowRight",windowsVirtualKeyCode:39});
    await waitFor(`document.querySelector('#faq [role="tab"][aria-selected="true"]').textContent === 'General'`);
    assert.equal(await evaluate("document.activeElement.textContent"),"General");
    await waitFor(`document.querySelectorAll('#faq [aria-expanded]').length === 2`);
    assert.equal(await evaluate("document.documentElement.scrollWidth > innerWidth"),false);
    assert.equal(await evaluate(`document.querySelector('#faq [aria-expanded]').getAttribute('aria-expanded')`),"false");
    await evaluate(`document.getElementById('faq').scrollIntoView({behavior:'instant',block:'start'});window.scrollBy(0,-90)`);
    const screenshot=await send("Page.captureScreenshot",{format:"png"});
    await writeFile(`scratch/faq-${width}-${reduced?"reduced":"motion"}.png`,Buffer.from(screenshot.data,"base64"));
    console.log(`${width}px reduced=${reduced}: tabs, accordion, keyboard wrap, touch/click, hidden answers and overflow passed`);
  }
} finally {
  await send("Page.close");
  socket.close();
}
