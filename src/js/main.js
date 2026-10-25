import { PRODUCTS } from '../data/products.js';
import { JOURNAL_POSTS } from '../data/journal.js';
import { store } from './state.js';
import { initParticles } from './particles.js';
import { CartDrawer } from './cartDrawer.js';
import { CheckoutModal } from './checkoutModal.js';
import { BookingSystem } from './bookingSystem.js';
import { QuickViewModal } from './quickViewModal.js';
import { JournalModal } from './journalModal.js';
import { SearchModal } from './searchModal.js';
import { themeEngine } from './themeEngine.js';
import { i18n } from '../i18n/i18nEngine.js';
import { sendToFacebook } from './brand.js';
import { initSoundPlayer } from './soundPlayer.js';
import { PakalBotWidget } from './pakalBotWidget.js';
import { initObsidianMirror } from './obsidianMirrorEngine.js';

document.addEventListener('DOMContentLoaded', () => {
  // 0. Motor de tema (claro/oscuro) y sistema i18n
  themeEngine.init();
  i18n.init();

  // 0B. Música de Fondo Oficial: "Arte Xibalbá.mp3"
  initSoundPlayer();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetLang = btn.dataset.lang;
      if (targetLang) i18n.setLanguage(targetLang);
    });
  });

  // 1. Canvas de partículas del Hero con atmósfera de jade y oro
  initParticles('particles-canvas');

  // 1B. Espejo de Obsidiana Interactivo (Motor Original con 2400 partículas y Oráculo Tolteca)
  initObsidianMirror();

  // 2. Modales y drawers
  let checkoutModal;
  const cartDrawer = new CartDrawer(() => {
    if (checkoutModal) checkoutModal.open();
  });
  checkoutModal = new CheckoutModal();
  new BookingSystem();
  const quickViewModal = new QuickViewModal(() => cartDrawer.open());
  const journalModal = new JournalModal();
  new SearchModal(
    (prodId) => quickViewModal.open(prodId),
    (postId) => journalModal.open(postId)
  );

  // 2B. Asistente Virtual / Bot PAKAL TUN
  const pakalBot = new PakalBotWidget({
    onOpenProduct: (prodId) => quickViewModal.open(prodId),
    onAddToCart: (prod) => {
      store.addToCart(prod);
      cartDrawer.open();
    }
  });
  window.pakalBot = pakalBot;

  // 3. Header: detección de scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 40);
  });

  // 4. Menú móvil
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileClose = document.getElementById('mobile-nav-close');

  mobileToggle?.addEventListener('click', () => {
    mobileDrawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  mobileClose?.addEventListener('click', () => {
    mobileDrawer?.classList.remove('open');
    document.body.style.overflow = '';
  });
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // 5. Tienda: renderizado y filtros por categoría
  const productsContainer = document.getElementById('products-grid');
  const filterButtons = document.querySelectorAll('.category-filter-btn');
  let currentCategory = 'all';

  function renderProducts() {
    if (!productsContainer) return;

    const filtered = currentCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === currentCategory);

    productsContainer.innerHTML = filtered.map(p => `
      <div class="product-card" data-product-id="${p.id}">
        <div class="product-image-box">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='./assets/images/pakal_tun_collar_jade.jpg';">
          ${p.badge ? `<span class="badge badge-gold product-badge-pos">${p.badge}</span>` : ''}
          <button class="product-wishlist-btn ${store.isInWishlist(p.id) ? 'active' : ''}" data-wish-id="${p.id}" title="Favorito">
            ♥
          </button>
          <div class="product-quickview-overlay">
            <button class="btn btn-secondary btn-sm btn-quickview-trigger" data-id="${p.id}">
              ${i18n.t('btn_quick_view', 'VISTA RÁPIDA')}
            </button>
          </div>
        </div>
        <div class="product-content">
          <span class="product-category-label">${p.categoryLabel}</span>
          <h3 class="product-title">${p.name}</h3>
          <p class="product-notes">${p.tagline}</p>
          <div class="product-bottom-row">
            <div class="product-price-box">
              <span class="product-price">$${p.price.toLocaleString('es-MX')} MXN</span>
              ${p.originalPrice ? `<span class="product-price-old">$${p.originalPrice.toLocaleString('es-MX')}</span>` : ''}
            </div>
            <button class="btn btn-primary btn-sm btn-add-cart" data-id="${p.id}">
              ${i18n.t('btn_add_cart', 'AGREGAR')}
            </button>
          </div>
        </div>
      </div>
    `).join('');

    productsContainer.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const prod = PRODUCTS.find(p => p.id === btn.dataset.id);
        if (prod) {
          store.addToCart(prod);
          cartDrawer.open();
        }
      });
    });

    productsContainer.querySelectorAll('.btn-quickview-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        quickViewModal.open(btn.dataset.id);
      });
    });

    productsContainer.querySelectorAll('.product-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const active = store.toggleWishlist(btn.dataset.wishId);
        btn.classList.toggle('active', active);
      });
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderProducts();
    });
  });

  renderProducts();
  i18n.onLanguageChange(() => renderProducts());

  // 6. Crónicas del Taller
  const journalGrid = document.getElementById('journal-posts-grid');
  if (journalGrid) {
    journalGrid.innerHTML = JOURNAL_POSTS.map(post => `
      <article class="journal-card" data-post-id="${post.id}">
        <img src="${post.image}" alt="${post.title}" class="journal-thumb" loading="lazy">
        <div class="journal-body">
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 0.6rem;">
            <span>${post.category}</span>
            <span>${post.readTime}</span>
          </div>
          <h3 style="font-family: var(--font-serif-display); font-size: 1.2rem; color: var(--color-beige-light); margin-bottom: 0.75rem; line-height: 1.35;">
            ${post.title}
          </h3>
          <p style="font-size: 0.88rem; color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
            ${post.excerpt}
          </p>
          <span style="font-size: 0.76rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-gold); margin-top: auto;">
            LEER CRÓNICA →
          </span>
        </div>
      </article>
    `).join('');

    journalGrid.querySelectorAll('.journal-card').forEach(card => {
      card.addEventListener('click', () => journalModal.open(card.dataset.postId));
    });
  }

  // 7. Wishlist -> Tienda
  document.getElementById('header-wishlist-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const tiendaSection = document.getElementById('tienda');
    if (tiendaSection) tiendaSection.scrollIntoView({ behavior: 'smooth' });
    else window.location.hash = '#tienda';
  });

  // 8. Formulario de contacto -> Galería & Taller del Maestro Edgar Olvera
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      const text = `Saludos Maestro Edgar Olvera, soy ${name} (${email}). Le escribo desde la Galería ARTE XIBALBÁ:\n\n${message}`;
      const copied = await sendToFacebook(text);
      contactForm.reset();
      alert(copied
        ? 'Tu mensaje quedó copiado. Pégalo en el chat de Facebook del Maestro Edgar Olvera (ARTE XIBALBÁ).'
        : 'Escríbale al Maestro Edgar Olvera en la página oficial de ARTE XIBALBÁ.');
    });
  }

  // 9. Reproducción continua de videos de fondo (Hero, Filosofía y Footer)
  document.querySelectorAll('.hero-video-bg, .footer-video-bg, .filosofia-video-bg').forEach(v => {
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('playsinline', '');
    const tryPlay = () => { v.play().catch(() => {}); };
    tryPlay();
    document.addEventListener('click', tryPlay, { once: true });
    document.addEventListener('touchstart', tryPlay, { once: true });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) tryPlay();
    });
  });

  // 10. Protección móvil contra zoom accidental (iOS & Android)
  ['gesturestart', 'gesturechange', 'gestureend'].forEach(evt => {
    document.addEventListener(evt, (e) => e.preventDefault(), { passive: false });
  });

  // 11. Deep links por hash
  const handleDeepLinkHash = () => {
    if (!window.location.hash) return;
    const targetEl = document.getElementById(window.location.hash.substring(1));
    if (!targetEl) return;
    setTimeout(() => {
      const headerOffset = document.querySelector('.site-header')?.offsetHeight || 70;
      const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, targetPos), behavior: 'smooth' });
    }, 250);
  };
  handleDeepLinkHash();
  window.addEventListener('hashchange', handleDeepLinkHash);
});
