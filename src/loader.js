export function initLoader() {
    if (localStorage.getItem('loaderPlayed') === 'true') {
        document.querySelector('.loader').style.display = 'none';
        myFade();
        return;
    }

    const loader = document.querySelector('.loader');
    const loaderLogo = document.querySelector('.logo-loader-gsap');
    const colors = ['#131313', '#faaafa', '#e0e055', '#8ddd8d', '#6066ee', '#FFFFFF'];

    setTimeout(() => {
        gsap.fromTo(loaderLogo, 
            { y: 100, opacity: 0 }, //VOIR ICI PASSER EN 30PX ??? MOVE Y
            { 
                y: 0, 
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                onComplete: () => {
                    gsap.to(loaderLogo, {
                        y: '-100%',
                        duration: 1,
                        ease: 'power3.out',
                        onComplete: changeBackgroundColor
                    });
                }
            }
        );
    }, 200);

    function changeBackgroundColor(index = 0) {
        if (index >= colors.length) {
            hideLoader();
            return;
        }

        gsap.to(loader, {
            backgroundColor: colors[index],
            duration: 0.2, 
            ease: 'power1.inOut', 
            onComplete: () => {
                if (index < colors.length - 1) {
                    setTimeout(() => changeBackgroundColor(index + 1), 300); 
                } else {
                    hideLoader();
                }
            }
        });
    }

    function hideLoader() {
        gsap.to(loader, {
            y: '-100%',
            duration: 1.2,
            ease: 'power3.out',
            onComplete: () => {
                loader.style.display = 'none';
                myFade();
                localStorage.setItem('loaderPlayed', 'true');
            }
        });
    }
}

export function animatePageTransition(isBackNavigation = false) {
    const pageWrapper = document.querySelector('.page-wrapper');
    
    if (isBackNavigation) {
        // Réinitialiser l'opacité et la position pour le retour en arrière
        gsap.set(pageWrapper, { opacity: 1, y: 0 });
        return Promise.resolve();
    }
    
    return gsap.to(pageWrapper, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.inOut'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href').startsWith('/')) {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            animatePageTransition().then(() => {
                window.location.href = href;
            });
        }
    });

    // Gestionnaire modifié pour le retour en arrière
    window.addEventListener('popstate', (event) => {
        animatePageTransition(true).then(() => {
            // Pas besoin de recharger la page, l'animation est gérée différemment
        });
    });
});

function shouldPlayLoader() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentTime = new Date().getTime();
    const oneHour = 60 * 60 * 1000; 

    if (!lastVisit || (currentTime - parseInt(lastVisit)) > oneHour) {
        localStorage.setItem('lastVisit', currentTime.toString());
        return true;
    }
    return false;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (shouldPlayLoader()) initLoader();
    });
} else {
    if (shouldPlayLoader()) initLoader();
}

window.onpageshow = function(event) {
    if (event.persisted) {
        const pageWrapper = document.querySelector('.page-wrapper');
        gsap.set(pageWrapper, { opacity: 1, y: 0 });
    }
};


