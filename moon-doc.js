/* =====================================================
   ДОКУМЕНТ «Апарати NASA біля Місяця: 24 місії»
   1) нові об'єкти (поверхня, орбіта, проліт/втрачені)
   2) моделі, фото й факти для об'єктів, що вже були
   Підключати ПІСЛЯ moon-extra.js і moon-flybys.js.
   ===================================================== */

/* ---------- 1. Нові об'єкти на поверхні ---------- */
MOON_SITES.push(
  {
    id: "apollo13", name: "Apollo 13 S-IVB impact", type: "Impact site", kind: "impact",
    lat: -2.555, lon: -27.888, coordsText: "2.56° S, 27.89° W",
    model: "models/sivb.html",
    photo: "images/moon/apollo13-schema.jpg", photoCaption: "The Saturn V third stage (S-IVB). Image: NASA/MSFC",
    schema: "images/moon/apollo13-schema.jpg",
    status: "silent", statusText: "Crashed in 1970",
    tagline: "The only piece of Apollo 13 that reached the Moon’s surface — on purpose.",
    where: "On the surface of the Moon: a crater about 30 m wide north of Mare Cognitum.",
    mission: [["Mission", "Apollo 13 (Jim Lovell, Jack Swigert, Fred Haise)"], ["Impact", "April 14, 1970"], ["Speed", "2.58 km/s"], ["What hit", "Saturn V third stage (S-IVB)"]],
    purpose: "The crew was supposed to land at Fra Mauro. Before the accident, the rocket’s third stage was aimed at the Moon on purpose as a seismic experiment.",
    history: "After an oxygen tank exploded, the landing was cancelled and the lunar module “Aquarius” became a lifeboat. The S-IVB stage still hit the Moon as planned.",
    endedTitle: "Why it stayed there",
    ended: "Of the whole mission, only the S-IVB stage stayed on the Moon: it crashed into the surface and made a crater about 30 m across.",
    now: "LRO found the crater in 2010. The Apollo 12 seismometer, 135 km away, recorded the impact. The crew came home safely; “Aquarius” burned up in Earth’s atmosphere.",
    working: "No.",
    structure: ["S-IVB stage: about 17.8 m tall, 6.6 m wide, about 14 t when empty."],
    facts: [
      "After the impact, Mission Control told the crew their stage had made the Moon “ring”.",
      "The impact energy was about 1 kiloton.",
      "Flying around the Moon, the Apollo 13 crew set a record for the farthest humans from Earth — it stood until 2026."
    ],
    builtBy: "NASA; Saturn V rocket.",
    sources: [["NASA Photojournal — PIA12979", "https://photojournal.jpl.nasa.gov/catalog/PIA12979"], ["NASA SVS — Apollo 13 S-IVB Impact Site", "https://svs.gsfc.nasa.gov/4803"], ["LROC — coordinates of human features on the Moon", "https://www.lroc.asu.edu/data/support/downloads/2016_LROC_Coordinates_of_Human_Features.pdf"]]
  },
  {
    id: "blueghost1", name: "Blue Ghost Mission 1", type: "Commercial lander (NASA CLPS)",
    lat: 18.6, lon: 61.8, coordsText: "≈18.6° N, 61.8° E (Mare Crisium)",
    model: "models/blueghost.html",
    status: "silent", statusText: "Mission ended March 2025",
    tagline: "The first fully successful commercial landing on the Moon.",
    where: "On the surface of the Moon, in Mare Crisium near Mons Latreille.",
    mission: [["Mission", "Blue Ghost Mission 1, Firefly Aerospace / NASA CLPS"], ["Landed", "March 2, 2025"], ["Last signal", "March 17, 2025"], ["Data sent", "51 GB"]],
    purpose: "To deliver 10 NASA instruments to the Moon: a drill, tools to study dust and soil, a navigation-signal receiver, a new laser reflector and more.",
    history: "The lander worked for one lunar day — about 14 Earth days. The mission was completed on March 16, 2025.",
    endedTitle: "Why it stayed there",
    ended: "When the lunar night came, it shut down and stayed where it landed.",
    now: "It stands in Mare Crisium. The last signal was received on March 17, 2025.",
    working: "No.",
    structure: ["Lander on four legs with solar panels.", "10 NASA instruments, including the Next Generation Lunar Retroreflector."],
    facts: [
      "On March 14, 2025, it photographed a total solar eclipse from the Moon.",
      "It filmed a lunar sunset and checked the “horizon glow” that Gene Cernan saw on Apollo 17.",
      "It carried a new-generation laser reflector — a modern “descendant” of the Apollo reflectors."
    ],
    builtBy: "Firefly Aerospace (Texas) for NASA.",
    sources: [["NASA — Science continues after Firefly’s first Moon mission", "https://www.nasa.gov/news-release/nasa-science-continues-after-fireflys-first-moon-mission-concludes/"], ["Spaceflight Now — Blue Ghost Mission 1 concludes", "https://spaceflightnow.com/2025/03/18/firefly-aerospaces-blue-ghost-mission-1-concludes-successful-14-day-mission-on-the-moon/"]]
  },
  {
    id: "im2", name: "IM-2 Athena", type: "Commercial lander (NASA CLPS)",
    lat: -84.8, lon: 29.2, coordsText: "≈84.8° S, 29.2° E (approx., near Mons Mouton)",
    model: "models/odysseus.html",
    status: "silent", statusText: "Ended March 2025",
    tagline: "The southernmost landing on the Moon — but it ended up on its side.",
    where: "On the surface of the Moon, lying on its side in a cold crater near Mons Mouton, close to the south pole.",
    mission: [["Mission", "IM-2, Intuitive Machines / NASA CLPS"], ["Landed", "March 6, 2025"], ["Worked", "About 13 hours"], ["Lander", "Nova-C, 4.3 m tall"]],
    purpose: "To deliver NASA’s PRIME-1 drill and mass spectrometer to look for ice under the surface, plus a small rover, a hopping drone and a test mobile network.",
    history: "The lander came down on its side in a cold crater about 250 m from its target.",
    endedTitle: "Why it stayed there",
    ended: "Lying on its side, its solar panels could not charge the batteries, so the mission ended after about 13 hours.",
    now: "It lies on its side in the crater and does not work.",
    working: "No.",
    structure: ["Nova-C lander, 4.3 m tall (the same design as IM-1 Odysseus).", "PRIME-1 drill and mass spectrometer."],
    facts: [
      "The southernmost landing and surface operation on the Moon in history.",
      "Before the batteries died it sent NASA 250 MB of data, and the drill was tested through its full range of motion.",
      "The company’s previous lander, IM-1 Odysseus, also tipped over when it landed in 2024."
    ],
    builtBy: "Intuitive Machines (Houston) for NASA.",
    sources: [["Spaceflight Now — IM-2 ends with lander on its side", "https://spaceflightnow.com/2025/03/07/intuitive-machines-im-2-mission-ends-with-lander-on-its-side-on-the-moon/"], ["Space Insider — Athena collects data before power loss", "https://spaceinsider.tech/2025/03/08/intuitive-machines-lunar-lander-tips-over-but-collects-data-for-nasa-before-power-loss"]]
  }
);

