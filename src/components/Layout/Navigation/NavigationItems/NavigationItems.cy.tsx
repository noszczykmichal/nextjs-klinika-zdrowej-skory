import { mount } from "cypress/react";

import NavigationItems from "./NavigationItems";
import { mockNavData } from "@cypress/mock/navigation";
import { navConfig } from "@/utils/config";

describe("NavigationItems component", () => {
  it("renders an unordered list with the same number of child elements as navConfig items", () => {
    cy.viewport("macbook-11");
    const mockPathname = () => "/";

    mount(
      <NavigationItems
        navData={mockNavData}
        listClasses="hidden h-full gap-0 lg:flex"
        usePathname={mockPathname}
      />,
    );

    cy.get('ul[data-slot="navigation-menu-list"]').should("exist");
    cy.get('ul[data-slot="navigation-menu-list"]')
      .children("li")
      .should("have.length", navConfig.length);
  });
});
