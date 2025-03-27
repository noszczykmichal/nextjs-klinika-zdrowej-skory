import Link from "next/link";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";

import Logo from "@/components/Layout/Icon/Icons/Logo";
import Booksy from "@/components/Layout/Icon/Icons/Booksy";

type IconVariants = "logo" | "facebook" | "instagram" | "booksy";

interface IconProps {
  name: IconVariants;
  href: string;
  id?: string;
  className?: string;
  color?: string;
}

function Icon({ name, href, id, className, color }: IconProps) {
  const renderSwitch = (name: IconVariants) => {
    switch (name) {
      case "logo":
        return <Logo className={className} />;
      case "facebook":
        return <SiFacebook className={className} color={color} />;
      case "instagram":
        return <SiInstagram className={className} color={color} />;
      case "booksy":
        return <Booksy className={className} />;
      default:
        return;
    }
  };

  const content = renderSwitch(name);

  return (
    <Link href={href} id={id}>
      {content}
    </Link>
  );
}

export default Icon;
