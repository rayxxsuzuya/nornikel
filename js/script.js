const headerBurger = document.querySelector('.header__burger');
const headerMobile = document.querySelector('.header-mobile');
const headerMobileBg = document.querySelector('.header-mobile__bg');
const headerMobileClose = document.querySelector('.header-mobile__close');

headerBurger.addEventListener('click', () => {
  headerBurger.classList.toggle('active');
  headerMobile.classList.toggle('active');
});

headerMobileBg.addEventListener('click', () => {
  headerBurger.classList.remove('active');
  headerMobile.classList.remove('active');
})

headerMobileClose.addEventListener('click', () => {
  headerBurger.classList.remove('active');
  headerMobile.classList.remove('active');
})

navLinks = document.querySelectorAll('.header-mobile .header-mobile__link');

navLinks.forEach(el => {
  el.addEventListener('click', function () {
    const hm = document.querySelector('.header-mobile');
    if (hm) {
      hm.classList.remove('active');
    }
    document.body.style.overflow = 'visible';
  })
});

const upButton = document.querySelector('.footer__up');

if (upButton) {
  upButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


if (document.querySelector('.spage')) {
  const tabs = document.querySelectorAll('.spage__tab');
  const contents = document.querySelectorAll('.spage__content');
  const heroTitle = document.querySelector('.services-page-hero__title');
  const heroSection = document.querySelector('.service-page-hero');

  function switchTab(index) {
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    tabs[index].classList.add('active');
    contents[index].classList.add('active');

    // Меняем заголовок H1
    heroTitle.textContent = tabs[index].textContent;

    const bgImage = tabs[index].getAttribute('data-bg');
    if (bgImage) {
      heroSection.style.backgroundImage = `url(${bgImage})`;
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      switchTab(index);
    });
  });

  const activeTab = document.querySelector('.spage__tab.active');
  if (activeTab) {
    const initialBg = activeTab.getAttribute('data-bg');
    if (initialBg) {
      heroSection.style.backgroundImage = `url(${initialBg})`;
    }
  }

  heroSection.style.backgroundSize = 'cover';
  heroSection.style.backgroundPosition = 'center';
  heroSection.style.transition = 'background-image 0.5s ease-in-out';
}

const heroImages = new Swiper('.hero__images', {
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: '.hero__pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + String(index + 1).padStart(2, '0') + '</span>';
    }
  },
  navigation: {
    nextEl: '.intro__arrow.next',
    prevEl: '.intro__arrow.prev',
  }
});

const introSlider = new Swiper('.intro__slider', {
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: '.hero .intro__pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + String(index + 1).padStart(2, '0') + '</span>';
    }
  },
  navigation: {
    nextEl: '.intro__arrow.next',
    prevEl: '.intro__arrow.prev',
  }
});

let isHeroChanging = false;
let isIntroChanging = false;

heroImages.on('slideChange', function () {
  if (!isIntroChanging) {
    isHeroChanging = true;
    introSlider.slideToLoop(this.realIndex, 0);
    setTimeout(() => {
      isHeroChanging = false;
    }, 50);
  }
});

introSlider.on('slideChange', function () {
  if (!isHeroChanging) {
    isIntroChanging = true;
    heroImages.slideToLoop(this.realIndex, 0);
    setTimeout(() => {
      isIntroChanging = false;
    }, 50);
  }
});

introSlider.on('paginationUpdate', function () {
  const bullets = document.querySelectorAll('.hero .intro__pagination .swiper-pagination-bullet');
  bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', function () {
      if (!isIntroChanging) {
        isHeroChanging = true;
        heroImages.slideToLoop(index, 300);
        setTimeout(() => {
          isHeroChanging = false;
        }, 350);
      }
    });
  });
});

heroImages.on('paginationUpdate', function () {
  const bullets = document.querySelectorAll('.hero__pagination .swiper-pagination-bullet');
  bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', function () {
      if (!isHeroChanging) {
        isIntroChanging = true;
        introSlider.slideToLoop(index, 300);
        setTimeout(() => {
          isIntroChanging = false;
        }, 350);
      }
    });
  });
});

const controlSlider = new Swiper('.control__slider', {
  loop: true,
  slidesPerView: 6,
  spaceBetween: 8,

  navigation: {
    nextEl: '.control__arrow.next',
    prevEl: '.control__arrow.prev',
  },

  breakpoints: {
    1050: {
      slidesPerView: 6,
    },
    768: {
      slidesPerView: 4,
    },
    480: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 2,
    },
  }
});

const gallerySlider = new Swiper('.gallery__slider', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 209,

  navigation: {
    nextEl: '.gallery .control__arrow.next',
    prevEl: '.gallery .control__arrow.prev',
  },

  breakpoints: {
    1132: {
      slidesPerView: 2,
      spaceBetween: 209,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 28,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 28,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 28,
    },
  }
});

