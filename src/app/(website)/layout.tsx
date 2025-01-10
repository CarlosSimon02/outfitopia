import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import React from "react";

import { Providers } from "./Providers";
import { Footer } from "@/app/(website)/components/Footer";
import { Header } from "@/app/(website)/components/Header";

export const metadata: Metadata = {
  title: "FireCMS e-commerce and blog demo",
  description: "This is a demo for using FireCMS as an e-commerce backend",
  generator: "FireCMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color={"#16D6D1"} />

        <main className={"relative flex min-h-[100dvh] w-full flex-col"}>
          <Header />

          <Providers>{children}</Providers>

          <Footer />
        </main>
      </body>
    </html>
  );
}
