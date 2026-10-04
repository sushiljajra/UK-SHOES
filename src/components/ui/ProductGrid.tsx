import React from "react";
import { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  onQuickAdd?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistedIds?: string[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 4,
  onQuickAdd,
  onToggleWishlist,
  wishlistedIds = [],
}) => {
  const colStyles = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${colStyles[columns]} gap-4 sm:gap-6`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickAdd={onQuickAdd}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlistedIds.includes(product.id)}
        />
      ))}
    </div>
  );
};
