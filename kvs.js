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
     5. MAILCHIMP POPUP (mc.js)
  ────────────────────────────────────── */
  function initMailchimp() {
    !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/967dfb1988c0dce580a3462f1/27a7a21cddeb06fe4c455de67.js");
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
    });
  } else {
    initStockBadges();
    initTrustBadges();
    initGTMNoscript();
    initMailchimp();
  }
})();
