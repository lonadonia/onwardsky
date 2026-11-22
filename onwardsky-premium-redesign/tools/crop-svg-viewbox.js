// Tighten each SVG's viewBox to its drawn bounds. The artwork itself is not altered.
// Usage: node tools/crop-svg-viewbox.js '[["in/logo-mono.svg","assets/airlines/klm.svg"], ...]'   (needs Playwright)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const jobs = JSON.parse(process.argv[2]);
  const b = await chromium.launch(); const page = await b.newPage();
  for (const [src, dest] of jobs) {
    let svg = fs.readFileSync(src, 'utf8');
    await page.setContent('<body style="margin:0">' + svg + '</body>');
    const bb = await page.evaluate(() => { const r = document.querySelector('svg').getBBox(); return [r.x, r.y, r.width, r.height]; });
    const pad = Math.max(bb[2], bb[3]) * 0.01;
    const vb = [bb[0] - pad, bb[1] - pad, bb[2] + 2 * pad, bb[3] + 2 * pad].map(n => +n.toFixed(3)).join(' ');
    svg = svg.replace(/viewBox="[^"]*"/, `viewBox="${vb}"`).replace(/<title>.*?<\/title>/, '').replace(/ role="img"/, '');
    fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, svg);
    console.log(path.basename(dest), vb);
  }
  await b.close();
})();
