import Icon from "@/components/Layout/Icon/Icon";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";

interface FooterProps {
  className: string;
}

function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`w-full px-[25px] md:px-[42px] text-[var(--white-100)] text-[15px] leading-[26px] ${className}`}
    >
      <section className="w-full flex flex-col sm:flex-row sm:justify-between md:justify-start gap-[20px] sm:gap-[50px] max-w-[1300px] h-[100%] mx-auto px-[40px] sm:px-[50px] py-[65px] bg-[var(--black-100)] rounded-[var(--big-border-radius)]">
        <div className="sm:w-[50%] md:w-1/3 max-w-[240px] flex flex-col gap-[10px] sm:gap-[20px] ">
          <Icon
            name="logo"
            href="/"
            className="h-[40px] fill-[var(--white-100)]"
            id="header-logo"
          />
          <Icon name="facebook" href="/" className="var(--white-100)" />
          <Icon name="instagram" href="/" className="var(--white-100)" />
          <Icon
            name="booksy"
            href="/"
            className="h-[30px] w-[30px] ml-[-6px] fill-[var(--white-100)]"
          />
        </div>
        <div className="sm:w-[50%] md:w-1/3 max-w-[300px] h-full flex flex-col justify-between flex-wrap">
          <div>
            <p className="font-semibold">Adres</p>
            <p>ul. Szaserów 31 lok. U1</p>
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
          className="hidden md:w-1/3 max-w-[240px] h-full md:flex flex-col justify-between"
          variant="white"
        />
      </section>
    </footer>
  );
}

export default Footer;
