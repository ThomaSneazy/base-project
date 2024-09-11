export function initLoader() {
    const loader = document.querySelector('.loader');
    const loaderLogo = document.querySelector('.logo-loader-gsap');
    const colors = ['#131313', '#faaafa', '#e0e055', '#8ddd8d', '#6066ee', '#FFFFFF'];

    // Animation initiale du logo
    setTimeout(() => {
        gsap.fromTo(loaderLogo, 
            { y: 100, opacity: 0 },
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
            duration: 0.2, // Augmentation de la durée
            ease: 'power1.inOut', // Ajout d'un effet de transition
            onComplete: () => {
                if (index < colors.length - 1) {
                    setTimeout(() => changeBackgroundColor(index + 1), 300); // Augmentation du délai
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
            }
        });
        
    }
}

// Assurez-vous que initLoader() n'est appelé qu'une seule fois
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoader);
} else {
    initLoader();
}