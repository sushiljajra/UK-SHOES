import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/Button";

interface HeroProps {
  onShopClick?: () => void;
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  onExploreClick,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#f5f4f0] pt-24 sm:pt-28">
      <div className="relative w-full min-h-[580px] sm:min-h-[680px] lg:min-h-[820px] flex items-end">
        {/* Full Bleed Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvmVu23KMExfOL6Ys5biyR3CpNxn7KQIRZrhFRUJ6UksSv9IpbckT9Pa9nA6Z3i1EfgwCBnwaCM6X9y2XGM5_v28soDbcMbpr1o-jX0it9eLPjkIjaSpN-dBbPVqnHePa5T0BEKNlQ46Sj6IAJu2g45SBMmaasc3SS47E88H_DgneMV1DAjC8YTRuGNpCJMoB1PrlF_nasGC2P_0I_AMnCucFqmk3GGp5l0zrFpHGjVBKjuhTuWaoClA"
            alt="Cinematic editorial footwear hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter saturate-[0.92] contrast-[1.05]"
          />
          {/* Editorial Scrim Gradation */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f5] via-[#faf9f5]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-[#000000]/10 mix-blend-multiply"></div>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-24 pt-20">
          <div className="max-w-3xl space-y-6">
            {/* Seasonal Badge */}
            <div className="inline-flex items-center gap-2 bg-[#faf9f5]/90 backdrop-blur-sm px-3 py-1.5 border border-[#e5e2e1] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#000000] animate-pulse"></span>
              <span className="font-mono text-[11px] tracking-[0.22em] text-[#000000] font-semibold uppercase">
                EDITION 04 / AUTUMN WINTER
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#000000] leading-[1.05] uppercase">
              Step Into <br className="hidden sm:inline" />
              <span className="font-light italic">Something</span> New
            </h1>

            {/* Subtitle */}
            <p className="text-[16px] sm:text-[18px] text-[#444748] max-w-xl font-normal leading-relaxed">
              Discover footwear designed for every step, every day. Precision
              engineering calibrated with refined Scandinavian silhouettes.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-md sm:max-w-none">
              <Link href="/shop">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onShopClick}
                  className="w-full sm:w-auto"
                >
                  Shop Collection
                </Button>
              </Link>
              <a href="#categories">
                <Button
                  variant="inverted"
                  size="lg"
                  onClick={onExploreClick}
                  className="w-full sm:w-auto"
                >
                  Explore Categories
                </Button>
              </a>
            </div>
          </div>

          {/* Metric Accent Strip */}
          <div className="mt-14 sm:mt-18 pt-6 border-t border-[#c4c7c7]/50 grid grid-cols-2 md:grid-cols-4 gap-6 text-[#1b1c1a]">
            <div>
              <span className="block font-mono text-[11px] text-[#747878] uppercase tracking-wider mb-1">
                Origin
              </span>
              <span className="text-[14px] sm:text-[15px] font-medium text-[#111111]">
                London Design Studio
              </span>
            </div>
            <div>
              <span className="block font-mono text-[11px] text-[#747878] uppercase tracking-wider mb-1">
                Cushioning
              </span>
              <span className="text-[14px] sm:text-[15px] font-medium text-[#111111]">
                Kinetic EVA Core
              </span>
            </div>
            <div className="hidden md:block">
              <span className="block font-mono text-[11px] text-[#747878] uppercase tracking-wider mb-1">
                Batch Size
              </span>
              <span className="text-[14px] sm:text-[15px] font-medium text-[#111111]">
                Limited 500 Pairs / Drop
              </span>
            </div>
            <div className="hidden md:block">
              <span className="block font-mono text-[11px] text-[#747878] uppercase tracking-wider mb-1">
                Dispatch
              </span>
              <span className="text-[14px] sm:text-[15px] font-medium text-[#111111]">
                Complimentary Across IN
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
