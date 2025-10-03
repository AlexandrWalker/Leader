document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader');
  const removePreloader = function () {
    preloader.classList.add("preloader-none");
    preloader.removeEventListener('transitionend', removePreloader);
  };
  const hidePreloader = function () {
    preloader.classList.add("hidden");
    preloader.addEventListener('transitionend', removePreloader);
  };
  if (preloader) {
    window.addEventListener('load', (event) => {
      hidePreloader()
    });
  }

  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
});


window.addEventListener('load', () => {

  // setTimeout(() => {
  document.documentElement.classList.remove('preloaderDownload');
  // }, 800);

  const checkEditMode = document.querySelector('.bx-panel-toggle-on') ?? null;

  /**
   * Инициализация Lenis
   */
  // const lenis = new Lenis({
  //   anchors: {
  //     offset: -60,
  //   },
  //   duration: 1.2,
  //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //   smoothWheel: true
  // });

  // lenis.on('scroll', ScrollTrigger.update);

  // gsap.ticker.add((time) => {
  //   lenis.raf(time * 500);
  // });
  // gsap.ticker.lagSmoothing(0);

  const lenis = new Lenis({
    anchors: {
      offset: -60,
    },
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });

  /**
   * Инициализация Fancybox
   */
  Fancybox.bind('[data-fancybox]', {
    mainStyle: {
      '--f-html-bg': 'transparent'
    },
    Html: {
      autoSize: false,
    },
    on: {
      'Carousel.ready': () => {
        lenis.stop();
      },
      destroy: () => {
        lenis.start();

        const html = document.documentElement;

        if (html.classList.contains('video-show')) {
          html.classList.remove('video-show');
        }

        if (html.classList.contains('burger-video-show')) {
          html.classList.remove('burger-video-show');
        }
      }
    },
  });

  const videoBtn = document.getElementById('videoBtn');
  const html = document.documentElement;

  if (videoBtn) {
    videoBtn.addEventListener('click', () => {
      html.classList.add('video-show');
    })
  }

  const burgerVideoBtn = document.getElementById('burgerVideoBtn');
  if (burgerVideoBtn) {
    burgerVideoBtn.addEventListener('click', () => {
      html.classList.add('burger-video-show');
    })
  }

  /**
   * Расчёт ширины скроллбара старницы и добавление отступа в body при октрытии попапов
   */
  function getScrollbarWidth() {
    const div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);

    const scrollbarWidth = div.offsetWidth - div.clientWidth;

    document.body.removeChild(div);

    return scrollbarWidth;
  }

  /**
   * Управляет поведением шапки.
   */
  function headerFunc() {
    const header = document.getElementById('header');
    const firstSection = document.querySelector('section');
    let lastScrollTop = 1;
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {
      if (scrollPosition() > lastScrollTop && scrollPosition() > firstSection.offsetHeight) {
        header.classList.add('out');
      } else {
        header.classList.remove('out');
      }
      lastScrollTop = scrollPosition();
    })
  }
  headerFunc();

  /**
   * Управляет поведением меню-бургера.
   */
  function burgerNav() {
    const burgerBtn = document.querySelector('.burger-btn');
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerClose = document.querySelector('.burger-close');
    const overlay = document.querySelector('.burger-overlay');
    const header = document.getElementById('header');
    const elements = document.querySelectorAll('.burger-menu__list a');

    /**
     * Переключает видимость меню.
     */
    const toggleMenu = () => {
      const isOpened = burgerBtn.classList.toggle('burger-btn--opened');
      const isHeaderOpened = header.classList.toggle('opened');
      burgerMenu.classList.toggle('burger-menu--opened', isOpened, isHeaderOpened);

      burgerBtn.classList.contains('burger-btn--opened') ? lenis.stop() : lenis.start();

      if (document.documentElement.classList.contains('burger-menu--open')) {
        document.body.style.paddingRight = 0;
        document.documentElement.classList.remove('burger-menu--open');
      } else {
        const width = getScrollbarWidth();
        document.body.style.paddingRight = width + 'px';
        document.documentElement.classList.add('burger-menu--open');
      }
    };

    /**
     * Закрывает меню.
     */
    const closeMenu = () => {
      header.classList.remove('opened');
      burgerBtn.classList.remove('burger-btn--opened');
      burgerMenu.classList.remove('burger-menu--opened');
      lenis.start();

      if (document.documentElement.classList.contains('burger-menu--open')) {
        document.body.style.paddingRight = 0;
        document.documentElement.classList.remove('burger-menu--open');
      }
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

  /**
   * Инициализация слайдеров
   */
  const storySlider = new Swiper(".history__slider", {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 10,
    speed: 300,
    mousewheel: {
      forceToAxis: true,
    },
    breakpoints: {
      567: {
        slidesPerView: 'auto',
        spaceBetween: 10,
        speed: 300,
      },
      600: {
        slidesPerView: 'auto',
        spaceBetween: 20,
        speed: 300,
      },
    },
  });

  const customersSlider = new Swiper(".customers__slider", {
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    spaceBetween: 10,
    loop: true,
    speed: 300,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: ".clients__slider-btn--next",
      prevEl: ".clients__slider-btn--prev",
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      dynamicMainBullets: 4,
      clickable: true
    },
    breakpoints: {
      567: {
        slidesPerView: 2,
        spaceBetween: 10,
        speed: 300,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
      },
      769: {
        slidesPerView: 4,
        spaceBetween: 20,
        pagination: false,
        speed: 300,
      },
      1441: {
        slidesPerView: 5,
        spaceBetween: 20,
        pagination: false,
        speed: 300,
      },
    },
  });

  const clientsSlider = new Swiper(".clients__slider", {
    slidesPerGroup: 1,
    slidesPerView: 'auto',
    spaceBetween: 10,
    loop: true,
    speed: 300,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: ".clients__slider-btn--next",
      prevEl: ".clients__slider-btn--prev",
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true
    },
    breakpoints: {
      567: {
        slidesPerView: 2,
        spaceBetween: 10,
        speed: 300,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
      },
      769: {
        slidesPerView: 3,
        spaceBetween: 20,
        pagination: false,
        speed: 300,
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
    effect: 'fade',
    autoHeight: true,
    fadeEffect: {
      crossFade: true
    },
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: ".objects__slider-btn--next",
      prevEl: ".objects__slider-btn--prev",
    },
    567: {
      autoHeight: false,
      speed: 300,
    },
  });

  const objectsSliderStep = new Swiper(".objects__slider--step", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    speed: 600,
    grabCursor: false,
    effect: false,
    mousewheel: false,
    allowTouchMove: false,
    breakpoints: {
      567: {
        speed: 300,
      },
      769: {
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        speed: 300,
      },
    },
  });

  objectsSlider.controller.control = objectsSliderStep;
  objectsSliderStep.controller.control = objectsSlider;

  const objects__blocks = document.querySelectorAll('.objects__block');
  objects__blocks.forEach(objects__block => {
    const objects__gallery = objects__block.querySelector('.objects__gallery');
    const objects__galleryMini = objects__block.querySelector('.objects__gallery--mini');

    const objectsGalleryMini = new Swiper(objects__galleryMini, {
      slidesPerView: 3,
      spaceBetween: 10,
      speed: 600,
      grabCursor: false,
      mousewheel: false,
      watchSlidesProgress: true,
      breakpoints: {
        567: {
          speed: 300,
        },
        769: {
          spaceBetween: 20,
          speed: 300,
        },
      },
    });

    const objectsGallery = new Swiper(objects__gallery, {
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 600,
      grabCursor: true,
      mousewheel: {
        forceToAxis: true,
      },
      thumbs: {
        swiper: objectsGalleryMini,
      },
      pagination: {
        el: ".swiper-pagination",
        // dynamicBullets: true,
      },
      breakpoints: {
        568: {
          pagination: false,
          grabCursor: false,
          mousewheel: false,
          speed: 300,
        },
        769: {
          spaceBetween: 20,
          pagination: false,
          grabCursor: false,
          mousewheel: false,
          speed: 300,
        },
      },
    });

  });

  const commandSlider = new Swiper(".command__slider", {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 100,
    speed: 300,
    loop: true,
    grabCursor: true,
    mousewheel: {
      forceToAxis: true,
    },
    navigation: {
      nextEl: ".command__slider-btn--next",
      prevEl: ".command__slider-btn--prev",
    },
    breakpoints: {
      568: {
        speed: 1500,
      },
    },
  });

  /**
   * Аккордион
   */
  function accordionFunc() {
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
  }
  accordionFunc();

  const inputElements = document.querySelectorAll('.form-input');
  const textareaElements = document.querySelectorAll('.form-textarea');
  const className = 'filled';

  if (inputElements.length > 0) {
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
  }

  /**
   * Активация любого количества модальных окон
   */
  function popupFunc() {
    var popup__btn = document.querySelector('.popup__btn');

    if (!popup__btn) {
      return;
    } else {
      var close = document.querySelectorAll('.popup__close');
      var openBtn = document.querySelectorAll('.popup__btn');

      Array.from(openBtn, openButton => {
        openButton.addEventListener('click', e => {

          let open = document.getElementsByClassName('open');

          if (open.length > 0 && open[0] !== this) {
            open[0].classList.remove('open');
          }

          let popupId = e.target.getAttribute('data-id');
          let popupValue = e.target.getAttribute('data-value');

          if (popupId) {
            document.getElementById(popupId).classList.add('open');

            if (openButton.hasAttribute('data-value')) {
              document.getElementById(popupId).querySelector('.dropdown--js').classList.add('check');
              document.getElementById(popupId).querySelector('.dropdown__selected--js span').innerHTML = popupValue;
              document.getElementById(popupId).querySelector('.dropdown__value').dataset.value = popupValue;
              const dropdownRadios = document.getElementById(popupId).querySelectorAll('.dropdown__radio');
              dropdownRadios.forEach(dropdownRadio => {
                if (dropdownRadio.value == popupValue) {
                  dropdownRadio.checked = true;
                }
              });
            }

            const width = getScrollbarWidth();
            document.body.style.paddingRight = width + 'px';
            document.documentElement.classList.add('popup--open');

            document.body.classList.add('no-scroll');
            lenis.stop();
          } else {
            return
          }

          Array.from(close, closeButton => {
            closeButton.addEventListener('click', e => {
              document.getElementById(popupId).classList.remove("open");

              if (document.documentElement.classList.contains('popup--open')) {
                document.body.style.paddingRight = 0;
                document.documentElement.classList.remove('popup--open');
              }

              document.body.classList.remove('no-scroll');
              lenis.start();
            });

            window.addEventListener('keydown', (e) => {
              if (e.key === "Escape") {
                document.getElementById(popupId).classList.remove("open")

                if (document.documentElement.classList.contains('popup--open')) {
                  document.body.style.paddingRight = 0;
                  document.documentElement.classList.remove('popup--open');
                }

                document.body.classList.remove('no-scroll');
                lenis.start();
              }
            });

            document.querySelector(".popup.open .popup__box").addEventListener('click', event => {
              event._isClickWithInPopup = true;
            });

            document.getElementById(popupId).addEventListener('click', event => {
              if (event._isClickWithInPopup) return;
              event.currentTarget.classList.remove('open');

              if (document.documentElement.classList.contains('popup--open')) {
                document.body.style.paddingRight = 0;
                document.documentElement.classList.remove('popup--open');
              }

              document.body.classList.remove('no-scroll');
              lenis.start();
            });
          });
        });
      });
    }
  };
  popupFunc();

  /**
   * Установка dropdown
   */
  const dropdownJs = document.querySelector('.dropdown--js');
  if (dropdownJs) {
    let dropdowns = document.querySelectorAll('.dropdown--js');
    dropdowns.forEach(dropdown => {

      function updateSelected() {
        let selectedValue = dropdown.querySelector('.dropdown__value');
        let selectedOption = dropdown.querySelector('.dropdown__radio:checked');
        let selectedLabel = selectedOption.parentElement.querySelector('.dropdown__label');
        let text = selectedLabel.textContent;
        let selectedDropdown = dropdown.querySelector('.dropdown__selected--js');
        selectedDropdown.querySelector('span').textContent = text;
        selectedValue.value = text;

        if (selectedValue.value.length != 0) {
          dropdown.classList.add('check');
        } else {
          dropdown.classList.remove('check');
        }
      }

      function toggleClass(el, className, add) {
        let addClass = add;
        if (typeof addClass === 'undefined') {
          addClass = !el.classList.contains(className);
        }
        if (addClass) {
          el.classList.add(className);
        } else {
          el.classList.remove(className);
        }
      }

      let radios = dropdown.querySelectorAll('.dropdown__radio');
      let root = dropdown;

      for (let i = 0; i < radios.length; ++i) {
        let radio = radios[i];
        radio.addEventListener('change', function () {
          updateSelected();
        });
        radio.addEventListener('click', function () {
          toggleClass(root, 'is-active', false);
        });
      }

      let selectedLabel = dropdown.querySelector('.dropdown__selected--js');
      selectedLabel.addEventListener('click', function () {
        toggleClass(root, 'is-active');
      });

      document.addEventListener('click', (event) => {
        if (!dropdown.querySelector('.dropdown__container').contains(event.target) && !dropdown.querySelector('.dropdown__selected').contains(event.target)) {
          toggleClass(root, 'is-active', false);
        }
      });

      // updateSelected();
    });
  }

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

  const hHeader = document.getElementById('header');
  const hHero = document.getElementById('hero');
  const hFooter = document.getElementById('footer');

  if (hHero) {
    const h = hHero.offsetHeight;
    scrollView(h);
  } else {
    const h = hHeader.offsetHeight;
    scrollView(h);
  }

  function scrollView(h) {
    const plate = document.getElementById('plate-contact');
    const classToAdd = 'show';

    window.addEventListener('scroll', function () {
      const verticalScrollPosition = window.pageYOffset;
      const bottomScrollPosition = document.body.offsetHeight - hFooter.offsetHeight - window.innerHeight;
      const isActive = plate.classList.contains(classToAdd);

      if (verticalScrollPosition > h && verticalScrollPosition < bottomScrollPosition) {
        plate.classList.add(classToAdd);
      } else {
        plate.classList.remove(classToAdd);
      }
    });
  }

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

  /**
   * Таймлайн
   */
  // можно вынести в отдельный файл - НАЧАЛО
  const TimelineScroll = {

    defaultConfig: {
      breakpoint: 768,
      selectors: {
        placeholder: '.timeline-placeholder',
        container: '.timeline-container',
        timeline: '.timeline',
        wrapper: '.timeline-wrapper',
        items: '.timeline-item',
        btnPrev: '.timeline-button-prev',
        btnNext: '.timeline-button-next'
      }
    },

    init(placeholderSelector = '.timeline-placeholder', customSelectors = {}) {

      this.config = {
        ...this.defaultConfig,
        selectors: { ...this.defaultConfig.selectors, ...customSelectors }
      };

      this.state = {
        rootElement: null,
        timelinePlaceholder: null,
        timelineContainer: null,
        timeline: null,
        timelineWrapper: null,
        timelineItems: null,
        btnPrev: null,
        btnNext: null,

        itemWidth: 0,
        containerWidth: 0,
        totalWidth: 0,
        maxScroll: 0,
        placeholderHeight: 0,
        containerHeight: 0,
        scrollDistance: 0,

        timelineProgress: 0,
        currentIndex: 0,
        isAnimating: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        isDragging: false,
        startScroll: 0,
        xSwipe: false,

        scrollTimeout: null,
        isScrolling: false
      };

      this.setRootElement(placeholderSelector);

      this.cacheElements();
      this.calculatePlaceholderHeight();
      this.bindEvents();
      this.updateButtons();
      this.updateActiveItem(0);
      return this;
    },

    setRootElement(selector) {
      const element = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;

      if (!element) {
        console.warn(`TimelineScroll: Root element not found with selector "${selector}"`);
      }

      this.state.rootElement = element;
    },

    destroy() {
      window.removeEventListener('resize', this.onResize.bind(this));
    },

    next() {
      this.goToIndex(this.state.currentIndex + 1);
    },

    prev() {
      this.goToIndex(this.state.currentIndex - 1);
    },

    goTo(index) {
      this.goToIndex(index);
    },

    getCurrentIndex() {
      return this.state.currentIndex;
    },

    cacheElements() {
      const s = this.state;
      const selectors = this.config.selectors;

      s.timelinePlaceholder = s.rootElement;
      s.timelineContainer = this.findElement(selectors.container);
      s.timeline = this.findElement(selectors.timeline);
      s.timelineWrapper = this.findElement(selectors.wrapper);
      s.timelineItems = this.findElement(selectors.items, true);
      s.btnPrev = this.findElement(selectors.btnPrev);
      s.btnNext = this.findElement(selectors.btnNext);

      this.validateRequiredElements();
    },

    findElement(selector, all = false) {
      if (all) {
        return this.state.rootElement.querySelectorAll(selector);
      }
      return this.state.rootElement.querySelector(selector);
    },

    validateRequiredElements() {
      const s = this.state;
      const required = [
        { element: s.timelineContainer, name: 'container' },
        { element: s.timeline, name: 'timeline' },
        { element: s.timelineWrapper, name: 'wrapper' },
        { element: s.timelineItems, name: 'items' }
      ];

      required.forEach(({ element, name }) => {
        if (!element || (Array.isArray(element) && element.length === 0)) {
          console.warn(`TimelineScroll: Required element "${name}" not found with selector "${this.config.selectors[name]}"`)
        }
      });
    },

    isMobileDevice() {
      return window.innerWidth <= this.config.breakpoint;
    },

    calculatePlaceholderHeight() {
      const s = this.state;

      if (this.isMobileDevice()) {
        s.timelinePlaceholder.style.height = 'auto';
        return;
      }

      s.containerHeight = s.timelineContainer.offsetHeight;
      s.itemWidth = s.timelineItems[0].offsetWidth;
      s.containerWidth = s.timelineContainer.offsetWidth;
      s.totalWidth = s.itemWidth * s.timelineItems.length;
      s.maxScroll = Math.max(0, s.totalWidth - s.containerWidth);

      const horizontalScrollSpace = (s.totalWidth / s.containerWidth) * s.containerHeight;
      s.placeholderHeight = s.containerHeight + horizontalScrollSpace;
      s.scrollDistance = s.placeholderHeight - s.containerHeight;

      s.timelinePlaceholder.style.height = `${s.placeholderHeight}px`;
    },

    updateButtons() {
      const s = this.state;
      if (this.isMobileDevice() || !s.btnPrev || !s.btnNext) return;

      s.btnPrev.disabled = s.currentIndex === 0;
      s.btnNext.disabled = s.currentIndex === s.timelineItems.length - 1;
    },

    goToIndex(index) {
      if (this.isMobileDevice()) {
        return this.goToIndexMobile(index);
      }

      const s = this.state;
      if (s.isAnimating) return;

      index = Math.max(0, Math.min(index, s.timelineItems.length - 1));
      if (index === s.currentIndex) return;

      s.isAnimating = true;

      const targetProgress = index / (s.timelineItems.length - 1);
      const containerTop = s.timelinePlaceholder.offsetTop;
      const targetScroll = containerTop + (targetProgress * s.scrollDistance);

      lenis.scrollTo(targetScroll, {
        duration: 0.7,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          s.isAnimating = false;
        }
      });
    },

    goToIndexMobile(index) {
      const s = this.state;
      index = Math.max(0, Math.min(index, s.timelineItems.length - 1));
      const item = s.timelineItems[index];
      const itemLeft = item.offsetLeft;
      const itemWidth = item.offsetWidth;
      const containerWidth = s.timeline.offsetWidth;

      const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);

      s.timeline.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });

      this.updateActiveItemMobile(index);
    },

    updateTimeline(scrollY) {
      const s = this.state;
      if (this.isMobileDevice()) return;

      const containerTop = s.timelinePlaceholder.offsetTop;

      let scrollProgress = (scrollY - containerTop) / s.scrollDistance;
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));

      if (scrollY >= containerTop && scrollY <= containerTop + s.scrollDistance) {
        s.timelineProgress = scrollProgress;

        const translateX = -s.timelineProgress * s.maxScroll;
        s.timelineWrapper.style.transform = `translateX(${translateX}px)`;

        this.updateActiveItem(s.timelineProgress);

      } else {
        if (scrollY < containerTop) {
          s.timelineProgress = 0;
          s.timelineWrapper.style.transform = 'translateX(0px)';
          this.updateActiveItem(0);
        } else if (scrollY > containerTop + s.scrollDistance) {
          s.timelineProgress = 1;
          s.timelineWrapper.style.transform = `translateX(${-s.maxScroll}px)`;
          this.updateActiveItem(1);
        }
      }
    },

    updateActiveItem(progress) {
      const s = this.state;
      const newIndex = Math.min(
        s.timelineItems.length - 1,
        Math.floor(progress * s.timelineItems.length)
      );

      if (newIndex !== s.currentIndex) {
        s.currentIndex = newIndex;

        s.timelineItems.forEach((item, index) => {
          item.classList.toggle('timeline-active', index === s.currentIndex);
        });

        this.updateButtons();
      }
    },

    updateActiveItemMobile(index) {
      const s = this.state;
      if (index !== s.currentIndex) {
        s.currentIndex = index;

        s.timelineItems.forEach((item, i) => {
          item.classList.toggle('timeline-active', i === s.currentIndex);
        });
      }
    },

    handleMobileScroll() {
      const s = this.state;
      if (!this.isMobileDevice()) return;

      clearTimeout(s.scrollTimeout);
      s.isScrolling = true;

      const scrollLeft = s.timeline.scrollLeft;
      const containerWidth = s.timeline.offsetWidth;
      const itemWidth = s.timelineItems[0].offsetWidth;

      const center = scrollLeft + (containerWidth / 2);

      let closestIndex = 0;
      let minDistance = Infinity;

      s.timelineItems.forEach((item, index) => {
        const itemLeft = item.offsetLeft;
        const itemCenter = itemLeft + (itemWidth / 2);
        const distance = Math.abs(center - itemCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      this.updateActiveItemMobile(closestIndex);

      s.scrollTimeout = setTimeout(() => {
        s.isScrolling = false;

        if (!s.isScrolling) {
          this.goToIndex(closestIndex);
        }
      }, 100);
    },

    handleTouchStart(e) {
      const s = this.state;
      if (s.isAnimating) return;

      s.startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      s.startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
      s.currentX = parseInt(getComputedStyle(s.timelineWrapper).transform.split(',')[4] || 0, 10);
      s.startScroll = lenis.scroll;
      s.isDragging = true;
      s.xSwipe = false;
      s.timelineWrapper.classList.add('grabbing');
    },

    handleTouchMove(e) {
      const s = this.state;
      if (!s.isDragging) return;
      e.preventDefault();

      const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const y = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

      if (!s.xSwipe) {
        const diffX = Math.abs(x - s.startX);
        const diffY = Math.abs(y - s.startY);

        if (diffY > diffX && diffY > 10) {
          s.isDragging = false;
          s.timelineWrapper.classList.remove('grabbing');
          return;
        }

        if (diffX > 10) {
          s.xSwipe = true;
          e.preventDefault();
        }
      }

      if (s.xSwipe) {
        const diff = x - s.startX;

        let newX = s.currentX + diff;

        newX = Math.min(Math.max(newX, -s.maxScroll), 0);

        s.timelineWrapper.style.transform = `translateX(${newX}px)`;

        lenis.scrollTo(s.startScroll, { immediate: true });
      }
    },

    handleTouchEnd(e) {
      const s = this.state;
      if (!s.isDragging) return;
      s.isDragging = false;
      s.timelineWrapper.classList.remove('grabbing');

      const x = e.type === 'touchend' ? (e.changedTouches ? e.changedTouches[0].clientX : 0) : e.clientX;
      const diff = x - s.startX;
      const velocity = diff / 100;

      if (Math.abs(diff) > 50 || Math.abs(velocity) > 0.5) {
        if (diff > 0) {
          this.goToIndex(s.currentIndex - 1);
        } else {
          this.goToIndex(s.currentIndex + 1);
        }
      } else {
        this.goToIndex(s.currentIndex);
      }
    },

    onLenisScroll({ scroll }) {
      if (!this.state.isDragging) {
        this.updateTimeline(scroll);
      }
    },

    onResize() {
      this.calculatePlaceholderHeight();
      this.updateTimeline(lenis.scroll);
      this.updateButtons();
    },

    bindEvents() {
      const s = this.state;

      if (s.btnPrev) {
        s.btnPrev.addEventListener('click', () => {
          this.goToIndex(s.currentIndex - 1);
        });
      }

      if (s.btnNext) {
        s.btnNext.addEventListener('click', () => {
          this.goToIndex(s.currentIndex + 1);
        });
      }

      if (!this.isMobileDevice()) {
        s.timelineWrapper.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        s.timelineWrapper.addEventListener('mousedown', this.handleTouchStart.bind(this));

        s.timelineWrapper.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        s.timelineWrapper.addEventListener('mousemove', this.handleTouchMove.bind(this));

        s.timelineWrapper.addEventListener('touchend', this.handleTouchEnd.bind(this));
        s.timelineWrapper.addEventListener('mouseup', this.handleTouchEnd.bind(this));
        s.timelineWrapper.addEventListener('mouseleave', this.handleTouchEnd.bind(this));
      }

      s.timeline.addEventListener('scroll', this.handleMobileScroll.bind(this));

      lenis.on('scroll', this.onLenisScroll.bind(this));
      window.addEventListener('resize', this.onResize.bind(this));
    }
  };

  TimelineScroll.create = function (placeholderSelector = '.timeline-placeholder', customSelectors = {}) {
    const instance = Object.create(this);
    return instance.init(placeholderSelector, customSelectors);
  };
  // можно вынести в отдельный файл - КОНЕЦ

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  if (document.getElementById('timelinePlaceholder')) {
    const timeline = TimelineScroll.create('#timelinePlaceholder');
  }

  if (document.getElementById('timelinePlaceholder2')) {
    const timeline2 = TimelineScroll.create('#timelinePlaceholder2');
  }

  // $(window).on('resize load', function () {

  // if (window.innerWidth > 768) {
  const creepingBlock = document.querySelector('[data-animation="creeping"]');
  if (creepingBlock) {
    const wrapper = document.querySelector('.wrapper');
    wrapper.style.marginBottom = (creepingBlock.offsetHeight / 2) + 'px';
    creepingAnim(creepingBlock, wrapper)
  }

  if (!checkEditMode) {
    const revealItems = document.querySelectorAll('[data-animation="reveal"]');

    revealItems.forEach(titleWord => {
      const innerWords = document.querySelectorAll('h2');
      innerWords.forEach(wordH2 => {
        const wordsH2 = new SplitType(wordH2, { types: 'words, words' });
      });
      const wordsH3 = new SplitType(titleWord.querySelector('h3'), { types: 'words, words' });
      const wordsH4 = new SplitType(titleWord.querySelector('h4'), { types: 'words, words' });
    });

    revealItems.forEach(revealItem => {
      const word = revealItem.querySelectorAll("div.word");
      const tl = gsap.timeline({
        paused: true
      });
      tl.from(word, {
        opacity: 0,
        y: "10",
        duration: .3,
        delay: .3,
        ease: "power1.out",
        stagger: {
          amount: .3
        },
        onStart: function () {
          revealItem.classList.add('animatedClass');
        },
      });
      scrollTriggerPlayer(revealItem, tl)
    });

    const fadeInItems = document.querySelectorAll('[data-animation="fadeIn"]');

    fadeInItems.forEach(titleChar => {
      const char = new SplitType(titleChar.querySelector('p'), { types: 'words, chars' });
    });

    fadeInItems.forEach(fadeInItem => {
      const word = fadeInItem.querySelectorAll("div.char");
      const tl = gsap.timeline({
        paused: true
      });
      tl.from(word, {
        opacity: 0,
        duration: .3,
        delay: .5,
        ease: "power1.out",
        stagger: {
          amount: .8
        }
      });
      scrollTriggerPlayer(fadeInItem, tl)
    });
  }

  const parallaxBox = document.querySelector('[data-animation="parallax-box"]');
  if (parallaxBox) {
    const parallaxImgBoxes = document.querySelectorAll('[data-animation="parallax-box"]');
    parallaxImgBoxes.forEach(parallaxImgBox => {
      gsap.fromTo(parallaxImgBox,
        { y: '15%' },
        {
          y: '-35%',
          scrollTrigger: {
            trigger: parallaxImgBox,
            start: 'top 90%',
            end: 'bottom top',
            scrub: true,
            preventOverlaps: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }

  const parallaxSection = document.querySelector('[data-animation="parallax-section"]');
  if (parallaxSection) {
    const parallaxSections = document.querySelectorAll('[data-animation="parallax-section"]');
    parallaxSections.forEach(parallaxSection => {
      gsap.fromTo(parallaxSection,
        { y: '0%' },
        {
          y: '-15%',
          scrollTrigger: {
            trigger: parallaxSection,
            start: 'top 90%',
            end: 'bottom top',
            scrub: true,
            preventOverlaps: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }

  const faqItems = document.querySelectorAll(".faq__item");
  for (let i = 0; i < faqItems.length; i++) {
    gsap.from(faqItems[i], {
      opacity: 0,
      x: -50,
      duration: 0.3,
      scrollTrigger: {
        trigger: faqItems[i],
        start: "top 95%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        preventOverlaps: true,
        invalidateOnRefresh: true,
      }
    })
  }

  // }
  // });

  const hero = document.getElementById("hero");
  if (hero) {

    if (!checkEditMode) {
      const target = hero.querySelector('h1');
      const span = target.querySelector('span');
      const text = new SplitType(target, { types: 'chars, words' })
      gsap.from(text.words, {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: .5,
        stagger: { amount: 0.4 },
        scrollTrigger: {
          trigger: hero,
          start: "top 95%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          preventOverlaps: true,
          invalidateOnRefresh: true,
        },
        onStart: function () {
          hero.classList.add('animatedClass');
        }
      })
    }

    const hero__img = hero.querySelector(".hero__img");
    gsap.fromTo(hero__img, { opacity: 0 }, {
      opacity: 1,
      duration: 1,
      delay: .5,
      scrollTrigger: {
        trigger: hero,
        start: "top 95%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        preventOverlaps: true,
        invalidateOnRefresh: true,
      }
    });
  }

  const parallaxBlock = document.querySelector('[data-animation="parallax-block"]');
  if (parallaxBlock) {
    const parallaxImgBlocks = document.querySelectorAll('[data-animation="parallax-block"]');
    parallaxImgBlocks.forEach(parallaxImgBlock => {
      gsap.fromTo(parallaxImgBlock,
        { y: '-8%' },
        {
          y: '8%',
          scrollTrigger: {
            trigger: parallaxImgBlock,
            start: 'top 90%',
            end: 'bottom top',
            scrub: true,
            preventOverlaps: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }

  const parallaxItem = document.querySelector('[data-animation="parallax-img"]');
  if (parallaxItem) {
    const parallaxImgContainers = document.querySelectorAll('[data-animation="parallax-img"]');
    parallaxImgContainers.forEach(parallaxImgContainer => {
      const image = parallaxImgContainer.querySelector('img');
      gsap.fromTo(image,
        { y: '-10%' },
        {
          y: '10%',
          scrollTrigger: {
            trigger: parallaxImgContainer,
            start: 'top 90%',
            end: 'bottom top',
            scrub: true,
            preventOverlaps: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }

  const parallaxImg = document.querySelector('[data-parallax="parallax-img"]');
  if (parallaxImg) {
    const parallaxImgContainers = document.querySelectorAll('[data-parallax="parallax-img"]');
    parallaxImgContainers.forEach(parallaxImgContainer => {
      const image = parallaxImgContainer.querySelector('img');
      gsap.fromTo(image,
        { y: '-10%' },
        {
          y: '10%',
          scrollTrigger: {
            trigger: parallaxImgContainer,
            start: 'top 90%',
            end: 'bottom top',
            scrub: true,
            preventOverlaps: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }

  function creepingAnim(creepingBlock, wrapper) {
    const trigger = document.querySelector(`.${creepingBlock.getAttribute('data-creeping-trigger')}`);
    gsap.fromTo(creepingBlock, { bottom: -creepingBlock.offsetHeight }, {
      bottom: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        start: `+=${wrapper.offsetHeight - creepingBlock.offsetHeight} bottom`,
        end: () => `${wrapper.offsetHeight - creepingBlock.offsetHeight / 2}`,
        scrub: true,
        pinSpacing: true,
        preventOverlaps: true,
        invalidateOnRefresh: true,
      }
    });
  }

  /**
   * Анимация чисел
   */
  function counterFunc() {
    function counter(array, element, time = 1000) {
      let n = 0;
      const num = Number(array.dataset.val);
      let interval = setInterval(() => {
        n < num ? (n += num / (time / 10)) : clearInterval(interval);
        array.classList.contains('frac')
          ? (element.innerHTML = n.toFixed(1))
          : (element.innerHTML = Math.round(n));
      }, 10);
    }

    const numbBoxes = document.querySelectorAll('.numbs');
    numbBoxes.forEach((numbBox) => {
      const numbs = numbBox.querySelectorAll('.number');
      numbs.forEach((numb) => {
        const count = numb.querySelector('span');
        gsap.to(count, {
          scrollTrigger: {
            trigger: numbBox,
            start: `top 95%`,
            preventOverlaps: true,
            invalidateOnRefresh: true,
          },
          onStart: () => counter(numb, count),
        });
      });
    });
  }
  counterFunc();

  function scrollTriggerPlayer(triggerElement, timeline, onEnterStart = "top 95%") {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(1);
        timeline.pause()
      }
    });
    ScrollTrigger.create({
      trigger: triggerElement,
      start: onEnterStart,
      preventOverlaps: true,
      invalidateOnRefresh: true,
      onEnter: () => timeline.play()
    })
  }

  window.addEventListener('resize', ScrollTrigger.refresh());

  const btnPres = document.querySelectorAll('.btn--pres');
  if (btnPres.length > 0) {
    btnPres.forEach(presentation => {
      const desk = presentation.dataset.desk;
      const mob = presentation.dataset.mob;

      window.addEventListener('resize', () => {
        if ((window.innerWidth > 768)) {
          presentation.setAttribute('href', desk)
        } else {
          presentation.setAttribute('href', mob)
        }
      });
    });

    btnPres.forEach(presentation => {
      const desk = presentation.dataset.desk;
      const mob = presentation.dataset.mob;

      if ((window.innerWidth > 768)) {
        presentation.setAttribute('href', desk)
      } else {
        presentation.setAttribute('href', mob)
      }
    });
  }

});

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('plate-cookie').remove();
}