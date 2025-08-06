import { mount } from "cypress/react";

import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavigationItemWithDropDown from "@/components/Layout/Navigation/NavigationItems/NavigationItem/NavigationItemWithDropDown/NavigationItemWithDropDown";
import { mockNavData } from "@cypress/mock/navigation";

describe("NavigationItemWithDropDown", () => {
  const linkClasses =
    "lg:px-[20px] hover:!bg-transparent focus:!bg-transparent active:!bg-transparent font-normal py-0";
  const contentClasses = `relative whitespace-nowrap before:absolute before:bottom-[-5px] py-[10px] before:left-0 before:h-[1px] before:bg-[var(--magenta-100)] before:transition-all before:duration-300 before:content-[''] hover:text-[var(--magenta-100)] hover:before:w-full active:before:w-full focus:before:w-full`;
  const mainNavigationElement = 'nav[aria-label="Main"]';
  const dropDownTrigger = `${mainNavigationElement} button[data-slot="navigation-menu-trigger"]`;
  const pathname = "/zabiegi/holistyczne-zabiegi-na-twarz";
  const mockLinkData = {
    id: "zabiegi",
    label: "Zabiegi",
    href: "/zabiegi",
  };

  it("applies active link styling when pathname matches href", () => {
    mount(
      <NavigationMenu>
        <NavigationItemWithDropDown
          linkData={mockLinkData}
          navData={mockNavData}
          linkClasses={linkClasses}
          contentClasses={contentClasses}
          pathname={pathname}
        />
      </NavigationMenu>,
    );

    cy.get(dropDownTrigger).click();
    cy.get(`a:contains(${mockNavData[0].title}) span`)
      .should("have.class", "before:w-full")
      .and("have.class", "text-[var(--magenta-100)]");
  });

  it("does not apply active styling when pathname does not match href", () => {
    mount(
      <NavigationMenu>
        <NavigationItemWithDropDown
          linkData={mockLinkData}
          navData={mockNavData}
          linkClasses={linkClasses}
          contentClasses={contentClasses}
          pathname={pathname}
        />
      </NavigationMenu>,
    );

    cy.get(dropDownTrigger).click();
    cy.get(`a:contains(${mockNavData[1].title}) span`).should(
      "have.class",
      "before:w-[0px]",
    );
  });
});
