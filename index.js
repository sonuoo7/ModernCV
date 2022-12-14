$(document).ready(function () {
  $("#profile-ripple").ripples({
    resolution: 512,
    dropRadius: 20,
  });

  const bars = document.querySelectorAll(".progress-bar");
  bars.forEach(function (bar) {
    let percentage = bar.dataset.percent;
    let tooltip = bar.children[0];
    tooltip.innerText = percentage + "%";
    bar.style.width = percentage + "%";
  });
  //counters
  const counter = document.querySelectorAll(".counter");

  function runCounter() {
    counter.forEach((counter) => {
      counter.innerText = 0;

      let target = +counter.dataset.count;
      let step = target / 100;

      let countIt = function () {
        let displayedCount = +counter.innerText;
        if (displayedCount < target) {
          counter.innerText = Math.ceil(displayedCount + step);
          setTimeout(countIt, 5);
        } else {
          counter.innerText = target;
        }
      };
      countIt();
    });
  }
  runCounter();

  let counterSection = document.querySelector(".counter-wrapper");

  let options = {
    rootMargin: "0px 0px -200px 0px",
  };

  let done = 0;

  const sectionObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && done !== 1) {
      done = 1;
      runCounter();
    }
  }, options);
  sectionObserver.observe(counterSection);

  //image filter

  var wrapper = $(".portfolio-wrapper");

  wrapper.isotope({
    filter: "*",
    layoutMode: "masonry",
    animationOptions: {
      duration: 750,
      easing: "linear",
    },
  });

  let links = document.querySelectorAll(".tabs a");
  console.log(links);
  links.forEach((link) => {
    let selector = link.dataset.filter;

    link.addEventListener("click", function (e) {
      e.preventDefault();
      wrapper.isotope({
        filter: selector,
        layoutMode: "masonry",
        animationOptions: {
          duration: 750,
          easing: "linear",
        },
      });

      links.forEach((link) => {
        link.classList.remove("active");
      });
      e.target.classList.add("active");
    });
  });

  // magnify popup

  $(".magnify").magnificPopup({
    type: "image",
    gallary: {
      enabled: true,
    },
    zoom: {
      enable: true,
    },
  });

  //slider
  $(".slider").slick({
    arrows: false,
    autoplay: true,
  });
});
