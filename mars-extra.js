/* =====================================================
   ДОДАТКОВІ ОБ'ЄКТИ МАРСА
   1) ще апарати на поверхні  2) апарати на орбіті
   Дані перевірені за джерелами NASA / ESA (листопад 2026).
   ===================================================== */

MARS_SITES.push(
  {
    id: "viking1", name: "Viking 1", type: "Lander",
    lat: 22.48, lon: -49.97, coordsText: "22.48° N, 49.97° W",
    status: "silent", statusText: "Silent since 1982",
    tagline: "America's first successful landing on Mars.",
    where: "On the surface of Mars, in Chryse Planitia (the Plains of Gold).",
    mission: [["Mission", "Viking 1, NASA"], ["Launch", "August 20, 1975"], ["Landed", "July 20, 1976, Chryse Planitia"], ["Last transmission", "November 1982"]],
    purpose: "To take the first close-up pictures from the surface of Mars, study its weather and soil, and search for signs of life with on-board biology experiments.",
    history: "Viking 1 touched down on the western slope of Chryse Planitia on July 20, 1976. It was planned to work for 90 days, but it kept sending pictures and weather data for more than six years.",
    endedTitle: "Why it stopped",
    ended: "In November 1982 a faulty command sent from Earth caused contact with the lander to be lost for good. Controllers tried for months to reach it again, without success.",
    now: "The lander still stands on the plain where it landed in 1976.",
    working: "No. Its last transmission reached Earth in November 1982.",
    facts: ["Viking 1 worked on the surface of Mars for about six years — far longer than its planned 90 days."],
    builtBy: "The landers were built by Martin Marietta; the orbiters were built by NASA's Jet Propulsion Laboratory.",
    sources: [["NASA Science: Viking Project", "https://science.nasa.gov/mission/viking/"], ["NASA NSSDC: Viking Mission to Mars", "https://nssdc.gsfc.nasa.gov/planetary/viking.html"]]
  },
  {
    id: "viking2", name: "Viking 2", type: "Lander",
    lat: 47.64, lon: 134.29, coordsText: "47.64° N, 134.29° E",
    status: "silent", statusText: "Silent since 1980",
    tagline: "The lander that photographed frost on Mars.",
    where: "On the surface of Mars, in Utopia Planitia.",
    mission: [["Mission", "Viking 2, NASA"], ["Launch", "September 9, 1975"], ["Landed", "September 3, 1976, Utopia Planitia"], ["Last data", "April 11, 1980"]],
    purpose: "The twin of Viking 1: to study the surface, weather and soil of Mars and look for signs of life — this time on the opposite side of the planet.",
    history: "Viking 2 landed in Utopia Planitia on September 3, 1976, on nearly the opposite side of Mars from Viking 1. Its cameras captured a thin layer of frost on the ground during the Martian winter.",
    endedTitle: "Why it stopped",
    ended: "On April 11, 1980, its batteries failed and the lander stopped communicating.",
    now: "The lander stands on the flat plain of Utopia Planitia, near the large Mie Crater.",
    working: "No. The last data from Viking 2 arrived on April 11, 1980.",
    facts: ["The Viking 2 lander was powered by radioisotope generators, so it did not depend on sunlight."],
    builtBy: "The lander was built by Martin Marietta; the orbiter was built by NASA's Jet Propulsion Laboratory.",
    sources: [["NASA NSSDC: Viking Mission to Mars", "https://nssdc.gsfc.nasa.gov/planetary/viking.html"], ["NASA Science: Viking Project", "https://science.nasa.gov/mission/viking/"]]
  },
  {
    id: "sojourner", name: "Sojourner & Pathfinder", type: "Rover & lander",
    lat: 19.13, lon: -33.22, coordsText: "19.13° N, 33.22° W",
    status: "silent", statusText: "Silent since 1997",
    tagline: "The very first rover on another planet.",
    where: "On the surface of Mars, in Ares Vallis, an ancient flood plain.",
    mission: [["Mission", "Mars Pathfinder, NASA / JPL"], ["Launch", "December 4, 1996"], ["Landed", "July 4, 1997, Ares Vallis"], ["Last contact", "September 27, 1997"]],
    purpose: "To test a new, cheaper way to land on Mars — with airbags — and to drive the first small rover on another planet.",
    history: "Pathfinder bounced onto Mars inside a cocoon of airbags on July 4, 1997. Its tiny rover Sojourner rolled down a ramp and studied the rocks around the lander. The rover was designed for 7 sols but worked for 83.",
    endedTitle: "Why it stopped",
    ended: "Contact with the lander was lost on September 27, 1997. Engineers think its battery failed. Sojourner could only talk to Earth through the lander, so both went silent.",
    now: "The lander — renamed the Carl Sagan Memorial Station — and Sojourner remain in Ares Vallis.",
    working: "No. The last data arrived on September 27, 1997.",
    facts: ["Pathfinder was the first U.S. spacecraft to land using airbags.", "Sojourner was tiny — it weighed only about 10.6 kg."],
    builtBy: "Mars Pathfinder and Sojourner were built and operated by NASA's Jet Propulsion Laboratory (JPL).",
    sources: [["NASA: 25 Years Ago, Mars Pathfinder Launches", "https://www.nasa.gov/history/25-years-ago-mars-pathfinder-launches-to-mars-to-deploy-sojourner-the-first-planetary-rover-2"], ["Space.com: Sojourner, the first successful Mars rover", "https://www.space.com/17745-mars-pathfinder-sojourner-rover.html"]]
  },
  {
    id: "spirit", name: "Spirit", type: "Rover",
    lat: -14.5718, lon: 175.4785, coordsText: "14.57° S, 175.48° E",
    status: "silent", statusText: "Silent since 2010",
    tagline: "Opportunity's twin — it got stuck in soft sand.",
    where: "On the surface of Mars, in Gusev Crater.",
    mission: [["Mission", "Mars Exploration Rover (MER-A), NASA / JPL"], ["Launch", "June 10, 2003"], ["Landed", "January 4, 2004, Gusev Crater"], ["Last contact", "March 22, 2010"]],
    purpose: "Like its twin Opportunity, Spirit searched rocks and soil for signs of water in Mars' past.",
    history: "Spirit landed in Gusev Crater three weeks before Opportunity. It was built for 90 Martian days but explored for more than six years, finding evidence that water once played a role at its site.",
    endedTitle: "Why it stopped",
    ended: "In 2009 Spirit got stuck in soft sand and could not free itself. Without being able to turn its solar panels toward the Sun, it could not survive the Martian winter, and it went silent in March 2010.",
    now: "Spirit sits where it got stuck, at a place the team called “Troy” in Gusev Crater.",
    working: "No. NASA last heard from Spirit on March 22, 2010.",
    facts: ["Spirit and Opportunity landed on opposite sides of Mars in January 2004."],
    builtBy: "Spirit was built and operated by NASA's Jet Propulsion Laboratory (JPL), with Cornell University leading the science instruments.",
    sources: [["NASA PDS: Mars Exploration Rover mission", "https://pds-geosciences.wustl.edu/mer/urn-nasa-pds-mer_documentation/document/mission/mer_mission.txt"]]
  },
  {
    id: "phoenix", name: "Phoenix", type: "Lander",
    lat: 68.22, lon: -125.75, coordsText: "68.22° N, 234.25° E",
    status: "silent", statusText: "Silent since 2008",
    tagline: "The lander that touched water ice in the Martian arctic.",
    where: "On the surface of Mars, in the arctic plains (Vastitas Borealis).",
    mission: [["Mission", "Phoenix Mars Lander, NASA"], ["Launch", "August 4, 2007"], ["Landed", "May 25, 2008"], ["Last contact", "November 2008"]],
    purpose: "To dig into the icy ground near the north pole of Mars, study the ice and soil, and find out whether this place could ever have been habitable.",
    history: "Phoenix landed farther north than any spacecraft before it. Its robotic arm dug trenches and uncovered bright water ice just below the surface.",
    endedTitle: "Why it stopped",
    ended: "As planned, the mission ended when the dark arctic winter came: the solar panels could no longer make power, and contact ended in November 2008.",
    now: "The lander remains in the arctic plain. Later images from orbit suggest its solar panels may have collapsed under the weight of winter ice.",
    working: "No. It went silent in November 2008, about six months after landing.",
    facts: ["The ground around Phoenix is cracked into polygons, like permafrost areas on Earth."],
    builtBy: "The lander was built by Lockheed Martin; the science mission was led by the University of Arizona.",
    sources: [["NASA Photojournal: Phoenix lander and its surroundings (PIA11723)", "https://photojournal.jpl.nasa.gov/catalog/PIA11723"], ["NASA Science: Earth site corresponding to Phoenix's target", "https://science.nasa.gov/photojournal/earth-site-corresponding-to-phoenix-mars-landers-targeted-site/"]]
  },
  {
    id: "perseverance", name: "Perseverance", type: "Rover",
    lat: 18.4447, lon: 77.4508, coordsText: "18.44° N, 77.45° E (landing site)",
    status: "active", statusText: "Still working",
    tagline: "Ingenuity's partner, still searching for signs of ancient life.",
    where: "On the surface of Mars, in Jezero Crater — an ancient lake.",
    mission: [["Mission", "Mars 2020, NASA / JPL"], ["Launch", "July 30, 2020"], ["Landed", "February 18, 2021, Jezero Crater"], ["Status", "Active mission"]],
    purpose: "To explore an ancient lake bed, look for signs of past microbial life and collect rock samples that could one day be brought back to Earth.",
    history: "Perseverance landed on February 18, 2021, at a spot NASA named Octavia E. Butler Landing. It brought the Ingenuity helicopter with it and has been driving through Jezero Crater ever since.",
    now: "Perseverance keeps exploring Jezero Crater. The point on the map is its landing site — the rover has since driven many kilometers away.",
    working: "Yes. It is powered by a radioisotope generator, so it does not depend on sunlight.",
    facts: ["Its landing site is named after science-fiction writer Octavia E. Butler, who grew up in Pasadena, home of JPL."],
    builtBy: "Perseverance was built by NASA's Jet Propulsion Laboratory (JPL), which also operates it.",
    sources: [["NASA JPL: Welcome to Octavia E. Butler Landing (PIA24483)", "https://www.jpl.nasa.gov/images/pia24483-welcome-to-octavia-e-butler-landing/"]]
  }
);

