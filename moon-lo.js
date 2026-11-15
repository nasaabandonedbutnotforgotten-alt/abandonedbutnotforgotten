/* =====================================================
   ДОКУМЕНТ «Апарати Lunar Orbiter і Surveyor» (1966–1968)
   3D-моделі Lunar Orbiter і Lunar Flashlight — від команди.
   Підключати ПІСЛЯ moon-doc.js.
   ===================================================== */

const LO_COMMON = {
  model: "models/lunar-orbiter.html",
  photo: "images/moon/lunarorbiter.jpg", photoCaption: "Lunar Orbiter above the Moon (illustration). Image: NASA",
  schema: "images/moon/lunarorbiter-schema.jpg",
  status: "silent",
  structure: [
    "Truncated-cone body 1.65 m tall with a 1.5 m base, built from three decks on trusses.",
    "Mass in orbit about 386 kg.",
    "Four solar panels (about 375 W) and a battery.",
    "Eastman Kodak photo system: two cameras (wide-angle and telephoto) shot 70 mm film that was developed on board, scanned with a light beam and radioed to Earth.",
    "Micrometeoroid detectors and radiation dosimeters.",
    "Main engine for orbit insertion and maneuvers, a high-gain antenna and a low-gain antenna."
  ],
  builtBy: "Designed and built by Boeing; photo system by Eastman Kodak. The program was managed by NASA’s Langley Research Center. All five spacecraft together cost about $163 million.",
  modelBy: "team"
};
const LO_SRC = ["NASA — Lunar Orbiter program", "https://www.nasa.gov/?p=277024"];
const IMPACTS = ["NSSDCA — Table of Anthropogenic Impacts on the Moon", "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_artifact_impacts.html"];
const LO = (n, o) => Object.assign({}, LO_COMMON, o, {
  name: "Lunar Orbiter " + n,
  mission: [["Mission", "Lunar Orbiter " + n + ", NASA Langley"]].concat(o.mission),
  sources: o.sources.concat([["NASA Science — Lunar Orbiter " + n, "https://science.nasa.gov/mission/lunar-orbiter-" + n]])
});

