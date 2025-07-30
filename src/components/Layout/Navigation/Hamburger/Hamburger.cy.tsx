import { mount } from "cypress/react";

import Hamburger from "@/components/Layout/Navigation/Hamburger/Hamburger";
import mockUseMobileNav from "@cypress/mock/mockUseMobileNav";

describe("Hamburger Component", () => {
  const hamburgerElement = 'button[aria-label="Open main navigation"]';
  const boxInnerElement = ".box__inner";
  let onClickSpy: () => void;

  beforeEach(() => {
    onClickSpy = cy.stub().as("onClickSpy");
  });

  it("should be visible on viewports smaller than 64rem (e.g., mobile/tablet)", () => {
    //Testing at the breakpoint
    cy.viewport("ipad-mini");
    mount(<Hamburger onClick={onClickSpy} />);

    cy.get(hamburgerElement).should("be.visible");
    //Testing exactly below the breakpoint
    cy.viewport(1023, 768);
    mount(<Hamburger onClick={onClickSpy} />);
    cy.get(hamburgerElement).should("be.visible");
  });

  it("should NOT be visible on viewports larger than or equal to 64rem (e.g., desktop)", () => {
    //Testing at the breakpoint
    cy.viewport("ipad-mini", "landscape");
    mount(<Hamburger onClick={onClickSpy} />);
    cy.get(hamburgerElement).should("not.be.visible");

    cy.viewport("macbook-11"); // A typical desktop size
    mount(<Hamburger onClick={onClickSpy} />);
    cy.get(hamburgerElement).should("not.be.visible");
  });

  it("applies correct styles when the mobile menu is CLOSED", () => {
    const useMobileNavMock = mockUseMobileNav(false);

    cy.mount(
      <Hamburger onClick={onClickSpy} useMobileNav={useMobileNavMock} />,
    );

    cy.get(boxInnerElement).should("have.class", "box__inner--side-nav-closed");
    cy.get(boxInnerElement).should(
      "not.have.class",
      "box__inner--side-nav-open",
    );
  });

  it("applies correct styles when the mobile menu is OPEN", () => {
    const useMobileNavMock = mockUseMobileNav(true);

    cy.mount(
      <Hamburger onClick={onClickSpy} useMobileNav={useMobileNavMock} />,
    );

    cy.get(boxInnerElement).should("have.class", "box__inner--side-nav-open");
    cy.get(boxInnerElement).should(
      "not.have.class",
      "box__inner--side-nav-closed",
    );
  });

  it("calls both onClickSpy and useMobileNavClickHandler when clicked", () => {
    const useMobileNavMock = mockUseMobileNav(false);

    mount(<Hamburger onClick={onClickSpy} useMobileNav={useMobileNavMock} />);

    cy.get(hamburgerElement).click();
    cy.get("@onClickSpy").should("have.been.calledOnce");
    cy.get("@useMobileNavClickHandler").should("have.been.calledOnce");
  });
});
