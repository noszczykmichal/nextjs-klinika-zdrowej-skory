import Link from "next/link";
import Logo from "@/components/Icons/Logo";

import { linksConfig } from "@/utils/config";

function Footer() {
  return (
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
  );
}

export default Footer;
