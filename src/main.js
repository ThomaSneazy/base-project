// import Swiper from "swiper";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initLoader } from "./loader.js";

// import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);


window.addEventListener('load', initLoader);

console.log('main.js');



///////////BENTO GRID ARTICLES///////////////
window.addEventListener('load', function () {
  const items = document.querySelectorAll('.adobe__item, .novum__item, .awwward__item, .behance__item');
  const shuffledItems = gsap.utils.shuffle([...items]);

  gsap.from(shuffledItems, {
    scrollTrigger: {
      trigger: ".home-articles__wrapper",
      start: "top 70%",
      end: "bottom 20%",
      toggleActions: "play none none none",
    },
    scale: 0.5,
    opacity: 0,
    duration: 1,
    ease: "power3.inOut",
    stagger: {
      amount: 0.6,
      from: "random",
    },
  });
});

/////////////////PREFOOTER HOVER IMG FRANCIS ET BENJI////////////////////
$(window).ready(function() {
  const $prefooterButton = $('.button-icon.is-prefooter');
  const $hungryImages = $('.francis-img.is-hungry, .benji-img.is-hungry');
  const $happyImages = $('.francis-img.is-happy, .benji-img.is-happy');
  const $francisLink = $('.francis-link');
  const $benjiLink = $('.benji-link');
  const $francisImages = $('.francis-img');
  const $benjiImages = $('.benji-img');

  $hungryImages.css('opacity', 1);
  $happyImages.css('opacity', 0);

  $prefooterButton.hover(
    function() {
      $hungryImages.css('opacity', 0);
      $happyImages.css('opacity', 1);
    },
    function() {
      $happyImages.css('opacity', 0);
      $hungryImages.css('opacity', 1);
    }
  );

  $francisLink.hover(
    function() {
      $francisImages.css('opacity', 0);
      $('.francis-img.is-face').css('opacity', 1);
      $('.benji-img.is-target').css('opacity', 1);
    },
    function() {
      $hungryImages.css('opacity', 1);
      $('.francis-img.is-face, .benji-img.is-target').css('opacity', 0);
    }
  );

  $benjiLink.hover(
    function() {
      $benjiImages.css('opacity', 0);
      $('.benji-img.is-face').css('opacity', 1);
      $('.francis-img.is-target').css('opacity', 1);
    },
    function() {
      $hungryImages.css('opacity', 1);
      $('.benji-img.is-face, .francis-img.is-target').css('opacity', 0);
    }
  );
});

/////////////////PREFOOTER IN BUILD RESPONSIVE PUSH IMAGE IN FLEX///////////////
$(window).ready(function () {
    const prefooterImg = $(".prefooter__img__wrapper");
    const ctaPrefooter = $(".cta-prefooter__wrapper");
    const button = ctaPrefooter.find(".button-icon");
    let originalParent;
  
    function handleResize() {
      if (window.innerWidth <= 767) {
        if (!originalParent) {
          originalParent = prefooterImg.parent();
        }
        prefooterImg.insertBefore(button);
      } else if (originalParent) {
        originalParent.append(prefooterImg);
      }
    }
  
    handleResize();
  
    $(window).on("resize", handleResize);
  });


///////////PREFOOTER IN BUILD///////////////
// $(window).ready(function () {
//   const images = $(".prefooter__img__item img");

//   images.each(function (index) {
//     gsap.fromTo(
//       this,
//       { y: "100%" },
//       {
//         y: "0%",
//         duration: 1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".prefooter",
//           start: "top 80%",
//           toggleActions: "play none none none",
//         },
//         delay: index * 0.4,
//       },
//     );
//   });
// });

/////////////////BUTTON ARROW PLAY VIDEO ZOOM-IN////////////////////
window.addEventListener('load', function() {
  const button = document.querySelector(".button-video-stuck");
  const videoBg = document.querySelector(".video-bg");
  const video = videoBg.querySelector("video");

  button.addEventListener("click", function() {
    gsap.to(button, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: function() {
        button.style.display = "none";
      },
    });

    gsap.to(videoBg, {
      width: "100%",
      height: "100%",
      opacity: 1,
      duration: 1.3,
      ease: "expo.inOut",
      onStart: function() {
        videoBg.style.zIndex = "1000";
      },
    });

    if (video) {
      video.play();
      video.loop = true;
    }
  });
});

