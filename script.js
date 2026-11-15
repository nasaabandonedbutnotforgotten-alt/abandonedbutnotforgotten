/* =====================================================
   СОНЯЧНА СИСТЕМА — реалістична анімація на <canvas>
   Сонце в центрі, планети рухаються по орбітах,
   кожна планета освітлена з боку Сонця.
   ===================================================== */

/* ---------- 1. НАЛАШТУВАННЯ ПЛАНЕТ ----------
   r     — розмір (частка від ширини)
   orbit — номер орбіти
   speed — швидкість руху
   link  — сторінка, що відкривається при натисканні   */
const PLANETS = [
  { name: "Mercury", r: 0.009, orbit: 1, speed: 4.1, tex: "mercury" },
  { name: "Venus",   r: 0.014, orbit: 2, speed: 1.6, tex: "venus" },
  { name: "Earth",   r: 0.015, orbit: 3, speed: 1.0, tex: "earth", moon: true },
  { name: "Mars",    r: 0.011, orbit: 4, speed: 0.53, tex: "mars", link: "mars.html" },
  { name: "Jupiter", r: 0.036, orbit: 5, speed: 0.30, tex: "jupiter" },
  { name: "Saturn",  r: 0.030, orbit: 6, speed: 0.22, tex: "saturn", ring: true },
  { name: "Uranus",  r: 0.021, orbit: 7, speed: 0.15, tex: "uranus" },
  { name: "Neptune", r: 0.020, orbit: 8, speed: 0.12, tex: "neptune" }
];
const MOON = { name: "Moon", r: 0.0055, tex: "moon", link: "moon.html", angle: 0 };

const SUN_R   = 0.062;   // розмір Сонця
const TILT    = 0.30;    // нахил (менше = більш «збоку»)
const SPEED   = 0.0025;  // загальна швидкість анімації
const SIZE    = 1.45;    // збільшення всіх планет

/* Розмір орбіти номер n (частка від ширини) */
const orbitRx = n => 0.115 + (n - 1) * 0.051;

/* ---------- 2. ШУМ (для текстур планет) ---------- */
function hash(x, y, z) {
  let h = x * 374761393 + y * 668265263 + z * 2147483647;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) & 0xffff) / 0xffff;
}
function noise3(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const s = t => t * t * (3 - 2 * t);
  const u = s(xf), v = s(yf), w = s(zf);
  const L = (a, b, t) => a + (b - a) * t;
  const c = (dx, dy, dz) => hash(xi + dx, yi + dy, zi + dz);
  return L(
    L(L(c(0,0,0), c(1,0,0), u), L(c(0,1,0), c(1,1,0), u), v),
    L(L(c(0,0,1), c(1,0,1), u), L(c(0,1,1), c(1,1,1), u), v), w);
}
function fbm(x, y, z, oct = 5) {
  let a = 0.5, f = 1, s = 0;
  for (let i = 0; i < oct; i++) { s += a * noise3(x * f, y * f, z * f); f *= 2; a *= 0.5; }
  return s;
}
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

