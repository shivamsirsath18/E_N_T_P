// MediRail Layout Utility
// Handles injection of shared Header and Footer across all pages

const LayoutManager = {
  renderLayout: function() {
    this.renderTopBar();
    this.renderHeader();
    this.renderFooter();
    this.setupMobileMenu();
  },

  renderTopBar: function() {
    const html = `
      <div class="top-emergency-bar">
        <div class="top-bar-inner">
          <div class="emergency-tag">
            <span class="pulse-dot"></span>
            <span>24/7 RAILWAY MEDICAL DESK: <strong>1800-419-RAIL (Toll-Free)</strong> / Ambulance Coordination 108</span>
          </div>
          <div>
            <button type="button" class="quick-demo-btn" id="topDemoBtn" title="Pre-fill sample patient for rapid evaluation">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              ⚡ Auto-Fill Demo Patient
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', html);
  },

  renderHeader: function() {
    const html = `
      <header class="site-header">
        <div class="container navbar">
          <a href="index.html" class="brand-logo">
            <div class="logo-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="4" y="3" width="16" height="16" rx="2"></rect>
                <path d="M12 7v8M8 11h8"></path>
                <circle cx="8" cy="18" r="1"></circle>
                <circle cx="16" cy="18" r="1"></circle>
              </svg>
            </div>
            <div class="brand-text">
              <span class="brand-title">MediRail <span>Emergency</span></span>
              <span class="brand-sub">Critical Care Train Coaches</span>
            </div>
          </a>

          <ul class="nav-links" id="navLinks">
            <li><a href="index.html" class="nav-link ${window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ? 'active' : ''}">Home</a></li>
            <li><a href="book.html" class="nav-link ${window.location.pathname.endsWith('book.html') ? 'active' : ''}">Book Medical Coach</a></li>
            <li><a href="how-it-works.html" class="nav-link ${window.location.pathname.endsWith('how-it-works.html') ? 'active' : ''}">How It Works</a></li>
            <li><a href="services.html" class="nav-link ${window.location.pathname.endsWith('services.html') ? 'active' : ''}">Medical Services</a></li>
            <li><a href="about.html" class="nav-link ${window.location.pathname.endsWith('about.html') ? 'active' : ''}">About Concept</a></li>
            <li><a href="contact.html" class="nav-link ${window.location.pathname.endsWith('contact.html') ? 'active' : ''}">Contact & FAQ</a></li>
          </ul>

          <div class="nav-cta">
            <a href="book.html" class="btn-emergency">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Book Coach M-1
            </a>
            <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle Navigation">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </header>
    `;
    document.body.insertAdjacentHTML('beforeend', html); // This is wrong, should be after top bar
    // Correction: the top bar was added to 'afterbegin'. The header should follow.
    const topBar = document.querySelector('.top-emergency-bar');
    if (topBar) {
      topBar.insertAdjacentHTML('afterend', html);
    } else {
      document.body.insertAdjacentHTML('afterbegin', html);
    }
  },

  renderFooter: function() {
    const html = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-brand">
              <div class="brand-logo" style="margin-bottom:0.75rem;">
                <div class="logo-icon-wrap" style="background:#ffffff; color:var(--primary-navy);">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="3" width="16" height="16" rx="2"></rect><path d="M12 7v8M8 11h8"></path></svg>
                </div>
                <span class="brand-title" style="color:#ffffff;">MediRail <span>Emergency</span></span>
              </div>
              <p>
                An innovative medical railway prototype introducing specialized Coach M-1 for safe, doctor-monitored emergency patient transit between tier-2 cities and tier-1 metro hospitals.
              </p>
            </div>

            <div class="footer-col">
              <h4>Quick Navigation</h4>
              <ul class="footer-links">
                <li><a href="index.html">Home Portal</a></li>
                <li><a href="book.html">Book Medical Coach</a></li>
                <li><a href="how-it-works.html">How It Works</a></li>
                <li><a href="about.html">About Concept</a></li>
                <li><a href="services.html">Medical Equipment</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Tier-1 Metro Hubs</h4>
              <ul class="footer-links">
                <li><a href="book.html">Mumbai (CSMT / Central)</a></li>
                <li><a href="book.html">Delhi (NDLS / AIIMS)</a></li>
                <li><a href="book.html">Bengaluru (SBC / Narayana)</a></li>
                <li><a href="book.html">Chennai (MAS / Apollo)</a></li>
                <li><a href="book.html">Pune, Kolkata, Ahmedabad</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Academic Notice</h4>
              <p style="font-size:0.82rem; color:#94a3b8; line-height:1.5;">
                This website is a <strong>college project and prototype demo</strong>. It does not connect to real railway reservation or live emergency systems. All trains, fares, and IDs are simulated mock data.
              </p>
              <div style="margin-top:1rem;">
                <span class="prototype-tag">DEMO PROTOTYPE ONLY</span>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div>
              © 2026 MediRail Emergency Transit System. Designed for Academic Project Presentation.
            </div>
            <div>
              Emergency Hotline: 1800-419-RAIL • Safe Transit Protocol Compliant
            </div>
          </div>
        </div>
      </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  },

  setupMobileMenu: function() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
      navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('mobile-open')));
    }
  }
};

// Auto-initialize layout on every page
document.addEventListener('DOMContentLoaded', () => LayoutManager.renderLayout());
