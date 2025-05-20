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
      className={`w-full px-[25px] md:px-[42px] text-[var(--white-100)] text-[15px] leading-[26px] ${className}`}
      id="contact"
    >
      <section className="w-full flex flex-col sm:flex-row sm:justify-between md:justify-start gap-[20px] sm:gap-[50px] max-w-[1300px] h-[100%] mx-auto px-[40px] sm:px-[50px] py-[65px] bg-[var(--black-100)] rounded-[var(--big-border-radius)]">
        <div className="sm:w-[50%] md:w-1/3 max-w-[240px] flex flex-col justify-center gap-[32px]">
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
        <div className="sm:w-[50%] md:w-1/3 max-w-[300px] h-full flex flex-col justify-between flex-wrap">
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
          className="h-full hidden lg:flex flex-col justify-between"
          navData={navData}
          variant="dark"
          classForDropDown="absolute top-[-100%] right-full xl:left-auto xl:left-full"
        />
      </section>
    </footer>
  );
}

export default Footer;
