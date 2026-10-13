/**
 * ============================================================================
 * PAKAL TUN — MOTOR DEL ESPEJO DE OBSIDIANA (TEZCATLIPOCA)
 * Canvas 2D interactivo: Reflejo especular, humo volcánico, chispas de jade
 * y oráculo ancestral con susurros dinámicos.
 * ============================================================================
 */

export function initObsidianMirror(canvasId = 'obsidian-mirror-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const hintEl = document.getElementById('obsidian-mirror-hint');

  // Frases del Oráculo de Tezcatlipoca
  const ORACLE_WHISPERS = [
    '«El jade resguarda tu espíritu; la obsidiana devela la verdad.»',
    '«En el humo negro de Tezcatlipoca, el guerrero contempla su nahual.»',
    '«La piedra volcánica corta las ilusiones del tiempo.»',
    '«Pakal renace en el jade verde que late en el pecho sagrado.»',
    '«La mano del Maestro Yax Balam despierta el alma del mineral dormido.»',
    '«Quien mira en el espejo oscuro descubre el origen de las estrellas.»',
    '«El corazón de la montaña no teme a la noche eterna.»',
    '«Lleva el escudo de piedra: la memoria de tus ancestros te acompaña.»'
  ];

  let whisperIndex = 0;
  let whisperTimer = null;

  // Dimensiones internas con soporte para Retina / High DPI
  let size = 340;
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    size = Math.min(rect.width || 340, rect.height || 340);
    if (size <= 0) size = 340;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
  }

  // Estado del mouse / touch
  const mouse = {
    x: size / 2,
    y: size / 2,
    targetX: size / 2,
    targetY: size / 2,
    isHovered: false,
    intensity: 0
  };

  // Partículas de humo místico y chispas de jade
  const SMOKE_COUNT = 32;
  const smokeParticles = [];

  for (let i = 0; i < SMOKE_COUNT; i++) {
    smokeParticles.push({
      angle: (i / SMOKE_COUNT) * Math.PI * 2,
      distance: Math.random() * (size * 0.38) + 10,
      speed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
      radius: Math.random() * 24 + 14,
      alpha: Math.random() * 0.25 + 0.08,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      pulse: Math.random() * Math.PI,
      isJadeSpark: Math.random() > 0.65
    });
  }

  // Ondas expansivas (ripples) al interactuar o hacer click
  const ripples = [];

  function addRipple(x, y) {
    ripples.push({
      x,
      y,
      radius: 5,
      maxRadius: size * 0.48,
      alpha: 0.85,
      color: Math.random() > 0.5 ? 'rgba(167, 139, 250, ' : 'rgba(61, 170, 110, '
    });

    // Cambiar frase del oráculo con transición suave
    if (hintEl) {
      whisperIndex = (whisperIndex + 1) % ORACLE_WHISPERS.length;
      hintEl.style.opacity = '0';
      hintEl.style.transform = 'translateY(4px)';
      setTimeout(() => {
        hintEl.textContent = ORACLE_WHISPERS[whisperIndex];
        hintEl.style.opacity = '1';
        hintEl.style.transform = 'translateY(0)';
        hintEl.style.color = '#D0BCFF';
      }, 250);
    }
  }

  // Event Listeners de interacción
  function updateCoords(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    mouse.targetX = clientX - rect.left;
    mouse.targetY = clientY - rect.top;
    mouse.isHovered = true;
  }

  canvas.addEventListener('mousemove', (e) => {
    updateCoords(e.clientX, e.clientY);
  });

  canvas.addEventListener('mouseenter', () => {
    mouse.isHovered = true;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.isHovered = false;
    mouse.targetX = size / 2;
    mouse.targetY = size / 2;
  });

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    addRipple(e.clientX - rect.left, e.clientY - rect.top);
  });

  // Soporte táctil móvil
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      updateCoords(t.clientX, t.clientY);
      const rect = canvas.getBoundingClientRect();
      addRipple(t.clientX - rect.left, t.clientY - rect.top);
    }
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      updateCoords(t.clientX, t.clientY);
    }
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    mouse.isHovered = false;
  }, { passive: true });

  // Rotación automática de susurros cada 9 segundos
  whisperTimer = setInterval(() => {
    if (!mouse.isHovered && hintEl) {
      whisperIndex = (whisperIndex + 1) % ORACLE_WHISPERS.length;
      hintEl.style.opacity = '0';
      setTimeout(() => {
        hintEl.textContent = ORACLE_WHISPERS[whisperIndex];
        hintEl.style.opacity = '1';
      }, 300);
    }
  }, 9000);

  // Bucle de renderizado
  let animationFrameId;
  let time = 0;

  function render() {
    time += 0.016;

    // Suavizado de coordenadas del cursor (amortiguación)
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    // Intensidad de resplandor
    const targetIntensity = mouse.isHovered ? 1.0 : 0.25;
    mouse.intensity += (targetIntensity - mouse.intensity) * 0.05;

    ctx.clearRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.47;

    // 1. Recorte circular para el disco de obsidiana
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();

    // 2. Fondo de obsidiana negra profunda
    const bgGradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.1,
      centerX, centerY, radius
    );
    bgGradient.addColorStop(0, '#0C0A14');
    bgGradient.addColorStop(0.55, '#07050A');
    bgGradient.addColorStop(1, '#020104');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, size, size);

    // 3. Glifos sagrados concéntricos tenues (Anillos solares)
    ctx.save();
    ctx.strokeStyle = `rgba(167, 139, 250, ${0.06 + mouse.intensity * 0.08})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.72, 0, Math.PI * 2);
    ctx.arc(centerX, centerY, radius * 0.44, 0, Math.PI * 2);
    ctx.stroke();

    // Rayos cardinales de Tezcatlipoca
    ctx.strokeStyle = `rgba(61, 170, 110, ${0.04 + mouse.intensity * 0.06})`;
    ctx.beginPath();
    ctx.moveTo(centerX - radius * 0.8, centerY);
    ctx.lineTo(centerX + radius * 0.8, centerY);
    ctx.moveTo(centerX, centerY - radius * 0.8);
    ctx.lineTo(centerX, centerY + radius * 0.8);
    ctx.stroke();
    ctx.restore();

    // 4. Niebla y humo cósmico de obsidiana en espiral
    smokeParticles.forEach(p => {
      p.angle += p.speed;
      p.pulse += p.pulseSpeed;

      const px = centerX + Math.cos(p.angle) * p.distance;
      const py = centerY + Math.sin(p.angle) * p.distance;
      const currentAlpha = Math.max(0.04, Math.min(0.4, p.alpha + Math.sin(p.pulse) * 0.08));

      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, p.radius, 0, Math.PI * 2);

      const smokeGrad = ctx.createRadialGradient(px, py, 0, px, py, p.radius);
      if (p.isJadeSpark) {
        // Veta de jadeíta luminosa dentro de la obsidiana
        smokeGrad.addColorStop(0, `rgba(61, 170, 110, ${currentAlpha * 1.2 * mouse.intensity})`);
        smokeGrad.addColorStop(1, 'transparent');
      } else {
        // Humo púrpura amatista de Tezcatlipoca
        smokeGrad.addColorStop(0, `rgba(147, 100, 220, ${currentAlpha * (0.8 + mouse.intensity * 0.6)})`);
        smokeGrad.addColorStop(1, 'transparent');
      }

      ctx.fillStyle = smokeGrad;
      ctx.fill();
      ctx.restore();
    });

    // 5. Ondas expansivas activas (Ripples)
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.radius += 2.8;
      r.alpha -= 0.022;

      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        ripples.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `${r.color}${r.alpha.toFixed(2)})`;
      ctx.lineWidth = 2;
      ctx.shadowColor = r.color.includes('61') ? '#3DAA6E' : '#A78BFA';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();
    }

    // 6. Reflejo especular hiperrealista que sigue la posición del ratón
    const specX = mouse.x;
    const specY = mouse.y;
    const specRadius = radius * 0.65;

    const specGrad = ctx.createRadialGradient(
      specX, specY, 2,
      specX, specY, specRadius
    );
    specGrad.addColorStop(0, `rgba(230, 215, 255, ${0.28 * mouse.intensity})`);
    specGrad.addColorStop(0.35, `rgba(130, 80, 210, ${0.15 * mouse.intensity})`);
    specGrad.addColorStop(0.7, `rgba(61, 170, 110, ${0.08 * mouse.intensity})`);
    specGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = specGrad;
    ctx.beginPath();
    ctx.arc(specX, specY, specRadius, 0, Math.PI * 2);
    ctx.fill();

    // 7. Bisel interno de vidrio volcánico pulido (borde curvo del espejo)
    const bevelGrad = ctx.createRadialGradient(
      centerX, centerY, radius * 0.88,
      centerX, centerY, radius
    );
    bevelGrad.addColorStop(0, 'transparent');
    bevelGrad.addColorStop(0.75, 'rgba(0, 0, 0, 0.6)');
    bevelGrad.addColorStop(1, 'rgba(167, 139, 250, 0.45)');

    ctx.fillStyle = bevelGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore(); // Fin del clip circular

    // 8. Aro exterior sutil de jade
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(61, 170, 110, 0.4)';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(61, 170, 110, 0.5)';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.restore();

    animationFrameId = requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  resize();
  render();

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
    if (whisperTimer) clearInterval(whisperTimer);
  };
}