/* ---------- Апарати на орбіті Марса ----------
   orbit: r — радіус орбіти на малюнку (1 = радіус планети, збільшено для наочності)
          inc — нахил орбіти (градуси), node — поворот орбіти, speed — швидкість
          phase — стартове положення                                              */
const MARS_ORBITERS = [
  {
    id: "odyssey", name: "Mars Odyssey", type: "Orbiter",
    orbit: { r: 1.16, inc: 87, node: 20, speed: 0.006, phase: 0 },
    orbitText: "Polar orbit around Mars",
    status: "active", statusText: "Still working",
    tagline: "The longest-serving spacecraft at Mars — 25 years in orbit.",
    where: "In orbit around Mars.",
    mission: [["Mission", "2001 Mars Odyssey, NASA / JPL"], ["Launch", "April 7, 2001"], ["Arrived at Mars", "October 24, 2001"], ["Status", "Active mission"]],
    purpose: "To map minerals on the surface of Mars, measure radiation and look for hydrogen — a sign of water ice — just below the ground.",
    history: "Odyssey reached Mars on October 24, 2001. It found that large areas near the poles have ice just under the surface — which helped choose the landing site for Phoenix. It also relays data from rovers to Earth.",
    now: "Odyssey marked 25 years in orbit around Mars in October 2026. It still studies clouds, fog and frost and relays messages from the surface.",
    working: "Yes. No other spacecraft has worked at Mars longer.",
    facts: ["It is named after Arthur C. Clarke's novel “2001: A Space Odyssey”."],
    builtBy: "Built by Lockheed Martin; operated by NASA's Jet Propulsion Laboratory (JPL).",
    sources: [["NASA Science: Odyssey team celebrates 25 years", "https://science.nasa.gov/?p=1216525"]]
  },
  {
    id: "mro", name: "Mars Reconnaissance Orbiter", type: "Orbiter",
    orbit: { r: 1.23, inc: 93, node: 110, speed: 0.0052, phase: 2 },
    orbitText: "Polar orbit around Mars",
    status: "active", statusText: "Still working",
    tagline: "The sharp-eyed orbiter that photographed rovers from space.",
    where: "In orbit around Mars.",
    mission: [["Mission", "Mars Reconnaissance Orbiter (MRO), NASA / JPL"], ["Launch", "August 2005"], ["Arrived at Mars", "March 10, 2006"], ["Status", "Active mission"]],
    purpose: "To photograph the surface of Mars in great detail, search for signs of ancient water and help choose safe landing sites.",
    history: "MRO entered orbit on March 10, 2006. Its HiRISE camera can see objects the size of a desk on the ground — it has photographed Opportunity, Phoenix and many other spacecraft on the surface.",
    now: "MRO still takes pictures and relays data from the rovers. In December 2025 its HiRISE camera took its 100,000th photo of Mars.",
    working: "Yes, after more than 20 years at Mars.",
    facts: ["On September 20, 2018, HiRISE spotted the silent Opportunity rover as a tiny dot from about 268 km up."],
    builtBy: "Built by Lockheed Martin; operated by NASA's Jet Propulsion Laboratory (JPL). The HiRISE camera is run by the University of Arizona.",
    sources: [["HiRISE: MRO's 20th anniversary in orbit", "https://www.uahirise.org/hipod/ESP_091969_1660"]]
  },
  {
    id: "maven", name: "MAVEN", type: "Orbiter",
    orbit: { r: 1.35, inc: 75, node: 200, speed: 0.0042, phase: 4 },
    orbitText: "Elliptical orbit around Mars",
    status: "silent", statusText: "Lost in 2025",
    tagline: "It explained how Mars lost its air — then went silent.",
    where: "In orbit around Mars (no longer in contact).",
    mission: [["Mission", "MAVEN, NASA"], ["Launch", "November 2013"], ["Arrived at Mars", "September 2014"], ["Contact lost", "December 6, 2025"], ["Mission ended", "June 2026"]],
    purpose: "To study the upper atmosphere of Mars and find out how and why the planet lost most of its air to space.",
    history: "MAVEN was the first spacecraft built to study the Martian atmosphere. It mapped Martian winds, discovered a new kind of aurora and also relayed data from the rovers to Earth.",
    endedTitle: "What happened",
    ended: "On December 6, 2025, MAVEN passed behind Mars as usual — and never called home again. Tracking data showed it was spinning unexpectedly. After months of attempts, NASA declared the mission over in June 2026.",
    now: "The spacecraft is still somewhere in orbit around Mars, but no one can talk to it.",
    working: "No. It has been silent since December 6, 2025.",
    facts: ["This was the first time NASA accidentally lost a spacecraft orbiting another planet."],
    builtBy: "Built by Lockheed Martin; the science mission was led by the University of Colorado Boulder.",
    sources: [["The Planetary Society: NASA has lost a spacecraft around Mars", "https://www.planetary.org/articles/nasa-has-lost-a-spacecraft-around-mars"], ["Astronomy: NASA decommissions MAVEN", "https://www.astronomy.com/science/nasa-fails-to-reestablish-contact-decommissions-maven/"]]
  }
];

