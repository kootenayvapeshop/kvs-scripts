/* ============================================================
   KVS — Site Scripts v1.0
   External JS for Kootenay Vape Shops
   Loaded via: <script src="https://cdn.jsdelivr.net/gh/USERNAME/kvs-scripts/kvs.js"></script>
   
   Contains:
   1. Age Verification Gate (19+ BC requirement)
   2. Stock Urgency Badges (product pages)
   3. Trust Badges (product pages)
   4. Google Tag Manager (noscript fallback injected)
   5. Mailchimp Popup (mc.js loader)
   6. "We Ship To" footer bar (province links)
   7. Shipping Eligibility Guard (cart/checkout banner)
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
        stockEl.textContent = '\uD83D\uDD25 Only ' + qty + ' left — order soon!';
      } else if (qty <= 5) {
        stockEl.className += ' kvs-low-stock';
        stockEl.textContent = '\u26A1 Only ' + qty + ' left in stock';
      } else {
        stockEl.className += ' kvs-in-stock';
        stockEl.textContent = '\u2713 In stock — ' + qty + ' available';
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
     5. MAILCHIMP POPUP (mc.js)
  ────────────────────────────────────── */
  function initMailchimp() {
    !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/967dfb1988c0dce580a3462f1/27a7a21cddeb06fe4c455de67.js");
  }
  /* ──────────────────────────────────────
     6. "WE SHIP TO" FOOTER BAR
     Injects a shipping-links strip above
     the legal/policy footer on every page.
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
     7. SHIPPING ELIGIBILITY GUARD
     Shows a banner on cart/checkout pages
     reminding users which provinces we
     ship nicotine products to.
     Dismissible per session.
  ────────────────────────────────────── */
  function initShippingGuard() {
    // Only show on cart/checkout pages
    var href = window.location.href;
    var isCartPage = href.indexOf('/cart') !== -1 ||
                     href.indexOf('#!/~/cart') !== -1;
    var isCheckout = href.indexOf('/checkout') !== -1 ||
                     href.indexOf('#!/~/checkout') !== -1;

    if (!isCartPage && !isCheckout) return;

    // Check if user dismissed it this session
    try {
      if (sessionStorage.getItem('kvs_shipping_banner_dismissed')) return;
    } catch (e) { /* sessionStorage blocked — show banner anyway */ }

    // Inject styles
    var style = document.createElement('style');
    style.textContent = [
      '#kvs-shipping-banner{background:linear-gradient(135deg,rgba(155,45,255,0.12),rgba(0,212,255,0.08));border:1px solid rgba(155,45,255,0.25);border-radius:10px;padding:0;margin:1rem auto;max-width:960px;font-family:"Barlow","Arial",sans-serif;font-size:0.88rem;line-height:1.6;color:rgba(200,200,220,0.9);}',
      '#kvs-shipping-banner-inner{padding:1rem 1.5rem;position:relative;padding-right:3rem;}',
      '#kvs-shipping-banner a{color:#00d4ff;text-decoration:underline;}',
      '#kvs-shipping-banner strong{color:#ffffff;}',
      '#kvs-shipping-banner-close{position:absolute;top:0.75rem;right:1rem;background:none;border:none;color:rgba(144,144,176,0.6);font-size:1.3rem;cursor:pointer;padding:0.25rem;line-height:1;}',
      '#kvs-shipping-banner-close:hover{color:#ffffff;}'
    ].join('');
    document.head.appendChild(style);

    // Create the banner
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

    // Wait for cart area to appear then insert
    var checkInterval = setInterval(function() {
      var cartArea = document.querySelector('.ec-cart') ||
                     document.querySelector('.ec-cart__body') ||
                     document.querySelector('[class*="cart"]') ||
                     document.querySelector('main') ||
                     document.querySelector('.ec-store');
      if (!cartArea) return;
      clearInterval(checkInterval);
      cartArea.parentNode.insertBefore(banner, cartArea);

      // Close button handler
      document.getElementById('kvs-shipping-banner-close').addEventListener('click', function() {
        banner.style.display = 'none';
        try {
          sessionStorage.setItem('kvs_shipping_banner_dismissed', '1');
        } catch (e) { /* sessionStorage blocked */ }
      });
    }, 500);

    // Stop trying after 15 seconds
    setTimeout(function() { clearInterval(checkInterval); }, 15000);
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
      initMailchimp();
      initShippingBar();
      initShippingGuard();
    });
  } else {
    initStockBadges();
    initTrustBadges();
    initGTMNoscript();
    initMailchimp();
    initShippingBar();
    initShippingGuard();
  }
})();
