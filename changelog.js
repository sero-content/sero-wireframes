/* ============================================================
   SERO WIREFRAME RELEASE NOTES
   Wijzig alleen het array SERO_CHANGELOG hieronder.
   Nieuwste versie bovenaan plaatsen.

   Velden per versie:
     version  string  — bv. "1.1"
     date     string  — YYYY-MM-DD
     summary  string  — een regel hint (verschijnt in de banner)
     changes  array   — wijzigingen, elk met:
       type    "new" | "updated" | "removed"
       text    string
       pages   "ALL" of array van filenames, bv. ["index.html","cdp.html"]
       anchor  (optioneel) CSS selector naar element op de pagina,
               bv. "#tile-data-intelligence". Maakt het item klikbaar
               en plaatst een inline marker bij het element.
   ============================================================ */

window.SERO_CHANGELOG = [
  {
    version: '1.3',
    date: '2026-05-18',
    summary: 'Changelog-banner items klikbaar + inline markers met tooltip op gewijzigde elementen',
    changes: [
      { type: 'new', text: 'Wijzigingen in de banner zijn nu klikbaar: een klik scrolt naar het element op de pagina en geeft het een korte highlight-pulse.', pages: 'ALL' },
      { type: 'new', text: 'Gewijzigde elementen krijgen een inline marker (badge rechtsboven het element). Hover op de badge toont een tooltip met de details van de wijziging.', pages: 'ALL' }
    ]
  },
  {
    version: '1.2',
    date: '2026-05-18',
    summary: 'S7 flywheel vervangen door drie concrete keten-cards + homepage one-liners aangescherpt',
    changes: [
      { type: 'removed', text: 'S7 flywheel-cirkel met 8 tools rond Sero CDP verwijderd (te conceptueel, mismatch met 5-themas framing en abstracte Collect/Understand/Act legenda).', pages: ['index.html'] },
      { type: 'new', text: 'S7 herontworpen naar drie concrete keten-cards (Conversie, Vindbaarheid, Capaciteit) met Signaal -> Beslissing -> Actie + Resultaat per keten, plus expliciete koppeling naar de betrokken Sero-themas.', pages: ['index.html'], anchor: '#s7-themas-versterken' },
      { type: 'updated', text: 'Homepage tegel Data & Intelligence: feature-zin vervangen door outcome-zin "Een klantprofiel dat voorspelt wie koopt, en wanneer".', pages: ['index.html'], anchor: '#tile-data-intelligence' },
      { type: 'updated', text: 'Homepage tegel Acquisition & Growth: feature-zin vervangen door outcome-zin "Vindbaar in zoekmachines en AI, zonder eindeloos contentwerk".', pages: ['index.html'], anchor: '#tile-acquisition-growth' }
    ]
  },
  {
    version: '1.1',
    date: '2026-05-18',
    summary: 'Interne design-annotaties verwijderd voor productie',
    changes: [
      { type: 'removed', text: 'Alle gele ⚠️ annotation-blokken weggehaald (waren design rationale, geen content). Wireframes zijn nu schoon voor Framer overname.', pages: 'ALL' }
    ]
  },
  {
    version: '1.0',
    date: '2026-05-18',
    summary: 'Baseline wireframe set opgeleverd',
    changes: [
      { type: 'new', text: 'Eerste versie van alle wireframes opgeleverd (18 paginas)', pages: 'ALL' }
    ]
  }
];

