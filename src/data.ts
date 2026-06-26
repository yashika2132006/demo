import { Product, BlogPost } from './types';

export const productsList: Product[] = [
  {
    id: 'glow-radiance-serum',
    name: 'Glow Radiance Face Serum',
    price: 799,
    description: 'An ultra-luminous liquid highlighter serum enriched with Vitamin C and Hyaluronic Acid that delivers a sheer, dew-kissed cosmetic highlight. Perfect to wear alone, as a makeup primer, or mixed with your skin tint.',
    benefits: [
      'Luminous dewy highlight',
      'Infuses gold micro-pearls',
      'Smooths and brightens tone'
    ],
    image: '/src/assets/images/glow_serum_1781759302632.jpg',
    rating: 4.8,
    reviewsCount: 124,
    size: '30ml',
    category: 'Highlighters',
    skinTypes: ['All', 'Dry', 'Oily', 'Normal', 'Combination'],
    ingredients: ['Vitamin C (L-Ascorbic Acid)', 'Hyaluronic Acid', 'Gold Micro-shimmer', 'Niacinamide', 'Aloe Vera Leaf Extract', 'Glycerin', 'Purified Water']
  },
  {
    id: 'hydrating-rose-moisturizer',
    name: 'Hydrating Rose Moisturizer',
    price: 599,
    description: 'A luxurious damask rose-infused day cream that acts as the ultimate hydrating primer. It preps your skin canvas perfectly, locking in lightweight moisture for seamless makeup application.',
    benefits: [
      'Velvety smooth primers',
      'Pores-blurring dewy finish',
      'Preps seamless makeup canvas'
    ],
    image: '/src/assets/images/rose_moisturizer_1781759316522.jpg',
    rating: 4.7,
    reviewsCount: 98,
    size: '50g',
    category: 'Primers',
    skinTypes: ['All', 'Normal', 'Dry', 'Sensitive', 'Combination'],
    ingredients: ['Pure Rose Damascena Water', 'Shea Butter', 'Jojoba Seed Oil', 'Vitamin E', 'Panthenol', 'Chamomile Flower Extract']
  },
  {
    id: 'charcoal-detox-face-wash',
    name: 'Charcoal Detox Face Wash',
    price: 349,
    description: 'A deep-cleansing gel-to-foam makeup melter that instantly dissolves stubborn cosmetic pigment, excess oils, and daily grime without stripping the skin balance.',
    benefits: [
      'Instant makeup melter',
      'Clears cosmetic pigments',
      'Unclogs pores & deep purification'
    ],
    image: '/src/assets/images/charcoal_wash_1781759333250.jpg',
    rating: 4.5,
    reviewsCount: 156,
    size: '100ml',
    category: 'Makeup Melts',
    skinTypes: ['Oily', 'Combination', 'Normal'],
    ingredients: ['Activated Charcoal Powder', 'Salicylic Acid', 'Tea Tree Leaf Oil', 'Menthol', 'Glycerin', 'Cocamidopropyl Betaine']
  },
  {
    id: 'vit-c-brightening-cream',
    name: 'Vitamin C Brightening Cream',
    price: 699,
    description: 'A multi-tasking tinted beauty cream (BB Cream) designed to provide airbrushed sheer coverage, lock in moisture, and shield against environmental stress while brightening dark spots.',
    benefits: [
      'Sheer-coverage BB cream',
      'Evens skin complexion',
      'Fades blemishes with Vitamin C'
    ],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviewsCount: 84,
    size: '50ml',
    category: 'Skin Tints',
    skinTypes: ['All', 'Normal', 'Dry', 'Combination'],
    ingredients: ['Vitamin C (Sodium Ascorbyl Phosphate)', 'Zinc Oxide sheer tint', 'Alpha Arbutin', 'Rosehip Oil', 'Ceramides', 'Squalane']
  },
  {
    id: 'nourishing-lip-balm',
    name: 'Nourishing Lip Balm',
    price: 199,
    description: 'A high-potency hybrid lip gloss oil and balm that drenches your lips in high-shine nourishment, a soft strawberry-pink tint, and a sweet fresh aroma.',
    benefits: [
      'Juicy high-shine tint',
      'Drenches lips in wild gloss',
      'Restores dry, cracked lips'
    ],
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 142,
    size: '10g',
    category: 'Lip Gloss',
    skinTypes: ['All', 'Normal', 'Dry', 'Sensitive'],
    ingredients: ['Organic Beeswax', 'Coconut Oil', 'Wild Rose Extract', 'Sweet Almond Oil', 'Strawberry Shimmer Pigment', 'Honey Extract']
  }
];

