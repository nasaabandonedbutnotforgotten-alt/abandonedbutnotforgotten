/* =====================================================
   ПЛАВНІ ПЕРЕХОДИ МІЖ СТОРІНКАМИ
   Натискаєш на вкладку → сторінка плавно зникає,
   нова сторінка плавно з'являється (див. style.css).
   ===================================================== */
document.addEventListener("click", e => {
  const a = e.target.closest("a");
  if (!a) return;
  const href = a.getAttribute("href") || "";
  // не чіпаємо: якорі (#), нові вкладки, зовнішні сайти, Ctrl/Shift-клік
  if (!href || href.startsWith("#") || a.target === "_blank" || /^(https?:|mailto:)/.test(href)) return;
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
  if (a.pathname === location.pathname) return;
  e.preventDefault();
  document.body.classList.add("leaving");
  setTimeout(() => { location.href = a.href; }, 320);
});
// якщо повернулись кнопкою «Назад» — показати сторінку знову
addEventListener("pageshow", e => { if (e.persisted) document.body.classList.remove("leaving"); });
