/* =====================================================
   ДОКУМЕНТ «Апарати NASA біля Місяця: 29 місій»
   Нове: Ranger 3, 4, 5, 6 (+ доповнення Ranger 7) і фото для Apollo 13/14/16/17, Explorer 49, Clementine.
   Підключати ПІСЛЯ moon-lo.js.
   ===================================================== */

const RANGER_B2 = {
  model: "models/ranger-block2.html", status: "silent",
  structure: ["Hexagonal base with electronics and batteries.", "Tower with instruments and a TV camera.", "Landing capsule with a seismometer on top.", "Omni antenna on the capsule, high-gain antenna under the base.", "Two solar panels.", "Mass about 330 kg."],
  builtBy: "NASA’s Jet Propulsion Laboratory (JPL). Rocket: Atlas-Agena B."
};
const RANGER_B3 = {
  model: "models/ranger-block3.html", status: "silent",
  photo: "images/moon/ranger6.jpg", photoCaption: "A Block 3 Ranger spacecraft (Ranger 6/7 type). Photo: NASA/JPL",
  schema: "images/moon/ranger6-schema.jpg",
  builtBy: "NASA’s Jet Propulsion Laboratory (JPL). Rocket: Atlas-Agena B."
};
const RANGER_SRC = ["NASA — Lunar Rangers and Surveyors", "https://science.nasa.gov/mission/lunar-rangers-and-surveyors"];
const RANGER_NSSDC = ["NASA NSSDCA — Ranger", "https://nssdc.gsfc.nasa.gov/planetary/lunar/ranger.html"];

MOON_SITES.push(
  Object.assign({}, RANGER_B2, {
    id: "ranger4", name: "Ranger 4", type: "Impact site", kind: "impact",
    lat: -15.5, lon: -130.7, coordsText: "≈15.5° S, 130.7° W (estimated, far side)",
    photo: "images/moon/ranger4.jpg", photoCaption: "A Block 2 Ranger spacecraft (Ranger 3–5 type). Photo: NASA/JPL",
    schema: "images/moon/ranger4-schema.jpg",
    statusText: "Crashed in 1962",
    tagline: "The first American spacecraft to reach another world — but it flew blind.",
    where: "Debris on the far side of the Moon. The estimated impact point is less precise than for Ranger 6 and 7.",
    mission: [["Mission", "Ranger 4 (Block 2), NASA / JPL"], ["Launch", "April 23, 1962"], ["Impact", "April 26, 1962"]],
    purpose: "To send pictures during the descent and make a “hard landing” with a seismometer capsule.",
    history: "The Atlas-Agena B launch went perfectly. But the power to the central on-board computer failed, so the probe could not send any pictures or data.",
    endedTitle: "What happened",
    ended: "It flew “blind”, with no course corrections, and on April 26, 1962, it crashed on the far side of the Moon.",
    now: "Debris on the far side. It sent no pictures or science data.",
    working: "No. The mission ended with an impact and no data returned.",
    facts: ["Ranger 4 was the first American spacecraft to reach another celestial body — and the first to hit the far side of the Moon."],
    sources: [["NASA — Ranger 4", "https://science.nasa.gov/mission/lunar-rangers-and-surveyors/ranger-4/"], ["NASA NSSDCA — lunar impact sites", "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_artifact_impacts.html"]],
    arrived: "1962-04-26", lastContact: "1962-04-26", eventText: "hits the far side — the first US craft to reach another world"
  }),
  Object.assign({}, RANGER_B3, {
    id: "ranger6", name: "Ranger 6", type: "Impact site", kind: "impact",
    lat: 9.3864, lon: 21.4806, coordsText: "9.39° N, 21.48° E (LROC)",
    statusText: "Crashed in 1964",
    tagline: "It hit the Moon right on time — but its cameras never switched on.",
    where: "Crash site in the Sea of Tranquility; LRO found and measured its crater.",
    mission: [["Mission", "Ranger 6 (Block 3), NASA / JPL"], ["Launch", "January 30, 1964"], ["Impact", "February 2, 1964, 09:24:32 UT"]],
    purpose: "To hit the Moon and send high-resolution pictures from the last minutes of the fall, to help plan the Apollo landings.",
    history: "The flight had no errors, and the probe hit the Moon exactly on schedule.",
    endedTitle: "What happened",
    ended: "A short circuit had knocked out the TV system, so not a single picture was sent.",
    now: "Debris on the surface; LRO found and measured the impact crater.",
    working: "No. It was an impactor, meant to work only until it hit.",
    structure: ["Hexagonal base with electronics and power.", "Tower with the TV camera unit.", "Omni antenna on top, high-gain antenna under the base.", "Two solar panels (about 200 W).", "Mass about 360 kg."],
    facts: ["Ranger 6 crashed in the same sea where Apollo 11 later landed — but with its cameras dead, the flight produced no pictures."],
    sources: [RANGER_SRC, RANGER_NSSDC, ["LROC — coordinates of robotic spacecraft", "https://www.lroc.asu.edu/data/support/downloads/2016_LROC_Coordinates_of_Robotic_Spacecraft.pdf"]],
    arrived: "1964-02-02", lastContact: "1964-02-02", eventText: "hits the Sea of Tranquility — but sends no pictures"
  })
);

