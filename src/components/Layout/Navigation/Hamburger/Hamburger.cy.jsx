import { mount } from "cypress/react";

import Hamburger from "@/components/Layout/Navigation/Hamburger/Hamburger";
import useMobileNav from "@/hooks/useMobileNav";

describe("Hamburger Component", () => {
  const hamburgerElement = 'button[aria-label="Open main navigation"]';
  const boxInnerElement = ".box__inner";

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
  it("applies correct styles when the mobile menu is closed", () => {
    cy.stub()
      .as(useMobileNav, "default")
      .returns({
        isMenuOpen: false,
        onClickHandler: cy.stub().as("onClickHandler"),
      });

    const onClickSpy = cy.spy().as("OnClickSpy");

    mount(<Hamburger onClick={onClickSpy} />);

    cy.get(boxInnerElement).should("have.class", "box__inner--side-nav-closed");
    cy.get(boxInnerElement).should(
      "not.have.class",
      "box__inner--side-nav-open",
    );
  });
});