/* ---------- Ще апарати NASA ---------- */
MARS_SITES.push({
  id: "mpl", name: "Mars Polar Lander", type: "Lost lander",
  lat: -76, lon: 165, coordsText: "≈ 76° S, 195° W (planned site — never found)",
  status: "silent", statusText: "Lost in 1999",
  tagline: "It vanished during landing — and was never found.",
  where: "Somewhere near the south polar layered terrain of Mars (Ultimi Scopuli). The point shows the planned landing site.",
  mission: [["Mission", "Mars Polar Lander (Mars Surveyor '98), NASA / JPL"], ["Launch", "January 3, 1999"], ["Landing attempt", "December 3, 1999"], ["Last contact", "December 3, 1999, just before entering the atmosphere"]],
  purpose: "To land near the edge of Mars' south polar cap and study the soil, ice and climate of the polar region.",
  history: "The lander sent its last data right before it entered the Martian atmosphere on December 3, 1999. After landing it was supposed to call home — but Earth never heard from it again.",
  endedTitle: "What happened",
  ended: "The cause is not known for sure. NASA's investigation found that the engines may have shut off too early, so the lander probably fell and crashed. Two small probes it carried, Deep Space 2, were lost too.",
  now: "Mars Global Surveyor photographed the landing area for months looking for the lander, but it has never been confirmed.",
  working: "No. It has not been heard from since December 3, 1999.",
  facts: ["It is one of the few spacecraft whose exact resting place is still a mystery."],
  builtBy: "Built by Lockheed Martin for NASA's Jet Propulsion Laboratory.",
  orbitView: ["Mars Polar Lander: The Search Begins (NASA)", "https://science.nasa.gov/photojournal/mars-polar-lander-the-search-begins/"],
  sources: [["NASA: Mars Polar Lander search (76.3° S, 195° W)", "https://science.nasa.gov/?p=914107"], ["NASA NSSDC: Mars Polar Lander landing site", "https://nssdc.gsfc.nasa.gov/planetary/mars/polar_lander/mpl_ds2_landsite.html"]]
});

