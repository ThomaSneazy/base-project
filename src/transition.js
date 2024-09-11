// import barba from '@barba/core';
// import { gsap } from 'gsap';
// // import { initHome } from './main.js';
// // import { initializeBlogFunctionalities as initBlog } from './blog.js';

// function fadeTransition() {
//   return gsap.to('.main-wrapper', {
//     duration: 0.5,
//     opacity: 0,
//     ease: 'power2.inOut'
//   });
// }

// function fadeIn() {
//   return gsap.from('.main-wrapper', {
//     duration: 0.5,
//     opacity: 0,
//     ease: 'power2.inOut'
//   });
// }

// function initPageTransitions() {
//   barba.init({
//     transitions: [{
//       name: 'opacity-transition',
//       async leave(data) {
//         await fadeTransition();
//       },
//       async enter(data) {
//         await fadeIn();
        
//         // Initialiser la page en fonction du namespace
//         if (data.next.namespace === 'home') {
//           initHome();
//         } else if (data.next.namespace === 'blog') {
//           initBlog();
//         }
//       },
//       async once(data) {
//         // Initialisation lors du chargement initial de la page
//         if (data.next.namespace === 'home') {
//           initHome();
//         } else if (data.next.namespace === 'blog') {
//           initBlog();
//         }
//       }
//     }]
//   });
// }

// export { initPageTransitions };