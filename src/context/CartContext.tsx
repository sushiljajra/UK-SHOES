"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  selectedColor?: string;
  selectedSize?: string | number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  wishlist: string[];
  wishlistCount: number;
  addToCart: (product: Product, size?: string | number, color?: string, quantity?: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => boolean; // returns true if now wishlisted
  isWishlisted: (productId: string) => boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([
    "prod-uk-street-runner",
    "prod-uk-court-classic",
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const addToCart = (
    product: Product,
    size?: string | number,
    color?: string,
    quantity = 1
  ) => {
    const chosenColor = color || product.colors?.[0]?.name || "Default";
    const chosenSize = size !== undefined ? size : undefined;

    setCart((prev) => {
      // Find matching item with identical product ID, color, and size
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor === chosenColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [
        ...prev,
        {
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity,
        },
      ];
    });

    const sizeStr = chosenSize ? ` (UK ${chosenSize})` : "";
    showToast(`Added ${product.name}${sizeStr} to bag`);
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        quantity,
      };
      return updated;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => {
      const removedItem = prev[index];
      if (removedItem) {
        showToast(`Removed ${removedItem.product.name} from bag`);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string): boolean => {
    let nowActive = false;
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        nowActive = false;
        showToast("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        nowActive = true;
        showToast("Saved to wishlist");
        return [...prev, productId];
      }
    });
    return nowActive;
  };

  const isWishlisted = (productId: string): boolean => {
    return wishlist.includes(productId);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        wishlist,
        wishlistCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#000000] text-[#ffffff] px-5 py-3 shadow-2xl font-mono text-[11px] tracking-wider uppercase flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="material-symbols-outlined text-[16px] text-green-400">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
