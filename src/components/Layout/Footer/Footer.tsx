import Link from "next/link";
import Logo from "@/components/Icons/Logo";

interface FooterProps {
  className: string;
}

function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`w-full px-[25px] md:px-[42px] text-[var(--white-100)] text-[15px] leading-[26px] ${className}`}
    >
      <section className="w-full flex flex-col max-w-[1300px] h-[100%] mx-auto px-[50px] py-[65px] gap-[48px] bg-[var(--black-100)] rounded-[var(--big-border-radius)]">
        <div className="w-full">
          <Link href="/">
            <Logo className="fill-[var(--white-100)] w-full max-w-[233px]" />
          </Link>
        </div>
        <div className="h-full flex flex-col md:flex-row justify-between flex-wrap max-w-[650px]">
          <div>
            <p className="font-semibold">Adres</p>
            <p>ul. Szaserów 31 lok. U1</p>
            <p>04-306 Warszawa</p>
          </div>
          <div className="py-[10px] md:py-0">
            <p className="font-semibold">Telefon</p>
            <p>+48 508 832 553</p>
          </div>
          <div className="">
            <p className="font-semibold">E-mail</p>
            <p>olga.noszczyk@gmail.com</p>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
