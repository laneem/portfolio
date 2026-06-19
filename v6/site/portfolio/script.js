/* =====================================================================
   Karpaga Meenal — Portfolio · shared behaviour
   Vanilla JS, no dependencies. Loaded with `defer` on every page.
   ===================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. THEME ------------------------------------------- */
  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var stored = safeGet("km-theme");
  if (stored) {
    root.setAttribute("data-theme", stored);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }

  function toggleTheme() {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    safeSet("km-theme", next);
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-theme-toggle]");
    if (t) toggleTheme();
  });

  /* ---------- 2. CUSTOM CURSOR + CLICK BURST --------------------- */
  var canvas, ctx, dpr, particles = [], rafId = null;

  function initCanvas() {
    if (reduceMotion) return;
    canvas = document.createElement("canvas");
    canvas.id = "crack-layer";
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);
  }
  function resize() {
    if (!canvas) return;
    dpr = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function accentColor() {
    var c = getComputedStyle(root).getPropertyValue("--accent").trim();
    return c || "#4f6ef7";
  }
  function inkColor() {
    var c = getComputedStyle(root).getPropertyValue("--ink").trim();
    return c || "#1c1a16";
  }

  /* ---- custom cursor ring (fine pointer / desktop only) -------- */
  var mx = -200, my = -200, rx = -200, ry = -200;

  function initCursor() {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.appendChild(ring);

    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
    });
    document.addEventListener("mouseenter", function () {
      ring.classList.add("is-visible");
    });
    document.addEventListener("mouseleave", function () {
      ring.classList.remove("is-visible");
    });
    document.addEventListener("mouseover", function (e) {
      var over = !!e.target.closest("a,button,[role='button'],.case-card");
      ring.classList.toggle("cursor--hovering", over);
    });
    document.addEventListener("mousedown", function () {
      ring.classList.add("cursor--clicking");
    });
    document.addEventListener("mouseup", function () {
      ring.classList.remove("cursor--clicking");
    });

    (function lerpRing() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      requestAnimationFrame(lerpRing);
    }());
  }

  /* ---- click burst --------------------------------------------- */
  function spawnBurst(x, y) {
    if (!ctx) return;
    var ink    = inkColor();
    var accent = accentColor();

    /* expanding ring — ink colored, always readable on any bg */
    particles.push({ type: "ring", x: x, y: y, r: 3, life: 1, color: ink });

    /* radiating dots — accent colored, add a pop of brand color */
    var n = 10;
    for (var i = 0; i < n; i++) {
      var angle = (i / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      var spd   = 1.8 + Math.random() * 2.8;
      particles.push({
        type: "dot", x: x, y: y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        r: 1.8 + Math.random() * 1.8,
        life: 1, color: accent
      });
    }
    if (!rafId) rafId = requestAnimationFrame(draw);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var alive = false;
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.life -= p.type === "ring" ? 0.038 : 0.032;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      alive = true;
      ctx.globalAlpha = p.life * 0.88;
      if (p.type === "ring") {
        p.r += (32 - p.r) * 0.14;
        ctx.strokeStyle = p.color;
        ctx.lineWidth   = 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.9; p.vy *= 0.9;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    if (alive) {
      rafId = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rafId = null;
    }
  }

  if (!reduceMotion) {
    initCanvas();
    initCursor();
    document.addEventListener("pointerdown", function (e) {
      if (e.button && e.button !== 0) return;
      spawnBurst(e.clientX, e.clientY);
    });
  }

  /* ---------- 3. SCROLL REVEAL ----------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 4. CASE-STUDY SCROLLSPY ---------------------------- */
  var indexLinks = document.querySelectorAll(".cs-index a");
  var sections = document.querySelectorAll(".cs-section[id]");
  if (indexLinks.length && sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var id = en.target.getAttribute("id");
          indexLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-25% 0px -65% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 5. SCROLL PROGRESS --------------------------------- */
  var fillEl = document.getElementById("scroll-fill");
  if (fillEl) {
    window.addEventListener("scroll", function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      fillEl.style.width = ((window.scrollY / max) * 100).toFixed(2) + "%";
    }, { passive: true });
  }

  /* ---------- 6. PARALLAX HERO ----------------------------------- */
  (function () {
    if (reduceMotion) return;
    var portrait  = document.querySelector(".hero__portrait");
    var heroText  = document.querySelector(".hero__text");
    var hint      = document.querySelector(".scroll-hint");
    if (!portrait && !heroText) return;

    var ticking = false;

    function applyParallax() {
      var sy = window.scrollY;

      /* only run while hero is roughly in view */
      if (sy > window.innerHeight * 1.4) { ticking = false; return; }

      /* desktop only — portrait stacks on mobile, parallax looks off there */
      if (window.innerWidth > 820) {
        if (portrait) portrait.style.transform = "translateY(" + (sy * 0.22) + "px)";
        if (heroText)  heroText.style.transform  = "translateY(" + (sy * 0.07) + "px)";
      }

      /* scroll hint fades once user starts scrolling */
      if (hint) hint.classList.toggle("is-hidden", sy > 60);

      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(applyParallax); ticking = true; }
    }, { passive: true });
  }());

  /* ---------- 7. FOOTER YEAR ------------------------------------- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- 6. HERO TYPEWRITER --------------------------------- */
  var twEl = document.getElementById("hero-typewriter");
  if (twEl) {
    var twLines = [
      "Designing screens enterprises can't afford to get wrong.",
      "Turning complex flows into clarity — from research to ship.",
      "Research-led UX for regulated, high-stakes products."
    ];
    var twIdx = 0, twChar = 0, twDeleting = false;

    function twTick() {
      var line = twLines[twIdx];
      if (twDeleting) {
        twEl.textContent = line.slice(0, --twChar);
      } else {
        twEl.textContent = line.slice(0, ++twChar);
      }
      if (!twDeleting && twChar === line.length) {
        return setTimeout(function () { twDeleting = true; twTick(); }, 2200);
      }
      if (twDeleting && twChar === 0) {
        twDeleting = false;
        twIdx = (twIdx + 1) % twLines.length;
        return setTimeout(twTick, 500);
      }
      setTimeout(twTick, twDeleting ? 28 : 52);
    }

    if (reduceMotion) {
      twEl.textContent = twLines[0];
    } else {
      setTimeout(twTick, 900);
    }
  }
})();
