import { client } from "@/sanity/client";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import Footer from "@/components/Layout/Footer/Footer";
import Navigation from "@/components/Layout/Navigation/Navigation";
import "@/styles/globals.css";
import { ListItemData } from "@/types/types";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Klinika Zdrowej Skóry",
  description:
    "Klinika Zdrowej Skóry to wyjątkowe miejsce stworzone z pasji do piękna",
};

const TREATMENT_GROUPS_QUERY = `*[_type=='treatmentGroup']{_id, title, "slug":groupSlug}`;

const options = { next: { revalidate: 30 } };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const treatmentGroups = await client.fetch<Partial<ListItemData>[]>(
    TREATMENT_GROUPS_QUERY,
    {},
    options
  );
  console.log(treatmentGroups);

  return (
    <html lang="pl">
      <body className={`${montserrat.className} antialiased`}>
        <Navigation navData={treatmentGroups} />
        <div id="overlay-root" />
        {children}
        <Footer className="pb-[50px] mx-auto" />
      </body>
    </html>
  );
}
