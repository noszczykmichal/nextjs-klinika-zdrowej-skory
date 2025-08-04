import { mount } from "cypress/react";

import { mockNavData } from "@cypress/mock/navigation";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavigationItemWithAccordion from "@/components/Layout/Navigation/NavigationItems/NavigationItem/NavigationItemWithAccordion/NavigationItemWithAccordion";

describe("NavigationItemWithAccordion Component", () => {
  const contentClasses = `relative whitespace-nowrap before:absolute before:bottom-[-5px] py-[10px] before:left-0 before:h-[1px] before:bg-[var(--magenta-100)] before:transition-all before:duration-300 before:content-[''] hover:text-[var(--magenta-100)] hover:before:w-full active:before:w-full focus:before:w-full`;
  const accordionItemElement = 'div[data-slot="accordion-item"]';
  const accordionTriggerElement = `${accordionItemElement} button[data-slot="accordion-trigger"]`;

  it("applies active link styling when pathname matches href", () => {
    const pathname = "/zabiegi/holistyczne-zabiegi-na-twarz";
    const mockLinkData = {
      id: "zabiegi",
      label: "Zabiegi",
      href: "/zabiegi",
    };

    mount(
      <NavigationMenu>
        <NavigationItemWithAccordion
          linkData={mockLinkData}
          navData={mockNavData}
          contentClasses={contentClasses}
          pathname={pathname}
        />
      </NavigationMenu>,
    );

    cy.get(accordionTriggerElement).click();
    cy.get(`a:contains(${mockNavData[0].title})`)
      .should("have.class", "before:w-full")
      .and("have.class", "text-[var(--magenta-100)]");
  });

  it("does not apply active styling when pathname does not match href", () => {
    const pathname = "/zabiegi/holistyczne-zabiegi-na-twarz";
    const mockLinkData = {
      id: "blog",
      label: "Blog",
      href: "/blog",
    };

    mount(
      <NavigationMenu>
        <NavigationItemWithAccordion
          linkData={mockLinkData}
          navData={mockNavData}
          contentClasses={contentClasses}
          pathname={pathname}
        />
      </NavigationMenu>,
    );

    cy.get(accordionTriggerElement).click();
    cy.get(`a:contains(${mockNavData[1].title})`).should(
      "have.class",
      "before:w-[0px]",
    );
  });
});
