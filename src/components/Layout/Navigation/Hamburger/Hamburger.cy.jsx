import { mount } from "cypress/react";

import Hamburger from "@/components/Layout/Navigation/Hamburger/Hamburger";

describe("Hamburger Component", () => {
  const hamburgerElement = 'button[aria-label="Open main navigation"]';

  it("should be visible on viewports smaller than 64rem (e.g., mobile/tablet)", () => {
    //Testing at the breakpoint
    cy.viewport("ipad-mini");
    mount(<Hamburger onClick={() => {}} />);

    cy.get(hamburgerElement).should("be.visible");
    //Testing exactly below the breakpoint
    cy.viewport(1023, 768);
    mount(<Hamburger onClick={() => {}} />);
    cy.get(hamburgerElement).should("be.visible");
  });

  it("should NOT be visible on viewports larger than or equal to 64rem (e.g., desktop)", () => {
    //Testing at the breakpoint
    cy.viewport("ipad-mini", "landscape");
    mount(<Hamburger onClick={() => {}} />);
    cy.get(hamburgerElement).should("not.be.visible");

    cy.viewport("macbook-11"); // A typical desktop size
    mount(<Hamburger onClick={() => {}} />);
    cy.get(hamburgerElement).should("not.be.visible");
  });
});
