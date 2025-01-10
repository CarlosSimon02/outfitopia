import "@fontsource/jetbrains-mono";
import "@fontsource/playfair-display";
import "@fontsource/poppins";
import type { Metadata } from "next";

import "@/app/common/index.css";

export const metadata: Metadata = {
  title: "Outfitopia",
  description:
    "Outfitopia is a modern ecommerce platform for trendy clothing, shoes, and accessories, built with FireCMS and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
