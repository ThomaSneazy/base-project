// import { initLoader } from "./loader.js";


document.addEventListener('DOMContentLoaded', function() {
  // console.log("hey blog and client back");
  ////////////////////// MAIN FUNCTION //////////////////////
  function initializeBlogFunctionalities() {
    styleDarkBackgroundArticles();
    handleHeadingsAndButtons();
    handleButtonAnimations();
    handleNavbarDropdown(); 
    handleColorBlocks();
    handleClientAnchors();
    handleNavbarLogo(); 
    // initLoader();
    scrollToElement();
  }


  //////////////////// ANCHOR TO H2 BLOG TEMPLATE//////////////////////
function scrollToElement(element, duration) {
    const start = window.pageYOffset;
    const target = element.getBoundingClientRect().top + start - 50;
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

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
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


//////////////////////LOGO NAVBAR BLACK///////////////////////
function handleNavbarLogo() {
  function updateNavbarLogo() {
    const navbarLogo = document.querySelector('.navbar__logo');
    if (navbarLogo) {
      if (window.location.href.includes('pages-clients')) {
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





  ////////////////////// CLIENT ANCHORS //////////////////////
  function handleClientAnchors() {
    const anchorItems = document.querySelectorAll('.anchor__client__item');
  
    anchorItems.forEach(item => {
      item.addEventListener('click', function(e) {
        // e.preventDefault();
  
        const toggle = this.querySelector('.project__toggle');
  
        document.querySelectorAll('.project__toggle.active').forEach(activeToggle => {
          activeToggle.classList.remove('active');
        });
  
        if (toggle) {
          toggle.classList.add('active');
        }
  
      });
    });
  }
  
  

  ////////////////////// COLOR BLOCKS //////////////////////
  function handleColorBlocks() {
    const colorBlocks = document.querySelectorAll('.logotype__block__color');
  
    colorBlocks.forEach(block => {
      const links = block.querySelectorAll('a[data-color]');
      let bgColor, rgb;
  
      if (block.classList.contains('is-gradient')) {
        const gradientLink = block.querySelector('a[data-color]');
        if (gradientLink) {
          const gradientBg = gradientLink.getAttribute('data-color');
          if (gradientBg) {
            const cleanGradient = cleanGradientString(gradientBg);
            block.style.background = cleanGradient;
            bgColor = cleanGradient;
          }
        }
      } else {
        bgColor = getComputedStyle(block).backgroundColor;
        rgb = bgColor.match(/\d+/g).map(Number);
      }
  
      links.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const colorType = this.getAttribute('data-color');
          let colorCode;
  
          if (block.classList.contains('is-gradient')) {
            colorCode = cleanGradientString(colorType);
          } else {
            switch(colorType) {
              case 'cmjn':
                const cmjn = rgbToCmyk(rgb[0], rgb[1], rgb[2]);
                colorCode = `C:${cmjn.c}% M:${cmjn.m}% J:${cmjn.y}% N:${cmjn.k}%`;
                break;
              case 'rvb':
                colorCode = `R:${rgb[0]} V:${rgb[1]} B:${rgb[2]}`;
                break;
              case 'hexa':
                colorCode = rgbToHex(rgb[0], rgb[1], rgb[2]);
                break;
              default:
                console.error('Type de couleur non reconnu');
                return;
            }
          }
  
          copyToClipboard(colorCode);
        });
      });
    });
  
    function cleanGradientString(gradient) {
      return gradient.replace(/var\([^)]+\)/g, '').replace(/,\s*$/, '').trim();
    }
  
    function rgbToCmyk(r, g, b) {
      let c = 1 - (r / 255);
      let m = 1 - (g / 255);
      let y = 1 - (b / 255);
      let k = Math.min(c, m, y);
  
      c = (c - k) / (1 - k) || 0;
      m = (m - k) / (1 - k) || 0;
      y = (y - k) / (1 - k) || 0;
  
      return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
      };
    }
  
    function rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }
  
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Code couleur ou gradient copié : ' + text);
      }).catch(err => {
        console.error('Erreur lors de la copie :', err);
      });
    }
  }
  
  

  ////////////////////// DARK BACKGROUND STYLING //////////////////////
  function styleDarkBackgroundArticles() {
    const bgArticles = document.querySelectorAll('.bg-article');
    bgArticles.forEach(bgArticle => {
      const blogArticle = bgArticle.closest('.blog__article');
      if (blogArticle) {
        const bgColor = bgArticle.style.backgroundColor || window.getComputedStyle(bgArticle).backgroundColor;
        if (bgColor === 'rgb(19, 19, 19)' || bgColor === '#131313') {
          blogArticle.style.color = 'white';
          
          blogArticle.querySelectorAll('.is-poste').forEach(element => {
            element.style.color = '#8ddd8d';
          });
          
          const iconArrowBlock = blogArticle.querySelector('.icon-arrow-block') || 
                                 bgArticle.querySelector('.icon-arrow-block');
          
          if (iconArrowBlock) {
            blogArticle.addEventListener('mouseenter', () => {
              iconArrowBlock.style.backgroundColor = 'white';
              iconArrowBlock.style.color = '#131313';
            });
            
            blogArticle.addEventListener('mouseleave', () => {
              iconArrowBlock.style.backgroundColor = '';
              iconArrowBlock.style.color = '';
            });
          }
        }
      }
    });
  }

  ////////////////////// HEADINGS AND BUTTONS //////////////////////
  function handleHeadingsAndButtons() {
    const richTextBlog = document.querySelector('.rich-text-blog');
    if (!richTextBlog) return;

    document.querySelectorAll('.heading__blog__container').forEach(container => {
      container.style.display = 'none';
    });

    const h2Elements = richTextBlog.querySelectorAll('h2');
    h2Elements.forEach((h2, index) => {
      const headingContainer = document.createElement('div');
      headingContainer.className = 'heading__blog__container';
      headingContainer.id = `heading-${index + 1}`;
      
      h2.parentNode.insertBefore(headingContainer, h2);
      headingContainer.appendChild(h2);

      const button = document.querySelector(`.button__anchor__blog.is-chap-${index + 1}`);
      if (button) {
        button.style.display = 'block';
        button.addEventListener('click', () => {
          const targetHeading = document.getElementById(`heading-${index + 1}`);
          if (targetHeading) {
            scrollToElement(targetHeading, 1500);
          }
        });
      }
    });

    for (let i = h2Elements.length + 1; i <= 5; i++) {
      const button = document.querySelector(`.button__anchor__blog.is-chap-${i}`);
      if (button) {
        button.style.display = 'none';
      }
    }
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

   
  window.addEventListener('load', () => {
    initializeBlogFunctionalities();
  });
});