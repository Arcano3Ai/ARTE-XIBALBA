/**
 * Reproductor de Música de Fondo Oficial PAKAL TUN
 * Canción: "Pakal Tun.mp3"
 */
export function initSoundPlayer() {
  const audioSrc = './assets/audio/pakal_tun.mp3';
  const audio = new Audio(audioSrc);
  audio.loop = true;
  audio.volume = 0.45;
  audio.preload = 'auto';

  // Contenedor del reproductor flotante en la esquina inferior izquierda
  let playerEl = document.getElementById('pakal-music-player');
  if (!playerEl) {
    playerEl = document.createElement('div');
    playerEl.id = 'pakal-music-player';
    playerEl.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 999;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px 8px 10px;
      background: rgba(15, 15, 15, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--color-gold);
      border-radius: 50px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.75), 0 0 15px rgba(255, 183, 3, 0.3);
      cursor: pointer;
      user-select: none;
      transition: all 0.3s ease;
    `;

    playerEl.innerHTML = `
      <button id="pakal-music-btn" aria-label="Reproducir música Pakal Tun" style="
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: var(--gradient-gold);
        border: none;
        color: #0A0A0A;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        cursor: pointer;
        box-shadow: 0 0 12px rgba(255, 183, 3, 0.5);
        flex-shrink: 0;
        transition: transform 0.2s ease;
      ">
        <span id="pakal-music-icon">▶</span>
      </button>
      <div style="display: flex; flex-direction: column;">
        <span style="font-size: 0.78rem; font-weight: 700; color: #FFFFFF; font-family: var(--font-serif-display); letter-spacing: 0.05em;">PAKAL TUN</span>
        <span id="pakal-music-status" style="font-size: 0.68rem; color: var(--color-gold-light);">Música de fondo · Pausada</span>
      </div>
      <div id="pakal-equalizer" style="display: flex; gap: 3px; align-items: flex-end; height: 16px; margin-left: 6px;">
        <span style="width: 3px; height: 6px; background: var(--color-gold); border-radius: 1px; transition: height 0.2s;"></span>
        <span style="width: 3px; height: 12px; background: var(--color-gold); border-radius: 1px; transition: height 0.2s;"></span>
        <span style="width: 3px; height: 8px; background: var(--color-gold); border-radius: 1px; transition: height 0.2s;"></span>
      </div>
    `;

    document.body.appendChild(playerEl);
  }

  const btn = document.getElementById('pakal-music-btn');
  const icon = document.getElementById('pakal-music-icon');
  const status = document.getElementById('pakal-music-status');
  const eq = document.getElementById('pakal-equalizer');
  let isPlaying = false;
  let eqInterval = null;

  function updateVisuals(playing) {
    isPlaying = playing;
    if (icon) icon.textContent = playing ? '❚❚' : '▶';
    if (status) status.textContent = playing ? 'Música ancestral sonando ♫' : 'Música de fondo · Pausada';

    if (playing) {
      playerEl.style.borderColor = 'var(--color-flame)';
      playerEl.style.boxShadow = '0 10px 35px rgba(0, 0, 0, 0.85), 0 0 20px rgba(255, 183, 3, 0.6)';
      startEq();
    } else {
      playerEl.style.borderColor = 'var(--color-gold)';
      playerEl.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.75), 0 0 15px rgba(255, 183, 3, 0.3)';
      stopEq();
    }
  }

  function startEq() {
    if (eqInterval) clearInterval(eqInterval);
    const bars = eq?.querySelectorAll('span') || [];
    eqInterval = setInterval(() => {
      bars.forEach(bar => {
        const h = Math.floor(Math.random() * 12) + 4;
        bar.style.height = `${h}px`;
      });
    }, 200);
  }

  function stopEq() {
    if (eqInterval) clearInterval(eqInterval);
    const bars = eq?.querySelectorAll('span') || [];
    bars.forEach((bar, i) => {
      bar.style.height = `${(i + 1) * 3}px`;
    });
  }

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
      updateVisuals(false);
    } else {
      audio.play().then(() => {
        updateVisuals(true);
      }).catch(err => {
        console.warn('Autoplay bloqueado por el navegador:', err);
      });
    }
  }

  playerEl.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlay();
  });

  // Intentar arranque automático tras el primer clic o toque en cualquier parte del sitio
  const startOnFirstGesture = () => {
    if (!isPlaying) {
      audio.play().then(() => {
        updateVisuals(true);
      }).catch(() => {});
    }
  };

  document.addEventListener('click', startOnFirstGesture, { once: true });
  document.addEventListener('touchstart', startOnFirstGesture, { once: true });

  // Exponer control global si otros elementos lo requieren
  window.pakalAudio = {
    audio,
    toggle: togglePlay,
    play: () => { audio.play(); updateVisuals(true); },
    pause: () => { audio.pause(); updateVisuals(false); }
  };
}
