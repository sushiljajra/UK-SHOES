import React from "react";
import Link from "next/link";
import { Product } from "@/data/products";

interface BreadcrumbProps {
  product: Product;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ product }) => {
  return (
    <nav
      aria-label="Breadcrumb navigation"
      className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#615e58] mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap scrollbar-none py-1"
    >
      <Link href="/" className="hover:text-[#000000] transition-colors">
        Home
      </Link>
      <span className="text-[#c4c7c7]">/</span>
      <Link href="/shop" className="hover:text-[#000000] transition-colors">
        Shop
      </Link>
      <span className="text-[#c4c7c7]">/</span>
      <Link
        href={`/shop?category=${encodeURIComponent(product.category)}`}
        className="hover:text-[#000000] transition-colors"
      >
        {product.category}
      </Link>
      <span className="text-[#c4c7c7]">/</span>
      <span className="text-[#000000] font-medium truncate max-w-[200px] sm:max-w-none">
        {product.name}
      </span>
    </nav>
  );
};
