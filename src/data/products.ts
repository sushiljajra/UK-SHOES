export interface Product {
  id: string;
  name: string;
  category: "Sneakers" | "Sports" | "Casual" | "Formal" | "Lifestyle";
  subCategory?: string;
  price: number;
  formattedPrice: string;
  image: string;
  images?: string[];
  tag?: string;
  badgeStyle?: "dark" | "light";
  featureNote?: string;
  colors: {
    name: string;
    hex: string;
    border?: boolean;
  }[];
  availableSizes: (number | string)[];
  description: string;
  rating: number;
  reviewCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

export interface CategoryItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  slug: string;
  image: string;
  ctaText: string;
}

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: "cat-1",
    code: "01 // ESSENTIAL",
    title: "Sneakers",
    subtitle: "Modern daily classics",
    slug: "sneakers",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKOu7k260ehs9V_cPJd5VFBJW3Z9ojUgIIT0OQ7BOiuBoeuS9KWJYxbgizieO4HnQGYIIoIhE9cE1OVrTvd8us68W1t9Cbmkhlazx4hAmuvC-3N1WeSkkEZ8A33egoZ4UnvD9tTx-k2XWgo726j-057XIo-nZGg6n3PnVUbMesH4b-4MNrHftQfZRFZ5anS7CVGuO6shBvMZ3_BkLxSiSdT9ZP9UtMvLanAB9N1x73peFX_-NO51m9tA",
    ctaText: "Shop Sneakers",
  },
  {
    id: "cat-2",
    code: "02 // PERFORMANCE",
    title: "Sports & Performance",
    subtitle: "Engineered for speed",
    slug: "sports",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDirl97uM5J30JNIDHeADtvXRj4AG2CXvqRfZrk6w2mZhZHnRJUHFkdGYPl3EQA73Cg8AbAErg9He74gOx_fGdrEa0-a_U5v_LVEr21AYR-uC1c6KXouZQOm-IoX9h9jdIITb7onpLO7l1vtbQbAlvh0AUIhTbFmMYiZ4IXstibfA5ckjnoOI5Lb7Jj7UO7IMtKFUgumjxyJMXTEY0jni2pmYh4KXiQ_TwRu93Bx4wK1bqlVjvAGEgSaQ",
    ctaText: "Shop Sports",
  },
  {
    id: "cat-3",
    code: "03 // LIFESTYLE",
    title: "Casual Everyday",
    subtitle: "Relaxed luxury craftsmanship",
    slug: "casual",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgv_VRaK1jW1gCbq7Nl826K3V87ELcSWqi7ak2EBkIsY1oimy6GMo1TlCVUOCRYa29UmfobrXklQ3bax_SoRnTyPlTXbdLVBjZAA986P39l_Zm6JxWpgV9zuylNyU4o3F74zI7FAkUIFkRicNjzd6BAmPU8fCor1_dJR06_opHYywwTJQYp6f0hXJwN_MM2CQ5N55NMhLJbo64TRPGOS7_832teXPa5NcI3wI0VuHc4L42tFPcYIVIFQ",
    ctaText: "Shop Casual",
  },
  {
    id: "cat-4",
    code: "04 // SARTORIAL",
    title: "Formal & Dress",
    subtitle: "Handcrafted leather silhouettes",
    slug: "formal",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSyo-b5dgzCUVk1MW2Yi4Wm-tSar-VbRRD0HDmOGCKDOJVrLoZe65DLa2BT9A588zOcP0pUO_g27hMPu1sGbGD6HR2SKaYGIvmpiBj6aAH-C6FV-4jm28ZrMWhXnjC4KtVxB4FK1AEOI1nt4obCxvOFfhNcgnlVpTKmKY-fzBOFhYRXOwjnWel6-3SDJB8f9idujltWTHX6fv13LIggjyMXSa0MriFJw_9QoqFLrn_QfXdq7k8T97qUA",
    ctaText: "Shop Formal",
  },
];

