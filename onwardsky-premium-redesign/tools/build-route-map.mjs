// Build the hero's vector map from open data: a dot-matrix world map (Natural Earth land, via the `world-atlas`
// package) with flight routes drawn as arcs between real airports, and one Phosphor airplane on a route.
// Nothing is drawn by hand: the land comes from Natural Earth (public domain), the routes are computed between airport
// coordinates, and the airplane is Phosphor's `airplane-fill` icon (MIT).
//
// Usage (needs Node 18+):
//   npm install --prefix /tmp/mapgen world-atlas@2.0.2 topojson-client@3.1.0 d3-geo@3.1.1
//   NODE_PATH=/tmp/mapgen/node_modules node tools/build-route-map.mjs /tmp/mapgen/node_modules/world-atlas/land-110m.json \
//     path/to/@phosphor-icons/core/assets/fill/airplane-fill.svg assets/vectors/route-map.svg assets/vectors/world-dots.svg
// It prints the pin positions (percent of the map box) that index.html uses for the airport-code labels.
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { feature } = await import(require.resolve('topojson-client'));
const { geoEqualEarth, geoContains } = await import(require.resolve('d3-geo'));

const [, , atlasPath, planeSvgPath, outPath, dotsOutPath] = process.argv;
const topo = JSON.parse(readFileSync(atlasPath, 'utf8'));
const land = feature(topo, topo.objects.land);

// The routes are composed in a 16:9 box (W x H); the hero shows it at the top of the panel. The drawing continues
// eastwards to WX, so on a wide hero panel the dots run on (Japan, Australia) to the panel's edge instead of stopping.
const W = 1600, H = 900, WX = 2200;
// Focus: Europe, the Middle East, South and South-East Asia sit in the right half, above the booking form.
const focus = { type: 'Feature', geometry: { type: 'MultiPoint', coordinates: [[-12, 58], [122, 58], [-12, -4], [122, -4]] } };
const projection = geoEqualEarth().rotate([-40, 0]).fitExtent([[W * 0.53, H * 0.07], [W * 0.98, H * 0.56]], focus);

// Dot matrix: a dot wherever the grid point lies on land (d: inside the 16:9 box; dx: the eastward continuation).
const STEP = 10;
let d = '', dx = '';
let n = 0;
for (let y = STEP / 2; y < H; y += STEP) {
  for (let x = STEP / 2; x < WX; x += STEP) {
    const ll = projection.invert([x, y]);
    if (!ll || !isFinite(ll[0]) || ll[1] < -58) continue;           // no Antarctica
    if (x >= W && Math.abs(projection(ll)[0] - x) > 0.5) continue;  // east of the projection's edge (the antimeridian)
    if (geoContains(land, ll)) { if (x < W) d += `M${x} ${y}h0`; else dx += `M${x} ${y}h0`; n++; }
  }
}

// Airports (IATA code, longitude, latitude) and the routes between them.
const A = {
  LHR: [-0.4543, 51.47], LIS: [-9.1359, 38.7742], IST: [28.7519, 41.2753], DXB: [55.3644, 25.2532],
  DEL: [77.1031, 28.5562], BKK: [100.7501, 13.69], SIN: [103.9915, 1.3644],
};
const routes = [['DEL', 'LHR'], ['DEL', 'BKK'], ['DXB', 'LIS'], ['BKK', 'SIN'], ['IST', 'DXB']];
const P = Object.fromEntries(Object.entries(A).map(([k, v]) => [k, projection(v)]));
const fmt = (v) => Math.round(v * 10) / 10;
// Each route is a quadratic arc lifted above the straight line by a quarter of its length (the usual "flight path" bow).
const arcs = routes.map(([a, b]) => {
  const [x1, y1] = P[a], [x2, y2] = P[b];
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, len = Math.hypot(x2 - x1, y2 - y1);
  const nx = -(y2 - y1) / len, ny = (x2 - x1) / len;               // unit normal
  const sgn = ny > 0 ? -1 : 1;                                       // bow upwards
  const cx = mx + sgn * nx * len * 0.25, cy = my + sgn * ny * len * 0.25;
  return { a, b, x1, y1, cx, cy, x2, y2, d: `M${fmt(x1)} ${fmt(y1)}Q${fmt(cx)} ${fmt(cy)} ${fmt(x2)} ${fmt(y2)}` };
});

// The airplane rides the DEL -> LHR arc at the curve parameter t = 0.58, rotated to the arc's tangent.
const r = arcs[0], t = 0.58;
const bx = (1 - t) ** 2 * r.x1 + 2 * (1 - t) * t * r.cx + t * t * r.x2;
const by = (1 - t) ** 2 * r.y1 + 2 * (1 - t) * t * r.cy + t * t * r.y2;
const tx = 2 * (1 - t) * (r.cx - r.x1) + 2 * t * (r.x2 - r.cx), ty = 2 * (1 - t) * (r.cy - r.y1) + 2 * t * (r.y2 - r.cy);
const angle = Math.atan2(ty, tx) * 180 / Math.PI + 90;              // Phosphor's airplane points up
const plane = readFileSync(planeSvgPath, 'utf8').match(/<path[^>]*d="([^"]+)"/)[1];
const PS = 44 / 256;                                                 // 44 map units wide (of 1600)

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WX} ${H}" width="${WX}" height="${H}">` +
  `<path d="${d}${dx}" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="4.4" stroke-linecap="round"/>` +
  arcs.map((a) => `<path d="${a.d}" fill="none" stroke="#86D6D2" stroke-opacity=".28" stroke-width="7" stroke-linecap="round"/><path d="${a.d}" fill="none" stroke="#86D6D2" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="5 7"/>`).join('') +
  Object.entries(P).map(([k, [x, y]]) => `<circle cx="${fmt(x)}" cy="${fmt(y)}" r="13" fill="#86D6D2" fill-opacity=".2"/><circle cx="${fmt(x)}" cy="${fmt(y)}" r="5.5" fill="#86D6D2" stroke="#fff" stroke-width="2"/>`).join('') +
  `<g transform="translate(${fmt(bx)} ${fmt(by)}) rotate(${fmt(angle)}) scale(${PS}) translate(-128 -128)"><path d="${plane}" fill="#fff"/></g>` +
  `</svg>`;
writeFileSync(outPath, svg);
// Optional second file: the same dot matrix alone, in the brand teal at low opacity, as a texture for light sections.
if (dotsOutPath) {
  writeFileSync(dotsOutPath, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><path d="${d}" fill="none" stroke="#156970" stroke-opacity=".16" stroke-width="4.4" stroke-linecap="round"/></svg>`);
}
// Pin positions in percent of the drawn box (WX x H): the --x / --y values of the airport tags in index.html.
console.log(JSON.stringify({ dots: n, bytes: svg.length, pins: Object.fromEntries(Object.entries(P).map(([k, [x, y]]) => [k, [fmt(x / WX * 100), fmt(y / H * 100)]])) }));
