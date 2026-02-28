/* ============================================================
   KVS — Site Scripts v2.1
   External JS for Kootenay Vape Shops
   Loaded via: <script src="https://cdn.jsdelivr.net/gh/kootenayvapeshop/kvs-scripts@main/kvs.js"></script>

   Contains:
    1.  Age Verification Gate (19+ requirement)
    2.  Stock Urgency Badges (product pages) — UPDATED: SPA-aware
    3.  Trust Badges (product pages) — UPDATED: SPA-aware, stale cleanup
    4.  Google Tag Manager (noscript fallback injected)
    5.  Mailchimp Popup (mc.js loader)
    6.  "We Ship To" footer bar (province links)
    7.  Shipping Eligibility Guard (cart/checkout banner) — UPDATED: repositioned above cart
    8.  Sold-Out Variant Auto-Selection (product pages) — UPDATED: label-based detection, SPA-aware
    9.  Sticky Add-to-Cart Bar (mobile product pages)
   10.  Shipping Estimate Note (cart page)
   11.  Empty Search Recovery (search results)
   12.  Accessibility Fixes (focus outlines, contrast)
   13.  Ecwid SPA Page Hooks — NEW: re-fires features on SPA navigation

   v2.1 CHANGELOG:
   - FIX: Trust badges, stock badges, variant auto-select, and sticky ATC
     now re-fire on Ecwid SPA navigation (category → product clicks).
     Root cause: Ecwid uses SPA routing, so DOMContentLoaded only fires once.
   - FIX: Variant auto-select uses Ecwid's "- Sold out" option labels
     instead of waiting for stock text to update (faster, more reliable).
   - FIX: Trust badges remove stale badges before re-injecting on new product.
   - FIX: Variant auto-select also checks second dropdown (Strength) after
     switching the first dropdown (Flavour).
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
     2. STOCK URGENCY BADGES (v2.1)
     Rewrites "In stock: X available" text
     with color-coded urgency messaging.
     CSS classes defined in Custom CSS.
     v2.1: Re-fires on SPA navigation via
     Ecwid.OnPageLoaded hook.
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
        stockEl.textContent = '\uD83D\uDD25 Only ' + qty + ' left — order soon!';
      } else if (qty <= 5) {
        stockEl.className += ' kvs-low-stock';
        stockEl.textContent = '\u26A1 Only ' + qty + ' left in stock';
      } else {
        stockEl.className += ' kvs-in-stock';
        stockEl.textContent = '\u2713 In stock — ' + qty + ' available';
      }
    }, 500);
    setTimeout(function() { clearInterval(checkInterval); }, 15000);
  }

  /* ──────────────────────────────────────
     3. TRUST BADGES (v2.1)
     Injects trust indicators below the
     Add to Bag button on product pages.
     v2.1 FIX: Removes stale badges from
     previous product on SPA navigation
     before re-injecting. Re-fires via
     Ecwid.OnPageLoaded hook.
     ────────────────────────────────────── */

  function initTrustBadges() {
    // v2.1: Remove stale badges from previous product (SPA navigation)
    var old = document.querySelector('.kvs-trust-badges');
    if (old) old.remove();

    var checkInterval = setInterval(function() {
      // Don't double-inject
      if (document.querySelector('.kvs-trust-badges')) {
        clearInterval(checkInterval);
        return;
      }

      // Try multiple selectors to find the purchase area
      // Different Ecwid layouts use different class names
      var purchaseArea = null;
      var selectors = [
        '.details-product-purchase__add-to-bag',
        '.details-product-purchase',
        '[class*="product-purchase"]',
        '.product-details-module'
      ];

      for (var i = 0; i < selectors.length; i++) {
        var el = document.querySelector(selectors[i]);
        if (el) {
          // For button-level selectors, walk up to the container
          if (selectors[i].indexOf('add-to-bag') !== -1 || selectors[i].indexOf('button') !== -1) {
            purchaseArea = el.closest('.details-product-purchase') ||
                           el.closest('[class*="product-purchase"]') ||
                           el.parentElement;
          } else {
            purchaseArea = el;
          }
          break;
        }
      }

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

      // Insert after the purchase area
      if (purchaseArea.nextSibling) {
        purchaseArea.parentNode.insertBefore(badges, purchaseArea.nextSibling);
      } else {
        purchaseArea.parentNode.appendChild(badges);
      }
    }, 500);
    setTimeout(function() { clearInterval(checkInterval); }, 15000);
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
     5. MAILCHIMP POPUP (mc.js)
     ────────────────────────────────────── */

  function initMailchimp() {
    !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/967dfb1988c0dce580a3462f1/27a7a21cddeb06fe4c455de67.js");
  }

  /* ──────────────────────────────────────
     6. "WE SHIP TO" FOOTER BAR
     ────────────────────────────────────── */

  function initShippingBar() {
    if (document.getElementById('kvs-ship-bar')) return;

    var bar = document.createElement('div');
    bar.id = 'kvs-ship-bar';
    bar.innerHTML = [
      '<div id="kvs-ship-bar-inner">',
        '<strong>We Ship Across Canada</strong>',
        '<span class="kvs-ship-links">',
          '<a href="/ship-to-british-columbia-vape">British Columbia</a>',
          '<span class="kvs-ship-sep">|</span>',
          '<a href="/ship-to-saskatchewan-vape">Saskatchewan</a>',
          '<span class="kvs-ship-sep">|</span>',
          '<a href="/ship-to-nova-scotia-vape">Nova Scotia</a>',
          '<span class="kvs-ship-sep">|</span>',
          '<a href="/ship-to-newfoundland-labrador-vape">Newfoundland & Labrador</a>',
          '<span class="kvs-ship-sep">|</span>',
          '<a href="/shipping-eligibility-canada">Full Shipping Info</a>',
        '</span>',
      '</div>'
    ].join('');

    var style = document.createElement('style');
    style.textContent = [
      '#kvs-ship-bar{background:linear-gradient(135deg,rgba(14,14,26,0.95),rgba(20,20,40,0.95));border-top:1px solid rgba(155,45,255,0.25);border-bottom:1px solid rgba(155,45,255,0.25);padding:0;margin:0;font-family:"Barlow","Arial",sans-serif;}',
      '#kvs-ship-bar-inner{max-width:1200px;margin:0 auto;padding:1rem 1.5rem;text-align:center;}',
      '#kvs-ship-bar strong{display:block;font-family:"Bebas Neue","Arial Narrow",sans-serif;font-size:1.1rem;letter-spacing:0.06em;background:linear-gradient(135deg,#00d4ff,#9b2dff,#ff2d9b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:0.5rem;}',
      '.kvs-ship-links{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.25rem 0;}',
      '.kvs-ship-links a{color:rgba(200,200,220,0.85);font-size:0.82rem;text-decoration:none;padding:0.15rem 0.5rem;transition:color 0.2s;}',
      '.kvs-ship-links a:hover{color:#00d4ff;}',
      '.kvs-ship-sep{color:rgba(155,45,255,0.35);font-size:0.75rem;padding:0 0.15rem;}',
      '@media(max-width:600px){.kvs-ship-links{gap:0.1rem 0;}.kvs-ship-links a{font-size:0.78rem;padding:0.15rem 0.35rem;}.kvs-ship-sep{padding:0 0.05rem;}}'
    ].join('');
    document.head.appendChild(style);

    var footer = document.querySelector('.ec-footer') ||
                 document.querySelector('footer') ||
                 document.querySelector('[class*="footer"]');
    if (footer) {
      footer.parentNode.insertBefore(bar, footer);
    } else {
      document.body.appendChild(bar);
    }
  }

  /* ──────────────────────────────────────
     7. SHIPPING ELIGIBILITY GUARD (v2.0)
     Shows a banner on cart/checkout pages.
     v2.0: Inserts ABOVE cart area.
     ────────────────────────────────────── */

  function initShippingGuard() {
    var href = window.location.href;
    var isCartPage = href.indexOf('/cart') !== -1 || href.indexOf('#!/~/cart') !== -1;
    var isCheckout = href.indexOf('/checkout') !== -1 || href.indexOf('#!/~/checkout') !== -1;
    if (!isCartPage && !isCheckout) return;

    // Don't duplicate
    if (document.getElementById('kvs-shipping-banner')) return;

    try {
      if (sessionStorage.getItem('kvs_shipping_banner_dismissed')) return;
    } catch (e) {}

    var style = document.createElement('style');
    style.textContent = [
      '#kvs-shipping-banner{background:linear-gradient(135deg,rgba(155,45,255,0.12),rgba(0,212,255,0.08));border:1px solid rgba(155,45,255,0.25);border-radius:10px;padding:0;margin:1rem auto;max-width:960px;width:calc(100% - 2rem);box-sizing:border-box;font-family:"Barlow","Arial",sans-serif;font-size:0.88rem;line-height:1.6;color:rgba(200,200,220,0.9);word-wrap:break-word;overflow-wrap:break-word;}',
      '#kvs-shipping-banner-inner{padding:1rem 1.5rem;position:relative;padding-right:3rem;}',
      '#kvs-shipping-banner a{color:#00d4ff;text-decoration:underline;}',
      '#kvs-shipping-banner strong{color:#ffffff;}',
      '#kvs-shipping-banner-close{position:absolute;top:0.75rem;right:0.75rem;background:none;border:none;color:rgba(144,144,176,0.6);font-size:1.5rem;cursor:pointer;padding:0.5rem;line-height:1;}',
      '#kvs-shipping-banner-close:hover{color:#ffffff;}',
      '@media(max-width:600px){#kvs-shipping-banner{margin:0.75rem auto;font-size:0.8rem;border-radius:8px;}#kvs-shipping-banner-inner{padding:0.75rem 1rem;padding-right:2.5rem;}#kvs-shipping-banner-close{top:0.5rem;right:0.5rem;font-size:1.4rem;}}'
    ].join('');
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.id = 'kvs-shipping-banner';
    banner.innerHTML = [
      '<div id="kvs-shipping-banner-inner">',
        '<strong>Shipping Note:</strong> ',
        'Nicotine products (e-liquid, disposables, pods) ship to <strong>BC, Saskatchewan, Nova Scotia &amp; Newfoundland</strong> only. ',
        'Non-nicotine items (hardware, coils, accessories) ship Canada-wide. ',
        '<a href="/shipping-eligibility-canada">Full details \u2192</a>',
        '<button id="kvs-shipping-banner-close" aria-label="Close">&times;</button>',
      '</div>'
    ].join('');

    var checkInterval = setInterval(function() {
      var cartArea = document.querySelector('.ec-cart') ||
                     document.querySelector('.ec-cart__body') ||
                     document.querySelector('.ec-store__cart-page') ||
                     document.querySelector('.ec-store');
      if (!cartArea) return;
      clearInterval(checkInterval);

      // v2.0: Insert BEFORE (above) the cart area
      cartArea.parentNode.insertBefore(banner, cartArea);

      document.getElementById('kvs-shipping-banner-close').addEventListener('click', function() {
        banner.style.display = 'none';
        try { sessionStorage.setItem('kvs_shipping_banner_dismissed', '1'); } catch (e) {}
      });
    }, 500);
    setTimeout(function() { clearInterval(checkInterval); }, 15000);
  }

  /* ──────────────────────────────────────
     8. SOLD-OUT VARIANT AUTO-SELECTION (v2.1)
     If the default variant is sold out,
     auto-selects the first in-stock variant.

     v2.1 CHANGES:
     - Uses Ecwid's "- Sold out" option label
       text for faster, more reliable detection
       (no need to wait for stock text to update)
     - Checks second dropdown (Strength) after
       switching first dropdown (Flavour)
     - Skips "Please choose" placeholder options
     - Re-fires on SPA navigation via hook
     ────────────────────────────────────── */

  function initVariantAutoSelect() {
    var attempts = 0;
    var maxAttempts = 30;

    var checkInterval = setInterval(function() {
      attempts++;
      if (attempts > maxAttempts) { clearInterval(checkInterval); return; }

      // Find variant dropdowns
      var selects = document.querySelectorAll(
        '.product-details__product-options select, ' +
        '.details-product-options select, ' +
        '.product-details-module select'
      );
      if (selects.length === 0) return;

      // Check if current selection is sold out
      // Method 1: The selected option label contains "- Sold out"
      var primarySelect = selects[0];
      var selectedOption = primarySelect.options[primarySelect.selectedIndex];
      var isSoldOutLabel = selectedOption && /sold out/i.test(selectedOption.text);

      // Method 2: Stock text says "out of stock" or "sold out"
      var stockEl = document.querySelector('.details-product-purchase__place span');
      var isSoldOutText = stockEl && /out of stock|sold out/i.test(stockEl.textContent);

      if (!isSoldOutLabel && !isSoldOutText) return; // Current variant is in stock

      clearInterval(checkInterval);

      // Find the first in-stock option in the primary dropdown
      var options = primarySelect.options;

      for (var i = 0; i < options.length; i++) {
        if (i === primarySelect.selectedIndex) continue; // Skip current
        if (/sold out/i.test(options[i].text)) continue; // Skip sold-out options
        if (/please choose/i.test(options[i].text)) continue; // Skip placeholder

        // This option doesn't say "Sold out" — select it
        primarySelect.selectedIndex = i;
        primarySelect.dispatchEvent(new Event('change', { bubbles: true }));

        // After selecting a new flavour, check if strength also needs adjustment
        if (selects.length > 1) {
          setTimeout(function() {
            var secondSelect = selects[1];
            var secondSelected = secondSelect.options[secondSelect.selectedIndex];
            if (secondSelected && /sold out/i.test(secondSelected.text)) {
              for (var j = 0; j < secondSelect.options.length; j++) {
                if (j === secondSelect.selectedIndex) continue;
                if (!/sold out/i.test(secondSelect.options[j].text)) {
                  secondSelect.selectedIndex = j;
                  secondSelect.dispatchEvent(new Event('change', { bubbles: true }));
                  break;
                }
              }
            }
          }, 800);
        }

        return; // Done — found an in-stock variant
      }
      // If we get here, ALL variants are sold out — nothing we can do
    }, 600);
    setTimeout(function() { clearInterval(checkInterval); }, 20000);
  }

  /* ──────────────────────────────────────
     9. STICKY ADD-TO-CART BAR — MOBILE
     Fixed bottom bar with price + ATC
     when native button scrolls out of view.
     Only activates on viewports < 768px.
     ────────────────────────────────────── */

  function initStickyATC() {
    if (window.innerWidth >= 768) return;

    // v2.1: Don't duplicate on SPA navigation
    var existing = document.getElementById('kvs-sticky-atc');
    if (existing) existing.remove();

    var style = document.createElement('style');
    style.textContent = [
      '#kvs-sticky-atc{position:fixed;bottom:0;left:0;right:0;z-index:9998;background:linear-gradient(160deg,#0e0e1a,#141428);border-top:1px solid rgba(155,45,255,0.35);padding:0.65rem 1rem;display:flex;align-items:center;justify-content:space-between;gap:0.75rem;font-family:"Barlow","Arial",sans-serif;transform:translateY(100%);transition:transform 0.3s ease;box-shadow:0 -4px 20px rgba(0,0,0,0.5);}',
      '#kvs-sticky-atc.kvs-sticky-visible{transform:translateY(0);}',
      '#kvs-sticky-atc-info{flex:1;min-width:0;overflow:hidden;}',
      '#kvs-sticky-atc-name{font-size:0.78rem;color:rgba(200,200,220,0.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:0.15rem;}',
      '#kvs-sticky-atc-price{font-size:1.1rem;font-weight:700;color:#ffffff;}',
      '#kvs-sticky-atc-btn{flex-shrink:0;background:linear-gradient(135deg,#00d4ff,#9b2dff,#ff2d9b);color:#ffffff;border:none;border-radius:50px;padding:0.7rem 1.5rem;font-family:"Barlow","Arial",sans-serif;font-weight:700;font-size:0.85rem;letter-spacing:0.04em;text-transform:uppercase;cursor:pointer;white-space:nowrap;box-shadow:0 4px 15px rgba(155,45,255,0.4);}',
      '#kvs-sticky-atc-btn:active{transform:scale(0.97);}',
      '#kvs-sticky-atc-btn.kvs-sticky-disabled{opacity:0.4;pointer-events:none;}'
    ].join('');
    document.head.appendChild(style);

    var attempts = 0;
    var checkInterval = setInterval(function() {
      attempts++;
      if (attempts > 40) { clearInterval(checkInterval); return; }

      var nativeBtn = document.querySelector('.details-product-purchase__add-to-bag .form-control__button--add-to-bag') ||
                      document.querySelector('.details-product-purchase__add-to-bag button') ||
                      document.querySelector('[class*="add-to-bag"] button');
      if (!nativeBtn) return;

      var nameEl = document.querySelector('.product-details__product-title') ||
                   document.querySelector('[class*="product-title"]') ||
                   document.querySelector('h1');
      var priceEl = document.querySelector('.details-product-purchase__price .ec-price-item') ||
                    document.querySelector('.details-product-purchase__price');
      if (!nameEl || !priceEl) return;

      clearInterval(checkInterval);

      var bar = document.createElement('div');
      bar.id = 'kvs-sticky-atc';
      bar.innerHTML = [
        '<div id="kvs-sticky-atc-info">',
          '<div id="kvs-sticky-atc-name"></div>',
          '<div id="kvs-sticky-atc-price"></div>',
        '</div>',
        '<button id="kvs-sticky-atc-btn">Add to Bag</button>'
      ].join('');
      document.body.appendChild(bar);

      var stickyName = document.getElementById('kvs-sticky-atc-name');
      var stickyPrice = document.getElementById('kvs-sticky-atc-price');
      var stickyBtn = document.getElementById('kvs-sticky-atc-btn');

      function updateInfo() {
        stickyName.textContent = nameEl.textContent.trim();
        var currentPrice = document.querySelector('.details-product-purchase__price .ec-price-item') ||
                           document.querySelector('.details-product-purchase__price');
        if (currentPrice) stickyPrice.textContent = currentPrice.textContent.trim();

        var stockEl = document.querySelector('.details-product-purchase__place span');
        if (stockEl && /out of stock|sold out/i.test(stockEl.textContent)) {
          stickyBtn.classList.add('kvs-sticky-disabled');
          stickyBtn.textContent = 'Sold Out';
        } else {
          stickyBtn.classList.remove('kvs-sticky-disabled');
          stickyBtn.textContent = 'Add to Bag';
        }
      }
      updateInfo();

      // Watch for variant changes to update price/stock
      var observer = new MutationObserver(function() { setTimeout(updateInfo, 300); });
      var purchaseArea = nativeBtn.closest('.details-product-purchase') || nativeBtn.parentElement.parentElement;
      if (purchaseArea) {
        observer.observe(purchaseArea, { childList: true, subtree: true, characterData: true });
      }

      // Click triggers the real ATC button
      stickyBtn.addEventListener('click', function() {
        if (stickyBtn.classList.contains('kvs-sticky-disabled')) return;
        nativeBtn.click();
      });

      // Show/hide via IntersectionObserver
      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            bar.classList.remove('kvs-sticky-visible');
          } else {
            bar.classList.add('kvs-sticky-visible');
          }
        });
      }, { threshold: 0 });
      io.observe(nativeBtn);
    }, 750);
  }

  /* ──────────────────────────────────────
     10. SHIPPING ESTIMATE NOTE — CART
     "Shipping calculated at checkout" note
     near the subtotal to reduce abandonment.
     ────────────────────────────────────── */

  function initShippingEstimate() {
    var href = window.location.href;
    if (href.indexOf('/cart') === -1 && href.indexOf('#!/~/cart') === -1) return;

    // Don't duplicate
    if (document.getElementById('kvs-shipping-note')) return;

    var style = document.createElement('style');
    style.textContent = [
      '#kvs-shipping-note{background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.15);border-radius:8px;padding:0.6rem 1rem;margin:0.75rem 0;font-family:"Barlow","Arial",sans-serif;font-size:0.82rem;color:rgba(200,200,220,0.85);text-align:center;line-height:1.5;}',
      '#kvs-shipping-note strong{color:#00d4ff;}',
      '#kvs-shipping-note a{color:#00d4ff;text-decoration:underline;}'
    ].join('');
    document.head.appendChild(style);

    var checkInterval = setInterval(function() {
      if (document.getElementById('kvs-shipping-note')) { clearInterval(checkInterval); return; }

      var summaryArea = document.querySelector('.ec-cart__sidebar') ||
                        document.querySelector('.ec-cart-summary') ||
                        document.querySelector('.ec-cart__body-inner') ||
                        document.querySelector('[class*="cart-summary"]');
      if (!summaryArea) {
        var subtotalEl = document.querySelector('[class*="cart__total"]');
        if (subtotalEl) summaryArea = subtotalEl.parentElement;
      }
      if (!summaryArea) return;

      clearInterval(checkInterval);

      var note = document.createElement('div');
      note.id = 'kvs-shipping-note';
      note.innerHTML = '<strong>\uD83D\uDCE6 Shipping</strong> calculated at the next step based on your address and order weight. ' +
                        '<a href="/shipping-eligibility-canada">See where we ship \u2192</a>';

      var checkoutBtn = summaryArea.querySelector('[class*="checkout"]') ||
                        summaryArea.querySelector('button');
      if (checkoutBtn) {
        checkoutBtn.parentNode.insertBefore(note, checkoutBtn);
      } else {
        summaryArea.appendChild(note);
      }
    }, 800);
    setTimeout(function() { clearInterval(checkInterval); }, 15000);
  }

  /* ──────────────────────────────────────
     11. EMPTY SEARCH RECOVERY
     When search returns zero results, injects
     links to popular categories.
     ────────────────────────────────────── */

  function initSearchRecovery() {
    if (window.location.href.indexOf('/search') === -1) return;

    // Don't duplicate
    if (document.getElementById('kvs-search-recovery')) return;

    var style = document.createElement('style');
    style.textContent = [
      '#kvs-search-recovery{background:linear-gradient(135deg,rgba(155,45,255,0.08),rgba(0,212,255,0.05));border:1px solid rgba(155,45,255,0.2);border-radius:12px;padding:1.5rem;margin:1.5rem auto;max-width:600px;text-align:center;font-family:"Barlow","Arial",sans-serif;}',
      '#kvs-search-recovery h3{font-family:"Bebas Neue","Arial Narrow",sans-serif;font-size:1.3rem;letter-spacing:0.04em;color:#ffffff;margin:0 0 0.75rem 0;}',
      '#kvs-search-recovery p{font-size:0.85rem;color:rgba(200,200,220,0.8);margin:0 0 1rem 0;line-height:1.5;}',
      '.kvs-search-links{display:flex;flex-wrap:wrap;justify-content:center;gap:0.5rem;}',
      '.kvs-search-links a{display:inline-block;background:rgba(155,45,255,0.15);border:1px solid rgba(155,45,255,0.3);border-radius:50px;padding:0.45rem 1rem;color:rgba(240,240,255,0.9);font-size:0.82rem;text-decoration:none;transition:background 0.2s,border-color 0.2s;}',
      '.kvs-search-links a:hover{background:rgba(155,45,255,0.3);border-color:rgba(155,45,255,0.5);}'
    ].join('');
    document.head.appendChild(style);

    var checkInterval = setInterval(function() {
      if (document.getElementById('kvs-search-recovery')) { clearInterval(checkInterval); return; }

      var noResults = document.querySelector('.ec-search--no-results') ||
                      document.querySelector('[class*="search--no-results"]') ||
                      document.querySelector('.grid__no-products-found');
      if (!noResults) {
        var breadcrumb = document.querySelector('.ec-breadcrumbs');
        if (breadcrumb && /no matches/i.test(breadcrumb.textContent)) {
          noResults = breadcrumb;
        }
      }
      if (!noResults) return;

      clearInterval(checkInterval);

      var recovery = document.createElement('div');
      recovery.id = 'kvs-search-recovery';
      recovery.innerHTML = [
        '<h3>Try Browsing Our Categories</h3>',
        '<p>We might have what you\'re looking for under a different name.</p>',
        '<div class="kvs-search-links">',
          '<a href="/products/e-Liquid-&-Disposables-c181465295">E-Liquid (Salt)</a>',
          '<a href="/products/e-Liquid-&-Disposables-c181465295">E-Liquid (Freebase)</a>',
          '<a href="/products/e-Liquid-&-Disposables-c181465295">Disposables</a>',
          '<a href="/products/Vape-Hardware-c181465792">Hardware & Kits</a>',
          '<a href="/products/Vape-Hardware-c181465792">Coils & Pods</a>',
          '<a href="/products/420-c181460866">Accessories</a>',
        '</div>'
      ].join('');

      noResults.parentNode.insertBefore(recovery, noResults.nextSibling);
    }, 1000);
    setTimeout(function() { clearInterval(checkInterval); }, 20000);
  }

  /* ──────────────────────────────────────
     12. ACCESSIBILITY FIXES
     Restores focus outlines and improves
     contrast. WCAG 2.4.7 + 1.4.3.
     ────────────────────────────────────── */

  function initAccessibilityFixes() {
    var style = document.createElement('style');
    style.textContent = [
      '*:focus-visible{outline:2px solid #00d4ff !important;outline-offset:2px !important;}',
      'a:focus-visible,button:focus-visible,select:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid #00d4ff !important;outline-offset:2px !important;}',
      '*:focus:not(:focus-visible){outline:none !important;}'
    ].join('');
    document.head.appendChild(style);
  }

  /* ──────────────────────────────────────
     13. ECWID SPA PAGE HOOKS (NEW v2.1)
     Ecwid uses SPA-style navigation —
     clicking from category → product doesn't
     trigger a full page reload. This hook
     listens for Ecwid page changes and
     re-fires product-page features.
     ────────────────────────────────────── */

  function initEcwidPageHooks() {
    if (typeof Ecwid === 'undefined' || !Ecwid.OnPageLoaded) {
      // Ecwid not loaded yet — retry up to 10 seconds
      if (!initEcwidPageHooks._retries) initEcwidPageHooks._retries = 0;
      initEcwidPageHooks._retries++;
      if (initEcwidPageHooks._retries < 20) {
        setTimeout(initEcwidPageHooks, 500);
      }
      return;
    }

    Ecwid.OnPageLoaded.add(function(page) {
      if (page.type === 'PRODUCT') {
        // Re-fire all product-page features
        initTrustBadges();
        initStockBadges();
        initVariantAutoSelect();
        initStickyATC();
      }

      if (page.type === 'CART') {
        initShippingGuard();
        initShippingEstimate();
      }

      if (page.type === 'SEARCH') {
        initSearchRecovery();
      }
    });
  }

  /* ──────────────────────────────────────
     INIT — Run everything
     ────────────────────────────────────── */

  initAgeGate();
  initAccessibilityFixes();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initStockBadges();
      initTrustBadges();
      initGTMNoscript();
      initMailchimp();
      initShippingBar();
      initShippingGuard();
      initVariantAutoSelect();
      initStickyATC();
      initShippingEstimate();
      initSearchRecovery();
      initEcwidPageHooks();
    });
  } else {
    initStockBadges();
    initTrustBadges();
    initGTMNoscript();
    initMailchimp();
    initShippingBar();
    initShippingGuard();
    initVariantAutoSelect();
    initStickyATC();
    initShippingEstimate();
    initSearchRecovery();
    initEcwidPageHooks();
  }

})();
