/* ─── STARFIELD ───────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        r:       Math.random() * 0.8 + 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        speed:   Math.random() * 0.12 + 0.02,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.twinkle += s.speed * 0.04;
      const alpha = s.opacity * (0.5 + 0.5 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,244,240,${alpha})`;
      ctx.fill();
    }
  }

  function loop() {
    drawStars();
    requestAnimationFrame(loop);
  }

  resize();
  createStars(220);
  loop();

  window.addEventListener('resize', () => {
    resize();
    createStars(220);
  });
})();


/* ─── NAV FROST ON SCROLL ─────────────────────────────────────── */
(function () {
  const nav = document.getElementById('archiveNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
})();


/* ─── PARALLAX ORBS ───────────────────────────────────────────── */
(function () {
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  if (!orb1 || !orb2) return;

  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    orb1.style.transform = `translate(${dx * 16}px, ${dy * 12}px)`;
    orb2.style.transform = `translate(${-dx * 12}px, ${-dy * 8}px)`;
  });
})();


/* ─── SCROLL REVEAL ───────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => observer.observe(el));
})();


/* ─── SMOOTH ANCHOR SCROLL ────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ─── SECRET CYCLING ──────────────────────────────────────────── */
(function () {
  const secrets = [
    "Most people seek certainty. Masters seek understanding.",
    "The signal is quiet because it is not trying to convince you.",
    "What is hidden is not always withheld. Sometimes it is waiting.",
    "Mystery is not the absence of truth. It is the doorway to it.",
    "The future does not arrive loudly. It accumulates in silence.",
    "You cannot decode a pattern you refuse to acknowledge.",
    "Every great work begins with something no one else could see.",
    "Precision is not the enemy of wonder. It is its highest expression.",
    "The rarest commodity is not attention. It is discernment.",
    "What you protect from scrutiny is what still controls you.",
    "Clarity without depth is just decoration.",
    "The question you avoid answering is the one most worth asking.",
    "Scarcity of truth is manufactured. It is always available to those who remain still.",
    "You are not behind. You are preparing.",
  ];

  const textEl    = document.getElementById('secretText');
  const counterEl = document.getElementById('secretCounter');
  const btn       = document.getElementById('nextSecret');

  let index = -1;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function showSecret(i) {
    textEl.classList.add('fading');

    setTimeout(() => {
      textEl.textContent = secrets[i];
      counterEl.textContent = `${pad(i + 1)} / ${pad(secrets.length)}`;
      textEl.classList.remove('fading');
    }, 320);
  }

  btn.addEventListener('click', () => {
    index = (index + 1) % secrets.length;
    showSecret(index);
  });

  /* "Reveal a Secret" in the hero scrolls down and triggers first secret */
  const heroBtn = document.getElementById('revealBtn');
  heroBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const section = document.getElementById('archive-secrets');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });

    /* Delay trigger until scroll settles */
    setTimeout(() => {
      if (index === -1) {
        index = 0;
        showSecret(index);
      }
    }, 800);
  });
})();


/* ─── EASTER EGG ──────────────────────────────────────────────── */
(function () {
  const glyph   = document.getElementById('easterGlyph');
  const message = document.getElementById('easterMessage');
  let clicks = 0;

  glyph.addEventListener('click', () => {
    clicks++;

    /* Brief pulse feedback on each click */
    glyph.style.transition = 'opacity 0.1s';
    glyph.style.opacity = '0.5';
    setTimeout(() => {
      glyph.style.transition = 'opacity 0.5s';
      glyph.style.opacity = '';
    }, 120);

    if (clicks === 3) {
      glyph.classList.add('activated');
      message.style.display = 'block';

      /* Trigger reflow so transition fires */
      void message.offsetHeight;
      message.classList.add('visible');
    }
  });
})();