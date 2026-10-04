"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { useCart, CartItem } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
    placedAt: string;
  } | null>(null);

  // Form mock state with obvious fictional demo values
  const [formData, setFormData] = useState({
    fullName: "Demo Customer",
    email: "demo@example.com",
    address: "123 Demo Street",
    city: "Demo City",
    state: "Demo State",
    postalCode: "000000",
    paymentMethod: "demo_instant",
  });

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const isFreeShipping = subtotal >= 4999;
  const shippingCharge = subtotal > 0 && !isFreeShipping ? 299 : 0;
  const grandTotal = subtotal + shippingCharge;

  const handleSimulateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `UK-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrder({
        orderId,
        items: [...cart],
        subtotal,
        shipping: shippingCharge,
        total: grandTotal,
        placedAt: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      });
      clearCart();
      setIsSubmitting(false);
      setOrderConfirmed(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f5] text-[#1b1c1a] antialiased">
      <Header />

      <main className="w-full flex-grow pt-28 sm:pt-32 pb-24">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Top Banner / Notice */}
          <div className="mb-8 p-4 border border-[#e5e2e1] bg-[#ffffff] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono uppercase font-medium tracking-wider text-[#000000]">
                DEMO ENVIRONMENT
              </span>
              <span className="text-[#615e58]">
                — This is a simulated checkout demo. No actual payment or billing is processed.
              </span>
            </div>
            <Link
              href="/bag"
              className="text-[#000000] font-mono uppercase tracking-wider underline hover:text-[#615e58] whitespace-nowrap self-start sm:self-auto"
            >
              ← Back to Bag
            </Link>
          </div>

          {orderConfirmed && confirmedOrder ? (
            /* Confirmation State */
            <div className="max-w-3xl mx-auto py-12 px-6 sm:px-10 bg-[#ffffff] border border-[#e5e2e1] shadow-sm">
              <div className="text-center pb-8 border-b border-[#e5e2e1]">
                <div className="w-12 h-12 bg-[#000000] text-white flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-[24px]">done</span>
                </div>
                <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-[#615e58] uppercase block mb-1">
                  ORDER SIMULATION COMPLETE
                </span>
                <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#000000] uppercase font-mono mb-2">
                  Order Confirmed
                </h1>
                <p className="font-mono text-sm text-[#000000] font-semibold tracking-wider">
                  Reference: #{confirmedOrder.orderId}
                </p>
                <p className="text-xs text-[#615e58] mt-2 max-w-md mx-auto">
                  Simulated order successfully created on {confirmedOrder.placedAt}. No card has been charged, and no actual shipment will be dispatched.
                </p>
              </div>

              {/* Order Items Review */}
              <div className="py-6 border-b border-[#e5e2e1]">
                <h2 className="font-mono text-xs uppercase tracking-wider text-[#615e58] font-semibold mb-4">
                  Summary of Items ({confirmedOrder.items.reduce((s, i) => s + i.quantity, 0)})
                </h2>
                <div className="divide-y divide-[#f0edea]">
                  {confirmedOrder.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 relative bg-[#f4f3f0] flex-shrink-0 border border-[#e5e2e1]">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-[#000000]">{item.product.name}</p>
                          <p className="text-[11px] text-[#615e58]">
                            Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ""} {item.selectedColor ? `• ${item.selectedColor}` : ""}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono font-medium text-[#000000]">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="py-6 border-b border-[#e5e2e1] space-y-2 text-xs font-mono">
                <div className="flex justify-between text-[#615e58]">
                  <span>Subtotal</span>
                  <span>₹{confirmedOrder.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#615e58]">
                  <span>Demo Standard Delivery</span>
                  <span>{confirmedOrder.shipping === 0 ? "Complimentary in this demo" : `₹${confirmedOrder.shipping.toLocaleString("en-IN")} (Demo fee)`}</span>
                </div>
                <div className="flex justify-between text-[#000000] text-sm font-semibold pt-2 border-t border-[#e5e2e1]">
                  <span>Total Simulated Amount</span>
                  <span>₹{confirmedOrder.total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shop" className="w-full sm:w-auto">
                  <Button variant="primary" className="w-full sm:w-auto px-8">
                    Continue Browsing Collection
                  </Button>
                </Link>
                <Link href="/" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto px-8">
                    Return to Homepage
                  </Button>
                </Link>
              </div>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart Warning */
            <div className="text-center py-20 px-4 max-w-lg mx-auto bg-[#ffffff] border border-[#e5e2e1]">
              <span className="material-symbols-outlined text-[48px] text-[#8e8a83] mb-4">
                shopping_bag
              </span>
              <h2 className="text-2xl font-normal font-mono uppercase tracking-tight text-[#000000] mb-2">
                No Items to Checkout
              </h2>
              <p className="text-sm text-[#615e58] mb-8">
                Your shopping bag is currently empty. Explore the UK Shoes collection to select a pair before proceeding to checkout.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link href="/shop">
                  <Button variant="primary" className="w-full sm:w-auto px-8">
                    Explore Footwear
                  </Button>
                </Link>
                <Link href="/bag">
                  <Button variant="secondary" className="w-full sm:w-auto px-8">
                    View Bag
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* Active Simulated Checkout Form */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Checkout Simulation Inputs */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-[#615e58] uppercase block mb-1">
                    STEP 1 OF 2
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#000000] uppercase font-mono">
                    Shipping & Delivery
                  </h1>
                </div>

                <form id="checkout-form" onSubmit={handleSimulateOrder} className="space-y-6">
                  {/* Contact Info */}
                  <div className="bg-[#ffffff] border border-[#e5e2e1] p-6 space-y-4">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#000000] font-semibold">
                      1. Contact Details (Mock)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#615e58] mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Demo Customer"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-[#faf9f5] border border-[#e5e2e1] px-3 py-2 text-sm text-[#000000] focus:border-[#000000] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#615e58] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="demo@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#faf9f5] border border-[#e5e2e1] px-3 py-2 text-sm text-[#000000] focus:border-[#000000] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="bg-[#ffffff] border border-[#e5e2e1] p-6 space-y-4">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#000000] font-semibold">
                      2. Shipping Destination
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#615e58] mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="123 Demo Street"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full bg-[#faf9f5] border border-[#e5e2e1] px-3 py-2 text-sm text-[#000000] focus:border-[#000000] focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#615e58] mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Demo City"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full bg-[#faf9f5] border border-[#e5e2e1] px-3 py-2 text-sm text-[#000000] focus:border-[#000000] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#615e58] mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Demo State"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full bg-[#faf9f5] border border-[#e5e2e1] px-3 py-2 text-sm text-[#000000] focus:border-[#000000] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#615e58] mb-1">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="000000"
                            value={formData.postalCode}
                            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                            className="w-full bg-[#faf9f5] border border-[#e5e2e1] px-3 py-2 text-sm text-[#000000] focus:border-[#000000] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Payment Option */}
                  <div className="bg-[#ffffff] border border-[#e5e2e1] p-6 space-y-4">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#000000] font-semibold">
                      3. Demo Payment Simulation
                    </h3>
                    <p className="text-xs text-[#615e58]">
                      Choose a simulated payment flow to finalize this portfolio demonstration.
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 border border-[#000000] bg-[#faf9f5] cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === "demo_instant"}
                          onChange={() => setFormData({ ...formData, paymentMethod: "demo_instant" })}
                          className="accent-[#000000]"
                        />
                        <div className="text-xs">
                          <span className="font-medium text-[#000000] block">Instant Simulation (No real charge)</span>
                          <span className="text-[#615e58]">Simulates immediate automated order clearance</span>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-[#e5e2e1] bg-white cursor-pointer hover:border-[#615e58]">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === "demo_cod"}
                          onChange={() => setFormData({ ...formData, paymentMethod: "demo_cod" })}
                          className="accent-[#000000]"
                        />
                        <div className="text-xs">
                          <span className="font-medium text-[#000000] block">Pay on Delivery Simulation</span>
                          <span className="text-[#615e58]">Simulates deferred payment upon delivery</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      className="w-full py-4 text-xs font-mono uppercase tracking-[0.2em]"
                    >
                      {isSubmitting ? "Processing Simulation..." : `Simulate Place Order • ₹${grandTotal.toLocaleString("en-IN")}`}
                    </Button>
                    <p className="text-[11px] text-[#615e58] text-center mt-2 font-mono">
                      UK Shoes Demo Mode • No actual payment will be charged
                    </p>
                  </div>
                </form>
              </div>

              {/* Right Column: Order Review Summary */}
              <div className="lg:col-span-5">
                <div className="bg-[#ffffff] border border-[#e5e2e1] p-6 lg:sticky lg:top-36 space-y-6">
                  <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-4">
                    <h2 className="font-mono text-sm uppercase tracking-wider text-[#000000] font-semibold">
                      Order Summary
                    </h2>
                    <span className="font-mono text-xs text-[#615e58]">
                      {cart.reduce((s, i) => s + i.quantity, 0)} Items
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="max-h-72 overflow-y-auto divide-y divide-[#f0edea] pr-1">
                    {cart.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-start gap-3 text-xs">
                        <div className="w-14 h-14 relative bg-[#f4f3f0] flex-shrink-0 border border-[#e5e2e1]">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="font-medium text-[#000000] truncate">{item.product.name}</p>
                          <p className="text-[11px] text-[#615e58] mt-0.5">
                            Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ""}
                          </p>
                          <p className="font-mono text-[#000000] font-medium mt-1">
                            ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="border-t border-[#e5e2e1] pt-4 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-[#615e58]">
                      <span>Subtotal</span>
                      <span className="text-[#000000]">₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-[#615e58]">
                      <span>Demo Standard Delivery</span>
                      <span className="text-[#000000]">
                        {shippingCharge === 0 ? "Complimentary in this demo" : `₹${shippingCharge.toLocaleString("en-IN")} (Demo fee)`}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#000000] text-sm font-semibold pt-3 border-t border-[#e5e2e1]">
                      <span>Grand Total</span>
                      <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#f0edea]">
                    <Link
                      href="/bag"
                      className="block text-center font-mono text-[11px] text-[#615e58] uppercase tracking-wider hover:text-[#000000] underline"
                    >
                      Modify Items in Bag
                    </Link>
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
