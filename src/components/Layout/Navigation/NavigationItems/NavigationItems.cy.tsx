import { mount } from "cypress/react";

import NavigationItems from "./NavigationItems";
import { mockNavData } from "@cypress/mock/navigation";

describe("NavigationItems component", () => {
  it("render", () => {
    cy.viewport("macbook-11");

    mount(
      <NavigationItems
        navData={mockNavData}
        listClasses="hidden h-full gap-0 lg:flex"
        usePathname={() => "/"}
      />,
    );

    cy.get('ul[data-slot="navigation-menu-list"]').should("exist");
    cy.get('ul[data-slot="navigation-menu-list"]')
      .children("li")
      .should("have.length", 4);
  });
});
