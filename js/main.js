gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, ScrollSmoother);

document.addEventListener('DOMContentLoaded', () => {

  /**
   * Инициализация Lenis
   */
  const lenis = new Lenis({
    anchors: {
      offset: -60,
    }
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 500);
  });
  gsap.ticker.lagSmoothing(0);

  // $(window).on('scroll', function () {
  //   ScrollTrigger.refresh();
  // });

  /**
   * Анимация
   */
  // const generalHead = document.querySelectorAll(".general__head");

  // for (let i = 0; i < generalHead.length; i++) {
  //   const generalTitle = generalHead[i].querySelector("h2");

  //   gsap.from(generalTitle, {
  //     opacity: 0,
  //     x: -50,
  //     duration: 0.3,
  //     stagger: { amount: 0.2 },
  //     scrollTrigger: {
  //       trigger: generalHead[i],
  //       start: "top 95%",
  //       end: "bottom 20%",
  //       toggleActions: "play none none none",
  //       preventOverlaps: true,
  //     },
  //     onStart: function () {
  //       // onComplete: function () {
  //       generalHead[i].classList.add('animatedClass');
  //     },
  //     onComplete: ScrollTrigger.refresh(),
  //   })
  // }
  // const titleItems = document.querySelectorAll(".general__anim");
  // const target = document.querySelectorAll('.general__anim span');
  // for (let i = 0; i < target.length; i++) {

  //   const text = new SplitType(target[i], { types: 'words, chars' })

  //   gsap.from(text.words, {
  //     opacity: 0,
  //     x: -50,
  //     duration: 0.3,
  //     stagger: { amount: 0.2 },
  //     scrollTrigger: {
  //       trigger: titleItems[i],
  //       start: "top 95%",
  //       end: "bottom 20%",
  //       toggleActions: "play none none none",
  //       preventOverlaps: true,
  //     },
  //   })
  // }

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
      ease: "power1.out",
      stagger: {
        amount: .8
      }
    });
    scrollTriggerPlayer(fadeInItem, tl)
  });

  $(window).on('resize load', function () {
    if (window.innerWidth > '768' && window.innerWidth != '768') {
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
              },
            }
          );
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
              },
            }
          );
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
              },
            }
          );
        });
      }
    }
  });

  const hero = document.getElementById("hero");
  if (hero) {

    const target = hero.querySelector('h1');

    const span = target.querySelector('span');
    const text = new SplitType(target, { types: 'chars, words' })
    gsap.from(text.words, {
      opacity: 0,
      x: -50,
      duration: 1,
      stagger: { amount: 0.4 },
      scrollTrigger: {
        trigger: hero,
        start: "top 95%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        preventOverlaps: true,
      },
      onStart: function () {
        // onComplete: function () {
        hero.classList.add('animatedClass');
      }
    })

    const hero__img = document.querySelector(".hero__img");

    gsap.from(hero__img, {
      opacity: 1,
      y: 500,
      duration: 1,
      scrollTrigger: {
        trigger: hero,
        start: "top 95%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      }
    });
  }

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
      onEnter: () => timeline.play()
    })
  }
  gsap.registerPlugin(ScrollTrigger);

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
        // markers: true,
      }
    })
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
            // start: `top 60%`,
            // markers: true,
          },
          onStart: () => counter(numb, count),
        });
      });
    });
  }
  counterFunc();

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

  /**
   * Инициализация слайдеров
   */
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
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
        },
      },
      769: {
        slidesPerView: 4,
        spaceBetween: 20,
        pagination: false,
      },
      1441: {
        slidesPerView: 5,
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
    navigation: {
      nextEl: ".objects__slider-btn--next",
      prevEl: ".objects__slider-btn--prev",
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
    allowTouchMove: false,
  });

  objectsSlider.controller.control = objectsSliderStep;
  objectsSliderStep.controller.control = objectsSlider;

  // const objects__blocks = document.querySelectorAll('.objects__block');
  // objects__blocks.forEach(objects__block => {
  //   const objects__gallery = objects__block.querySelector('.objects__gallery');
  //   const objects__galleryMini = objects__block.querySelector('.objects__gallery--mini');

  /***
   * Свайпер не инициализиарует по циклу сразу. Поэтому пришлось прибегнуть к костылю
   */

  $(window).on('resize load', function () {
    if (window.innerWidth > '568' && window.innerWidth != '568') {
      const objectsGalleryMini1 = new Swiper(".gallery-mini--1", {
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

      const objectsGallery1 = new Swiper(".gallery--1", {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 600,
        grabCursor: true,
        mousewheel: {
          forceToAxis: true,
        },
        thumbs: {
          swiper: objectsGalleryMini1,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        breakpoints: {
          568: {
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
          769: {
            spaceBetween: 20,
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
        },
      });
      const objectsGalleryMini2 = new Swiper(".gallery-mini--2", {
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

      const objectsGallery2 = new Swiper(".gallery--2", {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 600,
        grabCursor: true,
        mousewheel: {
          forceToAxis: true,
        },
        thumbs: {
          swiper: objectsGalleryMini2,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        breakpoints: {
          568: {
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
          769: {
            spaceBetween: 20,
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
        },
      });
      const objectsGalleryMini3 = new Swiper(".gallery-mini--3", {
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

      const objectsGallery3 = new Swiper(".gallery--3", {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 600,
        grabCursor: true,
        mousewheel: {
          forceToAxis: true,
        },
        thumbs: {
          swiper: objectsGalleryMini3,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        breakpoints: {
          568: {
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
          769: {
            spaceBetween: 20,
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
        },
      });
      const objectsGalleryMini4 = new Swiper(".gallery-mini--4", {
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

      const objectsGallery4 = new Swiper(".gallery--4", {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 600,
        grabCursor: true,
        mousewheel: {
          forceToAxis: true,
        },
        thumbs: {
          swiper: objectsGalleryMini4,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        breakpoints: {
          568: {
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
          769: {
            spaceBetween: 20,
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
        },
      });
      const objectsGalleryMini5 = new Swiper(".gallery-mini--5", {
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

      const objectsGallery5 = new Swiper(".gallery--5", {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 600,
        grabCursor: true,
        mousewheel: {
          forceToAxis: true,
        },
        thumbs: {
          swiper: objectsGalleryMini5,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        breakpoints: {
          568: {
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
          769: {
            spaceBetween: 20,
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
        },
      });
      const objectsGalleryMini6 = new Swiper(".gallery-mini--6", {
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

      const objectsGallery6 = new Swiper(".gallery--6", {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 600,
        grabCursor: true,
        mousewheel: {
          forceToAxis: true,
        },
        thumbs: {
          swiper: objectsGalleryMini6,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        breakpoints: {
          568: {
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
          769: {
            spaceBetween: 20,
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
        },
      });
      const objectsGalleryMini7 = new Swiper(".gallery-mini--7", {
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

      const objectsGallery7 = new Swiper(".gallery--7", {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 600,
        grabCursor: true,
        mousewheel: {
          forceToAxis: true,
        },
        thumbs: {
          swiper: objectsGalleryMini7,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        breakpoints: {
          568: {
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
          769: {
            spaceBetween: 20,
            pagination: false,
            grabCursor: false,
            mousewheel: false,
          },
        },
      });
    } else {
      const objects__blocks = document.querySelectorAll('.objects__block');
      objects__blocks.forEach(objects__block => {
        const objects__gallery = objects__block.querySelector('.objects__gallery');

        const objectsGallery = new Swiper(objects__gallery, {
          slidesPerView: 1,
          spaceBetween: 10,
          speed: 600,
          grabCursor: true,
          mousewheel: {
            forceToAxis: true,
          },
          pagination: {
            el: ".swiper-pagination",
          },
        });
      });

    }
  });


  // });

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

    const services__items = document.querySelectorAll('.services__item');
    if (window.innerWidth <= 768) {
      services__items.forEach(services__item => {
        services__item.querySelector('.services__item-wrap').classList.add('accordion');
      });
      accordionFunc();
    } else {
      services__items.forEach(services__item => {
        services__item.querySelector('.services__item-wrap').classList.remove('accordion');
      });
    }

  })

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
  }
  accordionFunc();

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

            document.body.classList.add('no-scroll');
            lenis.stop();
          } else {
            return
          }

          Array.from(close, closeButton => {
            closeButton.addEventListener('click', e => {
              document.getElementById(popupId).classList.remove("open");

              document.body.style.paddingRight = 0;

              document.body.classList.remove('no-scroll');
              lenis.start();
            });

            window.addEventListener('keydown', (e) => {
              if (e.key === "Escape") {
                document.getElementById(popupId).classList.remove("open")

                document.body.style.paddingRight = 0;

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

              document.body.style.paddingRight = 0;

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
        selectedValue.dataset.value = text;

        if (selectedValue.dataset.value.length != 0) {
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
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    const timelineWrapper = document.querySelector('.timeline-wrapper');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineWidth = timelineWrapper.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".history",
        start: 'top 0',
        endTrigger: ".services",
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
        },
        onComplete: ScrollTrigger.refresh(),
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
  }

});

function checkCookies() {
  document.cookie = 'COOKIE_ACCEPT=1;path=\'/\';expires:' + (new Date(new Date().getTime() + 86400e3 * 365).toUTCString());
  document.getElementById('plate-cookie').remove();
}
