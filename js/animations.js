// Animações do site Meeting Coreia-Brasil
// Stack: GSAP + ScrollTrigger + Lenis

gsap.registerPlugin(ScrollTrigger);

// ===== LENIS (smooth scroll) =====
const lenis = new Lenis({
  smooth: true,
  duration: 1.1,
  easing: (t) => 1 - Math.pow(1 - t, 4),
});

// Integração obrigatória Lenis <-> ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ===== ACESSIBILIDADE =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animatedSelectors = [
  '#home img.icone',
  '#home img.pastor',
  '#home img.logo',
  '#home .box h2',
  '#home .box h1',
  '#home .box h3',
  '#home .box p',
  '.divisa',
  '#info .box',
  '#info .box p',
  '.button',
];

if (prefersReducedMotion) {
  // Sem animações: tudo visível e no estado final.
  gsap.set(animatedSelectors, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'all' });
  gsap.set('#info .box h2', { '--line-scale': 1 });
} else {
  // ===== ESTADOS INICIAIS (FOUC fix) =====
  gsap.set('#home img.icone', { opacity: 0, y: -20 });
  gsap.set('#home img.pastor', { opacity: 0, scale: 0.96 });
  gsap.set('#home img.logo', { opacity: 0, y: 30 });
  gsap.set(['#home .box h2', '#home .box h1', '#home .box h3', '#home .box p'], { opacity: 0, y: 20 });
  gsap.set('.divisa', { opacity: 0 });
  gsap.set('#info .box', { opacity: 0, y: 30 });
  gsap.set('#info .box p', { opacity: 0, y: 20 });
  gsap.set('#info .box h2', { '--line-scale': 0 });
  gsap.set('.button', { opacity: 0, y: 20, scale: 0.96 });

  // ===== HERO (entrada no load) =====
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .to('#home img.icone',  { opacity: 1, y: 0, duration: 0.9 })
    .to('#home img.pastor', { opacity: 1, scale: 1, duration: 1.0 }, '-=0.7')
    .to('#home img.logo',   { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
    .to('#home .box h2',    { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
    .to('#home .box h1',    { opacity: 1, y: 0, duration: 0.8 }, '-=0.65')
    .to('#home .box h3',    { opacity: 1, y: 0, duration: 0.8 }, '-=0.65')
    .to('#home .box p',     { opacity: 1, y: 0, duration: 0.8 }, '-=0.65');

  // ===== DIVISA =====
  gsap.to('.divisa', {
    opacity: 1,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.divisa',
      start: 'top 85%',
    },
  });

  // ===== #INFO — boxes individuais =====
  gsap.utils.toArray('#info .box').forEach((box) => {
    const h2 = box.querySelector('h2');
    const ps = box.querySelectorAll('p');

    const boxTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: box,
        start: 'top 85%',
      },
    });

    boxTl.to(box, { opacity: 1, y: 0, duration: 1.4 });

    if (h2) {
      boxTl.to(h2, {
        '--line-scale': 1,
        duration: 1.5,
        ease: 'power2.inOut',
      }, '-=1.1');
    }

    if (ps.length) {
      boxTl.to(ps, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.2,
      }, '-=1.0');
    }
  });

  // ===== BOTÃO =====
  gsap.to('.button', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.button',
      start: 'top 95%',
    },
    onComplete: () => {
      // Limpa transforms inline para deixar o :hover do CSS atuar sem conflito.
      gsap.set('.button', { clearProps: 'transform' });
    },
  });

  // ===== PARALLAX — bg do #info (muito sutil) =====
  gsap.to('#info img.bg', {
    y: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: '#info',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}
