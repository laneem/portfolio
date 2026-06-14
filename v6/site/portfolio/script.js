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

  /* ---------- 2. CLICK-CRACK signature --------------------------- */
  /* Thin fracture lines radiate from the cursor and dissolve.        */
  var canvas, ctx, dpr, fractures = [], rafId = null;

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
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function accentColor() {
    var c = getComputedStyle(root).getPropertyValue("--accent").trim();
    return c || "#bd5d3e";
  }

  function spawnCrack(x, y) {
    if (!ctx) return;
    var spokes = 5 + Math.floor(Math.random() * 4);
    var color = accentColor();
    var base = Math.random() * Math.PI * 2;
    for (var i = 0; i < spokes; i++) {
      var angle = base + (i / spokes) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      var len = 26 + Math.random() * 42;
      // build a slightly jagged segmented line
      var pts = [{ x: x, y: y }];
      var steps = 3 + Math.floor(Math.random() * 2);
      var px = x, py = y;
      for (var s = 0; s < steps; s++) {
        var seg = len / steps;
        var jitter = (Math.random() - 0.5) * 10;
        px += Math.cos(angle) * seg + Math.cos(angle + 1.57) * jitter;
        py += Math.sin(angle) * seg + Math.sin(angle + 1.57) * jitter;
        pts.push({ x: px, y: py });
      }
      fractures.push({ pts: pts, life: 1, color: color, w: 0.6 + Math.random() * 1.1 });
    }
    if (!rafId) rafId = requestAnimationFrame(draw);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var alive = false;
    for (var i = 0; i < fractures.length; i++) {
      var f = fractures[i];
      f.life -= 0.035;
      if (f.life <= 0) continue;
      alive = true;
      ctx.globalAlpha = Math.max(0, f.life) * 0.9;
      ctx.strokeStyle = f.color;
      ctx.lineWidth = f.w;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(f.pts[0].x, f.pts[0].y);
      var reach = Math.ceil(f.pts.length * (1 - f.life) * 1.6) + 1;
      for (var p = 1; p < Math.min(f.pts.length, reach); p++) {
        ctx.lineTo(f.pts[p].x, f.pts[p].y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    if (alive) {
      rafId = requestAnimationFrame(draw);
    } else {
      fractures = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rafId = null;
    }
  }

  if (!reduceMotion) {
    initCanvas();
    document.addEventListener("pointerdown", function (e) {
      // ignore right-click / non-primary
      if (e.button && e.button !== 0) return;
      spawnCrack(e.clientX, e.clientY);
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

  /* ---------- 5. FOOTER YEAR ------------------------------------- */
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
