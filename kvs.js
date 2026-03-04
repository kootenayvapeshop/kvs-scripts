/* ============================================================
   KVS — Site Scripts v3.1.11
   External JS for Kootenay Vape Shops
   Loaded via: <script src="https://cdn.jsdelivr.net/gh/kootenayvapeshop/kvs-scripts@main/kvs.js"></script>

   Contains:
   1. Age Verification Gate (19+ Canada requirement)
   2. Stock Urgency Badges (product pages)
   3. Trust Badges (product pages)
   4. Google Tag Manager (noscript fallback injected)
   5. FAQ Page Schema (JSON-LD) — content pages
   6. BreadcrumbList Schema (JSON-LD) — content pages
   7. Organization Schema (JSON-LD) — homepage only
   8. LocalBusiness Schema (JSON-LD) — 4 location pages
   9. WebSite + Sitelinks Search Box (JSON-LD) — homepage only
   10. Kimberley H1 Safety Net — location page fix
   11. Product Title Suffix — PDP title enrichment
   12. Category Meta Description Fix — category pages
   13. Category H1 Injection — category pages
   14. Category Links — related-category blocks on category pages
   15. Category Helper — disambiguation block for similar categories
   16. SPA Navigation Watcher — re-injects category blocks on URL change
   17. Fix Static Schema — patch Ecwid VapeShop → Store
   18. Best Sellers — merchandising blocks on category pages
   19. Product Page Related Links — "Shop More Like This" on PDPs
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
          'Vaping products are for <strong>adults 19+ only</strong> in Canada.',
          '<br><br>',
          'By entering this site you confirm you are of legal age and agree to our Terms & Conditions.',
        '</div>',
        '<button class="kvs-age-btn" id="kvs-age-yes">Yes, I\'m 19 or Older — Enter</button>',
        '<button class="kvs-age-btn" id="kvs-age-no">No, I\'m Under 19</button>',
        '<div id="kvs-age-gate-legal">',
          'This site sells nicotine products. Must be 19+ to purchase. Ships to BC, SK, NS & NL.',
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
      },
      'foundingDate': '2019',
      'sameAs': [
        'https://www.instagram.com/kootenayvapeshops/',
        'https://www.yelp.ca/biz/kootenay-vape-shop-trail-2'
      ]
    };

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'kvs-org-jsonld';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
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
  }

  /* ──────────────────────────────────────

  /* ===========================================
     SECTION 9 — WebSite + Sitelinks Search Box (JSON-LD)
     Injects WebSite schema with SearchAction
     on the homepage only.
     =========================================== */
  function initWebSiteSchema() {
    var path = window.location.pathname;
    if (path !== '/' && path !== '/home') return;
    if (document.getElementById('kvs-website-jsonld')) return;
    var existing = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < existing.length; i++) {
      try {
        var d = JSON.parse(existing[i].textContent);
        if (d['@type'] === 'WebSite') return;
        if (d['@graph']) {
          for (var j = 0; j < d['@graph'].length; j++) {
            if (d['@graph'][j]['@type'] === 'WebSite') return;
          }
        }
      } catch (e) {}
    }
    var schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://kootenayvapeshop.com/#website',
      'url': 'https://kootenayvapeshop.com/',
      'name': 'Kootenay Vape Shop',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://kootenayvapeshop.com/products/search?keyword={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    };
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'kvs-website-jsonld';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  /* ──────────────────────────────────────
     10. KIMBERLEY H1 SAFETY NET
     Corrects the wrong H1 on /kimberley-vape-shop
     until the Ecwid tile heading is fixed in admin.
     Remove this section once the admin fix is confirmed.
  ────────────────────────────────────── */
  function fixKimberleyH1() {
    if (window.location.pathname !== '/kimberley-vape-shop') return;

    var h1s = document.querySelectorAll('h1');
    for (var i = 0; i < h1s.length; i++) {
      var text = h1s[i].textContent.trim();
      if (text === 'Fresh & Delicious') {
        h1s[i].textContent = 'Kootenay Vape Shop \u2014 Kimberley, BC';
        return;
      }
    }
  }

  /* ──────────────────────────────────────
     11. PRODUCT TITLE SUFFIX
     Appends brand suffix to <title> on PDPs
     so SERPs show "Product Name | Buy Online | Kootenay Vape Shops"
     instead of just "Product Name".
  ────────────────────────────────────── */
  function initProductTitleSuffix() {
    var path = window.location.pathname;
    // Only fire on product detail pages (pattern: /products/Slug-p{digits})
    if (!/^\/products\/.+-p\d+$/i.test(path)) return;

    var suffix = ' | Buy Online | Kootenay Vape Shops';
    var title = document.title || '';

    // Don't double-append
    if (title.indexOf('Kootenay Vape') !== -1) return;
    // Don't exceed ~65 chars total (Google truncates around there)
    if (title.length + suffix.length > 70) {
      suffix = ' | Kootenay Vape Shops';
    }
    if (title.length + suffix.length > 70) {
      suffix = ' | KVS';
    }

    document.title = title + suffix;
  }

  /* ──────────────────────────────────────
     12. CATEGORY META DESCRIPTION FIX
     Overrides the generic site-wide meta
     description on category pages with
     the correct category-specific text.
  ────────────────────────────────────── */
  function initCategoryMeta() {
    var path = window.location.pathname;
    var metas = {
      '/products/Disposables-c181465790': 'Shop disposable vapes from Lost Mary, Elf Bar & Flavour Beast. Lowest prices in BC with fast shipping to BC, SK, NS & NL.',
      '/products/Salt-Nic-c181460122': 'Shop salt nicotine e-liquid from $23.99 + tax. Smooth nic salt juice for pod systems from top Canadian brands. Ships to BC, SK, NS & NL.',
      '/products/Freebase-c181457932': 'Shop freebase e-liquid from $20.99 + tax. Wide range of flavours and nicotine strengths for sub-ohm vaping. Ships to BC, SK, NS & NL.',
      '/products/Closed-Pod-Devices-c181465296': 'Shop closed pod vape devices from STLTH, Vuse & more. Rechargeable pod system hardware at the lowest prices. Ships to BC, SK, NS & NL.',
      '/products/Closed-Pods-c181465541': 'Shop pre-filled closed pod refills from STLTH, Vuse & more. Snap-in replacement pods in all flavours and strengths. Ships to BC, SK, NS & NL.',
      '/products/Vape-Hardware-c181465792': 'Shop vape mods, pod systems, starter kits & tanks from Geekvape, Voopoo, Uwell & more. Lowest prices in BC. Ships Canada-wide.',
      '/products/Coils-c181465794': 'Shop replacement vape coils for Geekvape, Voopoo, Uwell, SMOK & Vaporesso devices. Lowest prices in BC with fast province-wide shipping.',
      '/products/Open-Pod-Devices-c181465297': 'Shop refillable open pod vape systems from Uwell, Voopoo, Vaporesso & more. Compact pod devices at the lowest prices. Ships to BC, SK, NS & NL.',
      '/products/Replacements-c181460125': 'Shop vape replacement coils, pods & parts from Voopoo, Geekvape, SMOK, Uwell & more. Lowest prices in BC with fast shipping to BC, SK, NS & NL.'
    };
    var desc = metas[path];
    if (!desc) return;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', desc);
    }
  }

  /* ──────────────────────────────────────
     13. CATEGORY H1 INJECTION
     Ecwid category pages have no H1 by
     default. This injects one above the
     product grid.
  ────────────────────────────────────── */
  function initCategoryH1() {
    var path = window.location.pathname;
    var headings = {
      '/products/Disposables-c181465790': 'Disposable Vapes',
      '/products/Salt-Nic-c181460122': 'Salt Nic E-Liquid',
      '/products/Freebase-c181457932': 'Freebase E-Liquid',
      '/products/Closed-Pod-Devices-c181465296': 'Closed Pod Vape Devices',
      '/products/Closed-Pods-c181465541': 'Closed Pod Refills (Pods)',
      '/products/Vape-Hardware-c181465792': 'Vape Hardware',
      '/products/Coils-c181465794': 'Replacement Coils',
      '/products/420-c181460866': '420 Accessories',
      '/products/Open-Pod-Devices-c181465297': 'Open Pod Vape Systems',
      '/products/Replacements-c181460125': 'Vape Replacement Parts & Accessories'
    };
    var text = headings[path];
    if (!text) return;
    var existing = document.querySelector('h1');
    if (existing) {
      existing.textContent = text;
      return;
    }
    var h1 = document.createElement('h1');
    h1.textContent = text;
    h1.style.cssText = 'font-family:"Bebas Neue","Arial Narrow",sans-serif;font-size:2rem;letter-spacing:0.04em;text-align:center;margin:1.5rem 0 0.5rem;color:#fff;';
    var grid = document.querySelector('.ec-store') || document.querySelector('[class*="product"]');
    if (grid) {
      grid.parentElement.insertBefore(h1, grid);
    }
  }

  /* ──────────────────────────────────────
     14. CATEGORY LINKS — Inject related-category block on category pages
  ────────────────────────────────────── */

  function initCategoryLinks() {
    // Remove any existing block (handles SPA navigation between categories)
    var existingBlock = document.getElementById('kvs-category-links');
    if (existingBlock) existingBlock.remove();

    var path = window.location.pathname;
    if (path.indexOf('/products/') !== 0 || path.indexOf('-c') === -1) return;

    var links = {
      '/products/Disposables-c181465790': {
        label: 'POPULAR RELATED CATEGORIES',
        items: [
          ['/products/Salt-Nic-c181460122', 'Salt Nic E-Liquid', 'Smooth nicotine salt juice in 10mg and 20mg'],
          ['/products/Freebase-c181457932', 'Freebase E-Liquid', 'Traditional e-juice from 0mg to 12mg'],
          ['/products/Open-Pod-Devices-c181465297', 'Open Pod Devices', 'Refillable pod systems for daily use'],
          ['/products/Closed-Pod-Devices-c181465296', 'Closed Pod Devices', 'Pre-filled pod hardware'],
          ['/products/Closed-Pods-c181465541', 'Closed Pods', 'Pre-filled pod cartridges and refills'],
          ['/products/Coils-c181465794', 'Coils', 'Replacement coils for all major devices'],
          ['/products/All-In-One-Pods-c181465298', 'All-In-One Pods', 'Integrated pod cartridges'],
          ['/products/Replacements-c181460125', 'Replacements', 'Coils, pods, glass, and parts']
        ]
      },
      '/products/Salt-Nic-c181460122': {
        label: 'POPULAR RELATED CATEGORIES',
        items: [
          ['/products/Freebase-c181457932', 'Freebase E-Liquid', 'Traditional e-juice from 0mg to 12mg'],
          ['/products/Disposables-c181465790', 'Disposable Vapes', 'Ready-to-use disposable vape devices'],
          ['/products/Open-Pod-Devices-c181465297', 'Open Pod Devices', 'Refillable pod systems for salt nic'],
          ['/products/Closed-Pod-Devices-c181465296', 'Closed Pod Devices', 'Pre-filled pod system hardware'],
          ['/products/Closed-Pods-c181465541', 'Closed Pods', 'Pre-filled pod cartridges and refills'],
          ['/products/Coils-c181465794', 'Coils', 'Replacement coils for all major devices'],
          ['/products/Vape-Hardware-c181465792', 'Vape Hardware', 'Mods, kits, tanks, and pod systems'],
          ['/products/All-In-One-Pods-c181465298', 'All-In-One Pods', 'Integrated pod cartridges for pod systems']
        ]
      },
      '/products/Coils-c181465794': {
        label: 'POPULAR RELATED CATEGORIES',
        items: [
          ['/products/Replacements-c181460125', 'Replacements', 'All replacement parts, pods, and glass'],
          ['/products/All-In-One-Pods-c181465298', 'All-In-One Pods', 'Integrated pod cartridges'],
          ['/products/Open-Pod-Devices-c181465297', 'Open Pod Devices', 'Refillable pod systems for daily use'],
          ['/products/Vape-Hardware-c181465792', 'Vape Hardware', 'Mods, kits, tanks, and pod systems'],
          ['/products/Salt-Nic-c181460122', 'Salt Nic E-Liquid', 'Smooth nic salt juice for pod systems'],
          ['/products/Freebase-c181457932', 'Freebase E-Liquid', 'Traditional e-juice for sub-ohm setups'],
          ['/products/Disposables-c181465790', 'Disposable Vapes', 'Ready-to-use disposable vape devices'],
          ['/products/Closed-Pod-Devices-c181465296', 'Closed Pod Devices', 'Pre-filled pod system hardware']
        ]
      },
      '/products/Open-Pod-Devices-c181465297': {
        label: 'POPULAR RELATED CATEGORIES',
        items: [
          ['/products/Coils-c181465794', 'Coils', 'Replacement coils for all major devices'],
          ['/products/All-In-One-Pods-c181465298', 'All-In-One Pods', 'Integrated pod cartridges'],
          ['/products/Replacements-c181460125', 'Replacements', 'Coils, pods, glass, and parts'],
          ['/products/Salt-Nic-c181460122', 'Salt Nic E-Liquid', 'Smooth nic salt juice for pod systems'],
          ['/products/Freebase-c181457932', 'Freebase E-Liquid', 'Traditional e-juice from 0mg to 12mg'],
          ['/products/Closed-Pod-Devices-c181465296', 'Closed Pod Devices', 'Pre-filled pod system hardware'],
          ['/products/Disposables-c181465790', 'Disposable Vapes', 'Ready-to-use disposable vape devices'],
          ['/products/Vape-Hardware-c181465792', 'Vape Hardware', 'Mods, kits, tanks, and pod systems']
        ]
      },
      '/products/Freebase-c181457932': {
        label: 'POPULAR RELATED CATEGORIES',
        items: [
          ['/products/Salt-Nic-c181460122', 'Salt Nic E-Liquid', 'Smooth nicotine salt juice in 10mg and 20mg'],
          ['/products/Disposables-c181465790', 'Disposable Vapes', 'Ready-to-use disposable vape devices'],
          ['/products/Vape-Hardware-c181465792', 'Vape Hardware', 'Mods, kits, tanks, and pod systems'],
          ['/products/Open-Pod-Devices-c181465297', 'Open Pod Devices', 'Refillable pod systems for daily use'],
          ['/products/Coils-c181465794', 'Coils', 'Replacement coils for all major devices'],
          ['/products/Closed-Pod-Devices-c181465296', 'Closed Pod Devices', 'Pre-filled pod system hardware'],
          ['/products/Replacements-c181460125', 'Replacements', 'Coils, pods, glass, and parts'],
          ['/products/All-In-One-Pods-c181465298', 'All-In-One Pods', 'Integrated pod cartridges']
        ]
      },
      '/products/Replacements-c181460125': {
        label: 'POPULAR RELATED CATEGORIES',
        items: [
          ['/products/Coils-c181465794', 'Coils', 'Replacement coils for all major devices'],
          ['/products/All-In-One-Pods-c181465298', 'All-In-One Pods', 'Integrated pod cartridges'],
          ['/products/Open-Pod-Devices-c181465297', 'Open Pod Devices', 'Refillable pod systems for daily use'],
          ['/products/Vape-Hardware-c181465792', 'Vape Hardware', 'Mods, kits, tanks, and pod systems'],
          ['/products/Salt-Nic-c181460122', 'Salt Nic E-Liquid', 'Smooth nic salt juice for pod systems'],
          ['/products/Freebase-c181457932', 'Freebase E-Liquid', 'Traditional e-juice from 0mg to 12mg'],
          ['/products/Disposables-c181465790', 'Disposable Vapes', 'Ready-to-use disposable vape devices'],
          ['/products/Closed-Pods-c181465541', 'Closed Pods', 'Pre-filled pod cartridges and refills']
        ]
      },
      '/products/Closed-Pod-Devices-c181465296': {
        label: 'POPULAR RELATED CATEGORIES',
        items: [
          ['/products/Closed-Pods-c181465541', 'Closed Pod Refills', 'Pre-filled replacement pods for your device'],
          ['/products/Open-Pod-Devices-c181465297', 'Open Pod Devices', 'Refillable pod systems for daily use'],
          ['/products/Disposables-c181465790', 'Disposable Vapes', 'Ready-to-use disposable vape devices'],
          ['/products/Salt-Nic-c181460122', 'Salt Nic E-Liquid', 'Smooth nic salt juice for pod systems'],
          ['/products/Vape-Hardware-c181465792', 'Vape Hardware', 'Mods, kits, tanks, and pod systems'],
          ['/products/Coils-c181465794', 'Coils', 'Replacement coils for all major devices'],
          ['/products/Replacements-c181460125', 'Replacements', 'Coils, pods, glass, and parts'],
          ['/products/All-In-One-Pods-c181465298', 'All-In-One Pods', 'Integrated pod cartridges']
        ]
      },
      '/products/Closed-Pods-c181465541': {
        label: 'POPULAR RELATED CATEGORIES',
        items: [
          ['/products/Closed-Pod-Devices-c181465296', 'Closed Pod Vape Devices', 'Rechargeable hardware for closed pods'],
          ['/products/Disposables-c181465790', 'Disposable Vapes', 'Ready-to-use disposable vape devices'],
          ['/products/Open-Pod-Devices-c181465297', 'Open Pod Devices', 'Refillable pod systems for daily use'],
          ['/products/Salt-Nic-c181460122', 'Salt Nic E-Liquid', 'Smooth nic salt juice in 10mg and 20mg'],
          ['/products/Freebase-c181457932', 'Freebase E-Liquid', 'Traditional e-juice from 0mg to 12mg'],
          ['/products/All-In-One-Pods-c181465298', 'All-In-One Pods', 'Integrated pod cartridges'],
          ['/products/Coils-c181465794', 'Coils', 'Replacement coils for all major devices'],
          ['/products/Replacements-c181460125', 'Replacements', 'Coils, pods, glass, and parts']
        ]
      }
    };

    var data = links[path];
    if (!data) return;

    var B = '\u2022';
    var D = '\u2014';
    var html = '<p style="margin-bottom:0.3rem;"><strong>' + data.label + '</strong></p>';
    for (var i = 0; i < data.items.length; i++) {
      var item = data.items[i];
      html += '<p style="margin:0.15rem 0;">' + B + ' <a href="' + item[0] + '">' + item[1] + '</a> ' + D + ' ' + item[2] + '</p>';
    }

    var block = document.createElement('div');
    block.id = 'kvs-category-links';
    block.style.cssText = 'max-width:960px;margin:1rem auto 1.5rem;padding:0 1rem;color:#ccc;font-size:0.95rem;line-height:1.6;';
    block.innerHTML = html;

    var desc = document.querySelector('.grid__description');
    if (desc) {
      desc.parentElement.insertBefore(block, desc.nextSibling);
      return;
    }
    var grid = document.querySelector('.ec-store') || document.querySelector('[class*="product"]');
    if (grid) {
      grid.parentElement.insertBefore(block, grid);
    }
  }

  /* ──────────────────────────────────────
     15. CATEGORY HELPER — Disambiguation
     block for easily confused categories.
  ────────────────────────────────────── */
  function initCategoryHelper() {
    var existingHelper = document.getElementById('kvs-category-helper');
    if (existingHelper) existingHelper.remove();

    var path = window.location.pathname;
    var helpers = {
      '/products/Closed-Pod-Devices-c181465296': {
        label: 'NOT SURE WHICH YOU NEED?',
        lines: [
          'This page is for <strong>closed pod devices</strong> \u2014 the rechargeable hardware (battery unit) that your pods snap into.',
          'Looking for the <strong>pre-filled replacement pods</strong> instead? Visit <a href="/products/Closed-Pods-c181465541">Closed Pod Refills (Pods)</a>.'
        ]
      },
      '/products/Closed-Pods-c181465541': {
        label: 'NOT SURE WHICH YOU NEED?',
        lines: [
          'This page is for <strong>pre-filled replacement pods</strong> \u2014 the snap-in cartridges that contain e-liquid and a coil.',
          'Need the <strong>rechargeable device</strong> that these pods fit into? Visit <a href="/products/Closed-Pod-Devices-c181465296">Closed Pod Vape Devices</a>.'
        ]
      }
    };

    var data = helpers[path];
    if (!data) return;

    var B = '\u2022';
    var html = '<p style="margin-bottom:0.3rem;"><strong>' + data.label + '</strong></p>';
    for (var i = 0; i < data.lines.length; i++) {
      html += '<p style="margin:0.15rem 0;">' + B + ' ' + data.lines[i] + '</p>';
    }

    var block = document.createElement('div');
    block.id = 'kvs-category-helper';
    block.style.cssText = 'max-width:960px;margin:0.5rem auto 1rem;padding:0.75rem 1rem;color:#ccc;font-size:0.95rem;line-height:1.6;border:1px solid #444;border-radius:6px;';
    block.innerHTML = html;

    // Insert after kvs-category-links if it exists, otherwise after .grid__description
    var linksBlock = document.getElementById('kvs-category-links');
    if (linksBlock) {
      linksBlock.parentElement.insertBefore(block, linksBlock.nextSibling);
      return;
    }
    var desc = document.querySelector('.grid__description');
    if (desc) {
      desc.parentElement.insertBefore(block, desc.nextSibling);
      return;
    }
    var grid = document.querySelector('.ec-store') || document.querySelector('[class*="product"]');
    if (grid) {
      grid.parentElement.insertBefore(block, grid);
    }
  }

  /* ──────────────────────────────────────
     18. BEST SELLERS
     Injects POS-driven best seller block
     on category pages (top 12 by 30-day
     unit sales from Lightspeed POS).
  ────────────────────────────────────── */
  function initBestSellers() {
    // Remove existing blocks (handles SPA navigation between categories)
    var path = window.location.pathname;
    var catMatch = path.match(/-c(\d+)$/);
    // Clean up any previous best seller/popular picks blocks
    var oldBS = document.querySelectorAll('[id^="kvs-bestsellers-"]');
    for (var r = 0; r < oldBS.length; r++) oldBS[r].remove();
    var oldPP = document.querySelectorAll('[id^="kvs-popularpicks-"]');
    for (var r2 = 0; r2 < oldPP.length; r2++) oldPP[r2].remove();

    if (!catMatch) return;
    var categoryId = catMatch[1];

    // Top 12 best sellers by 30-day POS unit sales, keyed by categoryId
    // @kvs-bestsellers-data-start
    var data = {
      '181457932': [
        ['/products/Vital-Freebase-p529163078', 'Vital [Freebase]'],
        ['/products/Juiced-Up-Freebase-p529154745', 'Juiced Up [Freebase]'],
        ['/products/Lemon-Drop-Freebase-p529155475', 'Lemon Drop [Freebase]'],
        ['/products/Black-Mamba-Freebase-p529149993', 'Black Mamba [Freebase]'],
        ['/products/Iced-Up-Freebase-p529159864', 'Iced Up [Freebase]'],
        ['/products/Vibe-by-KVS-Freebase-p567614891', 'Vibe by KVS [Freebase]'],
        ['/products/Banana-Bang-Freebase-p529165524', 'Banana Bang [Freebase]'],
        ['/products/Twelve-Monkeys-Freebase-p529160332', 'Twelve Monkeys [Freebase]'],
        ['/products/Flavour-Beast-eLiquid-Freebase-p719770896', 'Flavour Beast eLiquid [Freebase]'],
        ['/products/Blackwood-Freebase-p529163296', 'Blackwood [Freebase]'],
        ['/products/Kapow-Freebase-p529155490', 'Kapow [Freebase]'],
        ['/products/Lux-Freebase-p629426419', 'Lux [Freebase]']
      ],
      '181460122': [
        ['/products/Flavour-Beast-eLiquid-Salt-p559110534', 'Flavour Beast eLiquid [Salt]'],
        ['/products/Lemon-Drop-Salt-p529165536', 'Lemon Drop [Salt]'],
        ['/products/Juiced-Up-Salt-p529166002', 'Juiced Up [Salt]'],
        ['/products/Flavour-Beast-UNLEASHED-eLiquid-Salt-p647485921', 'Flavour Beast UNLEASHED eLiquid [Salt]'],
        ['/products/Flavour-Beast-GUSHIN-eLiquid-Salt-p809793477', 'Flavour Beast GUSHIN eLiquid [Salt]'],
        ['/products/Flavour-Beast-CHUGGIN-eLiquid-Salt-p689183051', 'Flavour Beast CHUGGIN eLiquid [Salt]'],
        ['/products/Flavour-Beast-SUPER-eLiquid-Salt-p689181000', 'Flavour Beast SUPER eLiquid [Salt]'],
        ['/products/Kapow-Salt-p529155481', 'Kapow [Salt]'],
        ['/products/Iced-Up-Salt-p529161570', 'Iced Up [Salt]'],
        ['/products/Suavae-Salt-p529154733', 'Suavae [Salt]'],
        ['/products/Naked-100-NKD100-Salt-p529155478', 'Naked 100 (NKD100) [Salt]'],
        ['/products/Blackwood-Salt-p529161568', 'Blackwood [Salt]']
      ],
      '181465541': [
        ['/products/Flavour-Beast-Pods-p529159837', 'Flavour Beast Pods'],
        ['/products/STLTH-Pods-p529163302', 'STLTH Pods'],
        ['/products/Flavour-Beast-LEVEL-X-G2-Disposable-Top-p772435733', 'Flavour Beast LEVEL X G2 Disposable Top'],
        ['/products/Allo-Pods-p529149977', 'Allo Pods'],
        ['/products/Rufpuf-RIPPER-X-Disposable-Top-p777590492', 'Rufpuf RIPPER X Disposable Top'],
        ['/products/Rufpuf-RIPPER-X-Intense-Disposable-Top-p750983258', 'Rufpuf RIPPER X Intense Disposable Top']
      ],
      '181465790': [
        ['/products/Fog-Formula-1600-Disposable-p564264046', 'Fog Formula 1600 Disposable'],
        ['/products/ABT-32-Hybrid-Disposable-p743634342', 'ABT 32 Hybrid Disposable'],
        ['/products/Fog-Formula-PRO-Disposable-p790975296', 'Fog Formula PRO Disposable'],
        ['/products/Rifbar-MIXPRO-Disposable-p796162346', 'Rifbar MIXPRO Disposable'],
        ['/products/Maskking-IceX-40k-p815813903', 'Maskking IceX 40k'],
        ['/products/Hi5-PRIME-Hybrid-Disposable-p726861181', 'Hi5 PRIME Hybrid Disposable'],
        ['/products/Flavour-Beast-HYDRA-18k-Disposable-p709597213', 'Flavour Beast HYDRA 18k Disposable'],
        ['/products/Vabeen-POLAR-BEAST-Disposable-p781112324', 'Vabeen POLAR BEAST Disposable'],
        ['/products/Vapmod-SNIPER-Disposable-p698017415', 'Vapmod SNIPER Disposable'],
        ['/products/Allo-ULTRA-25K-Disposable-p757019509', 'Allo ULTRA 25K Disposable'],
        ['/products/Hi5-SMOKELESS-Hybrid-Disposable-p749098340', 'Hi5 SMOKELESS Hybrid Disposable'],
        ['/products/Vice-CLICK-Disposable-p771069239', 'Vice CLICK Disposable']
      ],
      '181465794': [
        ['/products/VOOPOO-PNPx-Coils-p691278505', 'VOOPOO PNPx Coils'],
        ['/products/Smok-RPM2-Coil-x1-p529161545', 'Smok RPM2 Coil [x1]'],
        ['/products/Smok-RPM3-Coil-x1-p529155451', 'Smok RPM3 Coil [x1]'],
        ['/products/Smok-LP2-Coil-x1-p529163297', 'Smok LP2 Coil [x1]'],
        ['/products/Smok-LP1-Coil-x1-p529155477', 'Smok LP1 Coil [x1]'],
        ['/products/VooPoo-PNP-Coil-x1-p529161586', 'VooPoo PNP Coil [x1]'],
        ['/products/Smok-TFV9-Coil-x1-p529159840', 'Smok TFV9 Coil [x1]'],
        ['/products/Vaporesso-NRG-GT-GT-Core-Coil-x1-p529165528', 'Vaporesso NRG GT (GT Core) Coil [x1]'],
        ['/products/HorizonTech-AQUILA-Coil-x1-p529153955', 'HorizonTech AQUILA Coil [x1]'],
        ['/products/Smok-RPM-Coil-x1-p529154702', 'Smok RPM Coil [x1]'],
        ['/products/HorizonTech-SAKERZ-Replacement-Coil-x1-High-Performance-Options-p529153249', 'HorizonTech SAKERZ Replacement Coil (x1) — High-Performance Options'],
        ['/products/HorizonTech-FALCON-APV-Coil-x1-p589660501', 'HorizonTech FALCON APV Coil [x1]']
      ]
    };
    // @kvs-bestsellers-data-end

    var items = data[categoryId];
    // Truthfulness guard: need at least 3 POS-driven items to render
    if (!items || items.length < 3) return;

    var B = '\u2022';
    var blockStyle = 'max-width:960px;margin:0.75rem auto;padding:0 1rem;color:#ccc;font-size:0.95rem;line-height:1.6;';

    // Find insertion point: after .grid__description, before #kvs-category-links
    var anchor = document.getElementById('kvs-category-links');
    var desc = document.querySelector('.grid__description');
    var insertParent = null;
    var insertBefore = null;

    if (anchor) {
      insertParent = anchor.parentElement;
      insertBefore = anchor;
    } else if (desc) {
      insertParent = desc.parentElement;
      insertBefore = desc.nextSibling;
    } else {
      var grid = document.querySelector('.ec-store') || document.querySelector('[class*="product"]');
      if (grid) {
        insertParent = grid.parentElement;
        insertBefore = grid;
      }
    }
    if (!insertParent) return;

    var bsHtml = '<p style="margin-bottom:0.3rem;"><strong>BEST SELLERS (LAST 30 DAYS)</strong></p>';
    for (var i = 0; i < items.length; i++) {
      bsHtml += '<p style="margin:0.15rem 0;">' + B + ' <a href="' + items[i][0] + '">' + items[i][1] + '</a></p>';
    }
    var bsBlock = document.createElement('div');
    bsBlock.id = 'kvs-bestsellers-' + categoryId;
    bsBlock.style.cssText = blockStyle;
    bsBlock.innerHTML = bsHtml;
    insertParent.insertBefore(bsBlock, insertBefore);
  }

  /* ──────────────────────────────────────
     19. PRODUCT PAGE RELATED LINKS
     "Shop More Like This" internal links
     on product detail pages.
  ────────────────────────────────────── */

  var _relatedCache = {};

  function initProductRelatedLinks() {
    // Remove existing block (SPA-safe)
    var old = document.getElementById('kvs-related-links');
    if (old) old.remove();

    // Only on product pages: /products/<slug>-p<id>
    var path = window.location.pathname;
    var pdpMatch = path.match(/^\/products\/.+-p(\d+)$/i);
    if (!pdpMatch) return;
    var productId = pdpMatch[1];

    // Category map
    var CATS = {
      '181465790': { label: 'Disposables', url: '/products/Disposables-c181465790' },
      '181460122': { label: 'Salt Nic', url: '/products/Salt-Nic-c181460122' },
      '181457932': { label: 'Freebase', url: '/products/Freebase-c181457932' },
      '181465794': { label: 'Coils', url: '/products/Coils-c181465794' },
      '181465296': { label: 'Closed Pod Devices', url: '/products/Closed-Pod-Devices-c181465296' },
      '181465297': { label: 'Open Pod Devices', url: '/products/Open-Pod-Devices-c181465297' },
      '181465792': { label: 'Vape Hardware', url: '/products/Vape-Hardware-c181465792' },
      '181460125': { label: 'Replacements', url: '/products/Replacements-c181460125' }
    };

    // Get product info (from cache or DOM)
    var info = _relatedCache[productId];
    if (!info) {
      // Product name: prefer DOM title element, fall back to document.title
      var titleEl = document.querySelector('.product-details__product-title')
        || document.querySelector('.product-details h1')
        || document.querySelector('h1');
      var productName = '';
      if (titleEl && titleEl.textContent.trim()) {
        productName = titleEl.textContent.trim();
      } else {
        productName = (document.title || '').replace(/\s*[\|–—].*$/, '').trim();
      }

      // Category from breadcrumb (parse BEFORE inserting our block)
      var currentCatId = null;
      var bcLinks = document.querySelectorAll('.breadcrumbs a, .ec-breadcrumbs a, [class*="breadcrumb"] a');
      for (var b = 0; b < bcLinks.length; b++) {
        var href = bcLinks[b].getAttribute('href') || '';
        var cm = href.match(/-c(\d+)/);
        if (cm) currentCatId = cm[1];
      }

      info = { name: productName, catId: currentCatId };
      _relatedCache[productId] = info;
    }

    // Build links (max 6, no duplicates)
    var links = [];
    var seen = {};
    function addLink(url, label) {
      if (seen[url] || links.length >= 6) return;
      seen[url] = true;
      links.push([url, label]);
    }

    // 1. Primary category (from breadcrumb)
    if (info.catId && CATS[info.catId]) {
      addLink(CATS[info.catId].url, CATS[info.catId].label);
    }

    // 2. Replacements hub if product name matches keywords
    if (/coil|pod|cartridge|replacement|glass|tank/i.test(info.name)) {
      addLink('/products/Replacements-c181460125', 'Replacements');
    }

    // 3. Money categories (fill remaining slots, skip current + Open Pod Devices)
    var moneyOrder = ['181465790', '181460122', '181457932', '181465794', '181465296'];
    for (var m = 0; m < moneyOrder.length; m++) {
      if (moneyOrder[m] === info.catId) continue;
      addLink(CATS[moneyOrder[m]].url, CATS[moneyOrder[m]].label);
    }

    if (links.length === 0) return;

    // Render
    var B = '\u2022';
    var blockStyle = 'max-width:960px;margin:1rem auto;padding:0 1rem;color:#ccc;font-size:0.95rem;line-height:1.6;';
    var html = '<p style="margin-bottom:0.3rem;"><strong>SHOP MORE LIKE THIS</strong></p>';
    for (var j = 0; j < links.length; j++) {
      html += '<p style="margin:0.15rem 0;">' + B + ' <a href="' + links[j][0] + '">' + links[j][1] + '</a></p>';
    }

    var block = document.createElement('div');
    block.id = 'kvs-related-links';
    block.style.cssText = blockStyle;
    block.innerHTML = html;

    // Insertion: after purchase area > after product title > after description
    var purchaseArea = document.querySelector('.details-product-purchase');
    if (purchaseArea) {
      purchaseArea.parentElement.insertBefore(block, purchaseArea.nextSibling);
      return;
    }
    var titleBlock = document.querySelector('.product-details__product-title, .product-details h1');
    if (titleBlock) {
      var titleParent = titleBlock.parentElement;
      titleParent.insertBefore(block, titleBlock.nextSibling);
      return;
    }
    var descBlock = document.querySelector('[class*="product-details__description"]');
    if (descBlock) {
      descBlock.parentElement.insertBefore(block, descBlock.nextSibling);
    }
  }

  /* ──────────────────────────────────────
     16. SPA NAVIGATION WATCHER (was 15)
     Re-injects category blocks when the
     URL changes without a full reload.
  ────────────────────────────────────── */
  function watchCategoryNav() {
    var lastPath = window.location.pathname;
    setInterval(function() {
      var currentPath = window.location.pathname;
      if (currentPath !== lastPath) {
        lastPath = currentPath;
        initCategoryMeta();
        setTimeout(function() {
          initCategoryH1();
          initBestSellers();
          initCategoryLinks();
          initCategoryHelper();
          initProductRelatedLinks();
        }, 1500);
      }
    }, 1000);
  }

  /* ──────────────────────────────────────
     17. FIX STATIC SCHEMA — Patch Ecwid VapeShop → Store
  ────────────────────────────────────── */

  function fixStaticSchema() {
    if (window.location.pathname !== '/' && window.location.pathname !== '/home') return;
    var patched = false;
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(function(s) {
      if (s.id && s.id.indexOf('kvs-') === 0) return;
      try {
        var data = JSON.parse(s.textContent);
        var changed = false;
        if (data['@graph']) {
          data['@graph'].forEach(function(item) {
            if (item['@type'] === 'VapeShop') {
              item['@type'] = 'Store';
              changed = true;
            }
          });
        }
        if (data['@type'] === 'VapeShop') {
          data['@type'] = 'Store';
          changed = true;
        }
        if (changed) {
          s.textContent = JSON.stringify(data);
          patched = true;
        }
      } catch(e) {}
    });
    window.__KVS_SCHEMA_PATCHED__ = patched;
    // Post-patch verification: warn if any VapeShop survived
    var remaining = false;
    scripts.forEach(function(s) {
      if (s.textContent.indexOf('VapeShop') > -1) remaining = true;
    });
    if (remaining) {
      console.warn('[KVS] Schema patch incomplete: VapeShop still present');
    }
  }

  /* ──────────────────────────────────────
     INIT — Run everything
  ────────────────────────────────────── */

  // Age gate runs immediately
  initAgeGate();

  // Category meta runs immediately (modifies meta tags, no DOM rendering needed)
  initCategoryMeta();

  // Everything else waits for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initStockBadges();
      initTrustBadges();
      initGTMNoscript();
      // Delayed sections: wait for Instant Site tiles to render
      setTimeout(function() {
        fixKimberleyH1();
        initFAQSchema();
        initBreadcrumbSchema();
        initOrganizationSchema();
        initLocalBusinessSchema();
        initWebSiteSchema();
        initProductTitleSuffix();
        initCategoryH1();
        initBestSellers();
        initCategoryLinks();
        initCategoryHelper();
        initProductRelatedLinks();
        fixStaticSchema();
        watchCategoryNav();
      }, 2500);
    });
  } else {
    initStockBadges();
    initTrustBadges();
    initGTMNoscript();
    setTimeout(function() {
      fixKimberleyH1();
      initFAQSchema();
      initBreadcrumbSchema();
      initOrganizationSchema();
      initLocalBusinessSchema();
      initWebSiteSchema();
      initProductTitleSuffix();
      initCategoryH1();
      initBestSellers();
      initCategoryLinks();
      initCategoryHelper();
      initProductRelatedLinks();
      fixStaticSchema();
      watchCategoryNav();
    }, 2500);
  }

  // Runtime version marker
  window.__KVS_VERSION__ = '3.1.11';

})();
