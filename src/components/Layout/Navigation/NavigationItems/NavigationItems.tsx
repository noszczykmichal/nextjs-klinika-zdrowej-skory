import { navConfig } from "@/utils/config";
import NavigationItem from "@/components/Layout/Navigation/NavigationItems/NavigationItem";
import { NavigationColorVariant } from "@/types/types";

interface NavigationItemsProps {
  className: string;
  onClick?: () => void;
  variant: NavigationColorVariant;
}

function NavigationItems({
  className,
  onClick,
  variant,
}: NavigationItemsProps) {
  return (
    <ul className={className}>
      {navConfig.map((link) => (
        <NavigationItem
          key={link.id}
          href={link.href}
          label={link.label}
          onLinkClick={onClick}
          variant={variant}
        />
      ))}
    </ul>
  );
}

export default NavigationItems;
