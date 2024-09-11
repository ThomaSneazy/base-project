

// export function initLoader() {
//     const loader = document.querySelector('.loader');
//     const loaderLogo = document.querySelector('.loader__logo');
//     const colors = ['#faaafa', '#6066ee', '#8ddd8d', '#e0e055', '#FFFFFF', '#131313'];
//     let colorIndex = 0;

//     // Assurez-vous que le loader est visible
//     loader.style.display = 'flex';

//     // Animation du logo
//     gsap.fromTo(loaderLogo, 
//       { y: '100%' },
//       { 
//         y: '0%', 
//         duration: 1.2, // Augmenter la durée pour un effet plus lent
//         ease: 'power3.inOut',
//         onComplete: () => {
//           setTimeout(changeBackgroundColor, 800); // Délai avant de changer la couleur
//         }
//       }
//     );

//     function changeBackgroundColor() {
//       gsap.to(loader, {
//         backgroundColor: colors[colorIndex],
//         duration: 0.3, // Augmenter la durée pour un changement de couleur plus lent
//         ease: '',
//         onComplete: () => {
//           colorIndex++;
//           if (colorIndex < colors.length) {
//             setTimeout(changeBackgroundColor, 300); // Délai entre les changements de couleur
//           } else {
//             setTimeout(hideLoader, 1000);
//           }
//         }
//       });
//     }
//     function hideLoader() {
//         let fadeCalled = false;
        
//         gsap.to(loader, {
//           y: '-100%',
//           duration: 1.4,
//           ease: 'power3.out',
//           onUpdate: function() {
//             // Déclencher myFade() lorsque l'animation est à 85% de sa progression
//             if (this.progress() >= 0.45 && !fadeCalled) {
//               fadeCalled = true;
//               myFade();
//             }
//           },
//           onComplete: () => {
//             loader.style.display = 'none';
//             // Si myFade n'a pas été appelé pour une raison quelconque, l'appeler ici
//             if (!fadeCalled) {
//               myFade();
//             }
//           }
//         });
//       }
//     // Démarrer le loader sans sessionStorage
//     changeBackgroundColor();
// }

// initLoader();