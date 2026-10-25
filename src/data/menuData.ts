/**
 * Menu Data for NAIJA POT KITCHEN & GRILL LTD
 * Authentic Nigerian dishes with dietary indications, spice ratings,
 * allergen disclosures, and customisable options.
 */

export interface MenuItem {
  id: string;
  name: string;
  nativeName?: string;
  category: MenuCategoryKey;
  description: string;
  price: number;
  image?: string;
  spiceLevel: 0 | 1 | 2 | 3; // 0 = none, 1 = mild, 2 = medium, 3 = extra hot
  dietary: ('Halal' | 'Gluten-Free' | 'Vegetarian' | 'Vegan' | 'Dairy-Free' | 'Chef Signature')[];
  allergens: string[];
  swallowIncluded?: boolean;
  availableSwallows?: string[];
  proteinChoice?: string[];
  isPopular?: boolean;
  portionSize?: string;
}

export type MenuCategoryKey = 
  | 'starters'
  | 'rice'
  | 'soups'
  | 'grill'
  | 'platters'
  | 'sides'
  | 'desserts'
  | 'drinks';

export interface CategoryInfo {
  key: MenuCategoryKey;
  label: string;
  tagline: string;
}

export const menuCategories: CategoryInfo[] = [
  { key: 'starters', label: 'Starters & Small Chops', tagline: 'Crispy, savoury finger foods and warm street-food bites' },
  { key: 'rice', label: 'Jollof & Rice Dishes', tagline: 'Smoky firewood-style jollof, fried rice & native grains' },
  { key: 'grill', label: 'Suya & Charcoal Grill', tagline: 'Charcoal-fired meats dusted with authentic northern yaji spice' },
  { key: 'soups', label: 'Soups & Traditional Swallows', tagline: 'Slow-simmered rich broths with your choice of warm pounded yam, eba, or amala' },
  { key: 'platters', label: 'Naija Sharing Platters', tagline: 'Abundant feasts crafted for family gatherings and celebrations' },
  { key: 'sides', label: 'Sides & Extras', tagline: 'Sweet fried dodo, steamed moi moi, fried yam & pepper dips' },
  { key: 'drinks', label: 'Drinks & Cocktails', tagline: 'Chilled signature Nigerian Chapman, zobo hibiscus brew & palm wines' },
  { key: 'desserts', label: 'Sweet Treats', tagline: 'Decadent Nigerian-infused dessert creations' },
];

