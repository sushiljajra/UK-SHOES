"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { useCart, CartItem } from "@/context/CartContext";
import { getProductSlug } from "@/data/products";

export default function BagPage() {
  const { cart, cartCount, updateQuantity, removeFromCart } = useCart();

  // Price calculations (illustrative demo rules)
  // Demo shipping threshold: ₹4,999
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const isFreeShipping = subtotal >= 4999;
  const shippingCharge = subtotal > 0 && !isFreeShipping ? 299 : 0;
  const grandTotal = subtotal + shippingCharge;

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f5] text-[#1b1c1a] antialiased">
      <Header />

      <main className="w-full flex-grow pt-28 sm:pt-32 pb-24">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Bag Heading */}
          <div className="mb-10 sm:mb-12 border-b border-[#e5e2e1] pb-6 sm:pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-[#615e58] uppercase block mb-1">
                YOUR BAG
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#000000] uppercase font-mono leading-tight">
                Your Selection
              </h1>
            </div>

            <div className="font-mono text-[12px] font-semibold tracking-widest text-[#000000] uppercase bg-[#f5f4f0] px-3.5 py-1.5 border border-[#e5e2e1] self-start sm:self-end">
              {cartCount} {cartCount === 1 ? "ITEM" : "ITEMS"}
            </div>
          </div>

          {/* Empty State */}
          {cart.length === 0 ? (
            <div className="bg-[#ffffff] border border-[#e5e2e1] p-12 sm:p-20 text-center max-w-xl mx-auto my-8">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#f5f4f0] border border-[#e5e2e1] text-[#747878]">
                <span className="material-symbols-outlined text-[32px]">
                  shopping_bag
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#615e58] uppercase block mb-1">
                SELECTION EMPTY
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#000000] uppercase tracking-tight mb-2 font-mono">
                Your Bag Is Empty
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#615e58] mb-8 leading-relaxed max-w-sm mx-auto">
                Explore our curated collection of contemporary footwear and add
                styles to your bag.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/shop" className="w-full sm:w-auto">
                  <Button variant="primary" size="md" className="w-full sm:w-auto px-8">
                    Explore The Collection
                  </Button>
                </Link>
                <Link href="/" className="w-full sm:w-auto">
                  <Button variant="secondary" size="md" className="w-full sm:w-auto px-6">
                    Return Home
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* Bag Grid Layout: 2 Columns on Desktop, Stacked on Mobile */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              {/* Left Column: Line Items (8 cols on desktop) */}
              <div className="lg:col-span-8 divide-y divide-[#e5e2e1] border-t border-b border-[#e5e2e1]">
                {cart.map((item: CartItem, index: number) => {
                  const productSlug = getProductSlug(item.product.id);
                  const productUrl = `/shop/${productSlug}`;
                  const lineTotal = item.product.price * item.quantity;

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                      className="py-6 sm:py-8 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start"
                    >
                      {/* Product Thumbnail */}
                      <Link
                        href={productUrl}
                        className="relative w-28 h-28 sm:w-36 sm:h-36 bg-[#f5f4f0] border border-[#e5e2e1] shrink-0 overflow-hidden block group"
                      >
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="144px"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Product Details & Configuration */}
                      <div className="flex flex-col justify-between flex-1 w-full space-y-4">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="font-mono text-[11px] text-[#615e58] uppercase tracking-wider block mb-0.5">
                                {item.product.subCategory || item.product.category}
                              </span>
                              <Link href={productUrl}>
                                <h3 className="text-[17px] sm:text-[19px] font-medium text-[#000000] hover:underline underline-offset-2 tracking-tight">
                                  {item.product.name}
                                </h3>
                              </Link>
                            </div>

                            {/* Line Total on Desktop */}
                            <div className="text-right shrink-0">
                              <span className="font-mono text-[16px] sm:text-[18px] font-semibold text-[#000000] block">
                                ₹{lineTotal.toLocaleString("en-IN")}
                              </span>
                              {item.quantity > 1 && (
                                <span className="font-mono text-[11px] text-[#747878] block">
                                  ₹{item.product.price.toLocaleString("en-IN")} each
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Selected Variant Chips */}
                          <div className="flex flex-wrap items-center gap-3 mt-3 font-mono text-[12px] text-[#1b1c1a]">
                            {item.selectedSize && (
                              <span className="bg-[#f5f4f0] border border-[#e5e2e1] px-2.5 py-1">
                                SIZE: <strong className="font-semibold">UK {item.selectedSize}</strong>
                              </span>
                            )}
                            {item.selectedColor && (
                              <span className="bg-[#f5f4f0] border border-[#e5e2e1] px-2.5 py-1">
                                COLORWAY: <strong className="font-semibold">{item.selectedColor}</strong>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls & Remove Action */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#f5f4f0]">
                          <div className="flex items-center border border-[#e5e2e1] bg-[#ffffff] h-9">
                            <button
                              type="button"
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label={`Decrease quantity for ${item.product.name}`}
                              className="w-8 h-full flex items-center justify-center text-[#1b1c1a] hover:bg-[#f5f4f0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-mono text-[12px] font-semibold text-[#000000]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              aria-label={`Increase quantity for ${item.product.name}`}
                              className="w-8 h-full flex items-center justify-center text-[#1b1c1a] hover:bg-[#f5f4f0] transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(index)}
                            aria-label={`Remove ${item.product.name} from bag`}
                            className="font-mono text-[11px] uppercase tracking-wider text-[#615e58] hover:text-[#ba1a1a] underline underline-offset-4 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Continue Shopping Footer under Line Items */}
                <div className="pt-6 pb-2">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#000000] hover:text-[#615e58] transition-colors group"
                  >
                    <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-0.5 transition-transform">
                      arrow_back
                    </span>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Order Summary (4 cols on desktop) */}
              <div className="lg:col-span-4 w-full sticky top-28 space-y-6">
                <div className="bg-[#ffffff] border border-[#e5e2e1] p-6 sm:p-8">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.25em] text-[#615e58] uppercase block mb-1">
                    ORDER BREAKDOWN
                  </span>
                  <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-[#000000] uppercase font-mono border-b border-[#e5e2e1] pb-4 mb-6">
                    Summary
                  </h2>

                  <div className="space-y-3 font-mono text-[13px]">
                    {/* Subtotal */}
                    <div className="flex items-center justify-between">
                      <span className="text-[#615e58]">Subtotal</span>
                      <span className="font-medium text-[#000000]">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex items-center justify-between">
                      <span className="text-[#615e58]">Demo Standard Delivery</span>
                      {isFreeShipping ? (
                        <span className="font-semibold text-[#000000] uppercase tracking-wider">
                          Complimentary in this demo
                        </span>
                      ) : (
                        <span className="font-medium text-[#000000]">
                          ₹{shippingCharge.toLocaleString("en-IN")} (Demo fee)
                        </span>
                      )}
                    </div>

                    {/* Shipping Note */}
                    {!isFreeShipping && (
                      <div className="bg-[#f5f4f0] p-2.5 text-[11px] text-[#615e58] leading-snug border border-[#e5e2e1]">
                        Add ₹{(4999 - subtotal).toLocaleString("en-IN")} more to reach the demo shipping threshold (₹4,999+).
                      </div>
                    )}

                    {/* Total */}
                    <div className="border-t border-[#e5e2e1] pt-4 mt-4 flex items-baseline justify-between">
                      <div>
                        <span className="text-[14px] font-semibold uppercase text-[#000000] block">
                          Total
                        </span>
                        <span className="text-[11px] text-[#747878] block">
                          Inclusive of all duties &amp; taxes
                        </span>
                      </div>
                      <span className="text-2xl sm:text-3xl font-semibold text-[#000000]">
                        ₹{grandTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <div className="mt-8 space-y-3">
                    <Link href="/checkout" className="block w-full">
                      <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        className="py-4 text-[12px] tracking-[0.2em]"
                      >
                        Proceed to Checkout
                      </Button>
                    </Link>

                    <p className="font-mono text-[11px] text-center text-[#747878] uppercase tracking-wider">
                      Demo Order Simulation • No Real Payment
                    </p>
                  </div>
                </div>

                {/* Demo Notice / Service Information Box */}
                <div className="border border-[#e5e2e1] bg-[#f5f4f0] p-5 space-y-3 font-mono text-[11px]">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[16px] text-[#000000] mt-0.5">
                      info
                    </span>
                    <div>
                      <span className="font-semibold text-[#000000] uppercase block">
                        Frontend Demo
                      </span>
                      <span className="text-[#615e58]">
                        Shipping and delivery rules shown here are illustrative.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[16px] text-[#000000] mt-0.5">
                      verified_user
                    </span>
                    <div>
                      <span className="font-semibold text-[#000000] uppercase block">
                        Simulation Mode
                      </span>
                      <span className="text-[#615e58]">
                        No real order will be dispatched. No real payment is processed.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
