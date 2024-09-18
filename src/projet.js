
import { initLoader } from "./loader";

function initProjetPage() {
    initLoader();
    // handleNavbarLogo();
    enhanceVimeoQuality();
    setupVimeoScriptRemoval();
    setupProjectAnimation();
    setupNavbarLogoColor();
    handleNavbarDropdown();
    stopLenis();
}

function stopLenis() {
    lenis.destroy();
  }




///////////////QUALITY VIDEO VIMEO//////////////////
function enhanceVimeoQuality() {
    function updateVimeoIframes() {
        document.querySelectorAll('iframe[src^="https://player.vimeo.com/video/"]').forEach(function (iframe) {
            let src = new URL(iframe.src);
            src.searchParams.set('quality', '1080p');
            src.searchParams.set('dnt', '1');
            src.searchParams.set('background', '1');
            src.searchParams.set('autoplay', '1');
            src.searchParams.set('loop', '1');
            src.searchParams.set('muted', '1');
            iframe.src = src.toString();
        });
    }

    updateVimeoIframes();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                updateVimeoIframes();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

///////////////DELETE SCRIPT ON VIEMO COPY/PASTE BUT DOESNT WORK???//////////////////
function setupVimeoScriptRemoval() {
    function removeVimeoScripts() {
        document.querySelectorAll('script[src^="https://player.vimeo.com/api/player.js"]').forEach(script => script.remove());
        document.querySelectorAll('script:not([src])').forEach(script => {
            if (script.textContent.includes('https://player.vimeo.com/api/player.js')) {
                script.remove();
            }
        });
    }

    removeVimeoScripts();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                removeVimeoScripts();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

///////////////ANIMATION OPACITY AND MOVE ON ACTIVE PROJECT BUT GLITCH ON NEW PROJECT CAUSE OF VIDEO??//////////////////
function setupProjectAnimation() {
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
                        { y: '15%', opacity: 0 },
                        {
                            y: '0%',
                            opacity: 1,
                            duration: 1.2,
                            ease: "power2.out"
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
}

// Fonction pour mettre à jour la couleur du logo de la navbar
function setupNavbarLogoColor() {
    function updateNavbarLogo() {
        const navbarLogo = document.querySelector('.navbar__logo');
        if (navbarLogo) {
            navbarLogo.style.color = window.location.href.includes('projets') ? '#131313' : '';
        }
    }

    updateNavbarLogo();
    window.addEventListener('popstate', updateNavbarLogo);
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setTimeout(updateNavbarLogo, 0));
    });
}

//////////////////////LOGO NAVBAR BLACK///////////////////////
// function handleNavbarLogo() {
//     function updateNavbarLogo() {
//       const navbarLogo = document.querySelector('.navbar__logo');
//       if (navbarLogo) {
//         if (window.location.href.includes('projets')) {
//           navbarLogo.style.color = '#131313';
//         } else {
//           navbarLogo.style.color = ''; 
//         }
//       }
//     }
  
//     updateNavbarLogo();
  
//     window.addEventListener('popstate', updateNavbarLogo);
  
//     document.querySelectorAll('a').forEach(link => {
//       link.addEventListener('click', (e) => {
//         setTimeout(updateNavbarLogo, 0);
//       });
//     });
//   }



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



document.addEventListener('DOMContentLoaded', initProjetPage);
