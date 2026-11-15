/* =====================================================
   ДОДАТКОВІ ОБ'ЄКТИ МІСЯЦЯ
   1) ще місця посадок Apollo  2) апарати на орбіті
   Координати — з каталогу NASA NSSDC / LROC.
   ===================================================== */

MOON_SITES.push(
  {
    id: "apollo14", name: "Apollo 14 Lunar Module", type: "Landing site",
    lat: -3.64589, lon: -17.47194, coordsText: "3.65° S, 17.47° W",
    status: "silent", statusText: "Left behind in 1971",
    tagline: "Where an astronaut played golf on the Moon.",
    where: "On the surface of the Moon, at Fra Mauro.",
    mission: [["Mission", "Apollo 14, NASA"], ["Landed", "February 5, 1971"], ["Crew on the Moon", "Alan Shepard and Edgar Mitchell"], ["Left behind", "Descent stage of the lunar module “Antares”"]],
    purpose: "To explore the Fra Mauro highlands — the site Apollo 13 was supposed to visit before its accident.",
    history: "Alan Shepard and Edgar Mitchell spent two moonwalks collecting rocks and setting up experiments. Before leaving, Shepard famously hit two golf balls with a makeshift club.",
    endedTitle: "Why it stayed there",
    ended: "Only the top half of the lunar module flew back to orbit. The bottom half — the descent stage — served as the launch pad and stayed on the Moon.",
    now: "The descent stage, experiments and footpaths are still there and have been photographed from orbit by LRO.",
    working: "No — it was never meant to work after launch.",
    facts: ["Apollo 14 was the mission after Apollo 13, which could not land."],
    builtBy: "The lunar module was built by Grumman for NASA.",
    sources: [["NASA NSSDC: lunar artifact sites", "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_artifact_impacts.html"], ["NASA NSSDC: Apollo landing site coordinates", "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html"]]
  },
  {
    id: "apollo16", name: "Apollo 16 Lunar Rover", type: "Lunar car",
    lat: -8.9729, lon: 15.5037, coordsText: "8.97° S, 15.50° E",
    status: "silent", statusText: "Parked since 1972",
    tagline: "The second Moon car, parked in the highlands.",
    where: "On the surface of the Moon, in the Descartes highlands.",
    mission: [["Mission", "Apollo 16, NASA"], ["Landed", "April 21, 1972"], ["Crew on the Moon", "John Young and Charlie Duke"]],
    purpose: "Apollo 16 was the only Apollo mission to land in the lunar highlands. The rover let the astronauts travel far from the lander to collect rocks.",
    history: "John Young and Charlie Duke drove their rover across the Descartes highlands on three trips. Charlie Duke left a photo of his family on the lunar surface.",
    endedTitle: "Why it stayed there",
    ended: "Like all Apollo rovers, it was too heavy to bring back. It was parked near the lunar module and left behind.",
    now: "The rover is still parked at the Apollo 16 site, visible in orbital images from LRO.",
    working: "No. Its batteries ran out long ago.",
    facts: ["Apollo 16 is the only Apollo mission that landed in the lunar highlands."],
    builtBy: "The Lunar Roving Vehicle was built by Boeing for NASA.",
    sources: [["LROC: Coordinates of human features (2016)", "https://www.lroc.asu.edu/data/support/downloads/2016_LROC_Coordinates_of_Human_Features.pdf"]]
  },
  {
    id: "apollo17", name: "Apollo 17 Lunar Rover", type: "Lunar car",
    lat: 20.1896, lon: 30.7769, coordsText: "20.19° N, 30.78° E",
    status: "silent", statusText: "Parked since 1972",
    tagline: "Parked by the last people to walk on the Moon.",
    where: "On the surface of the Moon, in the Taurus–Littrow valley.",
    mission: [["Mission", "Apollo 17, NASA"], ["Landed", "December 11, 1972"], ["Crew on the Moon", "Gene Cernan and Harrison Schmitt"]],
    purpose: "Apollo 17 was the last crewed Moon landing. Harrison Schmitt was a geologist — the only scientist to walk on the Moon.",
    history: "Gene Cernan and Harrison Schmitt used their rover on three long drives through the Taurus–Littrow valley and collected the largest amount of Moon rock of any Apollo mission.",
    endedTitle: "Why it stayed there",
    ended: "The rover was parked for the last time so its TV camera could film the lunar module's launch back to orbit. Nobody has driven on the Moon since.",
    now: "The rover, the lunar module descent stage and experiments are still in the valley.",
    working: "No.",
    facts: ["In December 1972, Gene Cernan became the last person to walk on the Moon."],
    builtBy: "The Lunar Roving Vehicle was built by Boeing for NASA.",
    sources: [["LROC: Coordinates of human features (2016)", "https://www.lroc.asu.edu/data/support/downloads/2016_LROC_Coordinates_of_Human_Features.pdf"], ["NASA NSSDC: lunar artifact sites", "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_artifact_impacts.html"]]
  }
);

