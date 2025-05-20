import { navConfig } from "@/utils/config";
import NavigationItem from "@/components/Layout/Navigation/NavigationItems/NavigationItem";
import { ListItemData, NavigationColorVariant } from "@/types/types";

interface NavigationItemsProps {
  className: string;
  onClick?: () => void;
  variant: NavigationColorVariant;
  navData: Partial<ListItemData>[];
}

function NavigationItems({
  className,
  onClick,
  variant,
  navData,
}: NavigationItemsProps) {
  return (
    <>
      <ul className={className}>
        {navConfig.map((link) => (
          <NavigationItem
            key={link.id}
            linkData={link}
            onLinkClick={onClick}
            variant={variant}
            navData={navData}
          />
        ))}
      </ul>
    </>
  );
}

export default NavigationItems;
