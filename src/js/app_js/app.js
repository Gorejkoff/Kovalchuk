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
let smoother;
const HEADER = document.getElementById('header');
const VW = window.innerWidth;
const VH = window.innerHeight;
const CW = document.querySelector('[class*="__container"]').offsetWidth;
const BANER = document.querySelector('.baner');
const HEADER_WRAPPER = document.querySelector('.header__wrapper');
const WRAPPER = document.querySelector('.wrapper');
const CONTENT = document.querySelector('#content');

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

/* запись переменных высоты элементов */
function addHeightVariable() {
   if (HEADER) document.body.style.setProperty('--height-header', `${HEADER.offsetHeight}px`)
}
addHeightVariable();

function openMenuMobile(open) {
   if (typeof open === 'boolean') {
      document.documentElement.classList.toggle('mobile-menu-open', open);
   } else {
      document.documentElement.classList.toggle('mobile-menu-open');
   }
   if (document.documentElement.classList.contains('mobile-menu-open')) {
      isPC ? smoother.paused(true) : document.body.style.overflow = 'hidden'
   } else {
      isPC ? smoother.paused(false) : document.body.style.overflow = ''
   }
}

// ** ======================= RESIZE ======================  ** //
window.addEventListener('resize', () => {
   addHeightVariable();
})


// ** ======================= CLICK ======================  ** //
document.documentElement.addEventListener("click", (event) => {
   if (event.target.closest('.baner__close')) { BANER.remove() };
   if (event.target.closest('.burger')) {
      openMenuMobile();
      if (!isPC && !document.body.classList.contains('scroll-header')) {
         document.documentElement.classList.contains('mobile-menu-open') ?
            WRAPPER.prepend(HEADER_WRAPPER) :
            CONTENT.prepend(HEADER_WRAPPER);
      }
   };
})


