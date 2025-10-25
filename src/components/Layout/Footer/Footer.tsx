import Icon from "@/components/Layout/Icon/Icon";

import Logo from "@/components/Layout/Icon/Icons/Logo";
import { socialIconsConfig } from "@/utils/config";
import ContactForm from "@/components/Layout/Footer/ContactForm/ContactForm";

interface FooterProps {
  className: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`w-full px-[25px] text-[15px] leading-[26px] text-[var(--white-100)] md:px-[42px] ${className}`}
      id="contact"
    >
      <section className="mx-auto flex h-[100%] w-full max-w-[1300px] flex-col gap-[40px] rounded-[var(--big-border-radius)] bg-[var(--black-100)] px-[40px] py-[65px] sm:justify-between sm:px-[50px] lg:justify-start">
        <div className="flex w-full flex-col gap-[40px] sm:flex-row sm:gap-[50px] lg:gap-[80px]">
          <div className="flex max-w-[530px] flex-col gap-[40px] sm:w-1/2 lg:flex-row">
            <div className="flex max-w-[280px] flex-col justify-center gap-[32px] lg:w-1/2">
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
            <div className="flex max-w-[300px] flex-col flex-wrap justify-between lg:w-1/2">
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
              <div className="py-[10px]">
                <p className="font-semibold">Telefon</p>
                <a href="tel:+48508832553">508 832 553</a>
              </div>
              <div className="py-[10px]">
                <p className="font-semibold">E-mail</p>
                <a href="mailto:olga.noszczyk@gmail.com">
                  olga.noszczyk@gmail.com
                </a>
              </div>
              <div>
                <p>pon. - czw. 10:00 - 21:00</p>
                <p>pt. 10:00 - 15:00</p>
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