MOON_SITES.push(
  LO(1, {
    id: "lunarorbiter1", type: "Impact site (orbiter)", kind: "impact",
    lat: 6.35, lon: 160.72, coordsText: "6.35° N, 160.72° E (far side)",
    statusText: "Crashed on purpose, 1966",
    tagline: "The first American spacecraft to orbit the Moon — and the first to photograph Earth from there.",
    where: "Its debris lies on the far side of the Moon.",
    mission: [["Launch", "August 10, 1966"], ["Photos", "205 frames, about 5 million km²"], ["Impact", "October 29, 1966"]],
    purpose: "To photograph flat areas of the surface and help choose safe landing sites for Surveyor and Apollo. It also collected data on the Moon’s gravity, radiation and micrometeoroids.",
    history: "In a few weeks of photography it took 205 frames covering about 5 million km² of the surface.",
    endedTitle: "Why it stayed there",
    ended: "It was never meant to return. On October 29, 1966, on its 577th orbit, with its systems wearing out and its fuel almost gone, controllers crashed it on purpose on the far side so it would not interfere with Lunar Orbiter 2.",
    now: "Not working. In 2008 the Lunar Orbiter Image Recovery Project recovered its original tapes and released the pictures in much better quality.",
    working: "No. Contact ended with the planned impact on October 29, 1966.",
    facts: ["On August 23, 1966, it took an unplanned photo of Earth rising over the Moon’s horizon — the first picture of Earth from lunar orbit."],
    sources: [["NASA — Lunar Orbiter 1", "https://www.nasa.gov/mission/lunar-orbiter-1"], ["NASA — 55 Years Ago: Lunar Orbiter 1 Launches", "https://www.nasa.gov/feature/55-years-ago-lunar-orbiter-1-launches-to-survey-the-moon"], IMPACTS],
    arrived: "1966-10-29", lastContact: "1966-10-29", eventText: "is crashed on the far side after photographing landing sites"
  }),
  LO(2, {
    id: "lunarorbiter2", type: "Impact site (orbiter)", kind: "impact",
    lat: 3.0, lon: 119.1, coordsText: "3.0° N, 119.1° E (far side)",
    statusText: "Crashed on purpose, 1967",
    tagline: "It took the “picture of the century” — Copernicus crater.",
    where: "Its debris lies on the far side of the Moon.",
    mission: [["Launch", "November 6, 1966"], ["Photography", "November 18–25, 1966"], ["Impact", "October 11, 1967"]],
    purpose: "To keep photographing possible Apollo and Surveyor landing sites, mostly in the equatorial zone of the near side, and to measure gravity, radiation and micrometeoroids.",
    history: "After its photography it was used for almost a year to track its orbit.",
    endedTitle: "Why it stayed there",
    ended: "It was never meant to return. On October 11, 1967, it was crashed into the Moon on purpose.",
    now: "Not working. In 2011 the LRO camera photographed a fresh crater with “wings” of ejecta at the calculated impact point — probably Lunar Orbiter 2, though not certain.",
    working: "No. It was crashed on purpose on October 11, 1967.",
    facts: ["Its oblique view of Copernicus crater was called the “picture of the century”: for the first time the Moon looked like a mountain landscape, not a flat map.", "It worked in orbit for 339 days and made 2,346 orbits."],
    sources: [LO_SRC, ["NSSDCA — Lunar Orbiter data", "https://nssdc.gsfc.nasa.gov/planetary/lunar/loinfo.txt"], IMPACTS],
    arrived: "1967-10-11", lastContact: "1967-10-11", eventText: "is crashed after the “picture of the century”"
  }),
  LO(3, {
    id: "lunarorbiter3", type: "Impact site (orbiter)", kind: "impact",
    lat: 14.3, lon: -97.7, coordsText: "14.3° N, 97.7° W",
    statusText: "Crashed on purpose, 1967",
    tagline: "It photographed Surveyor 1 standing on the Moon.",
    where: "Its debris lies on the surface; the impact site is known only roughly and has not been found in images yet.",
    mission: [["Launch", "February 5, 1967"], ["Resolution", "Down to about 1 m"], ["Impact", "October 9, 1967"]],
    purpose: "The last of the three landing-site scouts. It took pictures with up to 1 m resolution to confirm safe sites for Apollo and Surveyor — including the future Apollo 14 site with Cone crater.",
    history: "After its photography it was used for tracking.",
    endedTitle: "Why it stayed there",
    ended: "It was a one-way spacecraft. On October 9, 1967, on command from Earth, it crashed into the Moon.",
    now: "Not working. Its debris lies on the surface.",
    working: "No. It ended with an impact on October 9, 1967.",
    facts: ["It photographed Surveyor 1 on the surface from orbit — the lander and its shadow can be seen. It was the first time one spacecraft photographed another on the surface of another world."],
    sources: [LO_SRC, ["NSSDCA — Lunar Orbiter (1966–1967)", "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunarorb.html"]],
    arrived: "1967-10-09", lastContact: "1967-10-09", eventText: "is crashed after scouting the Apollo sites"
  }),
  LO(5, {
    id: "lunarorbiter5", type: "Impact site (orbiter)", kind: "impact",
    lat: -2.79, lon: -83.04, coordsText: "2.79° S, 83.04° W",
    statusText: "Crashed on purpose, 1968",
    tagline: "It took the first picture of the whole Earth from lunar orbit.",
    where: "Its debris lies on the surface, near the western edge of the near side.",
    mission: [["Launch", "August 1, 1967"], ["Resolution", "Down to about 2 m"], ["Impact", "January 31, 1968"]],
    purpose: "The last of the series. It finished photographing the far side and 36 pre-selected science sites at high resolution. Together the five Lunar Orbiters photographed 99% of the Moon.",
    history: "After its photography it was used to study the Moon’s gravity field.",
    endedTitle: "Why it stayed there",
    ended: "On January 31, 1968, on command from Earth, it was sent down to the surface.",
    now: "Not working. Its debris lies on the surface.",
    working: "No. It ended with an impact on January 31, 1968.",
    facts: ["On August 8, 1967, it took the first picture of the entire Earth from lunar orbit."],
    sources: [LO_SRC, IMPACTS],
    arrived: "1968-01-31", lastContact: "1968-01-31", eventText: "is crashed after mapping 99% of the Moon"
  }),
  {
    id: "surveyor2", name: "Surveyor 2", type: "Lander (crashed)", kind: "impact",
    lat: 5.5, lon: -12.0, coordsText: "≈5.5° N, 12.0° W (estimated, southeast of Copernicus)",
    model: "models/surveyor3.html",
    photo: "images/moon/surveyor.jpg", photoCaption: "A Surveyor lander during tests on Earth. Photo: NASA/JPL",
    schema: "images/moon/surveyor-schema.jpg",
    status: "silent", statusText: "Crashed in 1966",
    tagline: "One of its three engines would not start — and it tumbled into the Moon.",
    where: "Debris on the surface; only the estimated impact point is known.",
    mission: [["Mission", "Surveyor 2, NASA / JPL"], ["Launch", "September 20, 1966"], ["Target", "Sinus Medii"], ["Lost", "September 22, 1966"]],
    purpose: "To make the second soft landing, in Sinus Medii, photograph the surface and measure its strength and temperature.",
    history: "During a course correction one of the three vernier engines did not fire. The uneven thrust set the spacecraft spinning. JPL engineers tried 38 times to start the engine, without success.",
    endedTitle: "What happened",
    ended: "Contact was lost on September 22, 1966, and the spacecraft hit the Moon at high speed.",
    now: "Broken up on the surface. The exact impact site is unknown.",
    working: "No.",
    structure: ["Triangular frame of aluminum tubes carrying all equipment.", "Three landing legs with shock absorbers and crushable footpads.", "Solid-fuel main retro-rocket and three liquid-fuel vernier engines.", "Radar altimeter and Doppler radar for automatic landing.", "Solar panel, battery and a high-gain antenna on a mast.", "TV camera and engineering sensors. Launch mass about 995 kg."],
    facts: ["At the end, engineers fired the main retro-rocket on purpose, knowing the spin might cut contact — and got valuable engineering data for later flights."],
    builtBy: "Designed and built by Hughes Aircraft (California); the program was managed by NASA’s JPL.",
    sources: [["JPL — Surveyor II Impacts Moon", "https://www.jpl.nasa.gov/news/surveyor-ii-impacts-moon/"], IMPACTS],
    arrived: "1966-09-22", lastContact: "1966-09-22", eventText: "spins out of control and crashes"
  },
  {
    id: "surveyor4", name: "Surveyor 4", type: "Lander (crashed)", kind: "impact",
    lat: 0.45, lon: -1.39, coordsText: "≈0.45° N, 1.39° W (estimated, Sinus Medii)",
    model: "models/surveyor3.html",
    photo: "images/moon/surveyor.jpg", photoCaption: "A Surveyor lander during tests on Earth. Photo: NASA/JPL",
    schema: "images/moon/surveyor-schema.jpg",
    status: "silent", statusText: "Lost in 1967",
    tagline: "Contact was lost two and a half minutes before landing.",
    where: "Debris in Sinus Medii, near where Surveyor 6 later landed.",
    mission: [["Mission", "Surveyor 4, NASA / JPL"], ["Launch", "July 14, 1967"], ["Target", "Sinus Medii"], ["Lost", "July 17, 1967"]],
    purpose: "To land in Sinus Medii — the very center of the near side — photograph the surface and dig into the soil with a scoop that carried a magnet.",
    history: "The flight went perfectly until July 17, 1967.",
    endedTitle: "What happened",
    ended: "Two and a half minutes before landing, contact suddenly ended. NASA thinks the solid-fuel retro-rocket may have exploded.",
    now: "Broken up in Sinus Medii. A few months later Surveyor 6 landed nearby.",
    working: "No.",
    structure: ["Triangular aluminum frame, three legs with crushable footpads.", "Solid-fuel retro-rocket and three vernier engines; radar for automatic landing.", "TV camera and a surface-sampler scoop with a magnet. Launch mass about 1,037 kg."],
    facts: ["Contact was lost just two seconds before the retro-rocket was due to switch off."],
    builtBy: "Designed and built by Hughes Aircraft (California); the program was managed by NASA’s JPL.",
    sources: [["NASA Science — Surveyor 4", "https://science.nasa.gov/mission/surveyor-4/"], IMPACTS],
    arrived: "1967-07-17", lastContact: "1967-07-17", eventText: "goes silent minutes before landing"
  }
);

