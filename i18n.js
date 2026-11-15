/* =====================================================
   ПЕРЕМИКАЧ МОВИ EN / UA
   • Кнопка EN/UA з'являється в меню на кожній сторінці.
   • Вибір запам'ятовується (localStorage).
   • Тексти сторінок і кнопок перекладаються за словником нижче.
   • Описи апаратів поки лишаються англійською.
   ===================================================== */

const UA = {
  /* --- меню --- */
  "Spacecraft": "Апарати", "Home": "Головна", "Moon": "Місяць", "Mars": "Марс", "About us": "Про нас", "Quiz": "Вікторина",

  /* --- головна --- */
  "Stories of the spacecraft humanity left on the Moon and Mars": "Історії апаратів, які людство залишило на Місяці та Марсі",
  "Explore the Moon": "Досліджувати Місяць", "Explore Mars": "Досліджувати Марс",
  "Why now?": "Чому саме зараз?",
  "Space is getting busier than ever. Every year, new rockets launch thousands of satellites, and countries and private companies are sending new missions back to the Moon. In 2024, a private company landed a spacecraft there for the first time.":
    "Космос стає дедалі люднішим. Щороку нові ракети виводять тисячі супутників, а країни та приватні компанії знову відправляють місії на Місяць. У 2024 році приватна компанія вперше посадила там свій апарат.",
  "But what about the machines that were there before? Rovers, landers and instruments from past missions are still sitting on the Moon and Mars. Most people have never heard their names. Some of them are still working. Others went silent years ago.":
    "А що з апаратами, які були там раніше? Ровери, посадкові модулі та прилади минулих місій досі стоять на Місяці й Марсі. Більшість людей ніколи не чули їхніх назв. Деякі з них досі працюють. Інші замовкли багато років тому.",
  "As new missions arrive, these places risk being damaged or forgotten.": "З новими місіями ці місця можуть бути пошкоджені або забуті.",
  "The problem": "Проблема",
  "There are many websites about space objects, but most of them are made for scientists and engineers. They show thousands of dots, technical data and long reports. They mostly focus on Earth's orbit. And they rarely tell the story behind each machine.":
    "Є багато сайтів про космічні об'єкти, але більшість із них створені для науковців та інженерів. Вони показують тисячі точок, технічні дані й довгі звіти. Здебільшого вони про орбіту Землі. І рідко розповідають історію кожного апарата.",
  "For a student or anyone just curious about space, it is hard to understand what is really out there — and why it matters.":
    "Студентові чи просто зацікавленій космосом людині важко зрозуміти, що там насправді є — і чому це важливо.",
  "Our idea": "Наша ідея",
  "We turned NASA data into stories.": "Ми перетворили дані NASA на історії.",
  "On our website, every spacecraft on the Moon and Mars is shown at its real landing site on a 3D planet. Click on it, and it tells you its story: how it got there, what it discovered, why it stopped and what is happening to it today.":
    "На нашому сайті кожен апарат на Місяці та Марсі показаний у справжньому місці посадки на 3D-планеті. Натисни на нього — і він розповість свою історію: як туди потрапив, що відкрив, чому зупинився і що з ним зараз.",
  "Not dots. Not tables.": "Не точки. Не таблиці.", "Stories.": "Історії.",
  "How it works": "Як це працює",
  "Choose a world": "Обери світ", "The Moon or Mars.": "Місяць або Марс.",
  "Spin the planet": "Поверни планету", "Turn the 3D planet and find the glowing points.": "Покрути 3D-планету й знайди позначки, що світяться.",
  "Read the story": "Прочитай історію", "Click a point to meet the spacecraft and read its story.": "Натисни на позначку, щоб познайомитися з апаратом і прочитати його історію.",
  "Why protect them?": "Чому їх варто берегти?",
  "On the Moon there is no wind and no rain. The astronauts' bootprints and rover tracks from 1969–1972 are still there — NASA's Lunar Reconnaissance Orbiter can see them from orbit. But one careless landing nearby could blast them away for ever.":
    "На Місяці немає ні вітру, ні дощу. Сліди астронавтів і колії роверів 1969–1972 років досі там — орбітальний апарат NASA LRO бачить їх з орбіти. Але одна необережна посадка поруч може знищити їх назавжди.",
  "NASA has already started to protect these places. In 2011 it published recommendations asking all future missions to keep their distance from the Apollo landing sites. In 2020 the One Small Step to Protect Human Heritage in Space Act became U.S. law: companies that work with NASA on the Moon must follow these rules.":
    "NASA вже почало захищати ці місця. У 2011 році агентство опублікувало рекомендації, які просять усі майбутні місії триматися подалі від місць посадок Apollo. У 2020 році в США набув чинності закон One Small Step to Protect Human Heritage in Space Act: компанії, що працюють з NASA на Місяці, мають дотримуватися цих правил.",
  "Protection starts with knowing these places exist. That is what our website is for.": "Захист починається зі знання, що ці місця існують. Саме для цього наш сайт.",
  "Why it matters": "Чому це важливо",
  "Most human-made objects around Earth have already become space junk. But the machines on the Moon and Mars are different. They are the first footprints of humanity on other worlds — our shared history.":
    "Більшість штучних об'єктів навколо Землі вже стали космічним сміттям. Але апарати на Місяці та Марсі — інші. Це перші сліди людства на інших світах — наша спільна історія.",
  "We believe they should be remembered and protected, not forgotten.": "Ми віримо, що їх треба пам'ятати й берегти, а не забувати.",
  "Start exploring": "Почати дослідження",
  "Hackathon project, 2026": "Проєкт для хакатону, 2026",

  /* --- сторінки планет --- */
  "🖱 Drag to spin · scroll or pinch to zoom · click a spacecraft": "🖱 Тягни, щоб крутити · коліщатко або два пальці — наблизити · натисни на апарат",
  "THE MOON": "МІСЯЦЬ", "Our Closest Neighbor": "Наш найближчий сусід",
  "The Moon is the only other world where humans have walked. Astronauts and robots left machines behind — some are still useful today, others have been silent for decades.":
    "Місяць — єдиний інший світ, де ходили люди. Астронавти й роботи залишили там техніку — дещо досі корисне, а дещо мовчить десятиліттями.",
  "Spin the Moon, zoom in and click a spacecraft — on the surface or in orbit — to read its story.": "Покрути Місяць, наблизь і натисни на апарат — на поверхні чи на орбіті, — щоб прочитати його історію.",
  "MARS": "МАРС", "The Red Planet": "Червона планета",
  "No human has ever been to Mars — but our robots have. Some of them are still working. Others went silent where their journey ended.":
    "Жодна людина ще не була на Марсі — але наші роботи там є. Деякі досі працюють. Інші замовкли там, де закінчилась їхня подорож.",
  "Spin the planet, zoom in and click a spacecraft — on the surface or in orbit — to read its story.": "Покрути планету, наблизь і натисни на апарат — на поверхні чи на орбіті, — щоб прочитати його історію.",
  "Still in use": "Досі використовується", "Still working": "Досі працює", "Silent": "Мовчить",
  "🛰 In orbit": "🛰 На орбіті", "Crash site": "Місце падіння", "In orbit": "На орбіті",
  "Play the history": "Програти історію", "Timeline": "Шкала часу", "Today": "Сьогодні",
  "Search a spacecraft…": "Пошук апарата…", "▶ Take the tour": "▶ Екскурсія", "■ Stop the tour": "■ Зупинити",
  "All": "Усі", "Working": "Працюють", "On the surface": "На поверхні", "Crash sites": "Місця падінь",
  "on the surface": "на поверхні", "in orbit": "на орбіті", "crash sites": "місць падіння",
  "still working": "досі працюють", "silent": "мовчать",
  "yr": "р.", "d": "дн.", "ago": "тому", "Crashed": "Впав", "Left on the Moon": "Залишений на Місяці",
  "In orbit for": "На орбіті вже", "Working for": "Працює вже", "Silent for": "Мовчить уже",
  "3D model": "3D-модель", "Photo": "Фото", "Open full 3D model": "Відкрити повну 3D-модель",
  "Type": "Тип", "Orbit": "Орбіта", "Coordinates": "Координати", "Where": "Де",
  "Read the full story": "Читати повну історію",
  "Mission": "Місія", "Location": "Розташування", "What it was for": "Для чого він був",
  "Mission story": "Історія місії", "Where it is now": "Де він зараз", "Is it working now?": "Чи працює зараз?",
  "How it is built": "Як він влаштований", "Fun facts": "Цікаві факти", "Who built it": "Хто його створив", "Sources": "Джерела",
  "Why it stopped": "Чому він зупинився", "Why it stayed there": "Чому він там лишився", "What happened": "Що сталося", "How it ended": "Як усе закінчилось",
  "Arrived": "Прибув", "Landed": "Сів", "Impact": "Падіння", "Crew left": "Екіпаж відлетів", "Last contact": "Останній зв'язок",
  "Seen from orbit": "Вигляд з орбіти", "NASA orbiters have photographed this place from above:": "Орбітальні апарати NASA сфотографували це місце згори:",
  "arrives in orbit": "виходить на орбіту", "hits the surface": "падає на поверхню", "lands": "сідає", "The crew leaves": "Екіпаж залишає", "goes silent": "замовкає",
  "Flybys, lost & on the way": "Прольоти, втрачені й ті, що в дорозі", "Contact lost": "Зв'язок втрачено", "Lost": "Втрачено", "In space for": "У космосі вже", "Spacecraft": "Апарати", "Flybys": "Прольоти", "flybys": "прольоти", "☄ Flyby": "☄ Проліт", "Closest approach": "Найближче", "Flyby": "Проліт", "Launch": "Запуск", "Silent for about": "Мовчить уже близько", "Back on Earth for": "Повернувся на Землю", "Rover route": "Маршрут ровера", "Landing": "Посадка", "Last known position": "Остання відома позиція", "From orbit": "З орбіти", "about the size of a backpack": "приблизно як рюкзак", "about as big as a person": "приблизно як людина", "about the size of a car": "приблизно як автомобіль", "about as big as a bus": "приблизно як автобус", "bigger than a bus": "більший за автобус", "m": "м", "km": "км", "Person: 1.75 m": "Людина: 1,75 м", "Rover route is drawn on the map": "Маршрут ровера показано на карті", "NASA traverse data (simplified)": "дані маршруту NASA (спрощено)", "simplified route from a NASA map": "спрощений маршрут за картою NASA", "aeroshell diameter": "діаметр капсули", "body diameter": "діаметр корпусу", "body length": "довжина корпусу", "body width": "ширина корпусу", "body width (antennas: 230 m each!)": "ширина корпусу (антени — по 230 м!)", "height": "висота", "height of the lunar module": "висота місячного модуля", "length": "довжина", "length of Orion": "довжина Orion", "length of the S-IVB stage": "довжина ступені S-IVB", "length of the command & service modules": "довжина командного й службового модулів", "panel width": "ширина панелі", "rotor span": "розмах ротора", "rover length": "довжина ровера", "solar-panel span": "розмах сонячних панелей", "width": "ширина", "width with solar panels": "ширина із сонячними панелями", "Data and photos: NASA · NASA Science · NASA JPL · LROC (NASA/ASU)": "Дані й фото: NASA · NASA Science · NASA JPL · LROC (NASA/ASU)", "ISCIP · 3RD YEAR · RADIO ENGINEERING & SPACE": "ІСЗЗІ · 3 КУРС · РАДІОТЕХНІКА Й КОСМОС", "Data and photos: NASA · NASA JPL · LROC (NASA/ASU) · Mars map: Solar System Scope (CC BY 4.0)": "Дані й фото: NASA · NASA JPL · LROC (NASA/ASU) · Карта Марса: Solar System Scope (CC BY 4.0)", "Data: NASA · NASA NSSDC · NASA JPL · LROC (NASA/GSFC/ASU)": "Дані: NASA · NASA NSSDC · NASA JPL · LROC (NASA/GSFC/ASU)", "Zoom in": "Наблизити", "Zoom out": "Віддалити", "Show the whole planet": "Показати всю планету", "Turn north up": "Північ угору", "Show coordinate grid": "Показати сітку координат", "Compass: the red arrow points to the north pole": "Компас: червона стрілка показує на північний полюс", "Structure of": "Будова:", "Close": "Закрити", "Data and photos: NASA · NASA NSSDC · NASA JPL · LROC (NASA/GSFC/ASU)": "Дані й фото: NASA · NASA NSSDC · NASA JPL · LROC (NASA/GSFC/ASU)", "Moon map: NASA CGI Moon Kit (LROC, NASA/GSFC/ASU). Landing sites use real coordinates.": "Карта Місяця: NASA CGI Moon Kit (LROC, NASA/GSFC/ASU). Місця посадки — за реальними координатами.", "Data and photos: NASA · NASA Science · NASA JPL": "Дані й фото: NASA · NASA Science · NASA JPL", "Mars map: Solar System Scope (CC BY 4.0), based on NASA data. Landing sites use real coordinates.": "Карта Марса: Solar System Scope (CC BY 4.0) за даними NASA. Місця посадки — за реальними координатами.", "Sources are in English": "Джерела англійською", "Open photo full screen": "Фото на весь екран", "Splashdown": "Приводнення", "Lunar orbit": "Орбіта Місяця", "Descent to 15 km": "Спуск до 15 км", "years": "років",
  "launches — and is lost": "злітає — і губиться", "flies past Mars — first close-up photos": "пролітає повз Марс — перші близькі знімки", "flies past Mars — maps a fifth of the planet": "пролітає повз Марс — знімає п'яту частину планети",
  "Who it is for": "Для кого цей сайт", "We made this website for school-age space enthusiasts.": "Ми створили цей сайт для школярів, які захоплюються космосом.", "Students aged 10–16": "Школярі 10–16 років", "Short stories, 3D models, real NASA photos and a quiz. No science degree needed.": "Короткі історії, 3D-моделі, справжні фото NASA і вікторина. Науковий ступінь не потрібен.", "Teachers": "Учителі", "A ready-made visual lesson about space history, engineering and planetary science.": "Готовий наочний урок з історії космонавтики, інженерії та планетології.", "Families and space fans": "Сім’ї та шанувальники космосу", "Anyone curious about what humanity has left on other worlds — in English and Ukrainian.": "Усі, кому цікаво, що людство залишило на інших світах, — англійською та українською.", "Questions or corrections?": "Питання чи виправлення?", "Spotted a mistake or know more?": "Помітили помилку або знаєте більше?", "Suggest a correction": "Запропонувати виправлення",

  /* --- про нас --- */
  "We are a team of six third-year cadets from the Institute of Special Communications and Information Protection of KPI (ISCIP), building a web platform about spacecraft that humanity left on the Moon and Mars.":
    "Ми — команда з шести курсантів третього курсу Інституту спеціального зв'язку та захисту інформації (ІСЗЗІ), яка створює вебплатформу про апарати, залишені людством на Місяці та Марсі.",
  "TEAM MEMBERS": "СКЛАД КОМАНДИ",
  "Dayana Vasiukhno": "Даяна Васюхно", "Viktoriia Dashkel": "Вікторія Дашкель", "Vitalii Aleksandrovych": "Віталій Александрович",
  "Maksym Zinchuk": "Максим Зінчук", "Denys Sobchuk": "Денис Собчук", "Oleksandr Korotkov": "Олександр Коротков",
  "Our Mission": "Наша місія",
  "To collect and share knowledge about spacecraft that have completed their missions, preserve their history, explain why they stopped working, and draw attention to the problem of human-made objects left in space.":
    "Збирати й поширювати знання про апарати, що завершили свої місії, зберігати їхню історію, пояснювати, чому вони перестали працювати, і привертати увагу до проблеми штучних об'єктів, залишених у космосі.",
  "Space archive": "Космічний архів", "🛰️ Spacecraft stories": "🛰️ Історії апаратів",
  "Our Vision": "Наше бачення",
  "To create the best interactive guide to abandoned spacecraft for students, teachers, engineers and everyone fascinated by space exploration and radio communications.":
    "Створити найкращий інтерактивний путівник покинутими апаратами для студентів, викладачів, інженерів і всіх, кого захоплює дослідження космосу та радіозв'язок.",
  "Education & science": "Освіта й наука", "📡 Radio engineering": "📡 Радіотехніка",
  "ABOUT THE PROJECT": "ПРО ПРОЄКТ", "Why we care about silent machines": "Чому нам не байдужі апарати, що замовкли",
  "We are third-year cadets majoring in": "Ми — курсанти третього курсу спеціальності",
  "Electronic Communications and Radio Engineering": "Електронні комунікації та радіотехніка",
  ". Every day we study radio communication systems, signal processing, antenna technology and telecommunication networks — the core technologies behind satellite links and deep space exploration.":
    ". Щодня ми вивчаємо системи радіозв'язку, обробку сигналів, антенну техніку й телекомунікаційні мережі — основні технології супутникового зв'язку та дослідження далекого космосу.",
  "When a spacecraft runs out of power, loses contact with Earth or finishes its mission, its story does not end. On our website we collect the stories of these machines on the Moon and Mars: where exactly they are, what they did, how they were built and why their missions ended.":
    "Коли в апарата закінчується енергія, зникає зв'язок із Землею або завершується місія, його історія не закінчується. На нашому сайті ми збираємо історії цих апаратів на Місяці та Марсі: де саме вони стоять, що робили, як влаштовані й чому їхні місії закінчились.",
  "Why we joined the hackathon & how we worked": "Чому ми взяли участь у хакатоні і як працювали",
  "For our six-cadet team, this hackathon is an opportunity to step beyond the classroom, test ourselves under tight deadlines, connect with mentors and build real-world engineering skills.":
    "Для нашої команди з шести курсантів цей хакатон — нагода вийти за межі аудиторії, перевірити себе в стислі терміни, поспілкуватися з менторами й набути справжніх інженерних навичок.",
  "Gain new practical skills beyond regular classroom studies": "Здобути нові практичні навички поза звичайним навчанням",
  "Test ourselves on real challenges under pressure and tight deadlines": "Перевірити себе на справжніх задачах під тиском і в стислі терміни",
  "Learn to work as a team and brainstorm ideas together": "Навчитися працювати командою й разом генерувати ідеї",
  "Connect with experienced engineers, mentors and like-minded peers": "Познайомитися з досвідченими інженерами, менторами й однодумцями",
  "Step out of our comfort zone and grow professionally and personally": "Вийти із зони комфорту й зрости професійно та особисто",
  "Become stronger, bolder and more confident in our abilities": "Стати сильнішими, сміливішими й упевненішими у своїх силах",
  "We formed a team of": "Ми зібрали команду з", "six people": "шести людей",
  "(Dayana Vasiukhno, Viktoriia Dashkel, Vitalii Aleksandrovych, Maksym Zinchuk, Denys Sobchuk and Oleksandr Korotkov), defined the concept of the project together and divided responsibilities. Regular sync-ups, testing together and supporting each other helped us turn our idea into a working website.":
    "(Даяна Васюхно, Вікторія Дашкель, Віталій Александрович, Максим Зінчук, Денис Собчук і Олександр Коротков), разом визначили концепцію проєкту й розподілили обов'язки. Регулярні зустрічі, спільне тестування й взаємна підтримка допомогли нам перетворити ідею на робочий сайт.",
  "3rd-year cadets, ISCIP · Electronic Communications & Radio Engineering · 2026": "Курсанти 3 курсу, ІСЗЗІ · Електронні комунікації та радіотехніка · 2026",


  /* --- нові підказки, картки, факти --- */
  "How to use the map": "Як користуватися картою", "How to explore": "Як досліджувати",
  "Spin the planet": "Обертайте планету", "drag it with the mouse or a finger": "перетягніть її мишею або пальцем",
  "Zoom in on the surface": "Наближайте поверхню", "scroll the wheel or pinch with two fingers": "крутіть коліщатко або зведіть два пальці",
  "Click the markers": "Натискайте на позначки", "to read the story of each spacecraft": "щоб дізнатися історію апаратів",
  "Got it, let's go!": "Зрозуміло, поїхали!",
  "Fun fact": "Цікавий факт", "Arrival": "Прибуття", "Agency": "Агентство", "Primary sources": "Першоджерела",
  "Confirmed by NASA": "Підтверджено NASA", "Visualization": "Умовна візуалізація",
  "coordinates": "координати", "orbit": "орбіта", "dates": "дати", "status": "статус", "photo": "фото",
  "marker on the globe": "позначка на глобусі", "orbit path": "траєкторія орбіти", "rover route (simplified)": "маршрут ровера (спрощено)",
  "picture": "зображення", "last contact date (approximate)": "дата останнього зв'язку (приблизна)",
  "3D reconstruction, not to scale": "3D-реконструкція, не в масштабі", "Real image from orbit": "Справжній знімок з орбіти",
  "Illustration": "Ілюстрація", "Real photo": "Справжнє фото",
  "This is a visualization made to explain the spacecraft, not an exact picture.": "Це візуалізація, щоб пояснити, як виглядає апарат, а не точне зображення.",
  "A real photo published by NASA.": "Справжнє фото, опубліковане NASA.",
  "Real coordinates: NASA": "Реальні координати: NASA", "Orbit data: NASA": "Дані орбіти: NASA",
  "Facts on this page come from these primary sources. 3D models, marker sizes and orbit paths on the globe are illustrations made by our team.":
    "Факти на цій сторінці взято з цих першоджерел. 3D-моделі, розміри позначок і траєкторії орбіт на глобусі — умовні візуалізації, які зробила наша команда.",
  "Records from our Moon and Mars maps.": "Рекорди з наших карт Місяця й Марса.",
  "Questions about the spacecraft on our Moon and Mars maps, at three levels. After each answer you will see why it is right. All answers come from NASA data on this website.":
    "Запитання про апарати на наших картах Місяця й Марса — три рівні складності. Після кожної відповіді побачиш пояснення. Усі відповіді — з даних NASA на цьому сайті.",
  /* --- вікторина --- */
  "QUIZ": "ВІКТОРИНА", "How well do you know them?": "Наскільки добре ти їх знаєш?",
  "10 questions about the spacecraft on our Moon and Mars maps. All answers come from NASA data on this website.":
    "10 запитань про апарати на наших картах Місяця й Марса. Усі відповіді — з даних NASA на цьому сайті.",
  "Start the quiz": "Почати вікторину", "Next question →": "Наступне запитання →", "See my score": "Мій результат",
  "Try again": "Спробувати ще", "Question": "Запитання", "Correct!": "Правильно!", "Not quite.": "Не зовсім.",
  "The answer is": "Правильна відповідь", "Your score": "Твій результат", "Read its story ↗": "Читати історію ↗"
};

