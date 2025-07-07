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

  const workSlider = new Swiper(".work__slider", {
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    spaceBetween: 0,
    speed: 600,
    mousewheel: {
      forceToAxis: true,
    },
    breakpoints: {
      769: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  });

  const customersSlider = new Swiper(".customers__slider", {
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    spaceBetween: 10,
    loop: true,
    speed: 600,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: ".clients__slider-btn--next",
      prevEl: ".clients__slider-btn--prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    breakpoints: {
      567: {
        slidesPerView: 3,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
        },
      },
      769: {
        slidesPerView: 6,
        spaceBetween: 20,
        pagination: false,
      },
    },
  });

  const clientsSlider = new Swiper(".clients__slider", {
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    spaceBetween: 10,
    loop: true,
    speed: 600,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: ".clients__slider-btn--next",
      prevEl: ".clients__slider-btn--prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    breakpoints: {
      567: {
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
        },
      },
      769: {
        slidesPerView: 3,
        spaceBetween: 20,
        pagination: false,
      },
    },
  });

  const objectsSlider = new Swiper(".objects__slider", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 600,
    grabCursor: true,
    autoHeight: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    mousewheel: {
      forceToAxis: true,
    },
    // navigation: false,
    breakpoints: {
      769: {
        navigation: {
          nextEl: ".objects__slider-btn--next",
          prevEl: ".objects__slider-btn--prev",
        },
      },
    },
  });

  const objectsSliderStep = new Swiper(".objects__slider--step", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    speed: 600,
    grabCursor: false,
    autoHeight: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    mousewheel: false,
  });

  objectsSlider.controller.control = objectsSliderStep;
  objectsSliderStep.controller.control = objectsSlider;

  const objects__gallerys = document.querySelectorAll('.objects__gallery');
  objects__gallerys.forEach(objects__gallery => {

    const objectsGalleryMini = new Swiper(objects__gallery.parentNode.querySelector('.objects__gallery--mini'), {
      slidesPerView: 3,
      spaceBetween: 10,
      speed: 600,
      grabCursor: false,
      mousewheel: false,
      watchSlidesProgress: true,
      breakpoints: {
        769: {
          spaceBetween: 20,
        },
      },
    });

    const objectsGallery = new Swiper(objects__gallery, {
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 600,
      grabCursor: false,
      mousewheel: false,
      thumbs: {
        swiper: objectsGalleryMini,
      },
      breakpoints: {
        769: {
          spaceBetween: 20,
        },
      },
    });
  });

  const commandSlider = new Swiper(".command__slider", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 100,
    speed: 600,
    loop: true,
    grabCursor: true,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: ".command__slider-btn--next",
      prevEl: ".command__slider-btn--prev",
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

  const inputElements = document.querySelectorAll('.form-input');
  const textareaElements = document.querySelectorAll('.form-textarea');
  const className = 'filled';

  inputElements.forEach(element => {
    element.addEventListener('input', function () {
      if (this.value.trim() !== '') {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    });
  });

  textareaElements.forEach(element => {
    element.addEventListener('input', function () {
      if (this.value.trim() !== '') {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    });
  });

  /**
 * Управляет переключением вкладок на странице.
 * Добавляет и удаляет классы активности для кнопок и панелей вкладок.
 * Поддерживает вложенные табы любой глубины и сохраняет активное состояние у вложенных табов при переключении внешних.
 */
  if (document.querySelector('.tabs')) {
    document.querySelectorAll('.tabs').forEach((tabsContainer) => {
      tabsContainer.addEventListener('click', (event) => {
        const tabsBtn = event.target.closest('.tabs__btn');
        if (!tabsBtn || !tabsContainer.contains(tabsBtn)) return;

        // Останавливаем всплытие, чтобы вложенные табы не влияли на родительские
        event.stopPropagation();

        // Ищем ближайший контейнер, к которому принадлежит нажатая кнопка
        const currentTabsContainer = tabsBtn.closest('.tabs');
        if (!currentTabsContainer) return;

        // Сбрасываем активные состояния кнопок и панелей только внутри текущего уровня
        const tabsBtns = Array.from(currentTabsContainer.querySelectorAll('.tabs__btn'));
        const tabsPanels = Array.from(currentTabsContainer.querySelectorAll('.tabs__panel'));

        tabsBtns.forEach((btn) => {
          if (btn.closest('.tabs') === currentTabsContainer) {
            btn.classList.remove('tabs__btn--active');
          }
        });

        tabsPanels.forEach((panel) => {
          if (panel.closest('.tabs') === currentTabsContainer) {
            panel.classList.remove('tabs__panel--active');
          }
        });

        // Устанавливаем активное состояние для выбранной вкладки
        tabsBtn.classList.add('tabs__btn--active');

        const targetPanel = currentTabsContainer.querySelector(
          `.tabs__panel[data-tab="${tabsBtn.dataset.tab}"]`,
        );
        if (targetPanel) {
          targetPanel.classList.add('tabs__panel--active');
        }
      });
    });
  };

  /**
   * Кнопка куки
   */
  if (('; ' + document.cookie).split(`; COOKIE_ACCEPT=`).pop().split(';')[0] !== '1') {
    const cookiesNotify = document.getElementById('plate-cookie');

    if (cookiesNotify) {
      cookiesNotify.style.display = 'block';
    }
  }

  /**
   * Инициализация TransferElements
   */
  if (document.querySelector('.transfer-pos-1')) {
    new TransferElements(
      {
        sourceElement: document.querySelector('.transfer-elem-1'),
        breakpoints: {
          768: {
            targetElement: document.querySelector('.transfer-pos-1')
          }
        },
      }
    );
  }
  // if (document.querySelector('.transfer-pos-2')) {
  //   const transferElem2 = document.querySelectorAll('.transfer-elem-2');
  //   const transferPos2 = document.querySelectorAll('.transfer-pos-2');

  //   transferElem2.forEach(transferElem => {
  //     // transferPos2.forEach(transferPos => {
  //       new TransferElements(
  //         {
  //           sourceElement: transferElem,
  //           breakpoints: {
  //             768: {
  //               targetElement: transferPos
  //             }
  //           },
  //         }
  //       );
  //     // });
  //   });
  // }

  /**
   * Таймлапс
   */
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

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('warning-plate').remove();
}
