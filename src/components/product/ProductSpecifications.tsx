import React from "react";
import { Product } from "@/data/products";

interface ProductSpecificationsProps {
  product: Product;
}

export const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
  product,
}) => {
  return (
    <div className="w-full mt-16 sm:mt-24 pt-12 border-t border-[#e5e2e1]">
      <div className="max-w-4xl">
        <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-[#615e58] uppercase block mb-2">
          PRODUCT DOSSIER
        </span>
        <h2 className="text-2xl sm:text-3xl font-normal text-[#000000] uppercase tracking-tight mb-8 font-mono">
          Specifications &amp; Craft Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 font-mono text-[12px]">
          {/* Item 1 */}
          <div className="flex items-center justify-between py-3 border-b border-[#e5e2e1]">
            <span className="text-[#615e58] uppercase">Silhoutte Category</span>
            <span className="font-medium text-[#000000]">{product.category}</span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between py-3 border-b border-[#e5e2e1]">
            <span className="text-[#615e58] uppercase">Archetype / Subcategory</span>
            <span className="font-medium text-[#000000]">
              {product.subCategory || "Footwear Essential"}
            </span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between py-3 border-b border-[#e5e2e1]">
            <span className="text-[#615e58] uppercase">Available UK Sizes</span>
            <span className="font-medium text-[#000000]">
              {product.availableSizes?.join(", ") || "Standard"}
            </span>
          </div>

          {/* Item 4 */}
          <div className="flex items-center justify-between py-3 border-b border-[#e5e2e1]">
            <span className="text-[#615e58] uppercase">Colorways</span>
            <span className="font-medium text-[#000000]">
              {product.colors?.map((c) => c.name).join(", ") || "Standard"}
            </span>
          </div>

          {/* Item 5 */}
          {product.featureNote && (
            <div className="flex items-center justify-between py-3 border-b border-[#e5e2e1]">
              <span className="text-[#615e58] uppercase">Distinguishing Feature</span>
              <span className="font-medium text-[#000000]">
                {product.featureNote}
              </span>
            </div>
          )}

          {/* Item 6 */}
          {product.tag && (
            <div className="flex items-center justify-between py-3 border-b border-[#e5e2e1]">
              <span className="text-[#615e58] uppercase">Collection Status</span>
              <span className="font-medium text-[#000000]">{product.tag}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
