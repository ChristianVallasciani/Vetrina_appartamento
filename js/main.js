/* ===================================================
   Casa Azzurra — JavaScript (multi-page)
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Navbar: hide on scroll down, show on scroll up ---------- */
  const navbar = document.getElementById("navbar");
  let lastScrollY = window.scrollY;
  const scrollThreshold = 300; // px prima di nascondere (circa altezza hero/prima immagine)

  const handleNavScroll = () => {
    const currentY = window.scrollY;

    if (currentY > scrollThreshold && currentY > lastScrollY) {
      // Scrolling giù e oltre la soglia → nascondi
      navbar.classList.add("nav-hidden");
    } else {
      // Scrolling su → mostra
      navbar.classList.remove("nav-hidden");
    }

    lastScrollY = currentY;
  };

  window.addEventListener("scroll", handleNavScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  /* ---------- Lightbox (solo pagine con galleria) ---------- */
  const lightbox = document.getElementById("lightbox");
  const galleryItems = [...document.querySelectorAll(".gallery-item img")];

  if (lightbox && galleryItems.length) {
    const lightboxImg = lightbox.querySelector(".lightbox-img");
    let currentIndex = 0;

    const openLightbox = (index) => {
      currentIndex = index;
      lightboxImg.src = galleryItems[currentIndex].src;
      lightboxImg.alt = galleryItems[currentIndex].alt;
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    const showPrev = () => {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      lightboxImg.src = galleryItems[currentIndex].src;
      lightboxImg.alt = galleryItems[currentIndex].alt;
    };

    const showNext = () => {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      lightboxImg.src = galleryItems[currentIndex].src;
      lightboxImg.alt = galleryItems[currentIndex].alt;
    };

    galleryItems.forEach((img, i) => {
      img.closest(".gallery-item").addEventListener("click", () => openLightbox(i));
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", showPrev);
    lightbox.querySelector(".lightbox-next").addEventListener("click", showNext);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    });
  }

  /* ---------- Contact form validation (solo pagine con form) ---------- */
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  if (form && feedback) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
      feedback.textContent = "";
      feedback.className = "form-feedback";

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const messaggio = form.messaggio.value.trim();
      let valid = true;

      if (!nome) {
        form.nome.classList.add("invalid");
        valid = false;
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        form.email.classList.add("invalid");
        valid = false;
      }

      if (!messaggio) {
        form.messaggio.classList.add("invalid");
        valid = false;
      }

      if (!valid) {
        feedback.textContent = "Per favore compila tutti i campi obbligatori.";
        feedback.classList.add("error");
        return;
      }

      // Simulate successful submission (replace with real backend call)
      feedback.textContent = "Grazie! Il tuo messaggio è stato inviato con successo.";
      feedback.classList.add("success");
      form.reset();
    });
  }

  /* ---------- Smooth reveal on scroll ---------- */
  const revealElements = document.querySelectorAll(
    ".advantage-card, .gallery-item, .contact-card, .preview-item"
  );

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      revealObserver.observe(el);
    });
  }
});
