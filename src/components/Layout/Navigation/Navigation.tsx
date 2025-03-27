import { Smartphone } from "lucide-react";

import { UIContextProvider } from "@/store/uiContext";
import Icon from "@/components/Layout/Icon/Icon";
import NavigationItems from "./NavigationItems/NavigationItems";
import Hamburger from "./Hamburger/Hamburger";
import SideNav from "./SideNav/SideNav";

interface NavigationProps {
  classNames: string;
}

function Navigation({ classNames }: NavigationProps) {
  return (
    <UIContextProvider>
      <header className={`w-full flex items-center text-lg ${classNames}`}>
        <nav className="w-[100%] px-[10px] md:px-[42px] py-[20px] flex justify-between">
          <Icon name="logo" href="/" className="h-[40px]" id="header-logo" />
          <NavigationItems className="hidden lg:flex h-full" />
          <div className="ml-[10px] flex items-center justify-between lg:justify-end flex-grow-[0.5] max-w-[250px]">
            <a
              href="tel:+48508832553"
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
