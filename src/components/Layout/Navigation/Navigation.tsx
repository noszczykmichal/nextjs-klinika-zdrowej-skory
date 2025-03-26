import Link from "next/link";
import { Smartphone } from "lucide-react";

import { UIContextProvider } from "@/store/uiContext";
import Logo from "@/components/Icons/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";
import Hamburger from "./Hamburger/Hamburger";
import SideNav from "./SideNav/SideNav";

function Navigation() {
  return (
    <UIContextProvider>
      <header className="w-full flex items-center text-lg">
        <nav className="w-[100%] px-[10px] py-[20px] flex justify-between">
          <Link href="/" id="header-logo">
            <Logo className="fill-[var(--gray-100)] w-[100%]" />
          </Link>
          <NavigationItems className="hidden lg:flex h-full" />
          <div className="ml-[10px] flex items-center justify-between flex-grow-[0.5]">
            <a
              href="telto:+48508832553"
              className="flex items-center text-nowrap py-2 px-4 font-extralight text-[15px] bg-[var(--gray-75)] rounded-[var(--big-border-radius)] mr-2"
            >
              <Smartphone className="stroke-1" /> Umów wizytę
            </a>
            <Hamburger />
          </div>
          <SideNav />
        </nav>
      </header>
    </UIContextProvider>
  );
}

export default Navigation;
