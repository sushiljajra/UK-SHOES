import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryItem } from "@/data/products";

interface CategoryCardProps {
  category: CategoryItem;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  // Map category slug to proper filter query param on /shop
  const categoryParamMap: Record<string, string> = {
    sneakers: "Sneakers",
    sports: "Sports",
    casual: "Casual",
    formal: "Formal",
  };
  const targetCategory = categoryParamMap[category.slug] || category.title;
  const shopUrl = `/shop?category=${encodeURIComponent(targetCategory)}`;

  return (
    <Link
      href={shopUrl}
      className="group flex flex-col bg-[#f5f4f0] border border-[#e5e2e1] hover:border-[#111111] transition-all duration-300"
    >
      {/* Category Image Box */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#efeeea]">
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-3 left-3 bg-[#faf9f5]/90 backdrop-blur-sm px-2.5 py-1 border border-[#e5e2e1]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#111111] font-semibold">
            {category.code}
          </span>
        </div>
      </div>

      {/* Category Description & CTA */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#f5f4f0]">
        <div>
          <h3 className="text-[17px] sm:text-[19px] font-medium text-[#111111] tracking-tight mb-1">
            {category.title}
          </h3>
          <p className="text-[13px] text-[#615e58] line-clamp-1">
            {category.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#e5e2e1]/60 flex items-center justify-between text-[#111111] font-mono text-[11px] font-semibold tracking-widest uppercase group-hover:translate-x-1 transition-transform">
          <span>{category.ctaText}</span>
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </div>
      </div>
    </Link>
  );
};
