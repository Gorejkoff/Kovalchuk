"use strict"

// window.addEventListener('load', (event) => {});

// desktop or mobile (mouse or touchscreen)
const isMobile = {
   Android: function () { return navigator.userAgent.match(/Android/i) },
   BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i) },
   iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) },
   Opera: function () { return navigator.userAgent.match(/Opera Mini/i) },
   Windows: function () { return navigator.userAgent.match(/IEMobile/i) },
   any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
   }
};
const isPC = !isMobile.any();
if (isPC) { document.body.classList.add('_pc') } else { document.body.classList.add('_touch') };

// media queries
const MIN1024 = window.matchMedia('(min-width: 1024px)');
const MIN768 = window.matchMedia('(min-width: 768px)');

// variables
const HEADER = document.getElementById('header');
const VW = window.innerWidth;
const CW = document.querySelector('[class*="__container"]').offsetWidth;


function throttle(callee, timeout) {
   let timer = null;
   return function perform(...args) {
      if (timer) return;
      timer = setTimeout(() => {
         callee(...args);
         clearTimeout(timer);
         timer = null;
      }, timeout)
   }
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

/* запись переменных высоты элементов */
function addHeightVariable() {
   document.body.style.setProperty('--height-header', `${HEADER.offsetHeight}px`)
}
addHeightVariable();

// function setCW() {
//    document.body.style.setProperty('--CW', CW + "px")
// }
// setCW();

// ** ======================= RESIZE ======================  ** //
window.addEventListener('resize', () => {
   addHeightVariable();
   setCW()
})


// ** ======================= CLICK ======================  ** //
document.documentElement.addEventListener("click", (event) => {

})







//  exemple
// const tr = {
//    trigger: "#author-title",
//    start: "0% 0%",
//    end: "100% 100%",
//    end: () => widthAuthorGallery + "px",
//    pin: true,
//    pin: ".about-author__body",
//    pinSpacing: true,
//    scrub: true,
//    markers: {
//       startColor: "green",
//       endColor: "red",
//       fontSize: "40px",
//       fontWeight: "bold",
//       indent: 20
//    }
// }

window.addEventListener('load', (event) => {
   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
   // ScrollTrigger.config({ ignoreMobileResize: true });
   // ScrollTrigger.isTouch && ScrollTrigger.normalizeScroll({ allowNestedScroll: true });

   // const smoother = ScrollSmoother.create({
   //    wrapper: "#scroll",
   //    content: "#content",
   //    smooth: 15,
   //    smoothTouch: true,
   //    effects: true,
   //    normalizeScroll: true
   // })


   // const tr = {
   //    trigger: ".case__text",
   //    start: "0% 0%",
   //    end: "100% 100%",
   //    pin: true,
   //    pin: ".about-author__body",
   //    pinSpacing: true,
   //    scrub: true,
   //    markers: {
   //       startColor: "green",
   //       endColor: "red",
   //       fontSize: "40px",
   //       fontWeight: "bold",
   //       indent: 20
   //    }
   // }


   const CASE_TEXT = document.querySelector('.js-case-text');

   const tl = gsap.timeline({
      scrollTrigger: {
         trigger: ".js-case-trigger",
         start: "0% 0%",
         end: () => CASE_TEXT.offsetWidth * 5 + "px",
         pin: true,
         scrub: 0,
      }
   })


   function addWhiteWords(wordsList, array) {
      wordsList.forEach((element, index) => {
         if (array.includes(index + 1)) { element.classList.add('white') };
      })
   }

   const text_1 = document.querySelectorAll('.js-text-animate-1 .word span');
   const words_1 = document.querySelectorAll('.js-text-animate-1 .word');
   const whiteWord_1 = [1, 3, 4, 5, 6, 7, 8];
   addWhiteWords(words_1, whiteWord_1)
   const text_2 = document.querySelectorAll('.js-text-animate-2 .word span');
   const text_3 = document.querySelectorAll('.js-text-animate-3 .word span');

   text_1.forEach((e) => {
      tl.to(e, 1, { opacity: 1 })
   })
   tl.to('.js-case-text', 10, {
      x: "-100vw",

   })
   text_2.forEach((e) => {
      tl.to(e, 1, { opacity: 1 })
   })
   text_3.forEach((e) => {
      tl.to(e, 1, { opacity: 1 })
   })



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

   const DECISIONS_BODY = document.querySelector('.js-decisions-body');

   gsap.to(".js-decisions-body", {
      x: `-${DECISIONS_BODY.offsetWidth - VW}px`,
      scrollTrigger: {
         trigger: ".js-decisions-trigger",
         start: "0% 0%",
         end: () => DECISIONS_BODY.offsetWidth - CW + "px",
         pin: true,
         scrub: 0,
         // markers: {
         //    startColor: "blue",
         //    endColor: "red",
         //    fontSize: "40px",
         //    fontWeight: "bold",
         //    indent: 20
         // }
      }
   })














});  // end 'load'

