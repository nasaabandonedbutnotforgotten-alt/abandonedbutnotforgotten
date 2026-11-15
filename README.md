# Abandoned but Not Forgotten 🛰

**Історії апаратів, які людство залишило на Місяці та Марсі.**
*Stories of the spacecraft humanity left on the Moon and Mars.*

🌐 **Сайт / Live site:** https://abandonedbutnotforgotten.student-ua.workers.dev/

---

## Українською

### Про проєкт
Інтерактивний вебсайт, на якому кожен апарат на Місяці й Марсі показано в місці його реальної посадки на 3D-планеті. Натисніть на апарат — і він розповість свою історію: як туди потрапив, що відкрив, чому замовк і що з ним зараз.

Сайт створено для школярів 10–16 років і всіх, хто цікавиться космосом. Наша ідея: **не точки, не таблиці — історії.**

### Можливості
- **3D-глобуси Місяця й Марса** з апаратами на поверхні, на орбіті та на місцях падіння (за реальними координатами NASA).
- **75 апаратів** із картками: фото, 3D-модель, рік запуску й посадки, агентство, місія, статус, цікавий факт.
- **Лічильник «мовчить уже…»** — скільки часу минуло від останнього зв'язку.
- **Шкала часу** — як змінювалася карта від 1958 року до сьогодні.
- **Маршрути роверів** і порівняння розміру апарата з людиною.
- **Першоджерела в кожній картці** і чітке розділення: що підтверджено NASA, а що — умовна візуалізація.
- **Вікторина** з трьома рівнями складності, поясненнями відповідей і розбором результату.
- **Цікаві факти** — рекорди, які рахуються автоматично з даних карт.
- **Дві мови:** українська та англійська.

### Технології
Чистий HTML, CSS і JavaScript — без фреймворків і сторонніх бібліотек. 3D-планету ми малюємо самі на `<canvas>`, піксель за пікселем, з текстури-розгортки.

### Як запустити локально
Сайт працює без збирання, але текстури й 3D-моделі потребують локального сервера (просто відкрити `index.html` подвійним кліком недостатньо):

- у VS Code — розширення **Live Server**, кнопка **Go Live**;
- або в терміналі в папці проєкту: `python -m http.server 8000`, потім відкрити `http://localhost:8000`.

### Структура
| Файл / папка | Що там |
|---|---|
| `index.html`, `moon.html`, `mars.html`, `quiz.html`, `about.html` | сторінки сайту |
| `planet.js`, `planet.css` | 3D-глобус і картки апаратів |
| `moon-*.js`, `mars-*.js` | дані про апарати (джерела — NASA) |
| `card-meta.js` | рік запуску, агентство й місія для карток |
| `facts.js` | блок «Цікаві факти» на головній |
| `quiz.js` | вікторина |
| `i18n.js`, `data-uk.js` | перемикач мови й український переклад |
| `models/` | 3D-моделі апаратів |
| `images/`, `moon-tiles/` | фото, схеми й текстури |

### Джерела даних
NASA · NASA Science · NASA JPL · NASA NSSDC · LROC (NASA/GSFC/ASU).
Карта Місяця — NASA CGI Moon Kit (LROC). Карта Марса — Solar System Scope (CC BY 4.0) за даними NASA.
Посилання на першоджерела є в картці кожного апарата.

### Використання ШІ
Під час розробки ми використовували ШІ-асистентів: **Claude** (Anthropic) — код, 3D-моделі, переклад; **Gemini** (Google) і **Grok** (xAI) — пошук інформації, ідеї, перевірка текстів. Усі факти перевірено за першоджерелами — переважно NASA; посилання є в картці кожного апарата.

### Ліцензія
Код сайту поширюється за ліцензією [MIT](LICENSE). Фото й дані NASA, як правило, не захищені авторським правом у США (див. [NASA Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/)). Карта Марса — Solar System Scope, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

### Команда
Курсанти 3 курсу Інституту спеціального зв'язку та захисту інформації КПІ (ІСЗЗІ), спеціальність «Електронні комунікації та радіотехніка»:

Даяна Васюхно · Вікторія Дашкель · Віталій Александрович · Максим Зінчук · Денис Собчук · Олександр Коротков

Знайшли помилку? Пишіть: nasaabandonedbutnotforgotten@gmail.com

---

## English

### About
An interactive website where every spacecraft on the Moon and Mars is shown at its real landing site on a 3D planet. Click a spacecraft and it tells its story: how it got there, what it discovered, why it went silent and what is happening to it today.

Made for students aged 10–16 and anyone curious about space. **Not dots. Not tables. Stories.**

### Features
- 3D globes of the Moon and Mars with spacecraft on the surface, in orbit and at crash sites (real NASA coordinates).
- 75 spacecraft cards: photo, 3D model, launch and landing year, agency, mission, status and a fun fact.
- "Silent for…" counter, a timeline from 1958 to today, rover routes and size comparisons.
- Primary sources in every card, with a clear split between NASA-confirmed facts and illustrations.
- A quiz with three difficulty levels, explanations and an answer review.
- Fun facts computed automatically from the map data.
- Ukrainian and English.

### Tech
Plain HTML, CSS and JavaScript, no frameworks or libraries. The 3D planet is rendered by hand on a `<canvas>`.

### Run locally
Use a local server (VS Code **Live Server**, or `python -m http.server 8000`) and open `http://localhost:8000`.

### AI tools
We used AI assistants during development: **Claude** (Anthropic) for code, 3D models and translation; **Gemini** (Google) and **Grok** (xAI) for research, brainstorming and text checks. All facts were checked against primary sources, mostly NASA; links are in each spacecraft card.

### License
The website code is released under the [MIT License](LICENSE). NASA photos and data are generally not subject to copyright in the United States (see [NASA Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/)). Mars map: Solar System Scope, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

### Team
Third-year cadets of the Institute of Special Communications and Information Protection of KPI (ISCIP), Electronic Communications & Radio Engineering:

Dayana Vasiukhno · Viktoriia Dashkel · Vitalii Aleksandrovych · Maksym Zinchuk · Denys Sobchuk · Oleksandr Korotkov

Hackathon project, 2026.
