import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f5] text-[#1b1c1a] antialiased">
      <Header />
      <main className="w-full flex-grow pt-32 pb-24 flex items-center justify-center">
        <div className="bg-[#ffffff] border border-[#e5e2e1] p-12 sm:p-16 text-center max-w-lg mx-4 shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#f5f4f0] border border-[#e5e2e1] text-[#747878]">
            <span className="material-symbols-outlined text-[32px]">
              inventory_2
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#615e58] uppercase block mb-1">
            STATUS 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-normal text-[#000000] uppercase tracking-tight mb-2 font-mono">
            Product Not Found
          </h1>
          <p className="text-[14px] text-[#615e58] mb-6 leading-relaxed">
            The footwear item you are looking for is not currently in the UK Shoes
            catalog, or may have been retired.
          </p>
          <Link href="/shop">
            <Button variant="primary" size="md" className="px-8">
              Return to Shop All
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
