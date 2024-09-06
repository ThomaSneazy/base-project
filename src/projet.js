console.log("hey projects cursor");

(function() {
    function enhanceVimeoQuality() {
        document.querySelectorAll('iframe[src^="https://player.vimeo.com/video/"]').forEach(function(iframe) {
            let src = new URL(iframe.src);
            
            // Forcer la plus haute qualité
            src.searchParams.set('quality', '1080p');
            
            // Désactiver la réduction automatique de la qualité
            src.searchParams.set('dnt', '1');
            
            // Autres paramètres pour une lecture en arrière-plan
            src.searchParams.set('background', '1');
            src.searchParams.set('autoplay', '1');
            src.searchParams.set('loop', '1');
            src.searchParams.set('muted', '1');
            
            // Appliquer les changements
            iframe.src = src.toString();
        });
    }

    // Exécuter immédiatement
    enhanceVimeoQuality();

    // Continuer à surveiller les changements du DOM
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                enhanceVimeoQuality();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Exécuter à nouveau après le chargement complet de la page
    window.addEventListener('load', enhanceVimeoQuality);
})();

(function() {
    function removeVimeoScripts() {
        // Supprimer les scripts externes de Vimeo
        var scripts = document.querySelectorAll('script[src^="https://player.vimeo.com/api/player.js"]');
        scripts.forEach(function(script) {
            script.remove();
        });

        // Supprimer les scripts inline qui chargent le script Vimeo
        var inlineScripts = document.querySelectorAll('script:not([src])');
        inlineScripts.forEach(function(script) {
            if (script.textContent.includes('https://player.vimeo.com/api/player.js')) {
                script.remove();
            }
        });
    }

    // Exécuter immédiatement
    removeVimeoScripts();

    // Continuer à surveiller les changements du DOM
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                removeVimeoScripts();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Exécuter à nouveau après le chargement complet de la page
    window.addEventListener('load', removeVimeoScripts);
})();

/////////////Animation au click projet///////////
document.addEventListener('DOMContentLoaded', () => {
    const desktopButtons = document.querySelectorAll('.left [data-project-name]');
    const mobileButtons = document.querySelectorAll('.mobile-buttons [data-project-name]');
    const projectList = document.querySelector('.project__list');
    const projects = projectList ? projectList.querySelectorAll('.project__item') : [];
    const rightContainer = document.querySelector('.right');

    function showProject(projectName, isMobile = false) {
        const activeProject = Array.from(projects).find(project => project.style.display === 'block');
        const newProject = Array.from(projects).find(project => project.getAttribute('data-project-name') === projectName);

        if (activeProject) {
            if (isMobile) {
                gsap.to(activeProject, {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    onComplete: () => {
                        activeProject.style.display = 'none';
                        showNewProject();
                    }
                });
            } else {
                gsap.to(activeProject, {
                    x: '100%',
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.inOut",
                    onComplete: () => {
                        activeProject.style.display = 'none';
                        gsap.set(activeProject, { x: '0%', opacity: 1 });
                        showNewProject();
                    }
                });
            }
        } else {
            showNewProject();
        }

        function showNewProject() {
            if (newProject) {
                projects.forEach(project => {
                    if (project !== newProject) {
                        project.style.display = 'none';
                    }
                });

                if (rightContainer) {
                    rightContainer.scrollTop = 0;
                }

                newProject.style.display = 'block';
                if (isMobile) {
                    gsap.fromTo(newProject, 
                        { opacity: 0 },
                        { 
                            opacity: 1, 
                            duration: 0.4, 
                            ease: "power2.in"
                        }
                    );
                } else {
                    gsap.fromTo(newProject, 
                        { y: '100%', opacity: 0 },
                        { 
                            y: '0%', 
                            opacity: 1, 
                            duration: 0.8, 
                            ease: "power3.out"
                        }
                    );
                }
            }
        }

        updateButtonStates(projectName);
    }

    function updateButtonStates(projectName) {
        [desktopButtons, mobileButtons].forEach(buttonSet => {
            buttonSet.forEach(button => {
                const projectToggle = button.querySelector('.project__toggle');
                if (button.getAttribute('data-project-name') === projectName) {
                    button.classList.add('active');
                    if (projectToggle) projectToggle.classList.add('active');
                } else {
                    button.classList.remove('active');
                    if (projectToggle) projectToggle.classList.remove('active');
                }
            });
        });
    }

    if (projects.length > 0) {
        projects.forEach(project => {
            project.style.display = 'none';
        });

        const firstProjectName = projects[0].getAttribute('data-project-name');
        showProject(firstProjectName);
    } else {
        console.error('Aucun projet trouvé dans .project__list');
    }

    desktopButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectName = button.getAttribute('data-project-name');
            showProject(projectName, false);
        });
    });

    mobileButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectName = button.getAttribute('data-project-name');
            showProject(projectName, true);
        });
    });
});
//////////////////////LOGO NAVBAR BLACK///////////////////////
document.addEventListener('DOMContentLoaded', () => {
    function updateNavbarLogo() {
        const navbarLogo = document.querySelector('.navbar__logo');
        if (navbarLogo) {
            if (window.location.href.includes('projets')) {
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
});


//////////////////////NAVBAR DROPDOWN//////////////////////

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
