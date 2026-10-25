import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../data/menuData';

export interface CartItemOption {
  swallow?: string;
  protein?: string;
  spiceLevel?: number;
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique cart item key
  menuItem: MenuItem;
  quantity: number;
  options?: CartItemOption;
  itemTotalPrice: number;
}

export type OrderType = 'collection' | 'delivery';

interface CartContextType {
  cart: CartItem[];
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addItem: (menuItem: MenuItem, quantity?: number, options?: CartItemOption) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  totalItemCount: number;
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('naija_pot_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState<OrderType>('collection');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('naija_pot_cart', JSON.stringify(cart));
    } catch {
      // Storage unavailable
    }
  }, [cart]);

  const addItem = (menuItem: MenuItem, quantity = 1, options?: CartItemOption) => {
    const optionKey = options ? `${options.swallow || ''}-${options.protein || ''}-${options.spiceLevel ?? ''}` : 'default';
    const uniqueKey = `${menuItem.id}-${optionKey}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === uniqueKey);
      if (existing) {
        return prev.map((item) =>
          item.id === uniqueKey
            ? {
                ...item,
                quantity: item.quantity + quantity,
                itemTotalPrice: (item.quantity + quantity) * item.menuItem.price,
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: uniqueKey,
            menuItem,
            quantity,
            options,
            itemTotalPrice: quantity * menuItem.price,
          },
        ];
      }
    });
  };

  const removeItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              itemTotalPrice: newQty * item.menuItem.price,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 40 ? 0 : 3.50) : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        orderType,
        setOrderType,
        isCartOpen,
        setIsCartOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItemCount,
        subtotal,
        deliveryFee,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
