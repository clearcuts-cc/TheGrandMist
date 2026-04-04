/* ──────────────────────────────────────────
   Sticky nav — scroll detection + hamburger
────────────────────────────────────────── */
(function initNav() {
  const siteNav = document.getElementById("siteNav");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (!siteNav) return;

  function onScroll() {
    if (window.scrollY > 20) {
      siteNav.classList.add("scrolled");
    } else {
      siteNav.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();

/* ──────────────────────────────────────────
   Room Detail Modal
────────────────────────────────────────── */
(function initRoomModal() {
  const overlay = document.getElementById("roomModal");
  const modalContent = document.getElementById("roomModalContent");
  const closeBtn = document.getElementById("modalClose");

  if (!overlay || !modalContent) return;

  const WA_NUMBER = "919944033765";

  // WhatsApp icon path (reusable)
  const WA_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4a10 10 0 0 0-16.9 9.3L2 22l8.9-1.1A10 10 0 1 0 20 4Zm-8 15a8 8 0 0 1-4.1-1.1l-.3-.2-3.3.4.4-3.2-.2-.3A8 8 0 1 1 12 19Zm4.6-6.2c-.2-.1-1.3-.6-1.5-.7s-.3-.1-.5.1-.6.7-.8.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4 0-.1-.5-1.2-.7-1.7-.2-.4-.3-.4-.5-.4h-.4c-.1 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.1 1 2.3c.1.2 1.6 2.4 3.9 3.4.6.3 1 .5 1.3.6.6.2 1.1.2 1.5.1.5-.1 1.3-.6 1.5-1.1.2-.5.2-1 .1-1.1-.1 0-.2-.1-.4-.2Z"/></svg>`;

  function buildModal(room) {
    const facilitiesHTML = room.facilities
      .map((f) => `<div class="facility-pill">${f}</div>`)
      .join("");

    const waMsg = encodeURIComponent(
      `Hi, I'd like to book the ${room.name} (${room.price}/night) at The Grand Mist. Please share availability.`
    );

    return `
      <button class="modal-close" id="modalClose" aria-label="Close">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/></svg>
      </button>

      <div class="modal-hero-slider">
        <div class="modal-slider-track">
          <img class="modal-hero-img" src="${room.img}" alt="${room.name}" width="800" height="600" loading="lazy" decoding="async" />
          ${(room.extraImgs || [])
        .map(
          (img) =>
            `<img class="modal-hero-img" src="${img}" alt="${room.name} details" width="800" height="600" loading="lazy" decoding="async" />`
        )
        .join("")}
        </div>
        ${(room.extraImgs && room.extraImgs.length > 0) ? `
        <div class="modal-slider-dots">
          <span class="modal-dot active" data-index="0"></span>
          ${room.extraImgs.map((_, i) => `<span class="modal-dot" data-index="${i + 1}"></span>`).join("")}
        </div>
        ` : ""}
      </div>

      <div class="modal-body">
        <div class="modal-top">
          <div>
            <h2 class="modal-title">${room.name}</h2>
            <div class="modal-meta">
              <span class="modal-meta-item">
                <svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/></svg>
                ${room.view}
              </span>
              <span class="modal-meta-item">
                <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05C16.19 13.89 17 15.02 17 16.5V19h5v-2.5C22 14.17 17.33 13 16 13Z"/></svg>
                ${room.guests}
              </span>
            </div>
          </div>
          <div class="modal-price-box">
            <div class="modal-price">${room.price}</div>
            <div class="modal-price-label">per night</div>
          </div>
        </div>

        <p class="modal-desc">${room.desc}</p>

        <p class="modal-facilities-heading">Room Facilities</p>
        <div class="modal-facilities">${facilitiesHTML}</div>

        <div class="modal-cta-row">
          <a class="modal-wa-btn" href="https://wa.me/${WA_NUMBER}?text=${waMsg}" target="_blank" rel="noopener noreferrer">
            ${WA_SVG} Book This Room on WhatsApp
          </a>
          <button class="modal-dismiss" id="modalDismiss">Maybe later</button>
        </div>
      </div>
    `;
  }

  function openModal(room) {
    modalContent.innerHTML = buildModal(room);
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";

    // Slider Logic
    const track = modalContent.querySelector(".modal-slider-track");
    const dots = modalContent.querySelectorAll(".modal-dot");
    const imgCount = (room.extraImgs ? room.extraImgs.length : 0) + 1;
    let currentIndex = 0;
    let timer = null;

    function goTo(idx) {
      currentIndex = idx;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }

    if (imgCount > 1) {
      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          stopSlide();
          goTo(parseInt(dot.dataset.index));
        });
      });

      function startSlide() {
        timer = setInterval(() => {
          goTo((currentIndex + 1) % imgCount);
        }, 4000);
      }
      function stopSlide() { clearInterval(timer); }
      startSlide();
    }

    // Re-bind close after innerHTML rebuild
    const closeHandler = () => {
      if (imgCount > 1) clearInterval(timer);
      closeModal();
    };
    modalContent.querySelector("#modalClose").addEventListener("click", closeHandler);
    modalContent.querySelector("#modalDismiss").addEventListener("click", closeHandler);
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Click on overlay backdrop (not on modal card itself)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
  });

  // Wire up room cards
  document.querySelectorAll(".room-card[data-room]").forEach((card) => {
    const open = () => {
      try {
        const room = JSON.parse(card.dataset.room);
        openModal(room);
      } catch (err) {
        console.error("Room data parse error:", err);
      }
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });
})();