/////////////////BUTTON ARROW MAGNET (video bg)////////////////////
$(window).ready(function () {
  const button = $(".button-video-stuck");
  const magneticArea = 130;
  const magnetStrength = 0.4;
  let isHovering = false;

  $(document).on("mousemove", function (event) {
    const { clientX, clientY } = event;
    const { left, top, width, height } = button[0].getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < magneticArea) {
      isHovering = true;
      const moveX = deltaX * magnetStrength;
      const moveY = deltaY * magnetStrength;

      gsap.to(button, {
        x: moveX,
        y: moveY,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      });
    } else if (isHovering) {
      isHovering = false;
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  });
});

/////////////////BUTTON ARROW HOVER (video bg)////////////////////
$(window).ready(function () {
  $(".button-video-stuck").hover(
    function () {
      gsap.to($(this).find(".fake-arrow-width"), {
        width: "100%",
        duration: 0.8,
        ease: "power2.inOut",
      });

      gsap.to(this, {
        paddingLeft: "1.67rem",
        paddingRight: "4rem",
        backgroundColor: "#8ddd8d",
        color: "#131313",
        duration: 0.8,
        ease: "power2.inOut",
      });

      gsap.to($(this).find(".icon-arrow-green-block"), {
        backgroundColor: "#131313",
        duration: 0.8,
        ease: "power2.inOut",
      });

      gsap.to($(this).find(".icon-arrow-green-block svg"), {
        color: "#ffffff",
        duration: 0.8,
        ease: "power2.inOut",
      });
    },
    function () {
      gsap.to($(this).find(".fake-arrow-width"), {
        width: "0%",
        duration: 0.8,
        ease: "power2.inOut",
      });

      gsap.to(this, {
        paddingLeft: "4rem",
        paddingRight: "1.67rem",
        backgroundColor: "#131313",
        color: "#ffffff",
        duration: 0.8,
        ease: "power2.inOut",
      });

      gsap.to($(this).find(".icon-arrow-green-block"), {
        backgroundColor: "#8ddd8d",
        duration: 0.8,
        ease: "power2.inOut",
      });

      gsap.to($(this).find(".icon-arrow-green-block svg"), {
        color: "#131313",
        duration: 0.8,
        ease: "power2.inOut",
      });
    },
  );
});