/* ===== Render logic — niet aanpassen ===== */
(function () {
  function getCurrentPage() {
    var path = (window.location.pathname || '').split('/').pop();
    if (!path || path.indexOf('.html') === -1) path = 'index.html';
    return path;
  }

  function pageMatches(changePages, currentPage) {
    if (!changePages || changePages === 'ALL') return true;
    if (Array.isArray(changePages)) return changePages.indexOf(currentPage) !== -1;
    return false;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function typeLabel(t) {
    return t === 'new' ? 'Nieuw' : t === 'updated' ? 'Aangepast' : 'Verwijderd';
  }

  // Scroll naar element + tijdelijke highlight pulse
  function focusAnchor(selector) {
    var el = document.querySelector(selector);
    if (!el) return;
    // Sluit de banner zodat de pagina zichtbaar is na scroll
    var banner = document.getElementById('wf-changelog-banner');
    if (banner) banner.classList.remove('expanded');
    // Scroll
    try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    catch (e) { el.scrollIntoView(); }
    // Pulse
    el.classList.remove('wf-anchor-pulse');
    // force reflow zodat de animation opnieuw start
    void el.offsetWidth;
    el.classList.add('wf-anchor-pulse');
    setTimeout(function () { el.classList.remove('wf-anchor-pulse'); }, 2400);
  }

  function renderBanner() {
    var container = document.getElementById('wf-changelog-banner');
    if (!container) return;

    var versions = window.SERO_CHANGELOG || [];
    if (versions.length === 0) {
      container.classList.add('empty');
      return;
    }

    var currentPage = getCurrentPage();
    var latest = versions[0];

    // bouw details: alleen versies/wijzigingen die deze pagina raken
    var blocks = [];
    versions.forEach(function (v) {
      var relevant = (v.changes || []).filter(function (c) {
        return pageMatches(c.pages, currentPage);
      });
      if (relevant.length === 0) return;
      var items = relevant.map(function (c) {
        var pageHint = '';
        if (c.pages && c.pages !== 'ALL' && Array.isArray(c.pages) && c.pages.length > 1) {
          pageHint = '<span class="cl-page">(' + c.pages.length + ' pagina\'s)</span>';
        }
        // Klikbaar als anchor aanwezig is en het element op deze pagina bestaat
        var clickable = false;
        var anchorAttr = '';
        if (c.anchor && document.querySelector(c.anchor)) {
          clickable = true;
          anchorAttr = ' data-cl-anchor="' + escapeHtml(c.anchor) + '"';
        }
        return '<li class="' + (clickable ? 'cl-clickable' : '') + '"' + anchorAttr + '>' +
          '<span class="cl-tag ' + escapeHtml(c.type) + '">' + typeLabel(c.type) + '</span>' +
          escapeHtml(c.text) +
          pageHint +
          (clickable ? '<span class="cl-jump">Toon op pagina →</span>' : '') +
          '</li>';
      }).join('');
      blocks.push(
        '<div class="wf-changelog-version-block">' +
          '<h4>v' + escapeHtml(v.version) +
          '<span class="v-date">' + escapeHtml(v.date) +
          (v.summary ? ' — ' + escapeHtml(v.summary) : '') + '</span></h4>' +
          '<ul>' + items + '</ul>' +
        '</div>'
      );
    });

    if (blocks.length === 0) {
      // Geen wijzigingen voor deze pagina — toon alleen huidige versie als info-strip
      container.innerHTML =
        '<div class="wf-changelog-header" style="cursor:default;">' +
          '<span class="wf-changelog-version">v' + escapeHtml(latest.version) + '</span>' +
          '<span class="wf-changelog-date">' + escapeHtml(latest.date) + '</span>' +
          '<span class="wf-changelog-summary" style="color:#7a6500;font-weight:normal;">' +
          'Geen wijzigingen op deze pagina in de laatste release.</span>' +
        '</div>';
      return;
    }

    container.innerHTML =
      '<div class="wf-changelog-header" data-cl-toggle="1">' +
        '<span class="wf-changelog-version">v' + escapeHtml(latest.version) + '</span>' +
        '<span class="wf-changelog-date">' + escapeHtml(latest.date) + '</span>' +
        '<span class="wf-changelog-summary">' + escapeHtml(latest.summary || 'Wireframe update') + '</span>' +
        '<span class="wf-changelog-toggle">Toon wijzigingen op deze pagina ▾</span>' +
      '</div>' +
      '<div class="wf-changelog-details">' + blocks.join('') + '</div>';

    // Toggle handler
    var header = container.querySelector('[data-cl-toggle]');
    if (header) {
      header.addEventListener('click', function () {
        container.classList.toggle('expanded');
      });
    }

    // Click handlers op klikbare changelog-items
    var clickables = container.querySelectorAll('li.cl-clickable');
    clickables.forEach(function (li) {
      li.addEventListener('click', function (e) {
        e.stopPropagation();
        var sel = li.getAttribute('data-cl-anchor');
        if (sel) focusAnchor(sel);
      });
    });
  }

  // Plaats inline marker (badge + tooltip) bij elk gewijzigd element op de pagina
  function placeInlineMarkers() {
    var versions = window.SERO_CHANGELOG || [];
    if (versions.length === 0) return;
    var currentPage = getCurrentPage();
    var latest = versions[0];

    // Group changes per anchor (kan meerdere changes op zelfde element zijn)
    var byAnchor = {};
    (latest.changes || []).forEach(function (c) {
      if (!c.anchor || !pageMatches(c.pages, currentPage)) return;
      var el = document.querySelector(c.anchor);
      if (!el) return;
      if (!byAnchor[c.anchor]) byAnchor[c.anchor] = { el: el, items: [] };
      byAnchor[c.anchor].items.push(c);
    });

    Object.keys(byAnchor).forEach(function (sel) {
      var entry = byAnchor[sel];
      var el = entry.el;
      var items = entry.items;
      // Bepaal "hoogste" type voor badge-kleur (new > updated > removed)
      var primaryType = 'updated';
      if (items.some(function (i) { return i.type === 'new'; })) primaryType = 'new';
      else if (items.every(function (i) { return i.type === 'removed'; })) primaryType = 'removed';

      // Zorg dat el position:relative is, anders kan absolute marker niet
      var computed = window.getComputedStyle(el);
      if (computed.position === 'static') {
        el.style.position = 'relative';
      }

      // Tooltip-tekst (alle changes op deze anchor)
      var tooltipHtml = items.map(function (c) {
        return '<div class="wf-marker-line"><span class="wf-marker-tag ' + escapeHtml(c.type) + '">' +
          typeLabel(c.type) + '</span>' + escapeHtml(c.text) + '</div>';
      }).join('');

      var marker = document.createElement('div');
      marker.className = 'wf-inline-marker ' + primaryType;
      marker.setAttribute('data-version', latest.version);
      marker.innerHTML =
        '<span class="wf-marker-badge">v' + escapeHtml(latest.version) + ' · ' + typeLabel(primaryType) + '</span>' +
        '<div class="wf-marker-tooltip">' +
          '<div class="wf-marker-tooltip-header">Wijzigingen in v' + escapeHtml(latest.version) + '</div>' +
          tooltipHtml +
        '</div>';

      el.appendChild(marker);
    });
  }

  function init() {
    renderBanner();
    placeInlineMarkers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
