import Icon from "@/components/Layout/Icon/Icon";
// import NavigationItems from "../Navigation/NavigationItems/NavigationItems";

import Logo from "../Icon/Icons/Logo";
import { socialIconsConfig } from "@/utils/config";
import ContactForm from "./Form/Form";

interface FooterProps {
  className: string;
}

function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`w-full px-[25px] text-[15px] leading-[26px] text-[var(--white-100)] md:px-[42px] ${className}`}
      id="contact"
    >
      <section className="mx-auto flex h-[100%] w-full max-w-[1300px] flex-col gap-[40px] rounded-[var(--big-border-radius)] bg-[var(--black-100)] px-[40px] py-[65px] sm:justify-between sm:px-[50px] lg:justify-start">
        <div className="flex w-full flex-col gap-[40px] sm:flex-row sm:gap-[50px] lg:gap-[80px]">
          <div className="flex max-w-[490px] flex-col gap-[40px] sm:w-1/2 lg:flex-row">
            <div className="flex max-w-[240px] flex-col justify-center gap-[32px] lg:w-1/2">
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
            <div className="flex max-w-[300px] flex-col flex-wrap justify-between lg:w-1/2">
              <div>
                <p className="font-semibold">Adres</p>
                <p>ul. Szaserów 31 lok. U2</p>
                <p>04-306 Warszawa</p>
              </div>
              <div className="py-[10px]">
                <p className="font-semibold">Telefon</p>
                <p>+48 508 832 553</p>
              </div>
              <div>
                <p className="font-semibold">E-mail</p>
                <p>olga.noszczyk@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="flex max-w-[400px] flex-col flex-wrap justify-between sm:w-1/2">
            <ContactForm />
          </div>
        </div>
        <div className="w-full border-t border-[var(--white-100)]/50">
          <p className="xs:flex-row flex flex-col items-center p-4 text-[12px] text-[var(--white-100)]/50">
            <span>
              © 2025 Copyright by{" "}
              <a
                href="https://michalnoszczyk.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-150 hover:text-[var(--magenta-100)] active:text-[var(--magenta-100)]"
              >
                MNSS
              </a>
              .
            </span>
            <span>{"\u00A0"}All rights reserved.</span>
          </p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
