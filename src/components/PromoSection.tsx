import React from "react";
import Link from "next/link";
import { Button } from "./ui/Button";

interface PromoSectionProps {
  onShopNowClick?: () => void;
}

export const PromoSection: React.FC<PromoSectionProps> = ({
  onShopNowClick,
}) => {
  return (
    <section className="w-full py-16 sm:py-24 lg:py-28 bg-[#faf9f5]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Callout Minimal Banner */}
        <div className="relative w-full bg-[#efeeea] border border-[#e5e2e1] p-8 sm:p-14 lg:p-20 text-center overflow-hidden mb-16 sm:mb-20">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#615e58] uppercase block font-semibold">
              ATELIER APPOINTMENT &amp; ARCHIVES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] uppercase tracking-tight text-[#000000] leading-tight font-normal">
              Your Next Pair Is Here
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[#615e58] max-w-lg mx-auto leading-relaxed">
              Discover styles made to move with you. Crafted with deliberate focus
              on longevity, silhouette, and tactile comfort.
            </p>
            <div className="pt-4">
              <Link href="/shop">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onShopNowClick}
                  className="px-10"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Clean Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1 */}
          <div className="flex flex-col items-start p-6 sm:p-8 bg-[#f5f4f0] border border-[#e5e2e1] space-y-3">
            <div className="w-12 h-12 flex items-center justify-center bg-[#faf9f5] border border-[#e5e2e1] text-[#000000] mb-2">
              <span className="material-symbols-outlined text-[24px]">
                local_shipping
              </span>
            </div>
            <h3 className="text-[18px] sm:text-[20px] text-[#000000] font-medium tracking-tight">
              Complimentary Shipping
            </h3>
            <p className="text-[14px] text-[#615e58] leading-relaxed">
              On all domestic orders over ₹4,999. Fully carbon-neutral dispatch
              via express courier with real-time route tracing.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col items-start p-6 sm:p-8 bg-[#f5f4f0] border border-[#e5e2e1] space-y-3">
            <div className="w-12 h-12 flex items-center justify-center bg-[#faf9f5] border border-[#e5e2e1] text-[#000000] mb-2">
              <span className="material-symbols-outlined text-[24px]">
                cached
              </span>
            </div>
            <h3 className="text-[18px] sm:text-[20px] text-[#000000] font-medium tracking-tight">
              30-Day Wear Trial
            </h3>
            <p className="text-[14px] text-[#615e58] leading-relaxed">
              Test them in everyday life. If the fit, feel, or stride is anything
              less than immaculate, enjoy hassle-free exchanges.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col items-start p-6 sm:p-8 bg-[#f5f4f0] border border-[#e5e2e1] space-y-3">
            <div className="w-12 h-12 flex items-center justify-center bg-[#faf9f5] border border-[#e5e2e1] text-[#000000] mb-2">
              <span className="material-symbols-outlined text-[24px]">
                workspace_premium
              </span>
            </div>
            <h3 className="text-[18px] sm:text-[20px] text-[#000000] font-medium tracking-tight">
              Artisanal Longevity
            </h3>
            <p className="text-[14px] text-[#615e58] leading-relaxed">
              Full-grain hides, reinforced welt lines, and replaceable outsoles
              designed intentionally to age with enduring character.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