/* ──────────────────────────────────────────
   Reviews infinite marquee
   – Clones all cards so the CSS translateX(-50%)
     loop is truly seamless.
   – Supports drag-to-scroll with pause/resume.
────────────────────────────────────────── */
(function initReviewsMarquee() {
  const track = document.getElementById("reviewsTrack");
  if (!track) return;

  // Clone all cards and append them so the track is 2× wide
  const origCards = Array.from(track.children);
  origCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  // ── Drag-to-scroll ──────────────────────
  const ticker = track.parentElement;
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  ticker.addEventListener("mousedown", (e) => {
    isDown = true;
    ticker.style.cursor = "grabbing";
    startX = e.pageX - ticker.offsetLeft;
    scrollLeft = ticker.scrollLeft;
    // Pause CSS animation while dragging
    track.style.animationPlayState = "paused";
  });

  window.addEventListener("mouseup", () => {
    if (!isDown) return;
    isDown = false;
    ticker.style.cursor = "grab";
    track.style.animationPlayState = "";
  });

  ticker.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - ticker.offsetLeft;
    const walk = (x - startX) * 1.5;
    ticker.scrollLeft = scrollLeft - walk;
  });

  // Touch support for mobile drag
  ticker.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = ticker.scrollLeft;
    track.style.animationPlayState = "paused";
  }, { passive: true });

  ticker.addEventListener("touchend", () => {
    track.style.animationPlayState = "";
  });

  ticker.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;
    ticker.scrollLeft = scrollLeft - walk;
  }, { passive: true });
})();