MOON_FLYBYS.push(
  Object.assign({}, RANGER_B2, {
    id: "ranger3", name: "Ranger 3", type: "Lunar probe (missed the Moon)", flyby: true,
    photo: "images/moon/ranger3.jpg", photoCaption: "Ranger 3 spacecraft. Photo: NASA/JPL",
    schema: "images/moon/ranger3-schema.jpg",
    flybyKm: 37000, flybyDate: "January 1962",
    orbitText: "Orbiting the Sun",
    statusText: "Lost in 1962",
    tagline: "The first Block 2 Ranger — it flew right past the Moon.",
    where: "In space, in orbit around the Sun.",
    mission: [["Mission", "Ranger 3 (Block 2), NASA / JPL"], ["Launch", "January 26, 1962, Atlas-Agena B, Cape Canaveral"], ["Missed by", "About 37,000 km"]],
    purpose: "To photograph the Moon’s surface on approach and drop a capsule with a seismometer. Rangers 3, 4 and 5 carried a TV camera and a seismometer.",
    history: "An error in the rocket’s guidance system made the probe go too fast, and it flew past the Moon at about 37,000 km.",
    endedTitle: "What happened",
    ended: "The trajectory could not be corrected, and the probe went into orbit around the Sun.",
    now: "In orbit around the Sun; there is no contact with it.",
    working: "No. A rocket guidance error gave it too much speed, and it missed the Moon.",
    facts: ["Ranger 3 was the first of the Block 2 series, which added a landing capsule with a seismometer."],
    sources: [RANGER_SRC, RANGER_NSSDC, ["Smithsonian — Hitting the Moon", "https://timeandnavigation.si.edu/navigating-space/reaching-for-the-moon/hitting-the-moon"]],
    arrived: "1962-01-28", lastContact: "1962-01-28", arrivedLabel: "Missed the Moon",
    eventText: "misses the Moon by 37,000 km"
  }),
  Object.assign({}, RANGER_B2, {
    id: "ranger5", name: "Ranger 5", type: "Lunar probe (missed the Moon)", flyby: true,
    photo: "images/moon/ranger4.jpg", photoCaption: "A Block 2 Ranger spacecraft (Ranger 3–5 type). Photo: NASA/JPL",
    schema: "images/moon/ranger4-schema.jpg",
    flybyKm: 725, flybyDate: "October 1962",
    orbitText: "Orbiting the Sun",
    statusText: "Lost in 1962",
    tagline: "It was meant to hit the Moon — but missed by 725 km.",
    where: "In space, in orbit around the Sun (like Ranger 3).",
    mission: [["Mission", "Ranger 5 (Block 2), NASA / JPL"], ["Launch", "October 18, 1962, Atlas-Agena B"], ["Missed by", "725 km"]],
    purpose: "To hit the Moon, photograph the surface during the descent and drop a capsule with a seismometer.",
    history: "A failure of the on-board power system cut off contact and control, turning the impactor into a flyby probe.",
    endedTitle: "What happened",
    ended: "It missed the Moon by 725 km and went into orbit around the Sun.",
    now: "In orbit around the Sun; it sends no signals.",
    working: "No. The power system failed, and contact and control were lost.",
    facts: ["It was the last Block 2 failure with a capsule. After it, JPL dropped the seismometer capsule, and the next Rangers (Block 3) were pure camera ships."],
    sources: [RANGER_NSSDC, ["NASA — Facts: Rangers and Surveyors to the Moon", "https://science.nasa.gov/resource/nasa-facts-rangers-and-surveyors-to-the-moon"]],
    arrived: "1962-10-21", lastContact: "1962-10-21", arrivedLabel: "Missed the Moon",
    eventText: "loses power and misses the Moon by 725 km"
  })
);


/* ---------- Доповнення: Ranger 7 і фото з документа ---------- */
const DOC29 = {
  ranger7: Object.assign({}, RANGER_B3, {
    photoCaption: "A Block 3 Ranger spacecraft (Ranger 7 type). Photo: NASA/JPL",
    structure: ["Hexagonal base with electronics and power.", "Tower with six TV cameras.", "Two antennas: omnidirectional and high-gain.", "Two solar panels (about 200 W).", "Mass 361.8 kg."],
    facts: ["It was the first fully successful Ranger after six failures in a row: in the last 17 minutes it sent back 4,316 pictures.", "Its pictures showed that even the “smooth” seas are covered with small craters.", "The last frames, taken a second before impact, had a resolution of about 0.5 m.", "Its crater was photographed by Apollo 16 and by LRO."]
  }),
  apollo13: { photo: "images/moon/apollo13.jpg", photoCaption: "Apollo 13 command module “Odyssey” being lifted aboard USS Iwo Jima after splashdown, April 17, 1970. Photo: NASA" },
  apollo14: { photo: "images/moon/apollo14.jpg", photoCaption: "The Apollo 14 lunar module “Antares” at Fra Mauro. Photo: NASA" },
  apollo16: { photo: "images/moon/apollo16.jpg", photoCaption: "John Young’s jump salute at the Apollo 16 site. Photo: NASA" },
  apollo17: { photo: "images/moon/apollo17.jpg", photoCaption: "The Apollo 17 lunar module “Challenger” and the rover. Photo: NASA" },
  explorer49: { photo: "images/moon/explorer49.jpg", photoCaption: "Explorer 49 (RAE-B) before launch. Photo: NASA" },
  clementine: { photo: "images/moon/clementine-doc.jpg", photoCaption: "Clementine spacecraft. Photo: NASA/NRL" }
};
MOON_SITES.concat(MOON_ORBITERS, MOON_FLYBYS).forEach(s => {
  const a = DOC29[s.id]; if (!a) return;
  ["model", "photo", "photoCaption", "schema", "structure"].forEach(k => { if (a[k]) s[k] = a[k]; });
  if (a.facts) s.facts = (s.facts || []).concat(a.facts.filter(f => !(s.facts || []).includes(f)));
});
