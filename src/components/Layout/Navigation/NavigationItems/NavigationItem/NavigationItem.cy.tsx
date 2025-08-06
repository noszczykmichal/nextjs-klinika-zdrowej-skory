import { MouseEvent } from "react";
import { mount } from "cypress/react";

import { mockNavData } from "@cypress/mock/navigation";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavigationItem from "@/components/Layout/Navigation/NavigationItems/NavigationItem/NavigationItem";

describe("NavigationItem Component", () => {
  const mainNavigationElement = 'nav[aria-label="Main"]';

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

  it("renders the dropdown navigation for 'zabiegi' when isMobileNav is false", () => {
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

  it("renders the accordion navigation for 'zabiegi' when isMobileNav is true", () => {
    const accordionContentElement = 'div[data-slot="accordion-content"]';
    const accordionTriggerElement = 'button[data-slot="accordion-trigger"]';
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

    cy.get(accordionContentElement).should("not.be.visible");
    cy.get(accordionContentElement).should("have.attr", "data-state", "closed");
    cy.get(accordionTriggerElement).click();
    cy.get(accordionContentElement).should("be.visible");
    cy.get(accordionContentElement).should("have.attr", "data-state", "open");
  });

  it("correctly invokes onClick handler when the link is clicked", () => {
    const mockLinkData = { id: "o-nas", label: "O nas", href: "/o-nas" };
    const aboutUsLink = `${mainNavigationElement} a:contains(${mockLinkData.label})`;
    const onClickSpy = cy.stub().as("onClickSpy");
    const mockUsePathname = () => "/";

    const onClickHandler = (e?: MouseEvent) => {
      e?.preventDefault();
      onClickSpy();
    };

    mount(
      <NavigationMenu>
        <NavigationItem
          linkData={mockLinkData}
          navData={mockNavData}
          isMobileNav={false}
          usePathname={mockUsePathname}
          onLinkClick={onClickHandler}
        />
      </NavigationMenu>,
    );

    cy.get(aboutUsLink).should("exist");
    cy.get(aboutUsLink).click();
    cy.get("@onClickSpy").should("have.been.calledOnce");
  });
});
