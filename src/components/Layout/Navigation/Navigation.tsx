import Link from "next/link";

import { linksConfig } from "@/utils/config";
import Logo from "@/components/Icons/Logo";

function Navigation() {
  return (
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
        <a href="telto:+48508832553" className="font-bold">
          +48 508 832 553
        </a>
      </nav>
    </header>
  );
}

export default Navigation;