export const PRODUCTS_DATA: Product[] = [
  // 1. Street Runner (New Arrival + Core Collection)
  {
    id: "prod-uk-street-runner",
    name: "UK Street Runner",
    category: "Sneakers",
    subCategory: "Lifestyle Sneaker",
    price: 4299,
    formattedPrice: "₹4,299",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKOu7k260ehs9V_cPJd5VFBJW3Z9ojUgIIT0OQ7BOiuBoeuS9KWJYxbgizieO4HnQGYIIoIhE9cE1OVrTvd8us68W1t9Cbmkhlazx4hAmuvC-3N1WeSkkEZ8A33egoZ4UnvD9tTx-k2XWgo726j-057XIo-nZGg6n3PnVUbMesH4b-4MNrHftQfZRFZ5anS7CVGuO6shBvMZ3_BkLxSiSdT9ZP9UtMvLanAB9N1x73peFX_-NO51m9tA",
    tag: "NEW RELEASE",
    badgeStyle: "dark",
    featureNote: "Free Shipping",
    colors: [
      { name: "Alabaster", hex: "#f4f3ef", border: true },
      { name: "Charcoal", hex: "#2a2927" },
      { name: "Sand Taupe", hex: "#d8ccbe" },
    ],
    availableSizes: [7, 8, 9, 10, 11, 12],
    description:
      "Streamlined urban runner designed with responsive Kinetic EVA cushioning, Italian suede accents, and breathable engineered mesh.",
    rating: 4.8,
    reviewCount: 142,
    isNewArrival: true,
  },

  // 2. Motion 01 (Performance Runner)
  {
    id: "prod-uk-motion-01",
    name: "UK Motion 01",
    category: "Sports",
    subCategory: "Athletic Running",
    price: 5499,
    formattedPrice: "₹5,499",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDirl97uM5J30JNIDHeADtvXRj4AG2CXvqRfZrk6w2mZhZHnRJUHFkdGYPl3EQA73Cg8AbAErg9He74gOx_fGdrEa0-a_U5v_LVEr21AYR-uC1c6KXouZQOm-IoX9h9jdIITb7onpLO7l1vtbQbAlvh0AUIhTbFmMYiZ4IXstibfA5ckjnoOI5Lb7Jj7UO7IMtKFUgumjxyJMXTEY0jni2pmYh4KXiQ_TwRu93Bx4wK1bqlVjvAGEgSaQ",
    tag: "PERFORMANCE",
    badgeStyle: "light",
    featureNote: "Vibram® Sole",
    colors: [
      { name: "Onyx Black", hex: "#1b1b1b" },
      { name: "Titanium Silver", hex: "#b8bcbf" },
    ],
    availableSizes: [7, 8, 9, 10, 11],
    description:
      "High-output performance trainer featuring lightweight carbon-infused propulsion plates and precision-molded Vibram outsoles.",
    rating: 4.9,
    reviewCount: 98,
    isNewArrival: true,
    isBestSeller: true,
  },

  // 3. Court Classic (Timeless Tennis Heritage)
  {
    id: "prod-uk-court-classic",
    name: "UK Court Classic",
    category: "Sneakers",
    subCategory: "Tennis Heritage",
    price: 3499,
    formattedPrice: "₹3,499",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GPRqAjWdA--g1KmS_2ZV7Go2LPY58qFX_uBhQn37tVgvQgSuTTt9sPj111AvX01MxZRPSt5jq8Omky77Go9dbhc7PQ99n8om5vtIoM34_JMlh8Rs5Yv3UeOtX36_A5RzPhL5gQM3XoHlX2qBKY2runrk6gBOQcNDFViTcEsX4iOl3ZzQS6CLbXckPc8j8QMwxObrwuhBXyrdak02wGkqmJpk3JEiBOaJ6NhWUKeCnJYHw04hU4pz4w",
    tag: "ICONIC",
    badgeStyle: "light",
    featureNote: "Calfskin",
    colors: [
      { name: "Optic White", hex: "#fbfbfa", border: true },
      { name: "Navy Accent", hex: "#1e2a44" },
    ],
    availableSizes: [6, 7, 8, 9, 10, 11, 12],
    description:
      "Crisp, minimal low-top tennis silhouette crafted from supple full-grain Italian calfskin with reinforced welt stitching.",
    rating: 4.9,
    reviewCount: 310,
    isNewArrival: true,
    isBestSeller: true,
  },

  // 4. Urban Low (Suede Casual)
  {
    id: "prod-uk-urban-low",
    name: "UK Urban Low",
    category: "Casual",
    subCategory: "Casual Silhouette",
    price: 2999,
    formattedPrice: "₹2,999",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgv_VRaK1jW1gCbq7Nl826K3V87ELcSWqi7ak2EBkIsY1oimy6GMo1TlCVUOCRYa29UmfobrXklQ3bax_SoRnTyPlTXbdLVBjZAA986P39l_Zm6JxWpgV9zuylNyU4o3F74zI7FAkUIFkRicNjzd6BAmPU8fCor1_dJR06_opHYywwTJQYp6f0hXJwN_MM2CQ5N55NMhLJbo64TRPGOS7_832teXPa5NcI3wI0VuHc4L42tFPcYIVIFQ",
    tag: "PREMIUM SUEDE",
    badgeStyle: "light",
    featureNote: "Natural Gum",
    colors: [
      { name: "Oatmeal Suede", hex: "#c7b39b" },
      { name: "Espresso", hex: "#41352a" },
      { name: "Olive Earth", hex: "#525745" },
    ],
    availableSizes: [7, 8, 9, 10, 11],
    description:
      "Relaxed everyday staple constructed with velvety split-suede leather and an unbleached natural vulcanized rubber sole.",
    rating: 4.7,
    reviewCount: 84,
    isNewArrival: true,
  },

  // 5. Artisan Derby (Handcrafted Dress Formal)
  {
    id: "prod-uk-artisan-derby",
    name: "UK Artisan Derby",
    category: "Formal",
    subCategory: "Artisan Line",
    price: 6999,
    formattedPrice: "₹6,999",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSyo-b5dgzCUVk1MW2Yi4Wm-tSar-VbRRD0HDmOGCKDOJVrLoZe65DLa2BT9A588zOcP0pUO_g27hMPu1sGbGD6HR2SKaYGIvmpiBj6aAH-C6FV-4jm28ZrMWhXnjC4KtVxB4FK1AEOI1nt4obCxvOFfhNcgnlVpTKmKY-fzBOFhYRXOwjnWel6-3SDJB8f9idujltWTHX6fv13LIggjyMXSa0MriFJw_9QoqFLrn_QfXdq7k8T97qUA",
    tag: "ARTISAN LINE",
    badgeStyle: "dark",
    featureNote: "Hand Welted",
    colors: [
      { name: "Espresso Welt", hex: "#2b1e17" },
      { name: "Deep Charcoal", hex: "#191919" },
    ],
    availableSizes: [7, 8, 9, 10, 11],
    description:
      "Timeless open-lacing derby hand-finished with vegetable-tanned French box calf leather and traditional Goodyear welt.",
    rating: 4.9,
    reviewCount: 67,
    isBestSeller: true,
  },

  // 6. Street Runner Bone
  {
    id: "prod-uk-street-runner-bone",
    name: "UK Street Runner Core",
    category: "Sneakers",
    subCategory: "Lifestyle Sneaker",
    price: 4299,
    formattedPrice: "₹4,299",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKOu7k260ehs9V_cPJd5VFBJW3Z9ojUgIIT0OQ7BOiuBoeuS9KWJYxbgizieO4HnQGYIIoIhE9cE1OVrTvd8us68W1t9Cbmkhlazx4hAmuvC-3N1WeSkkEZ8A33egoZ4UnvD9tTx-k2XWgo726j-057XIo-nZGg6n3PnVUbMesH4b-4MNrHftQfZRFZ5anS7CVGuO6shBvMZ3_BkLxSiSdT9ZP9UtMvLanAB9N1x73peFX_-NO51m9tA",
    tag: "CORE COLORWAY",
    badgeStyle: "light",
    featureNote: "Best Seller",
    colors: [
      { name: "Bone", hex: "#f0ede6", border: true },
      { name: "Slate Grey", hex: "#5b6166" },
    ],
    availableSizes: [7, 8, 9, 10, 11, 12],
    description:
      "Signature monochrome silhouette engineered for 15,000+ daily steps with anatomical arch stability.",
    rating: 4.8,
    reviewCount: 220,
    isBestSeller: true,
  },

  // 7. Velocity Strider (Sports / Running)
  {
    id: "prod-uk-velocity-strider",
    name: "UK Velocity Strider",
    category: "Sports",
    subCategory: "Distance Running",
    price: 4999,
    formattedPrice: "₹4,999",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDirl97uM5J30JNIDHeADtvXRj4AG2CXvqRfZrk6w2mZhZHnRJUHFkdGYPl3EQA73Cg8AbAErg9He74gOx_fGdrEa0-a_U5v_LVEr21AYR-uC1c6KXouZQOm-IoX9h9jdIITb7onpLO7l1vtbQbAlvh0AUIhTbFmMYiZ4IXstibfA5ckjnoOI5Lb7Jj7UO7IMtKFUgumjxyJMXTEY0jni2pmYh4KXiQ_TwRu93Bx4wK1bqlVjvAGEgSaQ",
    tag: "DISTANCE PRO",
    badgeStyle: "light",
    featureNote: "Dual-Foam Core",
    colors: [
      { name: "Stealth Grey", hex: "#4b4f54" },
      { name: "Pure White", hex: "#fafafa", border: true },
    ],
    availableSizes: [8, 9, 10, 11],
    description:
      "Ultra-breathable seamless upper bonded to an energy-return dual foam chassis for long-distance city pavement runners.",
    rating: 4.7,
    reviewCount: 73,
  },

  // 8. Studio Chelsea (Casual / Lifestyle)
  {
    id: "prod-uk-studio-chelsea",
    name: "UK Studio Chelsea Boot",
    category: "Casual",
    subCategory: "Ankle Boot",
    price: 6499,
    formattedPrice: "₹6,499",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgv_VRaK1jW1gCbq7Nl826K3V87ELcSWqi7ak2EBkIsY1oimy6GMo1TlCVUOCRYa29UmfobrXklQ3bax_SoRnTyPlTXbdLVBjZAA986P39l_Zm6JxWpgV9zuylNyU4o3F74zI7FAkUIFkRicNjzd6BAmPU8fCor1_dJR06_opHYywwTJQYp6f0hXJwN_MM2CQ5N55NMhLJbo64TRPGOS7_832teXPa5NcI3wI0VuHc4L42tFPcYIVIFQ",
    tag: "WATER RESISTANT",
    badgeStyle: "dark",
    featureNote: "Storm Welt",
    colors: [
      { name: "Waxed Tobacco", hex: "#4a3319" },
      { name: "Jet Black", hex: "#151515" },
    ],
    availableSizes: [7, 8, 9, 10, 11],
    description:
      "Clean architectural pull-on silhouette with heavy elastic gore inserts and rugged textured lug sole.",
    rating: 4.9,
    reviewCount: 52,
  },

  // 9. Minimalist Oxford (Formal)
  {
    id: "prod-uk-minimalist-oxford",
    name: "UK Minimalist Oxford",
    category: "Formal",
    subCategory: "Formal Silhouettes",
    price: 5999,
    formattedPrice: "₹5,999",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSyo-b5dgzCUVk1MW2Yi4Wm-tSar-VbRRD0HDmOGCKDOJVrLoZe65DLa2BT9A588zOcP0pUO_g27hMPu1sGbGD6HR2SKaYGIvmpiBj6aAH-C6FV-4jm28ZrMWhXnjC4KtVxB4FK1AEOI1nt4obCxvOFfhNcgnlVpTKmKY-fzBOFhYRXOwjnWel6-3SDJB8f9idujltWTHX6fv13LIggjyMXSa0MriFJw_9QoqFLrn_QfXdq7k8T97qUA",
    tag: "TAILORED",
    badgeStyle: "dark",
    featureNote: "Mirror Polish",
    colors: [
      { name: "Midnight Black", hex: "#111111" },
      { name: "Cordovan Brown", hex: "#3b1e1b" },
    ],
    availableSizes: [7, 8, 9, 10, 11, 12],
    description:
      "Closed-lacing formal shoe featuring flawless wholecut quarters and beveled waist beveling for black-tie elegance.",
    rating: 4.9,
    reviewCount: 41,
  },

  // 10. Atelier Slide (Lifestyle)
  {
    id: "prod-uk-atelier-slide",
    name: "UK Atelier Slide",
    category: "Lifestyle",
    subCategory: "Modern Lounge",
    price: 2499,
    formattedPrice: "₹2,499",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgv_VRaK1jW1gCbq7Nl826K3V87ELcSWqi7ak2EBkIsY1oimy6GMo1TlCVUOCRYa29UmfobrXklQ3bax_SoRnTyPlTXbdLVBjZAA986P39l_Zm6JxWpgV9zuylNyU4o3F74zI7FAkUIFkRicNjzd6BAmPU8fCor1_dJR06_opHYywwTJQYp6f0hXJwN_MM2CQ5N55NMhLJbo64TRPGOS7_832teXPa5NcI3wI0VuHc4L42tFPcYIVIFQ",
    tag: "SUSTAINABLE",
    badgeStyle: "light",
    featureNote: "Molded Cork",
    colors: [
      { name: "Sand", hex: "#ded4c5" },
      { name: "Pitch Black", hex: "#1a1a1a" },
    ],
    availableSizes: [6, 7, 8, 9, 10, 11],
    description:
      "Ergonomically contoured slide cast with recycled cork footbed and padded nappa leather bridge strap.",
    rating: 4.6,
    reviewCount: 89,
  },

  // 11. Pace Aero (Sports)
  {
    id: "prod-uk-pace-aero",
    name: "UK Pace Aero Knit",
    category: "Sports",
    subCategory: "Speed Training",
    price: 3999,
    formattedPrice: "₹3,999",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDirl97uM5J30JNIDHeADtvXRj4AG2CXvqRfZrk6w2mZhZHnRJUHFkdGYPl3EQA73Cg8AbAErg9He74gOx_fGdrEa0-a_U5v_LVEr21AYR-uC1c6KXouZQOm-IoX9h9jdIITb7onpLO7l1vtbQbAlvh0AUIhTbFmMYiZ4IXstibfA5ckjnoOI5Lb7Jj7UO7IMtKFUgumjxyJMXTEY0jni2pmYh4KXiQ_TwRu93Bx4wK1bqlVjvAGEgSaQ",
    tag: "FEATHERLIGHT",
    badgeStyle: "light",
    featureNote: "AeroKnit Mesh",
    colors: [
      { name: "Pure Chalk", hex: "#f5f5f3", border: true },
      { name: "Graphite", hex: "#333438" },
    ],
    availableSizes: [7, 8, 9, 10, 11],
    description:
      "Weighing under 210g, the Pace Aero utilizes a seamless 3D knit upper with dynamic zoning for high-cadence strides.",
    rating: 4.8,
    reviewCount: 62,
  },

  // 12. Loft High-Top (Sneakers)
  {
    id: "prod-uk-loft-high-top",
    name: "UK Loft High-Top",
    category: "Sneakers",
    subCategory: "High-Top Sneaker",
    price: 4999,
    formattedPrice: "₹4,999",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKOu7k260ehs9V_cPJd5VFBJW3Z9ojUgIIT0OQ7BOiuBoeuS9KWJYxbgizieO4HnQGYIIoIhE9cE1OVrTvd8us68W1t9Cbmkhlazx4hAmuvC-3N1WeSkkEZ8A33egoZ4UnvD9tTx-k2XWgo726j-057XIo-nZGg6n3PnVUbMesH4b-4MNrHftQfZRFZ5anS7CVGuO6shBvMZ3_BkLxSiSdT9ZP9UtMvLanAB9N1x73peFX_-NO51m9tA",
    tag: "LIMITED DROP",
    badgeStyle: "dark",
    featureNote: "Padded Collar",
    colors: [
      { name: "Parchment & Charcoal", hex: "#e2ddd5", border: true },
      { name: "Monochrome Black", hex: "#181818" },
    ],
    availableSizes: [8, 9, 10, 11, 12],
    description:
      "Architectural high-profile collar with reinforced ankle support and brushed grain bovine leather panels.",
    rating: 4.8,
    reviewCount: 104,
  },

  // 13. Loafer Venice (Casual / Formal)
  {
    id: "prod-uk-loafer-venice",
    name: "UK Venice Penny Loafer",
    category: "Casual",
    subCategory: "Tailored Casual",
    price: 5499,
    formattedPrice: "₹5,499",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSyo-b5dgzCUVk1MW2Yi4Wm-tSar-VbRRD0HDmOGCKDOJVrLoZe65DLa2BT9A588zOcP0pUO_g27hMPu1sGbGD6HR2SKaYGIvmpiBj6aAH-C6FV-4jm28ZrMWhXnjC4KtVxB4FK1AEOI1nt4obCxvOFfhNcgnlVpTKmKY-fzBOFhYRXOwjnWel6-3SDJB8f9idujltWTHX6fv13LIggjyMXSa0MriFJw_9QoqFLrn_QfXdq7k8T97qUA",
    tag: "HERITAGE",
    badgeStyle: "light",
    featureNote: "Unlined Calf",
    colors: [
      { name: "Rich Burgundy", hex: "#4a1c1d" },
      { name: "Saddle Tan", hex: "#7a4627" },
    ],
    availableSizes: [7, 8, 9, 10, 11],
    description:
      "Unlined slip-on penny loafer that molds instantaneously to the contours of your foot, finished with hand-burnished edges.",
    rating: 4.9,
    reviewCount: 77,
  },

  // 14. Trail Ascent (Sports / Performance)
  {
    id: "prod-uk-trail-ascent",
    name: "UK Trail Ascent GTX",
    category: "Sports",
    subCategory: "All-Terrain Trainer",
    price: 5999,
    formattedPrice: "₹5,999",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDirl97uM5J30JNIDHeADtvXRj4AG2CXvqRfZrk6w2mZhZHnRJUHFkdGYPl3EQA73Cg8AbAErg9He74gOx_fGdrEa0-a_U5v_LVEr21AYR-uC1c6KXouZQOm-IoX9h9jdIITb7onpLO7l1vtbQbAlvh0AUIhTbFmMYiZ4IXstibfA5ckjnoOI5Lb7Jj7UO7IMtKFUgumjxyJMXTEY0jni2pmYh4KXiQ_TwRu93Bx4wK1bqlVjvAGEgSaQ",
    tag: "ALL-WEATHER",
    badgeStyle: "dark",
    featureNote: "Waterproof Shield",
    colors: [
      { name: "Basalt Black", hex: "#232629" },
      { name: "Earth Ochre", hex: "#8a6c42" },
    ],
    availableSizes: [8, 9, 10, 11, 12],
    description:
      "Waterproof membrane lining fused with multidirectional 5mm chevron lugs for relentless grip on dirt, rock, and wet urban pavements.",
    rating: 4.9,
    reviewCount: 54,
  },
];

/**
 * Helper to convert product ID to clean slug
 * e.g. "prod-uk-street-runner" -> "uk-street-runner"
 */
export function getProductSlug(productId: string): string {
  return productId.replace(/^prod-/, "");
}

/**
 * Helper to look up product by slug or id
 */
export function getProductBySlug(slug: string): Product | undefined {
  const normalizedSlug = slug.toLowerCase().trim();
  return PRODUCTS_DATA.find((p) => {
    const pSlug = getProductSlug(p.id).toLowerCase();
    return pSlug === normalizedSlug || p.id.toLowerCase() === normalizedSlug;
  });
}
