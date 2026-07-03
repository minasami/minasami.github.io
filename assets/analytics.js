document.addEventListener('DOMContentLoaded', function () {
  function track(name, params) {
    if (typeof gtag === 'function') {
      gtag('event', name, params || {});
    }
  }

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const text = (link.textContent || '').trim().toLowerCase();

    if (href.includes('medicine-support-hub') || text.includes('live demo')) {
      track('open_medicine_support_hub', { link_url: href });
    } else if (href.includes('linkedin.com')) {
      track('visit_linkedin', { link_url: href });
    } else if (href.includes('github.com')) {
      track('visit_github', { link_url: href });
    } else if (href.startsWith('https://wa.me/')) {
      track('click_whatsapp', { link_url: href });
    } else if (href.startsWith('mailto:')) {
      track(text.includes('meeting') ? 'book_meeting' : 'click_email', { link_url: href });
    } else if (href.toLowerCase().endsWith('.pdf') || text.includes('download cv')) {
      track('download_cv', { link_url: href });
    } else if (href.startsWith('/projects') || href.includes('#projects')) {
      track('view_projects', { link_url: href });
    } else if (href.startsWith('/research')) {
      track('view_research', { link_url: href });
    } else if (href.startsWith('/publications')) {
      track('view_publications', { link_url: href });
    } else if (href.startsWith('/experience') || href.includes('#career')) {
      track('view_experience', { link_url: href });
    }
  });
});
