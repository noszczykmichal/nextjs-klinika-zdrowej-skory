import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import Logo from "@/components/UI/Logo";
import "./globals.css";

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
  const linksConfig = [
    { id: "o-nas", label: "O nas", href: "/o-nas" },
    { id: "zabiegi", label: "Zabiegi", href: "/zabiegi" },
    { id: "cennik", label: "Cennik", href: "/cennik" },
    { id: "blog", label: "Blog", href: "/blog" },
    { id: "kontakt", label: "Kontakt", href: "/kontakt" },
  ];

  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <header className="text-lg">
          <nav className="max-w-[1300px] mx-auto flex justify-between py-[46px]">
            <Link href="/">
              <Logo className="fill-[var(--gray-100)]" />
            </Link>
            <ul className="flex">
              {linksConfig.map((link) => (
                <li key={link.id} className="px-[20px]">
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <a
              href="telto:+48508832553"
              className={`${montserrat.variable} font-bold`}
            >
              +48 508 832 553
            </a>
          </nav>
        </header>

        <main className="max-w-[1300px] mx-auto">{children}</main>

        <footer className="text-[var(--white-100)] text-[15px] leading-[26px]">
          <section className="max-w-[1300px] h-[100%] mx-auto px-[50px] py-[65px] flex gap-[48px] bg-[var(--black-100)] rounded-[var(--primary-border-radius)]">
            <div className="w-1/3">
              <Link href="/">
                <Logo className="fill-[var(--white-100)]" />
              </Link>
            </div>
            <div className="w-1/3 flex flex-col justify-between">
              <div>
                <p className="font-semibold">Adres</p>
                <p>ul. Fort Służew 3 lok. U2</p>
                <p>02-787 Warszawa</p>
              </div>
              <div>
                <p className="font-semibold">Telefon</p>
                <p>+48 792 044 090</p>
              </div>
              <div>
                <p className="font-semibold">E-mail</p>
                <p>gabinet@platinumkosmetologia.pl</p>
              </div>
            </div>
            <div className="w-1/3">
              <ul className="list-none">
                {linksConfig.map((link) => (
                  <li key={link.id} className="">
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </footer>
      </body>
    </html>
  );
}
