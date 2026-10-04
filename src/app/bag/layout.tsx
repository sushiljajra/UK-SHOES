import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Bag | UK Shoes",
  description:
    "Review your footwear selection, adjust quantities, and proceed to checkout with UK Shoes.",
};

export default function BagLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
