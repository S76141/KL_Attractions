// Handle Contact Form Submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  var form = event.target;
  
  // Validate form fields
  if (name && email && message) {
    // Create a FormData object to collect the form data
    var data = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert(
            `Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon!`
          );

          // Reset the form
          form.reset();
        } else {
          // Handle errors if submission fails
          response.json().then((data) => {
            if (data.errors) {
              alert(data.errors.map((error) => error.message).join(", "));
            } else {
              alert("Oops! There was a problem submitting your form.");
            }
          });
        }
      })
      .catch((error) => {
        // Handle fetch errors
        alert("Oops! There was a problem submitting your form.");
      });
  } else {
    // Display error alert if fields are missing
    alert("Please fill in all fields before submitting.");
  }
}

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scrolling to all links
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add active state to navigation based on scroll position
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");

  function highlightNavigation() {
    let scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavigation);

  // Animation on scroll for cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all cards and gallery items
  const cards = document.querySelectorAll(".card, .gallery-item");
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});

// Mobile menu toggle (if needed for responsive design)
function toggleMobileMenu() {
  const nav = document.querySelector("nav ul");
  nav.classList.toggle("mobile-active");
}

// Add to any button that triggers explore action
function exploreNow() {
  const attractionsSection = document.getElementById("attractions");
  if (attractionsSection) {
    attractionsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
