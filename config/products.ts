import type { CategorySlug, Product, ProductImage } from '@/types/product';

// SS26 range, transcribed from PRTFLO_linesheet_v1.xlsx (Linesheet + Shot
// Manifest sheets). Twenty pieces, four shots each, asset codes
// {ProductCode}_{ColourCode}_{ShotNo} — e.g. PRTM01_INK_01.

// Every product carries the same four-shot set from the Shot Manifest:
// 01 ghost hero, 02 full-length editorial, 03 mid-crop (top crop for
// tops/dresses, bottom crop for bottoms/skirts), 04 detail macro.
const shots = (
  category: CategorySlug,
  slug: string,
  code: string,
  colourCode: string,
  name: string,
  detail: string,
  crop: 'top' | 'bottom',
): ProductImage[] =>
  (
    [
      ['ghost hero', 'ghost mannequin, front'],
      ['editorial', 'on model, full length'],
      ['mid-crop', crop === 'top' ? 'on model, top crop' : 'on model, bottom crop'],
      ['detail macro', `detail — ${detail.toLowerCase()}`],
    ] as const
  ).map(([shotType, view], i) => ({
    src: `/products/${category}/${slug}/${String(i + 1).padStart(2, '0')}.webp`,
    alt: `${name} — ${view}`,
    shotType,
    assetCode: `${code}_${colourCode}_${String(i + 1).padStart(2, '0')}`,
  }));

