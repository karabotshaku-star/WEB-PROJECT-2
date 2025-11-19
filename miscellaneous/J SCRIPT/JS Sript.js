// Safely run after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger Menu (all pages)
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Date Stamp (Index page only)
  const dateElement = document.getElementById('datestamp');
  if (dateElement) {
    const today = new Date();
    dateElement.textContent = "Today's Date: " + today.toDateString();
  }

  // Timestamp Clock (About & Contact footers)
  const timeElement = document.getElementById('time');
  function displayTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (timeElement) timeElement.textContent = `${h}:${m}:${s}`;
  }
  setInterval(displayTime, 1000);
  displayTime();

  // Accordion (About page)
  const accordions = document.querySelectorAll('.accordion');
  if (accordions.length) {
    accordions.forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = btn.nextElementSibling;
        const isOpen = panel.style.display === 'block';
        panel.style.display = isOpen ? 'none' : 'block';
      });
    });
  }

  // Lightbox (About page gallery)
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const galleryImgs = document.querySelectorAll('.staff-img');
  if (lightbox && lightboxImg && galleryImgs.length) {
    galleryImgs.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
      });
    });
    lightbox.addEventListener('click', () => (lightbox.style.display = 'none'));
  }

  // Search Products (About page)
  const searchBar = document.getElementById('searchBar');
  const productCards = document.querySelectorAll('#productGallery .staff-member');
  function searchProducts() {
    if (!searchBar || !productCards.length) return;
    const input = searchBar.value.toLowerCase();
    productCards.forEach(card => {
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      card.style.display = name.includes(input) ? 'block' : 'none';
    });
  }
  if (searchBar) {
    searchBar.addEventListener('keyup', searchProducts);
  }

  // Contact Form Validation (Contact page)
  function validateForm(event) {
    const nameEl = document.getElementById('name');
    const surnameEl = document.getElementById('surname');
    const emailEl = document.getElementById('email');
    const enquiryEl = document.getElementById('enquiry');
    const messageEl = document.getElementById('message');
    const errorMessage = document.getElementById('errorMessage');

    if (!nameEl || !surnameEl || !emailEl || !enquiryEl || !messageEl || !errorMessage) return true;

    errorMessage.textContent = '';

    const name = nameEl.value.trim();
    const surname = surnameEl.value.trim();
    const email = emailEl.value.trim();
    const enquiry = enquiryEl.value;
    const message = messageEl.value.trim();

    if (!name || !surname || !email || !enquiry || !message) {
      errorMessage.textContent = 'All fields including enquiry type are required!';
      event.preventDefault();
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      errorMessage.textContent = 'Incorrect email format!';
      event.preventDefault();
      return false;
    }

    alert('Your enquiry was submitted successfully!');
    return true;
  }

  const contactForm = document.querySelector('form.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', validateForm);
  }
});
