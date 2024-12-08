'use strict';

/* PRELOAD
* loading will end after document is loaded
*/
const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

/** add event listener on multiple elements */
const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const heroSlider = document.querySelector(".hero-slider");
    const sliderToggle = document.querySelectorAll("[data-hero-slider]");
    const topbar = document.querySelector(".topbar");

    if (heroSlider) { // Verify if heroSlider is present in DOM
        const openSlider = () => {
            heroSlider.classList.add("active");
            document.body.style.overflow = "hidden"; // Desactivates scroll while heroSlider is active
        };

        const closeSlider = () => {
            heroSlider.classList.remove("active");
            document.body.style.overflow = ""; // Restores scroll
        };

        // Events for slider actions
        sliderToggle.forEach(button => {
            button.addEventListener("click", openSlider);
        });

      
        heroSlider.addEventListener("click", (e) => {
            if (e.target === heroSlider) {
                closeSlider();
            }
        });
    }

    // Show Topbar
    const toggleTopbar = () => {
        if (topbar.classList.contains("active")) {
            topbar.classList.remove("active");
        } else {
            topbar.classList.add("active");
        }
    };

    
    const topbarToggle = document.querySelector("[data-topbar-toggler]");
    if (topbarToggle) {
        topbarToggle.addEventListener("click", toggleTopbar);
    }
});

/** NAVBAR */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER
 */

// Navbar btn
const navbarToggleBtn = document.querySelector("[data-nav-toggler]");


if (navbarToggleBtn) {
    navbarToggleBtn.classList.remove("hide");
}

const header = document.querySelector("[data-header]");

let lastScrollPos = 0;

const hideHeader = function () {
    // Hides header if not active
    if (!heroSlider || !heroSlider.classList.contains("active")) {
        const isScrollDown = lastScrollPos < window.scrollY;
        if (isScrollDown && window.scrollY > 50) {
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
        }
    }
    lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("active");
        hideHeader();
    } else {
        header.classList.remove("active");
    }
});

const navLinks = document.querySelectorAll(".navbar-link");

navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault(); 

        // Closes menu
        navbar.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("nav-active");

        // Slides to section
        const targetId = link.getAttribute("href").slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const totalItems = document.querySelectorAll(".carousel-item").length;

  let currentIndex = 0;

  const showSlide = (index) => {
    if (index < 0) {
      currentIndex = totalItems - 1; 
    } else if (index >= totalItems) {
      currentIndex = 0; 
    }
  
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  
  prevBtn.addEventListener("click", () => {
    currentIndex--;
    showSlide(currentIndex);
  });


  nextBtn.addEventListener("click", () => {
    currentIndex++;
    showSlide(currentIndex);
  });

  // Show image
  showSlide(currentIndex);
});


/** SCROLL */
overlay.addEventListener("click", () => {
    navbar.classList.remove("active");
    document.body.classList.remove("nav-active");
});

//Scroll to Home page
document.addEventListener("DOMContentLoaded", () => {
  const navbarInicio = document.querySelector('.navbar-link[href="#inicio"]'); 


  const navigateToInicio = (e) => {
    e.preventDefault(); 
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };


  if (navbarInicio) {
    navbarInicio.addEventListener("click", navigateToInicio);
  }
});
document.getElementById("reservationForm").addEventListener("submit", async function (e) {
    e.preventDefault(); 

    const formData = new FormData(this);

    
    const formBody = new URLSearchParams(formData);

    try {
        const response = await fetch(this.action, {
            method: this.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", 
            },
            body: formBody,
        });

        if (response.ok) {
            const message = await response.text();
            alert("Reserva guardada con éxito: " + message);
        } else {
            alert("Error al realizar la reserva.");
        }
    } catch (error) {
        console.error("Error en el envío del formulario:", error);
        alert("No se pudo conectar con el servidor.");
    }
});
