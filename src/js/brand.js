// Identidad y canales de contacto oficiales de PAKAL TUN
export const BRAND = {
  name: 'PAKAL TUN',
  artisan: 'Maestro Melquiades Villarreal',
  creator: 'Sergio Pérez',
  facebookUrl: 'https://www.facebook.com/sergio.perez.pakaltun/photos',
  address: 'Morelos 654, Agua Fría, Apodaca, N.L.'
};

/**
 * Copia el mensaje al portapapeles (si el navegador lo permite) y abre el
 * perfil de Facebook de Sergio Pérez para que el cliente lo pegue en el chat.
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
