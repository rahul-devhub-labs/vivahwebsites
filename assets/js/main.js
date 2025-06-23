const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function updateClock() {
  const now = new Date();
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const formatted = now.toLocaleString("en-US", options);
  $("#timerTopbar").text(formatted);
}

document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const toggle = document.getElementById("navbarToggler");
    const nav = document.getElementById("mainNavbar");
    if (
      window.getComputedStyle(toggle).display !== "none" &&
      nav.classList.contains("show")
    ) {
      toggle.click();
    }
  });
});

$(document).ready(function () {
  updateClock();
  setInterval(updateClock, 1000);

  // $(".custom-image-slider-right").owlCarousel({
  //   loop: true,
  //   margin: 10,
  //   items: 1,
  //   dots: false,
  //   nav: false,
  //   autoplay: true,
  // });
});

let isViewAll = false;
let isMobile = window.innerWidth <= 768;
let $chooseCarousel = $("#chooseCarousel");

function initializeCarousel() {
  $chooseCarousel.addClass("owl-carousel owl-theme").owlCarousel({
    loop: true,
    margin: 15,
    nav: true,
    dots: false,
    autoplay: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 2 },
    },
  });
}

function destroyCarousel() {
  if ($chooseCarousel.hasClass("owl-loaded")) {
    $chooseCarousel.trigger("destroy.owl.carousel");
    $chooseCarousel.removeClass("owl-carousel owl-theme owl-loaded");
  }
}

$(document).ready(function () {
  if (!isMobile) {
    initializeCarousel();
  } else {
    destroyCarousel(); // Just in case it was left in carousel mode
  }

  // Handle screen resize
  $(window).on("resize", function () {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile && !isMobile) {
      destroyCarousel();
      isViewAll = false; // reset view mode
    } else if (!newIsMobile && isMobile && !isViewAll) {
      initializeCarousel();
    }
    isMobile = newIsMobile;
  });
});

function toggleChooseView(btn) {
  if (!isViewAll) {
    destroyCarousel();
    $chooseCarousel
      .removeClass("owl-carousel owl-theme")
      .addClass("d-flex flex-wrap justify-content-center");
    $chooseCarousel.children().addClass("choose-card view-all-mode");
    btn.textContent = "Show Less";
    isViewAll = true;
  } else {
    $chooseCarousel
      .removeClass("d-flex flex-wrap justify-content-center")
      .addClass("owl-carousel owl-theme");
    $chooseCarousel.children().removeClass("view-all-mode");

    if (!isMobile) {
      initializeCarousel();
    }

    btn.textContent = "View All";
    isViewAll = false;
  }
}
