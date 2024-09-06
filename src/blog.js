console.log("hey blog cursor");
//////////////////////NAVBAR DROPDOWN//////////////////////

document.addEventListener('DOMContentLoaded', function() {
  const richTextBlog = document.querySelector('.rich-text-blog');
  if (!richTextBlog) return;

  // Cacher tous les conteneurs .heading__blog__container existants
  const existingContainers = document.querySelectorAll('.heading__blog__container');
  existingContainers.forEach(container => {
      container.style.display = 'none';
  });

  const h2Elements = richTextBlog.querySelectorAll('h2');
  
  h2Elements.forEach((h2, index) => {
      const headingContainer = document.createElement('div');
      headingContainer.className = 'heading__blog__container';
      headingContainer.id = `heading-${index + 1}`;
      
      h2.parentNode.insertBefore(headingContainer, h2);
      headingContainer.appendChild(h2);

      // Afficher le bouton d'ancrage correspondant
      const buttonSelector = `.button__anchor__blog.is-chap-${index + 1}`;
      const button = document.querySelector(buttonSelector);
      if (button) {
          button.style.display = 'block'; // ou 'inline-block' selon votre mise en page
          
          // Ajouter l'événement de clic pour le défilement fluide
          button.addEventListener('click', function() {
              const targetHeading = document.getElementById(`heading-${index + 1}`);
              if (targetHeading) {
                  scrollToElement(targetHeading, 1500); // 1500ms de durée d'animation
              }
          });
      }
  });

  // Cacher les boutons d'ancrage en trop
  for (let i = h2Elements.length + 1; i <= 5; i++) {
      const buttonSelector = `.button__anchor__blog.is-chap-${i}`;
      const button = document.querySelector(buttonSelector);
      if (button) {
          button.style.display = 'none';
      }
  }

  // Fonction de défilement fluide
  function scrollToElement(element, duration) {
      const start = window.pageYOffset;
      const target = element.getBoundingClientRect().top + start - 50; // 50px offset
      const startTime = performance.now();
      
      function step(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = easeInOutQuad(progress);
          window.scrollTo(0, start + (target - start) * ease);
          
          if (progress < 1) {
              requestAnimationFrame(step);
          }
      }
      
      requestAnimationFrame(step);
  }

  // Fonction d'easing
  function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  // Effets de survol des boutons
  const buttons = document.querySelectorAll('.button__anchor__blog');
  buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
          let hoverColor = "#8ddd8d"; // Couleur par défaut (vert)

          if (this.classList.contains("is-chap-1")) {
              hoverColor = "#ffff00"; // Jaune
          } else if (this.classList.contains("is-chap-2")) {
              hoverColor = "#00ff00"; // Vert
          } else if (this.classList.contains("is-chap-3")) {
              hoverColor = "#0000ff"; // Bleu
          } else if (this.classList.contains("is-chap-4")) {
              hoverColor = "#ff69b4"; // Rose
          } else if (this.classList.contains("is-chap-5")) {
              hoverColor = "#FFFFFF"; // Blanc
          }

          const fakeArrow = this.querySelector('.fake-arrow-width');
          if (fakeArrow) {
              fakeArrow.style.transition = 'width 0.8s ease-in-out';
              fakeArrow.style.width = '100%';
          }

          this.style.transition = 'all 0.8s ease-in-out';
          this.style.paddingLeft = '1.11rem';
          this.style.paddingRight = '3.4rem';
          this.style.backgroundColor = hoverColor;
          this.style.color = '#131313';
      });

      button.addEventListener('mouseleave', function() {
          const fakeArrow = this.querySelector('.fake-arrow-width');
          if (fakeArrow) {
              fakeArrow.style.transition = 'width 0.8s ease-in-out';
              fakeArrow.style.width = '0%';
          }

          this.style.transition = 'all 0.8s ease-in-out';
          this.style.paddingLeft = '3.4rem';
          this.style.paddingRight = '1.11rem';
          this.style.backgroundColor = '#2b2b2b';
          this.style.color = '#ffffff';
      });
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll(".button__anchor__blog");

  buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
      let hoverColor = "#8ddd8d"; // Couleur par défaut (vert)

      if (this.classList.contains("is-chap-1")) {
        hoverColor = "#e0e055"; // Jaune
      } else if (this.classList.contains("is-chap-2")) {
        hoverColor = "#8ddd8d"; // Vert
      } else if (this.classList.contains("is-chap-3")) {
        hoverColor = "#6066ee"; // Bleu
      } else if (this.classList.contains("is-chap-4")) {
        hoverColor = "#faaafa"; // Rose
      }

      gsap.to(this.querySelector(".fake-arrow-width"), {
        width: "100%",
        duration: 0.2,
        ease: "power2.inOut",
      });
      gsap.to(this, {
        paddingLeft: "1.11rem",
        paddingRight: "3.4rem",
        backgroundColor: hoverColor,
        color: "#131313",
        duration: 0.2,
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
      // Supprimé les animations pour .icon-arrow-green-block
    });
  });
});



$(document).ready(function () {
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
          timeoutId = setTimeout(function () {
            if (!$dropdownWrapper.is(":hover")) {
              hideDropdown();
            }
          }, 100);
        }
      }
    }
  
    $buttonDrop.on("mouseenter mouseleave click", handleInteraction);
  
    $dropdownWrapper.on("mouseleave", function () {
      if (!isSmallScreen) {
        timeoutId = setTimeout(function () {
          if (!$buttonDrop.is(":hover")) {
            hideDropdown();
          }
        }, 100);
      }
    });
  
    $(window).on('resize', function() {
      isSmallScreen = window.innerWidth <= 991;
    });
  });
