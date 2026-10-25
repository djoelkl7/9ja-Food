import React, { useState } from 'react';
import { useCart, OrderType } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    orderType,
    setOrderType,
    subtotal,
    deliveryFee,
    grandTotal,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'counter' | 'card' | 'apple_pay'>('counter');
  const [orderReference, setOrderReference] = useState('');
  const [formError, setFormError] = useState('');

  if (!isCartOpen) return null;

  const handleStartCheckout = () => {
    setFormError('');
    setCheckoutStep('details');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setFormError('Please enter your full name and telephone number.');
      return;
    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setFormError('Please enter your delivery street address and postcode.');
      return;
    }

    // Generate realistic order reference
    const ref = `NP-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderReference(ref);
    setCheckoutStep('success');
  };

  const getWhatsAppOrderUrl = () => {
    let text = `Hello Naija Pot, I would like to place an order:\n\n`;
    text += `*Order Type:* ${orderType === 'delivery' ? 'Local Delivery' : 'Collection'}\n`;
    cart.forEach((item, idx) => {
      text += `${idx + 1}. ${item.quantity}x ${item.menuItem.name}`;
      if (item.options?.swallow) text += ` (${item.options.swallow})`;
      if (item.options?.protein) text += ` [${item.options.protein}]`;
      text += ` - £${item.itemTotalPrice.toFixed(2)}\n`;
    });
    text += `\n*Subtotal:* £${subtotal.toFixed(2)}`;
    if (orderType === 'delivery') {
      text += `\n*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `£${deliveryFee.toFixed(2)}`}`;
    }
    text += `\n*Total:* £${grandTotal.toFixed(2)}`;
    if (customerName) text += `\n*Customer:* ${customerName}`;
    if (customerPhone) text += `\n*Phone:* ${customerPhone}`;
    if (deliveryAddress && orderType === 'delivery') text += `\n*Address:* ${deliveryAddress}`;
    if (orderReference) text += `\n*Order Ref:* ${orderReference}`;
    return `https://wa.me/447342229865?text=${encodeURIComponent(text)}`;
  };

  const handleFinishAndReset = () => {
    clearCart();
    setCheckoutStep('cart');
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] text-[#0B0A09] shadow-2xl flex flex-col border-l border-[#D4A53A]/30">
          {/* Header */}
          <div className="px-6 py-5 bg-[#0B0A09] text-[#FFFDF9] flex items-center justify-between border-b border-[#D4A53A]/30">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#D4A53A]" />
              <h3 className="font-serif text-lg font-bold">
                {checkoutStep === 'cart' && 'Your Takeaway Basket'}
                {checkoutStep === 'details' && 'Complete Your Order'}
                {checkoutStep === 'success' && 'Order Received'}
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutStep === 'cart' && (
              <>
                {/* Order Type Toggle */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#FAF6F0] rounded-lg border border-[#D4A53A]/30">
                  <button
                    type="button"
                    onClick={() => setOrderType('collection')}
                    className={`py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      orderType === 'collection'
                        ? 'bg-[#3D2314] text-[#D4A53A] shadow-sm'
                        : 'text-stone-700 hover:text-[#0B0A09]'
                    }`}
                  >
                    Collection (25 mins)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-[#3D2314] text-[#D4A53A] shadow-sm'
                        : 'text-stone-700 hover:text-[#0B0A09]'
                    }`}
                  >
                    Local Delivery (45 mins)
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#3D2314]/10 flex items-center justify-center text-[#3D2314]">
                      <ShoppingBag className="w-8 h-8 opacity-70" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#0B0A09]">Your basket is empty</h4>
                    <p className="text-xs text-[#211A19]/70 max-w-xs mx-auto">
                      Explore our menu and add authentic Naija party jollof, smoky suya, or rich traditional soups to your bag.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-3.5 rounded-lg border border-[#D4A53A]/20 shadow-xs flex gap-3 items-start"
                      >
                        {item.menuItem.image && (
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-16 h-16 rounded-md object-cover shrink-0 border border-[#D4A53A]/20"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="font-semibold text-sm text-[#0B0A09] truncate">
                              {item.menuItem.name}
                            </h5>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-stone-400 hover:text-red-700 transition-colors p-0.5 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Selected Options */}
                          {item.options && (
                            <div className="text-[11px] text-[#211A19]/70 mt-1 space-y-0.5">
                              {item.options.swallow && (
                                <p>Swallow: <span className="font-medium text-[#3D2314]">{item.options.swallow}</span></p>
                              )}
                              {item.options.protein && (
                                <p>Protein: <span className="font-medium text-[#3D2314]">{item.options.protein}</span></p>
                              )}
                              {item.options.spiceLevel !== undefined && (
                                <p>Spice: {['Mild', 'Medium', 'Hot', 'Extra Naija Hot'][item.options.spiceLevel]}</p>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-[#D4A53A]/30 rounded-md overflow-hidden bg-[#FAF6F0]">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 hover:bg-[#3D2314]/10 transition-colors cursor-pointer text-[#0B0A09]"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-bold font-mono">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 hover:bg-[#3D2314]/10 transition-colors cursor-pointer text-[#0B0A09]"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-serif font-bold text-sm text-[#3D2314] tabular-nums">
                              £{item.itemTotalPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Step 2: Customer Details & Checkout Form */}
            {checkoutStep === 'details' && (
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-md flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Folake Adeyemi"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#3D2314]/20 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A53A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                      Mobile Telephone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+44 7123 456789"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#3D2314]/20 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A53A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                      Email Address (for receipt)
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#3D2314]/20 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A53A]"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                        Delivery Address & Postcode *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="House number, street name, London postcode"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#3D2314]/20 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A53A]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                      Chef Notes / Dietary Requests
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Extra onions on suya, mild spice"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#3D2314]/20 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A53A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] uppercase tracking-wider mb-1">
                      Payment Preference
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('counter')}
                        className={`p-2.5 border rounded-md text-left text-xs font-medium cursor-pointer transition-all ${
                          paymentMethod === 'counter'
                            ? 'border-[#D4A53A] bg-[#3D2314] text-[#D4A53A] font-bold shadow-xs'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-[#D4A53A]/50'
                        }`}
                      >
                        {orderType === 'collection' ? 'Pay upon Collection' : 'Cash / Card on Delivery'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2.5 border rounded-md text-left text-xs font-medium cursor-pointer transition-all ${
                          paymentMethod === 'card'
                            ? 'border-[#D4A53A] bg-[#3D2314] text-[#D4A53A] font-bold shadow-xs'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-[#D4A53A]/50'
                        }`}
                      >
                        Secure Card (Online)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 py-2.5 border border-[#3D2314]/30 text-[#3D2314] text-xs font-semibold rounded-md hover:bg-[#3D2314]/10 transition-colors cursor-pointer"
                  >
                    Back to Basket
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#3D2314] hover:bg-[#4E2E1A] text-[#FFFDF9] text-xs font-bold rounded-md transition-colors cursor-pointer shadow-sm border border-[#D4A53A]/40"
                  >
                    Confirm & Place Order (£{grandTotal.toFixed(2)})
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Success Confirmation Slip */}
            {checkoutStep === 'success' && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 border border-emerald-300">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#0B0A09]">
                  E se gan! Order Confirmed
                </h4>
                <div className="bg-white p-4 rounded-lg border border-[#D4A53A]/30 text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-[#211A19]/70">Order Reference:</span>
                    <span className="font-mono font-bold text-sm text-[#3D2314]">{orderReference}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-[#211A19]/70">Customer:</span>
                    <span className="font-semibold">{customerName}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-[#211A19]/70">Type:</span>
                    <span className="capitalize font-semibold">{orderType}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-[#211A19]/70">Estimated Time:</span>
                    <span className="text-emerald-700 font-bold">
                      {orderType === 'collection' ? 'Ready in 25-30 minutes' : 'Delivery in 40-50 minutes'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="font-bold">Total Charged:</span>
                    <span className="font-bold font-serif text-sm text-[#3D2314] tabular-nums">£{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-[#FAF6F0] border border-[#D4A53A]/30 p-3 rounded-md text-xs text-[#211A19]/80 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4A53A] shrink-0" />
                  <span>The chef has received your order and the charcoal grill is sizzling!</span>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={getWhatsAppOrderUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Send Order Details to WhatsApp Kitchen Desk</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleFinishAndReset}
                    className="w-full py-3 bg-[#3D2314] text-[#FFFDF9] text-xs font-bold rounded-lg hover:bg-[#4E2E1A] transition-colors cursor-pointer shadow-sm border border-[#D4A53A]/30"
                  >
                    Done & Back to Menu
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Summary (Active when in cart step) */}
          {checkoutStep === 'cart' && cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#D4A53A]/20 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#211A19]/70">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium tabular-nums">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#211A19]/70">
                  <span>
                    {orderType === 'delivery' ? 'Local Delivery Fee' : 'Collection Fee'}
                  </span>
                  <span className="font-mono font-medium tabular-nums">
                    {deliveryFee === 0 ? 'FREE' : `£${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {orderType === 'delivery' && subtotal < 40 && (
                  <p className="text-[11px] text-[#D4A53A] font-medium">
                    Add £{(40 - subtotal).toFixed(2)} more for FREE delivery
                  </p>
                )}
                <div className="flex justify-between text-base font-bold pt-2 border-t border-stone-100">
                  <span className="font-serif">Total</span>
                  <span className="font-serif text-[#3D2314] tabular-nums">
                    £{grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={handleStartCheckout}
                  className="w-full py-3 bg-[#3D2314] hover:bg-[#4E2E1A] text-[#FFFDF9] text-sm font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#D4A53A]/50"
                >
                  <span>Proceed to Checkout</span>
                  <span>·</span>
                  <span className="text-[#D4A53A] tabular-nums">£{grandTotal.toFixed(2)}</span>
                </button>

                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1B8040] border border-[#25D366]/40 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Quick Order via WhatsApp</span>
                  <span>(wa.me)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