MOON_FLYBYS.push(LO(4, {
  id: "lunarorbiter4", type: "Lunar orbiter (crashed, site unknown)", flyby: true,
  orbitText: "Was in a near-polar orbit (85.5°); crashed around October 1967",
  statusText: "Silent since July 1967",
  tagline: "It made a photo map of the whole near side of the Moon.",
  where: "Debris somewhere on the surface — the impact point could not be calculated because contact had already been lost.",
  mission: [["Launch", "May 4, 1967"], ["Orbit", "Near-polar, 85.5°"], ["Last contact", "July 17, 1967"]],
  purpose: "With the Apollo tasks already done by the first three, Lunar Orbiter 4 was sent on a science mission: to map the whole Moon. From a near-polar orbit it photographed the entire near side and about 9% of the far side.",
  history: "It worked from a high polar orbit.",
  endedTitle: "What happened",
  ended: "The last contact was on July 17, 1967. Its orbit then slowly decayed, and around October 1967 it fell onto the Moon.",
  now: "Not working; the impact site is unknown.",
  working: "No. Contact was lost on July 17, 1967.",
  facts: ["It took some of the first detailed pictures of Mare Orientale — a huge ring basin on the edge of the near side that is barely visible from Earth."],
  sources: [LO_SRC, ["NASA NTRS — Lunar Orbiter 4 Photographic Mission Summary", "https://ntrs.nasa.gov/citations/19680017342"]],
  arrived: "1967-05-08", lastContact: "1967-07-17", arrivedLabel: "Lunar orbit", eventText: "maps the whole near side"
}));

