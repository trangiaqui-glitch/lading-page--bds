/**
 * Vinhomes Grand Park Landing Page - Vanilla JavaScript
 * Pure frontend behaviors: smooth scroll, navbar collapse management, demo form submission
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Navbar style change on scroll
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile navbar auto-collapse on link click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .btn');
  const navbarCollapse = document.getElementById('navbarNav');
  
  if (navbarCollapse && typeof bootstrap !== 'undefined') {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      });
    });
  }

  // 3. Smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 76;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Set focus for accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });
        }
      }
    });
  });

  // 4. Contact / Advisory Demo Form Handler
  const contactForm = document.getElementById('advisoryForm');
  const formFeedback = document.getElementById('formFeedbackAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Check HTML5 validity
      if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
      }

      // Collect values for demo feedback
      const fullName = document.getElementById('fullName')?.value || 'Quý khách';
      const phone = document.getElementById('phoneNumber')?.value || '';
      const interest = document.getElementById('interestSelect')?.value || 'Dự án Vinhomes Grand Park';

      // Persist lead to localStorage so it syncs with admin.html
      try {
        const storedLeads = JSON.parse(localStorage.getItem('vgp_leads') || '[]');
        storedLeads.unshift({
          id: 'LEAD_' + Date.now(),
          fullName,
          phone,
          interest,
          createdAt: new Date().toLocaleString('vi-VN'),
          status: 'Mới'
        });
        localStorage.setItem('vgp_leads', JSON.stringify(storedLeads));
      } catch (err) {
        console.warn('Không thể lưu lead vào localStorage:', err);
      }

      // Show accessible alert demo message
      if (formFeedback) {
        formFeedback.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-4" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill flex-shrink-0" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            <div>
              <strong>Gửi yêu cầu thành công!</strong><br>
              Cảm ơn <strong>${escapeHtml(fullName)}</strong> (${escapeHtml(phone)}). Yêu cầu tư vấn về <em>${escapeHtml(interest)}</em> đã được ghi nhận. Bạn có thể kiểm tra danh sách tại <a href="admin.html" class="fw-bold text-decoration-underline text-success">Trang Quản Trị</a>.
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Đóng"></button>
          </div>
        `;
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Reset form
      this.reset();
      this.classList.remove('was-validated');
    });
  }

  // Helper function to prevent XSS in demo string rendering
  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
});