/* ──────────────────────────────────────────
   Video Reels Carousel
────────────────────────────────────────── */
(function initReelsCarousel() {
  const stage = document.getElementById("reelsStage");
  const dotsWrap = document.getElementById("reelsDots");
  const prevBtn = document.getElementById("reelPrev");
  const nextBtn = document.getElementById("reelNext");
  const muteBtn = document.getElementById("reelMute");

  // Video Overlay elements
  const videoOverlay = document.getElementById("videoOverlay");
  const overlayVideo = document.getElementById("overlayVideo");
  const overlayIframe = document.getElementById("overlayIframe");
  const videoClose = document.getElementById("videoClose");

  const galleryCards = Array.from(document.querySelectorAll(".video-card"));

  // --- Video Lightbox Logic ---
  function openVideoLightbox(url, title = "The Grand Mist", desc = "", isLandscape = false) {
    if (!videoOverlay || !overlayVideo || !overlayIframe) return;

    // Reset visibility
    overlayVideo.style.display = "none";
    overlayVideo.src = "";
    overlayIframe.style.display = "none";
    overlayIframe.src = "";

    const isDrive = url.includes("drive.google.com");

    if (isDrive) {
      overlayIframe.style.display = "block";
      overlayIframe.src = url;
    } else {
      overlayVideo.style.display = "block";
      overlayVideo.src = url;
      overlayVideo.load();
      overlayVideo.play().catch(() => { });
    }

    // Update text
    const adTitle = videoOverlay.querySelector(".ad-title");
    const adDesc = videoOverlay.querySelector(".ad-desc");
    if (adTitle) adTitle.innerText = title;
    if (adDesc) adDesc.innerText = desc;

    // Toggle landscape mode
    const inner = videoOverlay.querySelector(".video-overlay-inner");
    if (inner) inner.classList.toggle("landscape", isLandscape);

    videoOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeVideoLightbox() {
    if (!videoOverlay) return;
    videoOverlay.classList.remove("open");
    if (overlayVideo) {
      overlayVideo.pause();
      overlayVideo.src = "";
    }
    if (overlayIframe) overlayIframe.src = "";
    document.body.style.overflow = "";
  }

  if (videoClose) videoClose.addEventListener("click", closeVideoLightbox);
  if (videoOverlay) {
    videoOverlay.addEventListener("click", (e) => {
      if (e.target === videoOverlay) closeVideoLightbox();
    });
  }

  // Gallery Card Clicks
  galleryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const videoUrl = card.getAttribute("data-video");
      if (videoUrl) {
        const title = card.querySelector("h3")?.innerText || "The Grand Mist";
        const desc = card.querySelector("p")?.innerText || "Experience nature's beauty.";
        openVideoLightbox(videoUrl, title, desc, true); // true for landscape
      }
    });
  });

  if (!stage) return;

  const cards = Array.from(stage.querySelectorAll(".reel-card"));
  const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll(".reel-dot")) : [];
  const total = cards.length;
  let current = 2;
  let autoTimer = null;
  let isMuted = true;

  function render() {
    cards.forEach((card, i) => {
      const pos = i - current;
      if (Math.abs(pos) > 2) {
        card.removeAttribute("data-pos");
        card.classList.remove("active");
      } else {
        card.dataset.pos = pos;
        card.classList.toggle("active", pos === 0);
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
      dot.setAttribute("aria-selected", String(i === current));
    });
  }

  // Bind play button clicks to open Lightbox (Pre-check if cards exist)
  if (cards && cards.length > 0) {
    cards.forEach((card) => {
      const playBtn = card.querySelector(".reel-play-btn");
      if (playBtn) {
        playBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const videoUrl = card.dataset.video;
          if (videoUrl) {
            const title = card.querySelector("h3")?.innerText || "The Grand Mist";
            const desc = card.querySelector("p")?.innerText || "Enjoy the view.";
            openVideoLightbox(videoUrl, title, desc, false);
          }
        });
      }
    });
  }

  // --- Carousel Controls ---
  function goTo(index) {
    current = ((index % total) + total) % total;
    render();
  }

  function prev() { goTo(current - 1); }
  function next() { goTo(current + 1); }

  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { next(); resetAuto(); });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(Number(dot.dataset.dot));
      resetAuto();
    });
  });

  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      const pos = Number(card.dataset.pos);
      if (pos !== 0) {
        goTo(i);
        resetAuto();
      }
    });
  });

  // Mute toggle (Global for previews if added later)
  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      isMuted = !isMuted;
      const icon = muteBtn.querySelector("svg path");
      if (icon) {
        // Rough toggle for visual feedback
        muteBtn.classList.toggle("is-muted", isMuted);
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (videoOverlay && videoOverlay.classList.contains("open")) {
      if (e.key === "Escape") closeVideoLightbox();
      return;
    }
    const sec = document.getElementById("reels");
    if (!sec) return;
    const r = sec.getBoundingClientRect();
    if (r.top > window.innerHeight || r.bottom < 0) return;
    if (e.key === "ArrowLeft") { prev(); resetAuto(); }
    if (e.key === "ArrowRight") { next(); resetAuto(); }
  });

  let touchX = 0;
  stage.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); resetAuto(); }
  });

  function startAuto() {
    if (autoTimer) stopAuto();
    autoTimer = setInterval(() => next(), 5000);
  }
  function stopAuto() { clearInterval(autoTimer); }
  function resetAuto() { stopAuto(); startAuto(); }

  stage.addEventListener("mouseenter", stopAuto);
  stage.addEventListener("mouseleave", startAuto);

  render();
  startAuto();
})();

