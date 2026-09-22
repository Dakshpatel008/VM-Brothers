// Run after npm run build and npm run start: node scripts/check-layouts.mjs [base URL]
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import sharp from "sharp";

const plans = JSON.parse(readFileSync(new URL("../data/temporaryFloorPlans.json", import.meta.url), "utf8"));
assert.equal(plans.length, 25);

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const configurations = {
  "sahjanand-bunglows-row-house": ["2-bhk", "3-bhk"],
  "shubh-aangan": ["2-bhk", "3-bhk"],
  "vinayak-villa": ["2-bhk", "3-bhk", "4-bhk"],
  "aarna-heights": ["1-bhk"],
};
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
let checked = 0;
for (const [slug, layouts] of Object.entries(configurations)) {
  const parentPath = `/projects/${slug}`;
  const parent = await fetch(`${base}${parentPath}`);
  assert.equal(parent.status, 200, parentPath);
  const parentHtml = await parent.text();
  assert.ok(parentHtml.indexOf("Project Overview") < parentHtml.indexOf('id="home-layouts-heading"'));
  assert.match(parentHtml, /id="explore-projects-heading"/);
  for (const layout of layouts) {
    const path = `${parentPath}/layouts/${layout}`;
    assert.ok(parentHtml.includes(`href="${path}"`), `Parent link missing: ${path}`);
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
    assert.ok(main, `${path}: missing main`);
    assert.ok(main.includes(`href="${parentPath}"`), `${path}: missing back link`);
    assert.match(main, /href="\/projects"/);
    assert.match(main, /href="\/contact#enquiry"/);
    const bedrooms = Number(layout[0]);
    const matching = plans.filter((plan) => plan.bedrooms === bedrooms);
    assert.doesNotMatch(main, /Era Residence|Enlarge Era/);
    if (matching.length) {
      assert.match(main, /Temporary sample plans/);
      assert.match(main, /<img\b/);
      assert.match(main, /object-contain/);
      assert.equal((main.match(/aria-pressed=/g) ?? []).length, matching.length);
      for (const plan of plans) {
        assert.equal(main.includes(`sample ${plan.unit}`), plan.bedrooms === bedrooms, `${path}: bedroom mapping ${plan.unit}`);
      }
    } else {
      assert.match(main, /Floor plan available on request/);
      assert.doesNotMatch(main, /<img\b/);
    }
    assert.doesNotMatch(main, /\bdownload(?:=|\s|>)|id="layout-gallery-heading"/);
    assert.ok(html.match(/<title>(.*?)<\/title>/)?.[1].includes(layout.replace("-bhk", " BHK")));
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.equal(new URL(canonical?.[1]).pathname, path);
    assert.ok(sitemap.includes(`${path}</loc>`), `${path}: missing sitemap entry`);
    for (const sibling of layouts.filter((item) => item !== layout)) {
      assert.ok(main.includes(`href="${parentPath}/layouts/${sibling}"`), `${path}: missing sibling`);
    }
    checked++;
  }
}
for (const path of [
  "/projects/unknown/layouts/2-bhk",
  "/projects/aarna-heights/layouts/2-bhk",
  "/projects/vinayak-villa/layouts/unknown",
  "/projects/two-balcony-luxury-villa/layouts/2-bhk",
]) {
  assert.equal((await fetch(`${base}${path}`)).status, 404, path);
}
const contact = await fetch(`${base}/contact`);
assert.equal(contact.status, 200);
assert.match(await contact.text(), /id="enquiry"/);
assert.equal(checked, 8);
for (const plan of plans) {
  const asset = await fetch(`${base}${plan.src}`);
  assert.equal(asset.status, 200);
  assert.match(asset.headers.get("content-type"), /image\/webp/);
  const bytes = Buffer.from(await asset.arrayBuffer());
  assert.ok(bytes.byteLength > 1000);
  const dimensions = await sharp(bytes).metadata();
  assert.equal(dimensions.width, plan.width);
  assert.equal(dimensions.height, plan.height);
}
console.log("Passed: 8 layouts, local preview assets, parent/sibling links, metadata, sitemap, 404s and enquiry target.");
