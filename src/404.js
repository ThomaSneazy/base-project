
document.addEventListener('DOMContentLoaded', function () {
    
    ////////////////////// INIT MAIN FUNCTION ON LOAD //////////////////////
    function initializeContactFunctionalities() {
        handleNavbarDropdown();
        handleNavbarLogo();
        handle404ButtonAnimation();
    }
    


    ////////////////////// 404 BUTTON ANIMATION //////////////////////
    function handle404ButtonAnimation() {
        const colors = ['pink', 'green', 'yellow', 'blue'];
        const buttons = document.querySelectorAll('.button__anchor__blog.is-404');

        gsap.set(buttons, { scale: 0.7, opacity: 0 });

        function showButtonAndApplyColor(button, index) {
            gsap.to(button, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: "back.out(1.7)",
                delay: Math.random() * 0.05, 
                onComplete: () => {
                    gsap.delayedCall(index * 0.02, () => {
                        const randomColor = colors[Math.floor(Math.random() * colors.length)];
                        button.classList.add(randomColor);
                    });

                    if (index === buttons.length - 1) {
                        initClickAnimation();
                    }
                }
            });
        }

        const shuffledButtons = [...buttons].sort(() => Math.random() - 0.5);
        shuffledButtons.forEach((button, index) => {
            showButtonAndApplyColor(button, index);
        });

        let clickCount = 0;
        const welcomeText = document.querySelector('.text__welcome');
        const firstTryText = document.querySelector('.text__first__try');
        const secondTryText = document.querySelector('.text__second__try');
        const lastTryText = document.querySelector('.text__last__try');

        gsap.set([firstTryText, secondTryText, lastTryText], { opacity: 0, y: 20 });

        function updateTextVisibility() {
            if (clickCount === 3) {
                gsap.to(welcomeText, { opacity: 0, y: -20, duration: 0.5 });
                gsap.to(firstTryText, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
            } else if (clickCount === 6) {
                gsap.to(firstTryText, { opacity: 0, y: -20, duration: 0.5 });
                gsap.to(secondTryText, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
            } else if (clickCount === 11) {
                gsap.to(secondTryText, { opacity: 0, y: -20, duration: 0.5 });
                gsap.to(lastTryText, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
                setTimeout(() => {
                    window.location.href = 'https://www.13g.fr';
                }, 2000);
            }
        }

        function initClickAnimation() {
            buttons.forEach(button => {
                const icon = button.querySelector('.icon__button__block.is-404');
                let isIconMoved = false;

                button.addEventListener('click', () => {
                    const buttonRect = button.getBoundingClientRect();
                    const iconRect = icon.getBoundingClientRect();
                    
                    if (!isIconMoved) {
                        const moveDistance = buttonRect.height - iconRect.height - 18; 
                        gsap.to(icon, {
                            y: moveDistance,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    } else {
                        gsap.to(icon, {
                            y: 0,
                            duration: 0.5,
                            ease: "power2.inOut"
                        });
                    }
                    
                    isIconMoved = !isIconMoved;
                    clickCount++;

                    colors.forEach(color => button.classList.remove(color));

                    updateTextVisibility();
                });
            });
        }
    }

    initializeContactFunctionalities()
});