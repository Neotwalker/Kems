(function () {
  'use strict';

  var header = document.querySelector('[data-header]');
  var burger = document.querySelector('[data-burger]');
  var nav = document.querySelector('[data-nav]');
  var modal = document.querySelector('[data-modal]');
  var openModalButtons = document.querySelectorAll('[data-open-modal]');
  var closeModalButtons = document.querySelectorAll('[data-close-modal]');
  var lastFocusedElement = null;

  function toggleHeaderState() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  function closeMenu() {
    if (!burger || !nav) return;
    burger.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }

  function openMenu() {
    if (!burger || !nav) return;
    burger.classList.add('is-active');
    burger.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') closeMenu();
    });

    document.addEventListener('click', function (event) {
      var isInsideHeader = header && header.contains(event.target);
      if (!isInsideHeader) closeMenu();
    });
  }

  function openModal() {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    var firstInput = modal.querySelector('input, textarea, select, button');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  openModalButtons.forEach(function (button) {
    button.addEventListener('click', openModal);
  });

  closeModalButtons.forEach(function (button) {
    button.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu();
      closeModal();
    }
  });

  var accordionItems = document.querySelectorAll('.accordion__item');
  accordionItems.forEach(function (item) {
    var button = item.querySelector('button');
    var content = item.querySelector('.accordion__content');
    if (!button || !content) return;

    button.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      accordionItems.forEach(function (otherItem) {
        var otherButton = otherItem.querySelector('button');
        var otherContent = otherItem.querySelector('.accordion__content');
        otherItem.classList.remove('is-open');
        if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
        if (otherContent) otherContent.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  function initForms() {
    var forms = document.querySelectorAll('[data-form]');
    forms.forEach(function (form) {
      var consent = form.querySelector('[data-consent]');
      var submit = form.querySelector('[data-submit]');
      var note = form.querySelector('[data-form-note]');

      function updateSubmitState() {
        if (!consent || !submit) return;
        submit.disabled = !consent.checked;
        if (note && !consent.checked) {
          note.textContent = 'Кнопка станет активной после согласия.';
          note.classList.remove('is-success');
        }
      }

      if (consent) {
        consent.addEventListener('change', updateSubmitState);
        updateSubmitState();
      }

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (note) {
          note.textContent = 'Заявка готова к отправке. Подключите обработчик формы в README.';
          note.classList.add('is-success');
        }
        form.reset();
        updateSubmitState();
      });
    });
  }

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    items.forEach(function (item) { observer.observe(item); });
  }

  window.addEventListener('scroll', toggleHeaderState, { passive: true });
  toggleHeaderState();
  initForms();
  initReveal();
})();
