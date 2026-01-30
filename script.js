// ===== Menu mobile =====
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // cerrar al tocar link (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.15 });

revealEls.forEach(el => io.observe(el));

// ===== Parallax suave para HERO =====
const parallaxEls = document.querySelectorAll("[data-parallax]");
function onScrollParallax() {
  const y = window.scrollY || 0;
  parallaxEls.forEach(el => {
    const strength = Number(el.getAttribute("data-parallax")) || 0.2;
    el.style.transform = `translateY(${y * strength}px) scale(1.06)`;
  });
}
window.addEventListener("scroll", onScrollParallax, { passive: true });
onScrollParallax();

// ===== Modal reseñas =====
const modal = document.getElementById("reviewModal");
const modalImg = document.getElementById("reviewModalImg");

function openReview(src, alt){
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  modalImg.src = src;
  modalImg.alt = alt || "Reseña ampliada";
  document.body.style.overflow = "hidden";
}

function closeReview(){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".reviewShot").forEach(btn => {
  btn.addEventListener("click", () => {
    const src = btn.dataset.full || btn.querySelector("img")?.getAttribute("src");
    const alt = btn.querySelector("img")?.getAttribute("alt") || "";
    openReview(src, alt);
  });
});

modal.querySelectorAll("[data-close]").forEach(el => {
  el.addEventListener("click", closeReview);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeReview();
});

const reviews = document.querySelectorAll('.review-img');
const prevBtn = document.querySelector('.review-arrow.left');
const nextBtn = document.querySelector('.review-arrow.right');

let currentReview = 0;

function showReview(index) {
  reviews.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

prevBtn.addEventListener('click', () => {
  currentReview = (currentReview - 1 + reviews.length) % reviews.length;
  showReview(currentReview);
});

nextBtn.addEventListener('click', () => {
  currentReview = (currentReview + 1) % reviews.length;
  showReview(currentReview);
});

document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href="#top"]');
  if (!a) return;

  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", "#top");
});