/* ──────────────────────────────────────────
   Experience Day/Night Background Slider
─ ───────────────────────────────────────── */
(function initExperienceSlider() {
  const container = document.getElementById("experienceSlider");
  const handle = document.getElementById("experienceHandle");
  const nightLayer = document.getElementById("nightLayer");

  if (!container || !handle || !nightLayer) return;

  let isDragging = false;

  function updateSlider(x) {
    const rect = container.getBoundingClientRect();
    let percent = ((x - rect.left) / rect.width) * 100;

    // Constrain 0-100
    percent = Math.max(0, Math.min(100, percent));

    // Update visuals
    handle.style.left = percent + "%";
    nightLayer.style.clipPath = `inset(0 0 0 ${percent}%)`;

    // Toggle icon state
    const sun = handle.querySelector(".sun-icon");
    const moon = handle.querySelector(".moon-icon");
    if (percent < 50) {
      if (sun) sun.style.opacity = "0";
      if (moon) moon.style.opacity = "1";
    } else {
      if (sun) sun.style.opacity = "1";
      if (moon) moon.style.opacity = "0";
    }
  }

  // Mouse Events
  handle.addEventListener("mousedown", (e) => {
    isDragging = true;
    document.body.style.cursor = "ew-resize";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.cursor = "";
  });

  // Touch Events (Mobile)
  handle.addEventListener("touchstart", (e) => {
    isDragging = true;
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  }, { passive: false });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });

  // Subtle hint animation after 1s to show it's interactive
  setTimeout(() => {
    handle.style.transition = "left 0.8s cubic-bezier(0.19, 1, 0.22, 1)";
    nightLayer.style.transition = "clip-path 0.8s cubic-bezier(0.19, 1, 0.22, 1)";

    updateSlider(handle.getBoundingClientRect().left - 20); // Peek left

    setTimeout(() => {
      updateSlider(handle.getBoundingClientRect().left + 20); // Back
      setTimeout(() => {
        handle.style.transition = "";
        nightLayer.style.transition = "";
      }, 800);
    }, 800);
  }, 1000);
})();

/**
 * ===== POLICY MODAL LOGIC =====
 */
(function() {
  const policyModal = document.getElementById("policyModal");
  const policyContent = document.getElementById("policyContent");
  const closePolicyBtn = document.getElementById("closePolicy");

  const policies = {
    privacy: `
      <h2>Privacy Policy</h2>
      <div class="policy-body">
        <p><strong>Data Collection</strong>: We collect your name, phone number, and stay dates for booking purposes.</p>
        <p><strong>Data Usage</strong>: Your information is used only to manage your reservation and improve our services.</p>
        <p><strong>Confidentiality</strong>: We do not share your private details with any third parties.</p>
        <p><strong>Your Rights</strong>: You can request to view or delete your data at any time after your stay.</p>
      </div>
    `,
    terms: `
      <h2>Terms of Stay</h2>
      <div class="policy-body">
        <p><strong>Timings</strong>: Standard Check-in is 12:00 PM and Check-out is 10:00 AM.</p>
        <p><strong>ID Proof</strong>: A valid government-issued ID is required for all guests at check-in.</p>
        <p><strong>Conduct</strong>: Smoking is restricted to outdoor areas only. Excessive noise is prohibited after 10:00 PM.</p>
        <p><strong>Property Care</strong>: Guests are responsible for any damages caused to resort property during their stay.</p>
        <p><strong>Power & Safety</strong>: Power backup is provided by UPS. <strong>Warning:</strong> High voltage appliances are strictly NOT allowed.</p>
      </div>
    `,
    cancellation: `
      <h2>Cancellation Policy</h2>
      <div class="policy-body">
        <p><strong>15+ Days</strong>: Full refund for cancellations made 15 days or more before arrival.</p>
        <p><strong>7-14 Days</strong>: 50% refund for cancellations made between 7 and 14 days before arrival.</p>
        <p><strong>Lower notice</strong>: No refund for cancellations made within 7 days of arrival.</p>
        <p><strong>Adjustments</strong>: Date changes are subject to availability and may involve a price difference.</p>
      </div>
    `
  };

  window.openPolicy = function(type) {
    if (!policyModal || !policyContent) return;
    
    const content = policies[type];
    if (content) {
      policyContent.innerHTML = content;
      policyModal.classList.add("open");
      policyModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Prevent scroll
    }
  };

  function closePolicyModal() {
    if (!policyModal) return;
    policyModal.classList.remove("open");
    policyModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Enable scroll
  }

  if (closePolicyBtn) {
    closePolicyBtn.addEventListener("click", closePolicyModal);
  }

  if (policyModal) {
    policyModal.addEventListener("click", (e) => {
      if (e.target === policyModal || e.target.classList.contains("policy-modal-overlay")) {
        closePolicyModal();
      }
    });
  }
})();
