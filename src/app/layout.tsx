import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import Footer from "@/components/Layout/Footer/Footer";
import Navigation from "@/components/Layout/Navigation/Navigation";
import "@/styles/globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Klinika Zdrowej Skóry",
  description:
    "Klinika Zdrowej Skóry to wyjątkowe miejsce stworzone z pasji do piękna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Navigation />
        <div id="overlay-root" />
        <main className="px-[25px] max-w-[1300px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
