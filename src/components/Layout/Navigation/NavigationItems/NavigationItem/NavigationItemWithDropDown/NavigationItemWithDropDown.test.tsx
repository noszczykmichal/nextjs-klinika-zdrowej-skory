jest.mock("next/navigation", () => ({
  usePathname: () => "/zabiegi/holistyczne-zabiegi-na-twarz",
}));

import { render, screen, fireEvent } from "@testing-library/react";

import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavigationItemWithDropDown from "@/components/Layout/Navigation/NavigationItems/NavigationItem/NavigationItemWithDropDown/NavigationItemWithDropDown";
import { mockNavData } from "@/test-utils/mockData";

describe("NavigationItemWithDropDown", () => {
  const linkClasses =
    "lg:px-[20px] hover:!bg-transparent focus:!bg-transparent active:!bg-transparent font-normal py-0";
  const contentClasses = `relative whitespace-nowrap before:absolute before:bottom-[-5px] py-[10px] before:left-0 before:h-[1px] before:bg-[var(--magenta-100)] before:transition-all before:duration-300 before:content-[''] hover:text-[var(--magenta-100)] hover:before:w-full active:before:w-full focus:before:w-full`;

  const mockLinkData = {
    id: "zabiegi",
    label: "Zabiegi",
    href: "/zabiegi",
  };

  it("applies active link styling when pathname matches href", () => {
    render(
      <NavigationMenu>
        <NavigationItemWithDropDown
          linkData={mockLinkData}
          navData={mockNavData}
          linkClasses={linkClasses}
          contentClasses={contentClasses}
        />
      </NavigationMenu>,
    );

    const dropDownTrigger = screen.getByRole("button");

    fireEvent.click(dropDownTrigger);
    const testedLink = screen.getByText(mockNavData[0].title);

    expect(testedLink).toHaveClass(
      "before:w-full",
      "text-[var(--magenta-100)]",
    );
    expect(testedLink).not.toHaveClass("before:w-[0px]");
  });

  it("does not apply active styling when pathname does not match href", () => {
    render(
      <NavigationMenu>
        <NavigationItemWithDropDown
          linkData={mockLinkData}
          navData={mockNavData}
          linkClasses={linkClasses}
          contentClasses={contentClasses}
        />
      </NavigationMenu>,
    );

    const dropDownTrigger = screen.getByRole("button");
    fireEvent.click(dropDownTrigger);
    const testedLink = screen.getByText(mockNavData[1].title);

    expect(testedLink).toHaveClass("before:w-[0px]");
    expect(testedLink).not.toHaveClass(
      "before:w-full",
      "text-[var(--magenta-100)]",
    );
  });
});
