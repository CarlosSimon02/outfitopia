import type { Metadata } from 'next'
import "@/app/common/index.css";
import "@fontsource/poppins";
import "@fontsource/playfair-display";
import "@fontsource/jetbrains-mono";

export const metadata: Metadata = {
    title: "Outfitopia",
    description: "Outfitopia is a modern ecommerce platform for trendy clothing, shoes, and accessories, built with FireCMS and Next.js",
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <body>

        {children}

        </body>
        </html>
    );
}

