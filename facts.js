/* =====================================================
   БЛОК «ЦІКАВІ ФАКТИ» НА ГОЛОВНІЙ
   Рекорди рахуються автоматично з даних карт,
   тож оновлюються разом із даними.
   ===================================================== */
(function () {
  const box = document.getElementById("funFacts");
  if (!box) return;
  const UK = typeof LANG !== "undefined" && LANG === "uk";
  const L = (en, uk) => UK ? uk : en;
  const tag = (list, world, page) => (typeof list === "undefined" || !list ? [] : list).map(s => Object.assign(s, { world, page }));
  const get = n => { try { return eval(n); } catch (e) { return []; } };
  const MOON = tag(get("MOON_SITES"), "moon", "moon.html").concat(tag(get("MOON_ORBITERS"), "moon", "moon.html"), tag(get("MOON_FLYBYS"), "moon", "moon.html"));
  const MARS = tag(get("MARS_SITES"), "mars", "mars.html").concat(tag(get("MARS_ORBITERS"), "mars", "mars.html"), tag(get("MARS_FLYBYS"), "mars", "mars.html"));
  const ALL = MOON.concat(MARS);
  if (!ALL.length) return;

  const YEAR = 365.2425 * 864e5;
  const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const MONTHS_UK = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];
  const fmtDate = iso => { const [y, m, d] = iso.split("-").map(Number); return UK ? `${d} ${MONTHS_UK[m - 1]} ${y}` : `${MONTHS_EN[m - 1]} ${d}, ${y}`; };
  const yw = n => { if (!UK) return n === 1 ? "year" : "years"; const a = n % 10, b = n % 100; return a === 1 && b !== 11 ? "рік" : a >= 2 && a <= 4 && (b < 12 || b > 14) ? "роки" : "років"; };
  const span = (a, b) => ((b ? new Date(b) : new Date()) - new Date(a)) / YEAR;
  const link = s => `<a href="${s.page}#${s.id}">${s.name}</a>`;
  const surface = s => !s.orbit && !s.flyby;

  const facts = [];

  // 1. Найдовше працює (досі)
  const activeOld = ALL.filter(s => s.status === "active" && !s.lastContact && s.arrived && !s.flyby).sort((a, b) => a.arrived.localeCompare(b.arrived))[0];
  if (activeOld) { const n = Math.floor(span(activeOld.arrived));
    facts.push({ ico: "⏳", k: L("Working the longest", "Найдовше працює"), big: `${n} ${yw(n)}`,
      t: L(`${link(activeOld)} has been in use since ${fmtDate(activeOld.arrived)} — and scientists still use it today.`, `${link(activeOld)} використовують від ${fmtDate(activeOld.arrived)} — і науковці працюють із ним досі.`) }); }

  // 2. Найдовша робота серед апаратів, які вже замовкли
  const silentLong = ALL.filter(s => s.lastContact && s.arrived && s.kind !== "impact" && !s.leftBehind && !s.returned && !s.lastContactApprox && !s.flyby)
    .sort((a, b) => span(b.arrived, b.lastContact) - span(a.arrived, a.lastContact))[0];
  if (silentLong) { const n = Math.round(span(silentLong.arrived, silentLong.lastContact) * 10) / 10;
    facts.push({ ico: "🏆", k: L("Longest mission that has ended", "Найдовша завершена місія"), big: `${String(n).replace(".", UK ? "," : ".")} ${UK ? "року" : "years"}`,
      t: L(`${link(silentLong)} worked from ${fmtDate(silentLong.arrived)} to ${fmtDate(silentLong.lastContact)}.`, `${link(silentLong)} працював від ${fmtDate(silentLong.arrived)} до ${fmtDate(silentLong.lastContact)}.`) }); }

  // 3. Найстаріший апарат, що досі працює біля Марса
  const marsOld = MARS.filter(s => s.status === "active" && !s.lastContact && s.arrived && !s.flyby).sort((a, b) => a.arrived.localeCompare(b.arrived))[0];
  if (marsOld) { const n = Math.floor(span(marsOld.arrived));
    facts.push({ ico: "🛰", k: L("Veteran of Mars", "Ветеран Марса"), big: `${n} ${yw(n)}`,
      t: L(`${link(marsOld)} has been ${marsOld.orbit ? "orbiting" : "working on"} Mars since ${fmtDate(marsOld.arrived)} — the longest of all spacecraft still working there.`, `${link(marsOld)} ${marsOld.orbit ? "кружляє навколо Марса" : "працює на Марсі"} від ${fmtDate(marsOld.arrived)} — найдовше з усіх апаратів, що досі там працюють.`) }); }

  // 4. Хто першим досягнув поверхні Марса
  const marsFirst = MARS.filter(s => surface(s) && s.kind !== "impact" && s.arrived && s.status !== "lost").sort((a, b) => a.arrived.localeCompare(b.arrived))[0];
  if (marsFirst) facts.push({ ico: "🔴", k: L("First on the surface of Mars", "Перші на поверхні Марса"), big: "1971",
    t: L(`The first to reach the surface were the Soviet Mars 2 (it crashed) and Mars 3 (it landed, but went silent after seconds), both in 1971. The first fully successful landing was ${link(marsFirst)} on ${fmtDate(marsFirst.arrived)}.`,
         `Першими поверхні досягли радянські «Марс-2» (розбився) і «Марс-3» (сів, але замовк за кілька секунд) — обидва у 1971 році. Першу повністю успішну посадку здійснив ${link(marsFirst)} ${fmtDate(marsFirst.arrived)}.`) });

  // 5. Найперший апарат на Місяці на нашій карті
  const moonFirst = MOON.filter(s => surface(s) && s.arrived).sort((a, b) => a.arrived.localeCompare(b.arrived))[0];
  if (moonFirst) facts.push({ ico: "🌕", k: L("Oldest object on our Moon map", "Найстаріший об'єкт на нашій карті Місяця"), big: moonFirst.arrived.slice(0, 4),
    t: L(`${link(moonFirst)} reached the Moon on ${fmtDate(moonFirst.arrived)}. The very first spacecraft to reach the Moon was the Soviet Luna 2 in 1959.`,
         `${link(moonFirst)} досягнув Місяця ${fmtDate(moonFirst.arrived)}. А найпершим апаратом на Місяці взагалі був радянський «Луна-2» у 1959 році.`) });

  // 6. Хто досі передає дані
  const alive = ALL.filter(s => s.status === "active" && !s.lastContact);
  const radio = alive.filter(s => s.id !== "apollo11");
  facts.push({ ico: "📡", k: L("Still sending data", "Досі передають дані"), big: String(radio.length),
    t: L("Spacecraft on our maps that are still in contact with Earth:", "Апарати з наших карт, які досі на зв'язку із Землею:") +
       `<span class="ff-chips">${radio.map(s => `<a class="ff-chip" href="${s.page}#${s.id}"><i></i>${s.name}</a>`).join("")}</span>` +
       (alive.length > radio.length ? `<span class="ff-note">${L("Plus the Apollo 11 laser reflector: it has no radio, but observatories still bounce lasers off it.", "Плюс лазерний відбивач Apollo 11: радіо в нього немає, але обсерваторії досі відбивають від нього лазер.")}</span>` : "") });

  box.innerHTML = facts.map(f => `<div class="ff">
      <div class="ff-top"><span class="ff-ico">${f.ico}</span><span class="ff-k">${f.k}</span></div>
      <div class="ff-big">${f.big}</div>
      <p>${f.t}</p></div>`).join("");

  const total = document.getElementById("funFactsTotal");
  if (total) total.innerHTML = L(`<b>${ALL.length}</b> spacecraft on our maps: <b>${MOON.length}</b> at the Moon and <b>${MARS.length}</b> at Mars. <b>${alive.length}</b> of them are still working.`,
    `<b>${ALL.length}</b> апаратів на наших картах: <b>${MOON.length}</b> біля Місяця і <b>${MARS.length}</b> біля Марса. З них <b>${alive.length}</b> досі працюють.`);
})();