/* ---------- Апарати на орбіті Місяця ----------
   orbit: r — радіус орбіти на малюнку (1 = радіус Місяця, збільшено для наочності) */
const MOON_ORBITERS = [
  {
    id: "lro", name: "LRO (Lunar Reconnaissance Orbiter)", type: "Orbiter",
    orbit: { r: 1.18, inc: 90, node: 30, speed: 0.006, phase: 0 },
    orbitText: "Polar orbit around the Moon",
    status: "active", statusText: "Still working",
    tagline: "The orbiter that photographed the Apollo landing sites.",
    where: "In orbit around the Moon.",
    mission: [["Mission", "Lunar Reconnaissance Orbiter (LRO), NASA"], ["Launch", "June 2009"], ["Status", "Active mission"]],
    purpose: "To make detailed maps of the Moon, look for water ice and help choose safe landing sites for future missions.",
    history: "LRO was designed for one year, but it has been mapping the Moon since 2009. Its camera has photographed the Apollo landers, rovers and even the astronauts' footpaths.",
    now: "LRO is still working. In August 2026 it photographed a fresh crater made when a Falcon 9 rocket stage hit the Moon.",
    working: "Yes — after more than 17 years.",
    facts: ["Its camera (LROC) has taken more than 2.6 million close-up images of the Moon."],
    builtBy: "Built and operated by NASA's Goddard Space Flight Center.",
    sources: [["NASA Science: LRO images new crater (2026)", "https://science.nasa.gov/?p=1277375"], ["SatNews: LROC operations contract (2026)", "https://satnews.com/2026/05/19/intuitive-machines-secures-prime-contracts-to-operate-key-nasa-and-kari-lunar-imaging-instruments/"]]
  }
];

/* ---------- Ще апарати NASA: посадки Surveyor, Apollo 12 і місця падінь ---------- */
const NSSDC = ["NASA NSSDC: lunar artifact sites and coordinates", "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_artifact_impacts.html"];
const RS = ["NASA Science: Lunar Rangers and Surveyors", "https://science.nasa.gov/mission/lunar-rangers-and-surveyors"];

