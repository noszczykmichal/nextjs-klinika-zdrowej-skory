import Icon from "@/components/Layout/Icon/Icon";

import Logo from "@/components/Layout/Icon/Icons/Logo";
import { socialIconsConfig } from "@/utils/config";
import ContactForm from "@/components/Layout/Footer/ContactForm/ContactForm";
import clsx from "clsx";

interface FooterProps {
  className: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={clsx(
        "text-white-100 w-full px-6.25 text-[15px] leading-6.5 md:px-11",
        className,
      )}
      id="contact"
    >
      <section className="rounded-big bg-black-100 mx-auto flex h-full w-full max-w-325 flex-col gap-10 px-10 py-16.25 sm:justify-between sm:px-12.5 lg:justify-start">
        <div className="flex w-full flex-col gap-10 sm:flex-row sm:gap-12.5 lg:gap-20">
          <div className="flex max-w-132.5 flex-col gap-10 sm:w-1/2 lg:flex-row">
            <div className="flex max-w-70 flex-col justify-center gap-8 lg:w-1/2">
              <Logo className="fill-white-100 h-11.25" />
              <div className="flex items-center gap-8.25">
                {socialIconsConfig.map((element) => (
                  <Icon
                    key={element.name}
                    name={element.name}
                    className={element.className}
                    href={element.href}
                  />
                ))}
              </div>
              <div>
                <p className="text-[12px] font-bold">
                  Olga Noszczyk Klinika Zdrowej Skóry
                </p>
                <p className="text-[12px]">
                  Radiofrekwencja Mikroigłowa | Icoone | Mezoterapia Igłowa |
                  Warszawa Praga Południe
                </p>
              </div>
            </div>
            <div className="flex max-w-75 flex-col flex-wrap justify-between lg:w-1/2">
              <div>
                <p className="font-semibold">Adres</p>
                <a
                  href="https://maps.app.goo.gl/GBaDRtSft9FWCSuW8"
                  target="_blank"
                >
                  ul. Szaserów 31/LU. 2,
                  <br /> 04-306 Warszawa
                </a>
              </div>
              <div className="py-2.5">
                <p className="font-semibold">Telefon</p>
                <a href="tel:+48508832553">508 832 553</a>
              </div>
              <div className="py-2.5">
                <p className="font-semibold">E-mail</p>
                <a href="mailto:olga.noszczyk@gmail.com">
                  olga.noszczyk@gmail.com
                </a>
              </div>
              <div>
                <p>pon. - czw. 10:00 - 21:00</p>
                <p>pt. 10:00 - 19:00</p>
              </div>
            </div>
          </div>

          <div className="flex max-w-100 flex-col flex-wrap justify-between sm:w-1/2">
            <ContactForm />
          </div>
        </div>
        <div className="border-white-100/50 w-full border-t">
          <p className="xs:flex-row text-white-100/50 flex flex-col items-center p-4 text-[12px]">
            <span>
              © 2026 Copyright by{" "}
              <a
                href="https://michalnoszczyk.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-magenta-100 active:text-magenta-100 transition-colors duration-150"
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
