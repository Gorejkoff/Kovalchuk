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






