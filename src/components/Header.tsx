"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  cartCount?: number;
  wishlistCount?: number;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount: propCartCount,
  wishlistCount: propWishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const cartContext = useCart();

  // If prop is explicitly passed, honor it, otherwise use context
  const activeCartCount = propCartCount !== undefined ? propCartCount : cartContext.cartCount;
  const activeWishlistCount = propWishlistCount !== undefined ? propWishlistCount : cartContext.wishlistCount;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const navLinks = [
    { label: "SHOP ALL", href: "/shop" },
    { label: "SNEAKERS", href: "/shop?category=Sneakers" },
    { label: "SPORTS", href: "/shop?category=Sports" },
    { label: "CASUAL", href: "/shop?category=Casual" },
    { label: "FORMAL", href: "/shop?category=Formal" },
    { label: "NEW ARRIVALS", href: "/shop?category=All&sort=featured" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchActive(false);
      setMobileMenuOpen(false);
    }
  };

  const handleWishlistClick = () => {
    if (onOpenWishlist) {
      onOpenWishlist();
    } else {
      cartContext.showToast(`Wishlist (${activeWishlistCount} items): Saved items`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f5]/95 backdrop-blur-md border-b border-[#e5e2e1]/80">
      {/* Top Announcement Bar */}
      <div className="bg-[#000000] text-[#ffffff] py-1.5 px-4 sm:px-6 lg:px-12 border-b border-[#000000]">
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-widest uppercase">
          {/* Left Region Info */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-[#e3e2df]/80">REGION: IN (₹)</span>
            <span className="h-2.5 w-px bg-[#e3e2df]/30"></span>
            <span>STANDARD DISPATCH: 24-48 HRS</span>
          </div>

          {/* Center Promo Message */}
          <div className="w-full md:w-auto text-center mx-auto md:mx-0 flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[13px] leading-none">
              local_shipping
            </span>
            <span>Complimentary standard shipping on orders over ₹4,999</span>
            <span className="mx-2 text-[#e3e2df]/40 hidden sm:inline">|</span>
            <span className="hidden sm:inline">30-Day Wear Trial</span>
          </div>

          {/* Right Links */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#assistance"
              className="hover:text-[#e3e2df] transition-colors"
            >
              CLIENT CARE
            </a>
            <a
              href="#assistance"
              className="hover:text-[#e3e2df] transition-colors"
            >
              TRACK ORDER
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-18 sm:h-20 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none"
          >
            <span className="text-[20px] sm:text-[22px] font-bold tracking-[0.18em] text-[#000000] uppercase font-mono">
              UK SHOES
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#615e58] uppercase hidden sm:inline-block border-l border-[#c4c7c7] pl-2.5">
              ATELIER
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
          {navLinks.map((link) => {
            const isCurrentPage =
              link.href === "/shop" && pathname === "/shop";

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-mono text-[11px] uppercase tracking-wider transition-colors py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[#000000] after:transition-all ${
                  isCurrentPage
                    ? "text-[#000000] font-semibold after:w-full"
                    : "text-[#444748] hover:text-[#000000] after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Search, Wishlist, Cart/Bag, Account, Mobile Menu */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Inline Search Bar on Desktop if toggled, or button */}
          {isSearchActive ? (
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH FOOTWEAR..."
                autoFocus
                className="w-48 sm:w-64 bg-[#f5f4f0] border border-[#000000] px-3 py-1 font-mono text-[11px] tracking-wider uppercase text-[#1b1c1a] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchActive(false)}
                className="ml-1 p-1 text-[#615e58] hover:text-[#000000]"
                aria-label="Close search"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsSearchActive(true);
                if (onOpenSearch) onOpenSearch();
              }}
              aria-label="Search Footwear Catalog"
              className="flex items-center gap-1.5 text-[#1b1c1a] hover:text-[#000000] transition-colors p-2"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
              <span className="hidden xl:inline font-mono text-[11px] tracking-widest text-[#444748]">
                SEARCH
              </span>
            </button>
          )}

          {/* Wishlist Link / Trigger */}
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label="Wishlist"
            className="relative p-2 text-[#1b1c1a] hover:text-[#000000] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            {activeWishlistCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-[#000000] text-[#ffffff] font-mono text-[9px] flex items-center justify-center leading-none">
                {activeWishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Link */}
          {onOpenCart ? (
            <button
              type="button"
              onClick={onOpenCart}
              aria-label="Shopping Bag"
              className="relative p-2 text-[#1b1c1a] hover:text-[#000000] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                shopping_bag
              </span>
              {activeCartCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-[#000000] text-[#ffffff] font-mono text-[9px] flex items-center justify-center leading-none">
                  {activeCartCount}
                </span>
              )}
            </button>
          ) : (
            <Link
              href="/bag"
              aria-label="Shopping Bag"
              className={`relative p-2 transition-colors ${
                pathname === "/bag"
                  ? "text-[#000000]"
                  : "text-[#1b1c1a] hover:text-[#000000]"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                shopping_bag
              </span>
              {activeCartCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-[#000000] text-[#ffffff] font-mono text-[9px] flex items-center justify-center leading-none">
                  {activeCartCount}
                </span>
              )}
            </Link>
          )}

          {/* Account Icon */}
          <div className="h-5 w-px bg-[#c4c7c7]/50 hidden sm:block mx-1"></div>
          <button
            type="button"
            aria-label="Account Settings"
            className="hidden sm:flex items-center justify-center w-8 h-8 bg-[#000000] text-[#ffffff] hover:bg-[#2a2a2a] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Navigation Menu"
            className="lg:hidden p-2 text-[#1b1c1a] hover:text-[#000000] focus:outline-none"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf9f5] border-t border-[#e5e2e1] px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          {/* Mobile Search Input */}
          <div className="mb-6">
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-[#f5f4f0] border border-[#c4c7c7] px-3 py-2">
              <span className="material-symbols-outlined text-[18px] text-[#615e58] mr-2">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH UK SHOES..."
                className="w-full bg-transparent font-mono text-[12px] uppercase tracking-wider text-[#1b1c1a] focus:outline-none"
              />
            </form>
          </div>

          {/* Navigation Links List */}
          <nav className="flex flex-col space-y-4 pb-6 border-b border-[#e5e2e1]">
            <Link
              href="/bag"
              onClick={() => setMobileMenuOpen(false)}
              className={`font-mono text-[13px] font-medium uppercase tracking-[0.14em] flex items-center justify-between py-1 ${
                pathname === "/bag"
                  ? "text-[#000000] font-semibold underline underline-offset-4"
                  : "text-[#1b1c1a] hover:text-[#615e58]"
              }`}
            >
              <span>SHOPPING BAG ({activeCartCount})</span>
              <span className="material-symbols-outlined text-[16px] text-[#747878]">
                shopping_bag
              </span>
            </Link>

            {navLinks.map((link) => {
              const isCurrentPage =
                link.href === "/shop" && pathname === "/shop";

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-mono text-[13px] font-medium uppercase tracking-[0.14em] flex items-center justify-between py-1 ${
                    isCurrentPage
                      ? "text-[#000000] font-semibold underline underline-offset-4"
                      : "text-[#1b1c1a] hover:text-[#615e58]"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="material-symbols-outlined text-[16px] text-[#747878]">
                    chevron_right
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Footer Links */}
          <div className="pt-6 space-y-3 font-mono text-[11px] text-[#615e58] uppercase tracking-wider">
            <div className="flex items-center justify-between">
              <span>Currency / Region</span>
              <span className="text-[#1b1c1a] font-medium">India (INR ₹)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Client Concierge</span>
              <a href="#assistance" className="text-[#1b1c1a] underline">
                Support
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
