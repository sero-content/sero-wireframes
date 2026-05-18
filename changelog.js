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
   ============================================================ */

window.SERO_CHANGELOG = [
  {
    version: '1.2',
    date: '2026-05-18',
    summary: 'S7 flywheel vervangen door drie concrete keten-cards + homepage one-liners aangescherpt',
    changes: [
      { type: 'removed', text: 'S7 flywheel-cirkel met 8 tools rond Sero CDP verwijderd (te conceptueel, mismatch met 5-themas framing en abstracte Collect/Understand/Act legenda).', pages: ['index.html'] },
      { type: 'new', text: 'S7 herontworpen naar drie concrete keten-cards (Conversie, Vindbaarheid, Capaciteit) met Signaal -> Beslissing -> Actie + Resultaat per keten, plus expliciete koppeling naar de betrokken Sero-themas.', pages: ['index.html'] },
      { type: 'updated', text: 'Homepage tegel Data & Intelligence: feature-zin vervangen door outcome-zin "Een klantprofiel dat voorspelt wie koopt, en wanneer".', pages: ['index.html'] },
      { type: 'updated', text: 'Homepage tegel Acquisition & Growth: feature-zin vervangen door outcome-zin "Vindbaar in zoekmachines en AI, zonder eindeloos contentwerk".', pages: ['index.html'] }
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
        return '<li><span class="cl-tag ' + escapeHtml(c.type) + '">' +
          escapeHtml(c.type === 'new' ? 'Nieuw' : c.type === 'updated' ? 'Aangepast' : 'Verwijderd') +
          '</span>' + escapeHtml(c.text) + pageHint + '</li>';
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
      '<div class="wf-changelog-header" onclick="this.parentElement.classList.toggle(\'expanded\')">' +
        '<span class="wf-changelog-version">v' + escapeHtml(latest.version) + '</span>' +
        '<span class="wf-changelog-date">' + escapeHtml(latest.date) + '</span>' +
        '<span class="wf-changelog-summary">' + escapeHtml(latest.summary || 'Wireframe update') + '</span>' +
        '<span class="wf-changelog-toggle">Toon wijzigingen op deze pagina ▾</span>' +
      '</div>' +
      '<div class="wf-changelog-details">' + blocks.join('') + '</div>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBanner);
  } else {
    renderBanner();
  }
})();
