import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";

import Booksy from "@/components/Layout/Icon/Icons/Booksy";
import { IconVariants } from "@/types/types";

interface IconProps {
  name: IconVariants;
  href: string;
  className: string;
}

export default function Icon({ name, href, className }: IconProps) {
  const renderSwitch = (name: IconVariants) => {
    switch (name) {
      case "facebook":
        return <SiFacebook color={className} />;
      case "instagram":
        return <SiInstagram color={className} />;
      case "booksy":
        return <Booksy className={className} />;
      default:
        return;
    }
  };

  const content = renderSwitch(name);

  return (
    <a href={href} target="_blank">
      {content}
    </a>
  );
}