export const PRODUCTS: Product[] = [
  // ── Men · PRTM01–10 ──────────────────────────────────────────────────────
  {
    slug: 'heavyweight-boxy-tee',
    name: 'Heavyweight boxy tee',
    code: 'PRTM01',
    colourCode: 'INK',
    category: 'men',
    basePriceGBP: 55,
    shortDescription: '240gsm jersey, boxy, ink navy.',
    description:
      'Cut boxy in a dense 240gsm jersey that holds its own line. Contrast ecru flatlock stitching traces the shoulders and side seams; a woven PRTFLO tab sits at the hem. Dropped shoulders, wide drop-needle rib collar, straight hem.',
    signatureDetail: 'Ecru flatlock seam line + woven PRTFLO hem tab',
    composition: '240gsm cotton jersey.',
    care: 'Machine wash cold. Dry flat.',
    images: shots('men', 'heavyweight-boxy-tee', 'PRTM01', 'INK', 'Heavyweight boxy tee', 'Ecru flatlock seam line + woven PRTFLO hem tab', 'top'),
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
    ],
    colours: ['Ink Navy'],
    isBestSeller: true,
  },
  {
    slug: 'garment-dyed-slogan-tee',
    name: 'Garment-dyed slogan tee',
    code: 'PRTM02',
    colourCode: 'FOR',
    category: 'men',
    basePriceGBP: 50,
    shortDescription: 'Garment-dyed jersey, relaxed, forest.',
    description:
      'Garment-dyed for a mottled, lived-in surface that wears in rather than out. A cracked PRTFLO puff print sits small at the chest, echoed at the sleeve; bar-tacked side splits finish the hem. Relaxed, oversized, softened by the wash.',
    signatureDetail: 'Cracked puff print texture + dye marbling',
    composition: 'Garment-dyed washed cotton jersey.',
    care: 'Machine wash cold, inside out. Do not tumble dry.',
    images: shots('men', 'garment-dyed-slogan-tee', 'PRTM02', 'FOR', 'Garment-dyed slogan tee', 'Cracked puff print texture + dye marbling', 'top'),
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: false },
    ],
    colours: ['Forest Green'],
    isNew: true,
  },
  {
    slug: 'heavyweight-crew-tee',
    name: 'Heavyweight crew tee',
    code: 'PRTM03',
    colourCode: 'OXB',
    category: 'men',
    basePriceGBP: 55,
    shortDescription: 'Compact jersey, cropped boxy, oxblood.',
    description:
      'A slightly cropped, boxy crew in dense compact jersey, deep oxblood. Vertical panel seams run shoulder to hem in tonal topstitch; a PRTFLO logotype is embroidered a half-shade lighter at the chest. Ribbed side splits keep the hem moving.',
    signatureDetail: 'Tonal embroidered logotype + panel seam relief',
    composition: 'Compact cotton jersey.',
    care: 'Machine wash cold. Dry flat.',
    images: shots('men', 'heavyweight-crew-tee', 'PRTM03', 'OXB', 'Heavyweight crew tee', 'Tonal embroidered logotype + panel seam relief', 'top'),
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
    ],
    colours: ['Oxblood'],
  },
  {
    slug: 'printed-knit-tank',
    name: 'Printed knit tank',
    code: 'PRTM04',
    colourCode: 'OCH',
    category: 'men',
    basePriceGBP: 65,
    shortDescription: 'Fine-gauge knit, jacquard arch, ochre.',
    description:
      'A fine-gauge knitted vest with the graphic built in, not printed — a faded PRTFLO collegiate arch worked in cream jacquard. Navy tipping traces the neck and armholes. Relaxed through the body, ribbed at every edge.',
    signatureDetail: 'Knitted-in jacquard arch + navy tipping',
    composition: 'Fine-gauge knit.',
    care: 'Hand wash cold. Dry flat.',
    images: shots('men', 'printed-knit-tank', 'PRTM04', 'OCH', 'Printed knit tank', 'Knitted-in jacquard arch + navy tipping', 'top'),
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: false },
      { label: 'XL', inStock: true },
    ],
    colours: ['Ochre Yellow'],
  },
  {
    slug: 'camp-collar-graphic-shirt',
    name: 'Camp collar graphic shirt',
    code: 'PRTM05',
    colourCode: 'OFW',
    category: 'men',
    basePriceGBP: 85,
    shortDescription: 'Cotton poplin, camp collar, off-white.',
    description:
      'Crisp poplin cut boxy, worn open at the camp collar. A sun-faded circular crest — PRTFLO ringing a bold P — sits centre chest; navy piping edges the collar and mother-of-pearl buttons close the placket.',
    signatureDetail: 'Circular crest graphic + collar piping + MOP buttons',
    composition: 'Cotton poplin.',
    care: 'Machine wash cool. Iron low.',
    images: shots('men', 'camp-collar-graphic-shirt', 'PRTM05', 'OFW', 'Camp collar graphic shirt', 'Circular crest graphic + collar piping + MOP buttons', 'top'),
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
    ],
    colours: ['Off-White'],
    isNew: true,
  },
  {
    slug: 'double-layer-long-sleeve-tee',
    name: 'Double-layer long sleeve tee',
    code: 'PRTM06',
    colourCode: 'PET',
    category: 'men',
    basePriceGBP: 60,
    shortDescription: 'Heavyweight jersey, double-layer, petrol.',
    description:
      'One garment built to read as two: a petrol heavyweight tee with attached ecru under-sleeves, junctions ringed in coverstitch. Ribbed cuffs carry subtle thumb slits; a small PRTFLO mark is embroidered in ecru at the chest.',
    signatureDetail: 'Coverstitched layer junction + thumb-slit cuff',
    composition: 'Heavyweight cotton jersey.',
    care: 'Machine wash cold. Dry flat.',
    images: shots('men', 'double-layer-long-sleeve-tee', 'PRTM06', 'PET', 'Double-layer long sleeve tee', 'Coverstitched layer junction + thumb-slit cuff', 'top'),
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
    ],
    colours: ['Petrol Blue / Ecru'],
  },
  {
    slug: 'washed-balloon-jeans',
    name: 'Washed balloon jeans',
    code: 'PRTM07',
    colourCode: 'STN',
    category: 'men',
    basePriceGBP: 125,
    shortDescription: '14oz rigid denim, balloon leg, stone wash.',
    description:
      'A 14oz rigid denim cut to a full balloon — swelling through the thigh, tapering to a stacked, roped ankle. Stone-washed with 3D whiskering and honeycomb fading; ecru topstitch and doubled belt loops throughout.',
    signatureDetail: '3D whiskering + roped stacked cuff + ecru topstitch',
    composition: '14oz rigid denim.',
    care: 'Machine wash cold, inside out. Wash seldom.',
    images: shots('men', 'washed-balloon-jeans', 'PRTM07', 'STN', 'Washed balloon jeans', '3D whiskering + roped stacked cuff + ecru topstitch', 'bottom'),
    sizes: [
      { label: '28', inStock: true },
      { label: '30', inStock: true },
      { label: '32', inStock: true },
      { label: '34', inStock: true },
      { label: '36', inStock: false },
    ],
    colours: ['Light Stone Wash'],
    isBestSeller: true,
  },
  {
    slug: 'wide-leg-twill-trousers',
    name: 'Wide-leg twill trousers',
    code: 'PRTM08',
    colourCode: 'OLV',
    category: 'men',
    basePriceGBP: 95,
    shortDescription: 'Garment-dyed twill, wide leg, washed olive.',
    description:
      'Garment-dyed twill in washed olive, falling wide and straight with a slight break. A sewn-in pintuck holds a permanent crease down each leg; tan bartacks mark the slash pockets and side tabs adjust the waist.',
    signatureDetail: 'Pintuck crease line + tan bartack + waist tab',
    composition: 'Garment-dyed cotton twill.',
    care: 'Machine wash cool. Line dry.',
    images: shots('men', 'wide-leg-twill-trousers', 'PRTM08', 'OLV', 'Wide-leg twill trousers', 'Pintuck crease line + tan bartack + waist tab', 'bottom'),
    sizes: [
      { label: '28', inStock: true },
      { label: '30', inStock: true },
      { label: '32', inStock: true },
      { label: '34', inStock: true },
      { label: '36', inStock: true },
    ],
    colours: ['Washed Olive'],
  },
  {
    slug: 'relaxed-cargo-trousers',
    name: 'Relaxed cargo trousers',
    code: 'PRTM09',
    colourCode: 'WBK',
    category: 'men',
    basePriceGBP: 110,
    shortDescription: 'Washed cotton cargo, wide, washed black.',
    description:
      'Low-slung and wide in washed black cotton, hems pooling by design. Double-stacked bellows pockets layer each thigh; gunmetal toggles gather the ankles and a webbing pull sits at the fly. Bar-tacked wherever it matters.',
    signatureDetail: 'Double-stacked bellows pocket + gunmetal toggle',
    composition: 'Washed cotton.',
    care: 'Machine wash cold, inside out.',
    images: shots('men', 'relaxed-cargo-trousers', 'PRTM09', 'WBK', 'Relaxed cargo trousers', 'Double-stacked bellows pocket + gunmetal toggle', 'bottom'),
    sizes: [
      { label: '28', inStock: true },
      { label: '30', inStock: true },
      { label: '32', inStock: true },
      { label: '34', inStock: true },
      { label: '36', inStock: true },
    ],
    colours: ['Washed Black'],
    isNew: true,
  },
  {
    slug: 'pleated-wide-shorts',
    name: 'Pleated wide shorts',
    code: 'PRTM10',
    colourCode: 'ECR',
    category: 'men',
    basePriceGBP: 75,
    shortDescription: 'Tailored twill, double pleat, ecru.',
    description:
      'Tailored ecru twill, cut long and wide from sharp double pleats. An extended tab closes on stacked horn buttons; silver side buckles adjust the waist and tan pick stitching traces the details.',
    signatureDetail: 'Horn-button tab + side buckle + pick stitching',
    composition: 'Cotton twill.',
    care: 'Machine wash cool. Iron low.',
    images: shots('men', 'pleated-wide-shorts', 'PRTM10', 'ECR', 'Pleated wide shorts', 'Horn-button tab + side buckle + pick stitching', 'bottom'),
    sizes: [
      { label: '28', inStock: true },
      { label: '30', inStock: true },
      { label: '32', inStock: true },
      { label: '34', inStock: false },
      { label: '36', inStock: true },
    ],
    colours: ['Ecru'],
  },

  // ── Women · PRTW01–10 ────────────────────────────────────────────────────
  {
    slug: 'oversized-double-breasted-blazer',
    name: 'Oversized double-breasted blazer',
    code: 'PRTW01',
    colourCode: 'CAM',
    category: 'women',
    basePriceGBP: 185,
    shortDescription: 'Chalk-stripe wool, double-breasted, charcoal.',
    description:
      'A soft-shouldered blazer in charcoal chalk-stripe wool, cut oversized and longline to the upper thigh. Broad peak lapels roll with a gentle belly onto a low 6x2 stance of polished horn buttons; hand pick-stitching traces the lapel edge, and working cuff buttons sit kissing at each sleeve.',
    signatureDetail: 'Hand pick-stitched lapel line + kissing cuff buttons',
    composition: 'Mid-weight wool blend, woven chalk stripe.',
    care: 'Dry clean only.',
    images: shots('women', 'oversized-double-breasted-blazer', 'PRTW01', 'CAM', 'Oversized double-breasted blazer', 'Hand pick-stitched lapel line + kissing cuff buttons', 'top'),
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
    ],
    colours: ['Charcoal Chalk-Stripe'],
  },
  {
    slug: 'crossover-waist-wide-leg-jeans',
    name: 'Crossover-waist wide-leg jeans',
    code: 'PRTW02',
    colourCode: 'MBL',
    category: 'women',
    basePriceGBP: 115,
    shortDescription: 'Washed denim, crossover waist, mid-blue.',
    description:
      'Mid-blue denim with an asymmetric crossover waistband, closed on two offset buttons. Honey-gold topstitch runs the five-pocket build; twisted outseams spiral gently to a full wide leg.',
    signatureDetail: 'Crossover closure + offset buttons + honey topstitch',
    composition: 'Washed denim.',
    care: 'Machine wash cold, inside out. Wash seldom.',
    images: shots('women', 'crossover-waist-wide-leg-jeans', 'PRTW02', 'MBL', 'Crossover-waist wide-leg jeans', 'Crossover closure + offset buttons + honey topstitch', 'bottom'),
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: false },
    ],
    colours: ['Mid-Blue Wash'],
    isBestSeller: true,
  },
  {
    slug: 'barrel-leg-trousers',
    name: 'Barrel-leg trousers',
    code: 'PRTW03',
    colourCode: 'DOL',
    category: 'women',
    basePriceGBP: 95,
    shortDescription: 'Garment-washed cotton, barrel leg, dark olive.',
    description:
      'Garment-washed cotton in dark olive, bowed into a true barrel. Curved panel seams and topstitched knee darts draw the line; a hidden hook closes behind the side tab. Cropped to finish above the ankle.',
    signatureDetail: 'Curved panel seam-work + knee dart',
    composition: 'Garment-washed cotton.',
    care: 'Machine wash cool. Line dry.',
    images: shots('women', 'barrel-leg-trousers', 'PRTW03', 'DOL', 'Barrel-leg trousers', 'Curved panel seam-work + knee dart', 'bottom'),
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
    ],
    colours: ['Dark Olive'],
  },
  {
    slug: 'low-rise-roomy-jeans',
    name: 'Low-rise roomy jeans',
    code: 'PRTW04',
    colourCode: 'GGN',
    category: 'women',
    basePriceGBP: 120,
    shortDescription: 'Washed denim, low-rise, grey-green.',
    description:
      'Slouched low through the hip and roomy to the floor, in a heavily worked grey-green wash — whiskered, hand-sanded, hems lightly frayed by intent. A dropped micro coin pocket sits at the front.',
    signatureDetail: 'Frayed hem edge + dropped micro coin pocket',
    composition: 'Washed denim.',
    care: 'Machine wash cold, inside out. Wash seldom.',
    images: shots('women', 'low-rise-roomy-jeans', 'PRTW04', 'GGN', 'Low-rise roomy jeans', 'Frayed hem edge + dropped micro coin pocket', 'bottom'),
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
    ],
    colours: ['Washed Grey-Green'],
    isNew: true,
  },
  {
    slug: 'linen-blend-wide-leg-trousers',
    name: 'Linen-blend wide-leg trousers',
    code: 'PRTW05',
    colourCode: 'CHO',
    category: 'women',
    basePriceGBP: 110,
    shortDescription: 'Linen blend, palazzo wide, chocolate.',
    description:
      'An extreme palazzo in chocolate linen, the wrap front closing on a diagonal of covered buttons. Openwork fagoting runs each side seam; pintucked darts shape the waist. Cut to skim the floor.',
    signatureDetail: 'Openwork fagoting + covered-button diagonal',
    composition: 'Linen blend.',
    care: 'Machine wash cool, gentle. Line dry.',
    images: shots('women', 'linen-blend-wide-leg-trousers', 'PRTW05', 'CHO', 'Linen-blend wide-leg trousers', 'Openwork fagoting + covered-button diagonal', 'bottom'),
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: false },
      { label: 'L', inStock: true },
    ],
    colours: ['Chocolate Brown'],
  },
  {
    slug: 'sequinned-wrap-skort',
    name: 'Sequinned wrap skort',
    code: 'PRTW06',
    colourCode: 'BRZ',
    category: 'women',
    basePriceGBP: 95,
    shortDescription: 'Matte sequins, wrap skort, bronze.',
    description:
      'Matte bronze sequins worked in mixed scales trace a swirl across a wrap-front skort, short built in. The hem scallops with the motif; the waist binds in satin. Glint, not glitter.',
    signatureDetail: 'Mixed-scale sequin swirl + scalloped hem',
    composition: 'Mixed-scale matte sequins on soft base.',
    care: 'Spot clean only.',
    images: shots('women', 'sequinned-wrap-skort', 'PRTW06', 'BRZ', 'Sequinned wrap skort', 'Mixed-scale sequin swirl + scalloped hem', 'bottom'),
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
    ],
    colours: ['Bronze'],
    isNew: true,
  },
  {
    slug: 'sequinned-mini-skirt',
    name: 'Sequinned mini skirt',
    code: 'PRTW07',
    colourCode: 'MOS',
    category: 'women',
    basePriceGBP: 125,
    shortDescription: 'Floral sequins, micro mini, moss.',
    description:
      'A low-rise micro mini worked entirely in dimensional florals — layered moss paillettes in mixed scales, each bloom centred with glass beads. Bound at the waist in satin.',
    signatureDetail: 'Beaded floral paillettes, petal depth',
    composition: 'Dimensional floral sequins on soft base.',
    care: 'Spot clean only.',
    images: shots('women', 'sequinned-mini-skirt', 'PRTW07', 'MOS', 'Sequinned mini skirt', 'Beaded floral paillettes, petal depth', 'bottom'),
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: false },
    ],
    colours: ['Moss Green'],
  },
  {
    slug: 'frayed-stripe-midi-shirtdress',
    name: 'Frayed-stripe midi shirtdress',
    code: 'PRTW08',
    colourCode: 'BWS',
    category: 'women',
    basePriceGBP: 135,
    shortDescription: 'Textured stripe cotton, raw seams, midi.',
    description:
      'A collarless shirtdress in textured blue-and-white stripe, seams left deliberately raw. Frayed-flap pockets sit at the chest; ladder-stitch openwork circles the elasticated waist; buttons are unpolished wood.',
    signatureDetail: 'Ladder-stitch waist insertion + frayed pocket flap',
    composition: 'Textured cotton stripe.',
    care: 'Machine wash cool, gentle. Line dry.',
    images: shots('women', 'frayed-stripe-midi-shirtdress', 'PRTW08', 'BWS', 'Frayed-stripe midi shirtdress', 'Ladder-stitch waist insertion + frayed pocket flap', 'top'),
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
    ],
    colours: ['Blue/White Stripe'],
    isBestSeller: true,
  },
  {
    slug: 'buttoned-knit-midi-dress',
    name: 'Buttoned knit midi dress',
    code: 'PRTW09',
    colourCode: 'ECR',
    category: 'women',
    basePriceGBP: 145,
    shortDescription: 'Fine compact knit, buttoned column, ecru.',
    description:
      'A straight column in fine ecru knit, closed neck to hem on cut-crystal rhinestone buttons. Pointelle bands circle the sleeves and hem; slim splits ease the walk.',
    signatureDetail: 'Rhinestone button run + pointelle band',
    composition: 'Fine compact knit.',
    care: 'Hand wash cold. Dry flat.',
    images: shots('women', 'buttoned-knit-midi-dress', 'PRTW09', 'ECR', 'Buttoned knit midi dress', 'Rhinestone button run + pointelle band', 'top'),
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: false },
    ],
    colours: ['Ecru'],
  },
  {
    slug: 'boat-neck-cropped-knit',
    name: 'Boat-neck cropped knit',
    code: 'PRTW10',
    colourCode: 'BLK',
    category: 'women',
    basePriceGBP: 85,
    shortDescription: 'Mixed-gauge rib, cropped, black.',
    description:
      'Mixed-gauge rib in deep black — chunky at the boat neck, cuffs and hem, micro-ribbed through the body. Sleeves run deliberately long, finished with thumbholes; the cropped hem pulls in at the waist.',
    signatureDetail: 'Gauge transition + thumbhole cuff',
    composition: 'Mixed-gauge rib knit.',
    care: 'Hand wash cold. Dry flat.',
    images: shots('women', 'boat-neck-cropped-knit', 'PRTW10', 'BLK', 'Boat-neck cropped knit', 'Gauge transition + thumbhole cuff', 'top'),
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
    ],
    colours: ['Black'],
    isNew: true,
  },
];

