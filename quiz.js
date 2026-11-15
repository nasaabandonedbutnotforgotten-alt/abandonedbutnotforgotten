/* =====================================================
   ВІКТОРИНА: запитання складаються автоматично
   з даних апаратів (mars-*.js, moon-*.js).
   Три рівні складності, пояснення до кожної відповіді
   і підсумок з розбором наприкінці.
   ===================================================== */
(function () {
  const T = window.t || (x => x);
  const UK = typeof LANG !== "undefined" && LANG === "uk";
  const L = (en, uk) => UK ? uk : en;
  const tag = (list, world, page) => (list || []).map(s => Object.assign({}, s, { world, page }));
  const ALL = tag(MARS_SITES, "Mars", "mars.html").concat(tag(MARS_ORBITERS, "Mars", "mars.html"),
              tag(MOON_SITES, "the Moon", "moon.html"), tag(MOON_ORBITERS, "the Moon", "moon.html"));
  const Y = d => +d.slice(0, 4);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);
  const one = a => a[Math.floor(Math.random() * a.length)];
  const DAY = 864e5, YEAR = 365.2425 * DAY;

  const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const MONTHS_UK = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];
  const fmtDate = iso => { const [y, m, d] = iso.split("-").map(Number); return UK ? `${d} ${MONTHS_UK[m - 1]} ${y}` : `${MONTHS_EN[m - 1]} ${d}, ${y}`; };
  const yearsWord = n => { if (!UK) return n === 1 ? "year" : "years"; const a = n % 10, b = n % 100; return a === 1 && b !== 11 ? "рік" : a >= 2 && a <= 4 && (b < 12 || b > 14) ? "роки" : "років"; };
  const worldGen = s => s.world === "Mars" ? L("Mars", "Марса") : L("the Moon", "Місяця");
  const worldLoc = s => s.world === "Mars" ? L("on Mars", "на Марсі") : L("on the Moon", "на Місяці");
  const arrivedVerb = s => s.orbit ? L("arrived in orbit around", "вийшов на орбіту") : s.kind === "impact" ? L("crashed into", "впав на поверхню") : L("reached the surface of", "опинився на поверхні");
  const worked = s => s.lastContact && s.arrived ? (new Date(s.lastContact) - new Date(s.arrived)) / YEAR : null;

  /* ---------- Генератори запитань ----------
     Кожен повертає {q, opts, answer, item, why}
     why — пояснення, чому відповідь правильна (з даних сайту) */
  const G = {
    where: (n) => { const s = one(ALL);
      return { q: L(`Where is <b>${s.name}</b>?`, `Де знаходиться <b>${s.name}</b>?`), opts: [L("On the Moon", "На Місяці"), L("On Mars", "На Марсі")],
        answer: s.world === "Mars" ? L("On Mars", "На Марсі") : L("On the Moon", "На Місяці"), item: s,
        why: `${s.name} — ${worldLoc(s)}: ${s.where}` }; },

    working: (n) => { const s = one(ALL.filter(x => !x.lastContact && x.status === "active"));
      const wrong = pick(ALL.filter(x => x.lastContact && x.kind !== "impact"), n - 1);
      return { q: L("Which of these is <b>still working</b>?", "Який із цих апаратів <b>досі працює</b>?"), opts: shuffle([s, ...wrong].map(x => x.name)), answer: s.name, item: s,
        why: L(`${s.name} is still in use (${s.statusText}). The others have been silent for years.`, `${s.name} досі працює (${s.statusText}). Інші апарати вже давно мовчать.`) }; },

    tagline: (n) => { const s = one(ALL); const wrong = pick(ALL.filter(x => x.name !== s.name && x.world === s.world), n - 1);
      return { q: L(`“${s.tagline}” — which spacecraft is this?`, `«${s.tagline}» — що це за апарат?`), opts: shuffle([s, ...wrong].map(x => x.name)), answer: s.name, item: s,
        why: L(`This is how our map describes ${s.name} (${s.type}).`, `Так наша карта описує ${s.name} (${s.type}).`) }; },

    silentYear: (n) => { const pool = ALL.filter(s => s.lastContact && s.kind !== "impact" && !s.leftBehind && !s.returned && !s.lastContactApprox);
      const s = one(pool); const y = Y(s.lastContact);
      const wrong = pick(ALL.filter(x => x.name !== s.name && (!x.lastContact || Y(x.lastContact) !== y)), n - 1);
      return { q: L(`Which spacecraft went silent in <b>${y}</b>?`, `Який апарат замовк у <b>${y}</b> році?`), opts: shuffle([s, ...wrong].map(x => x.name)), answer: s.name, item: s,
        why: L(`The last contact with ${s.name} was on ${fmtDate(s.lastContact)}.`, `Останній зв'язок із ${s.name} був ${fmtDate(s.lastContact)}.`) }; },

    arrivalYear: (n, spread) => { const s = one(ALL.filter(x => x.arrived && !x.flyby)); const y = Y(s.arrived);
      const ys = new Set([y]); let g = 0;
      while (ys.size < n && g++ < 200) { const d = y + (Math.floor(Math.random() * (2 * spread + 1)) - spread); if (d !== y && d > 1957 && d <= 2026) ys.add(d); }
      return { q: L(`In which year did <b>${s.name}</b> ${arrivedVerb(s)} ${s.world}?`, `У якому році <b>${s.name}</b> ${arrivedVerb(s)} ${worldGen(s)}?`),
        opts: [...ys].sort((a, b) => a - b).map(String), answer: String(y), item: s,
        why: L(`${s.name} ${arrivedVerb(s)} ${s.world} on ${fmtDate(s.arrived)}.`, `${s.name} ${arrivedVerb(s)} ${worldGen(s)} ${fmtDate(s.arrived)}.`) }; },

    fact: (n) => { const s = one(ALL.filter(x => x.facts && x.facts.length)); const wrong = pick(ALL.filter(x => x.name !== s.name), n - 1);
      const f = s.facts[0];
      return { q: L("Which spacecraft is this fact about?", "Про який апарат цей факт?") + `<br><span class="q-sub">${f.split(s.name).join("___")}</span>`, opts: shuffle([s, ...wrong].map(x => x.name)), answer: s.name, item: s,
        why: L(`It is one of the fun facts about ${s.name}.`, `Це один із цікавих фактів про ${s.name}.`) }; },

    first: (n) => { const pool = ALL.filter(x => x.arrived && !x.flyby);
      let set, g = 0;
      do { set = pick(pool, n); g++; } while (g < 50 && new Set(set.map(x => Y(x.arrived))).size < n);
      const s = set.slice().sort((a, b) => a.arrived.localeCompare(b.arrived))[0];
      return { q: L("Which of these reached its destination <b>first</b>?", "Який із цих апаратів <b>першим</b> дістався своєї цілі?"), opts: shuffle(set.map(x => x.name)), answer: s.name, item: s,
        why: set.slice().sort((a, b) => a.arrived.localeCompare(b.arrived)).map(x => `${x.name} — ${Y(x.arrived)}`).join(" · ") }; },

    duration: (n) => { const pool = ALL.filter(x => worked(x) >= 2 && !x.lastContactApprox);
      const s = one(pool); const yrs = Math.round(worked(s));
      const vs = new Set([yrs]); let g = 0;
      while (vs.size < n && g++ < 200) { const d = yrs + (Math.floor(Math.random() * 9) - 4); if (d >= 1 && d !== yrs) vs.add(d); }
      const fmt = v => `≈ ${v} ${yearsWord(v)}`;
      return { q: L(`How long did <b>${s.name}</b> keep working after it arrived?`, `Скільки часу <b>${s.name}</b> працював після прибуття?`), opts: [...vs].sort((a, b) => a - b).map(fmt), answer: fmt(yrs), item: s,
        why: L(`From ${fmtDate(s.arrived)} to ${fmtDate(s.lastContact)} — about ${yrs} ${yearsWord(yrs)}.`, `Від ${fmtDate(s.arrived)} до ${fmtDate(s.lastContact)} — приблизно ${yrs} ${yearsWord(yrs)}.`) }; },

    launchYear: (n) => { const s = one(ALL.filter(x => x.launchYear && x.arrived && Y(x.arrived) !== x.launchYear));
      const y = s.launchYear; const ys = new Set([y]); let g = 0;
      while (ys.size < n && g++ < 200) { const d = y + (Math.floor(Math.random() * 7) - 3); if (d !== y && d > 1957 && d <= 2026) ys.add(d); }
      return { q: L(`<b>${s.name}</b> arrived in ${Y(s.arrived)}. In which year was it <b>launched</b> from Earth?`, `<b>${s.name}</b> прибув у ${Y(s.arrived)} році. У якому році його <b>запустили</b> із Землі?`),
        opts: [...ys].sort((a, b) => a - b).map(String), answer: String(y), item: s,
        why: L(`It was launched in ${y}: the flight to ${s.world} took months.`, `Його запустили в ${y} році: політ до ${worldGen(s)} тривав кілька місяців.`) }; }
  };

  const LEVELS = {
    easy:   { n: 8,  opts: 3, gens: [["where"], ["working"], ["tagline"], ["arrivalYear", 10]],
              title: L("Easy", "Легкий"), desc: L("8 questions · 3 answer options. Where is it? Is it still working?", "8 запитань · 3 варіанти відповіді. Де апарат? Чи він досі працює?"), ico: "🌱" },
    medium: { n: 10, opts: 4, gens: [["where"], ["silentYear"], ["working"], ["arrivalYear", 6], ["tagline"], ["fact"]],
              title: L("Medium", "Середній"), desc: L("10 questions · 4 options. Dates, descriptions and fun facts.", "10 запитань · 4 варіанти. Дати, описи й цікаві факти."), ico: "🚀" },
    hard:   { n: 12, opts: 4, gens: [["arrivalYear", 2], ["silentYear"], ["fact"], ["first"], ["duration"], ["launchYear"]],
              title: L("Hard", "Складний"), desc: L("12 questions · close dates. For real mission experts.", "12 запитань · близькі дати. Для справжніх експертів місій."), ico: "🪐" }
  };

  const card = document.getElementById("qcard");
  let qs = [], i = 0, score = 0, level = "medium", log = [];
  const best = lv => { try { return +localStorage.getItem("quiz-best-" + lv) || 0; } catch (e) { return 0; } };
  const saveBest = (lv, v) => { try { if (v > best(lv)) localStorage.setItem("quiz-best-" + lv, v); } catch (e) {} };

  function menu() {
    card.innerHTML = `<p class="q-pick">${L("Choose a level:", "Обери рівень складності:")}</p>
      <div class="levels">${Object.entries(LEVELS).map(([k, v]) => `
        <button class="level" data-lv="${k}">
          <span class="lv-ico">${v.ico}</span>
          <span class="lv-t">${v.title}</span>
          <span class="lv-d">${v.desc}</span>
          ${best(k) ? `<span class="lv-best">${L("Your best", "Твій рекорд")}: ${best(k)} / ${v.n}</span>` : ""}
        </button>`).join("")}</div>`;
    card.querySelectorAll(".level").forEach(b => b.onclick = () => start(b.dataset.lv));
  }

  function start(lv) {
    level = lv; const cfg = LEVELS[lv];
    qs = []; i = 0; score = 0; log = [];
    const used = new Set();
    let guard = 0;
    while (qs.length < cfg.n && guard++ < 400) {
      const [name, arg] = cfg.gens[qs.length % cfg.gens.length];
      let q; try { q = G[name](cfg.opts, arg); } catch (e) { continue; }
      if (!q || !q.item || q.opts.length < 2) continue;
      const key = q.item.id + name;
      if (used.has(key) || used.has(q.item.id + "*") && guard < 200) continue;
      used.add(key); used.add(q.item.id + "*");
      qs.push(q);
    }
    qs = shuffle(qs);
    show();
  }

  function show() {
    const q = qs[i];
    card.innerHTML = `
      <div class="q-top"><span>${LEVELS[level].ico} ${LEVELS[level].title} · ${T("Question")} ${i + 1} / ${qs.length}</span><span>★ ${score}</span></div>
      <div class="q-bar"><i style="width:${i / qs.length * 100}%"></i></div>
      <div class="q-text">${q.q}</div>
      <div class="q-opts">${q.opts.map(o => `<button>${o}</button>`).join("")}</div>
      <div class="q-feedback"></div>`;
    card.querySelectorAll(".q-opts button").forEach(b => b.onclick = () => answer(b, q));
  }

  function answer(btn, q) {
    const ok = btn.textContent === q.answer;
    if (ok) score++;
    log.push({ q, picked: btn.textContent, ok });
    card.querySelectorAll(".q-opts button").forEach(b => {
      b.disabled = true;
      if (b.textContent === q.answer) b.classList.add("right");
      else if (b === btn) b.classList.add("wrong");
    });
    const s = q.item;
    card.querySelector(".q-feedback").innerHTML =
      `<div class="q-verdict ${ok ? "ok" : "no"}">${ok ? "✓ " + T("Correct!") : "✗ " + T("Not quite.") + ` ${T("The answer is")} <b>${q.answer}</b>.`}</div>` +
      `<div class="q-why"><span class="q-why-l">${L("Why", "Чому")}</span>${q.why}</div>` +
      `<p class="q-more">${s.name}: ${s.tagline} <a href="${s.page}#${s.id}">${T("Read its story ↗")}</a></p>` +
      `<div class="q-next"><button class="btn">${i + 1 < qs.length ? T("Next question →") : T("See my score")}</button></div>`;
    card.querySelector(".q-next .btn").onclick = () => { i++; i < qs.length ? show() : finish(); };
    card.querySelector(".q-next .btn").focus({ preventScroll: true });
  }

  function finish() {
    const n = qs.length, pct = Math.round(score / n * 100);
    const prevBest = best(level); saveBest(level, score);
    const msg = pct >= 90 ? L("Mission control would hire you!", "Центр управління польотами взяв би тебе на роботу!")
      : pct >= 60 ? L("Great job, explorer!", "Чудово, досліднику!")
      : pct >= 30 ? L("Good start — explore the maps and try again!", "Гарний початок — досліди карти й спробуй ще!")
      : L("Time to explore the Moon and Mars maps!", "Саме час дослідити карти Місяця й Марса!");
    const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0;
    const next = level === "easy" && pct >= 60 ? "medium" : level === "medium" && pct >= 60 ? "hard" : null;
    card.innerHTML = `<div class="score">
      <span class="label">${T("Your score")} · ${LEVELS[level].title}</span>
      <div class="big">${score} / ${n}</div>
      <div class="stars" aria-label="${stars} / 3">${"★".repeat(stars)}<span>${"★".repeat(3 - stars)}</span></div>
      <p class="intro">${msg} <b>${pct}%</b>${score > prevBest && prevBest ? ` · ${L("New record!", "Новий рекорд!")}` : ""}</p>
      <div class="score-btns">
        ${next ? `<button class="btn" data-lv="${next}">${L("Try the next level", "Спробувати наступний рівень")}: ${LEVELS[next].title} →</button>` : ""}
        <button class="btn ${next ? "outline" : ""}" data-lv="${level}">${T("Try again")}</button>
        <button class="btn outline" data-menu>${L("Choose another level", "Інший рівень")}</button>
      </div></div>
      <h3 class="review-h">${L("Your answers", "Розбір відповідей")}</h3>
      <ol class="review">${log.map(r => `<li class="${r.ok ? "ok" : "no"}">
        <span class="rv-m">${r.ok ? "✓" : "✗"}</span>
        <div><div class="rv-q">${r.q.q.replace(/<br>.*$/, "")}</div>
        <div class="rv-a">${r.ok ? `<b>${r.q.answer}</b>` : `${L("You answered", "Твоя відповідь")}: <s>${r.picked}</s> · ${L("Correct", "Правильно")}: <b>${r.q.answer}</b>`}</div>
        <div class="rv-why">${r.q.why}</div></div></li>`).join("")}</ol>`;
    card.querySelectorAll("[data-lv]").forEach(b => b.onclick = () => { start(b.dataset.lv); card.scrollIntoView({ behavior: "smooth", block: "start" }); });
    card.querySelector("[data-menu]").onclick = menu;
  }

  menu();
})();
