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
 * Motor de Inteligencia y Conversación de la Guía PAKAL TUN
 * Especializado en Joyería Prehispánica de Autor de Sergio Pérez.
 */
export function processBotQuery(rawInput) {
  const norm = normalizeText(rawInput);

  // 1. CREADOR & MAESTRO ARTESANO
  if (
    norm.includes('creador') ||
    norm.includes('sergio') ||
    norm.includes('perez') ||
    norm.includes('melquiades') ||
    norm.includes('villarreal') ||
    norm.includes('autor') ||
    norm.includes('artesano') ||
    norm.includes('quien hace') ||
    norm.includes('quien creo') ||
    norm.includes('quien lo hace')
  ) {
    return {
      text: `👑 **Sergio Pérez & Maestro Melquiades Villarreal**\n\n• **Creador de PAKAL TUN:** La galería y visión de marca fue fundada por **Sergio Pérez**.\n• **Maestro Artesano Lapidario:** Cada pectoral, máscara y collar ceremonial es tallado a mano por el **maestro Melquiades Villarreal** en su taller en **Morelos 654, Agua Fría, Apodaca, N.L.**\n\nEl maestro Melquiades selecciona personalmente los bloques de jadeíta genuina (de Guatemala y México), turquesa y obsidiana volcánica para esculpir piezas únicas inspiradas en el esplendor de las culturas maya, tolteca y mexica.`,
      products: [PRODUCTS[0], PRODUCTS[1]],
      quickReplies: [
        'Ver collares de autor',
        '¿Dónde está el taller?',
        'Solicitar encargo a medida',
        'Garantía de jade auténtico'
      ]
    };
  }

  // 2. ¿QUÉ ES PAKAL TUN?
  if (
    norm.includes('que es pakal') ||
    norm.includes('significa pakal') ||
    norm.includes('pakal tun') ||
    norm.includes('concepto') ||
    norm.includes('historia') ||
    norm.includes('marca')
  ) {
    return {
      text: `🏛️ **PAKAL TUN: El Escudo de Piedra**\n\nEn lengua maya, *«Pakal»* significa **escudo** y *«Tun»* significa **piedra**. PAKAL TUN es el *Escudo de Piedra*: una galería de joyería prehispánica de autor creada por **Sergio Pérez** con piezas talladas a mano por el maestro **Melquiades Villarreal**.\n\nRendimos homenaje a la magnificencia de K'inich Janaab' Pakal creando pectorales monumentales, máscaras en mosaico y sartales finos para llevar la memoria viva de nuestras raíces.`,
      products: [PRODUCTS[0], PRODUCTS[5]],
      quickReplies: [
        'Ver Máscara de Pakal en Jade',
        '¿Cómo saber si el jade es auténtico?',
        'Ver todas las piezas',
        '¿Quién es el creador?'
      ]
    };
  }

  // 3. JADE AUTÉNTICO / MINERALES / MATERIALES
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
      text: `💎 **Minerales Genuinos & Jadeíta Auténtica**\n\nEn PAKAL TUN no usamos imitaciones plásticas ni vidrios tintados. El maestro Melquiades Villarreal trabaja con:\n\n• **Jadeíta Genuina:** Piedra sagrada de Guatemala (valle del río Motagua) y yacimientos mexicanos. Fría al tacto, densa y de lustre vítreo.\n• **Turquesa Natural:** Piedra celeste asociada al fuego y la realeza.\n• **Obsidiana Pulida a Mano:** Vidrio volcánico negro y dorado.\n• **Lapislázuli & Ámbar:** Ensambles tradicionales de alta durabilidad.\n\nTodas las piezas cuentan con garantía de autenticidad mineral.`,
      products: [PRODUCTS[0], PRODUCTS[2]],
      quickReplies: [
        'Collar Pakal de Jade',
        'Collar de Lapislázuli',
        '¿Cómo cuidar mi collar?',
        'Visitar el taller en Apodaca'
      ]
    };
  }

  // 4. UBICACIÓN / TALLER / HORARIOS / VISITAS
  if (
    norm.includes('taller') ||
    norm.includes('donde estan') ||
    norm.includes('ubicacion') ||
    norm.includes('direccion') ||
    norm.includes('donde comprar') ||
    norm.includes('tienda fisica') ||
    norm.includes('visitar') ||
    norm.includes('apodaca') ||
    norm.includes('agua fria') ||
    norm.includes('morelos')
  ) {
    return {
      text: `📍 **Taller del Maestro Melquiades Villarreal · PAKAL TUN**\n\nPuedes visitarnos directamente en nuestro taller físico:\n\n🏛️ **Taller de Joyería Prehispánica**\n📌 **Morelos 654, Agua Fría, Apodaca, N.L.**\n\nAquí el maestro Melquiades Villarreal realiza el tallado y labrado en vivo. Podrás apreciar las piezas terminadas, elegir tus minerales en bruto y acordar tu encargo a medida.`,
      products: [PRODUCTS[0], PRODUCTS[4]],
      quickReplies: [
        'Horarios y contacto',
        'Solicitar encargo personalizado',
        'Ver catálogo de collares',
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
      text: `✨ **Piezas de Autor a Medida**\n\nEl maestro Melquiades Villarreal talla piezas exclusivas bajo encargo:\n\n1. **Selección del Mineral:** Eliges el tipo y tono de jade (verde esmeralda, jade imperial, corteza), turquesa u obsidiana.\n2. **Diseño de la Efigie:** Máscara de Pakal, rostro solar mexica, jaguar u orla ceremonial.\n3. **Calibre y Longitud:** Sartal adaptado a tu complexión y porte.\n\nPuedes solicitar tu encargo desde la sección **ENCARGOS** o visitando el taller en Morelos 654, Agua Fría, Apodaca.`,
      products: [PRODUCTS[0], PRODUCTS[5]],
      quickReplies: [
        'Ir a la sección de Encargos',
        'Ver Pectoral Solar Mexica',
        '¿Cuánto tarda un encargo?',
        '¿Dónde está el taller?'
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
      text: `🎟️ **Precios, Envíos & Códigos Especiales**\n\n• **Cupón Activo:** Usa el código **PAKALTUN15** o **JADE15** al finalizar tu compra para obtener un **15% de descuento** en tu pedido.\n• **Rango de Precios:** Desde $650 MXN (anillos y pulseras talladas) hasta $3,400 MXN (pectorales monumentales de colección).\n• **Envíos:** Envíos asegurados y protegidos a todo México. Empaque especial contra impactos para proteger las piedras.`,
      products: [PRODUCTS[4], PRODUCTS[0]],
      quickReplies: [
        'Aplicar cupón en carrito',
        'Ver pulseras y anillos ($650)',
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
      text: `📿 **Guía de Cuidado para tu Joyería de Jade**\n\n• **Limpieza:** Usa un paño suave con agua tibia y jabón neutro. Seca de inmediato.\n• **Evita Químicos:** No rocíes perfumes, cloro ni aerosoles directamente sobre el jade o la turquesa.\n• **Almacenamiento:** Guarda tu pieza en su estuche o bolsa de tela suave separada de metales duros.\n• **Re-engarce:** Si el hilo o cordón requiere ajuste con los años, puedes traerlo al taller de Morelos 654 en Agua Fría, Apodaca para mantenimiento.`,
      products: [PRODUCTS[0], PRODUCTS[3]],
      quickReplies: [
        'Ver Collar Pakal de Jade',
        '¿Dónde está el taller?',
        'Ver catálogo completo'
      ]
    };
  }

  // 8. BÚSQUEDA ESPECÍFICA POR PRODUCTO
  const matchingProds = PRODUCTS.filter(p => {
    const pName = normalizeText(p.name);
    const pDesc = normalizeText(p.description);
    const pTag = normalizeText(p.tagline);
    return (
      norm.includes(pName) ||
      pName.split(' ').some(w => w.length > 3 && norm.includes(w)) ||
      (norm.includes('jaguar') && pName.includes('jaguar')) ||
      (norm.includes('lapislazuli') && pName.includes('lapislazuli')) ||
      (norm.includes('pulsera') && pName.includes('pulsera')) ||
      (norm.includes('anillo') && pName.includes('anillo')) ||
      (norm.includes('pectoral') && pName.includes('pectoral'))
    );
  });

  if (matchingProds.length > 0) {
    const prod = matchingProds[0];
    return {
      text: `✨ **${prod.name}**\n\n${prod.description}\n\n• **Material:** ${prod.aroma?.salida || 'Mineral genuino'}\n• **Engarce:** ${prod.aroma?.corazon || 'Artesanal'}\n• **Precio:** $${prod.price.toLocaleString('es-MX')} MXN\n\n¿Deseas verla a detalle o agregarla a tu carrito?`,
      products: matchingProds.slice(0, 2),
      quickReplies: [
        `Ver ${prod.name.split(' ')[0]} en detalle`,
        'Ver todas las piezas',
        '¿Cómo comprar?',
        '¿Quién es el creador?'
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
      text: `👋 **¡Saludos! Bienvenido a PAKAL TUN**\n\nSoy tu **Guía de Joyería Prehispánica**. Te acompaño a descubrir las creaciones lapidarias en jade, turquesa y obsidiana talladas a mano por el **maestro Melquiades Villarreal** para la galería de **Sergio Pérez**.\n\n¿En qué te puedo asesorar hoy?\n• 📿 Descubrir nuestros **collares y pectorales ceremoniales**.\n• 💎 Conocer sobre el **jade auténtico** y sus yacimientos.\n• 📍 Visitar el **taller en Morelos 654, Agua Fría, Apodaca, N.L.**\n• ✨ Solicitar un **encargo personalizado a tu medida**.`,
      products: [PRODUCTS[0], PRODUCTS[1]],
      quickReplies: [
        '¿Quién es Melquiades Villarreal?',
        'Ver collares de jade',
        '¿Dónde está el taller?',
        'Tengo un cupón de descuento'
      ]
    };
  }

  // 10. RESPUESTA POR DEFECTO ORIENTADA
  return {
    text: `🌿 Estoy aquí para ayudarte a explorar el arte lapidario de **PAKAL TUN**, creado por **Sergio Pérez** y tallado por el **maestro Melquiades Villarreal**.\n\nPuedes preguntarme por:\n• **Piezas:** *"Collar de Pakal"*, *"Pectorales"*, *"Pulseras y anillos"*.\n• **Materiales:** *"¿Cómo saber si el jade es auténtico?"*, *"Turquesa y obsidiana"*.\n• **Taller y creador:** *"¿Quién es Melquiades Villarreal?"*, *"¿Dónde queda el taller?"*.\n• **Encargos:** *"¿Hacen piezas a medida?"*.`,
    products: [PRODUCTS[0], PRODUCTS[1]],
    quickReplies: [
      '¿Quién es Melquiades Villarreal?',
      'Ver Collares de Autor',
      'Visitar el taller en Apodaca',
      '¿El jade es auténtico?'
    ]
  };
}