/* ---------- 2. Новий апарат на орбіті ---------- */
MOON_ORBITERS.push({
  id: "capstone", name: "CAPSTONE", type: "CubeSat orbiter",
  orbit: { r: 1.95, inc: 88, node: 200, speed: 0.0025, phase: 1.2 },
  orbitText: "Near-rectilinear halo orbit (NRHO): ~1,600 km over one pole, ~70,000 km over the other",
  model: "models/capstone.html",
  status: "active", statusText: "Operating (last known)",
  tagline: "A microwave-sized CubeSat testing the orbit planned for NASA’s Gateway station.",
  where: "In orbit around the Moon.",
  mission: [["Mission", "CAPSTONE, Advanced Space / NASA"], ["Arrived", "November 13, 2022"], ["Launch", "Rocket Lab Electron, New Zealand"], ["Mass", "About 25 kg (12U CubeSat)"]],
  purpose: "To test the unusual stretched orbit (NRHO) where NASA planned to place the Gateway station, and to try the CAPS autonomous navigation system, which finds its position using links with LRO, not only signals from Earth.",
  history: "The main tasks were done in 2023; then the mission was extended to the end of 2025.",
  now: "It keeps flying; it is operated by the company Advanced Space.",
  working: "Yes, as far as the latest information shows.",
  structure: ["12U CubeSat, about 25 kg.", "Solar panels and its own engine.", "Radios for links with Earth and with LRO."],
  facts: [
    "The first spacecraft to fly an NRHO, and the first US commercial mission to the Moon.",
    "On the way to the Moon contact was lost several times, but the team managed to restore it."
  ],
  builtBy: "Advanced Space (owner and operator), Terran Orbital/Tyvak (platform), Rocket Lab (launch), NASA.",
  sources: [["NASA — CAPSTONE", "https://www.nasa.gov/capstone/"], ["NASA NTRS — CAPSTONE extended mission", "https://ntrs.nasa.gov/citations/20260001759"]],
  arrived: "2022-11-13", lastContact: null
});

