import { mount } from "cypress/react";

import { mockNavData } from "@cypress/mock/navigation";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavigationItem from "@/components/Layout/Navigation/NavigationItems/NavigationItem/NavigationItem";

describe("NavigationItem Component", () => {
  it("applies active link styling when pathname matches href", () => {
    const mockUsePathname = () => "/blog";
    const mockLinkData = {
      id: "blog",
      label: "Blog",
      href: "/blog",
    };

    mount(
      <NavigationMenu>
        <NavigationItem
          linkData={mockLinkData}
          navData={mockNavData}
          isMobileNav={true}
          usePathname={mockUsePathname}
        />
      </NavigationMenu>,
    );

    cy.get(`[data-testid=${mockLinkData.id}] span`)
      .should("have.class", "before:w-full")
      .and("have.class", "text-[var(--magenta-100)]");
  });

  it("does not apply active styling when pathname does not match href", () => {
    const mockUsePathname = () => "/zabiegi";
    const mockLinkData = {
      id: "blog",
      label: "Blog",
      href: "/blog",
    };

    mount(
      <NavigationMenu>
        <NavigationItem
          linkData={mockLinkData}
          navData={mockNavData}
          isMobileNav={true}
          usePathname={mockUsePathname}
        />
      </NavigationMenu>,
    );

    cy.get(`[data-testid=${mockLinkData.id}] span`).should(
      "have.class",
      "before:w-[0px]",
    );
  });

  it("renders dropdown navigation structure for 'zabiegi' on desktop", () => {
    const mainNavigationElement = 'nav[aria-label="Main"]';
    const dropDownTrigger = `${mainNavigationElement} button[data-slot="navigation-menu-trigger"]`;
    const dropDownElement = 'div[data-slot="navigation-menu-content"]';

    const mockUsePathname = () => "/zabiegi";

    const mockLinkData = {
      id: "zabiegi",
      label: "Zabiegi",
      href: "/zabiegi",
    };

    mount(
      <NavigationMenu>
        <NavigationItem
          linkData={mockLinkData}
          navData={mockNavData}
          isMobileNav={false}
          usePathname={mockUsePathname}
        />
      </NavigationMenu>,
    );

    cy.get(dropDownTrigger).should("exist");
    cy.get(dropDownTrigger).click();
    cy.get(dropDownElement).should("exist");
  });

  it("shows the accordion navigation structure for 'zabiegi' on mobile", () => {
    const accordionItemElement = 'div[data-slot="accordion-item"]';
    const mockUsePathname = () => "/zabiegi";

    const mockLinkData = {
      id: "zabiegi",
      label: "Zabiegi",
      href: "/zabiegi",
    };

    mount(
      <NavigationMenu>
        <NavigationItem
          linkData={mockLinkData}
          navData={mockNavData}
          isMobileNav={true}
          usePathname={mockUsePathname}
        />
      </NavigationMenu>,
    );

    cy.get(accordionItemElement).should("exist");
    cy.get(accordionItemElement).should("have.attr", "data-state", "closed");
  });
});
