import Link from "next/link";
import Logo from "@/components/Icons/Logo";

function Footer() {
  return (
    <footer className="w-full text-[var(--white-100)] text-[15px] leading-[26px]">
      <section className="w-full flex flex-col max-w-[1300px] h-[100%] mx-auto px-[50px] py-[65px] gap-[48px] bg-[var(--black-100)] rounded-[var(--big-border-radius)]">
        <div className="w-full">
          <Link href="/">
            <Logo className="fill-[var(--white-100)] w-full max-w-[233px] hidden" />
          </Link>
        </div>
        <div className="w-full">
          <div>
            <p className="font-semibold">Adres</p>
            <p>ul. Fort Służew 3 lok. U2</p>
            <p>02-787 Warszawa</p>
          </div>
          <div>
            <p className="font-semibold">Telefon</p>
            <p>+48 792 044 090</p>
          </div>
          <div>
            <p className="font-semibold">E-mail</p>
            <p>gabinet@platinum</p>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
