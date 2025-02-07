function toggleClassScrollHeader(props) {
   document.body.classList.toggle('scroll-header', props)
}
function headerMoveUp() {
   toggleClassScrollHeader(true)
   WRAPPER.prepend(HEADER_WRAPPER);
}
function headerMoveBack() {
   toggleClassScrollHeader(false)
   CONTENT.prepend(HEADER_WRAPPER);
}

function textWpapSpan(elementName) {
   const listText = document.querySelectorAll(elementName);
   listText.forEach(element => {
      const words = element.innerHTML.trim().split(' ');
      const wordWrap = words.map(item => { return item.split('').map(e => { return `<span>${e}</span>` }).join('') })
      element.innerHTML = `<span class="word">${wordWrap.join('</span>&#32;<span class="word">')}</span>`
   });
}

textWpapSpan(".js-text-wrap")

function addDubleButton() {
   const JS_CASE_BUTTON = document.querySelector('.js-case-button')
   const PROOF_ARD = document.querySelector('.proof__card');
   const DUBLE = JS_CASE_BUTTON.cloneNode(true);
   DUBLE.style.position = "fixed";
   DUBLE.style.zIndex = "5";
   DUBLE.style.left = "50%";
   DUBLE.style.bottom = "24px";
   DUBLE.style.transform = "translate3d(-50%, 0, 0)";
   DUBLE.style.margin = "0";
   document.body.prepend(DUBLE);

   gsap.to(JS_CASE_BUTTON, {
      opacity: 0,
      duration: 0.2,
      scrollTrigger: {
         trigger: ".proof",
         start: `5 100%`,
         end: `0 100%`,
         toggleActions: 'play none none reverse',
      }
   })

   gsap.fromTo(DUBLE, {
      opacity: 0,
      duration: 0.2,
      pointerEvents: "none"
   }, {
      opacity: 1, duration: 0.2,
      pointerEvents: "all",
      scrollTrigger: {
         trigger: ".proof",
         start: `3 ${VH - PROOF_ARD.offsetHeight}px`,
         end: `100% ${VH + 60}px`,
         toggleActions: 'play reverse play reverse',
      }
   })
}

