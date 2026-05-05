/* ===================================================
   ሐበሻ MOTORS — script.js
   Handles: navbar, car data, filters, modal, counter animations, scroll reveal
   =================================================== */

// ─── CAR DATA ─────────────────────────────────────────────────────────────────
const CARS = [
  {
    id: 1,
    make: "Toyota",
    name: "Land Cruiser Prado",
    price: "4,200,000",
    currency: "ETB",
    year: 2023,
    fuel: "Diesel",
    km: "12,000 km",
    type: "suv",
    badge: "Hot",
    badgeClass: "hot",
    image: "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    make: "Toyota",
    name: "Corolla",
    price: "1,850,000",
    currency: "ETB",
    year: 2022,
    fuel: "Petrol",
    km: "28,500 km",
    type: "sedan",
    badge: "",
    badgeClass: "",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    make: "Hyundai",
    name: "Tucson",
    price: "2,600,000",
    currency: "ETB",
    year: 2023,
    fuel: "Petrol",
    km: "8,200 km",
    type: "suv",
    badge: "New",
    badgeClass: "new",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    make: "Nissan",
    name: "Navara",
    price: "2,950,000",
    currency: "ETB",
    year: 2022,
    fuel: "Diesel",
    km: "35,000 km",
    type: "pickup",
    badge: "",
    badgeClass: "",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    make: "BYD",
    name: "Atto 3",
    price: "2,200,000",
    currency: "ETB",
    year: 2024,
    fuel: "Electric",
    km: "5,000 km",
    type: "electric",
    badge: "New",
    badgeClass: "new",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    make: "Mitsubishi",
    name: "L200 Triton",
    price: "3,100,000",
    currency: "ETB",
    year: 2022,
    fuel: "Diesel",
    km: "22,000 km",
    type: "pickup",
    badge: "Sale",
    badgeClass: "sale",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    make: "Honda",
    name: "Civic",
    price: "1,700,000",
    currency: "ETB",
    year: 2021,
    fuel: "Petrol",
    km: "41,000 km",
    type: "sedan",
    badge: "",
    badgeClass: "",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    make: "Kia",
    name: "Sportage",
    price: "2,450,000",
    currency: "ETB",
    year: 2023,
    fuel: "Petrol",
    km: "14,000 km",
    type: "suv",
    badge: "",
    badgeClass: "",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    make: "BYD",
    name: "Tang EV",
    price: "3,800,000",
    currency: "ETB",
    year: 2024,
    fuel: "Electric",
    km: "3,200 km",
    type: "electric",
    badge: "New",
    badgeClass: "new",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=700&auto=format&fit=crop&q=80",
  },
];

// ─── DOM HELPERS ──────────────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ─── NAVBAR: scroll effect + mobile toggle ────────────────────────────────────
const navbar = $("#navbar");
const hamburger = $("#hamburger");
const navLinks = $("#navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ─── SMOOTH SCROLL helper ─────────────────────────────────────────────────────
function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── RENDER CARS ──────────────────────────────────────────────────────────────
function renderCars(filter = "all") {
  const grid = $("#carsGrid");
  const list = filter === "all" ? CARS : CARS.filter((c) => c.type === filter);

  if (list.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-muted);font-size:15px;padding:40px 0;">No vehicles found for this filter.</p>`;
    return;
  }

  grid.innerHTML = list
    .map(
      (car) => `
    <div class="car-card" data-id="${car.id}">
      ${
        car.badge
          ? `<div class="car-badge-wrap"><div class="car-badge ${car.badgeClass}">${car.badge}</div></div>`
          : ""
      }
      <div class="car-img-wrap">
        <img
          src="${car.image}"
          alt="${car.make} ${car.name}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format&fit=crop&q=80'"
        />
        <div class="car-img-gradient"></div>
      </div>
      <div class="car-info">
        <div class="car-make">${car.make}</div>
        <div class="car-name">${car.name}</div>
        <div class="car-specs">
          <div class="spec">📅 <strong>${car.year}</strong></div>
          <div class="spec">⛽ <strong>${car.fuel}</strong></div>
          <div class="spec">🛣️ <strong>${car.km}</strong></div>
        </div>
        <div class="car-footer">
          <div class="car-price">${car.price} <sub>${car.currency}</sub></div>
          <button class="card-btn enquire-btn" data-name="${car.make} ${car.name}">
            Enquire →
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Attach enquire button listeners
  $$(".enquire-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      openModal(name);
    });
  });
}

// ─── FILTER BUTTONS ───────────────────────────────────────────────────────────
$$(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderCars(btn.getAttribute("data-filter"));
  });
});

// ─── MODAL ────────────────────────────────────────────────────────────────────
const modalOverlay = $("#modalOverlay");

function openModal(carName = "") {
  const select = $("#carSelect");
  if (carName && select) {
    // Try to match a pre-selected option
    for (let opt of select.options) {
      if (opt.text.toLowerCase().includes(carName.toLowerCase().split(" ")[1] || "")) {
        select.value = opt.value;
        break;
      }
    }
  }
  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

// Close on overlay click
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close button
$("#modalClose").addEventListener("click", closeModal);

// Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Open modal from multiple CTAs
["navCta", "heroCta", "whyCta", "contactCta"].forEach((id) => {
  const el = $("#" + id);
  if (el) el.addEventListener("click", () => openModal());
});

// ─── FORM SUBMIT ──────────────────────────────────────────────────────────────
$("#formSubmit").addEventListener("click", () => {
  const fname = $("#fName").value.trim();
  const phone = $("#phone").value.trim();

  if (!fname || !phone) {
    // Simple validation shake
    ["fName", "phone"].forEach((id) => {
      const el = $("#" + id);
      if (!el.value.trim()) {
        el.style.borderColor = "var(--red)";
        el.style.animation = "none";
        setTimeout(() => {
          el.style.borderColor = "";
        }, 2000);
      }
    });
    return;
  }

  closeModal();
  showToast("✅ Booking confirmed! We'll call you soon.");

  // Reset form
  ["fName", "lName", "phone", "prefDate"].forEach((id) => {
    const el = $("#" + id);
    if (el) el.value = "";
  });
  $("#carSelect").selectedIndex = 0;
});

// ─── TOAST ────────────────────────────────────────────────────────────────────
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4500);
}

// ─── COUNTER ANIMATION ────────────────────────────────────────────────────────
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target >= 1000 ? (target / 1000).toFixed(0) + "K" : target;
      clearInterval(timer);
    } else {
      const val = Math.floor(start);
      el.textContent = val >= 1000 ? (val / 1000).toFixed(0) + "K" : val;
    }
  }, 16);
}

// Trigger counters when hero is visible
const counters = $$(".stat-num");
let countersDone = false;
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersDone) {
        countersDone = true;
        counters.forEach((el) => {
          const target = parseInt(el.getAttribute("data-target"), 10);
          animateCounter(el, target);
        });
      }
    });
  },
  { threshold: 0.5 }
);
if (counters.length) counterObserver.observe(counters[0]);

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

$$(".reveal").forEach((el) => revealObserver.observe(el));

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderCars("all");
});
