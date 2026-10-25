import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { useCart, CartItemOption } from '../context/CartContext';
import { X, Plus, Minus, Check, Flame } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface DishCustomizerModalProps {
  dish: MenuItem | null;
  onClose: () => void;
}

export const DishCustomizerModal: React.FC<DishCustomizerModalProps> = ({ dish, onClose }) => {
  const { addItem, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSwallow, setSelectedSwallow] = useState<string>(
    dish?.availableSwallows ? dish.availableSwallows[0] : ''
  );
  const [selectedProtein, setSelectedProtein] = useState<string>(
    dish?.proteinChoice ? dish.proteinChoice[0] : ''
  );
  const [spiceLevel, setSpiceLevel] = useState<number>(dish ? dish.spiceLevel : 1);
  const [notes, setNotes] = useState('');

  if (!dish) return null;

  const handleAddToCart = () => {
    const options: CartItemOption = {};
    if (dish.swallowIncluded && selectedSwallow) {
      options.swallow = selectedSwallow;
    }
    if (dish.proteinChoice && selectedProtein) {
      options.protein = selectedProtein;
    }
    options.spiceLevel = spiceLevel;
    if (notes.trim()) {
      options.specialInstructions = notes.trim();
    }

    addItem(dish, quantity, options);
    onClose();
    setIsCartOpen(true);
  };

  const spiceLabels = ['Mild', 'Medium', 'Hot', 'Extra Naija Hot 🔥'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#FAF6F0] rounded-xl shadow-2xl border border-[#D4A53A]/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header / Media */}
        <div className="relative h-48 bg-[#0B0A09] overflow-hidden shrink-0 group">
          {dish.image ? (
            <LazyImage
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
              showHoverOverlay={true}
              overlayGradient="bg-gradient-to-t from-black/85 via-[#D4A53A]/15 to-transparent"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#141210] text-[#D4A53A]">
              <span className="font-serif text-2xl font-bold">{dish.name}</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-4 right-4 text-white z-20">
            {dish.nativeName && (
              <span className="text-xs uppercase tracking-wider text-[#D4A53A] font-semibold">
                {dish.nativeName}
              </span>
            )}
            <h3 className="font-serif text-xl font-bold leading-tight">{dish.name}</h3>
            <span className="font-serif text-base font-bold text-[#D4A53A]">
              £{dish.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#211A19]">
          <p className="text-sm text-[#211A19]/80 leading-relaxed">{dish.description}</p>

          {/* Swallow Choice (if applicable) */}
          {dish.swallowIncluded && dish.availableSwallows && (
            <div className="space-y-2">
              <label className="font-bold text-[#3D2314] uppercase tracking-wider block">
                Select Your Swallow (Included)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {dish.availableSwallows.map((swallow) => (
                  <button
                    key={swallow}
                    type="button"
                    onClick={() => setSelectedSwallow(swallow)}
                    className={`py-2 px-3 text-left border rounded-md font-medium transition-all flex items-center justify-between cursor-pointer ${
                      selectedSwallow === swallow
                        ? 'border-[#D4A53A] bg-[#3D2314] text-[#D4A53A] font-bold shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-[#D4A53A]/50'
                    }`}
                  >
                    <span>{swallow}</span>
                    {selectedSwallow === swallow && <Check className="w-3.5 h-3.5 text-[#D4A53A]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Protein Choice (if applicable) */}
          {dish.proteinChoice && (
            <div className="space-y-2">
              <label className="font-bold text-[#3D2314] uppercase tracking-wider block">
                Select Protein Pairing
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dish.proteinChoice.map((protein) => (
                  <button
                    key={protein}
                    type="button"
                    onClick={() => setSelectedProtein(protein)}
                    className={`py-2 px-3 text-left border rounded-md font-medium transition-all flex items-center justify-between cursor-pointer ${
                      selectedProtein === protein
                        ? 'border-[#D4A53A] bg-[#3D2314] text-[#D4A53A] font-bold shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-[#D4A53A]/50'
                    }`}
                  >
                    <span>{protein}</span>
                    {selectedProtein === protein && <Check className="w-3.5 h-3.5 text-[#D4A53A]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spice Preference */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#3D2314] uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#D4A53A]" />
                Naija Spice Level
              </label>
              <span className="font-medium text-[#3D2314]">{spiceLabels[spiceLevel]}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 1, 2, 3].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSpiceLevel(lvl)}
                  className={`py-1.5 text-center border rounded-md font-semibold cursor-pointer transition-all ${
                    spiceLevel === lvl
                      ? 'border-[#3D2314] bg-[#3D2314] text-[#D4A53A]'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {spiceLabels[lvl].split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-1">
            <label className="font-bold text-[#3D2314] uppercase tracking-wider block">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Less oil, sauce on the side"
              className="w-full px-3 py-2 bg-white border border-[#3D2314]/20 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4A53A]"
            />
          </div>

          {/* Dietary & Allergens info */}
          <div className="pt-2 text-[11px] text-[#211A19]/60 border-t border-[#D4A53A]/20 flex flex-wrap gap-x-4 gap-y-1">
            {dish.allergens.length > 0 ? (
              <span>Allergens: {dish.allergens.join(', ')}</span>
            ) : (
              <span>No major allergens declared</span>
            )}
            <span>·</span>
            <span>Halal Certified</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-[#D4A53A]/20 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Selector */}
          <div className="flex items-center border border-[#D4A53A]/30 rounded-lg overflow-hidden bg-[#FAF6F0]">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-[#F4ECE4] transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4 text-[#3D2314]" />
            </button>
            <span className="px-3.5 font-bold font-mono text-sm text-[#0B0A09]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-[#F4ECE4] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#3D2314]" />
            </button>
          </div>

          {/* Add to Basket Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 px-4 bg-[#3D2314] hover:bg-[#4E2E1A] text-[#FFFDF9] font-bold rounded-lg transition-colors flex items-center justify-between shadow-sm cursor-pointer border border-[#D4A53A]/40"
          >
            <span>Add to Basket</span>
            <span className="font-serif tabular-nums text-sm text-[#D4A53A]">
              £{(dish.price * quantity).toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