/* ---------- 3. Пролітні, повернуті й втрачені ---------- */
MOON_FLYBYS.push(
  {
    id: "explorer35", name: "Explorer 35", type: "Lunar orbiter (crashed, site unknown)", flyby: true,
    model: "models/explorer35.html",
    photo: "images/moon/explorer35.jpg", photoCaption: "Explorer 35 (IMP-E) being prepared for launch. Photo: NASA",
    schema: "images/moon/explorer35-schema.jpg",
    orbitText: "Was in a stretched lunar orbit, ~800–7,700 km; later crashed",
    status: "silent", statusText: "Switched off in 1973",
    tagline: "It discovered that the Moon has no magnetosphere.",
    where: "First in lunar orbit; now its debris lies somewhere on the Moon — the impact site has never been found.",
    mission: [["Mission", "Explorer 35 (IMP-E), NASA Goddard"], ["Lunar orbit", "July 1967"], ["Switched off", "June 24, 1973"], ["Mass", "104.3 kg"]],
    purpose: "It studied the space around the Moon: interplanetary plasma, the magnetic field, high-energy particles and solar X-rays. From the changes in its orbit, scientists also studied the Moon’s gravity.",
    history: "It was built to work in lunar orbit from the start. It worked normally for 6 years.",
    endedTitle: "What happened",
    ended: "It was switched off on June 24, 1973, after finishing all its tasks. According to NASA it later fell onto the Moon; the exact place is unknown.",
    now: "Debris somewhere on the surface of the Moon.",
    working: "No. It was switched off in June 1973.",
    structure: ["Mass 104.3 kg.", "Spin-stabilized: it rotated around its axis.", "Magnetometers, plasma and energetic-particle detectors, an X-ray detector."],
    facts: [
      "Explorer 35 showed that the solar wind hits the Moon’s surface directly and leaves a “cavity” behind the Moon.",
      "Its data became the reference for the magnetic measurements Apollo astronauts later made on the surface.",
      "Its orbit was very stretched: about 800 to 7,700 km above the surface; one orbit took about 11.5 hours."
    ],
    builtBy: "NASA Goddard Space Flight Center (Explorer program).",
    sources: [["NASA Science — Explorer 35", "https://science.nasa.gov/mission/explorer-35/"], ["NASA NTRS — Lunar Explorer 35 (N. Ness, 1968)", "https://ntrs.nasa.gov/api/citations/19680016260/downloads/19680016260.pdf"]],
    arrived: "1967-07-22", lastContact: "1973-06-24", arrivedLabel: "Lunar orbit",
    eventText: "enters lunar orbit"
  },
  {
    id: "apollo8", name: "Apollo 8", type: "Crewed lunar orbit (returned)", flyby: true,
    model: "models/apollo-csm.html",
    photo: "images/moon/apollo8.jpg", photoCaption: "Saturn V and the Apollo command module. Image: NASA/MSFC",
    schema: "images/moon/apollo8-schema.jpg",
    orbitText: "10 orbits of the Moon, then home",
    status: "silent", statusText: "Mission ended 1968",
    tagline: "The first people to fly to the Moon — and to see Earthrise.",
    where: "Nothing on the Moon. The S-IVB stage orbits the Sun; the capsule is in a museum on Earth.",
    mission: [["Crew", "Frank Borman, Jim Lovell, William Anders"], ["Lunar orbit", "December 24, 1968"], ["Splashdown", "December 27, 1968"], ["Orbits", "10"]],
    purpose: "The first crewed flight to the Moon: to test the Apollo spacecraft on the way to the Moon, in lunar orbit and on the way back, check communications and photograph the surface, including possible landing sites.",
    history: "Apollo 8 made 10 orbits of the Moon and brought its crew home on December 27, 1968.",
    endedTitle: "Why nothing stayed",
    ended: "Apollo 8 left nothing on the Moon. The spent third stage (S-IVB) was sent into orbit around the Sun.",
    now: "The S-IVB still orbits the Sun. The crew capsule is kept in a museum.",
    working: "No. The mission ended in December 1968.",
    structure: ["Command module — a capsule for three astronauts.", "Service module with the SPS main engine, which put the ship into lunar orbit and brought it home.", "Three-stage Saturn V rocket."],
    facts: [
      "The Apollo 8 crew were the first humans to see the far side of the Moon with their own eyes.",
      "William Anders took the famous “Earthrise” photograph.",
      "It was the first crewed flight of the Saturn V.",
      "There was no lunar module on board — a dummy flew in its place because the real one was not ready."
    ],
    builtBy: "NASA. Command and service modules — North American Rockwell; Saturn V rocket.",
    sources: [["NASA — Apollo 8: Mission Details", "https://www.nasa.gov/history/apollo-8-mission-details/"], ["NASA SP-350 — Apollo Expeditions to the Moon", "https://www.nasa.gov/wp-content/uploads/static/history/SP-350/ch-9-5.html"]],
    arrived: "1968-12-24", lastContact: "1968-12-27", returned: true, arrivedLabel: "Lunar orbit",
    eventText: "— first humans orbit the Moon"
  },
  {
    id: "apollo10", name: "Apollo 10 “Snoopy”", type: "Crewed dress rehearsal", flyby: true,
    model: "models/apollo10-lm.html",
    photo: "images/moon/apollo10.jpg", photoCaption: "Lunar module “Snoopy” above the Moon, seen from “Charlie Brown”. Photo: NASA",
    orbitText: "Lunar orbit; the lunar module flew down to about 15 km",
    status: "silent", statusText: "Mission ended 1969",
    tagline: "The “dress rehearsal” for the first Moon landing — everything except touching down.",
    where: "The descent stage crashed somewhere on the Moon (site unknown). The ascent stage orbits the Sun.",
    mission: [["Crew", "Thomas Stafford, Eugene Cernan, John Young"], ["Lunar orbit", "May 1969"], ["Lowest point", "About 15 km over the Sea of Tranquility"], ["Mission ended", "May 26, 1969"]],
    purpose: "To test every step of the Apollo 11 landing except the landing itself. The lunar module “Snoopy” flew down to about 15 km over the Sea of Tranquility and scouted the future Apollo 11 site.",
    history: "“Snoopy” separated from the command module “Charlie Brown”, swooped down, then climbed back and docked again.",
    endedTitle: "Why parts stayed",
    ended: "The descent stage was dropped in orbit and, because of the Moon’s uneven gravity, later crashed. The ascent stage was fired past the Moon into orbit around the Sun.",
    now: "Snoopy’s ascent stage is the only lunar module ascent stage that survived and still flies in space. In 2019 astronomers suggested it may be asteroid 2018 AV2 (98% confidence), but it is not confirmed.",
    working: "No.",
    structure: ["Two-stage lunar module: descent stage (engine, legs, tanks) and ascent stage (crew cabin with its own engine).", "Command and service modules “Charlie Brown”."],
    facts: [
      "The spacecraft were named after “Peanuts” comic characters: the module “Snoopy”, the command module “Charlie Brown”.",
      "When the stages separated, the module suddenly began to spin, and the astronauts swore on live air.",
      "The ascent stage carried only the fuel that would have been left after a real landing — so the crew could not land “by accident”."
    ],
    builtBy: "NASA. Lunar module LM-4 — Grumman.",
    sources: [["NASA — Apollo 10 Mission Details", "https://www.nasa.gov/mission_pages/apollo/missions/apollo10.html"]],
    arrived: "1969-05-22", lastContact: "1969-05-26", returned: true, arrivedLabel: "Descent to 15 km",
    eventText: "“Snoopy” swoops to 15 km above the Moon"
  },
  {
    id: "explorer49", name: "Explorer 49", type: "Radio astronomy orbiter (lost)", flyby: true,
    model: "models/explorer49.html",
    orbitText: "Was in lunar orbit",
    status: "silent", statusText: "Silent since 1977",
    tagline: "A radio telescope that hid behind the Moon from Earth’s radio noise.",
    where: "First in lunar orbit; it probably crashed later. Its exact location is unknown.",
    mission: [["Mission", "Explorer 49 (Radio Astronomy Explorer B)"], ["Lunar orbit", "June 15, 1973"], ["Mission ended", "June 1975 (contact until August 1977)"], ["Mass", "About 330 kg"]],
    purpose: "Radio astronomy at very long wavelengths (25 kHz – 13.1 MHz): radio emission from the Sun, Jupiter, our Galaxy and other sources. It was put in lunar orbit so the Moon would block Earth’s radio noise.",
    history: "NASA declared the mission complete in June 1975, but contact was kept until August 1977.",
    endedTitle: "What happened",
    ended: "After contact was lost it probably fell onto the surface. Where exactly is unknown.",
    now: "Probably debris on the surface of the Moon.",
    working: "No.",
    structure: ["Mass about 330 kg; body 92 cm wide and 79 cm tall; power 25 W.", "Two V-shaped antennas, 230 m each; a 37 m dipole antenna; a 129 m damper boom.", "Radiometers and radio-burst receivers."],
    facts: [
      "Its four X-shaped antennas, each 230 m long, made it one of the largest spacecraft ever built.",
      "It was the last US mission to the Moon for 21 years — until Clementine in 1994."
    ],
    builtBy: "NASA Goddard Space Flight Center.",
    sources: [["NASA Science — Explorer 49", "https://science.nasa.gov/mission/explorer-49"]],
    arrived: "1973-06-15", lastContact: "1977-08-15", lastContactApprox: true, arrivedLabel: "Lunar orbit",
    eventText: "enters lunar orbit with 230 m antennas"
  },
  {
    id: "clementine", name: "Clementine", type: "Lunar orbiter (now orbits the Sun)", flyby: true,
    model: "models/clementine.html",
    orbitText: "Was in polar lunar orbit; now orbits the Sun",
    status: "silent", statusText: "Mission ended 1994",
    tagline: "It made the first global elevation map of the Moon — and hinted at polar ice.",
    where: "In orbit around the Sun.",
    mission: [["Mission", "Clementine (Deep Space Program Science Experiment)"], ["Lunar orbit", "February 19, 1994"], ["Left the Moon", "May 3, 1994"], ["Mass", "424 kg"]],
    purpose: "Mainly to test lightweight sensors and components for defense programs. Along the way it took 1.8 million pictures of the Moon in two months and made its first global elevation map.",
    history: "On May 3, 1994, it left for the asteroid Geographos, but a technical fault cancelled the flyby. On July 20, 1994, the Moon’s gravity flung it into orbit around the Sun.",
    endedTitle: "What happened",
    ended: "The mission ended on August 8, 1994; contact was briefly restored in 1995.",
    now: "It orbits the Sun.",
    working: "No.",
    structure: ["Mass 424 kg.", "9 science instruments: UV, visible and infrared cameras and a laser rangefinder.", "15 test components; lightweight gallium-arsenide solar panels."],
    facts: [
      "Clementine’s radar gave the first hint of water ice in permanently shadowed craters at the south pole (announced in December 1996).",
      "It found places near the poles that are lit by the Sun almost all the time — handy for future bases.",
      "It was the first US spacecraft to the Moon in more than 20 years."
    ],
    builtBy: "Ballistic Missile Defense Organization (BMDO) and NASA. Built by the US Naval Research Laboratory; sensors by Lawrence Livermore National Laboratory.",
    sources: [["NASA Science — Clementine", "https://science.nasa.gov/mission/clementine"], ["NASA History — 30 Years Ago: Clementine", "https://www.nasa.gov/history/30-years-ago-clementine-changes-our-view-of-the-moon"]],
    arrived: "1994-02-19", lastContact: "1994-08-08", arrivedLabel: "Lunar orbit",
    eventText: "maps the whole Moon"
  },
  {
    id: "artemis1", name: "Artemis I (Orion)", type: "Uncrewed test flight (returned)", flyby: true,
    model: "models/orion.html",
    flybyKm: 130, flybyDate: "November 21, 2022",
    orbitText: "Flyby at 130 km, then a distant retrograde orbit",
    status: "silent", statusText: "Mission ended 2022",
    tagline: "The first test of the SLS rocket and the Orion spacecraft.",
    where: "On Earth — nothing was left at the Moon.",
    mission: [["Mission", "Artemis I (no crew)"], ["Lunar flyby", "November 21, 2022, 130 km"], ["Splashdown", "December 11, 2022"], ["Duration", "25.5 days"]],
    purpose: "The first test of the SLS rocket and Orion spacecraft. The main goal was to test the heat shield on return from the Moon at about 11 km/s.",
    history: "Orion spent six days in a distant orbit around the Moon and returned to Earth on December 11, 2022.",
    endedTitle: "Why nothing stayed",
    ended: "Artemis I left nothing at the Moon.",
    now: "The capsule is on Earth. After the flight, unexpected cracks and lost material were found on the heat shield, so the re-entry path for Artemis II was changed.",
    working: "No. The mission is complete.",
    structure: ["SLS Block 1 rocket.", "Orion: a crew capsule with a 5 m heat shield, and the European Service Module."],
    facts: [
      "Orion went 432,210 km from Earth — a record for a spacecraft built for humans.",
      "In 25.5 days it flew more than 2.2 million km.",
      "On re-entry the heat shield reached about 2,760 °C."
    ],
    builtBy: "NASA; Orion — Lockheed Martin; service module — European Space Agency (Airbus).",
    sources: [["NASA NTRS — Artemis I (IAC 2023)", "https://ntrs.nasa.gov/api/citations/20230012789/downloads/IAC%202023Artemis%20I%20paper-FINALSTRIVES.pdf"]],
    arrived: "2022-11-21", lastContact: "2022-12-11", returned: true, arrivedLabel: "Flyby",
    eventText: "Orion flies 130 km above the Moon"
  },
  {
    id: "lunarflashlight", name: "Lunar Flashlight", type: "CubeSat (never reached the Moon)", flyby: true,
    model: "models/lunarflashlight.html",
    orbitText: "Orbiting the Sun",
    status: "silent", statusText: "Ended May 2023",
    tagline: "A briefcase-sized CubeSat that was meant to look for ice with lasers.",
    where: "In orbit around the Sun.",
    mission: [["Mission", "Lunar Flashlight, NASA JPL"], ["Launch", "December 11, 2022"], ["Mission ended", "May 12, 2023"], ["Mass", "A little over 14 kg (6U)"]],
    purpose: "To shine infrared lasers into permanently shadowed craters near the south pole and look for water ice by the reflected light.",
    history: "Soon after launch, three of its four engines lost thrust because of contaminated fuel lines.",
    endedTitle: "What happened",
    ended: "It could not enter lunar orbit, and NASA ended the mission on May 12, 2023. On May 17 it passed Earth at about 65,000 km and headed into deep space.",
    now: "In orbit around the Sun.",
    working: "No.",
    structure: ["6U CubeSat, a little over 14 kg.", "Four solar panels.", "Reflectometer with four infrared lasers."],
    facts: [
      "The first test beyond Earth orbit of an engine using “green”, less toxic propellant.",
      "The laser reflectometer worked — scientists are sure it would have found ice.",
      "The briefcase-sized craft was operated by students at Georgia Tech."
    ],
    builtBy: "NASA JPL; UCLA; NASA Marshall; operations — Georgia Tech.",
    sources: [["NASA JPL — NASA Calls End to Lunar Flashlight", "https://www.jpl.nasa.gov/news/nasa-calls-end-to-lunar-flashlight-after-some-tech-successes/"]],
    arrived: "2022-12-11", lastContact: "2023-05-12", arrivedLabel: "Launch",
    eventText: "launches — but its engines fail"
  },
  {
    id: "peregrine", name: "Peregrine", type: "Commercial lander (never reached the Moon)", flyby: true,
    model: "models/peregrine.html",
    orbitText: "Burned up in Earth’s atmosphere",
    status: "silent", statusText: "Burned up January 2024",
    tagline: "The first US commercial attempt to land on the Moon.",
    where: "It burned up in Earth’s atmosphere over the South Pacific (≈23.1° S, 176.6° W).",
    mission: [["Mission", "Peregrine Mission One, Astrobotic / NASA CLPS"], ["Launch", "January 8, 2024 (first Vulcan rocket)"], ["Planned site", "Sinus Viscositatis"], ["Re-entry", "January 18, 2024"]],
    purpose: "To land on the Moon with instruments from NASA and other customers, including tools to measure radiation, neutrons and the surface composition.",
    history: "Soon after separating from the rocket, a faulty valve caused a propellant leak, and landing became impossible.",
    endedTitle: "What happened",
    ended: "The lander was turned back toward Earth and burned up in the atmosphere on January 18, 2024.",
    now: "It no longer exists.",
    working: "No.",
    structure: ["Height 1.9 m.", "Payload up to 90 kg.", "Five main engines."],
    facts: [
      "Peregrine flew on the very first Vulcan rocket.",
      "Even without landing, every instrument that could be switched on sent back data from the flight.",
      "Its last picture showed the crescent Earth."
    ],
    builtBy: "Astrobotic (Pittsburgh); part of the payload for NASA; rocket — ULA.",
    sources: [["Spaceflight Now — Peregrine ends mission", "https://spaceflightnow.com/2024/01/19/astrobotics-peregrine-lunar-lander-ends-mission-in-fiery-reentry/"]],
    arrived: "2024-01-08", lastContact: "2024-01-18", arrivedLabel: "Launch",
    eventText: "launches — a leak stops the landing"
  },
  {
    id: "trailblazer", name: "Lunar Trailblazer", type: "Lunar orbiter (lost after launch)", flyby: true,
    model: "models/lunartrailblazer.html",
    orbitText: "Probably orbiting the Sun",
    status: "silent", statusText: "Lost in 2025",
    tagline: "Built to map water on the Moon — lost one day after launch.",
    where: "Probably in orbit around the Sun.",
    mission: [["Mission", "Lunar Trailblazer, NASA SIMPLEx"], ["Launch", "February 26, 2025"], ["Mission ended", "July 31, 2025"], ["Cost", "$72 million"]],
    purpose: "To make detailed maps of water on the Moon: in what form it exists, how much there is and where it is concentrated. It was to work in a 100 km polar orbit.",
    history: "Contact was lost a day after launch. A NASA review found that an error in the attitude-control software turned the solar panels away from the Sun.",
    endedTitle: "What happened",
    ended: "NASA ended the mission on July 31, 2025.",
    now: "Probably in orbit around the Sun.",
    working: "No.",
    structure: ["Small satellite.", "HVM3 infrared spectrometer and the Lunar Thermal Mapper."],
    facts: [
      "Its navigation and engines were modeled on the successful GRAIL mission.",
      "It launched on the same rocket as the IM-2 Athena lander."
    ],
    builtBy: "Caltech (science lead Bethany Ehlmann; operations — IPAC), NASA JPL (mission management, HVM3), Lockheed Martin (spacecraft).",
    sources: [["NASA — Lunar Trailblazer Moon Mission Ends", "https://www.nasa.gov/missions/small-satellite-missions/lunar-trailblazer/nasas-lunar-trailblazer-moon-mission-ends/"], ["NASA JPL — Lunar Trailblazer", "https://www.jpl.nasa.gov/missions/lunar-trailblazer/"]],
    arrived: "2025-02-26", lastContact: "2025-02-27", arrivedLabel: "Launch",
    eventText: "launches — contact lost a day later"
  },
  {
    id: "artemis2", name: "Artemis II (Orion “Integrity”)", type: "Crewed lunar flyby (returned)", flyby: true,
    model: "models/orion.html",
    flybyKm: 6545, flybyDate: "April 6, 2026",
    orbitText: "Flew around the Moon, over the far side",
    status: "silent", statusText: "Mission ended April 2026",
    tagline: "Four astronauts flew around the Moon — farther from Earth than any humans before.",
    where: "On Earth — nothing was left at the Moon.",
    mission: [["Crew", "Reid Wiseman, Victor Glover, Christina Koch, Jeremy Hansen"], ["Launch", "April 1, 2026"], ["Lunar flyby", "April 6, 2026"], ["Splashdown", "April 10, 2026, near San Diego"]],
    purpose: "The first crewed flight of the SLS rocket and Orion: to test all systems with people on board and to observe the Moon.",
    history: "The Orion spacecraft “Integrity” flew around the Moon and splashed down in the Pacific Ocean near San Diego on April 10, 2026.",
    endedTitle: "Why nothing stayed",
    ended: "Nothing was left at the Moon. The flight lasted 10 days.",
    now: "The crew and the capsule are on Earth.",
    working: "No. The mission is complete.",
    structure: ["SLS Block 1 rocket.", "Orion spacecraft with the European Service Module."],
    facts: [
      "The crew went 406,771 km from Earth — a new record for humans, beating Apollo 13 from 1970.",
      "During the flyby the astronauts saw a total solar eclipse that could not be seen from Earth.",
      "In total the spacecraft flew more than 1.1 million km."
    ],
    builtBy: "NASA and the Canadian Space Agency; Orion — Lockheed Martin; service module — European Space Agency.",
    sources: [["NASA — Artemis II crew eclipses record", "https://www.nasa.gov/news-release/nasas-artemis-ii-crew-eclipses-record-for-farthest-human-spaceflight"]],
    arrived: "2026-04-06", lastContact: "2026-04-10", returned: true, arrivedLabel: "Flyby",
    eventText: "carries four astronauts around the Moon"
  }
);

