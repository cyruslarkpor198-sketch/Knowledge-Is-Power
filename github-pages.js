/* Resolve exported site's root-relative URLs under GitHub Pages project sites. */
(() => {
  document.documentElement.classList.add('js-enabled');
  const visibilityStyle = document.createElement('style');
  visibilityStyle.textContent = '[style*="opacity:0"] { opacity: 1 !important; transform: none !important; }';
  document.head.append(visibilityStyle);
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  const knownPages = new Set(['about', 'admissions', 'campus-life', 'colleges', 'visit', '404', '_not-found']);
  let base = '';

  // A user/repository site is served below /<repository>/; a user site or
  // custom domain is served from /. Recognize the site's page names so they
  // are not mistaken for the repository segment.
  if (segments.length && !knownPages.has(segments[0]) && !segments[0].includes('.')) {
    base = `/${segments[0]}`;
  }

  if (!base) return;

  const rewrite = (value) => {
    if (!value || !value.startsWith('/') || value.startsWith('//')) return value;
    if (value === base || value.startsWith(`${base}/`)) return value;
    return `${base}${value}`;
  };

  const attrs = ['href', 'src', 'poster'];
  const update = (root) => {
    if (root.matches?.('[href], [src], [poster]')) {
      for (const attr of attrs) {
        if (root.hasAttribute(attr)) root.setAttribute(attr, rewrite(root.getAttribute(attr)));
      }
    }
    root.querySelectorAll?.('[href], [src], [poster]').forEach((node) => {
      for (const attr of attrs) {
        if (node.hasAttribute(attr)) node.setAttribute(attr, rewrite(node.getAttribute(attr)));
      }
    });
  };

  update(document);
  new MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) update(node);
      });
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
