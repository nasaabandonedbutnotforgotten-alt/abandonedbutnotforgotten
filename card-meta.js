/* =====================================================
   КОРОТКІ ДАНІ ДЛЯ КАРТКИ АПАРАТА
   Рік запуску, агентство й назва місії беруться
   з таблиці «Mission» кожного апарата (англійською),
   тому файл треба підключати ПЕРЕД data-uk.js.
   ===================================================== */
(function () {
  // Де в таблиці немає агентства після коми — вписуємо вручну
  const AGENCY_FIX = {
    apollo8: "NASA", apollo10: "NASA", apollo13: "NASA", explorer49: "NASA",
    artemis1: "NASA / ESA", artemis2: "NASA / CSA / ESA", clementine: "BMDO / NASA"
  };

  // розбити рядок за комами, що не в дужках
  function splitTop(v) {
    const out = []; let depth = 0, cur = "";
    for (let i = 0; i < v.length; i++) {
      const c = v[i];
      if (c === "(") depth++;
      if (c === ")") depth--;
      if (c === "," && depth === 0) { out.push(cur.trim()); cur = ""; continue; }
      cur += c;
    }
    out.push(cur.trim());
    return out;
  }
  const cleanAgency = a => a
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/ for /g, " / ")
    .replace(/ SIMPLEx program/i, " (SIMPLEx)")
    .replace(/ program$/i, "")
    .trim();

  function meta(s, moon) {
    const rows = s.mission || [];
    const row = k => rows.find(r => k.test(r[0]));
    const m = row(/^Mission$/);
    if (m) {
      const parts = splitTop(m[1]);
      s.missionName = parts[0].replace(/\s*\((?:[A-Z][a-z]+ ){1,}[^)]*,[^)]*\)/, "").replace(/\s*\([a-z][^)]*\)/g, "").trim();
      if (parts.length > 1) s.agency = cleanAgency(parts.slice(1).join(", "));
    }
    if (!s.missionName) s.missionName = s.name.replace(/\s*\(.*\)$/, "");
    if (AGENCY_FIX[s.id]) s.agency = AGENCY_FIX[s.id];
    if (!s.agency) s.agency = "NASA";
    const l = row(/^Launch/);
    const y = l && l[1].match(/\b(19|20)\d\d\b/);
    if (y) s.launchYear = +y[0];
    else if (s.flyby && s.arrivedLabel === "Launch" && s.arrived) s.launchYear = +s.arrived.slice(0, 4);
    // До Місяця летіли кілька днів — для апаратів без рядка «Launch» рік запуску = рік прибуття
    // (перевірено: Apollo 8–17, Surveyor 3, Explorer 35 і 49, Clementine, CAPSTONE, Artemis I, Blue Ghost 1, IM-2)
    else if (moon && s.arrived) s.launchYear = +s.arrived.slice(0, 4);
  }

  ["MOON_SITES", "MOON_ORBITERS", "MOON_FLYBYS", "MARS_SITES", "MARS_ORBITERS", "MARS_FLYBYS"].forEach(name => {
    let arr; try { arr = eval(name); } catch (e) { return; }
    if (Array.isArray(arr)) arr.forEach(s => meta(s, name.startsWith("MOON")));
  });
})();
