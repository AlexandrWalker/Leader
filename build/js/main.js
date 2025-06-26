gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, ScrollSmoother);

document.addEventListener('DOMContentLoaded', () => {

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

});
