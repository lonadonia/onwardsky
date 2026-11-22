// Palette audit: lists every colour the rendered page paints (text, backgrounds, borders, outlines, svg
// fill/stroke, gradients, shadows) and flags any value that is not part of the brand palette.
// Usage: serve the folder (python3 -m http.server 8765), then
//   URL=http://127.0.0.1:8765/index.html NODE_PATH=$(npm root -g) node tools/palette-audit.js   (needs Playwright)
// Short hex in the client's art (#FFF) is expanded to #FFFFFF; "#7A3300" at 28-30% is the production CTA shadow tint.
// The error and hover states are read after the transitions settle, so mid-transition frames are not reported.
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(process.env.URL || 'http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
  const t = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < t; y += 500) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(80); }
  // open the states that add colours: errors, routed, suggestions, multi-city
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.click('.btn-submit'); await page.waitForTimeout(700); // transitions are 120-360ms: read the settled colours
  const res = await page.evaluate(() => {
    const hex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
    const rgbRe = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)/g;
    const found = new Map();
    const add = (css, where, prop) => {
      if (!css || css === 'none') return;
      let m; rgbRe.lastIndex = 0;
      while ((m = rgbRe.exec(css))) {
        let a = m[4] === undefined ? 1 : (m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]));
        if (a === 0) continue;
        const h = hex(+m[1], +m[2], +m[3]);
        const key = h;
        const e = found.get(key) || { n: 0, alpha: new Set(), where: new Set() };
        e.n++; e.alpha.add(+a.toFixed(2)); if (e.where.size < 3) e.where.add(where + ':' + prop);
        found.set(key, e);
      }
    };
    const props = ['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor', 'textDecorationColor', 'caretColor', 'fill', 'stroke', 'backgroundImage', 'boxShadow'];
    const all = document.querySelectorAll('body *');
    all.forEach(el => {
      const cs = getComputedStyle(el);
      const where = el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '');
      props.forEach(p => {
        if (p.startsWith('border') && cs[p.replace('Color', 'Style')] === 'none') return;
        if (p === 'outlineColor' && cs.outlineStyle === 'none') return;
        if ((p === 'fill' || p === 'stroke') && !(el instanceof SVGElement)) return;
        add(cs[p], where, p);
      });
    });
    // inline svg presentation attributes (illustrations) and svg files are checked separately
    document.querySelectorAll('svg [fill], svg [stroke]').forEach(el => { ['fill', 'stroke'].forEach(a => { const raw = el.getAttribute(a); if (raw && raw.startsWith('#')) { const v = (raw.length === 4 ? '#' + raw[1] + raw[1] + raw[2] + raw[2] + raw[3] + raw[3] : raw).toUpperCase(); const e = found.get(v) || { n: 0, alpha: new Set([1]), where: new Set() }; e.n++; e.where.add('svg:' + a); found.set(v, e); } }); });
    return [...found.entries()].map(([h, e]) => ({ hex: h, n: e.n, alpha: [...e.alpha], where: [...e.where] }));
  });
  const palette = {
    '#FFFFFF': 'base', '#12262A': 'ink', '#0E2F34': 'heading', '#33484B': 'secondary', '#4A6266': 'muted', '#156970': 'accent', '#21A1A3': 'accent-bright', '#0F555B': 'deep',
    '#E7F3F3': 'surface', '#EFF4F4': 'surface-alt', '#F3F8F8': 'surface-soft', '#D5E4E4': 'border', '#C6D7D7': 'border-strong', '#DDE7E7': 'divider',
    '#C94300': 'cta', '#B33C00': 'cta-hover', '#9C3200': 'cta-active',
    '#F5FAFA': 'v9-bg', '#E5EBEB': 'v9-line', '#EEF7F7': 'v9-wash', '#186C73': 'v9-strip-1', '#D9F1EE': 'v9-strip-ink', '#0F5A60': 'v9-deep', '#C8E6E1': 'v9-mint', '#86D6D2': 'v9-aqua',
    '#FFD3BA': 'v9-peach', '#FFEDE7': 'v9-peach-wash', '#CC4700': 'v9-orange', '#9DC4C7': 'v9-bar', '#D7E4E4': 'v9-on-dark', '#ABC2C1': 'v9-on-dark-2', '#5F7477': 'v9-placeholder', '#00B67A': 'tp-green',
    '#809194': 'field-line (derived: muted 70% on white)', '#000000': 'black (shadow / mask only)', '#7A3300': 'cta shadow tint (production, shadow only)',
  };
  const rows = res.sort((a, b) => b.n - a.n);
  let off = 0;
  for (const r of rows) {
    const name = palette[r.hex];
    if (!name) off++;
    console.log(`${name ? 'ok ' : 'OFF'} ${r.hex}  ${String(r.n).padStart(4)}  ${name || ''}  alpha=${r.alpha.join('/')}  ${r.where.join(' ')}`);
  }
  console.log('distinct colours:', rows.length, '| not in palette:', off);
  await browser.close();
})();
