document.addEventListener('DOMContentLoaded', function() {
    console.log("hey contact");
    ////////////////////// MAIN FUNCTION //////////////////////
    function initializeBlogFunctionalities() {
      handleButtonAnimations();
      handleNavbarDropdown();
      handleNavbarLogo(); 
      handleButtonMarqueHover();
      handlePhoneAnimationsLeave();
      
      // hideTransparentLogotypeBlocks()
    }


    let currentState = 'off';
    const tl = gsap.timeline({ paused: true });
    
    // Configuration initiale
    gsap.set('.phone__lottie.is-off', { display: 'block', scale: 1, opacity: 1 });
    gsap.set(['.phone__lottie.is-call', '.phone__lottie.is-form'], { 
      scale: 0, 
      opacity: 0, 
      display: 'none' 
    });
    
    function animateTo(newState) {
      if (currentState === newState) return;
    
      tl.clear();
    
      // Animation de sortie pour l'état actuel
      tl.to(`.phone__lottie.is-${currentState}`, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(`.phone__lottie.is-${currentState}`, { display: 'none' })
      });
    
      // Animation d'entrée pour le nouvel état
      tl.to(`.phone__lottie.is-${newState}`, {
        display: 'block',
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.1");
    
      // Effet de rebond et de rotation pour call et form
      if (newState !== 'off') {
        tl.to(`.phone__lottie.is-${newState}`, {
          scale: 1.1,
          rotation: 10,
          duration: 0.1,
          ease: "power2.out"
        })
        .to(`.phone__lottie.is-${newState}`, {
          scale: 1,
          rotation: -5,
          duration: 0.1,
          ease: "power2.inOut"
        })
        .to(`.phone__lottie.is-${newState}`, {
          rotation: 0,
          duration: 0.1,
          ease: "elastic.out(1, 0.3)"
        })
        .to(`.phone__lottie.is-${newState}`, {
          rotation: 3,
          duration: 0.05,
          repeat: 4,
          yoyo: true,
          ease: "none"
        });
      }
    
      currentState = newState;
      tl.play(0);
    }
    
    // Ajouter les écouteurs d'événements
    const callButton = document.querySelector('.contact__button.is-call');
    const formButton = document.querySelector('.contact__button.is-form');
    
    callButton.addEventListener('mouseenter', () => animateTo('call'));
    callButton.addEventListener('mouseleave', () => animateTo('off'));
    
    formButton.addEventListener('mouseenter', () => animateTo('form'));
    formButton.addEventListener('mouseleave', () => animateTo('off'));
    
    // Gérer les transitions rapides
    let hoverTimeout;
    
    function handleHover(newState) {
      clearTimeout(hoverTimeout);
      animateTo(newState);
    }
    
    function handleLeave(button) {
      hoverTimeout = setTimeout(() => {
        if (currentState !== 'off' && !callButton.matches(':hover') && !formButton.matches(':hover')) {
          animateTo('off');
        }
      }, 50);  // Un petit délai pour permettre la transition entre les boutons
    }
    
    callButton.addEventListener('mouseenter', () => handleHover('call'));
    callButton.addEventListener('mouseleave', () => handleLeave(callButton));
    
    formButton.addEventListener('mouseenter', () => handleHover('form'));
    formButton.addEventListener('mouseleave', () => handleLeave(formButton));



/////////////////////BUTTON MARQUE/////////////////////
function handleButtonMarqueHover() {
  const buttonMarqueBlocks = document.querySelectorAll('.contact__button');
  
  buttonMarqueBlocks.forEach(function(block) {
    block.addEventListener('mouseenter', function() {
      this.classList.add('active');
      this.querySelector('.button-marque-arrow').classList.add('active');
    });
    
    block.addEventListener('mouseleave', function() {
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
        button.addEventListener('mouseenter', function() {
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
  
        button.addEventListener('mouseleave', function() {
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

    initializeBlogFunctionalities();
});