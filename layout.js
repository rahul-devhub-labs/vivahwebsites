$(function () {
  const headerLoad = $.Deferred();
  const leftLoad = $.Deferred();
  const rightLoad = $.Deferred();
  const footerLoad = $.Deferred();

  // Load and unwrap header
  $("#header").load("header.html", function () {
    const $content = $("#header").children();
    $("#header").replaceWith($content);
    headerLoad.resolve();
  });

  // Load and unwrap left card
  $("#leftcardlt").load("leftcard.html", function () {
    const $content = $("#leftcardlt").children();
    $("#leftcardlt").replaceWith($content);
    leftLoad.resolve();
  });

  // Load and unwrap right card
  $("#rightcardlt").load("rightcard.html", function () {
    const $content = $("#rightcardlt").children();
    $("#rightcardlt").replaceWith($content);
    rightLoad.resolve();
  });

  // Load footer (no unwrap needed)
  $("#footer").load("footer.html", function () {
    footerLoad.resolve();
  });

  // Wait for all loads to complete
  $.when(headerLoad, leftLoad, rightLoad, footerLoad).done(function () {
    $("#loader").hide();


    $(".custom-image-slider-right").owlCarousel({
    loop: true,
    margin: 10,
    items: 1,
    dots: false,
    nav: false,
    autoplay: true,
  });

    // Nav-active logic
    const navLinks = $(".nav-link");
    const currentPath = window.location.pathname.toLowerCase();

    navLinks.each(function (i) {
      console.log(`Link ${i}: href=${this.getAttribute('href')}, text=${$(this).text().trim()}`);
    });

    // Remove nav-active from all links once
    navLinks.removeClass("nav-active");

    navLinks.each(function (i) {
      let linkPath;
      const href = this.getAttribute('href');

      // Skip invalid or # links for page matching
      if (!href || href === '#' || href.startsWith('javascript:')) {
        return;
      }

      try {
        linkPath = new URL(this.href, window.location.origin).pathname.toLowerCase();
      } catch (e) {
        console.log(`Link ${i}: Invalid URL (href=${href})`);
        return;
      }

      console.log(`Link ${i}: Computed Path=${linkPath}`);

      // Add nav-active if paths match
      if (
        linkPath === currentPath ||
        (currentPath === '/' && linkPath === '/') ||
        (currentPath === '/index.html' && linkPath === '/')
      ) {
        console.log(`Link ${i}: Match found, applying nav-active`);
        $(this).addClass("nav-active");
      }
    });

    // Click handler for nav links
    navLinks.on("click", function (e) {
      const href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault(); // Prevent default for # links
        navLinks.removeClass("nav-active");
        $(this).addClass("nav-active");
      } else {
        // For valid links, apply nav-active temporarily (will reset on reload)
        navLinks.removeClass("nav-active");
        $(this).addClass("nav-active");
      }
    });
  });
});