MARS_ORBITERS.push({
  id: "mgs", name: "Mars Global Surveyor", type: "Orbiter",
  orbit: { r: 1.42, inc: 93, node: 290, speed: 0.0036, phase: 1 },
  orbitText: "Polar orbit around Mars (silent)",
  status: "silent", statusText: "Lost in 2006",
  tagline: "It mapped all of Mars for 9 years — then a software error silenced it.",
  where: "Still in orbit around Mars, but silent.",
  mission: [["Mission", "Mars Global Surveyor, NASA / JPL"], ["Launch", "November 7, 1996"], ["Arrived at Mars", "September 1997"], ["Last contact", "November 2, 2006"]],
  purpose: "To map the whole surface of Mars, measure its height everywhere and study its weather from orbit.",
  history: "Designed to work for two years, Mars Global Surveyor kept going for nine. Its camera returned more than 240,000 images, and its laser altimeter made the first precise height map of Mars.",
  endedTitle: "What happened",
  ended: "On November 2, 2006, during a routine command to move a solar panel, the spacecraft ran into an error. NASA's review found that a faulty software update led its battery to drain.",
  now: "The spacecraft is thought to still circle Mars in silence. Scientists still use its data today.",
  working: "No. It has not been heard from since November 2006.",
  facts: ["Its images helped to choose landing sites for Spirit and Opportunity — and then spotted them on the surface."],
  builtBy: "Built by Lockheed Martin; operated by NASA's Jet Propulsion Laboratory (JPL).",
  sources: [["Astronomy: Mars orbiter may be kaput (2006)", "https://astronomy.com/science/mars-orbiter-may-be-kaput"], ["Electronic Design: NASA blames software glitch for MGS failure", "https://www.electronicdesign.com/technologies/industrial/boards/article/21769690/nasa-blames-software-glitch-for-mars-global-surveyor-failure"]]
});

