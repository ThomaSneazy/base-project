import { initLoader } from "./loader";


document.addEventListener('DOMContentLoaded', function () {
    // console.log("hey contact");
    ////////////////////// MAIN FUNCTION //////////////////////
    function initializeContactFunctionalities() {
        handleButtonAnimations();
        handleNavbarDropdown();
        handleNavbarLogo();
        handleButtonMarqueHover();
        initializePhoneAnimations();
        initLoader();
    }



    ////////////////////// PHONE ANIMATIONS //////////////////////
    function initializePhoneAnimations() {
        const lottieOff = document.querySelector('.phone__lottie.is-off');
        const lottieCall = document.querySelector('.phone__lottie.is-call');
        const lottieForm = document.querySelector('.phone__lottie.is-form');
        const callButton = document.querySelector('.contact__button.is-call');
        const formButton = document.querySelector('.contact__button.is-form');

        lottieOff.style.display = 'block';
        lottieCall.style.display = 'none';
        lottieForm.style.display = 'none';

        function showLottie(lottieToShow) {
            lottieOff.style.display = 'none';
            lottieCall.style.display = 'none';
            lottieForm.style.display = 'none';
            lottieToShow.style.display = 'block';
        }

        callButton.addEventListener('mouseenter', () => showLottie(lottieCall));
        formButton.addEventListener('mouseenter', () => showLottie(lottieForm));

        function handleLeave() {
            setTimeout(() => {
                if (!callButton.matches(':hover') && !formButton.matches(':hover')) {
                    showLottie(lottieOff);
                }
            }, 50);
        }

        callButton.addEventListener('mouseleave', handleLeave);
        formButton.addEventListener('mouseleave', handleLeave);
    }

    /////////////////////BUTTON MARQUE/////////////////////
    function handleButtonMarqueHover() {
        const buttonMarqueBlocks = document.querySelectorAll('.contact__button');

        buttonMarqueBlocks.forEach(function (block) {
            block.addEventListener('mouseenter', function () {
                this.classList.add('active');
                this.querySelector('.button-marque-arrow').classList.add('active');
            });

            block.addEventListener('mouseleave', function () {
                this.classList.remove('active');
                this.querySelector('.button-marque-arrow').classList.remove('active');
            });
        });
    }


    //////////////////////LOGO NAVBAR BLACK///////////////////////
    function handleNavbarLogo() {
        function updateNavbarLogo() {
            const navbarLogo = document.querySelector('.navbar__logo');
            if (navbarLogo) {
                if (window.location.href.includes('contact')) {
                    navbarLogo.style.color = '#131313';
                } else {
                    navbarLogo.style.color = '';
                }
            }
        }

        updateNavbarLogo();

        window.addEventListener('popstate', updateNavbarLogo);

        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                setTimeout(updateNavbarLogo, 0);
            });
        });
    }



    ////////////////////// BUTTON ANIMATIONS //////////////////////
    function handleButtonAnimations() {
        const buttons = document.querySelectorAll(".button__anchor__blog");
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function () {
                const hoverColors = {
                    "is-chap-1": "#e0e055",
                    "is-chap-2": "#8ddd8d",
                    "is-chap-3": "#6066ee",
                    "is-chap-4": "#faaafa",
                    "is-chap-5": "#FFFFFF"
                };
                const hoverColor = hoverColors[this.classList[1]] || "#8ddd8d";

                gsap.to(this.querySelector(".fake-arrow-width"), {
                    width: "100%",
                    duration: 0.6,
                    ease: "power2.inOut",
                });
                gsap.to(this, {
                    paddingLeft: "1.11rem",
                    paddingRight: "3.4rem",
                    backgroundColor: hoverColor,
                    color: "#131313",
                    duration: 0.6,
                    ease: "power2.inOut",
                });
            });

            button.addEventListener('mouseleave', function () {
                gsap.to(this.querySelector(".fake-arrow-width"), {
                    width: "0%",
                    duration: 0.8,
                    ease: "power2.inOut",
                });
                gsap.to(this, {
                    paddingLeft: "3.4rem",
                    paddingRight: "1.11rem",
                    backgroundColor: "#2b2b2b",
                    color: "#ffffff",
                    duration: 0.8,
                    ease: "power2.inOut",
                });
            });
        });
    }

    ////////////////////// NAVBAR DROPDOWN //////////////////////
    function handleNavbarDropdown() {
        const $buttonDrop = $(".button-drop");
        const $dropdownWrapper = $(".dropdown__list__wrapper");
        const $dropdownItems = $dropdownWrapper.find(".dropdown__item");
        let timeoutId;
        let isSmallScreen = window.innerWidth <= 991;

        gsap.set($dropdownWrapper.get(0), {
            opacity: 0,
            visibility: "hidden",
            backdropFilter: "blur(0px)",
        });
        gsap.set($dropdownItems.get(), { opacity: 0, y: 10 });

        function showDropdown() {
            gsap.to($dropdownWrapper.get(0), {
                duration: 0.3,
                opacity: 1,
                visibility: "visible",
                backdropFilter: "blur(8px)",
                ease: "power2.out",
            });

            gsap.to($dropdownItems.get(), {
                duration: 0.3,
                opacity: 1,
                y: 0,
                stagger: 0.05,
                ease: "power2.out",
            });
        }

        function hideDropdown() {
            gsap.to($dropdownWrapper.get(0), {
                duration: 0.3,
                opacity: 0,
                backdropFilter: "blur(0px)",
                ease: "power2.in",
                onComplete: () => {
                    gsap.set($dropdownWrapper.get(0), { visibility: "hidden" });
                },
            });

            gsap.to($dropdownItems.get(), {
                duration: 0.2,
                opacity: 0,
                y: 10,
                stagger: 0.03,
                ease: "power2.in",
            });
        }

        function handleInteraction(event) {
            if (isSmallScreen) {
                if (event.type === 'click') {
                    if ($dropdownWrapper.css('visibility') === 'hidden') {
                        showDropdown();
                    } else {
                        hideDropdown();
                    }
                }
            } else {
                if (event.type === 'mouseenter') {
                    clearTimeout(timeoutId);
                    showDropdown();
                } else if (event.type === 'mouseleave') {
                    timeoutId = setTimeout(() => {
                        if (!$dropdownWrapper.is(":hover")) {
                            hideDropdown();
                        }
                    }, 100);
                }
            }
        }

        $buttonDrop.on("mouseenter mouseleave click", handleInteraction);

        $dropdownWrapper.on("mouseleave", () => {
            if (!isSmallScreen) {
                timeoutId = setTimeout(() => {
                    if (!$buttonDrop.is(":hover")) {
                        hideDropdown();
                    }
                }, 100);
            }
        });

        $(window).on('resize', () => {
            isSmallScreen = window.innerWidth <= 991;
        });
    }

    initializeContactFunctionalities()
});