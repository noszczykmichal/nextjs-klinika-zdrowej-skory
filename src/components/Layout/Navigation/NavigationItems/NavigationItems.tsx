import { navConfig } from "@/utils/config";
import NavigationItem from "@/components/Layout/Navigation/NavigationItems/NavigationItem";
import { ListItemData } from "@/types/types";

interface NavigationItemsProps {
  className: string;
  onClick?: () => void;
  navData: Partial<ListItemData>[];
  classForDropDown: string;
}

function NavigationItems({
  className,
  onClick,
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
            navData={navData}
            classForDropDown={classForDropDown}
          />
        ))}
      </ul>
    </>
  );
}

export default NavigationItems;
