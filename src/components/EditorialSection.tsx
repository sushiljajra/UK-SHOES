import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/Button";

interface EditorialSectionProps {
  onExploreClick?: () => void;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({
  onExploreClick,
}) => {
  return (
    <section className="w-full bg-[#faf9f5] py-16 sm:py-24 lg:py-32 border-t border-b border-[#e5e2e1]/70">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Visual Column (Asymmetric 7 cols on desktop) */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#efeeea] border border-[#e5e2e1]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDbhCm6FmfwFPIMMxgU4CzfiEvOtgDBfwo0bmaQmlIV8uZxctGUWGICogyPurimH4CXFDa4l8_CNIWyA0cCWS6em7CTjgAJCxUDsYvpGYwlFBS88vDCyYU3FzRwNSTEI25wXUFcJ5Fe6if3ZvtrbpYfJkBV7T20t3aFQ-Xh2DTC150LPU2-6wN5hXTLat_BoF3r_L83m_-9D2bv2cNh4tiVgiBTjOLC3PyfzhiQ1Gu4ZswKMzNw-Bgew"
                alt="Editorial footwear campaign banner for MADE FOR EVERYDAY"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center filter contrast-[1.04]"
              />
              <div className="absolute bottom-4 left-4 bg-[#faf9f5]/90 backdrop-blur-sm px-4 py-2 hidden sm:block border border-[#e5e2e1]">
                <p className="font-mono text-[11px] text-[#111111] tracking-widest uppercase font-semibold">
                  FIELD TEST NO. 082 — BRUTALIST WALK
                </p>
              </div>
            </div>

            {/* Overlapping badge element */}
            <div className="hidden md:flex flex-col absolute -bottom-6 -right-6 bg-[#000000] text-[#ffffff] p-6 max-w-xs border border-[#000000] shadow-xl">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#e3e2df] mb-1 font-semibold">
                CRAFTSMANSHIP
              </span>
              <p className="text-[13px] text-[#ffffff]/90 leading-snug">
                Double-stitched upper bindings with high-density Italian thread and reinforced heel counter.
              </p>
            </div>
          </div>

          {/* Narrative Column (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-4">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-[#615e58] uppercase font-semibold">
              <span className="w-8 h-px bg-[#615e58]"></span>
              <span>EDITORIAL DOSSIER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] leading-[1.08] uppercase tracking-tight text-[#000000] font-normal">
              Made For Everyday
            </h2>

            <p className="text-[15px] sm:text-[17px] text-[#615e58] leading-relaxed font-normal">
              Comfort, style and confidence — wherever the day takes you. Designed
              in London and crafted with sustainable Italian calfskin and
              shock-absorbing ergonomic midsoles.
            </p>

            {/* Key Craft Pillars */}
            <div className="space-y-4 pt-2 pb-2">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#000000] mt-0.5">
                  verified
                </span>
                <div>
                  <h4 className="text-[15px] font-semibold text-[#000000]">
                    Vibram® Sole Technology
                  </h4>
                  <p className="text-[13px] text-[#615e58]">
                    Custom compound formulation delivering 40% enhanced traction
                    on wet urban slate.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#000000] mt-0.5">
                  straighten
                </span>
                <div>
                  <h4 className="text-[15px] font-semibold text-[#000000]">
                    Handcrafted Welted Seams
                  </h4>
                  <p className="text-[13px] text-[#615e58]">
                    Artisanal welt construction providing lifelong durability and
                    effortless resoling.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#000000] mt-0.5">
                  footprint
                </span>
                <div>
                  <h4 className="text-[15px] font-semibold text-[#000000]">
                    Zero Break-in Period
                  </h4>
                  <p className="text-[13px] text-[#615e58]">
                    Supple full-grain leather lining molds to anatomical arches
                    from hour one.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/shop">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onExploreClick}
                  className="w-full sm:w-auto"
                >
                  Explore The Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
