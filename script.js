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
        opacity: Math.random() * 0.6 + 0.1,
        speed:   Math.random() * 0.15 + 0.02,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
  }

  function drawStars(t) {
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

  let raf;
  function loop(t) {
    drawStars(t);
    raf = requestAnimationFrame(loop);
  }

  resize();
  createStars(180);
  loop(0);

  window.addEventListener('resize', () => {
    resize();
    createStars(180);
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
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => observer.observe(el));
})();


/* ─── PARALLAX ORB (subtle mouse tracking on hero) ───────────── */
(function () {
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');

  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orb1.style.transform = `translate(${dx * 18}px, ${dy * 14}px) scale(1)`;
    orb2.style.transform = `translate(${-dx * 14}px, ${-dy * 10}px) scale(1)`;
  });
})();


/* ─── NAV FADE ON SCROLL ──────────────────────────────────────── */
(function () {
  const nav = document.querySelector('.nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(5,5,7,0.85)';
      nav.style.backdropFilter = 'blur(12px)';
      nav.style.transition = 'background 0.4s, backdrop-filter 0.4s';
    } else {
      nav.style.background = 'transparent';
      nav.style.backdropFilter = 'none';
    }
  });
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