MOON_SITES.push(
  {
    id: "apollo12", name: "Apollo 12 Lunar Module", type: "Landing site",
    lat: -3.0128, lon: -23.4219, coordsText: "3.01° S, 23.42° W",
    status: "silent", statusText: "Left behind in 1969",
    tagline: "The pinpoint landing right next to an older robot.",
    where: "On the surface of the Moon, in the Ocean of Storms, on the rim of Surveyor Crater.",
    mission: [["Mission", "Apollo 12, NASA"], ["Landed", "November 19, 1969"], ["Crew on the Moon", "Pete Conrad and Alan Bean"], ["Left behind", "Descent stage of the lunar module “Intrepid”"]],
    purpose: "To prove that a crewed lander could touch down exactly where planned — next to the robotic Surveyor 3 lander.",
    history: "Pete Conrad flew Intrepid around the edge of Surveyor Crater and landed close to Surveyor 3. On their second moonwalk the astronauts walked to the old robot and cut off parts of it to bring home.",
    endedTitle: "Why it stayed there",
    ended: "The descent stage worked as a launch pad for the return flight and was left on the Moon.",
    now: "LRO images show the descent stage, Surveyor 3 and the astronauts' footpaths between them.",
    working: "No — it was never meant to work after launch.",
    facts: ["Surveyor 3 is the only robot on another world ever visited by humans."],
    builtBy: "The lunar module was built by Grumman for NASA.",
    orbitView: ["LROC: Surveyor Crater, before and after (NASA/GSFC/ASU)", "https://www.lroc.asu.edu/images/609"],
    sources: [NSSDC, ["NASA: LRO looks at Apollo 12 and Surveyor 3 landing sites", "https://www.nasa.gov/missions/lunar-reconnaissance-orbiter-looks-at-apollo-12-surveyor-3-landing-sites/"]]
  },
  {
    id: "surveyor1", name: "Surveyor 1", type: "Robotic lander",
    lat: -2.4745, lon: -43.3398, coordsText: "2.47° S, 43.34° W",
    status: "silent", statusText: "Silent since 1967",
    tagline: "America's first soft landing on another world.",
    where: "On the surface of the Moon, in the Ocean of Storms, near Flamsteed crater.",
    mission: [["Mission", "Surveyor 1, NASA / JPL"], ["Launch", "May 30, 1966"], ["Landed", "June 2, 1966"], ["Last contact", "January 7, 1967"]],
    purpose: "To prove that a spacecraft could land gently on the Moon, and to check whether the ground was firm enough for Apollo astronauts.",
    history: "Surveyor 1 touched down on June 2, 1966, and sent back thousands of TV pictures, including close-ups of its own footpad pressing into the soil.",
    endedTitle: "Why it stopped",
    ended: "It survived several freezing lunar nights, but its batteries and electronics finally gave out. The last engineering data came in January 1967.",
    now: "The lander still stands in the Ocean of Storms.",
    working: "No.",
    facts: ["Its photos proved that the lunar soil would not swallow a landing spacecraft — good news for Apollo."],
    builtBy: "Built by Hughes Aircraft for NASA's Jet Propulsion Laboratory.",
    sources: [NSSDC, RS]
  },
  {
    id: "surveyor5", name: "Surveyor 5", type: "Robotic lander",
    lat: 1.4551, lon: 23.1943, coordsText: "1.46° N, 23.19° E",
    status: "silent", statusText: "Silent since 1967",
    tagline: "The first to measure what lunar soil is made of.",
    where: "On the surface of the Moon, in the Sea of Tranquility — about 25 km from where Apollo 11 later landed.",
    mission: [["Mission", "Surveyor 5, NASA / JPL"], ["Launch", "September 8, 1967"], ["Landed", "September 11, 1967"], ["Last transmission", "December 17, 1967"]],
    purpose: "To photograph the landing area and analyze the chemistry of the lunar soil.",
    history: "Its instrument found that the soil in the Sea of Tranquility is basalt — volcanic rock — which showed that the Moon had once melted. It sent back about 19,000 images.",
    endedTitle: "Why it stopped",
    ended: "Its final transmission came on December 17, 1967, after it had survived several lunar nights.",
    now: "The lander rests in the Sea of Tranquility, not far from Tranquility Base.",
    working: "No.",
    facts: ["It landed close to the spot where Apollo 11 touched down less than two years later."],
    builtBy: "Built by Hughes Aircraft for NASA's Jet Propulsion Laboratory.",
    sources: [NSSDC, RS]
  },
  {
    id: "surveyor6", name: "Surveyor 6", type: "Robotic lander",
    lat: 0.4742, lon: -1.4275, coordsText: "0.47° N, 1.43° W",
    status: "silent", statusText: "Silent since 1967",
    tagline: "The first spacecraft to take off from the Moon — by 4 metres.",
    where: "On the surface of the Moon, in Sinus Medii, near the centre of the near side.",
    mission: [["Mission", "Surveyor 6, NASA / JPL"], ["Launch", "November 7, 1967"], ["Landed", "November 10, 1967"], ["Hop", "November 17, 1967"]],
    purpose: "To study a possible Apollo landing site and test whether rocket engines could be restarted on the Moon.",
    history: "On November 17, 1967, controllers fired its engines for 2.5 seconds. The lander rose about 4 metres, moved sideways and landed again — the first liftoff from the Moon.",
    endedTitle: "Why it stopped",
    ended: "It was shut down for the lunar night. Contact was made again on December 14, 1967, but no useful data came back.",
    now: "The lander rests in Sinus Medii.",
    working: "No.",
    facts: ["Its short hop let scientists photograph the same ground from two places and see it in 3D."],
    builtBy: "Built by Hughes Aircraft for NASA's Jet Propulsion Laboratory.",
    sources: [NSSDC, RS]
  },
  {
    id: "surveyor7", name: "Surveyor 7", type: "Robotic lander",
    lat: -40.9812, lon: -11.5127, coordsText: "40.98° S, 11.51° W",
    status: "silent", statusText: "Silent since 1968",
    tagline: "The last Surveyor — landed in the rugged highlands near Tycho.",
    where: "On the surface of the Moon, on the outer rim of Tycho crater.",
    mission: [["Mission", "Surveyor 7, NASA / JPL"], ["Launch", "January 7, 1968"], ["Landed", "January 10, 1968"], ["Last contact", "February 21, 1968"]],
    purpose: "With the Apollo sites already checked, Surveyor 7 went to a purely scientific target: the bright highlands near Tycho.",
    history: "It photographed boulders and dug into the soil with its scoop. It even spotted laser beams fired at it from Earth.",
    endedTitle: "Why it stopped",
    ended: "Its battery was damaged during the first lunar night, and contact was lost on February 21, 1968.",
    now: "The lander stands on the rim of Tycho, one of the brightest craters on the Moon.",
    working: "No.",
    facts: ["It was the only Surveyor to land in the lunar highlands."],
    builtBy: "Built by Hughes Aircraft for NASA's Jet Propulsion Laboratory.",
    sources: [NSSDC, RS]
  },
  {
    id: "ranger7", name: "Ranger 7", type: "Impact site", kind: "impact",
    lat: -10.634, lon: -20.677, coordsText: "10.63° S, 20.68° W",
    status: "silent", statusText: "Crashed on purpose, 1964",
    tagline: "The first American close-up photos of the Moon — taken while falling.",
    where: "Crash site in Mare Cognitum (the “Known Sea”).",
    mission: [["Mission", "Ranger 7, NASA / JPL"], ["Launch", "July 28, 1964"], ["Impact", "July 31, 1964"]],
    purpose: "To fly straight into the Moon and take pictures all the way down, to see what the surface looks like up close.",
    history: "After several failed Ranger missions, Ranger 7 worked perfectly. It sent back thousands of pictures, each one closer than the last, before crashing.",
    endedTitle: "How it ended",
    ended: "Crashing was the plan: the probe sent pictures until the very last moment of impact.",
    now: "Its pieces are scattered across the floor of Mare Cognitum.",
    working: "No.",
    facts: ["After Ranger 7, the area where it crashed was named Mare Cognitum — “the Sea that has become known”."],
    builtBy: "Built by NASA's Jet Propulsion Laboratory.",
    sources: [NSSDC, RS]
  },
  {
    id: "prospector", name: "Lunar Prospector", type: "Impact site", kind: "impact",
    lat: -87.7, lon: 42.0, coordsText: "87.7° S, 42.0° E",
    status: "silent", statusText: "Crashed on purpose, 1999",
    tagline: "It searched for ice — and carried a famous scientist's ashes.",
    where: "Crash site in a dark crater near the Moon's south pole.",
    mission: [["Mission", "Lunar Prospector, NASA"], ["Launch", "January 1998"], ["Impact", "July 31, 1999"]],
    purpose: "To map the Moon's surface chemistry and look for signs of water ice at the poles.",
    history: "Lunar Prospector found hints of hydrogen — a possible sign of ice — at both poles. At the end of its mission it was steered into a permanently shadowed crater, in case the crash released visible water vapour.",
    endedTitle: "How it ended",
    ended: "It was deliberately crashed on July 31, 1999. No water vapour was seen from Earth.",
    now: "Its remains lie in a crater near the south pole.",
    working: "No.",
    facts: ["It carried some of the ashes of planetary scientist Eugene Shoemaker — the only person whose remains rest on the Moon."],
    builtBy: "Built by Lockheed Martin for NASA.",
    sources: [NSSDC]
  },
  {
    id: "lcross", name: "LCROSS", type: "Impact site", kind: "impact",
    lat: -84.719, lon: -49.61, coordsText: "84.72° S, 49.61° W",
    status: "silent", statusText: "Crashed on purpose, 2009",
    tagline: "It crashed into the Moon on purpose — and found water.",
    where: "Crash site in Cabeus crater, near the Moon's south pole.",
    mission: [["Mission", "LCROSS, NASA"], ["Launch", "June 18, 2009, together with LRO"], ["Impact", "October 9, 2009"]],
    purpose: "To smash a used rocket stage into a dark polar crater and study the cloud of debris for water.",
    history: "First the empty Centaur rocket stage hit Cabeus crater. LCROSS flew through the debris cloud, measured it, and then crashed a few minutes later.",
    endedTitle: "How it ended",
    ended: "Both the Centaur stage and the LCROSS spacecraft impacted on October 9, 2009, as planned.",
    now: "The impact sites are in Cabeus crater. The measurements showed water ice in the lunar soil.",
    working: "No.",
    facts: ["There are two impact sites here — the rocket stage and the spacecraft itself."],
    builtBy: "Built by Northrop Grumman; managed by NASA's Ames Research Center.",
    sources: [NSSDC]
  },
  {
    id: "grail", name: "GRAIL Ebb & Flow", type: "Impact site", kind: "impact",
    lat: 75.63, lon: -26.71, coordsText: "75.6° N, 26.7° W",
    status: "silent", statusText: "Crashed on purpose, 2012",
    tagline: "Twin probes that mapped the Moon's gravity.",
    where: "Two crash sites on a mountain near the Moon's north pole.",
    mission: [["Mission", "GRAIL, NASA"], ["Launch", "September 10, 2011"], ["Impact", "December 17, 2012"]],
    purpose: "Two identical probes, Ebb and Flow, flew one after the other and measured tiny changes in the distance between them to map the Moon's gravity.",
    history: "They made the most detailed gravity map of the Moon ever, revealing what lies beneath its surface.",
    endedTitle: "How it ended",
    ended: "Low on fuel, both probes were steered into a mountain near the north pole on December 17, 2012.",
    now: "NASA named the impact site after Sally Ride, the first American woman in space, who led the mission's education program.",
    working: "No.",
    facts: ["Middle-school students chose the names of the probes — and controlled their cameras."],
    builtBy: "Built by Lockheed Martin; managed by NASA's Jet Propulsion Laboratory.",
    sources: [NSSDC]
  },
  {
    id: "ladee", name: "LADEE", type: "Impact site", kind: "impact",
    lat: 11.8494, lon: -93.2494, coordsText: "11.85° N, 93.25° W",
    status: "silent", statusText: "Crashed on purpose, 2014",
    tagline: "It studied the Moon's thin air and dust.",
    where: "Crash site on the far side of the Moon, near Sundman V crater.",
    mission: [["Mission", "LADEE, NASA"], ["Launch", "September 2013"], ["Impact", "April 18, 2014"]],
    purpose: "To study the Moon's extremely thin atmosphere and the dust floating above its surface.",
    history: "LADEE flew very low over the Moon and measured gases and dust. Its mission was planned to end with a crash.",
    endedTitle: "How it ended",
    ended: "Out of fuel, it impacted the far side on April 18, 2014. LRO later photographed the new crater.",
    now: "Its crater lies on the far side, which can never be seen from Earth.",
    working: "No.",
    facts: ["It also tested laser communication between the Moon and Earth."],
    builtBy: "Built and managed by NASA's Ames Research Center.",
    sources: [NSSDC]
  }
);

