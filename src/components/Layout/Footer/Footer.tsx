import Icon from "@/components/Layout/Icon/Icon";

interface FooterProps {
  className: string;
}

function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`w-full px-[25px] md:px-[42px] text-[var(--white-100)] text-[15px] leading-[26px] ${className}`}
    >
      <section className="w-full flex flex-col sm:flex-row gap-[20px] sm:gap-[50px] max-w-[1300px] h-[100%] mx-auto px-[50px] py-[65px] bg-[var(--black-100)] rounded-[var(--big-border-radius)]">
        <div className="w-full flex flex-col gap-[10px] sm:gap-[20px] max-w-[200px]">
          <Icon name="logo" href="/" className="h-[40px] " id="header-logo" />
          <Icon name="facebook" href="/" color="var(--gray-100)" />
          <Icon name="instagram" href="/" color="var(--gray-100)" />
          <Icon
            name="booksy"
            href="/"
            className="h-[30px] w-[30px] ml-[-6px] fill-[var(--gray-100)]"
          />
        </div>
        <div className="h-full flex flex-col justify-between flex-wrap">
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