window.addEventListener('load', (event) => {
   window.scrollTo(0, 0);

   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
   // ScrollTrigger.config({ ignoreMobileResize: true });
   // ScrollTrigger.isTouch && ScrollTrigger.normalizeScroll({ allowNestedScroll: true });
   if (MIN1024.matches) {
      smoother = ScrollSmoother.create({
         wrapper: "#scroll",
         content: "#content",
         smooth: 2,
         // smoothTouch: false,
         // normalizeScroll: true,
      })
   }
   gsap.to('.header__wrapper', {
      scrollTrigger: {
         trigger: ".header__wrapper",
         start: "150% 0",
         end: "0 0",
         onEnter: () => headerMoveUp(),
         onEnterBack: () => headerMoveBack(),
      }
   })

   const FIRST = document.querySelector('.first');
   let xTo = gsap.quickTo(".first__gallery", "x", { duration: 1 });
   let yTo = gsap.quickTo(".first__gallery", "y", { duration: 1 });
   FIRST.addEventListener("mousemove", (event) => {
      xTo(-(event.clientX - window.innerWidth / 2) / 10);
      yTo(-(event.clientY - window.innerHeight / 2) / 10);
   });

   function addWhiteWords(wordsList, array) {
      wordsList.forEach((element, index) => {
         if (array.includes(index + 1)) { element.classList.add('white') };
      })
   }
   const text_1 = document.querySelectorAll('.js-text-animate-1 .word span');
   const words_1 = document.querySelectorAll('.js-text-animate-1 .word');
   const whiteWord_1 = [1, 3, 4, 5, 6, 7, 8];
   addWhiteWords(words_1, whiteWord_1);


   // gsap.to(".case", {
   //    x: 0,
   //    scrollTrigger: {
   //       trigger: ".proof",
   //       start: `3 100%`,
   //       end: `100% 100%`,
   //       pin: ".case",
   //       pinSpacing: false,
   //       scrub: 0,
   //    }
   // })

   const tl = gsap.timeline({
      scrollTrigger: {
         trigger: ".js-case-trigger",
         start: "0 0",
         end: `${VW * 2} 0`,
         pin: true,
         scrub: true,
         // markers: {
         //    startColor: "green",
         //    endColor: "red",
         //    fontSize: "40px",
         //    fontWeight: "bold",
         //    indent: 20
         // }
      }
   })

   if (MIN1024.matches) {

      text_1.forEach((e) => {
         tl.to(e, 1, { opacity: 2 })
      })
      tl.to('.js-case-text', 20, {
         x: "-100vw",
      })
      const text_2 = document.querySelectorAll('.js-text-animate-2 .word span');
      text_2.forEach((e) => {
         tl.to(e, 1, { opacity: 1 })
      })
      const text_3 = document.querySelectorAll('.js-text-animate-3 .word span');
      text_3.forEach((e) => {
         tl.to(e, 1, { opacity: 1 })
      })
   } else {
      tl.to('.js-case-text', {
         x: "-100vw",

      })

      gsap.to(".case", {
         x: 0,
         scrollTrigger: {
            trigger: ".proof",
            start: `3 100%`,
            end: `100% 100%`,
            pin: ".case",
            pinSpacing: false,
            scrub: 0,
         }
      })

   }

   function setPathFraming(vectorElement, parentElement) {
      const framing = document.querySelector(vectorElement);
      if (!framing) { return }
      let path = framing.getTotalLength();
      const parent = document.querySelector(parentElement);
      if (!parent) { return }
      parent.style.setProperty('--path-framing', path + 'px')
   }
   setPathFraming(".js-framing-path", ".js-parent-framing")

   gsap.to(".framing", {
      scrollTrigger: {
         trigger: ".framing",
         toggleActions: 'play none none reverse',
         toggleClass: "visible",
         start: "50% 90%",
         end: "50% 10%",
      }
   })

   if (MIN1024.matches) {
      const services_title = document.querySelector('.services__title')
      const ENUM_HEIGHT = document.querySelector('.services__enum').offsetHeight;

      gsap.to(".services__title", {
         scrollTrigger: {
            trigger: ".services__body",
            start: `${services_title.offsetTop} ${HEADER_WRAPPER.scrollHeight}`,
            end: `100% 100%`,
            pin: ".services__title",
            pinSpacing: false,
            scrub: 0,
         }
      })

      gsap.to(".services__enum", {
         scrollTrigger: {
            trigger: ".services__certificates",
            start: `${ENUM_HEIGHT + 80} 100%`,
            end: `100% ${VH - 80}`,
            pin: ".services__enum",
            scrub: 0,
         }
      })

      const DECISIONS_BODY = document.querySelector('.js-decisions-body');

      gsap.to(".js-decisions-body", {
         x: `-${DECISIONS_BODY.offsetWidth - VW}px`,
         scrollTrigger: {
            trigger: ".js-decisions-trigger",
            start: "0% 0%",
            end: () => DECISIONS_BODY.offsetWidth - CW + "px",
            pin: true,
            scrub: 0,
         }
      })
   }

   isPC && addDubleButton() // !!!!!  

   document.body.addEventListener('click', (event) => {
      if (event.target.closest('[href^="#"]')) {
         event.preventDefault();
         let getName = event.target.closest('[href^="#"]').getAttribute('href');
         // document.documentElement.style.scrollBehavior = "smooth";
         openMenuMobile(false);
         // smoother.scrollTo(getName, false);
         gsap.to(window, { scrollTo: getName })
         // setTimeout(() => { document.documentElement.style.scrollBehavior = "auto"; }, 1000)
      }
   })

});  // end 'load'