/* ---------- 4. Нові дати для поверхні ---------- */
Object.assign(MOON_DATES, { apollo13: ["1970-04-14", "1970-04-14"], blueghost1: ["2025-03-02", "2025-03-17"], im2: ["2025-03-06", "2025-03-07"] });
MOON_SITES.forEach(s => { const d = MOON_DATES[s.id]; if (d && !s.arrived) { s.arrived = d[0]; s.lastContact = d[1]; } });

/* ---------- 5. Доповнення для об'єктів, які вже були на сайті ---------- */
const MOON_DOC_ADD = {
  apollo12: { model: "models/apollo-lm.html", photo: "images/moon/apollo12.jpg", photoCaption: "Alan Bean sets up experiments next to the lunar module “Intrepid” and the S-band antenna, Apollo 12. Photo: NASA",
    facts: ["Lightning struck the rocket twice during launch, but the flight went on.", "The module landed only about 180 m from Surveyor 3.", "The landing site was named Statio Cognitum on lunar maps.", "Its ALSEP station sent data for more than 7 years, until September 1977."] },
  apollo14: { model: "models/apollo-lm.html",
    facts: ["Alan Shepard, the first American in space, became the oldest person on the Moon at 47.", "Docking with the lunar module worked only on the sixth try.", "The MET hand cart kept getting stuck — and the crew lost a bet to the backup crew.", "Its laser reflector is passive and is still used to measure the distance to the Moon."] },
  apollo16: { model: "models/lrv.html",
    facts: ["The rover drove 26.7 km; the farthest the astronauts got from the module was 4.5 km.", "Geologists hoped for volcanic rocks, but the highlands turned out to be formed by impacts.", "The first telescope on the Moon — an ultraviolet camera — was set up here.", "Charlie Duke left a family photo on the surface."] },
  apollo17: { model: "models/lrv.html",
    facts: ["Harrison Schmitt was the first professional geologist to work on the Moon.", "The rover drove 30.5 km.", "Before leaving, Cernan drew his daughter’s initials in the dust.", "The Taurus-Littrow valley is deeper than the Grand Canyon."] },
  prospector: { model: "models/prospector.html",
    facts: ["Eugene Shoemaker dreamed of flying to the Moon but failed the astronaut medical exam.", "It hit the crater at about 6,100 km/h.", "Its neutron spectrometer found hydrogen at both poles."] },
  lcross: { model: "models/lcross.html",
    facts: ["On November 13, 2009, NASA announced that water was found in the impact plume.", "Besides water, the instruments found traces of other substances, including sodium and carbon dioxide.", "LRO flew over the impact site 90 seconds later and watched it too.", "In August 2009 LCROSS lost half its fuel in a fault, but still completed the mission."] },
  grail: { model: "models/grail.html",
    facts: ["The site was named after Sally Ride, the first American woman in space.", "The two probes hit about 30 seconds apart at 6,050 km/h.", "GRAIL made the most precise gravity map of any celestial body."] },
  ladee: { model: "models/ladee.html",
    facts: ["It was the first Moon mission launched from Wallops in Virginia.", "A frog thrown into the air by the launch blast appeared in a famous launch photo."] },
  lro: { model: "models/lro.html",
    facts: ["LRO keeps the largest data set of any planetary mission — more than 1.6 petabytes.", "It helped find the crash site of India’s Vikram lander and the landing site of China’s Chang’e 4.", "Its data show that the Moon has been shrinking recently — and may still be shrinking."] },
  artemisp1: { model: "models/artemis-probe.html", facts: ["The name ARTEMIS appeared before NASA’s crewed Artemis program."] },
  artemisp2: { model: "models/artemis-probe.html", facts: ["The trip from Earth to lunar orbit took about two years."] }
};
MOON_SITES.concat(MOON_ORBITERS).forEach(s => {
  const a = MOON_DOC_ADD[s.id]; if (!a) return;
  ["model", "photo", "photoCaption", "schema"].forEach(k => { if (a[k] && !s[k]) s[k] = a[k]; });
  if (a.facts) s.facts = (s.facts || []).concat(a.facts.filter(f => !(s.facts || []).includes(f)));
});
