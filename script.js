// Cyber Tattoo Leads — interactive JavaScript
// Handles mobile navigation, accordion FAQ and form submission.

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav ul');
  const header = document.querySelector('.header');

  navToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
    header.classList.toggle('active');
  });

  // Close navigation when clicking a link (on mobile)
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('show')) {
        navList.classList.remove('show');
        header.classList.remove('active');
      }
    });
  });

  // Accordion FAQ
  const questions = document.querySelectorAll('.accordion-question');
  questions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isOpen = item.classList.contains('active');
      // Close all items
      document.querySelectorAll('.accordion-item.active').forEach(el => {
        if (el !== item) el.classList.remove('active');
      });
      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });

  // Scroll to top link
  const upLink = document.querySelector('.footer .up');
  if (upLink) {
    upLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Contact form submission (mock)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const agreement = form.agreement.checked;
      if (!name || !phone || !agreement) {
        alert('Пожалуйста, заполните обязательные поля и подтвердите согласие на обработку данных.');
        return;
      }
      alert(`Спасибо, ${name}! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.`);
      form.reset();
    });
  }
});