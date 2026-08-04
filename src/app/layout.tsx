import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import Footer from "@/components/Layout/Footer/Footer";
import Navigation from "@/components/Layout/Navigation/Navigation";
import { getNavData } from "@/utils/sanityPageData";
import "@/styles/globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: "Klinika Zdrowej Skóry",
  description:
    "Klinika Zdrowej Skóry to wyjątkowe miejsce stworzone z pasji do piękna.",

  openGraph: {
    title: "Klinika Zdrowej Skóry",
    description:
      "Klinika Zdrowej Skóry to wyjątkowe miejsce stworzone z pasji do piękna.",
    url: "https://www.olganoszczyk.pl/",
    siteName: "Klinika Zdrowej Skóry",
    images: [
      {
        url: "/social_card.jpg",
        width: 1280,
        height: 1023,
        alt: "Klinika Zdrowej Skóry – Twoje miejsce piękna",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Klinika Zdrowej Skóry",
    description:
      "Klinika Zdrowej Skóry to wyjątkowe miejsce stworzone z pasji do piękna.",
    images: ["/social_card.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navData = await getNavData();

  return (
    <html lang="pl" style={{ scrollBehavior: "auto" }}>
      <body className={`${montserrat.className} antialiased`}>
        <Navigation navData={navData} />
        <div id="overlay-root" />
        {children}
        <Footer className="mx-auto pb-[50px]" />
      </body>
    </html>
  );
}
