import React from "react";
import { Product, PRODUCTS_DATA } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

interface RelatedProductsProps {
  currentProduct: Product;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProduct,
}) => {
  // 1. Same category items excluding current
  const sameCategory = PRODUCTS_DATA.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id
  );

  // 2. Fallbacks from other categories excluding current
  const otherProducts = PRODUCTS_DATA.filter(
    (p) => p.category !== currentProduct.category && p.id !== currentProduct.id
  );

  // Take 4 related products
  const related = [...sameCategory, ...otherProducts].slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="w-full mt-20 sm:mt-28 pt-16 border-t border-[#e5e2e1]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
        <div>
          <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-[#615e58] uppercase block mb-1">
            CURATED SELECTION
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-[#000000] uppercase tracking-tight font-mono">
            You May Also Like
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};