// ///////////////SWIPER HOME REVIEWS////////////////////
// window.addEventListener('load', function () {
//   var swiper;
//   function initSwiper() {
//     gsap.set(".swiper-slide.temoignage-home:not(.swiper-slide-active)", {
//       opacity: 0,
//       y: 40,
//     });
//     gsap.set(".swiper-slide.temoignage-home.swiper-slide-active", {
//       opacity: 0,
//       y: 0,
//     });
//     swiper = new Swiper(".swiper.temoignage-home", {
//       slidesPerView: "auto",
//       centeredSlides: true,
//       spaceBetween: 30,
//       loop: true,
//       grabCursor: true,
//       breakpoints: {
//         481: {
//           slidesPerView: "auto",
//           centeredSlides: true,
//           spaceBetween: 30,
//           loop: true,
//         },
//         0: {
//           slidesPerView: 1.1,
//           centeredSlides: false,
//           spaceBetween: 20,
//           loop: true,
//         },
//       },
//       on: {
//         init: function () {
//           applyReviewCardStyles();
//           showRelevantCards();
//         },
//       },
//     });
//   }
//   function applyReviewCardStyles() {
//     document.querySelectorAll(".card-review").forEach(function (card) {
//       var source = card.dataset.source;
//       var className = "";
//       switch (source) {
//         case "linkedin":
//           className = "linkedin";
//           break;
//         case "google":
//           className = "google";
//           break;
//         case "13g":
//           className = "treize-g";
//           break;
//       }
//       if (className) {
//         card.classList.add(className);
//         card.querySelectorAll(".content-review, .info-titre, .poste-review").forEach(function (element) {
//           element.classList.add(className);
//         });
//       }
//       handleStarRating(card);
//     });
//   }
//   function handleStarRating(card) {
//     var starWrapper = card.querySelector(".etoile-wrap");
//     var starRating = parseInt(starWrapper.dataset.star);
//     if (starRating >= 1 && starRating <= 5) {
//       starWrapper.querySelectorAll(".etoile-1").forEach(function (star, index) {
//         star.style.display = index < starRating ? "block" : "none";
//       });
//     }
//   }
//   function showRelevantCards() {
//     document.querySelectorAll(".card-review").forEach(function (card) {
//       card.style.display = "none";
//     });
//     document.querySelectorAll(".card-review.linkedin, .card-review.google, .card-review.treize-g").forEach(function (card) {
//       card.style.display = "block";
//     });
//     if (swiper && typeof swiper.update === "function") {
//       swiper.update();
//     }
//   }
//   function animateSlides() {
//     const slides = document.querySelectorAll(".swiper-slide.temoignage-home");
//     slides.forEach((slide) => {
//       if (slide.classList.contains("swiper-slide-active")) {
//         gsap.to(slide, {
//           opacity: 1,
//           y: 0,
//           duration: 1.2,
//           ease: "power2.out",
//         });
//       } else {
//         gsap.to(slide, {
//           opacity: 1,
//           y: 40,
//           duration: 1.2,
//           ease: "power2.out",
//         });
//       }
//     });
//   }
//   function initScrollAnimation() {
//     if (window.innerWidth > 767) {
//       const firstCard = document.querySelector(".first-card");
//       const contentReview = firstCard.querySelector(".content-review.is_first");
//       const p = contentReview.querySelector("p");
//       const texts = contentReview.querySelectorAll("*");
//       const textSizeMedium = firstCard.querySelector(
//         ".text-size-medium.is_first"
//       );
//       const posteReview = firstCard.querySelector(".poste-review.is_first");
//       const infoTitre = firstCard.querySelector(".info-titre");
//       const starWrapper = firstCard.querySelector(".star-treize-g__wrapper");
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: ".first-slide",
//           start: "top 10%",
//           end: "bottom top",
//         },
//       });
//       tl.to(firstCard, {
//         width: "34.72rem",
//         height: "auto",
//         minHeight: "12rem",
//         borderRadius: "0.5rem",
//         backgroundColor: "#2b2b2b",
//         duration: 1.2,
//         ease: "power2.inOut",
//       })
//         .to(
//           p,
//           {
//             fontSize: "0.9rem",
//             duration: 1,
//             ease: "power1.inOut",
//           },
//           "-=1.8"
//         )
//         .to(
//           texts,
//           {
//             fontSize: "0.9rem",
//             duration: 1,
//             ease: "power1.inOut",
//           },
//           "-=1.3"
//         )
//         .to(
//           textSizeMedium,
//           {
//             fontSize: "1.67rem",
//             duration: 1,
//             ease: "power1.inOut",
//           },
//           "-=1.3"
//         )
//         .to(
//           posteReview,
//           {
//             fontSize: "0.9rem",
//             duration: 1,
//             ease: "power1.inOut",
//           },
//           "-=1.3"
//         )
//         .to(
//           starWrapper,
//           {
//             fontSize: "0.9rem",
//             duration: 1,
//             ease: "power1.inOut",
//           },
//           "-=1.3"
//         )
//         .to(
//           infoTitre,
//           {
//             opacity: 0,
//             paddingLeft: "1.67rem",
//             minWidth: "0",
//             duration: 0.8,
//             ease: "power1.inOut",
//           },
//           0.3
//         )
//         .to(
//           contentReview,
//           {
//             opacity: 0,
//             duration: 0.8,
//             ease: "power1.inOut",
//           },
//           0.2
//         )
//         .to(
//           ".swiper-slide.temoignage-home.swiper-slide-active",
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.3,
//             ease: "power2.inOut",
//           },
//           "-=0.5"
//         )
//         .to(
//           firstCard,
//           {
//             opacity: 0,
//             duration: 0.3,
//             ease: "power1.inOut",
//           },
//           "-=0.2"
//         )
//         .to(
//           ".swiper-slide.temoignage-home:not(.swiper-slide-active)",
//           {
//             opacity: 1,
//             y: 0,
//             duration: 1.2,
//             ease: "power2.out",
//             stagger: 0.2,
//           },
//           "-=0.3"
//         );
//     } else {
//       gsap.set(".first-card", { display: "none" });
//       gsap.set(".swiper-slide.temoignage-home", { opacity: 1, y: 0 });
//     }
//   }
//   initSwiper();
//   initScrollAnimation();
//   window.addEventListener("resize", initScrollAnimation);
// });
// ///////////////SWIPER HOME REVIEWS////////////////////
// $(document).ready(function () {
//   var swiper;
//   function initSwiper() {
//     gsap.set(".swiper-slide.temoignage-home:not(.swiper-slide-active)", {
//       opacity: 0,
//       y: 40,
//     });
//     gsap.set(".swiper-slide.temoignage-home.swiper-slide-active", {
//       opacity: 0,
//       y: 0,
//     });
//     swiper = new Swiper(".swiper.temoignage-home", {
//       slidesPerView: "auto",
//       centeredSlides: true,
//       spaceBetween: 30,
//       loop: true,
//       grabCursor: true,
//       breakpoints: {
//         481: {
//           slidesPerView: "auto",
//           centeredSlides: true,
//           spaceBetween: 30,
//           loop: true,
//         },
//         0: {
//           slidesPerView: 1.1,
//           centeredSlides: false,
//           spaceBetween: 20,
//           loop: true,
//         },
//       },
//       on: {
//         init: function () {
//           applyReviewCardStyles();
//           showRelevantCards();
//         },
//       },
//     });
//   }
//   function applyReviewCardStyles() {
//     $(".card-review").each(function () {
//       var $card = $(this);
//       var source = $card.data("source");
//       var className = "";
//       switch (source) {
//         case "linkedin":
//           className = "linkedin";
//           break;
//         case "google":
//           className = "google";
//           break;
//         case "13g":
//           className = "treize-g";
//           break;
//       }
//       if (className) {
//         $card.addClass(className);
//         $card
//           .find(".content-review, .info-titre, .poste-review")
//           .addClass(className);
//       }
//       handleStarRating($card);
//     });
//   }
//   function handleStarRating($card) {
//     var $starWrapper = $card.find(".etoile-wrap");
//     var starRating = parseInt($starWrapper.data("star"));
//     if (starRating >= 1 && starRating <= 5) {
//       $starWrapper.find(".etoile-1").each(function (index) {
//         if (index < starRating) {
//           $(this).show();
//         } else {
//           $(this).hide();
//         }
//       });
//     }
//   }
//   function showRelevantCards() {
//     $(".card-review").hide();
//     $(
//       ".card-review.linkedin, .card-review.google, .card-review.treize-g",
//     ).show();
//     if (swiper && typeof swiper.update === "function") {
//       swiper.update();
//     }
//   }
//   function animateSlides() {
//     const slides = document.querySelectorAll(".swiper-slide.temoignage-home");
//     slides.forEach((slide) => {
//       if (slide.classList.contains("swiper-slide-active")) {
//         gsap.to(slide, {
//           opacity: 1,
//           y: 0,
//           duration: 1.2,
//           ease: "power2.out",
//         });
//       } else {
//         gsap.to(slide, {
//           opacity: 1,
//           y: 40,
//           duration: 1.2,
//           ease: "power2.out",
//         });
//       }
//     });
//   }
//   function initScrollAnimation() {
//     if (window.innerWidth > 767) {
//       const firstCard = document.querySelector(".first-card");
//       const contentReview = firstCard.querySelector(".content-review.is_first");
//       const p = contentReview.querySelector("p");
//       const texts = contentReview.querySelectorAll("*");
//       const textSizeMedium = firstCard.querySelector(
//         ".text-size-medium.is_first",
//       );
//       const posteReview = firstCard.querySelector(".poste-review.is_first");
//       const infoTitre = firstCard.querySelector(".info-titre");
//       const starWrapper = firstCard.querySelector(".star-treize-g__wrapper");
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: ".first-slide",
//           start: "top 10%",
//           end: "bottom top",
//         },
//       });
//       tl.to(firstCard, {
//         width: "34.72rem",
//         height: "auto",
//         minHeight: "12rem",
//         borderRadius: "0.5rem",
//         backgroundColor: "#2b2b2b",
//         duration: 1.2,
//         ease: "power2.inOut",
//       })
//         .to(
//           p,
//           {
//             fontSize: "0.9rem",
//             duration: 1,
//             ease: "power1.inOut",
//           },
//           "-=1.8",
//         )
//         .to(
//           texts,
//           {
//             fontSize: "0.9rem",
//             duration: 1,
//             ease: "power1.inOut",
//           },
//           "-=1.3",
//         )
//         .to(
//           textSizeMedium,
//           {
//             fontSize: "1.67rem",
//             duration: 1,
//             ease: "power1.inOut",
//           },
//           "-=1.3",
//         )
//         .to(
//           posteReview,
//           {
//             fontSize: "0.9rem",
//             duration: 1,
//             ease: "power1.inOut",
//           },
//           "-=1.3",
//         )
//         .to(
//           starWrapper,
//           {
//             fontSize: "0.9rem",
//             duration: 1,
//             ease: "power1.inOut",
//           },
//           "-=1.3",
//         )
//         .to(
//           infoTitre,
//           {
//             opacity: 0,
//             paddingLeft: "1.67rem",
//             minWidth: "0",
//             duration: 0.8,
//             ease: "power1.inOut",
//           },
//           0.3,
//         )
//         .to(
//           contentReview,
//           {
//             opacity: 0,
//             duration: 0.8,
//             ease: "power1.inOut",
//           },
//           0.2,
//         )
//         .to(
//           ".swiper-slide.temoignage-home.swiper-slide-active",
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.3,
//             ease: "power2.inOut",
//           },
//           "-=0.5",
//         )
//         .to(
//           firstCard,
//           {
//             opacity: 0,
//             duration: 0.3,
//             ease: "power1.inOut",
//           },
//           "-=0.2",
//         )
//         .to(
//           ".swiper-slide.temoignage-home:not(.swiper-slide-active)",
//           {
//             opacity: 1,
//             y: 0,
//             duration: 1.2,
//             ease: "power2.out",
//             stagger: 0.2,
//           },
//           "-=0.3",
//         );
//     } else {
//       gsap.set(".first-card", { display: "none" });
//       gsap.set(".swiper-slide.temoignage-home", { opacity: 1, y: 0 });
//     }
//   }
//   initSwiper();
//   initScrollAnimation();
//   $(window).on("resize", function () {
//     initScrollAnimation();
//   });
// });


