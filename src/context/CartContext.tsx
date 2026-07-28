import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, AddressInfo, Order } from '../types';

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  quickViewProduct: Product | null;
  isCartOpen: boolean;
  appliedCoupon: { code: string; discountAmount: number } | null;
  shippingAddress: AddressInfo;
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedOption?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  setQuickViewProduct: (product: Product | null) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  applyCoupon: (code: string, discountAmount: number) => void;
  removeCoupon: () => void;
  setShippingAddress: (address: AddressInfo) => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShippingFee: number;
  cartTotal: number;
  cartCount: number;
}

const DEFAULT_ADDRESS: AddressInfo = {
  fullName: 'محمد احمدی',
  phone: '09121234567',
  province: 'تهران',
  city: 'تهران',
  postalCode: '1458912345',
  address: 'خیابان ولیعصر، نرسیده به میدان ونک، برج نگار، طبقه ۵، واحد ۵۰۲',
  notes: 'لطفا قبل از تحویل پیامک ارسال کنید.'
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amouzco_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('amouzco_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [shippingAddress, setShippingAddressState] = useState<AddressInfo>(DEFAULT_ADDRESS);

  useEffect(() => {
    try {
      localStorage.setItem('amouzco_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('amouzco_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedOption?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        if (selectedColor) next[existingIndex].selectedColor = selectedColor;
        if (selectedOption) next[existingIndex].selectedOption = selectedOption;
        return next;
      }
      return [...prev, { product, quantity, selectedColor, selectedOption }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => wishlist.some(p => p.id === productId);

  const applyCoupon = (code: string, discountAmount: number) => {
    setAppliedCoupon({ code, discountAmount });
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const setShippingAddress = (address: AddressInfo) => {
    setShippingAddressState(address);
  };

  // Computations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const cartShippingFee = cartSubtotal > 3000000 || cartSubtotal === 0 ? 0 : 75000;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShippingFee);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        quickViewProduct,
        isCartOpen,
        appliedCoupon,
        shippingAddress,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setQuickViewProduct,
        setIsCartOpen,
        applyCoupon,
        removeCoupon,
        setShippingAddress,
        cartSubtotal,
        cartDiscount,
        cartShippingFee,
        cartTotal,
        cartCount
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
