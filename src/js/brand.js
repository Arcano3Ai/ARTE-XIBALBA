// Identidad y canales de contacto oficiales de ARTE XIBALBÁ
export const BRAND = {
  name: 'ARTE XIBALBÁ',
  tagline: 'Alta Joyería & Escultura Lapidaria Prehispánica',
  artisan: 'Maestro Edgar Olvera',
  title: 'Maestro Escultor Lapidario & Artista Prehispánico',
  gallery: 'Galería & Boutique · Bolivar 45, Bazar Locales 12 y 13, Centro Histórico, CDMX',
  facebookUrl: 'https://www.facebook.com/edgar.olvera.706671',
  whatsappNumber: '525657388563',
  whatsappUrl: 'https://wa.me/525657388563',
  instagramUrl: 'https://www.instagram.com/arte_xibalba',
  tiktokUrl: 'https://www.tiktok.com/@arte_xibalba_',
  address: 'Bolivar 45, Bazar Locales 12 y 13, Centro Histórico, CDMX'
};

/**
 * Copia el mensaje al portapapeles y abre los canales oficiales de contacto.
 * Devuelve true si el texto quedó copiado.
 */
export async function sendToFacebook(text) {
  let copied = false;
  try {
    await navigator.clipboard.writeText(text);
    copied = true;
  } catch (_) {
    copied = false;
  }
  window.open(BRAND.facebookUrl, '_blank', 'noopener');
  return copied;
}