const servicesSlider = new Swiper('.services__slider', {
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: '.services .intro__pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + String(index + 1).padStart(2, '0') + '</span>';
    }
  },
  navigation: {
    nextEl: '.services__arrow.next',
    prevEl: '.services__arrow.prev',
  }
});

const srkSlider = new Swiper('.srk__slider', {
  loop: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.services__arrow.next',
    prevEl: '.services__arrow.prev',
  }
});

// Синхронизация слайдеров
let isSrkChanging = false;
let isServicesChanging = false;

srkSlider.on('slideChange', function () {
  if (!isServicesChanging) {
    isSrkChanging = true;
    servicesSlider.slideToLoop(this.realIndex, 0);
    setTimeout(() => {
      isSrkChanging = false;
    }, 50);
  }
});

servicesSlider.on('slideChange', function () {
  if (!isSrkChanging) {
    isServicesChanging = true;
    srkSlider.slideToLoop(this.realIndex, 0);
    setTimeout(() => {
      isServicesChanging = false;
    }, 50);
  }
});

// Синхронизация при клике на пагинацию
servicesSlider.on('paginationUpdate', function () {
  const bullets = document.querySelectorAll('.services .intro__pagination .swiper-pagination-bullet');
  bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', function () {
      if (!isServicesChanging) {
        isSrkChanging = true;
        srkSlider.slideToLoop(index, 300);
        setTimeout(() => {
          isSrkChanging = false;
        }, 350);
      }
    });
  });
});

const aboutSlider = new Swiper('.about__slider', {
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: '.about .intro__pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + String(index + 1).padStart(2, '0') + '</span>';
    }
  },
  navigation: {
    nextEl: '.about .services__arrow.next',
    prevEl: '.about .services__arrow.prev',
  }
});

const npageSlider = new Swiper('.npage__slider', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 28,
  pagination: {
    el: '.npage .intro__pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + String(index + 1).padStart(2, '0') + '</span>';
    }
  },
  navigation: {
    nextEl: '.npage .services__arrow.next',
    prevEl: '.npage .services__arrow.prev',
  },

  breakpoints: {
    940: {
      slidesPerView: 'auto',
      spaceBetween: 28,
    },
    750: {
      slidesPerView: 3,
      spaceBetween: 28,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 28,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 28,
    },
  }
});

const controlSlider2 = new Swiper('.control__slider.second', {
  loop: true,
  slidesPerView: 6,
  slidesPerGroup: 3,
  spaceBetween: 8,
  pagination: {
    el: '.companies .intro__pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + String(index + 1).padStart(2, '0') + '</span>';
    }
  },
  navigation: {
    nextEl: '.companies .services__arrow.next',
    prevEl: '.companies .services__arrow.prev',
  },
  breakpoints: {
    1255: {
      slidesPerView: 6,
    },
    750: {
      slidesPerView: 4,
    },
    480: {
      slidesPerView: 3,
    },
    320: {
      slidesPerView: 2,
    },
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-modal]');
  const successModal = document.getElementById('successModal');

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal');
      const modalWindow = document.getElementById(modalId);
      if (modalWindow) {
        const modal = modalWindow.closest('.modal');
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      }
    });
  });

  const form = document.querySelector('.modal__form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (firstModal) {
        firstModal.closest('.modal').classList.remove('active');
      }
      if (successModal) {
        successModal.closest('.modal').classList.add('active');
      }
    });
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    if (!document.querySelector('.modal.active')) {
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.modal__close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });

  document.querySelectorAll('.modal__bg').forEach(bg => {
    bg.addEventListener('click', () => {
      const modal = bg.closest('.modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const hhSection = document.querySelector('.hh');
  const images = document.querySelectorAll('.hh__image');
  const labels = document.querySelectorAll('.hh__label');
  
  function handleScroll() {
    const sectionTop = hhSection.getBoundingClientRect().top;
    
    if (sectionTop <= 350) {
      const progress = Math.min(Math.max((350 - sectionTop) / 600, 0), 1);
      
      const maxShift = 350;
      const shift = progress * maxShift;
      
      images.forEach(img => {
        img.style.transform = `translateX(-${shift}px)`;
      });
      
      labels.forEach(label => {
        label.style.transform = `translateX(-${shift}px)`;
      });
    } else {
      images.forEach(img => {
        img.style.transform = `translateX(0)`;
      });
      
      labels.forEach(label => {
        label.style.transform = `translateX(0)`;
      });
    }
  }
  
  let ticking = false;
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  handleScroll();
});