export const PRODUCT_MAP: Record<string, Product> = PRODUCTS.reduce(
  (acc, p) => {
    acc[p.slug] = p;
    return acc;
  },
  {} as Record<string, Product>,
);

// Listing order, hand-merchandised. Imagery was generated in sequential
// batches, so neighbouring product codes share a model — this order spaces
// repeat faces apart (horizontally and by grid column) and alternates
// tops/bottoms and light/dark colourways. PRODUCTS itself stays in
// linesheet order; only listing pages sort by this.
const MERCH_ORDER: string[] = [
  // Men — models: PRTM01–03 blond, PRTM05–06 brunet, PRTM04 + PRTM09 two
  // more; PRTM07/08/10 crop below the face and act as separators.
  'heavyweight-boxy-tee',
  'washed-balloon-jeans',
  'camp-collar-graphic-shirt',
  'printed-knit-tank',
  'pleated-wide-shorts',
  'garment-dyed-slogan-tee',
  'relaxed-cargo-trousers',
  'double-layer-long-sleeve-tee',
  'heavyweight-crew-tee',
  'wide-leg-twill-trousers',
  // Women — one model fronts five leads (PRTW02/03/08/09/10, slots
  // 1/3/6/8/9) and a second fronts three (PRTW01/05/07, slots 2/5/10).
  // Five-in-ten can't avoid every adjacency at every breakpoint; this
  // arrangement is clash-free in the 4-col grid (rows and columns), and
  // the two unavoidable 2-col mobile stackings pair her most differently
  // styled shots (dress over jeans, dress over black knit).
  'frayed-stripe-midi-shirtdress',
  'oversized-double-breasted-blazer',
  'crossover-waist-wide-leg-jeans',
  'sequinned-wrap-skort',
  'linen-blend-wide-leg-trousers',
  'buttoned-knit-midi-dress',
  'low-rise-roomy-jeans',
  'boat-neck-cropped-knit',
  'barrel-leg-trousers',
  'sequinned-mini-skirt',
];

const merchRank = (p: Product): number => {
  const i = MERCH_ORDER.indexOf(p.slug);
  return i === -1 ? MERCH_ORDER.length + PRODUCTS.indexOf(p) : i;
};

export const productsByCategory = (category: string): Product[] =>
  PRODUCTS.filter((p) => p.category === category).sort(
    (a, b) => merchRank(a) - merchRank(b),
  );

export const totalAssetCount = (): number =>
  PRODUCTS.reduce((n, p) => n + p.images.length, 0);
