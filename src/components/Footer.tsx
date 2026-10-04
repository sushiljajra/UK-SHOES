"use client";

import React, { useState } from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#f5f4f0] border-t border-[#e5e2e1]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 pb-12">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 lg:gap-x-12">
          {/* Brand Info & Newsletter (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between pr-0 lg:pr-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Link href="/" className="font-mono text-[22px] tracking-[0.2em] font-bold text-[#000000] uppercase">
                  UK SHOES
                </Link>
              </div>
              <p className="text-[14px] text-[#615e58] leading-relaxed max-w-sm">
                Modern footwear engineered with timeless craftsmanship and
                minimalist silhouettes for everyday motion and intentional
                living.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-8 space-y-3">
              <span className="font-mono text-[11px] tracking-widest text-[#000000] font-semibold uppercase block">
                Seasonal Drops &amp; Atelier Dispatch
              </span>

              {subscribed ? (
                <div className="bg-[#ffffff] border border-[#000000] p-3 text-center">
                  <p className="font-mono text-[11px] text-[#000000] uppercase tracking-wider font-semibold">
                    Thank you for subscribing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex items-center max-w-md">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER YOUR EMAIL ADDRESS"
                      required
                      className="w-full bg-[#ffffff] border border-[#c4c7c7] px-3.5 py-2.5 font-mono text-[11px] text-[#1b1c1a] placeholder:text-[#747878] focus:outline-none focus:border-[#000000] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#000000] text-[#ffffff] px-6 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-widest hover:bg-[#2a2a2a] transition-colors flex-shrink-0 border border-[#000000]"
                  >
                    JOIN
                  </button>
                </form>
              )}

              <p className="font-mono text-[11px] text-[#747878]">
                Direct dispatch. Strictly curated. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Column 1: Collections (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[#000000] uppercase block border-b border-[#e5e2e1] pb-2">
              COLLECTIONS
            </span>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link href="/shop" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Sneakers" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Sneakers
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Sports" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Athletic &amp; Running
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Casual" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Daily Casuals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Formal" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Modern Formal
                </Link>
              </li>
              <li>
                <Link href="/shop?sort=featured" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Atelier Archives
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Assistance & Concierge (3 cols) */}
          <div className="lg:col-span-3 space-y-4" id="assistance">
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[#000000] uppercase block border-b border-[#e5e2e1] pb-2">
              ASSISTANCE &amp; CONCIERGE
            </span>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a href="#assistance" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Contact Atelier Support
                </a>
              </li>
              <li>
                <a href="#assistance" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Shipping &amp; Express Logistics
                </a>
              </li>
              <li>
                <a href="#assistance" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Returns &amp; 30-Day Exchange
                </a>
              </li>
              <li>
                <a href="#assistance" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Anatomical Size Matrix
                </a>
              </li>
              <li>
                <a href="#assistance" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Order Tracking &amp; Status
                </a>
              </li>
              <li>
                <a href="#assistance" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Purpose (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[#000000] uppercase block border-b border-[#e5e2e1] pb-2">
              COMPANY &amp; PURPOSE
            </span>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a href="#" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  About UK Shoes Atelier
                </a>
              </li>
              <li>
                <a href="#" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Flagship &amp; Retail Stores
                </a>
              </li>
              <li>
                <a href="#" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Material Circularity
                </a>
              </li>
              <li>
                <a href="#" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Careers &amp; Apprenticeships
                </a>
              </li>
              <li>
                <a href="#" className="text-[#615e58] hover:text-[#000000] transition-colors">
                  Press &amp; Editorial Inquiries
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="mt-16 pt-8 border-t border-[#e5e2e1] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#615e58]">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-[#000000] font-semibold">
              © 2025 UK SHOES Retail Ltd.
            </span>
            <span>All rights reserved.</span>
            <div className="hidden sm:flex items-center gap-3">
              <a href="#" className="hover:text-[#000000] transition-colors">
                Privacy Policy
              </a>
              <span className="text-[#c4c7c7]">•</span>
              <a href="#" className="hover:text-[#000000] transition-colors">
                Terms of Service
              </a>
              <span className="text-[#c4c7c7]">•</span>
              <a href="#" className="hover:text-[#000000] transition-colors">
                Accessibility
              </a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#000000] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#000000] transition-colors"
              >
                X / Twitter
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#000000] transition-colors"
              >
                Pinterest
              </a>
            </div>

            <div className="flex items-center gap-1 border-l border-[#c4c7c7] pl-4 text-[#000000] font-medium">
              <span className="material-symbols-outlined text-[15px]">
                language
              </span>
              <span>IN (₹)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
