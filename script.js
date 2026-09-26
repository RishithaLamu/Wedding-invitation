/* =====================================================
   OPENING
===================================================== */

const opening = document.getElementById("opening");
const enterInvitation = document.getElementById("enterInvitation");

function closeOpening() {
  opening.classList.add("hide");

  document.body.style.overflow = "";
}

enterInvitation.addEventListener("click", closeOpening);


/* =====================================================
   HEADER
===================================================== */

const siteHeader = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {

  if (window.scrollY > 40) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {

  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });

});


/* =====================================================
   COUNTDOWN
===================================================== */

const weddingDate = new Date("October 22, 2026 11:00:00").getTime();

function updateCountdown() {

  const now = new Date().getTime();

  const distance = weddingDate - now;

  if (distance <= 0) {

    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    return;
  }

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (distance / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (distance / 1000) % 60
  );

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================================
   GOOGLE CALENDAR
===================================================== */

const calendarButton = document.getElementById("calendarButton");

calendarButton.addEventListener("click", () => {

  const start = "20261022T053000Z";
  const end = "20261022T073000Z";

  const calendarUrl =
    "https://calendar.google.com/calendar/render" +
    "?action=TEMPLATE" +
    "&text=" + encodeURIComponent("Stephen & Swathi — Wedding") +
    "&dates=" + start + "/" + end +
    "&details=" + encodeURIComponent(
      "Holy Matrimony at 11:00 AM at Seventh-day Adventist Church, Nuzvid.\n\n" +
      "Reception at 12:30 PM onwards at Seventh-day Adventist Community Hall, Nuzvid."
    ) +
    "&location=" + encodeURIComponent(
      "Seventh-day Adventist Church, Nuzvid"
    );

  window.open(calendarUrl, "_blank");

});


/* =====================================================
   LOVE NOTES
===================================================== */

const loveForm = document.getElementById("loveForm");
const guestName = document.getElementById("guestName");
const guestMessage = document.getElementById("guestMessage");
const charCount = document.getElementById("charCount");
const loveNotes = document.getElementById("loveNotes");

let notes = JSON.parse(
  localStorage.getItem("stephenSwathiLoveNotes") || "[]"
);


/* CHARACTER COUNT */

guestMessage.addEventListener("input", () => {

  charCount.textContent =
    `${guestMessage.value.length} / 300`;

});


/* RENDER NOTES */

function renderNotes() {

  loveNotes.innerHTML = "";

  notes.forEach((note, index) => {

    const noteElement = document.createElement("div");

    noteElement.className = "love-note";

    noteElement.innerHTML = `
      <strong>${escapeHTML(note.name)}</strong>
      <p>${escapeHTML(note.message)}</p>
      <button
        type="button"
        class="delete-note"
        data-index="${index}"
      >
        Delete
      </button>
    `;

    loveNotes.appendChild(noteElement);

  });

}


/* SAVE NOTE */

loveForm.addEventListener("submit", event => {

  event.preventDefault();

  const name = guestName.value.trim();
  const message = guestMessage.value.trim();

  if (!name || !message) {
    return;
  }

  notes.unshift({
    name,
    message
  });

  localStorage.setItem(
    "stephenSwathiLoveNotes",
    JSON.stringify(notes)
  );

  guestName.value = "";
  guestMessage.value = "";

  charCount.textContent = "0 / 300";

  renderNotes();

});


/* DELETE NOTE */

loveNotes.addEventListener("click", event => {

  if (!event.target.classList.contains("delete-note")) {
    return;
  }

  const index = Number(event.target.dataset.index);

  notes.splice(index, 1);

  localStorage.setItem(
    "stephenSwathiLoveNotes",
    JSON.stringify(notes)
  );

  renderNotes();

});


/* ESCAPE USER TEXT */

function escapeHTML(value) {

  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* INITIAL NOTES */

renderNotes();

/* =====================================================
   HERO PHOTO — SMOOTH SCROLL PARALLAX
===================================================== */

const heroPhoto = document.querySelector(".hero-photo img");

let targetParallax = 0;
let currentParallax = 0;

function updateParallax() {
  const scrollY = window.scrollY;

  targetParallax = Math.min(scrollY * 0.16, 95);

  currentParallax +=
    (targetParallax - currentParallax) * 0.08;

  if (heroPhoto) {
    heroPhoto.style.transform =
      `translate3d(0, ${currentParallax}px, 0)`;
  }

  requestAnimationFrame(updateParallax);
}

updateParallax();