/* ---------- Дати для шкали часу та «лічильника тиші» ----------
   arrived — коли прибув / сів; lastContact — останній зв'язок (null — працює) */
const MARS_DATES = {
  opportunity: ["2004-01-25", "2018-06-10"], insight: ["2018-11-26", "2022-12-15"],
  ingenuity: ["2021-02-18", "2024-01-18"], curiosity: ["2012-08-06", null],
  viking1: ["1976-07-20", "1982-11-13"], viking2: ["1976-09-03", "1980-04-11"],
  sojourner: ["1997-07-04", "1997-09-27"], spirit: ["2004-01-04", "2010-03-22"],
  phoenix: ["2008-05-25", "2008-11-02"], perseverance: ["2021-02-18", null],
  mpl: ["1999-12-03", "1999-12-03"],
  odyssey: ["2001-10-24", null], mro: ["2006-03-10", null],
  maven: ["2014-09-21", "2025-12-06"], mgs: ["1997-09-12", "2006-11-02"]
};
MARS_SITES.concat(MARS_ORBITERS).forEach(s => { const d = MARS_DATES[s.id]; if (d) { s.arrived = d[0]; s.lastContact = d[1]; } });

/* Вигляд з орбіти (знімки NASA) */
MARS_SITES.find(s => s.id === "opportunity").orbitView =
  ["HiRISE spots silent Opportunity from orbit, Sept. 20, 2018 (NASA/JPL)", "https://photojournal.jpl.nasa.gov/catalog/PIA22549"];