/* ---------- 3. ТЕКСТУРИ (розгортка 256×128) ---------- */
const TW = 256, TH = 128;
function makeTexture(type) {
  const data = new Uint8ClampedArray(TW * TH * 3);
  for (let y = 0; y < TH; y++) {
    const lat = (y / TH - 0.5) * Math.PI;          // -90..90°
    for (let x = 0; x < TW; x++) {
      const lon = (x / TW) * Math.PI * 2;
      // точка на кулі — текстура без «шва»
      const px = Math.cos(lat) * Math.cos(lon), py = Math.sin(lat), pz = Math.cos(lat) * Math.sin(lon);
      const n = (k, o) => fbm(px * k + 10, py * k + 10, pz * k + 10, o);
      const band = y / TH;
      let c;
      switch (type) {
        case "mercury": case "moon": {
          const v = n(4, 5);
          const crater = Math.pow(n(9, 3), 3) * 1.4;
          const g = type === "moon" ? 150 : 135;
          c = [g, g - 4, g - 10].map(t => t * (0.55 + v * 0.7) - crater * 70);
          if (type === "moon" && n(1.6, 3) > 0.56) c = c.map(t => t * 0.72); // «моря»
          break;
        }
        case "venus": {
          const v = n(2, 4) + Math.sin(band * 18 + n(3, 3) * 6) * 0.08;
          c = mix([200, 160, 95], [245, 220, 170], clamp(v));
          break;
        }
        case "earth": {
          const land = n(2.2, 6);
          const ice = Math.abs(lat) > 1.2 + n(5, 2) * 0.2;
          if (ice) c = [240, 245, 250];
          else if (land > 0.52) c = mix([60, 120, 50], [170, 140, 90], clamp((land - 0.52) * 6));
          else c = mix([10, 40, 120], [30, 90, 170], clamp(land * 1.6));
          const cloud = clamp((n(5, 5) - 0.5) * 3);
          c = mix(c, [255, 255, 255], cloud * 0.8);
          break;
        }
        case "mars": {
          const v = n(3, 6);
          c = mix([120, 50, 25], [215, 110, 60], clamp(v * 1.3 - 0.1));
          if (n(1.5, 4) < 0.42) c = c.map(t => t * 0.7);          // темні області
          if (Math.abs(lat) > 1.3) c = [235, 225, 220];            // полярні шапки
          break;
        }
        case "jupiter": {
          const t = band * 14 + n(3, 5) * 2.2;
          const stripe = (Math.sin(t) + 1) / 2;
          c = mix([180, 130, 90], [240, 225, 200], stripe);
          // Велика червона пляма
          const dx = (x / TW - 0.3) * 4, dy = (band - 0.64) * 9;
          if (dx * dx + dy * dy < 1) c = mix(c, [190, 85, 55], 1 - (dx * dx + dy * dy));
          break;
        }
        case "saturn": {
          const t = band * 16 + n(2, 4) * 1.2;
          c = mix([200, 165, 110], [245, 225, 175], (Math.sin(t) + 1) / 2);
          break;
        }
        case "uranus": {
          c = mix([150, 210, 225], [190, 235, 240], n(2, 3) * 0.6 + band * 0.2);
          break;
        }
        case "neptune": {
          const t = band * 10 + n(3, 4) * 2;
          c = mix([35, 70, 170], [80, 130, 220], (Math.sin(t) + 1) / 2 * 0.6 + n(4, 3) * 0.4);
          break;
        }
        case "sun": {
          const v = n(6, 5);
          c = mix([230, 80, 0], [255, 210, 80], clamp(v * 1.4 - 0.2));
          break;
        }
      }
      const i = (y * TW + x) * 3;
      data[i] = c[0]; data[i + 1] = c[1]; data[i + 2] = c[2];
    }
  }
  return data;
}

/* ---------- 4. МАЛЮВАННЯ КУЛІ З ТЕКСТУРОЮ І СВІТЛОМ ---------- */
function renderSphere(tex, radius, rot, light, emissive) {
  const size = Math.max(2, Math.ceil(radius * 2));
  const off = document.createElement("canvas");
  off.width = off.height = size;
  const octx = off.getContext("2d");
  const img = octx.createImageData(size, size);
  const R = size / 2;
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const nx = (px + 0.5 - R) / R, ny = (py + 0.5 - R) / R;
      const d2 = nx * nx + ny * ny;
      if (d2 > 1) continue;
      const nz = Math.sqrt(1 - d2);
      const lat = Math.asin(ny);
      let lon = Math.atan2(nx, nz) + rot;
      lon = ((lon / (Math.PI * 2)) % 1 + 1) % 1;
      const tw = tex.w, th = tex.h;
      const tx = Math.floor(lon * tw) % tw;
      const ty = Math.min(th - 1, Math.floor((lat / Math.PI + 0.5) * th));
      const ti = (ty * tw + tx) * 3;
      let shade;
      if (emissive) shade = 0.75 + 0.35 * nz;                     // Сонце світить саме
      else shade = 0.12 + 1.0 * clamp(nx * light[0] + ny * light[1] + nz * light[2]);
      const i = (py * size + px) * 4;
      img.data[i]     = tex.d[ti] * shade;
      img.data[i + 1] = tex.d[ti + 1] * shade;
      img.data[i + 2] = tex.d[ti + 2] * shade;
      img.data[i + 3] = d2 > 0.96 ? (1 - d2) / 0.04 * 255 : 255;  // м'який край
    }
  }
  octx.putImageData(img, 0, 0);
  return off;
}