export const menuItems: MenuItem[] = [
  // --- STARTERS & SMALL CHOPS ---
  {
    id: 'starter-1',
    name: 'Naija Small Chops Basket',
    nativeName: 'Lagos Party Chops',
    category: 'starters',
    description: 'Golden fried sweet puff puff balls, mini beef spring rolls, crispy samosas, and spicy peppered gizzards served with our house sweet pepper glaze.',
    price: 9.50,
    spiceLevel: 1,
    dietary: ['Halal'],
    allergens: ['Gluten', 'Eggs'],
    isPopular: true,
  },
  {
    id: 'starter-2',
    name: 'Peppered Goat Meat Bites',
    nativeName: 'Asun Bites',
    category: 'starters',
    description: 'Smoky, flame-torched tender diced goat meat tossed in a spicy reduction of charred habaneros, red bell peppers, and sweet red onions.',
    price: 10.50,
    image: '/src/assets/images/food_beef_suya_grill_1792356257070.jpg',
    spiceLevel: 3,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free'],
    allergens: [],
    isPopular: true,
  },
  {
    id: 'starter-3',
    name: 'Honey-Glazed Chicken Wings',
    nativeName: 'Suya Spiced Wings',
    category: 'starters',
    description: 'Crisp oven-charred jumbo wings tossed in wild Nigerian honey and dusted with mild suya spice crumble.',
    price: 8.75,
    spiceLevel: 1,
    dietary: ['Halal', 'Dairy-Free'],
    allergens: ['Peanuts (Yaji spice)'],
  },
  {
    id: 'starter-4',
    name: 'Peppered Gizzard & Plantain',
    nativeName: 'Gizdodo',
    category: 'starters',
    description: 'A classic Lagos favourite — sweet ripe plantain cubes and tender diced chicken gizzard sautéed in a rich tomato, garlic and scotch bonnet gravy.',
    price: 9.25,
    spiceLevel: 2,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free'],
    allergens: [],
    isPopular: true,
  },
  {
    id: 'starter-5',
    name: 'Assorted Meat Pepper Soup',
    nativeName: 'Obe Eja & Nama',
    category: 'starters',
    description: 'Aromatic, soul-warming Nigerian broth infused with uziza seeds, ehuru (calabash nutmeg), scent leaves, and tender cuts of slow-simmered beef & tripe.',
    price: 9.95,
    spiceLevel: 2,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free', 'Chef Signature'],
    allergens: [],
  },

  // --- JOLLOF & RICE DISHES ---
  {
    id: 'rice-1',
    name: 'Smoky Party Jollof Rice',
    nativeName: 'Lagos Party Jollof',
    category: 'rice',
    description: 'Our pride and joy. Long-grain parboiled rice slow-cooked in a reduced base of charred plum tomatoes, tatashe peppers, and onions, smoked to bottom-pot perfection.',
    price: 15.50,
    image: '/src/assets/images/food_jollof_party_platter_1792356258654.jpg',
    spiceLevel: 2,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free', 'Chef Signature'],
    allergens: [],
    proteinChoice: ['Grilled Peppered Chicken', 'Slow-Braised Beef Shank', 'Fried Fish (Hake)', 'Fried Assorted Meats'],
    isPopular: true,
  },
  {
    id: 'rice-2',
    name: 'Native Village Fried Rice',
    nativeName: 'Jollof Elesho',
    category: 'rice',
    description: 'A rustic Yoruba countryside specialty cooked with aromatic locust beans (iru), dried smoked prawns, shredded scent leaves, and diced peppered meat.',
    price: 16.50,
    spiceLevel: 2,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free'],
    allergens: ['Crustaceans (crayfish/prawns)'],
    proteinChoice: ['Grilled Chicken Quarter', 'Braised Beef', 'Fried Croaker Fillet'],
  },
  {
    id: 'rice-3',
    name: 'Special Nigerian Fried Rice',
    nativeName: 'Party Fried Rice',
    category: 'rice',
    description: 'Fragrant basmati and long-grain rice wok-tossed with sweet corn, sweet garden peas, tender chicken liver bits, fresh spring onions, and golden curry aromatic stock.',
    price: 15.50,
    spiceLevel: 1,
    dietary: ['Halal', 'Dairy-Free'],
    allergens: [],
    proteinChoice: ['Grilled Chicken', 'Beef Shank', 'Grilled Tiger Prawns (+£4.00)'],
  },
  {
    id: 'rice-4',
    name: 'Ofada Rice & Ayamase Designer Stew',
    nativeName: 'Ofada Pelu Ayamase',
    category: 'rice',
    description: 'Short-grain unpolished indigenous Ofada rice wrapped in banana leaf, served with rich bleached palm oil green habanero sauce packed with assorted bite-sized offal and boiled egg.',
    price: 18.00,
    spiceLevel: 3,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free', 'Chef Signature'],
    allergens: ['Eggs', 'Crustaceans (ground crayfish)'],
    isPopular: true,
  },

  // --- SUYA & CHARCOAL GRILL ---
  {
    id: 'grill-1',
    name: 'Smoky Beef Suya Skewers',
    nativeName: 'Nama Suya',
    category: 'grill',
    description: 'Thinly sliced choice British beef marinated in ginger, garlic, and dried chili, dusted generously with authentic Hausa yaji spice, charred over lumpwood coals with red onions and vine tomatoes.',
    price: 13.95,
    image: '/src/assets/images/food_beef_suya_grill_1792356257070.jpg',
    spiceLevel: 2,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free', 'Chef Signature'],
    allergens: ['Peanuts (yaji spice)'],
    isPopular: true,
  },
  {
    id: 'grill-2',
    name: 'Charcoal Grilled Whole Croaker Fish',
    nativeName: 'Eja Yiyan',
    category: 'grill',
    description: 'Fresh whole croaker fish scored and marinated in Lagos street spice rub, slow-grilled over charcoal embers until crispy on the skin and flaky within. Served with fried yam chips or plantains.',
    price: 21.50,
    spiceLevel: 2,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free'],
    allergens: ['Fish'],
    isPopular: true,
  },
  {
    id: 'grill-3',
    name: 'Flame-Kissed Lamb Chops Suya',
    nativeName: 'Suya Lamb Cutlets',
    category: 'grill',
    description: 'Three prime French-trimmed lamb cutlets rubbed with crushed roasted peanuts and fiery cayenne, flame-charred to medium-tender and drizzled with honey-ginger glaze.',
    price: 17.50,
    spiceLevel: 2,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free'],
    allergens: ['Peanuts (yaji)'],
  },
  {
    id: 'grill-4',
    name: 'Half Peppered Spiced Chicken',
    nativeName: 'Abo Adie Yiyan',
    category: 'grill',
    description: 'Charcoal roasted half free-range chicken basted with our signature slow-reduced tomato, bell pepper, and roasted chili Bukka reduction sauce.',
    price: 14.50,
    spiceLevel: 2,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free'],
    allergens: [],
  },

  // --- SOUPS & TRADITIONAL SWALLOWS ---
  {
    id: 'soup-1',
    name: 'Rich Egusi Soup & Swallow',
    nativeName: 'Ofe Egusi pelu Iyan',
    category: 'soups',
    description: 'Toasted and ground melon seeds gently braised in palm oil with dried stockfish, flaked smoked catfish, bitterleaf or spinach, and tender slow-simmered beef. Served with silky smooth pounded yam.',
    price: 17.95,
    image: '/src/assets/images/food_egusi_soup_yam_1792356257944.jpg',
    spiceLevel: 2,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free', 'Chef Signature'],
    allergens: ['Fish', 'Crustaceans (crayfish)'],
    swallowIncluded: true,
    availableSwallows: ['Pounded Yam (Iyan)', 'Yellow Garri Eba', 'Smooth Amala', 'Semovita', 'Oat Fufu'],
    proteinChoice: ['Assorted Beef & Shaki', 'Goat Meat', 'Fried Fresh Croaker', 'Oxtail (+£3.50)'],
    isPopular: true,
  },
  {
    id: 'soup-2',
    name: 'Lagos Efo Riro Elegusi',
    nativeName: 'Rich Spinach Bukka Soup',
    category: 'soups',
    description: 'Traditional Yoruba rich vegetable soup made with fresh water greens (shoko/tete), smoked panla fish, locust beans (iru), cow skin (ponmo), and tender goat meat cubes.',
    price: 17.50,
    spiceLevel: 2,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free'],
    allergens: ['Fish', 'Crustaceans'],
    swallowIncluded: true,
    availableSwallows: ['Pounded Yam (Iyan)', 'Smooth Amala', 'Yellow Garri Eba', 'Semovita'],
    proteinChoice: ['Tender Goat Meat', 'Assorted Offal', 'Smoked Fish & Beef'],
    isPopular: true,
  },
  {
    id: 'soup-3',
    name: 'Draw Soup Special (Ogbono & Okra)',
    nativeName: 'Ofe Ogbono & Ila',
    category: 'soups',
    description: 'Wild African mango seed kernel soup slow-whipped into an elastic, savoury, glossy broth studded with fresh sliced okra, dried bitterleaf, stockfish, and braised beef.',
    price: 16.95,
    spiceLevel: 1,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free'],
    allergens: ['Fish', 'Crustaceans'],
    swallowIncluded: true,
    availableSwallows: ['Yellow Garri Eba', 'Pounded Yam', 'Amala', 'Semovita'],
  },
  {
    id: 'soup-4',
    name: 'Edikaikong Calabar Soup',
    nativeName: 'Royal Vegetable Broth',
    category: 'soups',
    description: 'A prestigious South-Eastern delicacy packed with fluted pumpkin leaves (ugwu), waterleaf, periwinkles, smoked catfish, dried prawns, and melt-in-mouth beef.',
    price: 18.50,
    spiceLevel: 2,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free'],
    allergens: ['Crustaceans', 'Molluscs', 'Fish'],
    swallowIncluded: true,
    availableSwallows: ['Pounded Yam', 'Yellow Garri Eba', 'Semovita'],
  },

  // --- SHARING PLATTERS ---
  {
    id: 'platter-1',
    name: 'The Lagos Island Bukka Feast (Serves 2–3)',
    nativeName: 'Ariya Special',
    category: 'platters',
    description: 'A lavish sharing spread including a giant mound of Smoky Party Jollof, Native Fried Rice, 4 Beef Suya Skewers, Peppered Goat Meat (Asun), Fried Golden Dodo, and Steamed Moi Moi.',
    price: 46.00,
    image: '/src/assets/images/hero_naija_feast_1792356256861.jpg',
    spiceLevel: 2,
    dietary: ['Halal', 'Chef Signature'],
    allergens: ['Peanuts (Suya)', 'Eggs'],
    portionSize: 'Ideal for 2 to 3 persons',
    isPopular: true,
  },
  {
    id: 'platter-2',
    name: 'Naija Pot Charcoal Grill Board (Serves 3–4)',
    nativeName: 'Grand Grill Board',
    category: 'platters',
    description: 'A carnivore’s dream: Whole Grilled Croaker, Flame-Grilled Lamb Chops, Sizzling Beef Suya Skewers, Spicy Asun, Crispy Fried Yam Fries, and Pickled Red Onion Salad.',
    price: 58.00,
    image: '/src/assets/images/food_beef_suya_grill_1792356257070.jpg',
    spiceLevel: 2,
    dietary: ['Halal', 'Chef Signature'],
    allergens: ['Peanuts (Suya)', 'Fish'],
    portionSize: 'Ideal for 3 to 4 persons',
    isPopular: true,
  },

  // --- SIDES & EXTRAS ---
  {
    id: 'side-1',
    name: 'Golden Fried Sweet Plantain',
    nativeName: 'Dodo',
    category: 'sides',
    description: 'Perfect caramelised slices of ripe sweet plantain fried to golden amber tenderness.',
    price: 4.50,
    spiceLevel: 0,
    dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Halal'],
    allergens: [],
    isPopular: true,
  },
  {
    id: 'side-2',
    name: 'Steamed Bean Pudding in Leaves',
    nativeName: 'Moi Moi Elewe',
    category: 'sides',
    description: 'Silky steamed black-eyed bean pudding blended with red bell peppers, onions, flaked smoked fish, and boiled egg, wrapped in aromatic broad leaves.',
    price: 5.50,
    spiceLevel: 1,
    dietary: ['Halal', 'Gluten-Free', 'Dairy-Free'],
    allergens: ['Eggs', 'Fish'],
  },
  {
    id: 'side-3',
    name: 'Crispy Fried Yam Chips & Sauce',
    nativeName: 'Dundun pelu Obe Ata',
    category: 'sides',
    description: 'Chunky white African yam fingers parboiled and flash-fried until crunchy outside and fluffy inside. Served with spicy tomato pepper dip.',
    price: 5.00,
    spiceLevel: 2,
    dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Halal'],
    allergens: [],
  },
  {
    id: 'side-4',
    name: 'Extra Traditional Swallow Portion',
    nativeName: 'Okele',
    category: 'sides',
    description: 'Choice of fresh warm Pounded Yam (Iyan), Yellow Garri Eba, or Smooth Dark Amala.',
    price: 4.00,
    spiceLevel: 0,
    dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Halal'],
    allergens: [],
  },

  // --- DRINKS & REFRESHMENTS ---
  {
    id: 'drink-1',
    name: 'The Signature Naija Chapman',
    category: 'drinks',
    description: 'The national drink of celebration: Fanta and Sprite stirred with Angostura bitters, grenadine, cucumber ribbons, and fresh orange wheels.',
    price: 5.50,
    image: '/src/assets/images/craft_chapman_cocktail_1792960788048.jpg',
    spiceLevel: 0,
    dietary: ['Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    allergens: [],
    isPopular: true,
  },
  {
    id: 'drink-2',
    name: 'Spiced Zobo Hibiscus Cooler',
    nativeName: 'Zoborodo',
    category: 'drinks',
    description: 'Traditional slow-brewed dried sorrel hibiscus calyces steeped with fresh pressed ginger root, sweet pineapple peel, and aromatic cloves. Served iced.',
    price: 4.95,
    spiceLevel: 0,
    dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free'],
    allergens: [],
    isPopular: true,
  },
  {
    id: 'drink-3',
    name: 'Palm Wine (Fresh Tapped Chilled)',
    nativeName: 'Emu',
    category: 'drinks',
    description: 'Naturally sweet and mildly effervescent traditional sap from the oil palm tree, served chilled in a traditional ceramic cup.',
    price: 6.50,
    spiceLevel: 0,
    dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free'],
    allergens: [],
  },
  {
    id: 'drink-4',
    name: 'Classic Maltina & Guinness Extra Stout',
    category: 'drinks',
    description: 'Classic imported ice-cold bottles of non-alcoholic dark malt or Nigerian Guinness Foreign Extra Stout (7.5% ABV).',
    price: 5.00,
    spiceLevel: 0,
    dietary: ['Vegetarian'],
    allergens: ['Barley'],
  },

  // --- DESSERTS ---
  {
    id: 'dessert-1',
    name: 'Warm Puff Puff with Salted Caramel & Vanilla Ice Cream',
    category: 'desserts',
    description: 'Freshly fried hot puff puff rolled in cinnamon raw sugar, topped with rich warm salted caramel drizzle and organic vanilla bean ice cream.',
    price: 6.95,
    spiceLevel: 0,
    dietary: ['Vegetarian', 'Halal'],
    allergens: ['Gluten', 'Dairy'],
    isPopular: true,
  },
  {
    id: 'dessert-2',
    name: 'Coconut Ginger Panna Cotta',
    category: 'desserts',
    description: 'Silky coconut cream set with fresh ginger and vanilla, topped with a bright passionfruit and mango coulis.',
    price: 7.25,
    spiceLevel: 0,
    dietary: ['Gluten-Free', 'Dairy-Free', 'Vegan'],
    allergens: [],
  },
];
