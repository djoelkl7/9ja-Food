import React, { useState } from 'react';
import { PageId } from '../components/Header';
import { menuItems, MenuItem } from '../data/menuData';
import { siteConfig } from '../data/siteConfig';
import { LazyImage } from '../components/LazyImage';
import { 
  Flame, 
  UtensilsCrossed, 
  Users, 
  HeartHandshake, 
  ArrowRight, 
  Calendar, 
  ShoppingBag, 
  Instagram, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageId) => void;
  onOpenDishCustomizer: (dish: MenuItem) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenDishCustomizer }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Curated Signature Dishes to feature on homepage
  const signatureDishes = menuItems.filter(
    (item) => item.isPopular && ['rice-1', 'grill-1', 'soup-1', 'starter-2', 'platter-1', 'starter-4'].includes(item.id)
  );

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setNewsletterError('Please provide a valid email address.');
      return;
    }
    setNewsletterError('');
    setNewsletterSubmitted(true);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#0B0A09] text-[#FFFDF9] overflow-hidden">
        {/* Hero Background Image with Black & Brown Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_naija_feast_1792356256861.jpg"
            alt="Authentic Nigerian feast spread with party jollof, beef suya, plantains, and egusi soup"
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[8000ms]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A09]/95 via-[#3D2314]/85 to-[#0B0A09]/85" />
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#D4A53A_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          <div className="flex flex-col items-center gap-3">
            <img
              src="/assets/aistudio/IMG_7781_c41c3ef7.png"
              alt="NAIJA POT KITCHEN & GRILL LTD Official Logo"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#D4A53A] shadow-2xl object-contain bg-[#0B0A09] transition-transform duration-500 hover:scale-105"
            />
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4A53A]">
              Good Food · Great People · A Taste of Naija
            </div>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFDF9] leading-[1.1] max-w-4xl mx-auto text-balance">
            THE TRUE TASTE <br />
            <span className="italic text-[#D4A53A]">OF NAIJA.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#FFFDF9]/90 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            From the smoky flavour of our charcoal grill to the deep richness of our traditional slow-simmered soups, discover Nigerian cuisine made with passion, served with pride, and shared with love.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('menu')}
              className="w-full sm:w-auto px-8 py-4 bg-[#D4A53A] hover:bg-[#E8C547] text-[#0B0A09] font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Explore Our Menu</span>
            </button>

            <button
              onClick={() => onNavigate('reservations')}
              className="w-full sm:w-auto px-8 py-4 bg-[#3D2314] hover:bg-[#4E2E1A] border-2 border-[#D4A53A] text-[#FFFDF9] font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4 text-[#D4A53A]" />
              <span>Book Your Table</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-[#FAF6F0]/85 border-t border-[#D4A53A]/25 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4A53A]" />
              <span>100% Halal Meats</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Flame className="w-4 h-4 text-[#D4A53A]" />
              <span>Charcoal Smoke Fire</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4A53A]" />
              <span>Farm-Fresh Greens</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Users className="w-4 h-4 text-[#D4A53A]" />
              <span>Warm Bukka Hospitality</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND INTRODUCTION (EDITORIAL 2-COLUMN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[#3D2314] font-bold">
              Our Culinary Heritage
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0A09] leading-tight text-balance">
              More Than Food. <br />
              <span className="italic text-[#3D2314]">It’s Naija Culture.</span>
            </h2>
            <p className="text-base text-[#0B0A09]/80 leading-relaxed">
              At <strong>NAIJA POT</strong>, we celebrate the indelible soul of Nigerian dining — from the energetic, sun-soaked street bukka joints of Lagos Island to the quiet comfort of family kitchens across Nigeria.
            </p>
            <p className="text-base text-[#0B0A09]/80 leading-relaxed">
              We never cut corners. Our party jollof carries that authentic, smoky firewood aroma. Our suya skewers are dusted with real northern yaji groundnut spice, charred hot over red embers. And our soups are slowly simmered with genuine dried crayfish, fermented locust beans (iru), and prime cuts of meat.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('story')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#3D2314] hover:text-[#5C3822] underline underline-offset-8 transition-colors cursor-pointer group"
              >
                <span>Discover the Story of Naija Pot</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4A53A]" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4A53A]/30 group">
              <img
                src="/src/assets/images/food_egusi_soup_yam_1792356257944.jpg"
                alt="Traditional Nigerian Egusi Soup with Pounded Yam"
                className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-[#D4A53A]">
                  Signature Dish
                </span>
                <h4 className="font-serif text-xl font-bold">Rich Egusi Soup & Silky Pounded Yam</h4>
                <p className="text-xs text-white/80">Slow-braised with stockfish, beef, and bitterleaf greens.</p>
              </div>
            </div>
            {/* Decorative Gold Badge */}
            <div className="hidden sm:block absolute -top-5 -right-5 bg-[#0B0A09] text-[#FFFDF9] border-2 border-[#D4A53A] p-4 rounded-xl shadow-xl text-center">
              <span className="block font-serif text-2xl font-bold text-[#D4A53A]">100%</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">Authentic Recipes</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE DISHES SHOWCASE */}
      <section className="bg-[#FAF6F0] py-20 border-y border-[#D4A53A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#3D2314]">
                Curated Flavours
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B0A09]">
                Signature Naija Delicacies
              </h2>
              <p className="text-sm text-[#0B0A09]/75 max-w-xl">
                Every dish is prepared to order using authentic seasonings, generous protein portions, and our signature slow-smoking technique.
              </p>
            </div>
            <button
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#3D2314] text-[#FFFDF9] hover:bg-[#4E2E1A] rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer shrink-0 border border-[#D4A53A]/40"
            >
              <span>Discover Full Menu</span>
              <ChevronRight className="w-4 h-4 text-[#D4A53A]" />
            </button>
          </div>

          {/* Dish Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-[#D4A53A]/20 transition-all flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-56 bg-[#1C1916] overflow-hidden">
                  {dish.image ? (
                    <LazyImage
                      src={dish.image}
                      alt={dish.name}
                      containerClassName="h-56 w-full"
                      showHoverOverlay={true}
                      overlayGradient="bg-gradient-to-t from-[#0A0908]/85 via-[#D4A53A]/15 to-transparent"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1C1916] text-[#D4A53A]">
                      <UtensilsCrossed className="w-10 h-10 opacity-50" />
                    </div>
                  )}
                  {/* Dietary Badge */}
                  <div className="absolute top-3 left-3 z-10 bg-[#131110]/85 backdrop-blur-xs text-[#F5E6D3] border border-[#D4A53A]/30 text-[10px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {dish.dietary[0] || 'Chef Pick'}
                  </div>
                  {/* Native Name */}
                  {dish.nativeName && (
                    <div className="absolute bottom-3 left-3 z-10 bg-[#131110]/95 backdrop-blur-xs text-[#D4A53A] border border-[#D4A53A]/30 text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                      {dish.nativeName}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-[#0B0A09] leading-snug group-hover:text-[#3D2314] transition-colors">
                        {dish.name}
                      </h3>
                      <span className="font-serif text-base font-bold text-[#3D2314] tabular-nums shrink-0">
                        £{dish.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-[#0B0A09]/75 leading-relaxed line-clamp-3">
                      {dish.description}
                    </p>
                  </div>

                  {/* Actions & Meta */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-[#0B0A09]/60">
                      Heat: {dish.spiceLevel === 0 ? 'Mild' : '🌶️'.repeat(dish.spiceLevel)}
                    </span>
                    <button
                      onClick={() => onOpenDishCustomizer(dish)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#3D2314] hover:bg-[#4E2E1A] text-[#FFFDF9] text-xs font-semibold rounded-md transition-colors cursor-pointer border border-[#D4A53A]/40"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D4A53A]" />
                      <span>Order Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE NAIJA POT? (4 VISUAL FEATURE BLOCKS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#3D2314]">
            The Naija Pot Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B0A09]">
            Why Dine With Us?
          </h2>
          <p className="text-sm text-[#0B0A09]/75">
            Rooted in authentic Nigerian culinary traditions, farm-fresh vegetables, and uncompromising standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Block 1 */}
          <div className="bg-white p-8 rounded-xl border border-[#D4A53A]/20 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#0B0A09] text-[#D4A53A] flex items-center justify-center border border-[#D4A53A]/40">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3D2314]">
              Authentic Naija Flavours
            </h3>
            <p className="text-xs text-[#0B0A09]/75 leading-relaxed">
              True to traditional recipes. We source our iru, crayfish, scent leaves, and northern yaji spices directly from verified purveyors.
            </p>
          </div>

          {/* Block 2 */}
          <div className="bg-white p-8 rounded-xl border border-[#D4A53A]/20 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#0B0A09] text-[#D4A53A] flex items-center justify-center border border-[#D4A53A]/40">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3D2314]">
              Farm-Fresh Leafy Greens
            </h3>
            <p className="text-xs text-[#0B0A09]/75 leading-relaxed">
              Real Nigerian cooking thrives on fresh vegetables. We cook daily with vibrant ugwu (pumpkin leaves), bitterleaf, and scent leaves for unbeatable aroma and vitality.
            </p>
          </div>

          {/* Block 3 */}
          <div className="bg-white p-8 rounded-xl border border-[#D4A53A]/20 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#0B0A09] text-[#D4A53A] flex items-center justify-center border border-[#D4A53A]/40">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3D2314]">
              Made for Sharing
            </h3>
            <p className="text-xs text-[#0B0A09]/75 leading-relaxed">
              Nigerian food is communal. Our generous bukka platters and sharing bowls bring families, friends, and colleagues together.
            </p>
          </div>

          {/* Block 4 */}
          <div className="bg-white p-8 rounded-xl border border-[#D4A53A]/20 shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#0B0A09] text-[#D4A53A] flex items-center justify-center border border-[#D4A53A]/40">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3D2314]">
              Warm Hospitality
            </h3>
            <p className="text-xs text-[#0B0A09]/75 leading-relaxed">
              From our vibrant Afrobeat sounds to attentive, gracious service, step into an atmosphere where every guest is welcomed like family.
            </p>
          </div>
        </div>
      </section>

      {/* 5. RESTAURANT ATMOSPHERE (WIDE PHOTOGRAPHY SECTION) */}
      <section className="relative py-24 bg-[#0B0A09] text-[#FFFDF9] overflow-hidden border-y border-[#D4A53A]/25">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/restaurant_ambiance_dining_1792356259531.jpg"
            alt="Warm interior of Naija Pot restaurant and grill"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#3D2314]/85 to-[#0B0A09]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4A53A]">
            Dining Atmosphere
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFFDF9]">
            Lagos Spirit Meets Contemporary Elegance
          </h2>
          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Whether an intimate dinner for two, a lively birthday feast with our mega platters, or a corporate dinner, NAIJA POT offers an unforgettable setting draped in rich roasted brown, obsidian black, brushed gold, and ambient warmth.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('reservations')}
              className="px-8 py-3.5 bg-[#D4A53A] hover:bg-[#E8C547] text-[#0B0A09] font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => onNavigate('gallery')}
              className="px-8 py-3.5 bg-transparent hover:bg-white/10 border border-[#D4A53A]/40 text-[#FFFDF9] font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
            >
              View Restaurant Gallery
            </button>
          </div>
        </div>
      </section>

      {/* 6. GENUINE CUSTOMER EXPERIENCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#3D2314]">
            Guest Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B0A09]">
            The Naija Pot Experience
          </h2>
          <p className="text-sm text-[#0B0A09]/75">
            Real feedback from diners who cherish bold authentic West African flavours and heartfelt hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-[#D4A53A]/20 shadow-xs flex flex-col justify-between space-y-6">
            <p className="text-sm text-[#0B0A09]/85 italic leading-relaxed">
              "Finding genuine party jollof with that unmistakable firewood smokiness in London has always been tough until Naija Pot opened. The beef suya was tender with just the right kick of yaji spice."
            </p>
            <div className="pt-4 border-t border-slate-100">
              <p className="font-serif font-bold text-sm text-[#3D2314]">Tunde & Folake Balogun</p>
              <p className="text-xs text-[#0B0A09]/60">Dinner Guests · London</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#D4A53A]/20 shadow-xs flex flex-col justify-between space-y-6">
            <p className="text-sm text-[#0B0A09]/85 italic leading-relaxed">
              "The Egusi soup with pounded yam is outstanding. You can tell they use genuine stockfish and bitterleaf without cutting corners. The Chapman cocktail brought back so many childhood memories."
            </p>
            <div className="pt-4 border-t border-slate-100">
              <p className="font-serif font-bold text-sm text-[#3D2314]">Chidinma Okafor</p>
              <p className="text-xs text-[#0B0A09]/60">Regular Patron · Hackney</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#D4A53A]/20 shadow-xs flex flex-col justify-between space-y-6">
            <p className="text-sm text-[#0B0A09]/85 italic leading-relaxed">
              "Hosted my 30th birthday dinner here with 14 friends. The Lagos Bukka Sharing Platter fed everyone generously. Service was warm, prompt, and the atmosphere felt like home."
            </p>
            <div className="pt-4 border-t border-slate-100">
              <p className="font-serif font-bold text-sm text-[#3D2314]">David Alabi</p>
              <p className="text-xs text-[#0B0A09]/60">Group Celebration · Spitalfields</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INSTAGRAM & SOCIAL GALLERY */}
      <section className="bg-[#FAF6F0] py-20 border-y border-[#D4A53A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#3D2314]">
                Follow Along
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B0A09]">
                A Taste of Naija, Every Day
              </h2>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3D2314] hover:text-[#D4A53A] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#D4A53A]" />
                <span>@naijapotkitchen_grill_mk</span>
              </a>
              <span className="text-stone-300">·</span>
              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3D2314] hover:text-[#D4A53A] transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-[#D4A53A]" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.88-4.47V8.58a8.27 8.27 0 0 0 4.84 1.56V6.69z"/>
                </svg>
                <span>@naija.pot.kitchen</span>
              </a>
            </div>
          </div>

          {/* Gallery Preview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden relative group">
              <img
                src="/src/assets/images/food_beef_suya_grill_1792356257070.jpg"
                alt="Beef suya on grill"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6 text-[#D4A53A]" />
              </div>
            </div>

            <div className="aspect-square rounded-lg overflow-hidden relative group">
              <img
                src="/src/assets/images/food_jollof_party_platter_1792356258654.jpg"
                alt="Party jollof rice"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6 text-[#D4A53A]" />
              </div>
            </div>

            <div className="aspect-square rounded-lg overflow-hidden relative group">
              <img
                src="/src/assets/images/restaurant_ambiance_dining_1792356259531.jpg"
                alt="Restaurant dining room"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6 text-[#D4A53A]" />
              </div>
            </div>

            <div className="aspect-square rounded-lg overflow-hidden relative group">
              <img
                src="/src/assets/images/craft_chapman_cocktail_1792960788048.jpg"
                alt="Naija Pot Chapman cocktail"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6 text-[#D4A53A]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER SUBSCRIPTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141210] text-[#FFFDF9] p-8 sm:p-12 rounded-2xl shadow-xl border border-[#D4A53A]/40 text-center space-y-6">
          <div className="inline-flex p-3 rounded-full bg-[#1E1B18] text-[#D4A53A] border border-[#D4A53A]/30">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Stay Connected With Naija Pot
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
              Join our culinary circle for exclusive table releases, seasonal chef specials, Nigerian cultural feast nights, and festive menu previews.
            </p>
          </div>

          {newsletterSubmitted ? (
            <div className="p-4 bg-[#1E1B18] border border-[#D4A53A]/40 rounded-lg max-w-md mx-auto text-xs flex items-center justify-center gap-2 text-[#FAF6F0]">
              <CheckCircle2 className="w-5 h-5 text-[#D4A53A] shrink-0" />
              <span>E se gan! Thank you for subscribing. We will keep you updated.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-[#0B0A09] text-xs focus:outline-none focus:ring-2 focus:ring-[#D4A53A]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D4A53A] hover:bg-[#E8C547] text-[#0B0A09] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </div>
              {newsletterError && (
                <p className="text-xs text-red-300 text-left">{newsletterError}</p>
              )}
              <p className="text-[11px] text-stone-400">
                We respect your inbox. Unsubscribe at any time. No spam.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
