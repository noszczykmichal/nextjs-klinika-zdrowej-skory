import Link from "next/link";
import { Smartphone } from "lucide-react";

import { UIContextProvider } from "@/store/uiContext";
import { linksConfig } from "@/utils/config";
import Logo from "@/components/Icons/Logo";
import Hamburger from "./Hamburger/Hamburger";
import SideNav from "./SideNav/SideNav";

function Navigation() {
  return (
    <UIContextProvider>
      <header className="text-lg">
        <nav className="max-w-[1300px] mx-auto flex justify-between items-center py-[46px]">
          <Link href="/" id="header-logo">
            <Logo className="fill-[var(--gray-100)]" />
          </Link>
          <ul className="hidden lg:flex">
            {linksConfig.map((link) => (
              <li key={link.id} className="px-[20px]">
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <a
            href="telto:+48508832553"
            className="flex py-2 px-4 font-extralight text-[15px] bg-[var(--gray-75)] rounded-[var(--big-border-radius)] "
          >
            <Smartphone className="stroke-1" /> Umów wizytę
          </a>
          <Hamburger />
          <SideNav />
        </nav>
      </header>
    </UIContextProvider>
  );
}

export default Navigation;
