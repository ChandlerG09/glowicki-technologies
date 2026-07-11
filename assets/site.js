(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // Nav gains a blurred backdrop once scrolled
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll-in reveals
  var revealed = document.querySelectorAll(".reveal");
  if (revealed.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealed.forEach(function (el) {
        el.classList.add("in");
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealed.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  // Cursor spotlight on product cards
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - rect.left) + "px");
        card.style.setProperty("--my", (e.clientY - rect.top) + "px");
      });
    });
  }
})();
