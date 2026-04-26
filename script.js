const larguraDaTela = window.innerWidth;

// ===== SWIPER 3 =====
let swiper3;

if (larguraDaTela < 800) {
  swiper3 = new Swiper(".mySwiper3", {
    grabCursor: true,
    effect: "creative",
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    creativeEffect: {
      limitProgress: 3,
      prev: {
        shadow: false,
        translate: ["-120%", 0, -200],
        scale: 0.9,
        opacity: 0.6,
      },
      next: {
        translate: ["120%", 0, -200],
        scale: 0.9,
        opacity: 0.6,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
} else {
  swiper3 = new Swiper(".mySwiper3", {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// para o autoplay logo ao carregar
swiper3.autoplay.stop();


// ===== SWIPER 4 =====
let swiper4;

if (larguraDaTela < 800) {
  swiper4 = new Swiper(".mySwiper4", {
    slidesPerView: 1.2,
    spaceBetween: 16,
    loop: true,
    grabCursor: true,
    allowTouchMove: true,
    speed: 5000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
} else {
  swiper4 = new Swiper(".mySwiper4", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    allowTouchMove: true,
    speed: 5000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// para o autoplay logo ao carregar
swiper4.autoplay.stop();


// ===== OBSERVER =====
// troque pelos seletores reais das seções
const secaoSwiper3 = document.querySelector("#depoimentos");
const secaoSwiper4 = document.querySelector("#modulos");

const observerOptions = {
  threshold: 0.35, // quando ~35% da seção estiver visível
};

const observer3 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      swiper3.autoplay.start();
    } else {
      swiper3.autoplay.stop();
    }
  });
}, observerOptions);

const observer4 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      swiper4.autoplay.start();
    } else {
      swiper4.autoplay.stop();
    }
  });
}, observerOptions);

if (secaoSwiper3) observer3.observe(secaoSwiper3);
if (secaoSwiper4) observer4.observe(secaoSwiper4);