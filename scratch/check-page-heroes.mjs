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
const waitFor = async expression => {
  for (let i=0;i<100;i++) {
    if(await evaluate(expression)) return;
    await pause(100);
  }
  assert.fail(expression);
};
for(const width of [1440,390]) {
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
  for(const route of ['/services','/about-us','/how-we-work','/contact','/projects/sahjanand-bunglows-row-house','/projects']) {
    await send('Page.navigate',{url:`http://127.0.0.1:3000${route}`});
    await waitFor(`location.pathname==='${route}' && !!document.querySelector('main section img')`);
    await evaluate('document.fonts.ready');
    await pause(200);
    await evaluate('window.scrollTo({top:0,behavior:"instant"})');
    const layout=await evaluate(`(() => {
      const hero=document.querySelector('main section'),image=hero.querySelector('img');
      return {bottom:hero.getBoundingClientRect().bottom,viewport:innerHeight,top:hero.getBoundingClientRect().top,imageTop:image.getBoundingClientRect().top,imagePosition:getComputedStyle(image).objectPosition,headingTop:hero.querySelector('h1').getBoundingClientRect().top,headerBottom:document.querySelector('header').getBoundingClientRect().bottom};
    })()`);
    assert.ok(layout.bottom >= layout.viewport, route + ': banner ends before viewport bottom');
    assert.equal(layout.top,0,`${route}: hero has a top gap`);
    assert.equal(layout.imageTop,0,`${route}: image has a top gap`);
    assert.equal(layout.imagePosition,'50% 100%',`${route}: image bottom is cropped`);
    assert.ok(layout.headingTop>layout.headerBottom,`${route}: heading overlaps header`);
    if(route==='/services') {
      const screenshot=await send('Page.captureScreenshot',{format:'png'});
      await writeFile(`scratch/page-hero-${width}.png`,Buffer.from(screenshot.data,'base64'));
    }
  }
  assert.ok(await evaluate(`Array.from(document.querySelectorAll('article')).every(card=>{
    const links=card.querySelectorAll('a'); if(links.length!==1)return false;
    const a=links[0].getBoundingClientRect(),b=card.getBoundingClientRect();
    return Math.abs(a.width-b.width)<2 && Math.abs(a.height-b.height)<2;
  })`),'Card links do not cover the whole card');
  const href=await evaluate(`document.querySelector('article a').getAttribute('href')`);
  await evaluate(`document.querySelector('article').scrollIntoView({behavior:'instant',block:'center'})`);
  await pause(200);
  const point=await evaluate(`(() => {const r=document.querySelector('article').getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+100};})()`);
  await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...point});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...point});
  await waitFor(`location.pathname==='${href}'`);
  console.log(`${width}px: six full-height, gap-free heroes and project card image click passed`);
}
await send('Page.close');
socket.close();

