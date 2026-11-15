/* =====================================================
   3D-ПЛАНЕТА З ТОЧКАМИ (працює для Марса і Місяця)
   Без сторонніх бібліотек: планету малюємо самі,
   піксель за пікселем, з текстури-розгортки.
   ===================================================== */

function initPlanet(cfg) {
  const sites = cfg.sites;
  const orbiters = cfg.orbiters || [];               // апарати на орбіті
  const flybys = cfg.flybys || [];                   // пролітні апарати (тепер на орбіті Сонця)
  const all = sites.concat(orbiters, flybys);
  const away = s => s.orbit || s.flyby;              // апарат не на поверхні
  // Полотно більше за рамку планети (EXP разів) — тому при наближенні планета «розїжджається» без меж
  const EXP = 1.7;
  const VIS = orbiters.length ? 0.8 : 0.88;           // видимий розмір планети відносно рамки
  const BASE = VIS / EXP;                             // розмір планети відносно всього полотна
  const T = window.t || (x => x);                    // переклад (i18n.js)

  // Пошта для «Suggest a correction» — впишіть сюди пошту команди
  const CORRECTIONS_EMAIL = cfg.correctionsEmail || "nasaabandonedbutnotforgotten@gmail.com";

  /* ---------- 0. Фільтри, пошук, шкала часу ---------- */
  const yr = d => { const x = new Date(d + "T00:00:00Z"); const y = x.getUTCFullYear(); return y + (x - Date.UTC(y, 0, 1)) / 31557600000; };
  const nowY = (() => { const x = new Date(); const y = x.getUTCFullYear(); return y + (x - Date.UTC(y, 0, 1)) / 31557600000; })();
  let filter = "all", query = "", tlYear = null;     // tlYear = null → «сьогодні»
  function statusAt(s) {                             // статус апарата в обраний рік
    if (tlYear === null || !s.arrived) return s.status;
    if (!s.lastContact) return "active";
    return yr(s.lastContact) > tlYear ? "active" : "silent";
  }
  function inTime(s) { return tlYear === null || !s.arrived || yr(s.arrived) <= tlYear; }
  function shown(s) {
    if (!inTime(s)) return false;
    if (query && !(s.name + " " + s.type + " " + s.id + " " + (s.aka || "")).toLowerCase().includes(query)) return false;
    const st = statusAt(s);
    if (filter === "active") return st === "active";
    if (filter === "silent") return st === "silent";
    if (filter === "orbit") return !!s.orbit;
    if (filter === "flyby") return !!s.flyby;
    if (filter === "surface") return !away(s) && s.kind !== "impact";
    if (filter === "impact") return s.kind === "impact";
    return true;
  }
  const colOf = s => statusAt(s) === "active" ? "110,231,160" : "255,231,194";
  let flash = null;                                   // {s, t0, col} — підсвітка події на шкалі часу

  // Прокрутити сторінку так, щоб планету було видно
  function ensureGlobeVisible() {
    const b = document.getElementById("globeBox").getBoundingClientRect();
    const top = (document.querySelector(".topbar")?.offsetHeight || 70) + 10;
    if (b.top < top - 5 || b.bottom > innerHeight + 5) window.scrollBy({ top: b.top - top, behavior: "smooth" });
  }
  // Повернути планету до апарата (без сильного наближення)
  function faceTo(lat, lon, z) {
    qTarget = qMul(qAxis(1, 0, 0, rad(lat)), qAxis(0, 1, 0, -rad(lon)));
    targetZoom = z; auto = false;
  }
  // Повернути планету до «центру» групи апаратів
  function faceGroup(list) {
    const pts = list.filter(s => !away(s));
    if (!pts.length) { targetZoom = 1; return; }
    let x = 0, y = 0, z = 0;
    pts.forEach(s => { const a = rad(s.lat), o = rad(s.lon); x += Math.cos(a) * Math.sin(o); y += Math.sin(a); z += Math.cos(a) * Math.cos(o); });
    const n = Math.hypot(x, y, z);
    if (n / pts.length < 0.2) { targetZoom = 1; return; }   // розкидані по всій планеті — просто показуємо всю
    faceTo(Math.asin(y / n) * 180 / Math.PI, Math.atan2(x, z) * 180 / Math.PI, 1);
  }

  /* ---------- 1. Canvas і розміри ---------- */
  const box = document.getElementById("globeBox");
  const canvas = document.getElementById("globe");
  const ctx = canvas.getContext("2d");
  const tooltip = document.getElementById("tooltip");

  /* Два буфери: швидкий (під час руху) і чіткий (коли планета зупинилась) */
  function makeBuf(size) {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const g = c.getContext("2d");
    return { size, c, g, img: g.createImageData(size, size), key: "" };
  }
  const lo = makeBuf(640);
  let hi = null;                          // створюється під розмір екрана

  let W = 0, DPR = 1;
  function resize() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = box.clientWidth * EXP;
    canvas.width = canvas.height = W * DPR;
  }
  addEventListener("resize", resize);
  resize();

  /* ---------- 2. Текстура ---------- */
  let tex = null, TW = 0, TH = 0;
  function useImage(im) {
    const c = document.createElement("canvas");
    c.width = im.naturalWidth; c.height = im.naturalHeight;
    const g = c.getContext("2d");
    g.drawImage(im, 0, 0);
    tex = g.getImageData(0, 0, c.width, c.height).data;   // може кинути помилку без Live Server
    TW = c.width; TH = c.height;
  }
  const fallback = new Image();
  fallback.onload = () => { if (!tex) useImage(fallback); };
  fallback.src = cfg.textureData;
  // Справжня карта (mars.jpg), якщо є і сайт відкрито через Live Server
  if (cfg.realTexture) {
    const real = new Image();
    real.onload = () => { try { useImage(real); } catch (e) { /* без Live Server — лишаємо вбудовану */ } };
    real.src = cfg.realTexture;
  }

  /* ---------- 2а. Плитки високої роздільності (вантажаться лише для видимої ділянки) ----------
     cfg.tiles = { dir, cols, rows, size }: карта розрізана на плитки dir/r{row}_c{col}.jpg      */
  const TL = cfg.tiles ? Object.assign({ W: cfg.tiles.cols * cfg.tiles.size, H: cfg.tiles.rows * cfg.tiles.size }, cfg.tiles) : null;
  const tileData = new Map(), tileLoading = new Set(), tileWant = new Set(), tileUsed = new Map();
  const TILE_MAX = 48;                                // скільки плиток тримати в пам'яті
  let tileTick = 0;
  function loadTiles() {
    if (!TL) return;
    for (const id of tileWant) {
      if (tileData.has(id) || tileLoading.has(id) || tileLoading.size >= 6) continue;
      tileLoading.add(id);
      const im = new Image();
      const row = Math.floor(id / TL.cols), col = id % TL.cols;
      im.onload = () => {
        try {
          const c = document.createElement("canvas"); c.width = c.height = TL.size;
          const g = c.getContext("2d"); g.drawImage(im, 0, 0);
          tileData.set(id, g.getImageData(0, 0, TL.size, TL.size).data);
          tileUsed.set(id, ++tileTick);
          if (tileData.size > TILE_MAX) {             // викидаємо найдавніше використану плитку
            let old = null, t = Infinity;
            tileUsed.forEach((v, k) => { if (v < t && k !== id) { t = v; old = k; } });
            tileData.delete(old); tileUsed.delete(old);
          }
          hi.key = "";                                // перемалювати чітко з новою плиткою
        } catch (e) { TL.off = true; }               // без Live Server плитки не працюють
        tileLoading.delete(id); loadTiles();
      };
      im.onerror = () => { tileLoading.delete(id); };
      im.src = `${TL.dir}/r${row}_c${col}.jpg`;
    }
    tileWant.clear();
  }

  /* ---------- 2б. Шар дрібних деталей (видно лише при наближенні) ----------
     Безшовний «шум» 256×256 з дрібними кратерами: він накладається на карту
     і ховає розмитість, коли наближаєш планету.                                */
  const DT = 256, detail = new Float32Array(DT * DT);
  (function makeDetail() {
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const octave = (cells, amp) => {
      const g = []; for (let i = 0; i < cells * cells; i++) g.push(rnd());
      const at = (x, y) => g[((y % cells + cells) % cells) * cells + ((x % cells + cells) % cells)];
      for (let y = 0; y < DT; y++) for (let x = 0; x < DT; x++) {
        const fx = x / DT * cells, fy = y / DT * cells, x0 = Math.floor(fx), y0 = Math.floor(fy);
        let u = fx - x0, v = fy - y0; u = u * u * (3 - 2 * u); v = v * v * (3 - 2 * v);
        const n = at(x0, y0) * (1 - u) * (1 - v) + at(x0 + 1, y0) * u * (1 - v) + at(x0, y0 + 1) * (1 - u) * v + at(x0 + 1, y0 + 1) * u * v;
        detail[y * DT + x] += (n - 0.5) * amp;
      }
    };
    octave(8, 0.5); octave(16, 0.35); octave(32, 0.25); octave(64, 0.18); octave(128, 0.1);
    // дрібні кратери: темна чаша + світлий край
    for (let k = 0; k < 260; k++) {
      const cx = rnd() * DT, cy = rnd() * DT, r = 1.5 + Math.pow(rnd(), 3) * 9;
      for (let y = -r - 2; y <= r + 2; y++) for (let x = -r - 2; x <= r + 2; x++) {
        const d = Math.hypot(x, y) / r; if (d > 1.3) continue;
        const px = ((Math.round(cx + x) % DT) + DT) % DT, py = ((Math.round(cy + y) % DT) + DT) % DT;
        detail[py * DT + px] += d < 1 ? -0.35 * (1 - d) : 0.25 * (1.3 - d) / 0.3 * (y < 0 ? 1 : 0.4);
      }
    }
  })();

  /* ---------- 3. Обертання ---------- */
  /* Поворот планети зберігаємо як кватерніон — тоді її можна крутити
     в будь-який бік, через полюси, без «заїдань» */
  const qMul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
  const qAxis = (x, y, z, ang) => { const h = ang / 2, sn = Math.sin(h); return [Math.cos(h), x * sn, y * sn, z * sn]; };
  const qNorm = q => { const l = Math.hypot(...q); return q.map(v => v / l); };
  function qSlerp(a, b, t) {
    let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    if (d < 0) { b = b.map(v => -v); d = -d; }
    if (d > 0.9995) return qNorm(a.map((v, i) => v + (b[i] - v) * t));
    const th = Math.acos(d), s0 = Math.sin((1 - t) * th) / Math.sin(th), s1 = Math.sin(t * th) / Math.sin(th);
    return a.map((v, i) => v * s0 + b[i] * s1);
  }
  let M = [];                                   // матриця повороту (оновлюється з кватерніона)
  function updM() {
    const [w, x, y, z] = q;
    M = [1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y),
         2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x),
         2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y)];
  }
  let q = qMul(qAxis(1, 0, 0, 0.15), qAxis(0, 1, 0, -0.4));   // стартовий поворот
  let qTarget = null;
  updM();
  let zoom = 1, targetZoom = 1, lastKey = "";          // наближення (1 = вся планета)
  let auto = true, dragging = false, moved = 0, lastX = 0, lastY = 0;

  const rad = d => d * Math.PI / 180;

  // Точка (широта, довгота) → 3D-вектор на кулі, повернутий як зараз
  function project(lat, lon) {
    const la = rad(lat), lo = rad(lon);
    const x = Math.cos(la) * Math.sin(lo), y = Math.sin(la), z = Math.cos(la) * Math.cos(lo);
    return { x: M[0] * x + M[1] * y + M[2] * z, y: M[3] * x + M[4] * y + M[5] * z, z: M[6] * x + M[7] * y + M[8] * z };
  }

  /* ---------- 4. Малювання кулі ---------- */
  const L = (() => { const v = [-0.45, 0.35, 0.82], l = Math.hypot(...v); return v.map(a => a / l); })();

  function renderSphere(rf, buf, clip, rowA, rowB) {  // rf — радіус планети у частках півкадру; clip — видима частина; rowA..rowB — які рядки малювати (для поступового малювання)
    const N = buf.size, d = buf.img.data, R = N / 2, RR = R * rf;
    const cx0 = clip ? Math.max(0, Math.floor(clip[0] * N)) : 0, cy0 = clip ? Math.max(0, Math.floor(clip[1] * N)) : 0;
    const cx1 = clip ? Math.min(N, Math.ceil(clip[2] * N)) : N, cy1 = clip ? Math.min(N, Math.ceil(clip[3] * N)) : N;
    const useT = TL && !TL.off && buf === hi && zoom > 1.8;    // плитки — лише для чіткого кадру при наближенні
    const TS = TL ? TL.size : 0, TWW = TL ? TL.W : 0, THH = TL ? TL.H : 0;
    const [m0, m1, m2, m3, m4, m5, m6, m7, m8] = M;
    const TWO_PI = 2 * Math.PI, edgeW = Math.min(0.015, 6 / RR);   // м'який край ~ кілька пікселів
    // з чіткою картою 8K штучні деталі майже не потрібні
    const dAmp = (cfg.detail ?? 0.35) * (TW >= 8000 ? 0.25 : 1) * Math.max(0, Math.min(1, (zoom - 1.2) / 2.5));   // деталі з'являються при наближенні
    const DK = 40;                                   // скільки разів шар деталей повторюється навколо планети
    const pyA = rowA ?? 0, pyB = rowB ?? N;
    for (let py = pyA; py < pyB; py++) {
      const vy = -(py + 0.5 - R) / RR;
      const rowOut = py < cy0 || py >= cy1;
      const dyc = (py + 0.5 - R) / R;
      for (let px = 0; px < N; px++) {
        const i = (py * N + px) * 4;
        // не малюємо те, чого не видно: за краєм екрана або в прозорому краї полотна
        if (rowOut || px < cx0 || px >= cx1) { d[i + 3] = 0; continue; }
        const dxc = (px + 0.5 - R) / R;
        if (dxc * dxc + dyc * dyc > 1) { d[i + 3] = 0; continue; }
        const vx = (px + 0.5 - R) / RR;
        const r2 = vx * vx + vy * vy;
        if (r2 > 1) { d[i + 3] = 0; continue; }
        const vz = Math.sqrt(1 - r2);
        // зворотний поворот: з екрана → у координати планети
        const x = m0 * vx + m3 * vy + m6 * vz, y1 = m1 * vx + m4 * vy + m7 * vz, z = m2 * vx + m5 * vy + m8 * vz;
        const lat = Math.asin(y1 > 1 ? 1 : y1 < -1 ? -1 : y1);
        const lon = Math.atan2(x, z);
        // білінійна інтерполяція — без «квадратиків» при наближенні
        const fx = (lon / TWO_PI + 0.5) * TW - 0.5, fy = (0.5 - lat / Math.PI) * TH - 0.5;
        let x0 = Math.floor(fx), y0 = Math.floor(fy);
        const ax = fx - x0, ay = fy - y0;
        x0 = (x0 + TW) % TW; const x1 = (x0 + 1) % TW;
        const y0c = y0 < 0 ? 0 : y0 >= TH ? TH - 1 : y0, y1c = y0 + 1 >= TH ? TH - 1 : y0 + 1 < 0 ? 0 : y0 + 1;
        const a = (y0c * TW + x0) * 4, b = (y0c * TW + x1) * 4, c = (y1c * TW + x0) * 4, e = (y1c * TW + x1) * 4;
        const w00 = (1 - ax) * (1 - ay), w10 = ax * (1 - ay), w01 = (1 - ax) * ay, w11 = ax * ay;
        // освітлення
        let light = vx * L[0] + vy * L[1] + vz * L[2];
        light = 0.28 + 0.9 * (light > 0 ? light : 0);
        if (dAmp > 0) {
          const du = ((fx / TW * DK * DT) | 0) & (DT - 1), dv = ((fy / TH * DK * 0.5 * DT) | 0) & (DT - 1);
          light *= 1 + detail[dv * DT + du] * dAmp;
        }
        const edge = r2 > 1 - edgeW ? (1 - r2) / edgeW : 1;
        if (useT) {                                   // чітка плитка, якщо вона вже завантажена
          const gx = (lon / TWO_PI + 0.5) * TWW - 0.5, gy = (0.5 - lat / Math.PI) * THH - 0.5;
          let gx0 = Math.floor(gx), gy0 = Math.floor(gy);
          const bx = gx - gx0, by = gy - gy0;
          gx0 = (gx0 + TWW) % TWW; gy0 = gy0 < 0 ? 0 : gy0 >= THH ? THH - 1 : gy0;
          const col = (gx0 / TS) | 0, row = (gy0 / TS) | 0, id = row * TL.cols + col;
          const t = tileData.get(id);
          if (t) {
            const lx = gx0 - col * TS, ly = gy0 - row * TS;
            const lx1 = lx + 1 < TS ? lx + 1 : lx, ly1 = ly + 1 < TS ? ly + 1 : ly;
            const A = (ly * TS + lx) * 4, B = (ly * TS + lx1) * 4, C = (ly1 * TS + lx) * 4, E = (ly1 * TS + lx1) * 4;
            const v00 = (1 - bx) * (1 - by), v10 = bx * (1 - by), v01 = (1 - bx) * by, v11 = bx * by;
            d[i]     = (t[A] * v00 + t[B] * v10 + t[C] * v01 + t[E] * v11) * light;
            d[i + 1] = (t[A + 1] * v00 + t[B + 1] * v10 + t[C + 1] * v01 + t[E + 1] * v11) * light;
            d[i + 2] = (t[A + 2] * v00 + t[B + 2] * v10 + t[C + 2] * v01 + t[E + 2] * v11) * light;
            d[i + 3] = 255 * edge;
            if (tileUsed.get(id) !== tileTick) tileUsed.set(id, tileTick);
            continue;
          }
          tileWant.add(id);
        }
        d[i]     = (tex[a] * w00 + tex[b] * w10 + tex[c] * w01 + tex[e] * w11) * light;
        d[i + 1] = (tex[a + 1] * w00 + tex[b + 1] * w10 + tex[c + 1] * w01 + tex[e + 1] * w11) * light;
        d[i + 2] = (tex[a + 2] * w00 + tex[b + 2] * w10 + tex[c + 2] * w01 + tex[e + 2] * w11) * light;
        d[i + 3] = 255 * edge;
      }
    }
    if (pyB >= N) buf.g.putImageData(buf.img, 0, 0);   // показуємо, лише коли кадр готовий повністю
    if (useT && tileWant.size) loadTiles();
  }

  /* ---------- 5. Мишка ---------- */
  let hovered = null, selected = null;
  const markerPos = [];

  function localXY(e) {
    const b = canvas.getBoundingClientRect();
    // полотно може бути показане в іншому розмірі, ніж намальоване, — перераховуємо
    const kx = (canvas.width / DPR) / (b.width || 1), ky = (canvas.height / DPR) / (b.height || 1);
    return { x: (e.clientX - b.left) * kx, y: (e.clientY - b.top) * ky };
  }
  function siteAt(p) {
    let best = null, bestD = 999;
    markerPos.forEach(m => {
      if (!m.visible) return;
      const hr = m.site._hitR || 0;
      const dd = Math.hypot((m.big ? m.hx : m.x) - p.x, (m.big ? m.hy : m.y) - p.y);
      const lim = m.big ? Math.max(28, hr) : 22;
      if (dd < lim && dd < bestD) { bestD = dd; best = m.site; }
    });
    return best;
  }

  canvas.addEventListener("pointerdown", e => {
    dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.classList.add("dragging");
    qTarget = null;
  });
  canvas.addEventListener("pointermove", e => {
    if (dragging) {
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      // тягнеш вбік — крутиться вбік, тягнеш угору/вниз — перевертається через полюси
      q = qNorm(qMul(qMul(qAxis(1, 0, 0, dy * 0.008 / zoom), qAxis(0, 1, 0, dx * 0.008 / zoom)), q));
      updM();
      lastX = e.clientX; lastY = e.clientY;
      if (moved > 4) auto = false;
    }
    const p = localXY(e);
    hovered = dragging ? null : siteAt(p);
    if (hovered) {
      tooltip.textContent = hovered.name;
      tooltip.style.left = e.clientX + "px";
      tooltip.style.top = e.clientY + "px";
      tooltip.style.display = "block";
      canvas.style.cursor = "pointer";
    } else {
      tooltip.style.display = "none";
      canvas.style.cursor = "";
    }
  });
  canvas.addEventListener("pointerup", e => {
    dragging = false;
    canvas.classList.remove("dragging");
    if (moved < 6) {
      const s = siteAt(localXY(e));
      if (s) select(s);
    }
  });
  canvas.addEventListener("pointerleave", () => { tooltip.style.display = "none"; hovered = null; });

  /* ---------- 5б. Наближення: коліщатко, два пальці, кнопки ---------- */
  const ZMIN = 1, ZMAX = (cfg.tiles ? 16 : 7) * 0.88 / VIS;   // з плитками можна наближатися сильніше
  const setZoom = z => { targetZoom = Math.max(ZMIN, Math.min(ZMAX, z)); if (targetZoom > 1.1) auto = false; };
  canvas.addEventListener("wheel", e => {
    e.preventDefault();                                  // щоб не гортати сторінку
    setZoom(targetZoom * (e.deltaY < 0 ? 1.18 : 1 / 1.18));
  }, { passive: false });
  const touches = new Map(); let pinch0 = 0, zoom0 = 1;
  canvas.addEventListener("pointerdown", e => { touches.set(e.pointerId, [e.clientX, e.clientY]); if (touches.size === 2) { const [a, b] = [...touches.values()]; pinch0 = Math.hypot(a[0] - b[0], a[1] - b[1]); zoom0 = targetZoom; } });
  canvas.addEventListener("pointermove", e => {
    if (!touches.has(e.pointerId)) return;
    touches.set(e.pointerId, [e.clientX, e.clientY]);
    if (touches.size === 2 && pinch0) { const [a, b] = [...touches.values()]; setZoom(zoom0 * Math.hypot(a[0] - b[0], a[1] - b[1]) / pinch0); moved = 99; }
  });
  const endTouch = e => { touches.delete(e.pointerId); if (touches.size < 2) pinch0 = 0; };
  canvas.addEventListener("pointerup", endTouch); canvas.addEventListener("pointercancel", endTouch);

  const zc = document.createElement("div");
  zc.className = "zoom-ctrl";
  zc.innerHTML = `<button data-z="in" title="${T("Zoom in")}">+</button><button data-z="out" title="${T("Zoom out")}">−</button><button data-z="reset" title="${T("Show the whole planet")}">⤢</button>` +
    `<button data-z="north" title="${T("Turn north up")}" class="txt">N↑</button><button data-z="grid" title="${T("Show coordinate grid")}" class="txt">#</button>` +
    `<button data-z="help" title="${T("How to use the map")}" class="txt">?</button>`;
  box.parentNode.insertBefore(zc, box.nextSibling);
  zc.onclick = e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.z === "in") setZoom(targetZoom * 1.5);
    if (b.dataset.z === "out") setZoom(targetZoom / 1.5);
    if (b.dataset.z === "reset") { setZoom(1); auto = true; }
    if (b.dataset.z === "north") northUp();
    if (b.dataset.z === "grid") { showGrid = !showGrid; b.classList.toggle("on", showGrid); }
    if (b.dataset.z === "help") showHint();
  };

  /* ---------- 5б. Підказка при першому відкритті ---------- */
  const hintKey = "hint-seen-" + cfg.planetName.toLowerCase();
  const hint = document.createElement("div");
  hint.className = "first-hint"; hint.hidden = true;
  hint.setAttribute("role", "dialog"); hint.setAttribute("aria-label", T("How to use the map"));
  hint.innerHTML = `
    <span class="fh-label">${T("How to explore")}</span>
    <ol>
      <li><span class="fh-ico">🖐</span><span><b>${T("Spin the planet")}</b> — ${T("drag it with the mouse or a finger")}</span></li>
      <li><span class="fh-ico">🔍</span><span><b>${T("Zoom in on the surface")}</b> — ${T("scroll the wheel or pinch with two fingers")}</span></li>
      <li><span class="fh-ico">📍</span><span><b>${T("Click the markers")}</b> — ${T("to read the story of each spacecraft")}</span></li>
    </ol>
    <button class="btn fh-ok">${T("Got it, let's go!")}</button>`;
  box.parentNode.appendChild(hint);
  function showHint() { hint.hidden = false; requestAnimationFrame(() => hint.classList.add("on")); }
  function hideHint() {
    if (hint.hidden) return;
    hint.classList.remove("on");
    setTimeout(() => { hint.hidden = true; }, 300);
    try { localStorage.setItem(hintKey, "1"); } catch (e) {}
  }
  hint.querySelector(".fh-ok").onclick = hideHint;
  addEventListener("keydown", e => { if (e.key === "Escape") hideHint(); });
  let seen = false; try { seen = localStorage.getItem(hintKey) === "1"; } catch (e) {}
  if (!seen && !location.hash) setTimeout(showHint, 700);

  /* ---------- 5в. Орієнтація: компас, «північ угору», сітка ---------- */
  let showGrid = false;
  // Повернути планету північчю вгору, не зсуваючи те, що зараз у центрі
  function northUp() {
    const px = M[6], py = M[7], pz = M[8];          // точка планети в центрі екрана
    const lat = Math.asin(Math.max(-1, Math.min(1, py))), lon = Math.atan2(px, pz);
    qTarget = qMul(qAxis(1, 0, 0, lat), qAxis(0, 1, 0, -lon));
    auto = false;
  }
  // Компас біля планети
  const compass = document.createElement("div");
  compass.className = "compass";
  compass.title = T("Compass: the red arrow points to the north pole");
  compass.innerHTML = `<svg viewBox="-50 -50 100 100" width="76" height="76">
      <circle r="46" fill="rgba(5,3,15,.6)" stroke="rgba(255,231,194,.35)"/>
      <g class="rose">
        <polygon points="0,-38 7,0 -7,0" fill="#ff6b5a"/>
        <polygon points="0,38 7,0 -7,0" fill="#ffe7c2"/>
        <polygon points="-38,0 0,-5 0,5" fill="rgba(255,231,194,.45)"/>
        <polygon points="38,0 0,-5 0,5" fill="rgba(255,231,194,.45)"/>
        <text y="-24" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" transform="translate(0,-17)">N</text>
        <text y="38" text-anchor="middle" font-size="11" font-weight="700" fill="#ffe7c2" transform="translate(0,9)">S</text>
        <text x="40" y="4" text-anchor="start" font-size="10" fill="#ffe7c2" transform="translate(-4,0)">E</text>
        <text x="-40" y="4" text-anchor="end" font-size="10" fill="#ffe7c2" transform="translate(4,0)">W</text>
      </g>
      <circle r="3" fill="#ffe7c2"/>
    </svg>`;
  box.parentNode.style.position = "relative";
  box.parentNode.appendChild(compass);
  const rose = compass.querySelector(".rose");

  // Лінії широти й довготи + позначки полюсів
  function drawGrid(c, r) {
    const line = (pts, strong) => {
      ctx.strokeStyle = strong ? "rgba(255,231,194,.75)" : "rgba(255,255,255,.28)";
      ctx.lineWidth = (strong ? 1.6 : 1) * DPR;
      ctx.beginPath(); let pen = false;
      pts.forEach(([la, lo]) => {
        const v = project(la, lo);
        if (v.z < 0) { pen = false; return; }
        const x = c + v.x * r, y = c - v.y * r;
        pen ? ctx.lineTo(x, y) : ctx.moveTo(x, y); pen = true;
      });
      ctx.stroke();
    };
    const label = (la, lo, text) => {
      const v = project(la, lo); if (v.z < 0.15) return;
      ctx.fillStyle = "rgba(255,231,194,.9)";
      ctx.font = `600 ${11 * DPR}px Manrope, sans-serif`; ctx.textAlign = "center";
      ctx.fillText(text, c + v.x * r, c - v.y * r - 4 * DPR);
    };
    for (let la = -60; la <= 60; la += 30) {
      const pts = []; for (let lo = -180; lo <= 180; lo += 3) pts.push([la, lo]);
      line(pts, la === 0);
    }
    for (let lo = -180; lo < 180; lo += 30) {
      const pts = []; for (let la = -90; la <= 90; la += 3) pts.push([la, lo]);
      line(pts, lo === 0);
    }
    label(0, -45, "Equator"); label(0, 45, "Equator");
    label(30, 0, "0°"); label(-30, 0, "0°");
    [30, 60].forEach(la => { label(la, 90, la + "°N"); label(-la, 90, la + "°S"); });
  }
  function drawPoles(c, r) {
    [[90, "N", "#ff6b5a"], [-90, "S", "#ffe7c2"]].forEach(([la, t, col]) => {
      const v = project(la, 0); if (v.z < 0.05) return;
      const x = c + v.x * r, y = c - v.y * r;
      ctx.globalAlpha = Math.min(1, (v.z - 0.05) / 0.2);
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 3.5 * DPR, 0, Math.PI * 2); ctx.fill();
      ctx.font = `800 ${13 * DPR}px Manrope, sans-serif`; ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0,0,0,.8)"; ctx.shadowBlur = 5 * DPR;
      ctx.fillText(t, x, y - 8 * DPR);
      ctx.shadowBlur = 0; ctx.globalAlpha = 1;
    });
  }

  /* ---------- 6. Кадр анімації ---------- */
  function frame(t) {
    if (tex) {
      if (qTarget) {                                  // плавно повертаємо до вибраної точки
        q = qSlerp(q, qTarget, 0.08);
        const d = Math.abs(q[0] * qTarget[0] + q[1] * qTarget[1] + q[2] * qTarget[2] + q[3] * qTarget[3]);
        if (d > 0.999999) { q = qTarget; qTarget = null; }
        updM();
      } else if (auto && !dragging && !hovered && zoom < 1.1) {
        q = qNorm(qMul(q, qAxis(0, 1, 0, 0.0025)));   // обертання навколо власної осі
        updM();
      }

      zoom += (targetZoom - zoom) * 0.12;
      if (Math.abs(targetZoom - zoom) < 0.002) zoom = targetZoom;
      const S0 = W * DPR, rf = BASE * zoom;
      // Під час руху — швидкий буфер; коли все зупинилось — один раз малюємо чітко
      // видима частина полотна (у частках 0..1) — решту не малюємо
      const cr = canvas.getBoundingClientRect();
      if (cr.bottom < 0 || cr.top > innerHeight) { requestAnimationFrame(frame); return; }   // планету прогорнули — не малюємо
      const clip = [Math.max(0, -cr.left) / cr.width, Math.max(0, -cr.top) / cr.height,
                    Math.min(cr.width, innerWidth - cr.left) / cr.width, Math.min(cr.height, innerHeight - cr.top) / cr.height]
                    .map(v => Math.round(Math.max(0, Math.min(1, v)) * 40) / 40);
      const key = [...q.map(v => v.toFixed(5)), zoom.toFixed(3), TW, clip.join("/")].join();
      const hiSize = Math.min(Math.round(S0), 3000);
      if (!hi || hi.size !== hiSize) hi = makeBuf(hiSize);
      let view = lo;
      if (key === lastKey) {
        if (lo.key !== key) { renderSphere(rf, lo, clip); lo.key = key; }
        if (hi.key !== key) {
          // чіткий кадр малюємо частинами (~8 мс за кадр), щоб сторінка не «зависала»
          if (hi.pending !== key) { hi.pending = key; hi.row = 0; }
          const t0 = performance.now(), step = Math.max(16, hi.size >> 5);
          while (hi.row < hi.size && performance.now() - t0 < 8) {
            const r1 = Math.min(hi.size, hi.row + step);
            renderSphere(rf, hi, clip, hi.row, r1); hi.row = r1;
          }
          if (hi.row >= hi.size) { hi.key = key; hi.pending = null; }
        }
        view = hi.key === key ? hi : lo;
      } else {
        renderSphere(rf, lo, clip); lo.key = key;
      }
      lastKey = key;
      const S = S0, size = S * BASE;
      ctx.clearRect(0, 0, S, S);

      // атмосфера
      const c = S / 2, r = size / 2 * zoom;
      const glow = ctx.createRadialGradient(c, c, r * 0.96, c, c, r * 1.12);
      glow.addColorStop(0, cfg.atmosphere + "0.45)");
      glow.addColorStop(1, cfg.atmosphere + "0)");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(c, c, r * 1.12, 0, Math.PI * 2); ctx.fill();

      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(view.c, 0, 0, S, S);

      // сітка, полюси, компас
      if (showGrid) drawGrid(c, r);
      drawPoles(c, r);
      const nAng = Math.atan2(M[1], M[4]);              // куди на екрані дивиться північ
      rose.setAttribute("transform", `rotate(${(nAng * 180 / Math.PI).toFixed(1)})`);

      // маршрути роверів
      sites.forEach(s => { if (s.route && shown(s)) drawRoute(s, c, r); });
      // точки
      markerPos.length = 0;
      sites.forEach(s => {
        if (!shown(s)) return;
        const v = project(s.lat, s.lon);
        const x = c + v.x * r, y = c - v.y * r;
        const visible = v.z > 0.05;
        // точка трохи вище основи — щоб легше влучити мишкою
        markerPos.push({ site: s, x: x / DPR, y: y / DPR, hx: x / DPR + v.x / (Math.hypot(v.x, v.y) || 1) * Math.max(10, (s._hitR || 40) * 0.25), hy: y / DPR - v.y / (Math.hypot(v.x, v.y) || 1) * Math.max(10, (s._hitR || 40) * 0.25), visible, big: !!s._mini });
        if (s.kind === "impact") { if (visible) { drawImpact(s, v, x, y, t); if (s._mini) drawModel(s, v, x, y, r, t, true); } return; }
        if (s._mini) { drawModel(s, v, x, y, r, t); return; }
        if (!visible) return;
        const col = colOf(s);
        const pulse = 0.5 + 0.5 * Math.sin(t / 350 + s.lat);
        const isSel = s === selected, isHov = s === hovered;
        const base = (isSel || isHov ? 9 : 6) * DPR;
        const size = (isSel || isHov ? 30 : 22) * DPR * (0.6 + 0.4 * v.z);   // ближче до краю — менше
        // сяйво
        const g = ctx.createRadialGradient(x, y, size * 0.4, x, y, size * 1.25);
        g.addColorStop(0, `rgba(${col},${0.45 + pulse * 0.35})`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, size * 1.25, 0, Math.PI * 2); ctx.fill();
        // кругла мініатюра апарата
        ctx.save();
        ctx.beginPath(); ctx.arc(x, y, size * 0.62, 0, Math.PI * 2); ctx.closePath();
        if (s._mini) { ctx.fillStyle = `rgba(${col},0.18)`; ctx.fill(); }
        else if (s._thumb && s._thumb.complete && s._thumb.naturalWidth) {
          ctx.clip();
          const im = s._thumb, k = Math.max(size * 1.24 / im.naturalWidth, size * 1.24 / im.naturalHeight);
          ctx.drawImage(im, x - im.naturalWidth * k / 2, y - im.naturalHeight * k / 2, im.naturalWidth * k, im.naturalHeight * k);
        } else { ctx.fillStyle = `rgb(${col})`; ctx.fill(); }
        ctx.restore();
        ctx.strokeStyle = `rgb(${col})`; ctx.lineWidth = 2 * DPR;
        ctx.beginPath(); ctx.arc(x, y, size * 0.62, 0, Math.PI * 2); ctx.stroke();
        if (isSel) {
          ctx.strokeStyle = "#fff"; ctx.lineWidth = 2 * DPR;
          ctx.beginPath(); ctx.arc(x, y, size * 0.8 + pulse * 3 * DPR, 0, Math.PI * 2); ctx.stroke();
        }
        if (isSel || isHov) {
          ctx.font = `700 ${13 * DPR}px Manrope, sans-serif`;
          ctx.fillStyle = "#fff";
          ctx.textAlign = "left";
          ctx.fillText(s.name, x + size * 0.85, y + 4 * DPR);
        }
      });

      // апарати на орбіті
      orbiters.forEach(o => { if (shown(o)) drawOrbiter(o, c, r, t); });
      if (selected && selected.flyby && selected.flybyKm) drawFlyby(selected, c, r, t);

      // спалах навколо апарата, про який зараз розповідає шкала часу
      if (flash && !away(flash.s) && t - flash.t0 < 1800) {
        const v = project(flash.s.lat, flash.s.lon);
        if (v.z > 0) {
          const k = (t - flash.t0) / 1800;
          const fx = c + v.x * r, fy = c - v.y * r;
          ctx.strokeStyle = `rgba(${flash.col},${1 - k})`; ctx.lineWidth = 3 * DPR;
          ctx.beginPath(); ctx.arc(fx, fy, (12 + 50 * k) * DPR, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.arc(fx, fy, (6 + 25 * k) * DPR, 0, Math.PI * 2); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------- 5в. Місце падіння: кратер-мітка ---------- */
  function drawImpact(s, v, x, y, t) {
    const isSel = s === selected, isHov = s === hovered;
    const k = DPR * (isSel || isHov ? 1.35 : 1) * (0.6 + 0.4 * v.z);
    const pulse = 0.5 + 0.5 * Math.sin(t / 400 + s.lon);
    ctx.fillStyle = "rgba(20,10,8,.55)";
    ctx.beginPath(); ctx.arc(x, y, 8 * k, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = `rgba(255,140,90,${0.7 + 0.3 * pulse})`; ctx.lineWidth = 2 * DPR;
    ctx.beginPath(); ctx.arc(x, y, 8 * k, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 1.6 * DPR;                       // промені удару
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3 + 0.3;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * 10 * k, y + Math.sin(a) * 10 * k);
      ctx.lineTo(x + Math.cos(a) * 14 * k, y + Math.sin(a) * 14 * k);
      ctx.stroke();
    }
    if (isSel) {
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2 * DPR;
      ctx.beginPath(); ctx.arc(x, y, 17 * k + pulse * 3 * DPR, 0, Math.PI * 2); ctx.stroke();
    }
    if (isSel || isHov) {
      ctx.font = `700 ${13 * DPR}px Manrope, sans-serif`;
      ctx.fillStyle = "#fff"; ctx.textAlign = "left";
      ctx.fillText(s.name, x + 18 * k, y + 4 * DPR);
    }
  }

  /* ---------- 5в2. Маршрут ровера по поверхні ---------- */
  function drawRoute(s, c, r) {
    const isSel = s === selected, isHov = s === hovered;
    ctx.save();
    ctx.lineJoin = "round"; ctx.lineCap = "round";
    ctx.strokeStyle = isSel || isHov ? "rgba(255,176,46,.95)" : "rgba(255,176,46,.55)";
    ctx.lineWidth = (isSel ? 2.6 : 1.6) * DPR;
    if (s.route.src === "approx") ctx.setLineDash([5 * DPR, 4 * DPR]);
    ctx.beginPath();
    let pen = false;
    for (const [la, lo] of s.route.pts) {
      const v = project(la, lo);
      if (v.z < 0.02) { pen = false; continue; }
      const x = c + v.x * r, y = c - v.y * r;
      if (pen) ctx.lineTo(x, y); else { ctx.moveTo(x, y); pen = true; }
    }
    ctx.stroke();
    ctx.restore();
  }

  /* ---------- 5г. Траєкторія прольоту повз планету ---------- */
  function drawFlyby(s, c, r, t) {
    const near = 1.06 + Math.min(0.3, s.flybyKm / 40000);   // ближчий проліт — ближче до диска
    const rot = -0.25, cr = Math.cos(rot), sr = Math.sin(rot);
    // траєкторія — ліворуч від планети (праворуч картка, вона б її закрила)
    const P = u => { const x = -(near + 0.55 * u * u), y = 2.3 * u; return [c + r * (x * cr - y * sr), c - r * (x * sr + y * cr)]; };
    ctx.save();
    ctx.setLineDash([6 * DPR, 6 * DPR]); ctx.lineWidth = 1.6 * DPR; ctx.strokeStyle = "rgba(255,231,194,.75)";
    ctx.beginPath();
    for (let k = 0; k <= 60; k++) { const [x, y] = P(-1.4 + 2.8 * k / 60); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke(); ctx.setLineDash([]);
    const [nx, ny] = P(0);
    ctx.fillStyle = "#ffe7c2"; ctx.beginPath(); ctx.arc(nx, ny, 3.5 * DPR, 0, Math.PI * 2); ctx.fill();
    ctx.font = `600 ${12 * DPR}px Manrope, sans-serif`; ctx.textAlign = "left";
    ctx.shadowColor = "rgba(0,0,0,.9)"; ctx.shadowBlur = 6 * DPR;
    ctx.fillText(`${T("Closest approach")}: ${s.flybyKm.toLocaleString("en-US")} km`, nx + 10 * DPR, ny - 4 * DPR);
    ctx.fillText(s.flybyDate, nx + 10 * DPR, ny + 12 * DPR);
    ctx.shadowBlur = 0;
    const u = ((t / 1000 * 0.12) % 2.8) - 1.4;
    const [x, y] = P(u), [x2, y2] = P(u + 0.02);
    ctx.translate(x, y); ctx.rotate(Math.atan2(y2 - y, x2 - x));
    ctx.fillStyle = "#6ea8ff"; ctx.fillRect(-2 * DPR, -10 * DPR, 4 * DPR, 7 * DPR); ctx.fillRect(-2 * DPR, 3 * DPR, 4 * DPR, 7 * DPR);
    ctx.fillStyle = "#e8e2d4"; ctx.fillRect(-4 * DPR, -3 * DPR, 8 * DPR, 6 * DPR);
    ctx.restore();
  }

  /* ---------- 6. Орбіти та супутники ---------- */
  function orbitPoint(o, a) {                         // точка орбіти в координатах планети
    const i = rad(o.orbit.inc), n = rad(o.orbit.node);
    const x0 = Math.cos(a), y1 = -Math.sin(a) * Math.sin(i), z1 = Math.sin(a) * Math.cos(i);
    const x = x0 * Math.cos(n) + z1 * Math.sin(n), z = -x0 * Math.sin(n) + z1 * Math.cos(n);
    const R = o.orbit.r;
    return {
      x: (M[0] * x + M[1] * y1 + M[2] * z) * R,
      y: (M[3] * x + M[4] * y1 + M[5] * z) * R,
      z: (M[6] * x + M[7] * y1 + M[8] * z) * R
    };
  }
  const hiddenBehind = v => v.z < 0 && Math.hypot(v.x, v.y) < 1;   // за планетою
  function drawOrbiter(o, c, r, t) {
    const isSel = o === selected, isHov = o === hovered;
    const col = colOf(o);
    // лінія орбіти
    const N = 120;
    ctx.lineWidth = (isSel ? 1.6 : 1) * DPR;
    let prev = orbitPoint(o, 0);
    for (let k = 1; k <= N; k++) {
      const v = orbitPoint(o, k / N * Math.PI * 2);
      if (!hiddenBehind(v) && !hiddenBehind(prev)) {
        const front = v.z >= 0;
        ctx.strokeStyle = `rgba(${col},${(isSel || isHov ? 0.75 : 0.28) * (front ? 1 : 0.45)})`;
        ctx.beginPath();
        ctx.moveTo(c + prev.x * r, c - prev.y * r);
        ctx.lineTo(c + v.x * r, c - v.y * r);
        ctx.stroke();
      }
      prev = v;
    }
    // сам супутник
    const a = o.orbit.phase + t / 1000 * o.orbit.speed * 60;
    const v = orbitPoint(o, a), ahead = orbitPoint(o, a + 0.05);
    const x = c + v.x * r, y = c - v.y * r;
    const visible = !hiddenBehind(v);
    markerPos.push({ site: o, x: x / DPR, y: y / DPR, visible, big: false });
    if (!visible) return;
    const ang = Math.atan2(-(ahead.y - v.y), ahead.x - v.x);
    const k = DPR * (isSel || isHov ? 1.35 : 1) * (v.z >= 0 ? 1 : 0.8);
    const g = ctx.createRadialGradient(x, y, 0, x, y, 16 * k);
    g.addColorStop(0, `rgba(${col},0.5)`); g.addColorStop(1, `rgba(${col},0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 16 * k, 0, Math.PI * 2); ctx.fill();
    ctx.save();
    ctx.translate(x, y); ctx.rotate(ang + Math.PI / 2);
    ctx.fillStyle = "#6ea8ff";                         // сонячні панелі
    ctx.fillRect(-11 * k, -2.2 * k, 7 * k, 4.4 * k);
    ctx.fillRect(4 * k, -2.2 * k, 7 * k, 4.4 * k);
    ctx.fillStyle = "#e8e2d4";                         // корпус
    ctx.fillRect(-3.5 * k, -3.5 * k, 7 * k, 7 * k);
    ctx.strokeStyle = `rgb(${col})`; ctx.lineWidth = 1.2 * DPR;
    ctx.strokeRect(-3.5 * k, -3.5 * k, 7 * k, 7 * k);
    ctx.restore();
    if (isSel) {
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5 * DPR;
      ctx.beginPath(); ctx.arc(x, y, 15 * k, 0, Math.PI * 2); ctx.stroke();
    }
    if (isSel || isHov) {
      ctx.font = `700 ${13 * DPR}px Manrope, sans-serif`;
      ctx.fillStyle = "#fff"; ctx.textAlign = "left";
      ctx.fillText(o.name, x + 16 * k, y + 4 * DPR);
    }
  }

  /* ---------- 6а. Модель «стоїть» на поверхні планети ----------
     • нахиляється разом із поверхнею (верх = від центру планети)
     • ми дивимось на неї під тим самим кутом, що й на ґрунт під нею
     • освітлена так само, як поверхня; має тінь на ґрунті
     • ховається за обрієм, коли планета повертається                 */
  function drawModel(s, v, x, y, r, t, crashed) {
    const isSel = s === selected, isHov = s === hovered;
    const nz = Math.max(0, v.z);
    const fade = Math.max(0, Math.min(1, (nz - 0.05) / 0.25));
    const roll = Math.atan2(v.x, v.y);
    const scale = (isSel || isHov ? 0.9 : 0.7) * (crashed ? 0.6 : 1) * (r / zoom / DPR) / 280 * Math.pow(zoom, 0.9);
    const light = 0.3 + 0.85 * Math.max(0, v.x * L[0] + v.y * L[1] + v.z * L[2]);
    if (fade <= 0) return;
    // кут огляду: згори, коли апарат у центрі диска; збоку — біля краю → вибираємо найближчий знімок
    const ang = Math.min(85, Math.asin(nz) * 180 / Math.PI);
    let bi = 0; SPR_ANG.forEach((a, i) => { if (Math.abs(a - ang) < Math.abs(SPR_ANG[bi] - ang)) bi = i; });
    const im = s._spr[bi];
    s._hitR = 46 * scale;   // радіус влучання ≈ розмір намальованого апарата (у CSS-пікселях)
    const drawSpr = () => {
    if (im.complete && im.naturalWidth) {
      ctx.save();
      ctx.globalAlpha = fade * (crashed ? 0.85 : 1);
      const fl = `brightness(${(Math.round(light * 10) / 10).toFixed(1)}) ${cfg.modelTint || ""}`;
      if ("filter" in ctx) ctx.filter = fl;
      ctx.translate(x, y); ctx.rotate(roll + (crashed ? 0.7 : 0)); ctx.scale(scale * DPR, scale * DPR);
      ctx.drawImage(im, -55, -66, 110, 110);
      ctx.restore();
    }
    };
    if (crashed) { drawSpr(); return; }

    // тінь на ґрунті (коло в площині поверхні → еліпс на екрані)
    const up = Math.atan2(-v.y, v.x);
    const rho = 30 * DPR * scale;
    ctx.save();
    ctx.translate(x, y); ctx.rotate(up); ctx.scale(Math.max(0.12, nz), 1);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rho);
    g.addColorStop(0, `rgba(0,0,0,${0.5 * fade})`);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(0, 0, rho, 0, Math.PI * 2); ctx.fill();
    // кільце на ґрунті для вибраного / наведеного
    if (isSel || isHov) {
      const col = colOf(s);
      const pulse = 0.5 + 0.5 * Math.sin(t / 350);
      ctx.strokeStyle = isSel ? `rgba(${col},${0.6 + 0.4 * pulse})` : "rgba(255,255,255,.8)";
      ctx.lineWidth = 2 * DPR / Math.max(0.3, nz);
      ctx.beginPath(); ctx.arc(0, 0, rho * (1.15 + 0.1 * pulse), 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();
    drawSpr();                                      // модель — поверх тіні
    if (isSel || isHov) {
      ctx.font = `700 ${13 * DPR}px Manrope, sans-serif`;
      ctx.fillStyle = "#fff"; ctx.textAlign = "left";
      ctx.shadowColor = "rgba(0,0,0,.8)"; ctx.shadowBlur = 6 * DPR;
      ctx.fillText(s.name, x + rho + 6 * DPR, y + 4 * DPR);
      ctx.shadowBlur = 0;
    }
  }

  /* ---------- 6б. 3D-моделі замість точок ---------- */
  // Заздалегідь «сфотографовані» 3D-моделі (images/sprites/<модель>_<кут>.png, 4 кути огляду).
  // Малюються прямо на полотні планети — набагато легше, ніж живі 3D-iframe.
  const SPR_ANG = [10, 35, 60, 85];
  sites.forEach(s => {
    if (!s.model) return;
    const name = s.model.split("/").pop().replace(".html", "");
    s._spr = SPR_ANG.map(a => { const im = new Image(); im.src = `images/sprites/${name}_${a}.png`; return im; });
    s._mini = true;
  });

  /* ---------- 7. Кнопки з назвами ---------- */
  // мініатюри апаратів для міток на планеті
  sites.forEach(s => { if (s.photo) { s._thumb = new Image(); s._thumb.src = s.photo; } });
  const chips = document.getElementById("chips");

  // Висувна панель зі списком апаратів (праворуч)
  const side = document.querySelector(".side-list");
  if (side) {
    document.body.appendChild(side);          // <main> має анімацію transform — fixed всередині ламається
    const tab = document.createElement("button");
    tab.className = "side-toggle";
    tab.innerHTML = `<span class="ico">🛰</span><span class="txt">${T("Spacecraft")}</span>`;
    document.body.appendChild(tab);
    const close = document.createElement("button");
    close.className = "side-close"; close.innerHTML = "✕"; close.title = T("Close");
    side.prepend(close);
    const setOpen = open => {
      document.body.classList.toggle("side-open", open);
      try { localStorage.setItem("sideOpen", open ? "1" : "0"); } catch (e) {}
    };
    let saved = null; try { saved = localStorage.getItem("sideOpen"); } catch (e) {}
    setOpen(saved === "1");                    // за замовчуванням закрита
    tab.onclick = () => setOpen(!document.body.classList.contains("side-open"));
    close.onclick = () => setOpen(false);
    side.addEventListener("click", e => { if (e.target.closest(".chip") && innerWidth < 760) setOpen(false); });
  }
  sites.forEach(s => {
    const b = document.createElement("button");
    b.className = "chip";
    b.dataset.id = s.id;
    b.innerHTML = `<i class="dot ${s.status}"></i>${s.name}`;
    b.onclick = () => select(s);
    chips.appendChild(b);
  });
  if (orbiters.length) {
    const lab = document.createElement("div");
    lab.className = "chips-label"; lab.dataset.group = "orbit"; lab.textContent = T("In orbit");
    chips.appendChild(lab);
    orbiters.forEach(o => {
      const b = document.createElement("button");
      b.className = "chip orbit";
      b.dataset.id = o.id;
      b.innerHTML = `<i class="dot ${o.status}"></i>🛰 ${o.name}`;
      b.onclick = () => select(o);
      chips.appendChild(b);
    });
  }
  if (flybys.length) {
    const lab = document.createElement("div");
    lab.className = "chips-label"; lab.dataset.group = "flyby"; lab.textContent = T("Flybys, lost & on the way");
    chips.appendChild(lab);
    flybys.forEach(o => {
      const b = document.createElement("button");
      b.className = "chip flyby";
      b.dataset.id = o.id;
      b.innerHTML = `<i class="dot ${o.status}"></i>☄ ${o.name}`;
      b.onclick = () => select(o);
      chips.appendChild(b);
    });
  }

  /* ---------- 7б. Панель: статистика, шкала часу, пошук, фільтри, тур ---------- */
  const years = all.filter(s => s.arrived).map(s => yr(s.arrived));
  const minY = Math.floor(Math.min(...years));
  const tools = document.createElement("div");
  tools.className = "tools";
  const filters = [["all", "All"], ["active", "Working"], ["silent", "Silent"], ["surface", "On the surface"]]
    .concat(orbiters.length ? [["orbit", "In orbit"]] : [])
    .concat(flybys.length ? [["flyby", "Flybys"]] : [])
    .concat(sites.some(s => s.kind === "impact") ? [["impact", "Crash sites"]] : []);
  tools.innerHTML = `
    <div class="stats" id="stats"></div>
    <div class="tl">
      <button class="tl-play" title="${T("Play the history")}">▶</button>
      <input class="tl-range" type="range" min="${minY}" max="${nowY.toFixed(2)}" step="0.02" value="${nowY.toFixed(2)}" aria-label="${T("Timeline")}">
      <span class="tl-label"></span>
    </div>
    <div class="tool-row">
      <input class="search" type="search" placeholder="${T("Search a spacecraft…")}">
      <button class="tour-btn">${T("▶ Take the tour")}</button>
    </div>
    <div class="filters">${filters.map(([k, l]) => `<button data-f="${k}" class="${k === "all" ? "on" : ""}">${T(l)}</button>`).join("")}</div>`;
  document.querySelector(".globe-col").appendChild(tools);   // панель — під планетою

  const tlRange = tools.querySelector(".tl-range"), tlLabel = tools.querySelector(".tl-label"), tlPlay = tools.querySelector(".tl-play");
  const statsEl = tools.querySelector("#stats");
  function refresh() {
    tlLabel.innerHTML = tlYear === null ? `<b>${T("Today")}</b>` : `<b>${Math.floor(tlYear)}</b>`;
    const now = all.filter(inTime);
    const n = f => now.filter(f).length;
    statsEl.innerHTML =
      `<span><b>${n(s => !away(s) && s.kind !== "impact")}</b> ${T("on the surface")}</span>` +
      (orbiters.length ? `<span><b>${n(s => s.orbit)}</b> ${T("in orbit")}</span>` : "") +
      (flybys.length ? `<span><b>${n(s => s.flyby)}</b> ${T("flybys")}</span>` : "") +
      (sites.some(s => s.kind === "impact") ? `<span><b>${n(s => s.kind === "impact")}</b> ${T("crash sites")}</span>` : "") +
      `<span class="g"><b>${n(s => statusAt(s) === "active")}</b> ${T("still working")}</span>` +
      `<span class="y"><b>${n(s => statusAt(s) !== "active")}</b> ${T("silent")}</span>`;
    document.querySelectorAll(".chip").forEach(c => {
      const s = all.find(x => x.id === c.dataset.id);
      c.hidden = !shown(s);
      c.querySelector(".dot").className = "dot " + statusAt(s);
    });
    chips.querySelectorAll(".chips-label").forEach(lab => {
      lab.hidden = !(lab.dataset.group === "flyby" ? flybys : orbiters).some(shown);
    });
  }
  tlRange.oninput = () => {
    const v = +tlRange.value; tlYear = v >= nowY - 0.02 ? null : v; refresh();
    if (tlYear !== null) {
      const e = events.filter(x => x.y <= tlYear).pop();
      if (e && e !== lastShown) { lastShown = e; showEvent(e); }
    } else caption.classList.remove("on");
  };
  let lastShown = null;
  tlRange.onpointerdown = () => { if (playing) stopPlay(); ensureGlobeVisible(); };
  let playing = null;
  const caption = document.createElement("div");
  caption.className = "tl-caption";
  document.getElementById("globeBox").appendChild(caption);
  // Події історії: посадка / прибуття і останній зв'язок
  const events = [];
  all.forEach(s => {
    if (!s.arrived) return;
    events.push({ y: yr(s.arrived), s, type: "arrive" });
    if (s.lastContact && s.lastContact !== s.arrived) events.push({ y: yr(s.lastContact), s, type: s.leftBehind ? "left" : "silent" });
  });
  events.sort((a, b) => a.y - b.y);
  function eventText(e) {
    const s = e.s, y = Math.floor(e.y);
    if (e.type === "arrive") return `<b>${y}</b> · ${s.name} ${T(s.eventText || (s.orbit ? "arrives in orbit" : s.kind === "impact" ? "hits the surface" : "lands"))}`;
    if (e.type === "left") return `<b>${y}</b> · ${T("The crew leaves")} ${s.name}`;
    return `<b>${y}</b> · ${s.name} ${T("goes silent")}`;
  }
  function showEvent(e) {
    caption.innerHTML = eventText(e);
    caption.classList.add("on");
    const col = e.type === "arrive" ? "110,231,160" : "255,231,194";
    flash = { s: e.s, t0: performance.now(), col };
    hovered = null;
    if (away(e.s)) { qTarget = null; targetZoom = 1; }
    else faceTo(e.s.lat, e.s.lon, 1.25);
  }
  function stopPlay() {
    if (playing) clearInterval(playing);
    playing = null; tlPlay.textContent = "▶";
    setTimeout(() => caption.classList.remove("on"), 2500);
  }
  tlPlay.onclick = () => {
    if (playing) return stopPlay();
    stopTour();
    ensureGlobeVisible();
    if (tlYear === null) tlYear = minY - 0.01;
    tlPlay.textContent = "❚❚";
    let last = performance.now(), hold = 0;
    let next = events.findIndex(e => e.y > tlYear);
    const step = () => {
      const now = performance.now();
      if (now < hold) { last = now; return; }   // пауза на події
      const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
      tlYear = Math.min(nowY, tlYear + dt * (nowY - minY) / 22);       // ~22 с без пауз
      last = now;
      if (next >= 0 && next < events.length && events[next].y <= tlYear) {
        const e = events[next++];
        tlYear = e.y;
        showEvent(e);
        hold = now + (e.type === "arrive" ? 1500 : 1000);
      }
      tlRange.value = tlYear;
      refresh();
      if (tlYear >= nowY) { tlYear = null; refresh(); return stopPlay(); }
    };
    playing = setInterval(step, 33);
  };
  tools.querySelector(".search").oninput = e => {
    query = e.target.value.trim().toLowerCase(); refresh();
    if (!query) return;
    const found = all.filter(shown);
    if (found.length === 1) select(found[0]);           // знайшовся один — одразу показуємо його
    else if (found.length) { ensureGlobeVisible(); faceGroup(found); }
  };
  tools.querySelectorAll("[data-f]").forEach(b => b.onclick = () => {
    filter = b.dataset.f;
    tools.querySelectorAll("[data-f]").forEach(x => x.classList.toggle("on", x === b));
    refresh();
    ensureGlobeVisible();
    faceGroup(all.filter(shown));                      // повертаємо планету до відфільтрованих апаратів
  });

  // Тур: апарати по черзі, від найстарішого до найновішого
  const tourBtn = tools.querySelector(".tour-btn");
  let tour = null;
  function stopTour() { if (tour) { clearInterval(tour); tour = null; tourBtn.textContent = T("▶ Take the tour"); } }
  tourBtn.onclick = () => {
    if (tour) return stopTour();
    const list = all.filter(shown).sort((a, b) => (a.arrived || "").localeCompare(b.arrived || ""));
    if (!list.length) return;
    let i = 0;
    const go = () => { select(list[i % list.length]); i++; };
    go();
    tour = setInterval(go, 6500);
    tourBtn.textContent = T("■ Stop the tour");
  };
  canvas.addEventListener("pointerdown", stopTour);
  refresh();

  /* ---------- 7в. Лічильник тиші ---------- */
  function since(from) {
    let ms = Date.now() - new Date(from + "T00:00:00Z");
    const Y = 365.2425 * 864e5;
    const y = Math.floor(ms / Y); ms -= y * Y;
    const d = Math.floor(ms / 864e5); ms -= d * 864e5;
    const p = n => String(n).padStart(2, "0");
    const h = Math.floor(ms / 36e5), m = Math.floor(ms / 6e4) % 60, sec = Math.floor(ms / 1e3) % 60;
    return `<b>${y}</b> ${T("yr")} <b>${d}</b> ${T("d")} <b>${p(h)}:${p(m)}:${p(sec)}</b>`;
  }
  function counterHTML(s) {
    if (!s.arrived) return "";
    if (s.kind === "impact") return `${T("Crashed")} ${since(s.lastContact)} ${T("ago")}`;
    if (s.returned) return `${T("Back on Earth for")} ${since(s.lastContact)}`;
    if (s.leftBehind) return `${T("Left on the Moon")} ${since(s.lastContact)} ${T("ago")}`;
    if (!s.lastContact) return `${s.orbit ? T("In orbit for") : s.flyby ? T("In space for") : T("Working for")} ${since(s.arrived)}`;
    if (s.lastContactApprox) return `${T("Silent for about")} <b>${Math.floor((Date.now() - new Date(s.lastContact)) / (365.2425 * 864e5))}</b> ${T("years")}`;
    return `${T("Silent for")} ${since(s.lastContact)}`;
  }
  setInterval(() => {
    if (selected) document.querySelectorAll(".silence").forEach(el => el.innerHTML = counterHTML(selected));
  }, 1000);

  /* ---------- 8. Вибір апарата: картка + повний опис ---------- */
  const card = document.getElementById("card");
  const details = document.getElementById("details");

  function select(s) {
    selected = s;
    hideHint();
    ensureGlobeVisible();
    auto = false;
    if (away(s)) {                                   // супутник чи пролітний апарат: показуємо всю планету
      qTarget = null; targetZoom = 1;
    } else {
      qTarget = qMul(qAxis(1, 0, 0, rad(s.lat)), qAxis(0, 1, 0, -rad(s.lon)));   // апарат — у центр, північ — угору
      targetZoom = Math.max(targetZoom, 2.6 * 0.88 / VIS);   // наближаємось до апарата
    }
    const place = away(s) ? s.orbitText : s.coordsText;

    document.querySelectorAll(".chip").forEach(c => c.classList.toggle("selected", c.dataset.id === s.id));

    // Картка: 3D-модель або фото
    card.innerHTML = `
      ${s.photo || s.model ? `<div class="media">
        <div class="media-tabs" ${s.model || s.orbitPhoto ? "" : "hidden"}>
          ${s.model ? `<button class="mtab" data-m="model">🧊 ${T("3D model")}</button>` : ""}
          ${s.photo ? `<button class="mtab active" data-m="photo">📷 ${T("Photo")}</button>` : ""}
          ${s.orbitPhoto ? `<button class="mtab" data-m="orbit">🛰 ${T("From orbit")}</button>` : ""}
        </div>
        ${s.photo ? `<img class="card-photo" src="${s.photo}" alt="${s.name}">` : ""}
        ${s.orbitPhoto ? `<img class="card-photo orbit-photo" src="${s.orbitPhoto}" alt="${s.name} — ${T("From orbit")}" hidden>` : ""}
        <div class="model-box" hidden></div>
      </div>
      <p class="caption"><span class="cap-text">${s.photoCaption || ""}</span>${s.photo ? ` · <a href="#" class="open-photo">${T("Open photo full screen")} ⤢</a>` : ""}${s.model ? ` · <a href="${s.model}" target="_blank">${T("Open full 3D model")} ↗</a>` : ""}</p>` :
      `<div class="no-media">${s.orbit || s.flyby ? "🛰" : s.kind === "impact" ? "☄️" : "📍"}</div>`}
      <span class="status"><i class="dot ${s.status}"></i>${s.statusText}</span>
      <div class="silence">${counterHTML(s)}</div>
      <h2>${s.name}</h2>
      ${sizeHTML(s)}${routeHTML(s)}
      <p class="tagline">${s.tagline}</p>
      ${factsGridHTML(s)}
      <ul class="quick">
        <li><b>${T("Type")}:</b> ${s.type}</li>
        <li><b>${T(away(s) ? "Orbit" : "Coordinates")}:</b> ${place}</li>
        <li><b>${T("Where")}:</b> ${s.where}</li>
      </ul>
      ${s.facts && s.facts.length ? `<div class="card-fact"><span class="cf-ico">💡</span><div><b>${T("Fun fact")}</b>${s.facts[0]}</div></div>` : ""}
      ${trustHTML(s)}
      ${sourcesHTML(s)}
      <a class="btn" href="#details">${T("Read the full story")} ↓</a>`;
    card.style.animation = "none"; card.offsetHeight; card.style.animation = "";
    setupMedia(s);

    // Повний опис
    const list = arr => `<ul>${arr.map(x => `<li>${x}</li>`).join("")}</ul>`;
    const idx = all.indexOf(s);
    const prev = all[(idx - 1 + all.length) % all.length];
    const next = all[(idx + 1) % all.length];
    const box = (title, body, cls = "") => body ? `<div class="d-box ${cls}"><h3>${title}</h3><p>${body}</p></div>` : "";

    details.innerHTML = `
      <div class="details-head">
        <span class="label">${T(cfg.planetName).toUpperCase()} · ${s.type.toUpperCase()}</span>
        <h2>${s.name}</h2>
        <p>${s.tagline}</p>
      </div>

      <div class="d-grid">
        <div class="d-box">
          <h3>${T("Mission")}</h3>
          <table class="mission-table">${s.mission.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("")}</table>
        </div>
        <div class="d-box">
          <h3>${T("Location")}</h3>
          <p class="coords">${place}</p>
          <p class="trust-inline"><span class="tb ok">✓</span> ${T(away(s) ? "Orbit data: NASA" : "Real coordinates: NASA")}</p>
          <p style="margin-top:10px">${s.where}</p>
        </div>

        ${box(T("What it was for"), s.purpose, "full")}
        ${box(T("Mission story"), s.history, "full")}
        ${box(s.endedTitle && T(s.endedTitle), s.ended)}
        ${box(T("Where it is now"), s.now, s.ended ? "" : "full")}
        ${s.arrived ? `<div class="d-box full"><h3>${T("Timeline")}</h3><p>${T(s.arrivedLabel || (s.flyby ? (s.flybyKm ? "Flyby" : "Launch") : s.orbit ? "Arrived" : "Landed"))}: <b>${s.arrived}</b>${s.lastContact ? ` · ${T(s.kind === "impact" ? "Impact" : s.returned ? "Splashdown" : s.leftBehind ? "Crew left" : "Last contact")}: <b>${s.lastContactApprox ? "mid-" + s.lastContact.slice(0, 4) : s.lastContact}</b>` : ` · <span style="color:#6ee7a0">${T("still working")}</span>`}</p><p class="silence big">${counterHTML(s)}</p></div>` : ""}
        ${s.orbitView ? `<div class="d-box full"><h3>${T("Seen from orbit")}</h3><p>${T("NASA orbiters have photographed this place from above:")} <a href="${s.orbitView[1]}" target="_blank" rel="noopener">${s.orbitView[0]} ↗</a></p></div>` : ""}
        ${box(T("Is it working now?"), s.working, "full")}

        ${s.structure ? `<div class="d-box full">
          <h3>${T("How it is built")}</h3>
          ${list(s.structure)}
          ${s.schema ? `<img class="schema" src="${s.schema}" alt="${T("Structure of")} ${s.name}">` : ""}
        </div>` : ""}

        <div class="d-box full"><h3>${T("Fun facts")}</h3><ul class="facts">${s.facts.map(f => `<li>${f}</li>`).join("")}</ul></div>
        <div class="d-box full"><h3>${T("Who built it")}</h3><p>${s.builtBy}</p></div>
        <div class="d-box full">
          <h3>${T("Sources")}</h3>
          <p class="src-note">${T("Facts on this page come from these primary sources. 3D models, marker sizes and orbit paths on the globe are illustrations made by our team.")}</p>
          <ul>${s.sources.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${t}</a></li>`).join("")}</ul>
        </div>
      </div>
      <p class="correction">${T("Spotted a mistake or know more?")} <a href="mailto:${CORRECTIONS_EMAIL}?subject=${encodeURIComponent("Correction: " + s.name)}&body=${encodeURIComponent("Page: " + location.href.split("#")[0] + "#" + s.id + "\n\nWhat should be changed:\n")}">${T("Suggest a correction")} ✉</a></p>

      <div class="nav-row">
        <button class="btn outline" data-go="${prev.id}">← ${prev.name}</button>
        <button class="btn outline" data-go="${next.id}">${next.name} →</button>
      </div>`;
    details.hidden = false;
    details.querySelectorAll("[data-go]").forEach(b => b.onclick = () => {
      select(all.find(x => x.id === b.dataset.go));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 8б. Перемикач «Фото / 3D-модель» ---------- */
  const isIllustration = s => /illustration|artist|render|concept|ілюстрац|художн|концепт/i.test(s.photoCaption || "");
  function mediaBadge(s, which) {
    const m = card.querySelector(".media"); if (!m) return;
    let b = m.querySelector(".media-badge");
    if (!b) { b = document.createElement("span"); m.appendChild(b); }
    const ill = which === "model" || (which === "photo" && isIllustration(s));
    b.className = "media-badge " + (ill ? "ill" : "ok");
    b.textContent = which === "model" ? "◇ " + T("3D reconstruction, not to scale")
      : which === "orbit" ? "✓ " + T("Real image from orbit")
      : ill ? "◇ " + T("Illustration") : "✓ " + T("Real photo");
    b.title = ill ? T("This is a visualization made to explain the spacecraft, not an exact picture.") : T("A real photo published by NASA.");
  }

  /* ---------- 8а. Коротко про апарат: рік, агентство, місія ---------- */
  function factsGridHTML(s) {
    const cells = [];
    const arrY = s.arrived ? s.arrived.slice(0, 4) : "";
    const arrLabel = s.kind === "impact" ? "Impact" : s.arrivedLabel || (s.flyby ? (s.flybyKm ? "Flyby" : "Launch") : s.orbit ? "Arrived" : "Landed");
    if (s.launchYear) cells.push(["🚀", T("Launch"), s.launchYear]);
    const nice = { Landed: "Landing", Arrived: "Arrival" };
    if (arrY && !(arrLabel === "Launch" && s.launchYear)) cells.push([s.kind === "impact" ? "☄️" : s.orbit ? "🛰" : s.flyby ? "↗" : "🛬", T(nice[arrLabel] || arrLabel), arrY]);
    if (s.agency) cells.push(["🏛", T("Agency"), AGENCY_UK(s.agency)]);
    if (s.missionName) cells.push(["🎯", T("Mission"), s.missionName]);
    return `<div class="facts-grid">${cells.map(([i, k, v]) => `<div class="fg"><span class="fg-k">${i} ${k}</span><span class="fg-v">${v}</span></div>`).join("")}</div>`;
  }
  const AGENCY_UK = a => (typeof LANG !== "undefined" && LANG === "uk") ? a.replace("US Air Force", "ВПС США").replace("US Army", "Армія США") : a;

  /* ---------- 8а2. Що підтверджено, а що — умовна візуалізація ---------- */
  function trustHTML(s) {
    const ok = [T(away(s) ? "orbit" : "coordinates"), T("dates"), T("status")];
    if (s.photo && !isIllustration(s)) ok.push(T("photo"));
    const ill = [];
    if (s.model) ill.push(T("3D model"));
    ill.push(T("marker on the globe"));
    if (away(s)) ill.push(T("orbit path"));
    if (s.route) ill.push(T("rover route (simplified)"));
    if (s.photo && isIllustration(s)) ill.push(T("picture"));
    if (s.lastContactApprox) ill.push(T("last contact date (approximate)"));
    return `<div class="trust">
      <div><span class="tb ok">✓</span><span><b>${T("Confirmed by NASA")}:</b> ${ok.join(", ")}</span></div>
      <div><span class="tb ill">◇</span><span><b>${T("Visualization")}:</b> ${ill.join(", ")}</span></div>
    </div>`;
  }

  /* ---------- 8а3. Першоджерела прямо в картці ---------- */
  function srcLabel(u) {
    let h = ""; try { h = new URL(u).hostname.replace(/^www\./, ""); } catch (e) { return "Source"; }
    if (/nssdc/.test(h)) return "NASA NSSDC";
    if (/jpl\.nasa/.test(h)) return "NASA JPL";
    if (/science\.nasa/.test(h)) return "NASA Science";
    if (/mars\.nasa/.test(h)) return "NASA Mars";
    if (/lroc|asu\.edu/.test(h)) return "LROC (ASU)";
    if (/hirise|arizona\.edu/.test(h)) return "HiRISE";
    if (/nasa\.gov$/.test(h)) return "NASA";
    if (/esa\.int/.test(h)) return "ESA";
    return h;
  }
  function sourcesHTML(s) {
    if (!s.sources || !s.sources.length) return "";
    const seen = new Set(), links = [];
    s.sources.forEach(([t, u]) => { const l = srcLabel(u); if (!seen.has(l)) { seen.add(l); links.push(`<a href="${u}" target="_blank" rel="noopener" title="${t.replace(/"/g, "&quot;")}">${l} ↗</a>`); } });
    return `<p class="card-src"><b>${T("Primary sources")}:</b> ${links.slice(0, 4).join("")}</p>`;
  }

  function setupMedia(s) {
    if (!s.model && !s.orbitPhoto) { if (s.photo) mediaBadge(s, "photo"); return; }
    const tabs = card.querySelector(".media-tabs");
    const photo = card.querySelector(".card-photo:not(.orbit-photo)");
    const orb = card.querySelector(".orbit-photo");
    const box = card.querySelector(".model-box");
    const cap = card.querySelector(".cap-text");
    const show = which => {
      mediaBadge(s, which);
      tabs.querySelectorAll(".mtab").forEach(b => b.classList.toggle("active", b.dataset.m === which));
      if (photo) photo.hidden = which !== "photo";
      if (orb) orb.hidden = which !== "orbit";
      box.hidden = which !== "model";
      if (cap) cap.textContent = which === "orbit" ? (s.orbitCaption || "") : (s.photoCaption || "");
      if (which === "model" && !box.firstChild) {
        box.innerHTML = `<iframe src="${s.model}?embed=card" title="${T("3D model")}: ${s.name}"></iframe>`;
      }
    };
    tabs.querySelectorAll(".mtab").forEach(b => b.onclick = () => show(b.dataset.m));
    show(s.model ? "model" : "photo");   // одразу показуємо 3D-модель
  }

  /* ---------- 8в0. Міні-карта маршруту ровера ---------- */
  function routeHTML(s) {
    if (!s.route) return "";
    const R = /mars/i.test(cfg.planetName) ? 3389.5 : 1737.4, rad = Math.PI / 180;
    const P = s.route.pts, lat0 = P[0][0] * rad;
    const xy = P.map(([la, lo]) => [lo * rad * Math.cos(lat0) * R, -la * rad * R]);   // км
    const xs = xy.map(p => p[0]), ys = xy.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const W = 300, H = 150, pad = 14, k = Math.min((W - 2 * pad) / Math.max(x1 - x0, 0.01), (H - 2 * pad) / Math.max(y1 - y0, 0.01));
    const ox = (W - (x1 - x0) * k) / 2, oy = (H - (y1 - y0) * k) / 2;
    const pts = xy.map(([x, y]) => `${(ox + (x - x0) * k).toFixed(1)},${(oy + (y - y0) * k).toFixed(1)}`);
    const nice = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20], span = (W - 2 * pad) / k;
    const bar = nice.filter(v => v <= span / 3).pop() || 0.1, bp = bar * k;
    const [sx, sy] = pts[0].split(","), [ex, ey] = pts[pts.length - 1].split(",");
    const dash = s.route.src === "approx" ? ' stroke-dasharray="5 4"' : "";
    return `<div class="routebox"><svg viewBox="0 0 ${W} ${H}" width="100%" aria-label="${T("Rover route")}">
      <polyline points="${pts.join(" ")}" fill="none" stroke="#ffb02e" stroke-width="2" stroke-linejoin="round"${dash}/>
      <circle cx="${sx}" cy="${sy}" r="5" fill="#7be08f"/><circle cx="${ex}" cy="${ey}" r="5" fill="#ff7a59"/>
      <line x1="${pad}" y1="${H - 8}" x2="${pad + bp}" y2="${H - 8}" stroke="#ffe7c2" stroke-width="2"/>
      <text x="${pad + bp + 6}" y="${H - 4}" fill="#ffe7c2" font-size="11">${String(bar).replace(".", (typeof LANG !== "undefined" && LANG === "uk") ? "," : ".")} ${T("km")}</text>
      <text x="${W - pad}" y="14" fill="rgba(255,231,194,.7)" font-size="11" text-anchor="end">N ↑</text></svg>
      <p class="route-note"><span class="dotg"></span>${T("Landing")} <span class="dotr"></span>${T("Last known position")} · ${s.route.km ? `≈ ${s.route.km} ${T("km")} · ` : ""}${s.route.src === "nasa" ? T("NASA traverse data (simplified)") : T("simplified route from a NASA map")}</p></div>`;
  }

  /* ---------- 8в. Порівняння розміру з людиною ---------- */
  function sizeHTML(s) {
    if (!s.size) return "";
    const [m, what] = s.size, H = 1.75;                      // зріст людини
    const ref = m < 0.8 ? T("about the size of a backpack") : m < 2 ? T("about as big as a person") : m < 4.5 ? T("about the size of a car") : m < 9 ? T("about as big as a bus") : T("bigger than a bus");
    const W = 260, Hp = 64, k = Math.min(Hp / H, (W - 60) / m, 80);   // пікселів на метр
    const hp = H * k, sw = Math.max(3, m * k);
    const person = `<g transform="translate(14 ${Hp - hp}) scale(${hp / 100})" fill="#ffe7c2"><circle cx="12" cy="9" r="8"/><path d="M4 22h16l4 38h-6l-2 38h-8l-2-38H0z" opacity=".95"/></g>`;
    const craft = `<rect x="${50}" y="${Hp - Math.min(sw, Hp) * 0.55}" width="${sw}" height="${Math.min(sw, Hp) * 0.55}" rx="3" fill="rgba(255,176,46,.35)" stroke="#ffb02e"/>`;
    return `<div class="sizecmp"><svg viewBox="0 0 ${Math.max(W, 60 + sw)} ${Hp + 2}" width="${W}" height="${Hp + 2}" aria-hidden="true">${person}${craft}<line x1="0" y1="${Hp + 1}" x2="${Math.max(W, 60 + sw)}" y2="${Hp + 1}" stroke="rgba(255,231,194,.3)"/></svg>
      <p><b>≈ ${String(m).replace(".", (typeof LANG !== "undefined" && LANG === "uk") ? "," : ".")} ${T("m")}</b> — ${T(what)} · ${ref}. <span class="muted">${T("Person: 1.75 m")}</span></p></div>`;
  }

  /* ---------- 9. Зірки на фоні ---------- */
  const sc = document.getElementById("stars"), sctx = sc.getContext("2d");
  let stars = [];
  function resizeStars() {
    sc.width = innerWidth * devicePixelRatio; sc.height = innerHeight * devicePixelRatio;
    stars = Array.from({ length: Math.round(innerWidth * innerHeight / 3500) }, () => ({
      x: Math.random() * sc.width, y: Math.random() * sc.height,
      r: (Math.random() < 0.05 ? 5 + Math.random() * 6 : 0.6 + Math.random() * 1.6) * devicePixelRatio,
      p: Math.random() * 6.28, s: 0.5 + Math.random() * 1.5
    }));
  }
  let starsLast = 0;
  function drawStars(t) {
    if (t - starsLast < 50) { requestAnimationFrame(drawStars); return; }   // зірки мерехтять повільно — 20 кадрів/с досить
    starsLast = t;
    sctx.clearRect(0, 0, sc.width, sc.height);
    sctx.fillStyle = "#fff4e0";
    stars.forEach(s => {
      sctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(s.p + t / 1000 * s.s));
      sctx.beginPath();
      sctx.moveTo(s.x, s.y - s.r);
      sctx.quadraticCurveTo(s.x, s.y, s.x + s.r, s.y);
      sctx.quadraticCurveTo(s.x, s.y, s.x, s.y + s.r);
      sctx.quadraticCurveTo(s.x, s.y, s.x - s.r, s.y);
      sctx.quadraticCurveTo(s.x, s.y, s.x, s.y - s.r);
      sctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  addEventListener("resize", resizeStars);
  resizeStars();
  requestAnimationFrame(drawStars);

  // відкрити апарат за посиланням, напр. mars.html#opportunity
  const fromHash = all.find(s => "#" + s.id === location.hash);
  if (fromHash) select(fromHash);
}

/* ===== Фото на весь екран (клік по фото чи схемі в картці) ===== */
(function () {
  const lb = document.createElement("div");
  lb.className = "lightbox"; lb.hidden = true;
  lb.innerHTML = `<button class="lb-close" aria-label="${(window.t || (x => x))("Close")}">✕</button><img alt=""><p class="lb-cap"></p>`;
  document.body.appendChild(lb);
  const img = lb.querySelector("img"), cap = lb.querySelector(".lb-cap");
  const open = (src, text) => { img.src = src; cap.textContent = (text || "").replace(/\s*·\s*$/, ""); lb.hidden = false; document.body.classList.add("lb-open"); };
  const close = () => { lb.hidden = true; document.body.classList.remove("lb-open"); };
  lb.addEventListener("click", e => { if (e.target !== img) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) close(); });
  document.addEventListener("click", e => {
    const t = e.target;
    if (t.matches && t.matches(".card-photo, .schema")) {
      open(t.src, t.classList.contains("schema") ? t.alt : (t.closest(".card")?.querySelector(".caption")?.firstChild?.textContent || t.alt));
    } else if (t.matches && t.matches(".open-photo")) {
      e.preventDefault();
      const ph = t.closest(".card")?.querySelector(".card-photo:not([hidden])") || t.closest(".card")?.querySelector(".card-photo");
      if (ph) open(ph.src, t.parentElement.firstChild?.textContent || "");
    }
  });
})();