MOON_ORBITERS.push(
  {
    id: "artemisp1", name: "ARTEMIS P1", type: "Orbiter",
    orbit: { r: 1.3, inc: 9, node: 140, speed: 0.0048, phase: 2.5 },
    orbitText: "Elliptical, near-equatorial lunar orbit",
    status: "active", statusText: "Active mission",
    tagline: "Built for Earth, re-sent to the Moon.",
    where: "In orbit around the Moon.",
    mission: [["Mission", "THEMIS-ARTEMIS, NASA"], ["Launch", "February 2007 (as THEMIS-B)"], ["Lunar orbit", "June 27, 2011"]],
    purpose: "To study how the Sun's wind of particles hits the Moon, which has no global magnetic field to protect it.",
    history: "P1 started life as THEMIS-B, studying auroras around Earth. In 2009 NASA sent it on a long journey to the Moon. On the way it became the first spacecraft to orbit an Earth–Moon Lagrange point.",
    now: "Together with its twin P2, it keeps measuring the space environment around the Moon.",
    working: "Yes — NASA lists THEMIS-ARTEMIS as an active mission.",
    facts: ["Its name stands for Acceleration, Reconnection, Turbulence and Electrodynamics of the Moon's Interaction with the Sun."],
    builtBy: "Built and operated by the Space Sciences Laboratory, UC Berkeley, for NASA.",
    sources: [["NASA Science: THEMIS-ARTEMIS", "https://science.nasa.gov/mission/themis-artemis"]]
  },
  {
    id: "artemisp2", name: "ARTEMIS P2", type: "Orbiter",
    orbit: { r: 1.42, inc: 6, node: 260, speed: 0.0038, phase: 4.5 },
    orbitText: "Elliptical, near-equatorial lunar orbit",
    status: "active", statusText: "Active mission",
    tagline: "The twin of P1, on the opposite side of the Moon.",
    where: "In orbit around the Moon.",
    mission: [["Mission", "THEMIS-ARTEMIS, NASA"], ["Launch", "February 2007 (as THEMIS-C)"], ["Lunar orbit", "July 17, 2011"]],
    purpose: "Together with P1, it measures the same space from two places at once.",
    history: "P2 was THEMIS-C. It arrived at the Earth–Moon L1 point in October 2010 and entered lunar orbit on July 17, 2011, after a two-year journey.",
    now: "It keeps working alongside P1.",
    working: "Yes — NASA lists THEMIS-ARTEMIS as an active mission.",
    facts: ["Its journey to the Moon used very little fuel by riding gravity boosts."],
    builtBy: "Built and operated by the Space Sciences Laboratory, UC Berkeley, for NASA.",
    sources: [["NASA Science: THEMIS-ARTEMIS", "https://science.nasa.gov/mission/themis-artemis"]]
  }
);

