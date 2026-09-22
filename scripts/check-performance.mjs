// Run after npm run build. Byte counts are uncompressed build artifacts, not network timings.
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";

for (const route of ["index", "projects", "projects/sahjanand-bunglows-row-house/layouts/2-bhk"]) {
  const html = readFileSync(`.next/server/app/${route}.html`, "utf8");
  const scripts = [...html.matchAll(/src="(\/_next\/static\/[^" ]+\.js)"/g)].map((match) => match[1]);
  assert.ok(scripts.length);
  let jsBytes = 0;
  for (const script of scripts) {
    const js = readFileSync(`.next/${script.replace("/_next/", "")}`, "utf8");
    jsBytes += Buffer.byteLength(js);
    assert.ok(!js.includes("temporaryEraFloorPlans"), "Stale floor-plan reference");
    assert.ok(!js.includes("cdn.prod.website-files.com"), "Source manifest leaked into initial JavaScript");
    assert.ok(!js.includes("maxZoomPixelRatio"), "Lightbox zoom loaded before opening a plan");
  }
  if (route === "index") assert.ok(!html.includes("/projects/era-preview/"), "Homepage serialized unused floor plans");
  assert.match(html, /rel="preload"[^>]+Gallient\.woff2/);
  assert.match(html, /rel="preload"[^>]+F37BoltonArabic-VF\.woff2/);
  console.log(JSON.stringify({ route, htmlBytes: Buffer.byteLength(html), jsBytes, scripts: scripts.length }));
}
const assets = "public/wp-content/uploads/2026/02/";
assert.ok(statSync(`${assets}Home-2-1-web.mp4`).size < statSync(`${assets}Home-2-1.mp4`).size);
console.log("Passed: floor-plan isolation, lazy lightbox, font preloads and smaller hero video.");
