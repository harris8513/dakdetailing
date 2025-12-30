(function () {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // Year
  $("#year").textContent = String(new Date().getFullYear());

  // Mobile nav
  const navToggle = $("#navToggle");
  const navList = $("#navList");
  navToggle?.addEventListener("click", () => {
    const open = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navList?.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Theme toggle
  const themeToggle = $("#themeToggle");
  const themeIcon = $("#themeIcon");

  function setTheme(mode) {
    if (mode === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      if (themeIcon) themeIcon.textContent = "☀️";
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (themeIcon) themeIcon.textContent = "🌙";
    }
    localStorage.setItem("dak_theme", mode);
  }

  const savedTheme = localStorage.getItem("dak_theme");
  if (savedTheme) setTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    setTheme(isLight ? "dark" : "light");
  });

  // Estimate calculator
  const estBtn = $("#estBtn");
  const estVehicle = $("#estVehicle");
  const estCondition = $("#estCondition");
  const estPackage = $("#estPackage");
  const estInterior = $("#estInterior");
  const estimatePrice = $("#estimatePrice");
  const estimateNote = $("#estimateNote");

  // Base pricing model (editable)
  const base = {
    oneStep: { sedan: 699, suv: 799, large: 899 },
    twoStep: { sedan: 1399, suv: 1599, large: 1799 },
    coat: { sedan: 2499, suv: 2799, large: 3199 }
  };

  const conditionMult = {
    light: 1.0,
    moderate: 1.08,
    heavy: 1.18
  };

  function money(n) {
    return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  }

  estBtn?.addEventListener("click", () => {
    const v = estVehicle.value;
    const c = estCondition.value;
    const p = estPackage.value;

    let mid = base[p][v] * conditionMult[c];
    let low = mid * 0.92;
    let high = mid * 1.10;

    if (estInterior.checked) {
      low += 249;
      high += 299;
    }

    estimatePrice.textContent = `${money(Math.round(low))} – ${money(Math.round(high))}`;
    estimateNote.textContent = "Final quote confirmed after quick condition check and scheduling details.";
  });

  // Gallery lightbox (placeholder)
  const lightbox = $("#lightbox");
  const lightboxBackdrop = $("#lightboxBackdrop");
  const lightboxClose = $("#lightboxClose");
  const lightboxTitle = $("#lightboxTitle");
  const lightboxPh = $("#lightboxPh");

  function openLightbox(title) {
    lightboxTitle.textContent = title;
    lightboxPh.textContent = "Replace this placeholder with your real photo later";
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  $$("#galleryGrid .gitem").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(btn.getAttribute("data-title") || "Preview"));
  });
  lightboxBackdrop?.addEventListener("click", closeLightbox);
  lightboxClose?.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.getAttribute("aria-hidden") === "false") closeLightbox();
  });

  // FAQ accordion
  $$("#faqList .faq__q").forEach((q) => {
    q.addEventListener("click", () => {
      const expanded = q.getAttribute("aria-expanded") === "true";
      // close all
      $$("#faqList .faq__q").forEach((other) => {
        other.setAttribute("aria-expanded", "false");
        other.querySelector(".faq__icon").textContent = "+";
        other.nextElementSibling.style.display = "none";
      });
      // open this if it was closed
      if (!expanded) {
        q.setAttribute("aria-expanded", "true");
        q.querySelector(".faq__icon").textContent = "–";
        q.nextElementSibling.style.display = "block";
      }
    });
  });

  // Booking form -> mailto (no backend)
  // IMPORTANT: Replace with your real email.
  const BUSINESS_EMAIL = "dakdetail@gmail.com";

  const quoteForm = $("#quoteForm");
  const copySummaryBtn = $("#copySummaryBtn");

  function buildSummary() {
    const name = $("#qName").value.trim();
    const phone = $("#qPhone").value.trim();
    const vehicle = $("#qVehicle").value.trim();
    const city = $("#qCity").value.trim();
    const service = $("#qService").value;
    const notes = $("#qNotes").value.trim();

    const lines = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Vehicle(s): ${vehicle}`,
      `City: ${city}`,
      `Service: ${service}`,
      `Notes: ${notes || "(none)"}`
    ];
    return lines.join("\n");
  }

  quoteForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const summary = buildSummary();

    const subject = encodeURIComponent("DAK Detailing Quote Request");
    const body = encodeURIComponent(
      `Hi DAK Detailing,\n\nI’d like a quote and availability.\n\n${summary}\n\nThanks!`
    );

    const mailto = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });

  copySummaryBtn?.addEventListener("click", async () => {
    const summary = buildSummary();
    try {
      await navigator.clipboard.writeText(summary);
      copySummaryBtn.textContent = "Copied ✓";
      setTimeout(() => (copySummaryBtn.textContent = "Copy Summary"), 1200);
    } catch {
      alert("Copy failed. Select the text manually after submitting.");
    }
  });

  // Social links (edit these handles)
  const IG_HANDLE = "dakdetailing";
  const TT_HANDLE = "dakdetailing";

  const igLink = $("#igLink");
  const ttLink = $("#ttLink");

  if (igLink) {
    igLink.textContent = `@${IG_HANDLE}`;
    igLink.href = `https://instagram.com/${IG_HANDLE}`;
    igLink.target = "_blank";
    igLink.rel = "noopener";
  }

  if (ttLink) {
    ttLink.textContent = `@${TT_HANDLE}`;
    ttLink.href = `https://www.tiktok.com/@${TT_HANDLE}`;
    ttLink.target = "_blank";
    ttLink.rel = "noopener";
  }

  // Review link button (replace with your real Google review link)
  $("#reviewLinkBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Replace the review link in main.js (look for 'Open Review Link') with your GBP review URL.");
  });
})();