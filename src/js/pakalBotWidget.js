import { processBotQuery } from './pakalBotEngine.js';

export class PakalBotWidget {
  constructor(options = {}) {
    this.onOpenProduct = options.onOpenProduct || (() => {});
    this.onAddToCart = options.onAddToCart || (() => {});
    this.isOpen = false;
    this.history = [];

    this.initDOM();
    this.bindEvents();
    this.addWelcomeMessage();
  }

  initDOM() {
    // 1. Launcher flotante
    this.launcherEl = document.createElement('div');
    this.launcherEl.className = 'numa-bot-launcher';
    this.launcherEl.id = 'pakal-bot-launcher';
    this.launcherEl.innerHTML = `
      <div class="numa-bot-launcher-icon">
        <img src="./assets/images/arte_xibalba_logo.png" alt="Guía ARTE XIBALBÁ" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--color-gold);">
      </div>
      <div class="numa-bot-launcher-text">
        <span class="numa-bot-launcher-title" style="color: var(--color-gold); font-weight: 700; font-size: 0.82rem; letter-spacing: 0.05em;">GUÍA ARTE XIBALBÁ</span>
        <span class="numa-bot-launcher-sub" style="font-size: 0.72rem; color: var(--color-text-muted);">Centro Histórico CDMX</span>
      </div>
      <span class="numa-bot-unread-dot" style="width: 8px; height: 8px; background: var(--color-gold); border-radius: 50%; box-shadow: 0 0 8px var(--color-gold);"></span>
    `;

    // 2. Ventana de chat
    this.windowEl = document.createElement('div');
    this.windowEl.className = 'numa-bot-window';
    this.windowEl.id = 'pakal-bot-window';
    this.windowEl.style.zIndex = '10050';
    this.windowEl.innerHTML = `
      <div class="numa-bot-header" style="background: rgba(18, 12, 10, 0.96); border-bottom: 1.5px solid var(--color-gold); padding: 1rem 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="./assets/images/arte_xibalba_logo.png" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-gold); box-shadow: 0 0 10px rgba(255,183,3,0.5);">
          <div>
            <div style="font-family: var(--font-serif-display); font-size: 1.05rem; color: #FFFFFF; font-weight: 700; letter-spacing: 0.05em;">
              GUÍA ARTE XIBALBÁ
            </div>
            <div style="font-size: 0.74rem; color: var(--color-gold-light); display: flex; align-items: center; gap: 0.35rem;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #4ADE80; display: inline-block;"></span>
              Alta Joyería Prehispánica · Bolivar 45, CDMX
            </div>
          </div>
        </div>
        <button type="button" class="numa-bot-header-close" id="pakal-bot-close-btn" style="background: transparent; border: none; color: var(--color-gold); font-size: 1.4rem; cursor: pointer; padding: 0.2rem 0.5rem; transition: transform 0.2s;">
          &times;
        </button>
      </div>

      <div class="numa-bot-messages" id="pakal-bot-messages-area" style="padding: 1.25rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; flex: 1; min-height: 280px;">
        <!-- Inyección de mensajes -->
      </div>

      <div class="numa-bot-quick-replies" id="pakal-bot-quick-replies" style="padding: 0.5rem 1.25rem; display: flex; gap: 0.4rem; overflow-x: auto; flex-wrap: wrap;">
        <!-- Botones de respuesta rápida -->
      </div>

      <form class="numa-bot-input-bar" id="pakal-bot-input-form" style="padding: 0.85rem 1.25rem; border-top: 1px solid var(--color-border); display: flex; gap: 0.6rem; background: rgba(10, 10, 10, 0.95);">
        <input type="text" id="pakal-bot-input" placeholder="Pregunta sobre collares, jade, el taller..." autocomplete="off" style="flex: 1; padding: 0.65rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid var(--color-border); border-radius: 25px; color: var(--color-beige); font-size: 0.85rem; outline: none;">
        <button type="submit" class="btn btn-primary btn-sm" style="border-radius: 50%; width: 38px; height: 38px; padding: 0; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          ➤
        </button>
      </form>
    `;

    document.body.appendChild(this.launcherEl);
    document.body.appendChild(this.windowEl);

    this.messagesArea = this.windowEl.querySelector('#pakal-bot-messages-area');
    this.quickRepliesArea = this.windowEl.querySelector('#pakal-bot-quick-replies');
    this.inputForm = this.windowEl.querySelector('#pakal-bot-input-form');
    this.inputField = this.windowEl.querySelector('#pakal-bot-input');
    this.closeBtn = this.windowEl.querySelector('#pakal-bot-close-btn');
  }

