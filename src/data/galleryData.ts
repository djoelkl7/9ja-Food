/**
 * Gallery data for NAIJA POT KITCHEN & GRILL LTD
 * Authentic Nigerian culinary, dining, and atmosphere imagery.
 */

export interface GalleryItem {
  id: string;
  title: string;
  category: 'grill' | 'rice' | 'soups' | 'atmosphere' | 'drinks';
  categoryLabel: string;
  image: string;
  caption: string;
  alt: string;
}

export const galleryCategories = [
  { id: 'all', label: 'All Moments' },
  { id: 'grill', label: 'Charcoal Grills' },
  { id: 'rice', label: 'Jollof & Rice' },
  { id: 'soups', label: 'Traditional Soups' },
  { id: 'atmosphere', label: 'Restaurant & Dining' },
  { id: 'drinks', label: 'Craft Drinks' },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Lagos Grand Bukka Spread',
    category: 'rice',
    categoryLabel: 'Jollof & Rice',
    image: '/src/assets/images/hero_naija_feast_1792356256861.jpg',
    caption: 'Our signature table feast: Smoky Party Jollof, caramelized dodo, beef suya skewers, and rich egusi soup.',
    alt: 'Large Nigerian banquet table with jollof rice, plantains, suya skewers, and egusi soup',
  },
  {
    id: 'gal-2',
    title: 'Smoky Charcoal Beef Suya',
    category: 'grill',
    categoryLabel: 'Charcoal Grills',
    image: '/src/assets/images/food_beef_suya_grill_1792356257070.jpg',
    caption: 'Thinly cut British beef marinated in northern yaji peanut spice and flame-charred over hot lumpwood coals.',
    alt: 'Beef suya skewers grilling over burning charcoal with rising smoke and fresh sliced red onions',
  },
  {
    id: 'gal-3',
    title: 'Traditional Egusi Soup & Pounded Yam',
    category: 'soups',
    categoryLabel: 'Traditional Soups',
    image: '/src/assets/images/food_egusi_soup_yam_1792356257944.jpg',
    caption: 'Braised melon seed soup infused with stockfish and bitterleaf, served alongside warm, pillowy pounded yam.',
    alt: 'Rich golden Egusi soup in ceramic bowl served next to smooth pounded yam on wooden dining table',
  },
  {
    id: 'gal-4',
    title: 'Warm Elegance & Lagos Hospitality',
    category: 'atmosphere',
    categoryLabel: 'Restaurant & Dining',
    image: '/src/assets/images/restaurant_ambiance_dining_1792356259531.jpg',
    caption: 'Our contemporary dining room combines deep burgundy velvet, warm gold lighting, and the joyous buzz of Naija dining.',
    alt: 'Dining room of Naija Pot restaurant with burgundy walls, pendant lamps, and dining guests',
  },
  {
    id: 'gal-5',
    title: 'Lagos Party Jollof & Sweet Dodo',
    category: 'rice',
    categoryLabel: 'Jollof & Rice',
    image: '/src/assets/images/food_jollof_party_platter_1792356258654.jpg',
    caption: 'Caramelized sweet plantains, roasted peppered chicken leg, and bottom-pot smoky Nigerian jollof rice.',
    alt: 'Platter of reddish smoky Nigerian jollof rice with fried plantains and peppered chicken',
  },
  {
    id: 'gal-6',
    title: 'The Signature Naija Chapman Cocktail',
    category: 'drinks',
    categoryLabel: 'Craft Drinks',
    image: '/src/assets/images/craft_chapman_cocktail_1792960788048.jpg',
    caption: 'Classic celebratory cocktail crafted with Angostura bitters, citrus, cucumber ribbons, and crushed ice.',
    alt: 'Chilled Nigerian Chapman cocktail in highball crystal glass with cucumber ribbon and lemon garnish',
  },
];
