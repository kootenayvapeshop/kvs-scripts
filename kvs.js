/* ============================================================
   KVS — Site Scripts v1.0
   External JS for Kootenay Vape Shops
   Loaded via: <script src="https://cdn.jsdelivr.net/gh/USERNAME/kvs-scripts/kvs.js"></script>
   
   Contains:
   1. Age Verification Gate (19+ BC requirement)
   2. Stock Urgency Badges (product pages)
   3. Trust Badges (product pages)
   4. Google Tag Manager (noscript fallback injected)
   5. FAQ Page Schema (JSON-LD) — content pages
   6. BreadcrumbList Schema (JSON-LD) — content pages
   7. Organization Schema (JSON-LD) — homepage only
   8. LocalBusiness Schema (JSON-LD) — 4 location pages
   ============================================================ */

(function() {
  'use strict';

  /* ──────────────────────────────────────
     1. AGE VERIFICATION GATE
  ────────────────────────────────────── */

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function setCookie(name, value, days) {
    var expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + value + '; expires=' + expires + '; path=/; SameSite=Lax';
  }

  function initAgeGate() {
    if (getCookie('kvs_age_ok') === '1') return;

    var style = document.createElement('style');
    style.textContent = [
      '#kvs-age-gate{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(8,8,16,0.97);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);font-family:"Barlow","Arial",sans-serif;opacity:0;transition:opacity 0.35s ease;}',
      '#kvs-age-gate.kvs-visible{opacity:1;}',
      '#kvs-age-gate-box{position:relative;background:linear-gradient(160deg,#0e0e1a,#141428);border:1px solid rgba(155,45,255,0.35);border-radius:20px;padding:3rem 2.5rem 2.5rem;max-width:440px;width:90%;text-align:center;box-shadow:0 0 80px rgba(155,45,255,0.2),0 30px 80px rgba(0,0,0,0.6);}',
      '#kvs-age-gate-box::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(135deg,#00d4ff,#9b2dff,#ff2d9b);border-radius:20px 20px 0 0;}',
      '#kvs-age-gate-logo{font-family:"Bebas Neue","Arial Narrow",sans-serif;font-size:2.8rem;letter-spacing:0.08em;background:linear-gradient(135deg,#00d4ff,#9b2dff,#ff2d9b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:0.25rem;line-height:1;}',
      '#kvs-age-gate-sub{font-size:0.7rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(144,144,176,0.7);margin-bottom:2rem;}',
      '#kvs-age-gate-title{font-family:"Bebas Neue","Arial Narrow",sans-serif;font-size:1.9rem;letter-spacing:0.04em;color:#ffffff;margin-bottom:0.6rem;line-height:1.15;}',
      '#kvs-age-gate-body{font-size:0.88rem;color:rgba(144,144,176,0.85);line-height:1.65;margin-bottom:2rem;}',
      '#kvs-age-gate-body strong{color:rgba(240,240,255,0.9);}',
      '.kvs-age-btn{display:block;width:100%;padding:0.9rem 1.5rem;border:none;border-radius:50px;font-family:"Barlow","Arial",sans-serif;font-weight:700;font-size:0.95rem;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;margin-bottom:0.75rem;}',
      '#kvs-age-yes{background:linear-gradient(135deg,#00d4ff,#9b2dff,#ff2d9b);color:#ffffff;box-shadow:0 8px 30px rgba(155,45,255,0.4);}',
      '#kvs-age-yes:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(155,45,255,0.6);}',
      '#kvs-age-no{background:transparent;color:rgba(144,144,176,0.7);border:1px solid rgba(155,45,255,0.25);}',
      '#kvs-age-no:hover{border-color:rgba(155,45,255,0.5);color:rgba(240,240,255,0.8);}',
      '#kvs-age-gate-legal{margin-top:1.5rem;font-size:0.68rem;color:rgba(144,144,176,0.45);line-height:1.5;letter-spacing:0.02em;}',
      '@media(max-width:480px){#kvs-age-gate-box{padding:2.5rem 1.75rem 2rem;}#kvs-age-gate-logo{font-size:2.2rem;}#kvs-age-gate-title{font-size:1.6rem;}}'
    ].join('');
    document.head.appendChild(style);

    var gate = document.createElement('div');
    gate.id = 'kvs-age-gate';
    gate.setAttribute('role', 'dialog');
    gate.setAttribute('aria-modal', 'true');
    gate.setAttribute('aria-label', 'Age Verification');
    gate.innerHTML = [
      '<div id="kvs-age-gate-box">',
        '<div id="kvs-age-gate-logo">KOOTENAY VAPE</div>',
        '<div id="kvs-age-gate-sub">Trail &bull; Creston &bull; Kimberley &bull; Grand Forks</div>',
        '<div id="kvs-age-gate-title">Are You 19 or Older?</div>',
        '<div id="kvs-age-gate-body">',
          'Vaping products are for <strong>adults 19+ only</strong> in British Columbia.',
          '<br><br>',
          'By entering this site you confirm you are of legal age and agree to our Terms & Conditions.',
        '</div>',
        '<button class="kvs-age-btn" id="kvs-age-yes">Yes, I\'m 19 or Older — Enter</button>',
        '<button class="kvs-age-btn" id="kvs-age-no">No, I\'m Under 19</button>',
        '<div id="kvs-age-gate-legal">',
          'This site sells nicotine products. Must be 19+ to purchase in BC.',
          '<br>By entering you confirm you meet the legal age requirement.',
        '</div>',
      '</div>'
    ].join('');

    document.documentElement.style.overflow = 'hidden';
    document.body.appendChild(gate);

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        gate.classList.add('kvs-visible');
      });
    });

    document.getElementById('kvs-age-yes').addEventListener('click', function() {
      setCookie('kvs_age_ok', '1', 30);
      gate.style.opacity = '0';
      gate.style.transition = 'opacity 0.3s ease';
      setTimeout(function() {
        gate.remove();
        document.documentElement.style.overflow = '';
      }, 300);
    });

    document.getElementById('kvs-age-no').addEventListener('click', function() {
      window.location.replace('https://www.google.com');
    });
  }

  /* ──────────────────────────────────────
     2. STOCK URGENCY BADGES
     Rewrites "In stock: X available" text
     with color-coded urgency messaging.
     CSS classes defined in Custom CSS.
  ────────────────────────────────────── */

  function initStockBadges() {
    var checkInterval = setInterval(function() {
      var stockEl = document.querySelector('.details-product-purchase__place span');
      if (!stockEl || stockEl.dataset.kvsProcessed) return;

      var match = stockEl.textContent.trim().match(/In stock:\s*(\d+)\s*available/);
      if (!match) return;

      stockEl.dataset.kvsProcessed = '1';
      var qty = parseInt(match[1]);

      if (qty <= 2) {
        stockEl.className += ' kvs-critical-stock';
        stockEl.textContent = '\uD83D\uDD25 Only ' + qty + ' left \u2014 order soon!';
      } else if (qty <= 5) {
        stockEl.className += ' kvs-low-stock';
        stockEl.textContent = '\u26A1 Only ' + qty + ' left in stock';
      } else {
        stockEl.className += ' kvs-in-stock';
        stockEl.textContent = '\u2713 In stock \u2014 ' + qty + ' available';
      }
    }, 800);

    // Stop checking after 30 seconds (not on a product page)
    setTimeout(function() { clearInterval(checkInterval); }, 30000);
  }

  /* ──────────────────────────────────────
     3. TRUST BADGES
     Injects trust indicators below the
     Add to Bag button on product pages.
     CSS classes defined in Custom CSS.
  ────────────────────────────────────── */

  function initTrustBadges() {
    var checkInterval = setInterval(function() {
      // Don't double-inject
      if (document.querySelector('.kvs-trust-badges')) {
        clearInterval(checkInterval);
        return;
      }

      // Find the Add to Bag button area
      var buyBtn = document.querySelector('.details-product-purchase__add-to-bag');
      if (!buyBtn) return;

      // Find the parent purchase container to append after
      var purchaseArea = buyBtn.closest('.details-product-purchase') || buyBtn.parentElement;
      if (!purchaseArea) return;

      clearInterval(checkInterval);

      var badges = document.createElement('div');
      badges.className = 'kvs-trust-badges';
      badges.innerHTML = [
        '<div class="kvs-trust-badge">\uD83D\uDD12 Secure Checkout</div>',
        '<div class="kvs-trust-badge">\uD83D\uDE9A Ships Across Canada</div>',
        '<div class="kvs-trust-badge">\u23F0 Same-Day Dispatch</div>',
        '<div class="kvs-trust-badge">\u2705 Tested by Our Team</div>'
      ].join('');

      purchaseArea.appendChild(badges);
    }, 800);

    setTimeout(function() { clearInterval(checkInterval); }, 30000);
  }

  /* ──────────────────────────────────────
     4. GTM NOSCRIPT FALLBACK
  ────────────────────────────────────── */

  function initGTMNoscript() {
    var noscript = document.createElement('noscript');
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-TWBWVRRR';
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }

  /* ──────────────────────────────────────
     5. FAQ PAGE SCHEMA (JSON-LD)
     Extracts Q/A pairs from content pages
     and injects FAQPage structured data.
     Skips /products/* and cart/checkout.
  ────────────────────────────────────── */
  function initFAQSchema() {
    // Gate: skip product, cart, and checkout pages
    var path = window.location.pathname;
    if (/^\/products(\/|$)/i.test(path)) return;

    // Deduplicate: bail if FAQPage JSON-LD already exists
    var existing = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < existing.length; i++) {
      try {
        var d = JSON.parse(existing[i].textContent);
        if (d['@type'] === 'FAQPage') return;
      } catch (e) { /* ignore parse errors */ }
    }

    // Extract Q/A pairs from the DOM
    // Pattern: <p><strong>Question?</strong></p> followed by <p>Answer</p>
    var strongs = document.querySelectorAll('.ins-tile__description strong');
    var pairs = [];

    for (var j = 0; j < strongs.length && pairs.length < 10; j++) {
      var s = strongs[j];
      var qText = (s.textContent || '').trim();
      if (!/\?$/.test(qText)) continue;

      var pEl = s.closest('p');
      if (!pEl) continue;

      // Collect answer from subsequent siblings until next question
      var answerParts = [];
      var node = pEl.nextElementSibling;
      while (node) {
        var nextStrong = node.querySelector('strong');
        if (nextStrong && /\?$/.test((nextStrong.textContent || '').trim())) break;
        var txt = (node.textContent || '').trim();
        if (txt) answerParts.push(txt);
        node = node.nextElementSibling;
      }

      var aText = answerParts.join(' ').trim();
      if (qText && aText) {
        pairs.push({ q: qText, a: aText });
      }
    }

    // Require at least 2 Q/A pairs
    if (pairs.length < 2) return;

    // Build JSON-LD
    var entities = [];
    for (var k = 0; k < pairs.length; k++) {
      entities.push({
        '@type': 'Question',
        'name': pairs[k].q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': pairs[k].a
        }
      });
    }

    var schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': entities
    };

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    // Debug logging (remove after confirming)
    console.log('[kvs.js] FAQPage schema injected:', pairs.length, 'Q/A pairs');
    if (pairs.length >= 2) {
      console.log('[kvs.js] Q1:', pairs[0].q, '| A1:', pairs[0].a.slice(0, 80));
      console.log('[kvs.js] Q2:', pairs[1].q, '| A2:', pairs[1].a.slice(0, 80));
    }
  }



  /* ──────────────────────────────────────
     6. BREADCRUMB SCHEMA (JSON-LD)
     Injects BreadcrumbList structured data
     for hub and city content pages.
     Skips /products/* and cart/checkout.
  ────────────────────────────────────── */
  function initBreadcrumbSchema() {
    // Gate: skip product, cart, and checkout pages
    var path = window.location.pathname;
    if (/^\/products(\/|$)/i.test(path)) return;

    // Deduplicate: bail if already injected
    if (document.getElementById('kvs-breadcrumb-jsonld')) return;
    var existing = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < existing.length; i++) {
      try {
        var d = JSON.parse(existing[i].textContent);
        if (d['@type'] === 'BreadcrumbList') return;
      } catch (e) { /* ignore parse errors */ }
    }

    // Extract page info
    var homeUrl = 'https://kootenayvapeshop.com/';
    var currentUrl = window.location.origin + window.location.pathname;
    var h1El = document.querySelector('h1');
    var pageTitle = h1El ? h1El.textContent.trim() : '';
    if (!pageTitle) {
      pageTitle = document.title.replace(/\s*[\|\-]\s*K(VS|ootenay).*$/i, '').trim();
    }
    if (!pageTitle) return;

    // Detect hub backlink (city pages have "\u2190 ... Online Vape Shop" link)
    var hubUrl = '';
    var hubName = '';
    var allLinks = document.querySelectorAll('.ins-tile__description a');
    for (var j = 0; j < allLinks.length; j++) {
      var linkText = (allLinks[j].textContent || '').trim();
      if (/\u2190/.test(linkText) || /Online Vape Shop/i.test(linkText)) {
        hubUrl = allLinks[j].href || '';
        if (hubUrl && !/^https?:\/\//.test(hubUrl)) {
          hubUrl = 'https://kootenayvapeshop.com' + hubUrl;
        }
        hubName = linkText.replace(/[\u2190\u2192\u27F5\u27F6<>]/g, '').trim();
        break;
      }
    }

    // Build breadcrumb items
    var items = [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': homeUrl }
    ];
    if (hubUrl && hubName) {
      items.push({ '@type': 'ListItem', 'position': 2, 'name': hubName, 'item': hubUrl });
      items.push({ '@type': 'ListItem', 'position': 3, 'name': pageTitle, 'item': currentUrl });
    } else {
      items.push({ '@type': 'ListItem', 'position': 2, 'name': pageTitle, 'item': currentUrl });
    }
    if (items.length > 3) items = items.slice(0, 3);

    var schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items
    };

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'kvs-breadcrumb-jsonld';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    console.log('[kvs.js] Breadcrumb injected:', JSON.stringify(schema, null, 2));
  }


  /* ──────────────────────────────────────
     7. ORGANIZATION SCHEMA (JSON-LD)
     Injects Organization structured data
     on the homepage only. Uses same @id as
     existing @graph Organization to enrich it.
  ────────────────────────────────────── */
  function initOrganizationSchema() {
    // Gate: homepage only
    var path = window.location.pathname;
    if (path !== '/' && path !== '/home') return;

    // Deduplicate
    if (document.getElementById('kvs-org-jsonld')) return;

    var schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://kootenayvapeshop.com/#organization',
      'name': 'Kootenay Vape Shops',
      'alternateName': 'KVS',
      'legalName': 'KVS Vapour Shop Inc',
      'url': 'https://kootenayvapeshop.com/',
      'logo': 'https://dhgf5mcbrms62.cloudfront.net/84286959/header-gmyXL6/0YeCDyc-200x200.png',
      'contactPoint': {
        '@type': 'ContactPoint',
        'email': 'nick@kootenayvapeshop.com',
        'contactType': 'customer service'
      },
      'areaServed': [
        { '@type': 'AdministrativeArea', 'name': 'British Columbia' },
        { '@type': 'AdministrativeArea', 'name': 'Saskatchewan' },
        { '@type': 'AdministrativeArea', 'name': 'Nova Scotia' },
        { '@type': 'AdministrativeArea', 'name': 'Newfoundland and Labrador' }
      ],
      'numberOfEmployees': { '@type': 'QuantitativeValue', 'value': 4 },
      'foundingLocation': {
        '@type': 'Place',
        'name': 'Trail, British Columbia'
      }
    };

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'kvs-org-jsonld';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    console.log('[kvs.js] Organization schema injected');
  }

  /* ===========================================
     SECTION 8 — LocalBusiness Schema (JSON-LD)
     Injects LocalBusiness structured data on
     the 4 physical-store location pages only.
     =========================================== */
  function initLocalBusinessSchema() {
    var path = window.location.pathname;
    var stores = {
      '/kimberley-vape-shop': {
        city: 'Kimberley', street: '370 Wallinger Ave', locality: 'Kimberley',
        postal: 'V1A 1Z4', phone: '+1 778-481-0755',
        map: 'https://www.google.com/maps/place/?q=place_id:ChIJ6UXsMDzVZFMR-ST9TFO_5q8',
        hours: [
          { days: ['Monday'], opens: '10:00', closes: '18:00' },
          { days: ['Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '10:00', closes: '20:00' },
          { days: ['Sunday'], opens: '10:00', closes: '18:00' }
        ]
      },
      '/trail-vape-shop': {
        city: 'Trail', street: '1330 Bay Ave', locality: 'Trail',
        postal: 'V1R 4A8', phone: '+1 778-456-4450',
        map: 'https://www.google.com/maps/place/?q=place_id:ChIJ-aHPvPLZYlMRzLTvMHxqYkQ',
        hours: [
          { days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '08:00', closes: '20:00' },
          { days: ['Sunday'], opens: '10:00', closes: '20:00' }
        ]
      },
      '/creston-vape-shop': {
        city: 'Creston', street: '1415 Canyon St B', locality: 'Creston',
        postal: 'V0B 1G0', phone: '+1 250-428-0100',
        map: 'https://www.google.com/maps/place/?q=place_id:ChIJfZaclddjY1MRh2DjoO0nlTk',
        hours: [
          { days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '20:00' },
          { days: ['Sunday'], opens: '10:00', closes: '18:00' }
        ]
      },
      '/grand-forks-vape-shop': {
        city: 'Grand Forks', street: '7457 3rd Street', locality: 'Grand Forks',
        postal: 'V0H 1H0', phone: '+1 236-352-0027',
        map: 'https://www.google.com/maps/place/?q=place_id:ChIJF4c7_cmtYlMRF2FzZd-xyDg',
        hours: [
          { days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '20:00' },
          { days: ['Sunday'], opens: '10:00', closes: '18:00' }
        ]
      }
    };
    var store = stores[path];
    if (!store) return;
    if (document.getElementById('kvs-lb-jsonld')) return;
    var existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    var myId = 'https://kootenayvapeshop.com' + path + '#localbusiness';
    for (var i = 0; i < existingScripts.length; i++) {
      try {
        var parsed = JSON.parse(existingScripts[i].textContent);
        if (parsed['@type'] === 'LocalBusiness' && parsed['@id'] === myId) return;
        if (parsed['@graph']) {
          for (var j = 0; j < parsed['@graph'].length; j++) {
            if (parsed['@graph'][j]['@type'] === 'LocalBusiness' && parsed['@graph'][j]['@id'] === myId) return;
          }
        }
      } catch (e) {}
    }
    var hoursSpec = [];
    for (var h = 0; h < store.hours.length; h++) {
      var entry = store.hours[h];
      for (var d = 0; d < entry.days.length; d++) {
        hoursSpec.push({
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': entry.days[d],
          'opens': entry.opens,
          'closes': entry.closes
        });
      }
    }
    var schema = {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'Store'],
      '@id': myId,
      'name': 'Kootenay Vape Shop — ' + store.city,
      'url': 'https://kootenayvapeshop.com' + path,
      'telephone': store.phone,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': store.street,
        'addressLocality': store.locality,
        'addressRegion': 'BC',
        'postalCode': store.postal,
        'addressCountry': 'CA'
      },
      'openingHoursSpecification': hoursSpec,
      'hasMap': store.map,
      'areaServed': { '@type': 'AdministrativeArea', 'name': 'British Columbia' },
      'parentOrganization': { '@id': 'https://kootenayvapeshop.com/#organization' }
    };
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'kvs-lb-jsonld';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    console.log('[kvs.js] LocalBusiness schema injected: ' + store.city);
  }

  /* ──────────────────────────────────────
     INIT — Run everything
  ────────────────────────────────────── */

  // Age gate runs immediately
  initAgeGate();

  // Everything else waits for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initStockBadges();
      initTrustBadges();
      initGTMNoscript();
      // FAQ schema: delay to let Instant Site tiles render
      setTimeout(initFAQSchema, 2500);
      setTimeout(initBreadcrumbSchema, 2500);
      setTimeout(initOrganizationSchema, 2500);
      setTimeout(initLocalBusinessSchema, 2500);
    });
  } else {
    initStockBadges();
    initTrustBadges();
    initGTMNoscript();
    setTimeout(initFAQSchema, 2500);
    setTimeout(initBreadcrumbSchema, 2500);
    setTimeout(initOrganizationSchema, 2500);
    setTimeout(initLocalBusinessSchema, 2500);
  }

})();