///////////////HOVER AND CLICK BUTTON HOMEPAGE DISCOVER BLUR BG OFFRES////////////////////
$(document).ready(function () {
  $(".button__gradient__item").each(function () {
    const $buttonItem = $(this);
    const $buttonLink = $buttonItem.find(".button__gradient__link");
    const $buttonToggle = $buttonItem.find(".button__gradient__toggle");
    const $buttonBg = $buttonItem.find(".button__gradient__bg");
    const $buttonLogo = $buttonItem.find(".button__gradient__logo");
    const $buttonTextWrapper = $buttonItem.find(
      ".button__gradient__button-text__wrapper",
    );

    let isAnimated = false;
    const buttonToggleWidth = 14;

    gsap.set($buttonBg, { opacity: 0, width: "30%", filter: "blur(70px)" });
    gsap.set($buttonToggle, { left: "0%", width: "6.11rem" });
    gsap.set($buttonTextWrapper, { opacity: 0 });

    function updateButtonPosition() {
      if (isAnimated) {
        const buttonItemWidth = $buttonItem.width();
        const newLeft =
          buttonItemWidth -
          buttonToggleWidth *
            parseFloat(getComputedStyle(document.documentElement).fontSize);
        gsap.to($buttonToggle, {
          left: newLeft + "px",
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }

    $buttonItem.hover(
      function () {
        if (!isAnimated) {
          gsap.to($buttonBg, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      },
      function () {
        if (!isAnimated) {
          gsap.to($buttonBg, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          });
        }
      },
    );

    $buttonItem.on("click", function (e) {
      if (!isAnimated) {
        e.preventDefault();
        isAnimated = true;

        gsap.to($buttonBg, {
          width: "100%",
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.inOut",
        });

        const tl = gsap.timeline({ delay: 0.1 });
        tl.to($buttonToggle, {
          width: buttonToggleWidth + "rem",
          duration: 0.5,
          ease: "power2.inOut",
        });
        tl.to(
          $buttonLogo,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          },
          "-=0.3",
        );
        tl.to(
          $buttonTextWrapper,
          {
            opacity: 1,
            duration: 0.3,
            ease: "power2.inOut",
          },
          "-=0.3",
        );
        tl.to(
          $buttonToggle,
          {
            left: () => {
              const buttonItemWidth = $buttonItem.width();
              return (
                buttonItemWidth -
                buttonToggleWidth *
                  parseFloat(
                    getComputedStyle(document.documentElement).fontSize,
                  ) +
                "px"
              );
            },
            duration: 1,
            ease: "power3.inOut",
          },
          "-=0.3",
        );

        $buttonLink.removeClass("pointer-none");
      }
    });

    $(window).on("resize", updateButtonPosition);
  });
});



///////////BUTTON INNOVATION HOMEPAGE STACK////////////////////
$(document).ready(function () {
  const $arrowButtons = $(".services__button-logo.is-arrow");
  const $tagLists = $(".tag__list");
  let currentService = "Agences";

  function getRandomTags($tagList, count) {
    const $tags = $tagList.find(".tag__item");
    return $tags
      .get()
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }

  function animateTagsOut($tagList) {
    return gsap.to($tagList.find(".tag__item:not(.hidden)").get(), {
      y: 50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.in",
    });
  }

  function animateTagsIn($tagList) {
    const $tagsToAnimate = $tagList.find(".tag__item:not(.hidden)");
    gsap.set($tagsToAnimate.get(), { y: -50, opacity: 0 });
    return gsap.to($tagsToAnimate.get(), {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
    });
  }

  function switchTags(newServiceName) {
    if (newServiceName === currentService) {
      const $currentTagList = $(
        `.tag__list[data-name-services="${currentService}"]`,
      );
      animateTagsOut($currentTagList).then(() =>
        animateTagsIn($currentTagList),
      );
      return;
    }

    const timeline = gsap.timeline();

    const $currentTagList = $(
      `.tag__list[data-name-services="${currentService}"]`,
    );
    const $newTagList = $(`.tag__list[data-name-services="${newServiceName}"]`);

    if ($currentTagList.length) {
      timeline.add(animateTagsOut($currentTagList));
      timeline.set($currentTagList.get(), { display: "none" }, ">");
    }

    if ($newTagList.length) {
      timeline.set($newTagList.get(), { display: "flex" }, ">");
      $newTagList.find(".tag__item").removeClass("hidden");
      timeline.add(animateTagsIn($newTagList));
    }

    currentService = newServiceName;
  }

  const $agencesTagList = $('.tag__list[data-name-services="Agences"]');
  if ($agencesTagList.length) {
    $agencesTagList.css("display", "flex");
    const $randomTags = $(getRandomTags($agencesTagList, 5));
    $agencesTagList.find(".tag__item").addClass("hidden");
    $randomTags.removeClass("hidden");
    animateTagsIn($agencesTagList);
  }

  $arrowButtons.on("click", function () {
    const serviceName = $(this).attr("data-name-services");
    switchTags(serviceName);
  });
});


//////////////////////SERVICES BUTTONS ANIMATION STACK//////////////////////
$(document).ready(function () {
  const $buttonBlocks = $(".services__button-block");

  function initializeButtonBlock(block) {
    const $block = $(block);
    const $buttons = $block.find(".services__button-logo");
    const $arrowButton = $block.find(".services__button-logo.is-arrow");
    const $otherButtons = $block.find(".services__button-logo:not(.is-arrow)");

    gsap.set($buttons.get(), { y: "22.9rem" });

    $otherButtons.each(function () {
      const $rotateElement = $(this).find(".rotate");
      if ($rotateElement.length) {
        const randomRotation = Math.random() * 360 - 180;
        gsap.set($rotateElement.get(0), { rotationZ: randomRotation });
      }
    });

    function animateButtons() {
      const timeline = gsap.timeline();

      timeline
        .to($arrowButton.get(0), {
          y: "-10rem",
          duration: 1.2,
          ease: "power2.inOut",
        })
        .to(
          $arrowButton.get(0),
          {
            opacity: 0,
            duration: 0.4,
            ease: "power1.inOut",
          },
          "-=0.3",
        );

      timeline.to(
        $otherButtons.get(),
        {
          y: "0rem",
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.6",
      );

      $otherButtons.each(function () {
        const $rotateElement = $(this).find(".rotate");
        if ($rotateElement.length) {
          timeline.to(
            $rotateElement.get(0),
            {
              rotationZ: 0,
              duration: 1.2,
              ease: "power2.out",
            },
            "-=1",
          );
        }
      });

      return timeline;
    }

    $arrowButton.on("click", animateButtons);
  }

  $buttonBlocks.each(function () {
    initializeButtonBlock(this);
  });
});



//////////////////////GRADIENT EFFECT NOISE/BLUR EFFECT//////////////////////
$(document).ready(function () {
  const $gradientBgs = $(".gradient-blur-bg");

  $gradientBgs.each(function () {
    const bg = this;

    gsap.to(bg, {
      x: "10%",
      y: "10%",
      rotation: 2,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(bg, {
      scale: 1.1,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
});



//////////////////////HOVER ON VIDEO HOMEPAGE//////////////////////
$(document).ready(function () {
  const $videoWrappers = $(".home-video__wrapper");
  let animations = [];

  function initDesktopAnimation() {
    $videoWrappers.each(function (index) {
      const $wrapper = $(this);
      const $itemWrappers = $wrapper.find(".home-video__item__wrapper");
      const $button = $wrapper.find(".button-icon.is-video-section");
      const $title = $wrapper.find(".home-video__btn .heading-style-h3");
      const $videoBe = $wrapper.find(".video-be");
      const $openButton = $wrapper.find(".home-video-btn__open");
      const $openIcon = $openButton.find(".icon-arrow:not(.is-close)");
      const $closeIcon = $openButton.find(".icon-arrow.is-close");

      let activeVideoIndex = Math.floor(Math.random() * $videoBe.length);

      gsap.set($itemWrappers, { height: "4.72rem", width: "20rem", borderRadius: "2.78rem" });
      gsap.set($button, { opacity: 0 });
      gsap.set($title, { opacity: 1 });
      gsap.set($videoBe, { opacity: 0 });
      gsap.set($openButton, { left: "0.4rem" });
      gsap.set($closeIcon, { opacity: 0 });

      const tl = gsap.timeline({ paused: true });

      tl.to($itemWrappers, {
        height: "32rem",
        width: "25rem",
        borderRadius: "2rem",
        duration: 0.8,
        ease: "power3.inOut",
      })
        .to(
          $button,
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.inOut",
            onStart: () => $button.addClass("pointer-events-auto"),
          },
          "-=0.6",
        )
        .to(
          $title,
          {
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "-=0.4",
        )
        .to(
          $videoBe.eq(activeVideoIndex),
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "-=0.4",
        )
        .to(
          $openButton,
          {
            left: "98%",
            xPercent: -100,
            duration: 0.6,
            ease: "power3.inOut",
          },
          "-=0.3",
        )
        .to(
          $openIcon,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut",
          },
          "-=0.3",
        )
        .to(
          $closeIcon,
          {
            opacity: 1,
            duration: 0.2,
            ease: "power2.inOut",
          },
          "-=0.2",
        );

      animations[index] = tl;

      const toggleVideo = () => {
        gsap.to($videoBe.eq(activeVideoIndex), {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
        activeVideoIndex = (activeVideoIndex + 1) % $videoBe.length;
        gsap.to($videoBe.eq(activeVideoIndex), {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        });
      };

      const hideAllVideos = () => {
        gsap.to($videoBe, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      };

      $wrapper.on("mouseenter", function () {
        if (window.innerWidth > 991) {
          tl.play();
          $wrapper.addClass("z-index-2");
        }
      });

      $wrapper.on("mouseleave", function () {
        if (window.innerWidth > 991) {
          tl.reverse();
          hideAllVideos();
          $wrapper.removeClass("z-index-2");
          $button.removeClass("pointer-events-auto");
        }
      });

      $openButton.on("click", function (e) {
        e.stopPropagation();
        if (window.innerWidth > 991) {
          if (tl.progress() === 0 || tl.reversed()) {
            tl.play();
            $wrapper.addClass("z-index-2");
          } else {
            tl.reverse();
            hideAllVideos();
            $wrapper.removeClass("z-index-2");
            $button.removeClass("pointer-events-auto");
          }
        }
      });
    });
  }

  function destroyAnimations() {
    animations.forEach((tl) => {
      if (tl) {
        tl.kill();
      }
    });
    gsap.set(
      $(
        ".home-video__item__wrapper, .button-icon.is-video-section, .home-video__btn .heading-style-h3, .video-be, .home-video-btn__open, .icon-arrow",
      ),
      { clearProps: "all" },
    );
  }

  function handleResize() {
    if (window.innerWidth > 991) {
      destroyAnimations();
      initDesktopAnimation();
      $videoWrappers.removeClass("mobile-layout");
    } else {
      destroyAnimations();
      $videoWrappers.addClass("mobile-layout");
    }
  }

  handleResize();

  $(window).on("resize", handleResize);
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
