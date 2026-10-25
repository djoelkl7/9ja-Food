import React, { useState, useMemo } from 'react';
import { menuCategories, menuItems, MenuItem, MenuCategoryKey } from '../data/menuData';
import { LazyImage } from '../components/LazyImage';
import { Search, Flame, Download, UtensilsCrossed, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';

interface MenuPageProps {
  onOpenDishCustomizer: (dish: MenuItem) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onOpenDishCustomizer }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryKey | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [pdfGenerating, setPdfGenerating] = useState(false);

  // Filtered Items logic
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter !== 'all') {
        if (dietaryFilter === 'Halal' && !item.dietary.includes('Halal')) return false;
        if (dietaryFilter === 'Gluten-Free' && !item.dietary.includes('Gluten-Free')) return false;
        if (dietaryFilter === 'Vegetarian' && !item.dietary.some((d) => d === 'Vegetarian' || d === 'Vegan')) return false;
        if (dietaryFilter === 'Chef Signature' && !item.dietary.includes('Chef Signature')) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesNative = item.nativeName?.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        return matchesName || matchesNative || matchesDesc;
      }
      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  const handleDownloadPdf = () => {
    setPdfGenerating(true);
    setTimeout(() => {
      window.print();
      setPdfGenerating(false);
    }, 400);
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Menu Header */}
      <section className="bg-gradient-to-b from-[#0B0A09] via-[#141210] to-[#26160C] text-[#FFFDF9] py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-b border-[#D4A53A]/25">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4A53A]/15 border border-[#D4A53A]/40 text-[#E8C547] text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prepared Fresh to Order</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#FFFDF9]">
            The Naija Pot Menu
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto">
            Traditional Lagos bukka flavours, slow charcoal grills, and authentic Nigerian home cooking, all certified Halal.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4">
            <button
              onClick={handleDownloadPdf}
              disabled={pdfGenerating}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#3D2314] hover:bg-[#4E2E1A] border border-[#D4A53A] text-xs font-semibold rounded-lg transition-colors text-[#FFFDF9] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#D4A53A]" />
              <span>{pdfGenerating ? 'Preparing Print...' : 'Print / Save PDF Menu'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Controls & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Search Bar + Dietary Filter Row */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white p-4 rounded-xl border border-[#D4A53A]/20 shadow-xs">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Jollof, Suya, Egusi, Asun, Plantain)..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF6F0] border border-[#D4A53A]/25 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A53A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF6F0] rounded-lg border border-[#D4A53A]/20">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'Chef Signature', label: 'Signatures' },
              { id: 'Halal', label: '100% Halal' },
              { id: 'Gluten-Free', label: 'Gluten-Free' },
              { id: 'Vegetarian', label: 'Veg/Vegan' },
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => setDietaryFilter(diet.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  dietaryFilter === diet.id
                    ? 'bg-[#3D2314] text-[#D4A53A] shadow-xs'
                    : 'text-stone-700 hover:text-[#0B0A09]'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#D4A53A]/25">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#3D2314] text-[#D4A53A] shadow-sm border border-[#D4A53A]'
                : 'bg-white text-stone-700 border border-[#D4A53A]/20 hover:border-[#D4A53A]'
            }`}
          >
            All Categories ({menuItems.length})
          </button>
          {menuCategories.map((cat) => {
            const count = menuItems.filter((i) => i.category === cat.key).length;
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#3D2314] text-[#D4A53A] shadow-sm border border-[#D4A53A]'
                    : 'bg-white text-stone-700 border border-[#D4A53A]/20 hover:border-[#D4A53A]'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Category Tagline (if specific category selected) */}
        {selectedCategory !== 'all' && (
          <div className="bg-[#FAF6F0] p-4 rounded-lg border-l-4 border-[#3D2314] text-xs text-stone-700">
            <span className="font-bold text-[#3D2314] mr-2">
              {menuCategories.find((c) => c.key === selectedCategory)?.label}:
            </span>
            {menuCategories.find((c) => c.key === selectedCategory)?.tagline}
          </div>
        )}

        {/* Dishes Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-slate-200 space-y-3">
            <UtensilsCrossed className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#211A19]">No dishes match your filter</h3>
            <p className="text-xs text-slate-500">
              Try clearing your search query or selecting another dietary preference.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="mt-2 px-4 py-2 bg-[#6D1F2B] text-[#FFF7E8] text-xs font-semibold rounded-md cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-xl overflow-hidden border border-[#6D1F2B]/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image container with subtle scale transition and slight color overlay on hover */}
                  {dish.image ? (
                    <div className="relative h-52 bg-[#1C1916] overflow-hidden">
                      <LazyImage
                        src={dish.image}
                        alt={dish.name}
                        containerClassName="h-52 w-full"
                        showHoverOverlay={true}
                        overlayGradient="bg-gradient-to-t from-[#0A0908]/85 via-[#D4A53A]/15 to-transparent"
                      />
                      {dish.nativeName && (
                        <div className="absolute bottom-2.5 left-3 z-10 bg-[#131110]/95 backdrop-blur-xs text-[#D4A53A] border border-[#D4A53A]/30 text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                          {dish.nativeName}
                        </div>
                      )}
                    </div>
                  ) : (
                    dish.nativeName && (
                      <div className="pt-4 px-6 pb-0">
                        <span className="text-[11px] font-bold text-[#D4A53A] uppercase tracking-wider">
                          {dish.nativeName}
                        </span>
                      </div>
                    )
                  )}

                  {/* Body Info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-lg font-bold text-[#0B0A09] leading-snug group-hover:text-[#3D2314] transition-colors">
                        {dish.name}
                      </h3>
                      <span className="font-serif text-lg font-bold text-[#3D2314] tabular-nums shrink-0">
                        £{dish.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {dish.description}
                    </p>

                    {/* Metadata: Unboxed Text with Separators */}
                    <div className="flex items-center flex-wrap gap-2 text-[11px] text-stone-500 pt-2 border-t border-stone-200">
                      {dish.dietary.map((d, idx) => (
                        <React.Fragment key={d}>
                          <span>{d}</span>
                          {idx < dish.dietary.length - 1 && <span aria-hidden="true">·</span>}
                        </React.Fragment>
                      ))}
                      {dish.spiceLevel > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-0.5 text-amber-700">
                            <Flame className="w-3 h-3" />
                            {['Mild', 'Medium', 'Hot', 'Extra Hot'][dish.spiceLevel]}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Allergens Notice */}
                    {dish.allergens.length > 0 && (
                      <div className="text-[10px] text-amber-900/80 bg-amber-50/70 p-2 rounded flex items-center gap-1.5 border border-amber-200/50">
                        <AlertCircle className="w-3 h-3 shrink-0 text-amber-700" />
                        <span>Contains: {dish.allergens.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-4 bg-[#FAF6F0] border-t border-[#D4A53A]/15 flex items-center justify-between">
                  <span className="text-[11px] text-stone-600">
                    {dish.swallowIncluded ? 'Includes fresh swallow' : 'Freshly prepared'}
                  </span>
                  <button
                    onClick={() => onOpenDishCustomizer(dish)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#3D2314] hover:bg-[#4E2E1A] text-[#FFFDF9] text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs border border-[#D4A53A]/40"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#D4A53A]" />
                    <span>Order Dish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
