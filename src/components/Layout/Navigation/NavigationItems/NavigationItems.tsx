import { navConfig } from "@/utils/config";
import NavigationItem from "@/components/Layout/Navigation/NavigationItems/NavigationItem";
import { ListItemData, NavigationColorVariant } from "@/types/types";

interface NavigationItemsProps {
  className: string;
  onClick?: () => void;
  variant: NavigationColorVariant;
  navData: Partial<ListItemData>[];
  classForDropDown: string;
}

function NavigationItems({
  className,
  onClick,
  variant,
  navData,
  classForDropDown,
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
            classForDropDown={classForDropDown}
          />
        ))}
      </ul>
    </>
  );
}

export default NavigationItems;