/* ---------- Surveyor 1, 5, 6, 7 — вже були на сайті: модель, фото, схема, нові факти ---------- */
const SURV_ADD = {
  surveyor1: ["The first US soft landing on the Moon — and the second in the world, four months after the Soviet Luna 9.", "Its TV camera sent back more than 11,000 pictures.", "The landing was broadcast live on television.", "LRO photographed it from orbit in 2009."],
  surveyor5: ["The first chemical analysis of soil on another world: its alpha-scattering instrument showed basalt rock, with more than half of the atoms being oxygen.", "A helium leak during the flight could have ruined the landing; JPL and Hughes engineers quickly worked out a new descent plan, and it landed perfectly.", "It sent back about 20,000 pictures."],
  surveyor6: ["On November 17, 1967, it became the first spacecraft to lift off from the Moon: its engines fired for 2.5 seconds, it rose about 4 m and landed 2.5 m away.", "It sent back 29,914 pictures; its success completed all of the Surveyor program’s tasks for Apollo."],
  surveyor7: ["On January 20, 1968, its camera saw two laser beams aimed at it from Kitt Peak (Arizona) and Table Mountain (California) observatories — an early laser link with space.", "It was the first to record a faint glow above the lunar horizon after sunset, probably caused by charged dust.", "It sent back 21,091 pictures."]
};
MOON_SITES.forEach(s => {
  const f = SURV_ADD[s.id]; if (!f) return;
  if (!s.model) { s.model = "models/surveyor3.html"; s.noMini = true; }   // модель у картці; на глобусі — фото-мітка (менше навантаження)
  if (!s.photo) { s.photo = "images/moon/surveyor.jpg"; s.photoCaption = "A Surveyor lander during tests on Earth. Photo: NASA/JPL"; }
  if (!s.schema) s.schema = "images/moon/surveyor-schema.jpg";
  s.facts = (s.facts || []).concat(f.filter(x => !(s.facts || []).includes(x)));
});

/* ---------- Lunar Flashlight — модель від команди ---------- */
// (файл models/lunarflashlight.html замінено моделлю команди)

/* ---------- Фото NASA (NASA Image and Video Library, images.nasa.gov) ---------- */
const NASA_PHOTOS = {
  clementine: ["clementine", "Clementine fully deployed (artist’s concept). Image: NASA (PIA18159)"],
  prospector: ["prospector", "Lunar Prospector (artist’s concept). Image: NASA (PIA18162)"],
  lro: ["lro", "Lunar Reconnaissance Orbiter (artist’s concept). Image: NASA (PIA12072)"],
  lcross: ["lcross", "LCROSS and its spent Centaur stage approaching the Moon (artist’s concept). Image: NASA"],
  artemisp1: ["artemisp", "One of the THEMIS probes (later ARTEMIS P1/P2) before launch. Photo: NASA (KSC-06pd2793)"],
  artemisp2: ["artemisp", "One of the THEMIS probes (later ARTEMIS P1/P2) before launch. Photo: NASA (KSC-06pd2793)"],
  grail: ["grail", "GRAIL twin spacecraft over the Moon (artist’s concept). Image: NASA/JPL (PIA13965)"],
  ladee: ["ladee", "LADEE approaching lunar orbit (artist’s concept). Image: NASA (PIA18160)"],
  capstone: ["capstone", "CAPSTONE in orbit near the Moon (illustration). Image: NASA (ACD22-0003-003)"],
  artemis1: ["artemis1", "Orion and the Moon on flight day 12 of Artemis I. Photo: NASA (art001e000670)"],
  lunarflashlight: ["lunarflashlight", "Lunar Flashlight with solar arrays deployed (illustration). Image: NASA/JPL (PIA25626)"],
  peregrine: ["peregrine", "Astrobotic’s Peregrine lander being prepared at Kennedy. Photo: NASA (KSC-20231114-PH-ILW01_0015)"],
  blueghost1: ["blueghost1", "Blue Ghost lander being encapsulated before launch. Photo: NASA (KSC-20250112-PH-SPX01_0002)"],
  im2: ["im2", "The lander “Athena” (IM-2) above the Moon, seen by its own camera, March 2025. Image: Intuitive Machines"],
  trailblazer: ["trailblazer", "Lunar Trailblazer in orbit around the Moon (artist’s concept). Image: NASA/JPL (PIA26453)"],
  artemis2: ["artemis2", "The Orion spacecraft in flight (artist’s concept). Image: NASA"]
};
MOON_SITES.concat(MOON_ORBITERS, MOON_FLYBYS).forEach(s => {
  const p = NASA_PHOTOS[s.id]; if (!p) return;
  s.photo = "images/moon/" + p[0] + ".jpg"; s.photoCaption = p[1];
});
