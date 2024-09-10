export function initLoader() {
  const hasVisited = sessionStorage.getItem('hasVisited');
  
  if (!hasVisited) {
    const loader = document.querySelector('.loader');
    const loaderLogo = document.querySelector('.loader__logo');
    const colors = ['#faaafa', '#6066ee', '#8ddd8d', '#e0e055', '#FFFFFF', '#131313'];
    let colorIndex = 0;
  
    gsap.fromTo(loaderLogo, 
      { y: '100%' },
      { y: '0%', duration: 0.8, ease: 'power3.inOut' }
    );
  
    function changeBackgroundColor() {
      gsap.to(loader, {
        backgroundColor: colors[colorIndex],
        duration: 0,
        ease: 'power1.inOut',
        onComplete: () => {
          colorIndex++;
          if (colorIndex < colors.length) {
            setTimeout(changeBackgroundColor, 350);
          } else {
            setTimeout(hideLoader, 800);
          }
        }
      });
    }
  
    function hideLoader() {
      gsap.to(loader, {
        y: '-100%',
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          loader.style.display = 'none';
        }
      });
    }
  
    setTimeout(changeBackgroundColor, 700);
  
    // Marquer que l'utilisateur a visité le site
    sessionStorage.setItem('hasVisited', 'true');

    // Définir un timeout pour réinitialiser le statut de visite après 1 minute
    setTimeout(() => {
      sessionStorage.removeItem('hasVisited');
    }, 60000); // 60000 ms = 1 minute
  } else {
    // Si ce n'est pas la première visite, cacher immédiatement le loader
    document.querySelector('.loader').style.display = 'none';
  }
}