/* ---------- Дати: arrived — прибув/сів; lastContact — останній зв'язок або день, коли астронавти полетіли ---------- */
const MOON_DATES = {
  apollo11: ["1969-07-20", null], lrv: ["1971-07-30", "1971-08-02"], surveyor3: ["1967-04-20", "1967-05-04"],
  odysseus: ["2024-02-22", "2024-02-29"], apollo14: ["1971-02-05", "1971-02-06"], apollo16: ["1972-04-21", "1972-04-24"],
  apollo17: ["1972-12-11", "1972-12-14"], apollo12: ["1969-11-19", "1969-11-20"],
  surveyor1: ["1966-06-02", "1967-01-07"], surveyor5: ["1967-09-11", "1967-12-17"], surveyor6: ["1967-11-10", "1967-12-14"],
  surveyor7: ["1968-01-10", "1968-02-21"], ranger7: ["1964-07-31", "1964-07-31"], prospector: ["1999-07-31", "1999-07-31"],
  lcross: ["2009-10-09", "2009-10-09"], grail: ["2012-12-17", "2012-12-17"], ladee: ["2014-04-18", "2014-04-18"],
  lro: ["2009-06-23", null], artemisp1: ["2011-06-27", null], artemisp2: ["2011-07-17", null]
};
const LEFT_BY_CREW = ["lrv", "apollo14", "apollo16", "apollo17", "apollo12"];
MOON_SITES.concat(MOON_ORBITERS).forEach(s => {
  const d = MOON_DATES[s.id]; if (d) { s.arrived = d[0]; s.lastContact = d[1]; }
  if (LEFT_BY_CREW.includes(s.id)) s.leftBehind = true;
});
MOON_SITES.find(s => s.id === "surveyor3").orbitView = ["LROC: Surveyor Crater, before and after (NASA/GSFC/ASU)", "https://www.lroc.asu.edu/images/609"];
MOON_SITES.find(s => s.id === "apollo14").orbitView = ["LROC: First look at the Apollo landing sites (NASA/GSFC/ASU)", "https://www.lroc.asu.edu/images/157"];
