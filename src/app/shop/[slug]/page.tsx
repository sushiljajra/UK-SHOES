import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PRODUCTS_DATA, getProductBySlug, getProductSlug } from "@/data/products";
import { Breadcrumb } from "@/components/product/Breadcrumb";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductSpecifications } from "@/components/product/ProductSpecifications";
import { RelatedProducts } from "@/components/product/RelatedProducts";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate Static Params for all 14 mock products
export async function generateStaticParams() {
  return PRODUCTS_DATA.map((product) => ({
    slug: getProductSlug(product.id),
  }));
}

// Dynamic SEO Metadata for each product
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | UK Shoes",
      description: "The requested footwear could not be found in our collection.",
    };
  }

  return {
    title: `${product.name} | UK Shoes`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Gallery images array: product.image plus any alternative color images or gallery entries
  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f5] text-[#1b1c1a] antialiased">
      {/* Header with live cart count */}
      <Header />

      <main className="w-full flex-grow pt-28 sm:pt-32 pb-24">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* 1. Subtle Breadcrumb */}
          <Breadcrumb product={product} />

          {/* 2. Main Two-Column Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left Column: Image Gallery (7 cols on desktop) */}
            <div className="lg:col-span-7 w-full sticky top-28">
              <ProductGallery
                images={galleryImages}
                productName={product.name}
              />
            </div>

            {/* Right Column: Purchase Information Panel (5 cols on desktop) */}
            <div className="lg:col-span-5 w-full">
              <ProductPurchasePanel product={product} />
            </div>
          </div>

          {/* 3. Product Specifications & Craft Dossier */}
          <ProductSpecifications product={product} />

          {/* 4. Curated Related Products */}
          <RelatedProducts currentProduct={product} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
