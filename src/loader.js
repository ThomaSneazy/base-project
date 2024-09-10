export function initLoader() {
  const isNewSession = !sessionStorage.getItem('hasVisited');
  const isReload = performance.navigation.type === 1;
  const isExternalNavigation = document.referrer === '' || !document.referrer.includes(window.location.hostname);

  if (isReload || isNewSession || isExternalNavigation) {
    const loader = document.querySelector('.loader');
    const loaderLogo = document.querySelector('.loader__logo');
    const navbar = document.querySelector('.navbar');
    const colors = ['#faaafa', '#6066ee', '#8ddd8d', '#e0e055', '#FFFFFF', '#131313'];
    let colorIndex = 0;

    // Cacher la navbar
    navbar.style.display = 'none';
    navbar.style.opacity = '0';
    navbar.style.transform = 'translateY(-100%)';

    // Assurez-vous que le loader est visible
    loader.style.display = 'flex';

    // Animation du logo
    gsap.fromTo(loaderLogo, 
      { y: '100%' },
      { 
        y: '0%', 
        duration: 0.8, 
        ease: 'power3.inOut',
        onComplete: () => {
          // Commencer la transition des couleurs après l'animation du logo
          setTimeout(changeBackgroundColor, 400);
        }
      }
    );

    function changeBackgroundColor() {
      gsap.to(loader, {
        backgroundColor: colors[colorIndex],
        duration: 0,
        ease: '',
        onComplete: () => {
          colorIndex++;
          if (colorIndex < colors.length) {
            setTimeout(changeBackgroundColor, 350);
          } else {
            setTimeout(hideLoader, 1000);
          }
        }
      });
    }

    function hideLoader() {
      gsap.to(loader, {
        y: '-100%',
        duration: 1.4,
        ease: 'power3.out', 
        onComplete: () => {
          loader.style.display = 'none';
          showNavbar();
          myFade();
        }
      });
    }

    function showNavbar() {
      navbar.style.display = 'block';
      gsap.to(navbar, {
        opacity: 1,
        y: '0%',
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    // Supprimer cette ligne
    // setTimeout(changeBackgroundColor, 1200);

    sessionStorage.setItem('hasVisited', 'true');
  } else {
    document.querySelector('.loader').style.display = 'none';
    const navbar = document.querySelector('.navbar');
    navbar.style.display = 'block';
    navbar.style.opacity = '1';
    navbar.style.transform = 'translateY(0)';
  }
}

export function initPageTransitions() {
  // Gérer les clics sur les liens internes
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href').startsWith('/')) {
      e.preventDefault();
      fadeOutCurrentPage(() => {
        window.location.href = link.href;
      });
    }
  });

  // Fade out de la page actuelle
  function fadeOutCurrentPage(callback) {
    const pageWrapper = document.querySelector('.page-wrapper');
    const navbarLogo = document.querySelector('.navbar__logo');
    
    gsap.to([pageWrapper, navbarLogo], {
      opacity: 0,
      duration: 1,
      onComplete: callback
    });
  }

  // Fade in de la nouvelle page
  function fadeInNewPage() {
    const pageWrapper = document.querySelector('.page-wrapper');
    const navbarLogo = document.querySelector('.navbar__logo');
    
    pageWrapper.style.opacity = 0;
    // Suppression de la ligne suivante :
    // pageWrapper.style.transform = 'translateY(30%)';
    navbarLogo.style.opacity = 0;
    
    gsap.to(navbarLogo, {
      opacity: 1,
      duration: 0.3,
      delay: 0.2
    });

    gsap.to(pageWrapper, {
      opacity: 1,
      // Suppression de la ligne suivante :
      // y: '0%',
      duration: 0.3,
      delay: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        myFade();
      }
    });
  }

  // Exécuter le fade in au chargement de la page
  window.addEventListener('load', fadeInNewPage);
}

// Appeler les deux fonctions d'initialisation
initLoader();
initPageTransitions();
