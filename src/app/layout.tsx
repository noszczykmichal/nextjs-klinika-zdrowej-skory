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
    <html lang="pl">
      <body className={`${montserrat.className} antialiased`}>
        <Navigation />
        <div id="overlay-root" />
        {children}
        <Footer className="pb-[50px] mx-auto" />
      </body>
    </html>
  );
}
