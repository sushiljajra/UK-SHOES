"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { SizeGuideModal } from "./SizeGuideModal";

interface ProductPurchasePanelProps {
  product: Product;
}

export const ProductPurchasePanel: React.FC<ProductPurchasePanelProps> = ({
  product,
}) => {
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useCart();

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || "Default"
  );
  const [selectedSize, setSelectedSize] = useState<string | number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const productWishlisted = isWishlisted(product.id);

  const handleSelectSize = (size: string | number) => {
    setSelectedSize(size);
    if (sizeError) setSizeError(false);
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.availableSizes?.length > 0) {
      setSizeError(true);
      showToast("Please select an available size to continue");
      return;
    }
    addToCart(product, selectedSize || undefined, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize && product.availableSizes?.length > 0) {
      setSizeError(true);
      showToast("Please select an available size to continue");
      return;
    }
    addToCart(product, selectedSize || undefined, selectedColor, quantity);
    showToast(
      `Proceeding to simulated checkout for ${product.name} (UK ${selectedSize})`
    );
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="flex flex-col space-y-6 w-full">
      {/* 1. Header Details: Category, Name, Rating, Price */}
      <div>
        <div className="flex items-center justify-between text-[#615e58] font-mono text-[11px] uppercase tracking-wider mb-2">
          <span>{product.subCategory || product.category}</span>
          {product.tag && (
            <span className="bg-[#111111] text-[#ffffff] px-2 py-0.5 text-[9px] tracking-widest">
              {product.tag}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#000000] tracking-tight uppercase leading-tight font-mono">
          {product.name}
        </h1>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mt-2 text-[13px] text-[#615e58]">
          <div className="flex items-center text-[#111111]">
            <span className="material-symbols-outlined text-[16px]">star</span>
            <span className="font-mono font-semibold ml-1 text-[13px]">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-[#c4c7c7]">•</span>
          <span className="font-mono text-[12px] underline underline-offset-4">
            {product.reviewCount} reviews
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 pt-4 border-t border-[#e5e2e1] flex items-baseline gap-3">
          <span className="text-2xl sm:text-3xl font-semibold font-mono text-[#000000]">
            {product.formattedPrice}
          </span>
          <span className="text-[12px] font-mono text-[#615e58] uppercase tracking-wider">
            Includes all local taxes
          </span>
        </div>
      </div>

      {/* 2. Short Description */}
      <p className="text-[14px] sm:text-[15px] text-[#615e58] leading-relaxed">
        {product.description}
      </p>

      {/* 3. Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] font-semibold tracking-wider text-[#000000] uppercase">
              Colorway:{" "}
              <span className="text-[#615e58] font-normal">{selectedColor}</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            {product.colors.map((color) => {
              const isSelected = selectedColor === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={`Select colorway ${color.name}`}
                  className={`group relative p-0.5 border transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#000000] ring-1 ring-[#000000]"
                      : "border-transparent hover:border-[#615e58]"
                  }`}
                >
                  <span
                    className={`block w-7 h-7 sm:w-8 sm:h-8 ${
                      color.border ? "border border-[#c4c7c7]" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Size Selection & Size Guide */}
      {product.availableSizes && product.availableSizes.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider">
              <span className="text-[#000000]">Select Size (UK):</span>
              {selectedSize && (
                <span className="text-[#615e58] font-normal">
                  UK {selectedSize}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(true)}
              className="font-mono text-[11px] text-[#000000] hover:text-[#615e58] underline underline-offset-4 uppercase tracking-wider flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">
                straighten
              </span>
              <span>Size Guide</span>
            </button>
          </div>

          {/* Sizes Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {product.availableSizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={String(size)}
                  type="button"
                  onClick={() => handleSelectSize(size)}
                  className={`h-11 font-mono text-[12px] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center border ${
                    isSelected
                      ? "bg-[#000000] text-[#ffffff] font-semibold border-[#000000]"
                      : "bg-[#ffffff] text-[#1b1c1a] border-[#e5e2e1] hover:border-[#000000]"
                  }`}
                >
                  UK {size}
                </button>
              );
            })}
          </div>

          {/* Size Validation Notice */}
          {sizeError && (
            <p className="mt-2 text-[12px] font-mono text-[#ba1a1a] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                error_outline
              </span>
              <span>Please select a footwear size before adding to bag.</span>
            </p>
          )}
        </div>
      )}

      {/* 5. Quantity & Purchase Actions */}
      <div className="pt-4 border-t border-[#e5e2e1] space-y-3">
        <div className="flex items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-[#e5e2e1] bg-[#ffffff] h-12 shrink-0">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="w-10 h-full flex items-center justify-center text-[#1b1c1a] hover:bg-[#f5f4f0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              −
            </button>
            <span className="w-10 text-center font-mono text-[13px] font-semibold text-[#000000]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              aria-label="Increase quantity"
              className="w-10 h-full flex items-center justify-center text-[#1b1c1a] hover:bg-[#f5f4f0] transition-colors"
            >
              +
            </button>
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={
              productWishlisted ? "Remove from Wishlist" : "Save to Wishlist"
            }
            className={`h-12 px-4 border transition-colors flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-wider shrink-0 ${
              productWishlisted
                ? "border-[#ba1a1a] text-[#ba1a1a] bg-[#faf9f5]"
                : "border-[#e5e2e1] text-[#000000] hover:border-[#000000] bg-[#ffffff]"
            }`}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{
                fontVariationSettings: productWishlisted
                  ? "'FILL' 1"
                  : "'FILL' 0",
              }}
            >
              favorite
            </span>
            <span className="hidden sm:inline">
              {productWishlisted ? "Saved" : "Wishlist"}
            </span>
          </button>
        </div>

        {/* Action Buttons: Add to Bag & Buy Now */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full h-13 bg-[#000000] text-[#ffffff] font-mono text-[12px] font-semibold uppercase tracking-[0.18em] hover:bg-[#2a2a2a] active:bg-[#000000] transition-colors shadow-sm flex items-center justify-center cursor-pointer"
          >
            Add to Bag
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full h-13 bg-transparent text-[#000000] border border-[#000000] font-mono text-[12px] font-semibold uppercase tracking-[0.18em] hover:bg-[#000000] hover:text-[#ffffff] active:bg-[#2a2a2a] transition-all flex items-center justify-center cursor-pointer"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* 6. Shipping & Returns Information Card */}
      <div className="border-t border-[#e5e2e1] pt-6 space-y-3 font-mono text-[12px]">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[18px] text-[#000000] mt-0.5">
            local_shipping
          </span>
          <div>
            <span className="font-semibold text-[#000000] uppercase block">
              Complimentary Standard Delivery
            </span>
            <span className="text-[#615e58]">
              Dispatched in 24–48 hours on orders over ₹4,999.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[18px] text-[#000000] mt-0.5">
            cached
          </span>
          <div>
            <span className="font-semibold text-[#000000] uppercase block">
              30-Day Wear Trial
            </span>
            <span className="text-[#615e58]">
              Seamless size exchanges or returns within 30 days.
            </span>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
};
