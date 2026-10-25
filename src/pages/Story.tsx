import React from 'react';
import { PageId } from '../components/Header';
import { Flame, Utensils, HeartHandshake, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface StoryProps {
  onNavigate: (page: PageId) => void;
}

export const Story: React.FC<StoryProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Header */}
      <section className="relative py-24 bg-[#0B0A09] text-[#FFFDF9] text-center overflow-hidden border-b border-[#D4A53A]/25">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/restaurant_ambiance_dining_1792356259531.jpg"
            alt="Naija Pot ambiance"
            className="w-full h-full object-cover opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#3D2314]/80 to-[#0B0A09]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A53A]/15 border border-[#D4A53A]/40 text-[#E8C547] text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            Our Heritage & Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#FFFDF9]">
            Rooted in Tradition. <br />
            <span className="italic text-[#D4A53A]">Made for Today.</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            The story of NAIJA POT is an ode to the vibrant street bukkas of Lagos Island, the wisdom of ancestral iron-pot cooking, and the warmth of Nigerian family gatherings.
          </p>
        </div>
      </section>

      {/* Chapter 1: The Bukka Tradition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#3D2314] font-bold">
              01. The Spirit of Lagos Bukka
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B0A09] leading-tight">
              Where Fire Meets Soul and Community
            </h2>
            <p className="text-sm sm:text-base text-[#0B0A09]/80 leading-relaxed">
              In Lagos, a <em>bukka</em> is more than an eatery — it is an egalitarian sanctuary. From company executives in sharp suits to market traders, artists, and students, everyone gathers side-by-side around steaming pots of amala, rich draw soups, and fiery peppered meats.
            </p>
            <p className="text-sm sm:text-base text-[#0B0A09]/80 leading-relaxed">
              At NAIJA POT, we set out to preserve this unapologetic authenticity while elevating the dining experience into an inviting, contemporary setting. We honor the time-tested methods: the slow caramelization of bell peppers and tomatoes, the gentle smoking of jollof rice over hot embers, and the pounding of yams to cloud-like softness.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-[#D4A53A]/30">
              <img
                src="/src/assets/images/hero_naija_feast_1792356256861.jpg"
                alt="Nigerian feast spread"
                className="w-full h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Pot and The Fire */}
      <section className="bg-[#FAF6F0] py-20 border-y border-[#D4A53A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-[#D4A53A]/30">
                <img
                  src="/src/assets/images/food_beef_suya_grill_1792356257070.jpg"
                  alt="Beef suya flame grill"
                  className="w-full h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#3D2314] font-bold">
                02. The Hearth & Charcoal
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B0A09] leading-tight">
                The Science of True Wood Smoke
              </h2>
              <p className="text-sm sm:text-base text-[#0B0A09]/80 leading-relaxed">
                You cannot replicate authentic Nigerian party jollof with modern electric steam ovens. That legendary, deep aroma comes from allowing the bottom layer of rice to char deliberately against the heavy iron pot, perfuming every single grain above it.
              </p>
              <p className="text-sm sm:text-base text-[#0B0A09]/80 leading-relaxed">
                Similarly, our suya is roasted over natural lumpwood charcoal. We hand-blend roasted groundnuts, crushed ginger, cloves, garlic, and dried chili pepper to create our Hausa-inspired yaji spice rub. It caramelizes onto the beef as fat renders over glowing coals, filling the air with intoxicating fragrance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Hospitality & Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#3D2314]">
            Our Guiding Pillars
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B0A09]">
            The Pillars of Naija Pot
          </h2>
          <p className="text-sm text-[#0B0A09]/75">
            The values that shape every dish we cook, every table we set, and every guest we welcome.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-[#D4A53A]/20 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#0B0A09] text-[#D4A53A] flex items-center justify-center border border-[#D4A53A]/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3D2314]">
              Sacred Greens & Pure Ingredients
            </h3>
            <p className="text-xs text-[#0B0A09]/75 leading-relaxed">
              The greens in our kitchen represent the vegetable bounty of Nigerian soil — fresh ugwu, bitterleaf, and scent leaves picked daily, cooked with 100% Halal meats, scotch bonnets, and pure palm oil.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#D4A53A]/20 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#0B0A09] text-[#D4A53A] flex items-center justify-center border border-[#D4A53A]/40">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3D2314]">
              Generous Portions
            </h3>
            <p className="text-xs text-[#0B0A09]/75 leading-relaxed">
              In Nigerian culture, hospitality is measured in abundance. Our plates and platters are hearty, satisfying, and created for shared memories.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#D4A53A]/20 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#0B0A09] text-[#D4A53A] flex items-center justify-center border border-[#D4A53A]/40">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3D2314]">
              Radical Warmth
            </h3>
            <p className="text-xs text-[#0B0A09]/75 leading-relaxed">
              Whether you are dining with us for the first time or coming back for your weekly egusi fix, our team treats you like family arriving home.
            </p>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-[#141210] text-[#FFFDF9] p-10 rounded-2xl border-2 border-[#D4A53A]/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold">
              Ready to Experience the Flavours?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-lg">
              Reserve your table in our dining room or order your favorite dishes directly for collection or local delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigate('reservations')}
              className="px-6 py-3 bg-[#D4A53A] text-[#0B0A09] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#E8C547] transition-colors cursor-pointer shadow-md"
            >
              Book a Table
            </button>
            <button
              onClick={() => onNavigate('menu')}
              className="px-6 py-3 bg-transparent border border-[#D4A53A]/50 text-[#FFFDF9] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
