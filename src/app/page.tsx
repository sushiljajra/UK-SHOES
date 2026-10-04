"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialSection } from "@/components/EditorialSection";
import { PromoSection } from "@/components/PromoSection";
import { Footer } from "@/components/Footer";
import {
  CATEGORIES_DATA,
  PRODUCTS_DATA,
} from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { showToast } = useCart();

  // Filter products for the homepage sections
  const newArrivals = PRODUCTS_DATA.filter((p) => p.isNewArrival).slice(0, 4);
  const bestSellers = PRODUCTS_DATA.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f5] text-[#1b1c1a] antialiased">
      {/* 1. HEADER */}
      <Header />

      <main className="w-full flex-grow">
        {/* 2. HERO SECTION */}
        <Hero
          onShopClick={() => {
            const el = document.getElementById("new-arrivals");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          onExploreClick={() => {
            const el = document.getElementById("categories");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 3. SHOP BY CATEGORY SECTION */}
        <section
          id="categories"
          className="w-full py-16 sm:py-24 lg:py-28 bg-[#faf9f5]"
        >
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <SectionHeading
              eyebrow="Curated Silhouettes"
              title="Shop By Category"
              description="Each archetype tuned for specific foot mechanics and daily context."
              align="split"
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {CATEGORIES_DATA.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. NEW ARRIVALS SECTION */}
        <section
          id="new-arrivals"
          className="w-full py-16 sm:py-24 bg-[#f5f4f0] border-t border-b border-[#e5e2e1]/80"
        >
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <SectionHeading
              eyebrow="Autumn / Winter 2025"
              title="New Arrivals"
              description="Engineered in limited seasonal batches"
              actionText="View All (24)"
              actionHref="#new-arrivals"
              onActionClick={() =>
                showToast("Showing all 24 new arrivals (Demo catalog)")
              }
            />

            <ProductGrid
              products={newArrivals}
              columns={4}
            />
          </div>
        </section>

        {/* 5. EDITORIAL COLLECTION SECTION */}
        <EditorialSection
          onExploreClick={() => {
            const el = document.getElementById("bestsellers");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 6. BEST SELLERS SECTION */}
        <section
          id="bestsellers"
          className="w-full py-16 sm:py-24 bg-[#f5f4f0] border-b border-[#e5e2e1]/80"
        >
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
              <div>
                <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-[#615e58] uppercase block mb-2">
                  TIMELESS REQUISITES
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#000000] uppercase leading-tight">
                  Best Sellers
                </h2>
                <p className="text-[14px] sm:text-[15px] text-[#615e58] mt-1.5">
                  Our most coveted silhouettes, back in stock.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#000000]"></span>
                <span className="font-mono text-[11px] text-[#000000] uppercase tracking-wider font-semibold">
                  Fast Restock Available
                </span>
              </div>
            </div>

            <ProductGrid
              products={bestSellers}
              columns={4}
            />
          </div>
        </section>

        {/* 7. PROMOTIONAL / VALUES SECTION */}
        <PromoSection
          onShopNowClick={() => {
            const el = document.getElementById("categories");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </main>

      {/* 8. FOOTER */}
      <Footer />
    </div>
  );
}