/* ---------- 5. ПІДГОТОВКА ---------- */
const box = document.getElementById("solar");
const canvas = document.createElement("canvas");
box.appendChild(canvas);
const ctx = canvas.getContext("2d");
const tooltip = document.getElementById("tooltip");

const TEX = {};
["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "moon", "sun"]
  .forEach(t => TEX[t] = { d: makeTexture(t), w: TW, h: TH });

// Справжні карти планет (planet-textures.js) замінюють намальовані, щойно завантажаться
if (typeof PLANET_TEX !== "undefined") {
  Object.entries(PLANET_TEX).forEach(([key, src]) => {
    const im = new Image();
    im.onload = () => {
      const c = document.createElement("canvas");
      c.width = im.naturalWidth; c.height = im.naturalHeight;
      const g = c.getContext("2d"); g.drawImage(im, 0, 0);
      try {
        const rgba = g.getImageData(0, 0, c.width, c.height).data;
        const d = new Uint8ClampedArray(c.width * c.height * 3);
        for (let i = 0, j = 0; i < rgba.length; i += 4, j += 3) { d[j] = rgba[i]; d[j + 1] = rgba[i + 1]; d[j + 2] = rgba[i + 2]; }
        TEX[key] = { d, w: c.width, h: c.height };
        if (key === "sun") frame.sun = null;
      } catch (e) { /* лишаємо намальовану */ }
    };
    im.src = src;
  });
}

PLANETS.forEach(p => { p.angle = Math.random() * Math.PI * 2; p.rot = Math.random() * 6; });

let W = 0, H = 0, DPR = 1;
function resize() {
  DPR = Math.min(devicePixelRatio || 1, 2);
  W = box.clientWidth; H = box.clientHeight;
  canvas.width = W * DPR; canvas.height = H * DPR;
  canvas.style.width = W + "px"; canvas.style.height = H + "px";
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
addEventListener("resize", resize);
resize();

/* ---------- 6. МИШКА: підказка і клік ---------- */
let mouse = null, hovered = null, drawn = [];
canvas.addEventListener("mousemove", e => {
  const b = canvas.getBoundingClientRect();
  mouse = { x: e.clientX - b.left, y: e.clientY - b.top, cx: e.clientX, cy: e.clientY };
});
canvas.addEventListener("mouseleave", () => { mouse = null; });
canvas.addEventListener("click", () => { if (hovered && hovered.link) location.href = hovered.link; });

/* ---------- 7. МАЛЮВАННЯ ОДНОГО КАДРУ ---------- */
function drawOrbit(rx, ry, cx, cy, half) {
  ctx.beginPath();
  // half = "back" (верхня половина, за Сонцем) або "front"
  if (half === "back") ctx.ellipse(cx, cy, rx, ry, 0, Math.PI, Math.PI * 2);
  else ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI);
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 1.6;
  ctx.stroke();
}

function drawRing(x, y, r, part) {
  const tilt = -0.28;
  const bands = [[1.35, "rgba(205,180,140,.55)"], [1.55, "rgba(230,210,170,.85)"],
                 [1.8, "rgba(200,170,120,.7)"], [2.05, "rgba(180,155,115,.45)"], [2.2, "rgba(160,140,110,.3)"]];
  ctx.save();
  ctx.translate(x, y); ctx.rotate(tilt);
  bands.forEach(([k, col]) => {
    ctx.beginPath();
    if (part === "back") ctx.ellipse(0, 0, r * k, r * k * 0.28, 0, Math.PI, Math.PI * 2);
    else ctx.ellipse(0, 0, r * k, r * k * 0.28, 0, 0, Math.PI);
    ctx.strokeStyle = col; ctx.lineWidth = r * 0.16; ctx.stroke();
  });
  ctx.restore();
}

let paused = false, sunRot = 0;

/* ---------- 7б. РАКЕТИ: летять із Землі на Місяць і на Марс ---------- */
const flights = [];
let nextFlight = performance.now() + 1500, nextTarget = "Moon", flightLast = 0;
function drawFlights(objs) {
  const now = performance.now();
  const dt = Math.min(0.05, (now - (flightLast || now)) / 1000); flightLast = now;
  const find = name => objs.find(o => o.p.name === name);
  const earth = find("Earth");
  if (!earth) return;
  if (!paused && now > nextFlight) {
    flights.push({ to: nextTarget, t: 0, dur: nextTarget === "Moon" ? 3.2 : 7.5, trail: [], bend: Math.random() < 0.5 ? 1 : -1 });
    nextTarget = nextTarget === "Moon" ? "Mars" : "Moon";
    nextFlight = now + 4500 + Math.random() * 3500;
  }
  for (let i = flights.length - 1; i >= 0; i--) {
    const f = flights[i], target = find(f.to);
    if (!target) { flights.splice(i, 1); continue; }
    if (!paused) f.t += dt / f.dur;
    if (f.t >= 1.15) { flights.splice(i, 1); continue; }
    // плавний розгін і гальмування, шлях — дуга
    const e = Math.min(1, f.t), s = e * e * (3 - 2 * e);
    const ax = earth.x, ay = earth.y, bx = target.x, by = target.y;
    const mx = (ax + bx) / 2, my = (ay + by) / 2, dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
    const k = (f.to === "Moon" ? 0.9 : 0.3) * f.bend;          // до Місяця близько — дуга вища, щоб політ було видно
    const qx = mx - dy / len * len * k, qy = my + dx / len * len * k;
    const u = 1 - s;
    const x = u * u * ax + 2 * u * s * qx + s * s * bx, y = u * u * ay + 2 * u * s * qy + s * s * by;
    // напрямок руху
    const tx = 2 * u * (qx - ax) + 2 * s * (bx - qx), ty = 2 * u * (qy - ay) + 2 * s * (by - qy);
    // слід із диму
    if (f.t < 1) f.trail.push({ x, y, a: 1 });
    f.trail.forEach(p => p.a -= dt * 0.9);
    while (f.trail.length && f.trail[0].a <= 0) f.trail.shift();
    for (let j = 1; j < f.trail.length; j++) {
      const p0 = f.trail[j - 1], p1 = f.trail[j];
      ctx.strokeStyle = `rgba(220,215,235,${p1.a * 0.45})`;
      ctx.lineWidth = 1.2 + (1 - p1.a) * 2.5;
      ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
    }
    // сама ракета (зникає, коли долетіла)
    if (f.t < 1) {
      const r = { x, y, ang: Math.atan2(ty, tx), size: Math.max(0.22, W / 4200) };
      ctx.save(); ctx.globalAlpha = Math.min(1, f.t * 8, (1 - f.t) * 12);
      drawRocket(r, now, ctx);
      ctx.restore();
    } else {
      // спалах посадки
      const a = 1 - (f.t - 1) / 0.15;
      ctx.strokeStyle = `rgba(255,231,194,${a})`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(target.x, target.y, target.rad + 4 + (1 - a) * 10, 0, Math.PI * 2); ctx.stroke();
    }
  }
}

function frame() {
  const cx = W / 2, cy = H / 2;
  ctx.clearRect(0, 0, W, H);

  // Позиції планет
  const objs = [];
  PLANETS.forEach(p => {
    if (!paused) { p.angle += p.speed * SPEED; p.rot += 0.01; }
    const rx = orbitRx(p.orbit) * W, ry = rx * TILT;
    const sx = Math.cos(p.angle), sy = Math.sin(p.angle);
    const depth = 1 + 0.12 * sy;                       // ближче — більше
    objs.push({ p, x: cx + rx * sx, y: cy + ry * sy, rad: p.r * W * SIZE * depth, sy });
    if (p.moon) {
      if (!paused) MOON.angle += 0.02;
      const mr = p.r * W * SIZE * 2.4;
      const mx = cx + rx * sx + mr * Math.cos(MOON.angle);
      const my = cy + ry * sy + mr * 0.45 * Math.sin(MOON.angle);
      objs.push({ p: MOON, x: mx, y: my, rad: MOON.r * W * SIZE * depth, sy: sy + 0.01 * Math.sin(MOON.angle) });
    }
  });
  objs.sort((a, b) => a.y - b.y);

  // Що під мишкою
  hovered = null;
  if (mouse) {
    for (let i = objs.length - 1; i >= 0; i--) {
      const o = objs[i], dx = mouse.x - o.x, dy = mouse.y - o.y;
      if (dx * dx + dy * dy < Math.max(o.rad, 8) ** 2) { hovered = o.p; break; }
    }
  }
  paused = !!hovered;
  canvas.style.cursor = hovered && hovered.link ? "pointer" : "default";
  if (hovered) {
    tooltip.textContent = hovered.link ? hovered.name + " →" : hovered.name;
    tooltip.style.left = mouse.cx + "px"; tooltip.style.top = mouse.cy + "px";
    tooltip.style.display = "block";
  } else tooltip.style.display = "none";

  // Задні половини орбіт
  for (let n = 1; n <= 8; n++) drawOrbit(orbitRx(n) * W, orbitRx(n) * W * TILT, cx, cy, "back");

  const drawPlanet = o => {
    const dx = cx - o.x, dy = cy - o.y, len = Math.hypot(dx, dy) || 1;
    // напрямок на Сонце: у задній половині Сонце «перед» планетою, у передній — «за» нею
    const light = [dx / len * 0.75, dy / len * 0.75, 0.55];
    const ll = Math.hypot(...light); light.forEach((v, i) => light[i] = v / ll);
    if (o.p.ring) drawRing(o.x, o.y, o.rad, "back");
    const img = renderSphere(TEX[o.p.tex], o.rad * DPR, o.p.rot || 0, light, false);
    ctx.drawImage(img, o.x - o.rad, o.y - o.rad, o.rad * 2, o.rad * 2);
    if (o.p.ring) drawRing(o.x, o.y, o.rad, "front");
    if (o.p.link) {                                   // підсвітка Марса й Місяця
      const pulse = 0.35 + 0.35 * Math.sin(performance.now() / 400);
      ctx.beginPath(); ctx.arc(o.x, o.y, o.rad + 4, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,231,194,${pulse})`; ctx.lineWidth = 2; ctx.stroke();
    }
    if (o.p === hovered) {
      ctx.beginPath(); ctx.arc(o.x, o.y, o.rad + 7, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 2; ctx.stroke();
    }
  };

  // Планети позаду Сонця
  objs.filter(o => o.y < cy).forEach(drawPlanet);

  // Сонце: сяйво + куля
  const sr = SUN_R * W;
  const glow = ctx.createRadialGradient(cx, cy, sr * 0.6, cx, cy, sr * 3);
  glow.addColorStop(0, "rgba(255,170,40,0.75)");
  glow.addColorStop(0.35, "rgba(255,110,20,0.25)");
  glow.addColorStop(1, "rgba(255,80,0,0)");
  ctx.fillStyle = glow;
  ctx.beginPath(); ctx.arc(cx, cy, sr * 3, 0, Math.PI * 2); ctx.fill();
  sunRot += 0.002;
  if (!frame.sun || frame.sunR !== sr || frame.count++ % 4 === 0) {   // Сонце перемальовуємо рідше
    frame.sun = renderSphere(TEX.sun, sr * DPR, sunRot, null, true);
    frame.sunR = sr; frame.count = frame.count || 1;
  }
  ctx.drawImage(frame.sun, cx - sr, cy - sr, sr * 2, sr * 2);

  // Передні половини орбіт і планети попереду Сонця
  for (let n = 1; n <= 8; n++) drawOrbit(orbitRx(n) * W, orbitRx(n) * W * TILT, cx, cy, "front");
  objs.filter(o => o.y >= cy).forEach(drawPlanet);

  drawFlights(objs);

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* =====================================================
   ЗІРКИ НА ФОНІ, ЩО МЕРЕХТЯТЬ
   ===================================================== */
const starCanvas = document.getElementById("stars");
const sctx = starCanvas.getContext("2d");
let stars = [];
function resizeStars() {
  starCanvas.width = innerWidth * devicePixelRatio;
  starCanvas.height = innerHeight * devicePixelRatio;
  const count = Math.round(innerWidth * innerHeight / 3500);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    r: (Math.random() < 0.05 ? 5 + Math.random() * 6 : 0.6 + Math.random() * 1.6) * devicePixelRatio,
    phase: Math.random() * 6.28,
    speed: 0.5 + Math.random() * 1.5
  }));
}
function sparkle(x, y, r) {
  sctx.beginPath();
  sctx.moveTo(x, y - r);
  sctx.quadraticCurveTo(x, y, x + r, y);
  sctx.quadraticCurveTo(x, y, x, y + r);
  sctx.quadraticCurveTo(x, y, x - r, y);
  sctx.quadraticCurveTo(x, y, x, y - r);
  sctx.fill();
}
function drawStars(t) {
  sctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  sctx.fillStyle = "#fff4e0";
  stars.forEach(s => {
    sctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(s.phase + t / 1000 * s.speed));
    sparkle(s.x, s.y, s.r);
  });
  sctx.globalAlpha = 1;
  drawSkyEvents(t);
  requestAnimationFrame(drawStars);
}

/* =====================================================
   ПАДАЮЧІ ЗІРКИ, КОМЕТИ І РАКЕТИ НА ФОНІ
   ===================================================== */
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const sky = [], smoke = [];
let skyLast = 0;
const nextAt = { shoot: 600 };
const rnd = (a, b) => a + Math.random() * (b - a);

function spawnShoot() {                       // падаюча зірка: швидкий короткий слід
  const W = starCanvas.width, H = starCanvas.height, D = devicePixelRatio;
  const ang = Math.PI * rnd(0.68, 0.82);
  const v = rnd(900, 1400) * D;
  sky.push({ type: "shoot", x: rnd(0.25, 1.05) * W, y: rnd(-0.05, 0.45) * H, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v,
             age: 0, life: rnd(0.6, 1.1), len: rnd(110, 220) * D, w: rnd(1.2, 2.2) * D });
}
function spawnComet() {                       // комета: повільна, з довгим сяючим хвостом
  const W = starCanvas.width, H = starCanvas.height, D = devicePixelRatio;
  const fromLeft = Math.random() < 0.5;
  const ang = (fromLeft ? 0 : Math.PI) + rnd(-0.25, 0.25) + (fromLeft ? 0.15 : -0.15);
  const v = rnd(60, 95) * D;
  sky.push({ type: "comet", x: fromLeft ? -0.05 * W : 1.05 * W, y: rnd(0.08, 0.6) * H,
             vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, age: 0, life: 40,
             len: rnd(220, 340) * D, size: rnd(3, 5) * D, hue: Math.random() < 0.5 ? "170,220,255" : "200,255,230" });
}
function spawnRocket() {                      // ракета: летить знизу вгору з вогнем і димом
  const W = starCanvas.width, H = starCanvas.height, D = devicePixelRatio;
  const fromLeft = Math.random() < 0.5;
  const ang = -Math.PI / 2 + (fromLeft ? 1 : -1) * rnd(0.35, 0.75);
  const v = rnd(110, 170) * D;
  sky.push({ type: "rocket", x: (fromLeft ? rnd(-0.02, 0.3) : rnd(0.7, 1.02)) * W, y: 1.05 * H,
             vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, ang, age: 0, life: 30, size: rnd(1.3, 1.8) * D, puff: 0 });
}

// М'які «плямки» світла і диму (малюються один раз, потім лише копіюються — швидко)
function makeSprite(size, stops) {
  const c = document.createElement("canvas"); c.width = c.height = size;
  const g = c.getContext("2d"), gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([o, col]) => gr.addColorStop(o, col));
  g.fillStyle = gr; g.fillRect(0, 0, size, size);
  return c;
}
const SPR = {
  ion:   makeSprite(64, [[0, "rgba(150,200,255,0.9)"], [0.4, "rgba(110,170,255,0.35)"], [1, "rgba(90,150,255,0)"]]),
  dust:  makeSprite(64, [[0, "rgba(255,245,220,0.8)"], [0.45, "rgba(255,230,190,0.28)"], [1, "rgba(255,220,170,0)"]]),
  coma:  makeSprite(128, [[0, "rgba(255,255,255,1)"], [0.08, "rgba(230,255,245,0.9)"], [0.3, "rgba(140,230,200,0.35)"], [1, "rgba(120,220,190,0)"]]),
  smoke: makeSprite(64, [[0, "rgba(225,220,235,0.55)"], [0.5, "rgba(200,195,215,0.22)"], [1, "rgba(180,175,200,0)"]]),
  fire:  makeSprite(64, [[0, "rgba(255,255,240,1)"], [0.25, "rgba(255,220,140,0.9)"], [0.6, "rgba(255,130,40,0.35)"], [1, "rgba(255,90,0,0)"]])
};
const parts = [];                                // частинки хвостів комет і диму ракет
function puff(type, x, y, vx, vy, size, life, grow) { parts.push({ type, x, y, vx, vy, size, life, grow, age: 0 }); }

// Ракета схожа на справжню (на кшталт Saturn V / SLS): тонкий білий корпус, вогняний струмінь
function drawRocket(r, t, g = sctx) {
  const k = r.size, L = 44 * k, Wd = 5.2 * k;
  g.save();
  g.translate(r.x, r.y);
  g.rotate(r.ang + Math.PI / 2);              // носом уперед
  // струмінь вогню (світиться — додаємо світло)
  g.globalCompositeOperation = "lighter";
  const fl = 1 + 0.08 * Math.sin(t / 23) + 0.06 * Math.random();
  const glow = g.createRadialGradient(0, L * 0.5, 0, 0, L * 0.5, 34 * k);
  glow.addColorStop(0, "rgba(255,200,120,0.55)"); glow.addColorStop(1, "rgba(255,120,30,0)");
  g.fillStyle = glow; g.beginPath(); g.arc(0, L * 0.5, 34 * k, 0, Math.PI * 2); g.fill();
  const plume = g.createLinearGradient(0, L * 0.5, 0, L * 0.5 + 38 * k * fl);
  plume.addColorStop(0, "rgba(255,255,245,1)"); plume.addColorStop(0.25, "rgba(255,225,150,0.95)");
  plume.addColorStop(0.6, "rgba(255,140,50,0.5)"); plume.addColorStop(1, "rgba(255,90,20,0)");
  g.fillStyle = plume;
  g.beginPath();
  g.moveTo(-Wd * 0.45, L * 0.5);
  g.bezierCurveTo(-Wd * 0.9, L * 0.5 + 14 * k, -Wd * 0.4, L * 0.5 + 30 * k * fl, 0, L * 0.5 + 40 * k * fl);
  g.bezierCurveTo(Wd * 0.4, L * 0.5 + 30 * k * fl, Wd * 0.9, L * 0.5 + 14 * k, Wd * 0.45, L * 0.5);
  g.fill();
  g.globalCompositeOperation = "source-over";
  // корпус з об'ємною тінню
  const body = g.createLinearGradient(-Wd / 2, 0, Wd / 2, 0);
  body.addColorStop(0, "#6f7380"); body.addColorStop(0.35, "#f4f5f7"); body.addColorStop(0.6, "#e2e4ea"); body.addColorStop(1, "#7c808d");
  g.fillStyle = body;
  g.fillRect(-Wd / 2, -L * 0.32, Wd, L * 0.82);
  // перехідник і менший верхній ступінь
  g.beginPath();
  g.moveTo(-Wd / 2, -L * 0.32); g.lineTo(-Wd * 0.36, -L * 0.4); g.lineTo(Wd * 0.36, -L * 0.4); g.lineTo(Wd / 2, -L * 0.32); g.fill();
  g.fillRect(-Wd * 0.36, -L * 0.48, Wd * 0.72, L * 0.08);
  // чорні смуги, як на справжніх ракетах
  g.fillStyle = "rgba(25,25,30,0.85)";
  g.fillRect(-Wd / 2, L * 0.12, Wd, 1.6 * k);
  g.fillRect(-Wd / 2, -L * 0.1, Wd, 1.2 * k);
  g.fillRect(-Wd * 0.5, L * 0.3, Wd * 0.25, L * 0.16);
  // капсула і рятувальна башта
  g.fillStyle = body;
  g.beginPath(); g.moveTo(-Wd * 0.36, -L * 0.48); g.lineTo(0, -L * 0.58); g.lineTo(Wd * 0.36, -L * 0.48); g.fill();
  g.strokeStyle = "rgba(200,200,210,0.9)"; g.lineWidth = 0.8 * k;
  g.beginPath(); g.moveTo(0, -L * 0.58); g.lineTo(0, -L * 0.66); g.stroke();
  // сопла
  g.fillStyle = "#3a3c44";
  g.fillRect(-Wd * 0.42, L * 0.5 - 1.5 * k, Wd * 0.84, 2 * k);
  g.restore();
}

function drawSkyEvents(t) {
  if (reduceMotion) return;
  const dt = Math.min(0.05, (t - (skyLast || t)) / 1000); skyLast = t;
  const W = starCanvas.width, H = starCanvas.height, D = devicePixelRatio;
  // нові події час від часу
  if (t > nextAt.shoot) { spawnShoot(); nextAt.shoot = t + rnd(800, 2200); }   // падаючі зірки — частіше

  // частинки: хвости комет і дим ракет
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i]; p.age += dt;
    if (p.age >= p.life) { parts.splice(i, 1); continue; }
    p.x += p.vx * dt; p.y += p.vy * dt; p.size += p.grow * dt;
    const f = 1 - p.age / p.life;
    sctx.globalCompositeOperation = p.type === "smoke" ? "source-over" : "lighter";
    sctx.globalAlpha = p.type === "smoke" ? f * 0.9 : f * f;
    sctx.drawImage(SPR[p.type], p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
  }
  sctx.globalAlpha = 1; sctx.globalCompositeOperation = "source-over";

  for (let i = sky.length - 1; i >= 0; i--) {
    const o = sky[i];
    o.age += dt; o.x += o.vx * dt; o.y += o.vy * dt;
    const off = o.x < -0.2 * W || o.x > 1.2 * W || o.y < -0.2 * H || o.y > 1.25 * H;
    if (o.age > o.life || (off && o.age > 1)) { sky.splice(i, 1); continue; }
    const sp = Math.hypot(o.vx, o.vy), ux = o.vx / sp, uy = o.vy / sp;

    if (o.type === "shoot") {
      const fade = Math.sin(Math.PI * Math.min(1, o.age / o.life));
      const tx = o.x - ux * o.len, ty = o.y - uy * o.len;
      const g = sctx.createLinearGradient(o.x, o.y, tx, ty);
      g.addColorStop(0, `rgba(255,255,255,${fade})`); g.addColorStop(1, "rgba(255,240,220,0)");
      sctx.strokeStyle = g; sctx.lineWidth = o.w; sctx.lineCap = "round";
      sctx.beginPath(); sctx.moveTo(o.x, o.y); sctx.lineTo(tx, ty); sctx.stroke();
      sctx.fillStyle = `rgba(255,255,255,${fade})`;
      sctx.beginPath(); sctx.arc(o.x, o.y, o.w * 1.2, 0, Math.PI * 2); sctx.fill();
    }

    if (o.type === "comet") {
      // справжня комета: крихітне ядро, зеленкувата кома, прямий блакитний іонний хвіст і широкий вигнутий пиловий
      const nx = -uy, ny = ux;
      for (let j = 0; j < 3; j++) {               // іонний хвіст — швидкий і прямий
        const sp2 = rnd(28, 48) * D;
        puff("ion", o.x, o.y, -ux * sp2 + rnd(-2, 2) * D, -uy * sp2 + rnd(-2, 2) * D, rnd(5, 9) * D, rnd(4.5, 6.5), 2 * D);
      }
      for (let j = 0; j < 4; j++) {               // пиловий хвіст — повільніший, розходиться і вигинається вбік
        const sp2 = rnd(8, 22) * D, side = rnd(2, 12) * D;
        puff("dust", o.x, o.y, -ux * sp2 + nx * side, -uy * sp2 + ny * side, rnd(8, 14) * D, rnd(4, 6), 7 * D);
      }
      sctx.globalCompositeOperation = "lighter";
      const cs = o.size * 9;
      sctx.drawImage(SPR.coma, o.x - cs / 2, o.y - cs / 2, cs, cs);
      sctx.fillStyle = "rgba(255,255,255,0.95)";
      sctx.beginPath(); sctx.arc(o.x, o.y, o.size * 0.35, 0, Math.PI * 2); sctx.fill();
      sctx.globalCompositeOperation = "source-over";
    }

    if (o.type === "rocket") {
      o.puff += dt;
      if (o.puff > 0.03) {                      // клуби диму позаду струменя, що розширюються
        o.puff = 0;
        const bx = o.x - ux * 48 * o.size, by = o.y - uy * 48 * o.size;
        puff("smoke", bx, by, -ux * rnd(4, 12) * D + rnd(-5, 5) * D, -uy * rnd(4, 12) * D + rnd(-5, 5) * D,
             rnd(10, 16) * D, rnd(3.5, 5.5), rnd(14, 24) * D);
        puff("fire", o.x - ux * 30 * o.size, o.y - uy * 30 * o.size, -ux * 30 * D, -uy * 30 * D, rnd(10, 16) * D, 0.35, 10 * D);
      }
      drawRocket(o, t);
    }
  }
}
addEventListener("resize", resizeStars);
resizeStars();
requestAnimationFrame(drawStars);

/* =====================================================
   ПОЯВА ТЕКСТОВИХ БЛОКІВ ПРИ ПРОКРУТЦІ
   ===================================================== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
