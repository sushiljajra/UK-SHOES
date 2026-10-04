"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, getProductSlug } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickAdd,
  onToggleWishlist,
  isWishlisted: propIsWishlisted,
}) => {
  const cartContext = useCart();
  const contextIsWishlisted = cartContext.isWishlisted(product.id);
  const activeWishlistState = propIsWishlisted !== undefined ? propIsWishlisted : contextIsWishlisted;

  const [addedNotice, setAddedNotice] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    } else {
      cartContext.toggleWishlist(product.id);
    }
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1500);
    if (onQuickAdd) {
      onQuickAdd(product);
    } else {
      cartContext.addToCart(product);
    }
  };

  // Convert product id to clean slug for product details route
  const productSlug = getProductSlug(product.id);
  const productUrl = `/shop/${productSlug}`;

  return (
    <div className="group relative flex flex-col bg-[#ffffff] border border-[#e5e2e1] hover:border-[#111111] transition-colors duration-300">
      {/* Product Image Frame */}
      <div className="relative w-full aspect-[4/3] bg-[#f5f4f0] overflow-hidden">
        <Link href={productUrl} className="block w-full h-full relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Tag / Badge */}
        {product.tag && (
          <div
            className={`absolute top-2.5 left-2.5 font-mono text-[9px] sm:text-[10px] tracking-wider px-2 py-0.5 uppercase z-10 pointer-events-none ${
              product.badgeStyle === "light"
                ? "bg-[#faf9f5]/95 text-[#111111] border border-[#e5e2e1]"
                : "bg-[#111111] text-[#ffffff]"
            }`}
          >
            {product.tag}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          aria-label={`Save ${product.name} to Wishlist`}
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 w-8 h-8 bg-[#faf9f5]/90 backdrop-blur-sm flex items-center justify-center transition-colors z-10 ${
            activeWishlistState
              ? "text-[#ba1a1a]"
              : "text-[#111111] hover:bg-[#ffffff]"
          }`}
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{
              fontVariationSettings: activeWishlistState ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            favorite
          </span>
        </button>

        {/* Quick Add overlay button on desktop hover */}
        <div className="absolute inset-x-2 bottom-2 hidden lg:flex opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            type="button"
            onClick={handleQuickAddClick}
            className="w-full py-2.5 bg-[#111111] text-[#ffffff] font-mono text-[11px] uppercase tracking-widest hover:bg-[#2a2a2a] transition-colors active:bg-[#000000]"
          >
            {addedNotice ? "Added to Bag ✓" : "Quick Add to Bag"}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-[#ffffff]">
        <div>
          {/* Metadata Row: subcategory / color swatches */}
          <div className="flex items-center justify-between text-[#747878] font-mono text-[11px] mb-1 gap-2">
            <span className="truncate">{product.subCategory || product.category}</span>
            {product.colors && product.colors.length > 0 && (
              <div
                className="flex items-center gap-1.5 flex-shrink-0"
                title={`Available in ${product.colors.length} colorways`}
              >
                {product.colors.map((color, idx) => (
                  <span
                    key={idx}
                    className={`w-2.5 h-2.5 ${
                      color.border ? "border border-[#c4c7c7]" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            )}
          </div>

          <Link href={productUrl}>
            <h3 className="text-[14px] sm:text-[15px] font-medium text-[#111111] tracking-tight hover:underline underline-offset-2">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Feature */}
        <div className="mt-3 pt-2 border-t border-[#f5f4f0] flex items-center justify-between">
          <span className="font-mono text-[14px] sm:text-[15px] font-semibold text-[#111111]">
            {product.formattedPrice}
          </span>
          {product.featureNote ? (
            <span className="font-mono text-[10px] text-[#615e58] uppercase tracking-widest hidden sm:inline">
              {product.featureNote}
            </span>
          ) : (
            <Link
              href={productUrl}
              aria-label={`View details of ${product.name}`}
              className="text-[#615e58] hover:text-[#111111] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">
                arrow_outward
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
