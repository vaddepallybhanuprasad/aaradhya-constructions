const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const projectTiles = document.querySelectorAll(".project-tile");

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  header.classList.toggle("menu-active", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName !== "A") return;
  nav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  header.classList.remove("menu-active");
  toggle.setAttribute("aria-expanded", "false");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = [
    "Hi, I am interested in your construction services. Please get in touch.",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Inquiry: ${data.get("type")}`,
    `Message: ${data.get("message")}`,
  ].join("\n");

  const url = `https://wa.me/918801679999?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
  formNote.textContent = "WhatsApp has opened with your inquiry details.";
});

const openLightbox = (tile) => {
  const image = tile.querySelector("img");
  const caption = tile.querySelector("figcaption");
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption ? caption.textContent : "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
};

const closeLightbox = () => {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.classList.remove("menu-open");
};

projectTiles.forEach((tile) => {
  tile.addEventListener("click", () => openLightbox(tile));
  tile.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(tile);
    }
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});
