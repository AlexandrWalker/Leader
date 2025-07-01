gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, ScrollSmoother);

document.addEventListener('DOMContentLoaded', () => {

  /**
   * Инициализация Lenis
   */
  const lenis = new Lenis({
    anchors: {
      offset: -100,
    }
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  /**
   * Управляет поведением меню-бургера.
   */
  function burgerNav() {
    const burgerBtn = document.querySelector('.burger-btn');
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerClose = document.querySelector('.burger-close');
    const overlay = document.querySelector('.burger-overlay');
    const elements = document.querySelectorAll('.burger-menu__list a');

    /**
     * Переключает видимость меню.
     */
    const toggleMenu = () => {
      const isOpened = burgerBtn.classList.toggle('burger-btn--opened');
      burgerMenu.classList.toggle('burger-menu--opened', isOpened);
      lenis.stop();
    };

    /**
     * Закрывает меню.
     */
    const closeMenu = () => {
      burgerBtn.classList.remove('burger-btn--opened');
      burgerMenu.classList.remove('burger-menu--opened');
      lenis.start();
    };

    // Открытие/закрытие меню по клику на бургер
    burgerBtn.addEventListener('click', toggleMenu);

    // Закрытие меню по клику на кнопку закрытия или на overlay
    [burgerClose, overlay].forEach((element) => element.addEventListener('click', closeMenu));

    // Закрытие меню при клике вне области меню и бургера
    document.addEventListener('click', (event) => {
      if (!burgerMenu.contains(event.target) && !burgerBtn.contains(event.target)) {
        closeMenu();
      }
    });

    // Закрытие меню при нажатии на кнопку "Esc"
    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });

    elements.forEach((element) => element.addEventListener('click', closeMenu));
  }
  burgerNav();

  if (document.querySelector('.accordion-parent')) {
    document.querySelectorAll('.accordion-parent').forEach((accordionContainer) => {

      var accordionHead = accordionContainer.querySelectorAll('.accordion'),
        accordionActiveClass = 'accordion-active',
        accordionActive = accordionContainer.getElementsByClassName(accordionActiveClass);

      Array.from(accordionHead).forEach(function (accordionItem, i, accordionHead) {
        accordionItem.addEventListener('click', function (e) {
          e.stopPropagation();

          if (accordionActive.length > 0 && accordionActive[0] !== this) {
            accordionActive[0].classList.remove(accordionActiveClass);
          }
          this.classList.toggle(accordionActiveClass);
          // ScrollTrigger.refresh();

          window.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
              accordionItem.classList.remove(accordionActiveClass)
            }
          });

          document.addEventListener('click', (e) => {
            const withinBoundaries = e.composedPath().includes(accordionItem);

            if (!withinBoundaries) {
              accordionItem.classList.remove(accordionActiveClass);
            }
          })
        });
      });
    });
  }

  const storySlider = new Swiper(".history__slider", {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 10,
    speed: 600,
    mousewheel: {
      forceToAxis: true,
    },
    breakpoints: {
      600: {
        slidesPerView: 'auto',
        spaceBetween: 20,
      },
    },
  });

  $(window).on('resize load', function () {

    if (window.innerWidth <= 768) {
      const services__items = document.querySelectorAll('.services__item');

      services__items.forEach(services__item => {
        services__item.setAttribute("href", "javascript:void");
      });
    }

  })

  const timelineWrapper = document.querySelector('.timeline-wrapper');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineWidth = timelineWrapper.scrollWidth - window.innerWidth;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".history",
      start: 'top 0',
      endTrigger: ".footer",
      end: `+=${timelineWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: self => {

        const progress = self.progress;
        const itemIndex = Math.floor(progress * (timelineItems.length - 1));

        timelineItems.forEach(item => item.classList.remove('swiper-slide-active'));

        if (timelineItems[itemIndex]) {
          timelineItems[itemIndex].classList.add('swiper-slide-active');
        }
      }
    }
  });

  tl.to(timelineWrapper, {
    x: -timelineWidth,
    ease: "none"
  });

  document.querySelector('.button-next')?.addEventListener('click', () => {
    const currentScroll = Math.abs(gsap.getProperty(timelineWrapper, "x"));
    const nextScroll = Math.min(currentScroll + window.innerWidth * 0.8, timelineWidth);
    gsap.to(timelineWrapper, { x: -nextScroll, duration: 0.5 });
  });

  document.querySelector('.button-prev')?.addEventListener('click', () => {
    const currentScroll = Math.abs(gsap.getProperty(timelineWrapper, "x"));
    const prevScroll = Math.max(currentScroll - window.innerWidth * 0.8, 0);
    gsap.to(timelineWrapper, { x: -prevScroll, duration: 0.5 });
  });

});
