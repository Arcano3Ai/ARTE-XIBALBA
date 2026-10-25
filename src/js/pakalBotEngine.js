import { PRODUCTS, CATEGORIES } from '../data/products.js';
import { EXPERIENCES } from '../data/experiences.js';
import { BRAND } from './brand.js';

function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Motor de Inteligencia y Conversación de la Guía ARTE XIBALBÁ
 * Especializado en Alta Joyería & Escultura Lapidaria Prehispánica.
 */
export function processBotQuery(rawInput) {
  const norm = normalizeText(rawInput);

  // 1. CREADORES & MAESTROS ARTESANOS
  if (
    norm.includes('edgar') ||
    norm.includes('olvera') ||
    norm.includes('creador') ||
    norm.includes('autor') ||
    norm.includes('artesano') ||
    norm.includes('quien hace') ||
    norm.includes('quien creo') ||
    norm.includes('quien lo hace')
  ) {
    return {
      text: `👑 **Maestro Edgar Olvera · Escultor Lapidario de ARTE XIBALBÁ**\n\n• **Alta Joyería & Escultura Prehispánica:** Cada pectoral ceremonial, calavera sagrada y collar de obsidiana y jade es tallado y pulido a mano por el **Maestro Edgar Olvera** en su boutique y galería en el **Centro Histórico de la CDMX** (Bolivar 45, Locales 12 y 13).\n\n• [Perfil en Facebook de Edgar Olvera](https://www.facebook.com/edgar.olvera.706671)\n• [Instagram Oficial: @arte_xibalba](https://www.instagram.com/arte_xibalba)\n\nEl maestro selecciona personalmente bloques de jadeíta imperial, obsidiana negra pura y sodalita para dar vida a piezas con linaje ancestral.`,
      products: [PRODUCTS[0], PRODUCTS[1]],
      quickReplies: [
        'Ver collares del Maestro Edgar',
        '¿Dónde está la boutique?',
        'Solicitar encargo a medida',
        'Garantía de minerales auténticos'
      ]
    };
  }

  // 2. ¿QUÉ ES ARTE XIBALBÁ?
  if (
    norm.includes('que es') ||
    norm.includes('significa') ||
    norm.includes('xibalba') ||
    norm.includes('concepto') ||
    norm.includes('historia') ||
    norm.includes('marca')
  ) {
    return {
      text: `🏛️ **ARTE XIBALBÁ: Santuario de Arte Prehispánico**\n\nEn la cosmovisión maya, **Xibalbá** es el reino sagrado del inframundo, lugar de transformación profunda, sabiduría oculta y renacimiento.\n\n**ARTE XIBALBÁ** honra este legado creando alta joyería mineral y escultura lapidaria con calaveras sagradas, deidades de la noche, tótems de obsidiana y piezas monumentales de jadeíta auténtica.\n\nNuestra boutique oficial se encuentra en **Bolivar 45, Centro Histórico de la CDMX**.`,
      products: [PRODUCTS[0], PRODUCTS[1]],
      quickReplies: [
        'Ver Pectoral Deidad de Xibalbá',
        '¿Cómo saber si el jade es auténtico?',
        'Ver toda la colección',
        '¿Dónde están ubicados?'
      ]
    };
  }

  // 3. JADE AUTÉNTICO / OBSIDIANA / MINERALES
  if (
    norm.includes('jade') ||
    norm.includes('mineral') ||
    norm.includes('piedra') ||
    norm.includes('autentic') ||
    norm.includes('original') ||
    norm.includes('turquesa') ||
    norm.includes('obsidiana') ||
    norm.includes('material')
  ) {
    return {
      text: `💎 **Minerales Genuinos & Certificación Lapidaria**\n\nEn **ARTE XIBALBÁ** trabajamos exclusivamente con minerales 100% auténticos:\n\n• **Jadeíta Genuina:** Extraída de fuentes tradicionales en México y Guatemala. Presenta translucidez natural a la luz, textura fría y densidad superior.\n• **Obsidiana Negra Volcánica:** Vidrio volcánico pulido a espejo, asociado al espejo sagrado de Tezcatlipoca.\n• **Sodalita Mineral & Hematita:** Tonos azules profundos y lustre metálico en ensambles de gran resistencia.\n• **Turquesa & Basalto:** Tallados en relieve con iconografía glífica.`,
      products: [PRODUCTS[4], PRODUCTS[1]],
      quickReplies: [
        'Brazalete Jade Imperial',
        'Calavera de Obsidiana',
        '¿Cómo cuidar mis piezas?',
        'Visitar boutique en CDMX'
      ]
    };
  }

  // 4. UBICACIÓN / BOUTIQUE / HORARIOS / VISITAS
  if (
    norm.includes('taller') ||
    norm.includes('donde estan') ||
    norm.includes('ubicacion') ||
    norm.includes('direccion') ||
    norm.includes('donde comprar') ||
    norm.includes('tienda fisica') ||
    norm.includes('visitar') ||
    norm.includes('bolivar') ||
    norm.includes('cdmx')
  ) {
    return {
      text: `📍 **Boutique Oficial ARTE XIBALBÁ · Centro Histórico CDMX**\n\nTe esperamos personalmente en:\n\n📌 **Bolivar 45, Bazar Locales 12 y 13**\n🏛️ **Centro Histórico, Ciudad de México (CDMX)**\n📲 **WhatsApp:** 56 5738 8563\n📸 **Instagram:** @arte_xibalba · **TikTok:** @arte_xibalba_\n\nAquí puedes apreciar las piezas en exhibición, verificar su peso y translucidez con lámpara gemológica y adquirir piezas exclusivas.`,
      products: [PRODUCTS[0], PRODUCTS[6]],
      quickReplies: [
        'Ver en Google Maps',
        'Contactar por WhatsApp',
        'Ver catálogo de piezas',
        'Cupones de descuento'
      ]
    };
  }

  // 5. ENCARGOS A MEDIDA / PERSONALIZACIÓN
  if (
    norm.includes('encargo') ||
    norm.includes('medida') ||
    norm.includes('personaliz') ||
    norm.includes('pedido especial') ||
    norm.includes('hacer un collar') ||
    norm.includes('cotiz')
  ) {
    return {
      text: `✨ **Piezas Personalizadas & Encargos de Autor**\n\nEsculpimos y ensamblamos piezas exclusivas bajo encargo:\n\n1. **Selección del Mineral:** Bloques de jadeíta imperial, obsidiana negra pura o sodalita.\n2. **Diseño de la Efigie:** Calavera ceremonial, señor de Xibalbá, tecolote mensajero o glifos mayas.\n3. **Medida y Sartal:** Cuentas calibradas a tu complexión.\n\nContáctanos por WhatsApp al **56 5738 8563** o visítanos en **Bolivar 45, Locales 12 y 13, CDMX**.`,
      products: [PRODUCTS[0], PRODUCTS[3]],
      quickReplies: [
        'Encargar pieza a medida',
        'Pectoral Deidad de Xibalbá',
        '¿Cuánto tarda un encargo?',
        '¿Dónde está la boutique?'
      ]
    };
  }

  // 6. PRECIOS / ENVÍOS / CUPONES / DESCUENTOS
  if (
    norm.includes('cupon') ||
    norm.includes('descuento') ||
    norm.includes('codigo') ||
    norm.includes('precio') ||
    norm.includes('envio') ||
    norm.includes('costo') ||
    norm.includes('cuanto cuesta')
  ) {
    return {
      text: `🎟️ **Precios, Envíos & Códigos Especiales**\n\n• **Cupón Activo:** Usa el código **ARTEXIBALBA** al finalizar tu compra para obtener un **15% de descuento** en tu pedido.\n• **Rango de Precios:** Desde $750 MXN (pulseras talladas de flor de jade) hasta $3,800 MXN (pectorales monumentales con estuche de galería).\n• **Envíos:** Envíos asegurados y protegidos a todo México con paquetería express. Empaque especial contra impactos.`,
      products: [PRODUCTS[5], PRODUCTS[0]],
      quickReplies: [
        'Aplicar cupón en carrito',
        'Ver pulseras y brazaletes',
        'Ver collares de autor',
        'Formas de pago'
      ]
    };
  }

  // 7. CUIDADOS DE LAS PIEZAS
  if (
    norm.includes('cuidar') ||
    norm.includes('cuidado') ||
    norm.includes('limpiar') ||
    norm.includes('mantenimiento')
  ) {
    return {
      text: `📿 **Guía de Cuidado para tu Joyería de ARTE XIBALBÁ**\n\n• **Limpieza:** Usa un paño suave ligeramente humedecido con agua tibia y jabón neutro. Seca de inmediato.\n• **Evita Químicos:** No rocíes perfumes, alcohol ni cloro directamente sobre el jade o la obsidiana.\n• **Almacenamiento:** Guarda tu pieza en su bolsa oficial de ARTE XIBALBÁ separada de metales filosos.\n• **Mantenimiento:** Ofrecemos servicio de re-engarce en nuestra boutique de Bolivar 45, Centro Histórico.`,
      products: [PRODUCTS[0], PRODUCTS[4]],
      quickReplies: [
        'Ver Pectoral de Xibalbá',
        '¿Dónde está la boutique?',
        'Ver catálogo completo'
      ]
    };
  }

  // 8. BÚSQUEDA ESPECÍFICA POR PRODUCTO
  const matchingProds = PRODUCTS.filter(p => {
    const pName = normalizeText(p.name);
    return (
      norm.includes(pName) ||
      pName.split(' ').some(w => w.length > 3 && norm.includes(w)) ||
      (norm.includes('calavera') && pName.includes('calavera')) ||
      (norm.includes('obsidiana') && pName.includes('obsidiana')) ||
      (norm.includes('tecolote') && pName.includes('tecolote')) ||
      (norm.includes('brazalete') && pName.includes('brazalete')) ||
      (norm.includes('pulsera') && pName.includes('pulsera')) ||
      (norm.includes('deidad') && pName.includes('deidad'))
    );
  });

  if (matchingProds.length > 0) {
    const prod = matchingProds[0];
    return {
      text: `✨ **${prod.name}**\n\n${prod.description}\n\n• **Material:** ${prod.aroma?.salida || 'Mineral genuino'}\n• **Engarce:** ${prod.aroma?.corazon || 'Artesanal'}\n• **Precio:** $${prod.price.toLocaleString('es-MX')} MXN\n\n¿Deseas verla a detalle o agregarla a tu carrito?`,
      products: matchingProds.slice(0, 2),
      quickReplies: [
        `Ver en detalle`,
        'Ver todas las piezas',
        '¿Cómo comprar?',
        'Visitar boutique CDMX'
      ]
    };
  }

  // 9. SALUDO GENERAL / BIENVENIDA
  if (
    norm.includes('hola') ||
    norm.includes('buen') ||
    norm.includes('saludos') ||
    norm.includes('hey') ||
    norm.includes('inicio')
  ) {
    return {
      text: `👋 **¡Saludos! Bienvenido a ARTE XIBALBÁ**\n\nSoy tu **Guía de Joyería Prehispánica & Escultura Lapidaria**. Te acompaño a descubrir nuestras obras en jadeíta imperial, obsidiana volcánica, sodalita y hematita esculpidas a mano en el Centro Histórico de la CDMX.\n\n¿En qué te puedo asesorar hoy?\n• 📿 Ver nuestros **collares y pectorales ceremoniales**.\n• 💎 Conocer sobre la autenticidad del **jade y la obsidiana**.\n• 📍 Visitar nuestra **boutique en Bolivar 45, Centro Histórico, CDMX**.\n• ✨ Solicitar una **pieza personalizada a tu medida**.`,
      products: [PRODUCTS[0], PRODUCTS[1]],
      quickReplies: [
        'Ver Pectoral Deidad de Xibalbá',
        'Ver collares de obsidiana',
        '¿Dónde está la boutique?',
        'Tengo un cupón de descuento'
      ]
    };
  }

  // 10. RESPUESTA POR DEFECTO ORIENTADA
  return {
    text: `🌿 Estoy aquí para ayudarte a explorar el arte lapidario de **ARTE XIBALBÁ**, alta joyería prehispánica desde el Centro Histórico de la Ciudad de México.\n\nPuedes preguntarme por:\n• **Piezas:** *"Pectoral de Xibalbá"*, *"Calavera de obsidiana"*, *"Brazaletes"*, *"Tecolote"*\n• **Materiales:** *"¿El jade es auténtico?"*, *"Obsidiana negra"*\n• **Boutique física:** *"¿Dónde están ubicados?"*, *"Horarios y WhatsApp"*\n• **Encargos:** *"¿Hacen piezas a medida?"*.`,
    products: [PRODUCTS[0], PRODUCTS[1]],
    quickReplies: [
      'Ver Colección Completa',
      '¿Dónde está la boutique?',
      'Brazalete Jade Imperial',
      '¿El mineral es genuino?'
    ]
  };
}