/* ---------- Фото NASA для апаратів ---------- */
const MARS_PHOTOS = {
  spirit:       ["images/mars/spirit.jpg", "Mars Exploration Rover — Spirit's twin design (artist's concept). Image: NASA/JPL/Cornell University/Maas Digital, PIA04928"],
  phoenix:      ["images/mars/phoenix.jpg", "Phoenix fully deployed on the Martian arctic plain (artist's concept). Image: NASA/JPL/UA/Lockheed Martin, PIA09344"],
  perseverance: ["images/mars/perseverance.jpg", "Perseverance's selfie with the Ingenuity helicopter, April 6, 2021. Image: NASA/JPL-Caltech/MSSS, PIA24542"],
  odyssey:      ["images/mars/odyssey.jpg", "Mars Odyssey over the south pole of Mars (artist's concept). Image: NASA/JPL, PIA04816"],
  mro:          ["images/mars/mro.jpg", "Mars Reconnaissance Orbiter above Mars (artist's concept). Image: NASA/JPL, PIA04758"],
  maven:        ["images/mars/maven.jpg", "MAVEN near Mars (artist's concept). Image: NASA/GSFC, PIA17487"]
};
MARS_SITES.concat(MARS_ORBITERS).forEach(s => {
  const p = MARS_PHOTOS[s.id];
  if (p && !s.photo) { s.photo = p[0]; s.photoCaption = p[1]; }
});

/* ---------- Deep Space 2 — мікрозонди, що загинули разом із Mars Polar Lander ---------- */
MARS_SITES.push({
  id: "deepspace2", name: "Deep Space 2 (Amundsen & Scott)", type: "Impact probes (lost)", kind: "impact",
  lat: -75, lon: 164, coordsText: "≈ 75° S, 196° W (target area — never found)",
  status: "silent", statusText: "Lost on arrival, 1999",
  tagline: "Two tiny probes built to smash into Mars — never heard from.",
  where: "Somewhere in the south polar region of Mars, not far from the planned Mars Polar Lander site. The point shows the target area.",
  photo: "images/mars/deepspace2.jpg",
  photoCaption: "JPL workers mount a Deep Space 2 microprobe onto Mars Polar Lander, November 10, 1998. Photo: NASA/KSC, KSC-98pc1645",
  mission: [["Mission", "Deep Space 2, NASA New Millennium Program / JPL"], ["Launch", "January 3, 1999, with Mars Polar Lander"], ["Arrival", "December 3, 1999"], ["Mass", "3.57 kg per probe"]],
  purpose: "To test a new kind of probe: instead of landing gently, each one hit the ground at high speed, broke into two parts and pushed its lower half under the surface to look for water ice in the soil.",
  history: "The two microprobes rode to Mars on the Mars Polar Lander. About 10 minutes before the lander's touchdown they were released and fell toward the south polar region. They were named Amundsen and Scott after the first explorers to reach Earth's South Pole.",
  endedTitle: "What happened",
  ended: "Neither probe ever sent a signal after reaching Mars. The cause is unknown — and on the same day contact with Mars Polar Lander was lost too.",
  now: "Both probes are believed to lie buried somewhere near the south pole of Mars. They have never been found.",
  working: "No. They were never heard from after arrival.",
  facts: ["The whole Deep Space 2 project cost $29.2 million — very little for a mission to another planet."],
  builtBy: "Designed and built by NASA's Jet Propulsion Laboratory (JPL) as part of the New Millennium Program.",
  sources: [["NASA JPL: Mars penetrator probes named for polar explorers", "https://www.jpl.nasa.gov/news/mars-penetrator-probes-named-for-pioneering-polar-explorers/"], ["NASA NSSDC: Deep Space 2", "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=DEEPSP2"], ["NASA JPL: Deep Space 2 mission site", "https://www.jpl.nasa.gov/nmp/ds2/index.php"]],
  arrived: "1999-12-03", lastContact: "1999-12-03", eventText: "probes hit Mars — and are never heard from"
});

/* ---------- 3D-моделі ---------- */
const MARS_MODELS = { spirit: "spirit", phoenix: "phoenix", perseverance: "perseverance", odyssey: "odyssey", mro: "mro", maven: "maven", deepspace2: "deepspace2" };
MARS_SITES.concat(MARS_ORBITERS).forEach(s => { if (MARS_MODELS[s.id] && !s.model) s.model = "models/" + MARS_MODELS[s.id] + ".html"; });