const LANG = (() => {
  const q = new URLSearchParams(location.search).get("lang");      // можна відкрити сторінку з ?lang=uk
  try { if (q) localStorage.setItem("lang", q); return q || localStorage.getItem("lang") || "en"; } catch (e) { return q || "en"; }
})();
function t(en) { return LANG === "uk" && UA[en] ? UA[en] : en; }

(function () {
  document.documentElement.lang = LANG === "uk" ? "uk" : "en";

  // перекладаємо всі тексти сторінки
  if (LANG === "uk") {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      const key = n.nodeValue.replace(/\s+/g, " ").trim();
      if (key && UA[key]) n.nodeValue = n.nodeValue.replace(n.nodeValue.trim(), UA[key]);
    });
  }

  // кнопка EN / UA у меню
  const menu = document.querySelector(".menu");
  if (menu) {
    const b = document.createElement("button");
    b.className = "lang-btn";
    b.innerHTML = LANG === "uk" ? "<b>UA</b> · EN" : "<b>EN</b> · UA";
    b.title = LANG === "uk" ? "Switch to English" : "Перемкнути на українську";
    b.onclick = () => {
      try { localStorage.setItem("lang", LANG === "uk" ? "en" : "uk"); } catch (e) {}
      location.reload();
    };
    menu.appendChild(b);
  }
})();
