"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { Button } from "@/components/ui/Button";
import { PRODUCTS_DATA } from "@/data/products";

// Category options
const CATEGORIES = [
  "All",
  "Sneakers",
  "Sports",
  "Casual",
  "Formal",
] as const;

type CategoryType = (typeof CATEGORIES)[number];

// Price brackets
const PRICE_RANGES = [
  { id: "all", label: "All Prices", min: 0, max: Infinity },
  { id: "under-3500", label: "Under ₹3,500", min: 0, max: 3500 },
  { id: "3500-5000", label: "₹3,500 – ₹5,000", min: 3500, max: 5000 },
  { id: "above-5000", label: "Over ₹5,000", min: 5000, max: Infinity },
];

// Available shoe sizes
const SIZES = [6, 7, 8, 9, 10, 11, 12];

// Sorting options
type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category");
  const initialSearchParam = searchParams.get("search") || "";
  const initialSortParam = (searchParams.get("sort") as SortOption) || "featured";

  // Filter States
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryType>(() => {
    if (initialCategoryParam && CATEGORIES.includes(initialCategoryParam as CategoryType)) {
      return initialCategoryParam as CategoryType;
    }
    return "All";
  });

  const [searchQuery, setSearchQuery] = React.useState(initialSearchParam);
  const [selectedPriceRange, setSelectedPriceRange] = React.useState("all");
  const [selectedSizes, setSelectedSizes] = React.useState<number[]>([]);
  const [sortBy, setSortBy] = React.useState<SortOption>(initialSortParam);
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

  const toggleSize = (size: number) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSelectedPriceRange("all");
    setSelectedSizes([]);
    setSortBy("featured");
  };

  const isFiltered =
    selectedCategory !== "All" ||
    searchQuery.trim() !== "" ||
    selectedPriceRange !== "all" ||
    selectedSizes.length > 0 ||
    sortBy !== "featured";

  // Filter & Search Logic
  const filteredProducts = React.useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // 1. Category Filter
      if (selectedCategory !== "All") {
        if (product.category !== selectedCategory) {
          return false;
        }
      }

      // 2. Search Query (Name, Category, Description, Tag)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesSub = product.subCategory?.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTag = product.tag?.toLowerCase().includes(query);

        if (
          !matchesName &&
          !matchesCategory &&
          !matchesSub &&
          !matchesDesc &&
          !matchesTag
        ) {
          return false;
        }
      }

      // 3. Price Filter
      const activePriceBracket = PRICE_RANGES.find(
        (r) => r.id === selectedPriceRange
      );
      if (activePriceBracket) {
        if (
          product.price < activePriceBracket.min ||
          product.price > activePriceBracket.max
        ) {
          return false;
        }
      }

      // 4. Size Filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize = selectedSizes.some((size) =>
          product.availableSizes.includes(size)
        );
        if (!hasMatchingSize) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // 5. Sorting
      if (sortBy === "price-asc") {
        return a.price - b.price;
      }
      if (sortBy === "price-desc") {
        return b.price - a.price;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      // "featured" default order (bestsellers/new arrivals first, then id)
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, selectedPriceRange, selectedSizes, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f5] text-[#1b1c1a] antialiased">
      {/* Reused Header connected to shared CartContext */}
      <Header />

      <main className="w-full flex-grow pt-28 sm:pt-32 pb-24">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* 1. EDITORIAL PAGE INTRODUCTION */}
          <div className="mb-10 sm:mb-12 border-b border-[#e5e2e1] pb-8">
            <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-[#615e58] uppercase block mb-2">
              THE COLLECTION
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#000000] uppercase leading-tight">
                  Find Your Next Pair
                </h1>
                <p className="text-[15px] sm:text-[17px] text-[#615e58] mt-2 max-w-xl font-normal leading-relaxed">
                  Explore footwear designed for everyday movement, performance,
                  and modern minimalist style.
                </p>
              </div>

              {/* Dynamic Result Count */}
              <div className="font-mono text-[12px] font-semibold tracking-widest text-[#000000] uppercase bg-[#f5f4f0] px-3.5 py-1.5 border border-[#e5e2e1] self-start md:self-end">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "PRODUCT" : "PRODUCTS"}
              </div>
            </div>
          </div>

          {/* 2. CATEGORY TABS NAVIGATION */}
          <div className="mb-8 border-b border-[#e5e2e1]">
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-3 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-mono text-[11px] sm:text-[12px] uppercase tracking-wider px-3.5 py-2 transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-[#000000] text-[#ffffff] font-semibold border border-[#000000]"
                        : "bg-[#ffffff] text-[#615e58] hover:text-[#000000] border border-[#e5e2e1] hover:border-[#111111]"
                    }`}
                  >
                    {cat === "All"
                      ? "All Silhouettes"
                      : cat === "Sports"
                      ? "Sports & Performance"
                      : cat === "Casual"
                      ? "Casual Everyday"
                      : cat === "Formal"
                      ? "Formal & Dress"
                      : cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. TOOLBAR: Search, Filter Toggle (Mobile), Sort & Active Pill Counters */}
          <div className="bg-[#f5f4f0] border border-[#e5e2e1] p-4 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search Control */}
              <div className="relative flex-1 max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#747878]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH BY NAME, STYLE, CUSHIONING..."
                  className="w-full bg-[#ffffff] border border-[#c4c7c7] pl-9 pr-8 py-2 font-mono text-[11px] uppercase tracking-wider text-[#1b1c1a] placeholder:text-[#747878] focus:outline-none focus:border-[#000000]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#747878] hover:text-[#000000]"
                    aria-label="Clear search"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                  </button>
                )}
              </div>

              {/* Controls Row: Mobile Filter Toggle, Price, Sizes, Sort */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="lg:hidden flex items-center gap-1.5 bg-[#ffffff] border border-[#000000] px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider text-[#000000]"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    tune
                  </span>
                  <span>Filters</span>
                  {(selectedPriceRange !== "all" || selectedSizes.length > 0) && (
                    <span className="w-2 h-2 bg-[#000000] ml-1"></span>
                  )}
                </button>

                {/* Desktop Inline Price Filter */}
                <div className="hidden lg:flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[#615e58] uppercase tracking-wider">
                    Price:
                  </span>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="bg-[#ffffff] border border-[#c4c7c7] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#1b1c1a] focus:outline-none focus:border-[#000000]"
                  >
                    {PRICE_RANGES.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Desktop Inline Sort Control */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[#615e58] uppercase tracking-wider hidden sm:inline">
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-[#ffffff] border border-[#c4c7c7] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#1b1c1a] focus:outline-none focus:border-[#000000]"
                  >
                    <option value="featured">Featured / Curated</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* Clear Filters Button (If active) */}
                {isFiltered && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="font-mono text-[11px] uppercase tracking-wider text-[#615e58] hover:text-[#000000] underline underline-offset-4 px-2"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Size Filter Strip */}
            <div className="hidden lg:flex items-center gap-3 mt-4 pt-3 border-t border-[#e5e2e1]">
              <span className="font-mono text-[11px] text-[#615e58] uppercase tracking-wider">
                Available Sizes (UK):
              </span>
              <div className="flex items-center gap-1.5">
                {SIZES.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`w-8 h-8 font-mono text-[11px] flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-[#000000] text-[#ffffff] font-semibold border border-[#000000]"
                          : "bg-[#ffffff] text-[#1b1c1a] border border-[#c4c7c7] hover:border-[#000000]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Filter Drawer / Collapsible Box */}
            {mobileFilterOpen && (
              <div className="lg:hidden mt-4 pt-4 border-t border-[#e5e2e1] space-y-4">
                {/* Price Select on Mobile */}
                <div>
                  <label className="font-mono text-[11px] text-[#615e58] uppercase tracking-wider block mb-1.5">
                    Price Range:
                  </label>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="w-full bg-[#ffffff] border border-[#c4c7c7] p-2 font-mono text-[11px] uppercase tracking-wider text-[#1b1c1a]"
                  >
                    {PRICE_RANGES.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Size Grid on Mobile */}
                <div>
                  <label className="font-mono text-[11px] text-[#615e58] uppercase tracking-wider block mb-1.5">
                    Shoe Sizes (UK):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => {
                      const isSelected = selectedSizes.includes(size);
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => toggleSize(size)}
                          className={`w-10 h-10 font-mono text-[12px] flex items-center justify-center ${
                            isSelected
                              ? "bg-[#000000] text-[#ffffff] font-semibold border border-[#000000]"
                              : "bg-[#ffffff] text-[#1b1c1a] border border-[#c4c7c7]"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => setMobileFilterOpen(false)}
                  >
                    Apply Filters ({filteredProducts.length})
                  </Button>
                  {isFiltered && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={clearAllFilters}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 4. PRODUCT GRID OR EMPTY STATE */}
          {filteredProducts.length > 0 ? (
            <ProductGrid
              products={filteredProducts}
              columns={4}
            />
          ) : (
            /* 5. POLISHED EMPTY STATE */
            <div className="bg-[#ffffff] border border-[#e5e2e1] p-12 sm:p-20 text-center max-w-xl mx-auto my-12">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#f5f4f0] border border-[#e5e2e1] text-[#747878]">
                <span className="material-symbols-outlined text-[32px]">
                  search_off
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-[#000000] uppercase tracking-tight mb-2">
                No Products Found
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#615e58] mb-6">
                We couldn&apos;t find any footwear matching your active filters
                or search query.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={clearAllFilters}
                className="px-8"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Reused Footer */}
      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center font-mono text-[12px] uppercase tracking-widest text-[#615e58]">
          Loading Collection...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