/* ---------- Доповнення з документа команди «Місії NASA до Марса» ---------- */
const DOC_ADD = {
  viking1:   { model: "viking", facts: ["The lander is named the Thomas Mutch Memorial Station.", "In 1976 the Viking 1 orbiter photographed the famous “Face on Mars” in Cydonia. Later images showed it is an ordinary hill.", "Together the Viking 1 and 2 orbiters took more than 50,000 pictures of Mars."] },
  viking2:   { model: "viking", facts: ["The lander is named the Gerald Soffen Memorial Station.", "It landed on a rocky plain, so its pictures show a very different landscape from Viking 1's.", "The Viking 2 orbiter stopped working on July 25, 1978, after a leak in its attitude-control gas."] },
  sojourner: { model: "pathfinder", facts: ["The rover is named after Sojourner Truth.", "The whole mission cost about $280 million — far less than Viking.", "Sojourner drove about 100 m around the lander."] },
  mpl:       { model: "mpl", facts: ["It carried the two Deep Space 2 microprobes.", "It was part of the Mars Surveyor ’98 program, which lost both of its spacecraft within about two and a half months."] },
  mgs:       { model: "mgs", facts: ["It was NASA's first successful Mars mission in twenty years, after Viking.", "For almost a year and a half it dipped into the Martian atmosphere to slow down — this is called aerobraking.", "In 2001 its images showed that the “Face on Mars” is just a hill."] }
};
MARS_SITES.concat(MARS_ORBITERS).forEach(s => {
  const a = DOC_ADD[s.id]; if (!a) return;
  if (!s.model) s.model = "models/" + a.model + ".html";
  if (!s.photo) { s.photo = "images/mars/" + s.id + ".jpg"; s.photoCaption = "Photo: NASA"; }
  if (!s.schema) s.schema = "images/mars/" + s.id + "-schema.jpg";
  s.facts = (s.facts || []).concat(a.facts);
});

/* ---------- Mariner 9 — перший штучний супутник іншої планети ---------- */
MARS_ORBITERS.push({
  id: "mariner9", name: "Mariner 9", type: "Orbiter", model: "models/mariner9.html",
  photo: "images/mars/mariner9.jpg", photoCaption: "Mariner 9. Photo: NASA", schema: "images/mars/mariner9-schema.jpg",
  orbit: { r: 1.36, inc: 64, node: 60, speed: 0.0044, phase: 3 },
  orbitText: "Elliptical orbit around Mars, period about 12 hours (silent)",
  status: "silent", statusText: "Silent since 1972",
  tagline: "The first spacecraft ever to orbit another planet.",
  where: "In orbit around Mars — above the surface and the atmosphere.",
  mission: [["Mission", "Mariner 9, NASA / JPL"], ["Launch", "May 30, 1971"], ["Arrived at Mars", "November 14, 1971"], ["Last contact", "October 27, 1972"]],
  purpose: "To map Mars from orbit. When it arrived, the whole planet was hidden by a global dust storm. When the dust settled, it mapped about 85% of the surface in roughly 7,000 pictures and also photographed the moons Phobos and Deimos.",
  history: "Mariner 9 discovered the giant volcano Olympus Mons, a huge system of canyons and the channels of ancient rivers. Its pictures changed the idea of Mars from a dead, cratered world into a planet with volcanoes, canyons and traces of water.",
  endedTitle: "Why it stopped",
  ended: "It was never meant to come back. Its work ended on October 27, 1972, when the gas for its attitude-control jets ran out.",
  now: "It is inactive. It was expected to stay in orbit for about 50 years before entering the atmosphere of Mars.",
  working: "No. Its work ended in 1972.",
  structure: ["Mass about 1,000 kg with fuel; four solar panels.", "Two TV cameras, an infrared interferometer spectrometer, an ultraviolet spectrometer and an infrared radiometer."],
  facts: ["The great canyon system Valles Marineris is named after Mariner 9.", "After Mariner 8 was lost, its tasks were rewritten for Mariner 9."],
  builtBy: "NASA's Jet Propulsion Laboratory (JPL). Owner and operator: NASA.",
  sources: [["NASA Science — Mariner 9", "https://science.nasa.gov/mission/mariner-9"], ["JPL — Mariner 9", "https://www.jpl.nasa.gov/missions/mariner-9-mariner-i/"]],
  arrived: "1971-11-14", lastContact: "1972-10-27"
});
