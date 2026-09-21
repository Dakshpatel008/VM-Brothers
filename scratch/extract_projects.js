const fs = require('fs');
const path = require('path');

const projectsDir = path.resolve(__dirname, '../../oliviaharperhomes.com/oliviaharperhomes.com/projects');
const slugs = [
  '1000-89-st-surfside',
  '1710-s-bayshore-drive',
  '1716-s-bayshore-drive',
  'hibiscus-island-estate',
  'miami-beach-residence',
  'normandy-shores'
];

function cleanText(t) {
  if (!t) return '';
  return t
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .trim();
}

const projects = [];

slugs.forEach(slug => {
  const indexPath = path.join(projectsDir, slug, 'index.html');
  if (!fs.existsSync(indexPath)) return;
  const html = fs.readFileSync(indexPath, 'utf-8');

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  let title = titleMatch ? titleMatch[1].replace(' - Olivia Harper Homes', '').trim() : slug;
  title = cleanText(title);

  // Hero Image
  let heroImage = '';
  const heroMatch = html.match(/background-image:url\("([^"]+)"\);/);
  if (heroMatch) {
    heroImage = heroMatch[1].replace('../../', '/');
  }

  // Address
  let address = title;
  const addressMatch = html.match(/<h3 class="elementor-heading-title[^>]*>([^<]+)<\/h3>/);
  if (addressMatch) {
    address = cleanText(addressMatch[1]);
  }

  // Introduction paragraphs
  let introParagraphs = [];
  const introMatch = html.match(/Introduction<\/h2>[\s\S]*?<div class="elementor-element[^>]*elementor-widget-text-editor"[^>]*>([\s\S]*?)<\/div>/);
  if (introMatch) {
    const raw = introMatch[1];
    const pMatches = [...raw.matchAll(/<(?:p|div)[^>]*>([\s\S]*?)<\/(?:p|div)>/g)];
    if (pMatches.length > 0) {
      pMatches.forEach(pm => {
        const text = cleanText(pm[1]);
        if (text && text.length > 10) introParagraphs.push(text);
      });
    } else {
      const text = cleanText(raw);
      if (text) introParagraphs.push(text);
    }
  }

  // About this project paragraphs
  let aboutParagraphs = [];
  const aboutSectionMatch = html.match(/About this project<\/h2>[\s\S]*?<div class="elementor-element[^>]*elementor-widget-text-editor"[^>]*>([\s\S]*?)<\/div>/);
  if (aboutSectionMatch) {
    const raw = aboutSectionMatch[1];
    const pMatches = [...raw.matchAll(/<(?:p|div)[^>]*>([\s\S]*?)<\/(?:p|div)>/g)];
    if (pMatches.length > 0) {
      pMatches.forEach(pm => {
        const text = cleanText(pm[1]);
        if (text && text.length > 10) aboutParagraphs.push(text);
      });
    } else {
      const text = cleanText(raw);
      if (text) aboutParagraphs.push(text);
    }
  }

  // Specs
  const specs = [];
  const specMatches = html.matchAll(/<div class="jet-listing-dynamic-field__content"[^>]*>([^<]+)<\/div>/g);
  for (const sm of specMatches) {
    const text = cleanText(sm[1]);
    if (text && !specs.includes(text)) {
      specs.push(text);
    }
  }

  // Gallery Images
  const galleryImages = [];
  const imgMatches = html.matchAll(/<a class="ue-link"[^>]*href="([^"]+)"/g);
  for (const im of imgMatches) {
    let src = im[1].replace('../../', '/');
    if (!galleryImages.includes(src)) {
      galleryImages.push(src);
    }
  }

  projects.push({
    slug,
    title,
    address,
    category: "Current developments",
    heroImage,
    specs,
    introduction: introParagraphs,
    about: aboutParagraphs,
    galleryImages
  });
});

const outDir = path.resolve(__dirname, '../data');
fs.writeFileSync(path.join(outDir, 'projects.json'), JSON.stringify(projects, null, 2));
console.log(`Updated data/projects.json with cleaned text & complete data`);