  bindEvents() {
    this.launcherEl.addEventListener('click', () => this.toggle());
    this.closeBtn.addEventListener('click', () => this.close());

    this.inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.inputField.value.trim();
      if (!text) return;
      this.handleUserMessage(text);
      this.inputField.value = '';
    });

    // Abrir bot desde cualquier elemento con atributo data-open-bot
    document.querySelectorAll('[data-open-bot]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });
  }

  open() {
    this.isOpen = true;
    this.windowEl.classList.add('is-open');
    this.launcherEl.classList.add('is-hidden');
    this.inputField.focus();
    this.scrollToBottom();
  }

  close() {
    this.isOpen = false;
    this.windowEl.classList.remove('is-open');
    this.launcherEl.classList.remove('is-hidden');
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  addWelcomeMessage() {
    const welcome = processBotQuery('hola');
    this.appendBotMessage(welcome.text, welcome.products, welcome.quickReplies);
  }

  handleUserMessage(text) {
    // 1. Mostrar mensaje del usuario
    this.appendUserMessage(text);

    // 2. Procesar respuesta del bot con efecto de escritura breve
    this.showTypingIndicator();

    setTimeout(() => {
      this.removeTypingIndicator();
      const response = processBotQuery(text);
      this.appendBotMessage(response.text, response.products, response.quickReplies);
    }, 450);
  }

  appendUserMessage(text) {
    const msg = document.createElement('div');
    msg.style.cssText = 'align-self: flex-end; max-width: 80%; background: var(--gradient-gold); color: #0A0A0A; padding: 0.65rem 1rem; border-radius: 14px 14px 2px 14px; font-size: 0.85rem; font-weight: 500; word-break: break-word; box-shadow: 0 4px 15px rgba(255,183,3,0.25);';
    msg.textContent = text;
    this.messagesArea.appendChild(msg);
    this.scrollToBottom();
  }

  appendBotMessage(text, products = [], quickReplies = []) {
    const msg = document.createElement('div');
    msg.style.cssText = 'align-self: flex-start; max-width: 88%; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--color-border); color: var(--color-beige); padding: 0.85rem 1rem; border-radius: 14px 14px 14px 2px; font-size: 0.85rem; line-height: 1.55; word-break: break-word;';

    // Parse simple markdown
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');

    msg.innerHTML = formatted;

    // Productos adjuntos
    if (products && products.length > 0) {
      const prodsBox = document.createElement('div');
      prodsBox.style.cssText = 'margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;';

      products.forEach(p => {
        const pCard = document.createElement('div');
        pCard.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.65rem; background: rgba(0, 0, 0, 0.4); border: 1px solid var(--color-gold); border-radius: 8px; gap: 0.5rem;';
        pCard.innerHTML = `
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <img src="${p.image}" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 600; color: var(--color-beige-light);">${p.name}</div>
              <div style="font-size: 0.72rem; color: var(--color-gold);">$${p.price.toLocaleString('es-MX')} MXN</div>
            </div>
          </div>
          <div style="display: flex; gap: 0.35rem;">
            <button type="button" class="btn btn-secondary btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.7rem;" data-quick-id="${p.id}">Ver</button>
            <button type="button" class="btn btn-primary btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.7rem;" data-cart-id="${p.id}">Agregar</button>
          </div>
        `;

        pCard.querySelector('[data-quick-id]').addEventListener('click', (e) => {
          e.stopPropagation();
          this.onOpenProduct(p.id);
        });

        pCard.querySelector('[data-cart-id]').addEventListener('click', (e) => {
          e.stopPropagation();
          this.onAddToCart(p);
        });

        prodsBox.appendChild(pCard);
      });

      msg.appendChild(prodsBox);
    }

    this.messagesArea.appendChild(msg);
    this.renderQuickReplies(quickReplies);
    this.scrollToBottom();
  }

  renderQuickReplies(replies = []) {
    this.quickRepliesArea.innerHTML = '';
    if (!replies || replies.length === 0) return;

    replies.forEach(text => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = 'padding: 0.35rem 0.75rem; background: rgba(255, 183, 3, 0.08); border: 1px solid var(--color-gold); border-radius: 20px; color: var(--color-gold-light); font-size: 0.73rem; cursor: pointer; transition: all 0.2s; white-space: nowrap;';
      btn.textContent = text;
      btn.addEventListener('click', () => {
        this.handleUserMessage(text);
      });
      btn.addEventListener('mouseenter', () => {
        btn.style.background = 'rgba(255, 183, 3, 0.25)';
        btn.style.color = '#FFFFFF';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background = 'rgba(255, 183, 3, 0.08)';
        btn.style.color = 'var(--color-gold-light)';
      });
      this.quickRepliesArea.appendChild(btn);
    });
  }

  showTypingIndicator() {
    this.typingEl = document.createElement('div');
    this.typingEl.id = 'pakal-bot-typing';
    this.typingEl.style.cssText = 'align-self: flex-start; padding: 0.5rem 0.85rem; background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: 12px; font-size: 0.75rem; color: var(--color-gold);';
    this.typingEl.innerHTML = '✦ Guía consultando piezas...';
    this.messagesArea.appendChild(this.typingEl);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    if (this.typingEl) {
      this.typingEl.remove();
      this.typingEl = null;
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
    }, 50);
  }
}