export const blogPostsList: BlogPost[] = [
  {
    id: 'glowing-skin-steps',
    title: '5 Steps for a Luminous Dewy Beauty Look',
    excerpt: 'Healthy, radiant beauty starts with the perfect base, hydrating highlighter serums, and targeted skincare-makeup hybrids.',
    content: `Achieving a luminous, natural glow isn't about loading heavy foundation or complicated concealers. In fact, prepping your base with organic botanicals is the true secret behind a flawless dewy beauty look.

Here are 5 simple, effective steps you can insert into your daily self-care and beauty ritual:

1. **Dissolving Stubborn Makeup**: Always start on a pristine canvas. Our *Charcoal Detox Face Wash* acts as a clarifying makeup melter to sweep away trapped powder, heavy eye pigments, and daily sunscreen.
2. **Applying Luminous Primer**: Apply our *Hydrating Rose Moisturizer* to wet skin as a dewy prep base. It fills micro-lines and refines texture so that any skin tint glides on like pure silk.
3. **The Gold Serum Highlight Trick**: To get an inner light-from-within sheen, pat 2-3 drops of *Glow Radiance Face Serum* (enriched with gold micro-pearls) directly onto high cheekbones, brow bones, and the bridge of your nose before your color products.
4. **Breathable Skin Tints**: Switch your heavy matte foundations for an air-light, nourishing option like the *Vitamin C Brightening Cream* (a sheer tint BB cream) to keep your face looking fresh, real, and radiant.
5. **A Tinted Gloss Finish**: Never forget the lips! Seal your final look with our sweet strawberry-infused *Nourishing Lip Balm* to lock in plumpness, prevent dry lines, and add a beautiful wet-look gloss.

"Helping you glow naturally, every day."`,
    date: 'June 15, 2026',
    readTime: '3 min read',
    category: 'Beauty Guide',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'vitamin-c-essential',
    title: 'Why Vitamin C Tints are Essential in Cosmetics',
    excerpt: 'Vitamin C helps brighten skin while acting as a natural shield inside your makeup routine.',
    content: `If you could pick only one active ingredient to rescue tired, dull skin while wearing cosmetics, let it be Vitamin C. Beauty and skincare experts around the world swear by this potent antioxidant for its unparalleled ability to revive the skin barrier under your makeup.

Here is why Vitamin C is a non-negotiable powerhouse in your beauty bag:

### 1. Brightens as You Wear It
Typical heavy cosmetics can trap oils and oxygenate, making skin look grey by mid-afternoon. Utilizing a Vit-C infused product like our *Vitamin C Brightening Cream* ensures active pigment brightening continues throughout the day.

### 2. Creates a Radiant Highlight Effect
Vitamin C is master at inhibiting melanin production, the compound responsible for dark spots and uneven hyperpigmentation. Regular application of a specialized serum, like our *Glow Radiance Face Serum*, reveals an incredibly brighter, clearer, and more transparent tone.

### 3. Ultimate Environmental Shield
Daily exposure to city smog, smokes, car fumes, and solar radiation triggers "free radicals" that degrade your skin elasticity under makeup. Vitamin C acts as a protective shield, donating electrons to keep your makeup fresh and prevent oxidative dullness.

How to incorporate it: Apply our Vitamin C rich products in the morning to optimize sunscreen protection. Always store your beauty serums away from direct heat and light!`,
    date: 'June 10, 2026',
    readTime: '4 min read',
    category: 'Ingredients',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800'
  }
];

export const skinQuizQuestionsList = [
  {
    id: 1,
    question: "What is your desired beauty and makeup finish?",
    options: [
      { text: "Luminous, ultra-dewy, and shimmering gold highlights", value: "Dry" },
      { text: "Velvet satin, long-wear matte, and oil-controlled", value: "Oily" },
      { text: "Hypoallergenic, soft natural glow, and calm sheer beauty", value: "Sensitive" },
      { text: "Slight highlight on cheekbones but satin on the T-zone", value: "Combination" },
      { text: "Lightweight, balanced everyday look with a sheer tint", value: "Normal" }
    ]
  },
  {
    id: 2,
    question: "What is your main beauty and cosmetic goal?",
    options: [
      { text: "High-shine highlighting & glowing complexion with Vitamin C", value: "glow" },
      { text: "Flawless dewy prep, velvet canvas, and moisturizing primer", value: "hydration" },
      { text: "Effortless makeup melting and deep clarifying cleanse", value: "pores" },
      { text: "High-shine juicy plump lips with a soft strawberry pink tint", value: "lip" }
    ]
  }
];
