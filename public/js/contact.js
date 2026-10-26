// MediRail Contact & FAQ Page Logic
document.addEventListener('DOMContentLoaded', () => {
  // Render FAQ Accordion
  function renderFaqs() {
    const container = document.getElementById('faqAccordionList');
    if (!container) return;

    container.innerHTML = FAQS.map((faq, index) => `
      <div class="faq-item ${index === 0 ? 'open' : ''}">
        <button class="faq-question-btn" type="button">
          <span>${faq.q}</span>
          <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="faq-answer">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.faq-question-btn').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
    });
  }

  // Handle Contact Form
  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Emergency query dispatched!');
    e.target.reset();
  });

  renderFaqs();
});
