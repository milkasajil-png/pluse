/* ============================================
   PULSE — Shared scripts
   ============================================ */

// Default event catalogue (shared across pages)
const DEFAULT_EVENTS = [
  {
    id: "evt-001",
    title: "Campus Beats Festival",
    category: "Music",
    date: "2026-07-18",
    time: "4:00 PM",
    venue: "Main Amphitheatre, University Square",
    price: 1500,
    icon: "images/campus-beat.jpeg",
    desc: "An open-air showcase of student bands, DJs, and spoken word artists closing out the semester."
  },
  {
    id: "evt-002",
    title: "Founders & Coffee: Pitch Night",
    category: "Business",
    date: "2026-06-25",
    time: "6:00 PM",
    venue: "Innovation Hub, Block C",
    price: 0,
    icon: "images/businees.jpeg",
    desc: "Five early-stage student founders pitch to a panel of local investors. Free entry, refreshments included."
  },
  {
    id: "evt-003",
    title: "Inter-Faculty Football Final",
    category: "Sports",
    date: "2026-07-02",
    time: "2:30 PM",
    venue: "Sports Complex, Pitch A",
    price: 500,
    icon: "images/sport.jpeg",
    desc: "The championship match between Engineering and Sciences faculties. Tickets include a seat in the covered stand."
  },
  {
    id: "evt-004",
    title: "Tech Talks: AI in West Africa",
    category: "Tech",
    date: "2026-07-10",
    time: "10:00 AM",
    venue: "Auditorium B, Faculty of Computing",
    price: 1000,
    icon: "images/tech.jpeg",
    desc: "A half-day conference featuring talks from local AI practitioners on practical applications across industries."
  },
  {
    id: "evt-005",
    title: "Charity Art Auction & Exhibition",
    category: "Community",
    date: "2026-08-01",
    time: "5:00 PM",
    venue: "Art Gallery, Cultural Centre",
    price: 2000,
    icon: "images/art.jpg",
    desc: "An evening exhibition of student artwork with proceeds supporting the campus literacy outreach programme."
  },
  {
    id: "evt-006",
    title: "Wellness & Mindfulness Workshop",
    category: "Community",
    date: "2026-06-28",
    time: "9:00 AM",
    venue: "Student Centre, Room 204",
    price: 0,
    icon: "images/wellnes.webp",
    desc: "A free morning session on stress management and mindfulness practices for students ahead of exams."
  },
  {
    id: "evt-007",
    title: "Comedy Night Live",
    category: "Music",
    date: "2026-07-25",
    time: "7:30 PM",
    venue: "Multipurpose Hall",
    price: 1200,
    icon: "images/standup.jpeg",
    desc: "A night of stand-up comedy featuring student performers and a special guest comedian."
  },
  {
    id: "evt-008",
    title: "Basketball Showdown: Alumni vs Varsity",
    category: "Sports",
    date: "2026-08-08",
    time: "3:00 PM",
    venue: "Indoor Sports Hall",
    price: 800,
    icon: "images/basketball.jpeg",
    desc: "Alumni return to take on the current varsity team in a friendly but fiercely competitive match."
  }
];

const EVENTS_STORAGE_KEY = "pulse-events";
const TEAM_IMAGE_PATHS = new Set([
  "images/sajil.jpeg",
  "images/talatu.jpeg",
  "images/safiya.jpeg"
]);

function syncDefaultEventImages(events) {
  return events.map(event => {
    const defaultEvent = DEFAULT_EVENTS.find(item => item.id === event.id);
    const shouldUseLocalImage =
      defaultEvent &&
      (!event.icon ||
        event.icon.includes("images.unsplash.com") ||
        TEAM_IMAGE_PATHS.has(event.icon));

    return {
      ...event,
      icon: shouldUseLocalImage ? defaultEvent.icon : event.icon,
      active: event.active !== false
    };
  });
}

function getStoredEvents() {
  try {
    const stored = JSON.parse(localStorage.getItem(EVENTS_STORAGE_KEY));
    if (!Array.isArray(stored)) return null;
    return syncDefaultEventImages(stored);
  } catch (error) {
    return null;
  }
}

let EVENTS = getStoredEvents() ||
  DEFAULT_EVENTS.map(event => ({ ...event, active: true }));

function saveEvents() {
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(EVENTS));
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatNaira(amount) {
  if (amount === 0) return "FREE";
  return "₦" + amount.toLocaleString("en-NG");
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/* ============================================
   Mobile nav toggle
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
  }
});

/* ============================================
   Ticket purchase modal
   ============================================ */
let currentEvent = null;
let currentQty = 1;

function openTicketModal(eventId) {
  currentEvent = EVENTS.find(e => e.id === eventId && e.active !== false);
  if (!currentEvent) return;
  currentQty = 1;

  const overlay = document.getElementById("ticket-modal");
  document.getElementById("modal-event-title").textContent = currentEvent.title;
  document.getElementById("modal-event-sub").textContent =
    `${formatDate(currentEvent.date)} · ${currentEvent.time} · ${currentEvent.venue}`;
  document.getElementById("modal-unit-price").textContent = formatNaira(currentEvent.price);

  document.getElementById("qty-value").textContent = currentQty;
  updateTotal();

  document.getElementById("modal-form").style.display = "block";
  document.getElementById("modal-confirm").classList.remove("show");

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";

  const nameInput = document.getElementById("buyer-name");
  if (nameInput) setTimeout(() => nameInput.focus(), 50);
}

function closeTicketModal() {
  document.getElementById("ticket-modal").classList.remove("open");
  document.body.style.overflow = "";
}

function changeQty(delta) {
  currentQty = Math.max(1, Math.min(10, currentQty + delta));
  document.getElementById("qty-value").textContent = currentQty;
  updateTotal();
}

function updateTotal() {
  if (!currentEvent) return;
  const total = currentEvent.price * currentQty;
  document.getElementById("qty-total-amount").textContent = formatNaira(total);
}

function submitTicketForm(e) {
  e.preventDefault();
  const name = document.getElementById("buyer-name").value.trim();
  const email = document.getElementById("buyer-email").value.trim();

  let valid = true;
  if (name === "") {
    document.getElementById("buyer-name-field").classList.add("invalid");
    valid = false;
  } else {
    document.getElementById("buyer-name-field").classList.remove("invalid");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("buyer-email-field").classList.add("invalid");
    valid = false;
  } else {
    document.getElementById("buyer-email-field").classList.remove("invalid");
  }

  if (!valid) return;

  const ref = "PLS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  document.getElementById("confirm-ref").textContent = "Booking reference: " + ref;
  document.getElementById("confirm-event-name").textContent = currentEvent.title;

  document.getElementById("modal-form").style.display = "none";
  document.getElementById("modal-confirm").classList.add("show");
}

/* Close modal on overlay click or Escape */
document.addEventListener("click", (e) => {
  const overlay = document.getElementById("ticket-modal");
  if (overlay && e.target === overlay) closeTicketModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const overlay = document.getElementById("ticket-modal");
    if (overlay && overlay.classList.contains("open")) closeTicketModal();
  }
});
