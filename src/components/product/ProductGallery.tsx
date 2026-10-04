"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeImage = images[selectedIndex] || images[0];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 w-full">
      {/* Thumbnails list (vertical on desktop, horizontal on mobile/tablet) */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto scrollbar-none py-1 lg:py-0 shrink-0">
          {images.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`View image ${idx + 1} of ${productName}`}
                className={`relative w-18 h-18 sm:w-20 sm:h-20 bg-[#f5f4f0] border transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "border-[#000000] ring-1 ring-[#000000]"
                    : "border-[#e5e2e1] hover:border-[#615e58]"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Hero Showcase Image */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[5/4] bg-[#f5f4f0] border border-[#e5e2e1] overflow-hidden flex-1">
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center transition-all duration-300"
        />
      </div>
    </div>
  );
};
