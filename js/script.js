(function ($) {
  "use strict";

  var searchPopup = function () {
    // open search box
    $("#header-nav").on("click", ".search-button", function (e) {
      $(".search-popup").toggleClass("is-visible");
    });

    $("#header-nav").on("click", ".btn-close-search", function (e) {
      $(".search-popup").toggleClass("is-visible");
    });

    $(".search-popup-trigger").on("click", function (b) {
      b.preventDefault();
      $(".search-popup").addClass("is-visible"),
        setTimeout(function () {
          $(".search-popup").find("#search-popup").focus();
        }, 350);
    }),
      $(".search-popup").on("click", function (b) {
        ($(b.target).is(".search-popup-close") ||
          $(b.target).is(".search-popup-close svg") ||
          $(b.target).is(".search-popup-close path") ||
          $(b.target).is(".search-popup")) &&
          (b.preventDefault(), $(this).removeClass("is-visible"));
      }),
      $(document).keyup(function (b) {
        "27" === b.which && $(".search-popup").removeClass("is-visible");
      });
  };

  var countdownTimer = function () {
    function getTimeRemaining(endtime) {
      const total = Date.parse(endtime) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      return {
        total,
        days,
        hours,
        minutes,
        seconds,
      };
    }

    function initializeClock(id, endtime) {
      const clock = document.getElementById(id);
      const daysSpan = clock.querySelector(".days");
      const hoursSpan = clock.querySelector(".hours");
      const minutesSpan = clock.querySelector(".minutes");
      const secondsSpan = clock.querySelector(".seconds");

      function updateClock() {
        const t = getTimeRemaining(endtime);
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
        minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }
      updateClock();
      const timeinterval = setInterval(updateClock, 1000);
    }

    $("#countdown-clock").each(function () {
      const deadline = new Date(
        Date.parse(new Date()) + 28 * 24 * 60 * 60 * 1000
      );
      initializeClock("countdown-clock", deadline);
    });
  };

  var initProductQty = function () {
    $(".product-qty").each(function () {
      var $el_product = $(this);
      var quantity = 0;

      $el_product.find(".quantity-right-plus").click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find("#quantity").val());
        $el_product.find("#quantity").val(quantity + 1);
      });

      $el_product.find(".quantity-left-minus").click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find("#quantity").val());
        if (quantity > 0) {
          $el_product.find("#quantity").val(quantity - 1);
        }
      });
    });
  };

  $(document).ready(function () {
    searchPopup();
    initProductQty();
    countdownTimer();

    

    /* Video */
    var $videoSrc;
    $(".play-btn").click(function () {
      $videoSrc = $(this).data("src");
    });

    $("#myModal").on("shown.bs.modal", function (e) {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });

    $("#myModal").on("hide.bs.modal", function (e) {
      $("#video").attr("src", $videoSrc);
    });

    // Replace the existing mainSwiper initialization with this:
    var mainSwiper = new Swiper(".main-swiper", {
      speed: 1000,
      effect: "fade", // Add fade effect between slides
      autoplay: {
        delay: 5000, // 5 seconds delay between slides
        disableOnInteraction: false, // Continue autoplay after user interaction
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".main-slider-button-next",
        prevEl: ".main-slider-button-prev",
      },
      loop: true, // Enable continuous loop
    });

    var productSwiper = new Swiper(".product-swiper", {
      spaceBetween: 20,
      navigation: {
        nextEl: ".product-slider-button-next",
        prevEl: ".product-slider-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        660: {
          slidesPerView: 3,
        },
        980: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 5,
        },
      },
    });
    // var mainSwiper = new Swiper(".main-swiper", {
    //   speed: 1000,
    //   effect: 'fade', // Add fade effect between slides
    //   autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    //   },
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    //   navigation: {
    //     nextEl: ".main-slider-button-next",
    //     prevEl: ".main-slider-button-prev",
    //   },
    //   loop: true, // Enable continuous loop
    // });
    

    var testimonialSwiper = new Swiper(".testimonial-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: ".testimonial-button-next",
        prevEl: ".testimonial-button-prev",
      },
    });

    var thumb_slider = new Swiper(".thumb-swiper", {
      slidesPerView: 1,
    });
    var large_slider = new Swiper(".large-swiper", {
      spaceBetween: 10,
      effect: "fade",
      thumbs: {
        swiper: thumb_slider,
      },
    });
  }); // End of a document ready

  // Add this to your existing JavaScript file or include it in a script tag
document.addEventListener('DOMContentLoaded', function() {
  // Handle click on dropdown submenu toggle
  document.querySelectorAll('.dropdown-submenu > .dropdown-item').forEach(function(element) {
    element.addEventListener('click', function(e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle submenu
        let nextEl = this.nextElementSibling;
        if (nextEl && nextEl.classList.contains('dropdown-menu')) {
          // If visible, hide it
          if (nextEl.style.display == 'block') {
            nextEl.style.display = 'none';
          } else {
            // Otherwise, show it
            nextEl.style.display = 'block';
          }
        }
      }
    });
  });
});

// Add to your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on page load
    document.querySelectorAll('.animate-fade-in').forEach(element => {
        element.classList.add('show');
    });
    
    // Enhanced product card hover effects
    const productCards = document.querySelectorAll('#best-selling-items .card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.image-container img').style.transform = 'scale(1.1)';
        });
        card.addEventListener('mouseleave', function() {
            this.querySelector('.image-container img').style.transform = 'scale(1)';
        });
    });
    
    // Enhanced hero slider interactions
    const mainSwiper = document.querySelector('.main-swiper').swiper;
    mainSwiper.on('slideChangeTransitionStart', function() {
        const activeSlide = this.slides[this.activeIndex];
        const content = activeSlide.querySelector('.banner-content');
        if (content) {
            content.querySelectorAll('h2, p, .btn').forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
            });
        }
    });
    
    mainSwiper.on('slideChangeTransitionEnd', function() {
        const activeSlide = this.slides[this.activeIndex];
        const content = activeSlide.querySelector('.banner-content');
        if (content) {
            content.querySelectorAll('h2, p, .btn').forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100 * (index + 1));
            });
        }
    });
});

 document.addEventListener('DOMContentLoaded', function() {
    // Select all discount badges in product cards
    const discountBadges = document.querySelectorAll('#best-selling-items .card .position-absolute p');
    
    discountBadges.forEach(badge => {
      // Remove any existing classes that might interfere with styling
      badge.classList.remove('bg-primary', 'py-1', 'px-3', 'fs-6', 'text-white', 'rounded-2');
      
      // Add our custom class
      badge.closest('.position-absolute').classList.add('discount-badge');
      
      // Make sure parent container has proper positioning
      const cardContainer = badge.closest('.card');
      if (cardContainer) {
        cardContainer.style.position = 'relative';
      }
    });
  });


  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hide-preloader");
  });
})(jQuery);
