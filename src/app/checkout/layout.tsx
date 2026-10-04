import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Checkout | UK Shoes",
  description: "Simulated order checkout for UK Shoes frontend demo.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
