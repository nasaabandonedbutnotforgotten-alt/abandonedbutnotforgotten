/* =====================================================
   ДАНІ ПРО АПАРАТИ НА МАРСІ
   Взято з нашого документа (джерела — NASA).
   lat — широта (+ північ, − південь)
   lon — довгота (+ схід, − захід). 354.64° сх. = −5.36°
   status: "active" (працює) або "silent" (не працює)
   ===================================================== */
const MARS_SITES = [
  {
    id: "opportunity",
    name: "Opportunity",
    type: "Rover",
    lat: -2.23, lon: -5.36,
    coordsText: "2.23° S, 354.64° E",
    status: "silent",
    statusText: "Silent since 2018",
    tagline: "Built for 90 days, it worked for almost 15 years.",
    model: "models/opportunity.html",          // 3D-модель (зробила Даяна)
    photo: "images/mars/opportunity.jpg",
    photoCaption: "Opportunity's self-portrait on its 5,000th Martian day. Photo: NASA",
    schema: "images/mars/opportunity-schema.jpg",
    mission: [
      ["Mission", "Mars Exploration Rover (MER-B), NASA / JPL"],
      ["Launch", "July 7, 2003"],
      ["Landed", "January 24, 2004 (Pacific time), Meridiani Planum"],
      ["Last contact", "June 10, 2018"],
      ["Mission ended", "February 13, 2019"],
      ["Distance driven", "More than 45 km"]
    ],
    purpose: "To search rocks and soil for signs of the water that once existed on Mars. Opportunity was the twin of the Spirit rover and ran on solar power.",
    history: "It was designed for 90 Martian days and about 1 km of driving. Instead, it outlived its planned lifetime about 60 times over. The rover confirmed that ancient Mars had liquid water: right at its landing site it found hematite, a mineral that forms in water, and later it found strong signs of ancient water at Endeavour Crater. It set the record for the longest drive beyond Earth, a one-day record (220 m) and a record for climbing a 32° slope.",
    endedTitle: "Why the mission ended",
    ended: "In June 2018, a planet-wide dust storm blocked the Sun, and the solar panels almost stopped producing power. After the last contact on June 10, engineers spent more than 8 months sending over a thousand commands to the rover, but it never answered. On February 13, 2019, NASA declared the mission complete.",
    now: "The rover sits halfway down Perseverance Valley on the western rim of Endeavour Crater. On September 20, 2018, the HiRISE camera on the Mars Reconnaissance Orbiter (MRO) spotted it from about 268 km up as a tiny dot. It does not respond. Most likely it is covered in dust, and its electronics may not have survived the cold nights without heating.",
    working: "No. Contact was lost on June 10, 2018, and the mission ended on February 13, 2019. The cause was a planet-wide dust storm: it blocked the Sun, and the solar panels stopped charging the batteries.",
    structure: [
      "Six wheels on a “rocker-bogie” suspension that lets it climb over rocks bigger than its wheels.",
      "Solar panels and batteries.",
      "A mast with the Pancam panoramic camera and navigation cameras.",
      "A robotic arm with a microscope, two spectrometers and the RAT tool for grinding rock surfaces.",
      "The Mini-TES infrared spectrometer and antennas for talking to Earth and to orbiters.",
      "Mass: about 180 kg."
    ],
    where: "On the surface of Mars, in Endeavour Crater.",
    facts: [
      "The famous line “My battery is low and it's getting dark” is actually a poetic retelling by a journalist. Opportunity only sent technical data about its power level and how clear the sky was.",
      "In 2015 it became the first to cover a marathon distance (42.2 km) beyond Earth. To celebrate, the team ran its own marathon at JPL.",
      "In 2005 Opportunity found Heat Shield Rock — the first meteorite identified on another planet. It was lying next to the rover's own discarded heat shield.",
      "It took its last 360° panorama from May 13 to June 10, 2018. Some frames stayed black and white: the rover didn't manage to shoot them through its color filters before the storm arrived."
    ],
    builtBy: "The rover was built by NASA's Jet Propulsion Laboratory (JPL) in Pasadena. The science instruments were led by Cornell University under Steve Squyres; the Pancam panoramic camera was also developed at Cornell.",
    sources: [
      ["JPL: NASA's Opportunity Rover Mission on Mars Comes to End (2019)", "https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/"],
      ["NASA: Opportunity After the Dust Storm (PIA22549)", "https://science.nasa.gov/resource/opportunity-after-the-dust-storm/"],
      ["JPL: Opportunity Legacy Pan (PIA22909)", "https://www.jpl.nasa.gov/images/pia22909-opportunity-legacy-pan-true-color/"],
      ["NASA: Opportunity's self-portrait on its 5,000th sol (PIA22222)", "https://science.nasa.gov/photojournal/opportunitys-first-selfie/"]
    ]
  },

  {
    id: "insight",
    name: "InSight",
    type: "Lander",
    lat: 4.502384, lon: 135.623447,
    coordsText: "4.502384° N, 135.623447° E",
    status: "silent",
    statusText: "Mission ended in 2022",
    tagline: "The first mission to look inside Mars by listening to marsquakes.",
    model: "models/insight.html",          // 3D-модель (зробила Даяна)
    photo: "images/mars/insight.jpg",
    photoCaption: "InSight's final selfie, covered in dust (PIA25287). Photo: NASA",
    schema: "images/mars/insight-schema.jpg",
    mission: [
      ["Mission", "InSight (Discovery Program), NASA / JPL, Lockheed Martin"],
      ["Launch", "May 5, 2018, Atlas V rocket"],
      ["Landed", "November 26, 2018, Elysium Planitia"],
      ["Last contact", "December 15, 2022"],
      ["Mission ended", "December 21, 2022"],
      ["Marsquakes recorded", "1,319"]
    ],
    purpose: "To study the inside of Mars: the size and makeup of its core, the thickness of its crust, the structure of its mantle and the heat flowing out of the planet. Its main tools were the French SEIS seismometer, the German HP³ heat probe (“the mole”) and weather sensors.",
    history: "InSight finished its main mission in the first two years, and then the mission was extended twice. The lander recorded 1,319 marsquakes. The strongest, about magnitude 5, happened in May 2022. From this data, scientists learned that Mars has a liquid core and a thinner crust than expected. Some quakes were caused by meteoroid impacts — one impact in December 2021 threw chunks of water ice onto the surface. The “mole” was the least lucky: the unusual sticky soil did not let it dig in, and the team gave up in early 2021.",
    endedTitle: "Why the mission ended",
    ended: "Dust slowly covered the solar panels. By May 2022 the lander was producing only about a tenth of the power it had at the start. The team switched off the instruments one by one; the seismometer worked the longest. After two missed contacts in a row, NASA declared the mission over on December 21, 2022.",
    now: "The lander stands still on Elysium Planitia near the equator, with its robotic arm folded forever in its “retirement pose”. NASA kept listening for a signal for a while, but thought it was unlikely. There has been no contact since. Scientists still use InSight's data in new research.",
    working: "No. The mission ended on December 21, 2022. Dust slowly covered the solar panels, the power kept dropping, and the lander stopped answering.",
    structure: [
      "A platform on three legs with two round solar panels — with them, the lander is about 6 m wide.",
      "A 1.8 m robotic arm with a grabber that placed the instruments on the ground.",
      "The SEIS seismometer under a dome that protected it from wind and temperature changes.",
      "The HP³ heat probe (“the mole”), which was supposed to dig into the ground.",
      "The RISE radio experiment: using the lander's antennas, scientists tracked how Mars wobbles.",
      "TWINS weather sensors, two cameras and a UHF antenna for talking to Earth through orbiters."
    ],
    where: "On the surface of Mars, on Elysium Planitia.",
    facts: [
      "Scientists measured Earth's core over hundreds of years and the Moon's core over 40 years after Apollo. InSight measured the core of Mars in about two years.",
      "It was NASA's first interplanetary launch from the US West Coast (Vandenberg base, California).",
      "Two MarCO CubeSats flew with it. They became the first CubeSats to reach another planet and relayed InSight's landing in real time.",
      "In December 2022, a final social media post in InSight's name said its power was very low and this might be the last picture it could send."
    ],
    builtBy: "The lander was built by Lockheed Martin Space, based on the Phoenix lander; JPL managed the mission. The SEIS seismometer came from the French space agency (CNES), and the HP³ heat probe from the German Aerospace Center (DLR).",
    sources: [
      ["NASA: NASA Retires InSight Mars Lander Mission After Years of Science (2022)", "https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/"],
      ["NASA/JPL Edu: How InSight Revealed the Heart of Mars", "https://www.jpl.nasa.gov/edu/resources/teachable-moment/how-insight-revealed-the-heart-of-mars/"],
      ["NASA: InSight's Final Selfie (PIA25287)", "https://science.nasa.gov/photojournal/insights-final-selfie/"]
    ]
  },

  {
    id: "ingenuity",
    name: "Ingenuity",
    type: "Helicopter",
    lat: 18.44, lon: 77.23,
    coordsText: "18.44° N, 77.23° E",
    status: "silent",
    statusText: "Grounded since 2024",
    tagline: "The first aircraft to make a controlled flight on another planet.",
    model: "models/ingenuity.html",          // 3D-модель (зробила Даяна)
    photo: "images/mars/ingenuity.jpg",
    photoCaption: "Ingenuity after its fifth flight, seen by Perseverance (PIA24648). Photo: NASA",
    schema: "images/mars/ingenuity-schema.jpg",
    mission: [
      ["Mission", "Mars 2020 (with Perseverance), NASA / JPL"],
      ["Launch", "July 30, 2020, under the belly of the Perseverance rover"],
      ["Arrived", "February 18, 2021, Jezero Crater"],
      ["First flight", "April 19, 2021 (39 seconds)"],
      ["Mission ended", "January 25, 2024"],
      ["Result", "72 flights, more than 2 hours in the air, about 17 km"]
    ],
    purpose: "A technology demonstration: to prove that controlled flight is possible in the Martian atmosphere, which is only about 1% as dense as Earth's. The 1.8 kg helicopter was planned to fly up to five times within 30 days.",
    history: "After five successful flights, Ingenuity became an aerial scout for Perseverance: it photographed the terrain ahead and helped plan the rover's routes. Over almost three years it made 72 flights, climbed as high as 24 m and flew about 14 times farther than planned. It survived a Martian winter, dust storms and several emergency landings.",
    endedTitle: "Why the mission ended",
    ended: "On January 18, 2024, during its 72nd flight, the helicopter landed hard and broke its rotor blades. NASA then carried out the first-ever aircraft accident investigation on another planet. According to the findings published in December 2024, the camera-based navigation system could not track the smooth, almost featureless sand ripples. The helicopter touched down with a lot of sideways speed, hit a slope and tipped over, damaging its blades.",
    now: "Ingenuity stands upright on top of a sand ripple at a place the team named Valinor Hills, in Jezero Crater. On April 16, 2024, it sent a farewell message. Under its updated program it is supposed to keep checking its systems every day, taking photos of the surface and recording temperatures. In December 2024, NASA reported that the helicopter was sending weather and avionics data to Perseverance about once a week. Since then the rover has driven far away, and NASA has not published news about whether this link still works. Data recorded after contact was lost can only be read when a future mission reaches it.",
    working: "No, it doesn't fly. On January 18, 2024, during its 72nd flight, it landed hard and broke its blades, so the mission ended on January 25, 2024. After that, the helicopter kept working for a while as a stationary weather station.",
    structure: [
      "A box-shaped body with electronics, batteries and heaters.",
      "Two rotors, 1.2 m across, spinning in opposite directions at about 2,400 rpm — four carbon-fiber blades in total.",
      "Swashplates with servo motors that change the angle of the blades to steer.",
      "A solar panel above the rotors to charge the batteries.",
      "Four thin legs.",
      "Two cameras: a black-and-white navigation camera and a color camera. Mass: 1.8 kg, height: about 49 cm."
    ],
    where: "It flew in the atmosphere of Mars — the only spacecraft on our list that flew through the air. Now it stands still on the surface of Mars.",
    facts: [
      "It carries a small piece of fabric from the wing of the Wright brothers' Flyer, the first airplane to fly on Earth in 1903.",
      "The site of its first flight is officially called Wright Brothers Field, and its last one is Valinor Hills — named after the land of the immortals in Tolkien's books.",
      "The helicopter ran on a commercial processor that had never been tested in space before. In 2026, Perseverance began using the processor of Ingenuity's base station to work out its own location, to within about 25 cm.",
      "The team said goodbye with a “Final Comms” chocolate cake, and in its farewell message the helicopter sent back the names of everyone who worked on the mission."
    ],
    builtBy: "The helicopter was designed and built by NASA's Jet Propulsion Laboratory (JPL). AeroVironment made the rotors, landing gear and solar panel base, SolAero made the solar panel, and Qualcomm the processor. Lockheed Martin Space designed the system that held the helicopter under Perseverance. NASA's Ames and Langley centers also helped.",
    sources: [
      ["NASA: After Three Years on Mars, NASA's Ingenuity Helicopter Mission Ends (2024)", "https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/"],
      ["JPL: NASA's Ingenuity Mars Helicopter Team Says Goodbye … for Now (2024)", "https://www.jpl.nasa.gov/news/nasas-ingenuity-mars-helicopter-team-says-goodbye-for-now/"],
      ["EarthSky: NASA report on Ingenuity's accident (December 2024)", "https://earthsky.org/space/nasa-report-ingenuity-mars-helicopter-accident/"],
      ["NASA: Ingenuity at 'Valinor Hills' (PIA26237)", "https://science.nasa.gov/photojournal/ingenuity-at-valinor-hills/"],
      ["JPL: Perseverance Now Autonomously Pinpoints Its Location on Mars (2026)", "https://www.jpl.nasa.gov/news/nasas-perseverance-now-autonomously-pinpoints-its-location-on-mars/"],
      ["NASA: Mastcam-Z Views Ingenuity After Fifth Flight (PIA24648)", "https://science.nasa.gov/photojournal/mastcam-z-views-ingenuity-after-fifth-flight/"]
    ]
  },

  {
    id: "curiosity",
    name: "Curiosity",
    type: "Rover",
    lat: -4.75, lon: 137.42,
    coordsText: "4.75° S, 137.42° E",
    status: "active",
    statusText: "Still working",
    tagline: "Exploring Mars since 2012 — and still climbing Mount Sharp.",
    model: "models/curiosity.html",          // 3D-модель (зробила Даяна)
    photo: "images/mars/curiosity.jpg",
    photoCaption: "A view of Mars from Curiosity. Photo: NASA",
    schema: "images/mars/curiosity-schema.jpg",
    mission: [
      ["Mission", "Mars Science Laboratory, NASA / JPL"],
      ["Launch", "November 26, 2011"],
      ["Landed", "August 6, 2012 (UTC), Gale Crater"],
      ["Mass", "899 kg on Earth, 337 kg in Mars gravity"],
      ["Status", "Active mission"]
    ],
    purpose: "To find out whether Mars ever had conditions suitable for microbial life. Curiosity has 10 science instruments, 17 cameras, a laser for studying rocks from a distance and a drill for collecting rock powder. Early in the mission it found chemical and mineral signs of ancient environments that could have supported life.",
    history: "Launched on November 26, 2011, it landed on August 6, 2012 (UTC; August 5 Pacific time). Since 2014 it has been climbing the slopes of Mount Sharp, and on August 26, 2026 its total climb reached 1 km.",
    endedTitle: "Why it is still going",
    ended: "Curiosity doesn't depend on sunlight: its power comes from a radioisotope generator fueled by plutonium-238. That's why dust storms, which stopped Opportunity and InSight, are much less dangerous for it.",
    now: "NASA lists the mission as active. As of September 29, 2026 (the latest update of the mission page), Curiosity keeps working on the slopes of Mount Sharp.",
    working: "Yes, it works. It doesn't depend on sunlight: its power comes from a radioisotope generator fueled by plutonium-238.",
    structure: [
      "Six aluminum wheels on a “rocker-bogie” suspension. Length: about 3 m, mass: 899 kg.",
      "A radioisotope power generator at the back.",
      "A mast with the Mastcam cameras and the ChemCam laser, which analyzes rocks from a distance.",
      "A 2.1 m robotic arm with a drill and four more tools on a rotating “turret”.",
      "SAM and CheMin — onboard labs for analyzing samples.",
      "The REMS weather station and antennas for talking to Earth and to orbiters."
    ],
    where: "On the surface of Mars, in Gale Crater, on the slopes of Mount Sharp.",
    facts: [
      "In the “Cumberland” sample, the SAM instrument found the largest organic molecules ever discovered on Mars: decane, undecane and dodecane. Researchers think they could be pieces of fatty acids."
    ],
    builtBy: "The rover was designed and built by NASA's Jet Propulsion Laboratory (JPL), which still operates it. Its instruments were made by different institutions — for example, the ChemCam laser camera by Los Alamos National Laboratory together with the French space agency CNES.",
    sources: [
      ["NASA Science: Curiosity Rover", "https://science.nasa.gov/mission/msl-curiosity/"],
      ["NASA: Curiosity Finds Organic Molecules Never Seen Before on Mars", "https://www.nasa.gov/missions/mars-science-laboratory/curiosity-rover/nasas-curiosity-finds-organic-molecules-never-seen-before-on-mars/"],
      ["NASA: Curiosity Reaches 1-Kilometer Elevation Gain", "https://science.nasa.gov/mars/curiosity-reaches-1-kilometer-elevation-gain/"]
    ]
  }
];
