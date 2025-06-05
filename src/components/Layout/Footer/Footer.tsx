import Icon from "@/components/Layout/Icon/Icon";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";

import Logo from "../Icon/Icons/Logo";
import { socialIconsConfig } from "@/utils/config";
// import NavigationMenuDemo from "../Navigation/NavigationMenuDemo/NavigationMenuDemo";
import { ListItemData } from "@/types/types";

interface FooterProps {
  className: string;
  navData: Partial<ListItemData>[];
}

function Footer({ className, navData }: FooterProps) {
  return (
    <footer
      className={`w-full px-[25px] text-[15px] leading-[26px] text-[var(--white-100)] md:px-[42px] ${className}`}
      id="contact"
    >
      <section className="mx-auto flex h-[100%] w-full max-w-[1300px] flex-col gap-[20px] rounded-[var(--big-border-radius)] bg-[var(--black-100)] px-[40px] py-[65px] sm:flex-row sm:justify-between sm:gap-[50px] sm:px-[50px] md:justify-start">
        <div className="flex max-w-[240px] flex-col justify-center gap-[32px] sm:w-[50%] md:w-1/3">
          <Logo className="h-[45px] fill-[var(--white-100)]" />

          <div className="flex items-center gap-[33px]">
            {socialIconsConfig.map((element) => (
              <Icon
                key={element.name}
                name={element.name}
                className={element.className}
                href={element.href}
              />
            ))}
          </div>
        </div>
        <div className="flex h-full max-w-[300px] flex-col flex-wrap justify-between sm:w-[50%] md:w-1/3">
          <div>
            <p className="font-semibold">Adres</p>
            <p>ul. Szaserów 31 lok. U2</p>
            <p>04-306 Warszawa</p>
          </div>
          <div className="py-[10px]">
            <p className="font-semibold">Telefon</p>
            <p>+48 508 832 553</p>
          </div>
          <div className="">
            <p className="font-semibold">E-mail</p>
            <p>olga.noszczyk@gmail.com</p>
          </div>
        </div>
        <NavigationItems
          className="hidden h-full flex-col justify-between lg:flex"
          navData={navData}
          variant="dark"
          classForDropDown="absolute top-[-100%] right-full xl:left-auto xl:left-full"
        />
      </section>
    </footer>
  );
}

export default Footer;
