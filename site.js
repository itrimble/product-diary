// Three small enhancements: light/dark toggle, list/grid layout, and search. The site works without any of them.
(function () {
  var root = document.documentElement;
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  // Theme: follow the system until the reader chooses.
  var themeBtn = document.getElementById("theme");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    store("pd-theme", root.dataset.theme);
  });

  // Mobile category nav: closed by default (CSS), hamburger toggles a chip row.
  var navBtn = document.getElementById("nav-toggle");
  var catbar = document.getElementById("catbar");
  if (navBtn && catbar) {
    var setNav = function (open) {
      catbar.classList.toggle("open", open);
      navBtn.setAttribute("aria-expanded", String(open));
      navBtn.setAttribute("aria-label", open ? "Hide categories" : "Show categories");
    };
    navBtn.addEventListener("click", function () { setNav(!catbar.classList.contains("open")); });
    catbar.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && catbar.classList.contains("open")) { setNav(false); navBtn.focus(); } });
  }

  // List or grid for story lists.
  var lists = document.querySelectorAll(".stories:not(.compact)");
  var view = document.querySelector(".view");
  function setView(v) {
    lists.forEach(function (l) { l.dataset.view = v; });
    if (view) view.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.set === v)); });
  }
  if (view) {
    view.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      setView(b.dataset.set); store("pd-view", b.dataset.set);
    });
    var saved = load("pd-view"); if (saved === "grid" || saved === "list") setView(saved);
  }

  // Search over /search.json, loaded the first time the box is used.
  var q = document.getElementById("q"), out = document.getElementById("results"), idx = null, active = -1;
  if (!q || !out) return;
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function open(items) {
    out.innerHTML = items.length
      ? items.map(function (r, i) { return '<li><a href="' + r.u + '" data-i="' + i + '"><strong>' + esc(r.t) + '</strong><span>' + esc(r.p) + " · " + esc(r.c) + "</span></a></li>"; }).join("")
      : '<li class="none">Nothing matches.</li>';
    out.hidden = false; active = -1;
  }
  function run() {
    var term = q.value.trim().toLowerCase();
    if (!term || !idx) { out.hidden = true; return; }
    var words = term.split(/\s+/);
    var hits = idx.filter(function (r) {
      var hay = (r.t + " " + r.s + " " + r.p + " " + r.c).toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) > -1; });
    }).slice(0, 7);
    open(hits);
  }
  function ensure(cb) {
    if (idx) return cb();
    fetch("/search.json").then(function (r) { return r.json(); }).then(function (j) { idx = j; cb(); }).catch(function () {});
  }
  q.addEventListener("focus", function () { ensure(function () {}); });
  q.addEventListener("input", function () { ensure(run); });
  q.addEventListener("keydown", function (e) {
    var links = out.querySelectorAll("a");
    if (e.key === "Escape") { out.hidden = true; q.blur(); }
    else if (e.key === "ArrowDown" && links.length) { e.preventDefault(); active = (active + 1) % links.length; links[active].focus(); }
    else if (e.key === "Enter" && links.length) { location.href = links[0].getAttribute("href"); }
  });
  out.addEventListener("keydown", function (e) {
    var links = out.querySelectorAll("a");
    if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(active + 1, links.length - 1); links[active].focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (active <= 0) { q.focus(); active = -1; } else { active--; links[active].focus(); } }
    else if (e.key === "Escape") { out.hidden = true; q.focus(); }
  });
  document.addEventListener("click", function (e) { if (!e.target.closest(".search")) out.hidden = true; });
})();
