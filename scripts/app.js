/* Deep5 Tech — Lightweight Progressive Enhancement Script (Zero External Runtime) */
(function () {
  "use strict";

  // 1. Accessible Mobile Navigation Drawer
  var menuBtn = document.getElementById("mobile-menu-toggle");
  var drawer = document.getElementById("mobile-nav-drawer");

  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", function () {
      var expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", expanded ? "false" : "true");
      drawer.hidden = expanded;
    });

    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
        menuBtn.setAttribute("aria-expanded", "false");
        drawer.hidden = true;
        menuBtn.focus();
      }
    });
  }

  // 2. Blog Index Category Filter Controls
  var filterBtns = document.querySelectorAll("[data-blog-filter]");
  var postCards = document.querySelectorAll("[data-post-category]");

  if (filterBtns.length > 0 && postCards.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var category = btn.getAttribute("data-blog-filter");
        filterBtns.forEach(function (other) {
          var isSelected = other === btn;
          other.classList.toggle("is-active", isSelected);
          other.setAttribute("aria-pressed", isSelected ? "true" : "false");
        });

        postCards.forEach(function (card) {
          var cardCat = card.getAttribute("data-post-category");
          var visible = category === "all" || cardCat === category;
          card.hidden = !visible;
        });
      });
    });
  }

  // 3. Contact Proposal Form Client-Side Validation (UI Only)
  var form = document.getElementById("proposal-form");
  if (form) {
    var statusBox = document.getElementById("form-status-banner");

    function setError(fieldId, message) {
      var input = document.getElementById(fieldId);
      var errEl = document.getElementById(fieldId + "-error");
      if (input) {
        input.setAttribute("aria-invalid", message ? "true" : "false");
      }
      if (errEl) {
        errEl.textContent = message || "";
      }
    }

    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      var nameVal = (document.getElementById("contact-name").value || "").trim();
      var emailVal = (document.getElementById("contact-email").value || "").trim();
      var phoneVal = (document.getElementById("contact-phone").value || "").trim();
      var serviceVal = (document.getElementById("contact-service").value || "").trim();
      var briefVal = (document.getElementById("contact-brief").value || "").trim();

      var valid = true;
      setError("contact-name", "");
      setError("contact-email", "");
      setError("contact-phone", "");
      setError("contact-service", "");
      setError("contact-brief", "");

      if (nameVal.length < 2) {
        setError("contact-name", "Enter your full name (at least 2 characters).");
        valid = false;
      }

      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        setError("contact-email", "Enter a valid business email address.");
        valid = false;
      }

      var digitsOnly = phoneVal.replace(/\D/g, "");
      if (digitsOnly.length < 10) {
        setError("contact-phone", "Enter a 10-digit phone or WhatsApp number.");
        valid = false;
      }

      if (!serviceVal) {
        setError("contact-service", "Select a primary service track.");
        valid = false;
      }

      if (briefVal.length < 15) {
        setError("contact-brief", "Share at least 15 characters describing your project scope.");
        valid = false;
      }

      if (!valid) {
        statusBox.hidden = false;
        statusBox.className = "form-status form-status-error";
        statusBox.textContent = "Please fix the highlighted fields above before submitting.";
        return;
      }

      statusBox.hidden = false;
      statusBox.className = "form-status form-status-success";
      statusBox.textContent =
        "Proposal brief validated for " +
        serviceVal +
        ". Email deep5devlopers@gmail.com or message +91 98250 45900 on WhatsApp to confirm your kickoff slot.";
      form.reset();
    });
  }
})();
