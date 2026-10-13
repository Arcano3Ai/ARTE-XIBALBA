export const PRODUCTS = [
  // --- JOYERÍA PREHISPÁNICA DE AUTOR & COLLARES PAKAL TUN ---
  {
    id: 'collar-pakal-jade',
    name: 'Collar Máscara de Pakal en Jade Auténtico (Colección 2027)',
    category: 'collares',
    categoryLabel: 'Collares de Autor',
    price: 3200,
    originalPrice: 3800,
    rating: 5.0,
    reviewsCount: 47,
    isFeatured: true,
    badge: 'Pieza Insignia',
    image: './assets/images/pakal_tun_collar_jade.jpg',
    tagline: 'Pieza de autor en jadeíta verde con calaveras talladas y cuentas ceremoniales.',
    description: 'Collar monumental de alta artesanía prehispánica creado por el maestro Yax Balam. Presenta un pectoral central con la icónica máscara funeraria de Pakal finamente tallada en jadeíta verde auténtica, escoltada por cuentas de obsidiana pulida, turquesa natural y calaveras de hueso esculpidas a mano. Una pieza de colección que encarna la soberanía y el cosmos maya.',
    aroma: {
      salida: 'Jadeíta Genuina de Guatemala / México',
      corazon: 'Turquesa Natural & Obsidiana Negra',
      fondo: 'Calaveras Talladas a Mano'
    },
    experience: 'Joyería de autor única para ocasiones solemnes, colección de arte o porte ceremonial.',
    variants: [
      { id: 'cpj-estandar', label: 'Collar Completo con Pectoral Pakal Jade', price: 3200 }
    ],
    inStock: true,
    stockQuantity: 5
  },
  {
    id: 'collar-jaguar-ancestral',
    name: 'Collar Ceremonial Cabeza de Jaguar (Piedra Tallada)',
    category: 'collares',
    categoryLabel: 'Collares de Autor',
    price: 2800,
    originalPrice: 3400,
    rating: 5.0,
    reviewsCount: 39,
    isFeatured: true,
    badge: 'Edición Limitada',
    image: './assets/images/pakal_tun_galeria_vitrina.jpg',
    tagline: 'Efigie escultórica de Ocelotl tallada con cuentas de ojo de tigre y jade.',
    description: 'Inspirado en la fuerza y el sigilo del jaguar nocturno mesoamericano. Dije central escultórico con fauces abiertas y detalles en alto relieve, engarzado en un cordón ceremonial con cuentas minerales de ojo de tigre, obsidiana dorada y piedra volcánica.',
    aroma: {
      salida: 'Escultura en Piedra Mineral Natural',
      corazon: 'Ojo de Tigre & Obsidiana Dorada',
      fondo: 'Acabado Artesanal de Autor'
    },
    experience: 'Amuleto de protección, fuerza y visión nocturna del linaje tolteca y maya.',
    variants: [
      { id: 'cja-estandar', label: 'Collar Cabeza de Jaguar con Cuentas', price: 2800 }
    ],
    inStock: true,
    stockQuantity: 7
  },
  {
    id: 'collar-mascara-lapislazuli',
    name: 'Pectoral Máscara Ceremonial en Lapislázuli & Cuentas Naturales',
    category: 'mascaras',
    categoryLabel: 'Máscaras & Pectorales',
    price: 3100,
    originalPrice: 3600,
    rating: 4.9,
    reviewsCount: 31,
    isFeatured: true,
    badge: 'Galería de Autor',
    image: './assets/images/pakal_tun_galeria_vitrina.jpg',
    tagline: 'Rostro ceremonial tallado en piedra azul profunda con cuentas de concha y hueso.',
    description: 'Pieza exclusiva de la Galería de Autor PAKAL TUN. Máscara prehispánica esculpida en lapislázuli que evoca el manto celeste y el agua primordial, enmarcada con cuentas blancas de concha nácar y hueso natural.',
    aroma: {
      salida: 'Lapislázuli Mineral Azul Ultramar',
      corazon: 'Cuentas de Concha Nácar & Hueso',
      fondo: 'Montaje Resistente de Alta Durabilidad'
    },
    experience: 'Elegancia sobria y conexión espiritual con las deidades celestes mesoamericanas.',
    variants: [
      { id: 'cml-estandar', label: 'Pectoral Lapislázuli con Cordón Ritual', price: 3100 }
    ],
    inStock: true,
    stockQuantity: 4
  },
  {
    id: 'collar-rostro-jade-obscuro',
    name: 'Collar Rostro Sagrado en Jade Verde Oscuro & Turquesa',
    category: 'collares',
    categoryLabel: 'Collares de Autor',
    price: 2950,
    originalPrice: 3500,
    rating: 5.0,
    reviewsCount: 28,
    isFeatured: true,
    badge: 'Más Deseado',
    image: './assets/images/pakal_tun_galeria_vitrina.jpg',
    tagline: 'Máscara pulida en jadeíta oscura con esferas de turquesa y piedra volcánica.',
    description: 'Contraste sublime entre el verde bosque del jade pulido a mano y la textura rústica de la roca volcánica y turquesa. Simboliza la dualidad entre la tierra fértil y el mundo subterráneo de la cosmovisión prehispánica.',
    aroma: {
      salida: 'Jadeíta Verde Bosque Pulida a Espejo',
      corazon: 'Turquesa Natural en Esferas',
      fondo: 'Lava Volcánica Porosa & Obsidiana'
    },
    experience: 'Equilibrio de energías terrestres y distinción artesanal incomparable.',
    variants: [
      { id: 'crj-estandar', label: 'Collar Rostro Jade Oscuro Completo', price: 2950 }
    ],
    inStock: true,
    stockQuantity: 6
  },
  {
    id: 'pulseras-anillos-prehispanicos',
    name: 'Colección de Brazaletes y Anillos Prehispánicos en Jade',
    category: 'brazaletes',
    categoryLabel: 'Brazaletes & Anillos',
    price: 650,
    originalPrice: 850,
    rating: 4.9,
    reviewsCount: 54,
    isFeatured: true,
    badge: 'Artesanía Fina',
    image: './assets/images/pakal_tun_exhibidor_artesanal.png',
    tagline: 'Piezas individuales y juegos en jade, turquesa, coral, ámbar y plata.',
    description: 'Selección de pulseras en sartales de piedras semipreciosas seleccionadas a mano y anillos tallados en jade, serpentina y plata. Disponibles en el taller sagrado de la Zona Oculta Maya y con envío seguro a todo el país.',
    aroma: {
      salida: 'Jade Auténtico, Turquesa & Ámbar',
      corazon: 'Talla Lapidaria a Medida',
      fondo: 'Minerales 100% Genuinos'
    },
    experience: 'Porte diario con la calidez, protección y elegancia de los minerales sagrados.',
    variants: [
      { id: 'pa-pulsera', label: 'Brazalete de Jade / Turquesa', price: 650 },
      { id: 'pa-anillo', label: 'Anillo Tallado en Mineral', price: 550 },
      { id: 'pa-set', label: 'Set Dúo (Brazalete + Anillo)', price: 1100 }
    ],
    inStock: true,
    stockQuantity: 25
  },
  {
    id: 'pectoral-solar-mexica',
    name: 'Pectoral Monumental Guerrero Prehispánico en Mosaico',
    category: 'mascaras',
    categoryLabel: 'Máscaras & Pectorales',
    price: 3400,
    originalPrice: 4200,
    rating: 5.0,
    reviewsCount: 22,
    isFeatured: true,
    badge: 'Pieza de Colección',
    image: './assets/images/pakal_tun_exhibidor_artesanal.png',
    tagline: 'Gran medallón ceremonial tallado con iconografía ancestral y cuentas de serpentina.',
    description: 'Magnífico pectoral inspirado en los discos sagrados y guerreros de la tradición mexica y tolteca. Una obra lapidaria de autor firmada por el maestro Yax Balam que rinde homenaje a los grandes maestros talladores del México antiguo.',
    aroma: {
      salida: 'Serpentina & Mosaico Lapidario',
      corazon: 'Iconografía Tradicional Ancestral',
      fondo: 'Pieza de Autor por el Maestro Yax Balam'
    },
    experience: 'Centro de atención para coleccionistas, exposiciones y ceremonias tradicionales.',
    variants: [
      { id: 'psm-estandar', label: 'Pectoral Monumental con Cordón', price: 3400 }
    ],
    inStock: true,
    stockQuantity: 3
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Todas las Piezas', icon: '✦' },
  { id: 'collares', label: 'Collares de Autor', icon: '📿' },
  { id: 'mascaras', label: 'Máscaras & Pectorales', icon: '🎭' },
  { id: 'brazaletes', label: 'Brazaletes & Anillos', icon: '💍' },
  { id: 'minerales', label: 'Jade & Minerales', icon: '💎' }
];
