/* =====================================================
   ДАНІ ПРО АПАРАТИ НА МІСЯЦІ
   Взято з нашого документа (джерела — NASA).
   lat — широта (+ північ, − південь)
   lon — довгота (+ схід, − захід)
   status: "active" (досі використовується) або "silent"
   ===================================================== */
const MOON_SITES = [
  {
    id: "apollo11",
    name: "Apollo 11 Laser Reflector",
    type: "Science instrument",
    lat: 0.67345, lon: 23.47307,
    coordsText: "0.67345° N, 23.47307° E",
    status: "active",
    statusText: "Still used by scientists",
    tagline: "The only piece of Apollo 11 equipment that still gives scientists data.",
    model: "models/apollo11.html",      // 3D-модель (зробила Даяна)
    photo: "images/moon/apollo11.jpg",
    photoCaption: "Buzz Aldrin carries experiments to set up on the Moon, July 1969. Photo: NASA",
    schema: "images/moon/apollo11-schema.jpg",
    mission: [
      ["Mission", "Apollo 11, NASA"],
      ["Arrived", "July 1969"],
      ["Installed", "July 21, 1969, by Neil Armstrong and Buzz Aldrin"],
      ["Place", "Sea of Tranquility"],
      ["Size", "Panel about 60 cm wide, 100 quartz prisms"]
    ],
    purpose: "It is a panel about 60 cm wide with 100 quartz “corner-cube” prisms. They send light back exactly where it came from. Observatories on Earth fire laser pulses at the panel and measure how long the light takes to travel there and back. This lets scientists measure the distance from Earth to the Moon to within millimeters, study the Moon's orbit and inner structure, and test Einstein's theory of relativity.",
    history: "The idea was proposed by physicist James Faller back in 1961. Because the astronauts might have had to leave in a hurry, the instrument had to be set up in just a few minutes. Aldrin lined it up using a bubble level and a sun compass — a bit like setting up a garden sundial. Armstrong and Aldrin installed it on July 21, 1969, about an hour before the end of their moonwalk.",
    endedTitle: "Why it stayed there",
    ended: "It was always meant to work on the Moon. The reflector is passive: it needs no power and no radio link. All it needs is to stay in place and keep facing Earth.",
    now: "The reflector still works, and it is the only piece of Apollo 11 equipment that still gives science data. But the signal is getting weaker. A 2024 study showed that about half of the prism surface is covered with a thin layer of lunar dust. Because of this, about ten times less light comes back than expected. At full Moon, when the Sun shines straight onto the panel, the signal drops about 15 times more.",
    working: "Yes, it works. The instrument is passive, so it needs no power: observatories keep bouncing laser pulses off it. The only problem is lunar dust, which makes the signal weaker over the years.",
    structure: [
      "A square panel about 60 cm wide with the prisms built in.",
      "100 corner-cube reflectors made of fused quartz, each 3.8 cm across. The prisms have no metal coating — tests showed it could not be used.",
      "Each prism sits in its own socket 1.9 cm below the surface, in Teflon rings. The deep sockets protect the prisms from the Sun's heat.",
      "A support stand with an adjustable tilt to point the panel at Earth.",
      "A bubble level and a sun compass for precise alignment."
    ],
    where: "On the surface of the Moon. The Moon is Earth's satellite, not a planet, and it has almost no atmosphere.",
    facts: [
      "Because the crew might have had to leave quickly, the reflector had to be deployed in just minutes. Aldrin leveled it with a bubble level and a sun compass, almost like setting up a garden sundial."
    ],
    builtBy: "The idea came from physicist James Faller in 1961. The science lead was Professor Carroll Alley of the University of Maryland. The panel was designed and built by Arthur D. Little, and the quartz prisms were made by PerkinElmer and Boxton-Beel. The customer and operator was NASA.",
    sources: [
      ["NASA: Retroreflectors — From Apollo to Mars (photo)", "https://www.nasa.gov/image-article/retroreflectors-from-apollo-mars/"],
      ["NASA JPL: Apollo 11 Experiment Still Going Strong", "https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/"]
    ]
  },

  {
    id: "lrv",
    name: "Apollo 15 Lunar Rover",
    type: "Lunar car",
    lat: 26.13174, lon: 3.63803,
    coordsText: "26.13174° N, 3.63803° E",
    status: "silent",
    statusText: "Parked since 1971",
    tagline: "The first car ever driven on the Moon.",
    model: "models/lrv.html",      // 3D-модель (зробила Даяна)
    photo: "images/moon/lrv.jpg",
    photoCaption: "The Lunar Roving Vehicle on the Moon. Photo: NASA",
    schema: "images/moon/lrv-schema.jpg",
    mission: [
      ["Mission", "Apollo 15, NASA"],
      ["Arrived", "1971"],
      ["Place", "Hadley–Apennine"],
      ["Crew", "David Scott and James Irwin"],
      ["Distance driven", "27.8 km in three drives"],
      ["Mass", "About 210 kg empty, could carry 490 kg more"]
    ],
    purpose: "It was the first “moon buggy”: a battery-powered electric car built by Boeing. Empty, it weighed about 210 kg and could carry another 490 kg — two astronauts in spacesuits, tools and rock samples. David Scott and James Irwin drove it 27.8 km in three trips. On foot, in their bulky spacesuits, astronauts could only walk a few hundred meters away from the lunar module.",
    history: "During the flight, the rover was folded up and attached to the side of the lunar module. On the Moon the astronauts unfolded it and used it for three long drives, which let them explore much farther than any earlier crew.",
    endedTitle: "Why it stayed there",
    ended: "The lunar module's ascent stage could only lift the crew and a limited load, so the space was given to Moon rock samples — bringing the car back was never planned. After the third drive, it was parked for the last time east of the lunar module Falcon.",
    now: "The car stands where it was parked in 1971. NASA's Lunar Reconnaissance Orbiter (LRO) photographed the Apollo 15 landing site from orbit. The pictures show the module and the wheel tracks, and scientists have marked the rover's parking spot on maps. There is no air and no weather on the Moon, so the tracks are still there.",
    working: "No. The car did its job and was left on the Moon on purpose. It was powered by two non-rechargeable silver-zinc batteries, which ran out long ago, so it can no longer drive.",
    structure: [
      "A folding aluminum-alloy frame: during the flight the car was folded and attached to the side of the lunar module.",
      "Four wheels about 82 cm across. Instead of rubber — a mesh of zinc-coated steel wire with titanium chevrons for grip.",
      "Each wheel has its own 0.25 hp electric motor; the front and rear wheels are steered by separate motors.",
      "Two 36-volt batteries.",
      "A T-shaped hand controller between the seats instead of a steering wheel: it controls driving, turning and braking.",
      "Two seats, holders for tools and samples, a TV camera and an antenna for talking to Earth."
    ],
    where: "On the surface of the Moon. There is no atmosphere there.",
    facts: [
      "Before leaving, James Irwin left a Bible on the rover's control panel.",
      "NASA left all three lunar rovers on the Moon — from Apollo 15, 16 and 17."
    ],
    builtBy: "The main contractor was Boeing: the car was designed and built at its space center in Kent, Washington. The wheels and drive system were made by the Delco Electronics division of General Motors; the mesh wheels were designed by GM engineer Ferenc Pavlics. NASA's Marshall Space Flight Center managed the project.",
    sources: [
      ["NASA: Taking a Ride on the Moon in the Lunar Roving Vehicle (photo)", "https://www.nasa.gov/image-article/taking-ride-moon-lunar-roving-vehicle/"],
      ["NASA: 50 Years Ago, First Apollo Astronauts to Drive on the Moon Took Final Cruise", "https://www.nasa.gov/history/50-years-ago-first-apollo-astronauts-to-drive-on-the-moon-took-final-cruise/"],
      ["NASA NSSDC: The Apollo Lunar Roving Vehicle", "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html"],
      ["LROC (NASA/ASU): Apollo 15 — A Mission of Many Firsts", "https://lroc.im-ldi.com/images/1198"],
      ["Nautilus: The First Lunar Road Trip", "https://nautil.us/the-first-lunar-road-trip-1227738"]
    ]
  },

  {
    id: "surveyor3",
    name: "Surveyor 3",
    type: "Robotic lander",
    lat: -3.0162, lon: -23.4180,
    coordsText: "3.0162° S, 23.4180° W",
    status: "silent",
    statusText: "Silent since 1967",
    tagline: "The only spacecraft ever visited by humans on another world.",
    model: "models/surveyor3.html",          // 3D-модель (зробила Даяна)
    photo: "images/moon/surveyor3.jpg",
    photoCaption: "Apollo 12 astronaut Pete Conrad next to Surveyor 3, November 1969. Photo: NASA",
    schema: "images/moon/surveyor3-schema.jpg",
    mission: [
      ["Mission", "Surveyor 3, NASA / JPL (later visited by Apollo 12)"],
      ["Landed", "April 20, 1967 (GMT)"],
      ["Worked until", "May 3, 1967"],
      ["Place", "Ocean of Storms, Surveyor crater"],
      ["Visited by", "Apollo 12 astronauts, November 1969"]
    ],
    purpose: "An uncrewed lander that prepared the way for Apollo. It landed on the Moon on April 20, 1967 (GMT) and had to prove that a soft landing was possible. Its TV camera photographed the area, and its scoop dug into lunar soil for the first time to check whether the ground could hold the weight of a spacecraft. It worked until May 3, 1967.",
    history: "No one planned to bring the probe back: it only had to land and work where it was. 31 months later, in November 1969, Apollo 12 landed precisely next to it. Astronauts Pete Conrad and Alan Bean removed its TV camera, scoop and a few other parts and brought them back to Earth to learn how a long stay on the Moon affects machines. The rest of the spacecraft stayed in place.",
    endedTitle: "Why it stopped",
    ended: "When the lunar night came, the solar panel stopped producing electricity. After two weeks of freezing cold, the probe could not be switched on again.",
    now: "The probe still stands in the crater named after it — Surveyor crater. LRO photographs this place from orbit, and the images show Surveyor 3, the descent stage of the lunar module Intrepid and the astronauts' footpaths nearby. The camera brought back to Earth is now at the Smithsonian's National Air and Space Museum in Washington, where NASA donated it. The scoop is on display at NASA's Jet Propulsion Laboratory (JPL).",
    working: "No. The probe only worked until May 3, 1967. When lunar night fell, the solar panel stopped producing power, and after two weeks of freezing cold it could not be turned back on.",
    structure: [
      "A triangular frame of aluminum tubes on three landing legs with shock absorbers; the spacecraft is about 3 m tall.",
      "A solid-fuel braking rocket: it removed most of the speed and separated before landing.",
      "Three small liquid-fuel engines (verniers) for a soft touchdown.",
      "A radar to measure height and speed during landing.",
      "A mast with a solar panel and a flat antenna for talking to Earth.",
      "A TV camera with a rotating mirror and a scoop arm for digging the soil."
    ],
    where: "On the surface of the Moon, in Surveyor crater. There is no atmosphere there.",
    facts: [
      "Surveyor 3 is still the only spacecraft that humans have visited on another world.",
      "Bacteria were found on the camera brought back to Earth, and at first scientists thought they had survived on the Moon for more than two years. Later they concluded that the camera was most likely contaminated on Earth, because of careless work in the clean room. After this, NASA made its sterility rules stricter."
    ],
    builtBy: "The spacecraft was designed and built by Hughes Aircraft Company (Culver City, California). NASA's Jet Propulsion Laboratory (JPL) managed the Surveyor program.",
    sources: [
      ["NASA: Apollo 12 / Surveyor III (photo AS12-48-7134)", "https://www.nasa.gov/image-article/two-spacecraft-moon/"],
      ["NASA: LRO Looks at Apollo 12, Surveyor 3 Landing Sites", "https://www.nasa.gov/missions/lunar-reconnaissance-orbiter-looks-at-apollo-12-surveyor-3-landing-sites/"],
      ["NASA JPL: Surveyor 3 Camera Returned from the Moon", "https://www.jpl.nasa.gov/blog/2012/1/surveyor-3-camera-returned-from-the-moon"],
      ["NASA NTRS: Test and Evaluation of the Surveyor 3 TV Camera", "https://ntrs.nasa.gov/citations/19710024418"]
    ]
  },

  {
    id: "odysseus",
    name: "Odysseus",
    type: "Commercial lander",
    lat: -80.13, lon: 1.44,
    coordsText: "80.13° S, 1.44° E",
    status: "silent",
    statusText: "Silent since 2024",
    tagline: "Landed closer to the Moon's south pole than any spacecraft before.",
    model: "models/odysseus.html",          // 3D-модель (зробила Даяна)
    photo: "images/moon/odysseus.jpg",
    photoCaption: "The area near Malapert A crater where Odysseus landed. Photo: NASA",
    schema: "images/moon/odysseus-schema.jpg",
    mission: [
      ["Mission", "IM-1 (Nova-C), Intuitive Machines for NASA CLPS"],
      ["Launch", "February 15, 2024, Falcon 9 rocket"],
      ["Landed", "February 22, 2024, 6:24 p.m. US Eastern time"],
      ["Place", "Near Malapert A crater, close to the south pole"],
      ["Last photo", "February 29, 2024"]
    ],
    purpose: "A commercial mission by Intuitive Machines under NASA's CLPS program (Commercial Lunar Payload Services). The lander delivered NASA science instruments and technology to the Moon. It was the first successful landing under CLPS.",
    history: "It launched on February 15, 2024, on a Falcon 9 rocket. Seven days later, Odysseus touched down near the south pole at 6:24 p.m. US Eastern time. These were the first new NASA instruments to work on the Moon in more than 50 years.",
    endedTitle: "Why it stopped",
    ended: "During landing, one of the legs caught on the ground and broke, so Odysseus ended up lying on its side at about 30°. Because of this, some antennas ended up close to the ground, and the solar panels did not get enough light. On February 29, 2024, the lander sent its last photo, was put into sleep mode and did not wake up after the lunar night.",
    now: "LRO photographed the lander on February 24 from about 90 km up. It came down about 1.5 km from its target, on a slope of about 12° inside a crater about 1 km wide. The lander worked only until lunar night fell, and it stayed on the surface.",
    working: "No. It tipped over on landing, could not get enough sunlight, went to sleep on February 29, 2024 and never woke up after the lunar night.",
    structure: [
      "A six-sided body 4.3 m tall and 1.57 m wide on six landing legs.",
      "The VR900 main engine running on liquid methane and liquid oxygen, with 3,100 N of thrust.",
      "Attitude-control thrusters using compressed helium.",
      "Composite cryogenic fuel tanks.",
      "Solar panels, antennas and NASA science instruments mounted outside the body."
    ],
    where: "On the surface of the Moon, near Malapert A crater. There is no atmosphere there.",
    facts: [
      "Landing coordinates: 80.13° S, 1.44° E, at an altitude of 2,579 m. That is closer to the south pole than any other spacecraft had landed."
    ],
    builtBy: "The lander was designed, built and operated by the private company Intuitive Machines from Houston. Its main engine is based on technology from NASA's Morpheus project. NASA was the main customer of the mission under the CLPS program.",
    sources: [
      ["NASA: LRO Images Intuitive Machines' Odysseus Lander", "https://www.nasa.gov/missions/lro/nasas-lro-images-intuitive-machines-odysseus-lander/"],
      ["NASA: NASA, Intuitive Machines Share Images from the Moon", "https://www.nasa.gov/blogs/clps/2024/02/28/nasa-intuitive-machines-share-images-from-the-moon-provide-science-updates/"]
    ]
  }
];
