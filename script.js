// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Set active navigation link based on current page
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (currentPage === linkPage) {
      link.classList.add("active");
    } else if (currentPage === "" && linkPage === "index.html") {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Skills progress animation (for student pages)
  const skillBars = document.querySelectorAll(".skill-progress");
  if (skillBars.length > 0) {
    setTimeout(() => {
      skillBars.forEach((bar) => {
        const targetWidth = bar.getAttribute("data-progress") + "%";
        bar.style.width = targetWidth;
      });
    }, 300);
  }

  // Simple form validation (for contact forms if added)
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const nameInput = this.querySelector('input[name="name"]');
      const emailInput = this.querySelector('input[name="email"]');
      const messageInput = this.querySelector('textarea[name="message"]');

      let isValid = true;

      if (!nameInput.value.trim()) {
        markInvalid(nameInput, "Please enter your name");
        isValid = false;
      } else {
        markValid(nameInput);
      }

      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        markInvalid(emailInput, "Please enter a valid email");
        isValid = false;
      } else {
        markValid(emailInput);
      }

      if (!messageInput.value.trim()) {
        markInvalid(messageInput, "Them tin nhan vao day");
        isValid = false;
      } else {
        markValid(messageInput);
      }

      if (isValid) {
        alert("Thank you for your message! This is a demo form.");
        this.reset();
      }
    });
  }

  // Helper functions for form validation
  function markInvalid(input, message) {
    input.classList.add("invalid");
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;

    // Remove any existing error message
    const existingError = input.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    input.parentNode.appendChild(errorDiv);
  }
  function markValid(input) {
    input.classList.remove("invalid");
    const existingError = input.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
  }

  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
});
