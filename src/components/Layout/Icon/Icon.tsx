import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";

import Booksy from "@/components/Layout/Icon/Icons/Booksy";
import { IconVariants } from "@/types/types";

interface IconProps {
  name: IconVariants;
  href: string;
  className: string;
}

export default function Icon({ name, href, className }: IconProps) {
  const iconName = name.slice(0, 1).toUpperCase() + name.slice(1);

  const renderSwitch = (name: IconVariants) => {
    switch (name) {
      case "facebook":
        return <SiFacebook color={className} />;
      case "instagram":
        return <SiInstagram color={className} />;
      case "booksy":
        return <Booksy className={className} />;
    }
  };

  const content = renderSwitch(name);

  return (
    <a
      href={href}
      target="_blank"
      aria-label={`${iconName} (otwiera się w nowej karcie)`}
      rel="noopener noreferrer"
    >
      {content}
    </a>
  );
}
