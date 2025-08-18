import { mount } from "cypress/react";

import Hamburger from "@/components/Layout/Navigation/Hamburger/Hamburger";
import MockProvider from "@cypress/mock/mockContextProvider";
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
    mount(
      <MockProvider>
        <Hamburger onClick={onClickSpy} />
      </MockProvider>,
    );

    cy.get(hamburgerElement).should("be.visible");
    //Testing exactly below the breakpoint
    cy.viewport(1023, 768);
    mount(
      <MockProvider>
        <Hamburger onClick={onClickSpy} />
      </MockProvider>,
    );
    cy.get(hamburgerElement).should("be.visible");
  });

  it("should NOT be visible on viewports larger than or equal to 64rem (e.g., desktop)", () => {
    //Testing at the breakpoint
    cy.viewport("ipad-mini", "landscape");
    mount(
      <MockProvider>
        <Hamburger onClick={onClickSpy} />
      </MockProvider>,
    );
    cy.get(hamburgerElement).should("not.be.visible");

    cy.viewport("macbook-11"); // A typical desktop size
    mount(
      <MockProvider>
        <Hamburger onClick={onClickSpy} />
      </MockProvider>,
    );
    cy.get(hamburgerElement).should("not.be.visible");
  });

  it("applies correct styles when the mobile menu is CLOSED", () => {
    const useMobileNavMock = mockUseMobileNav();

    cy.mount(
      <MockProvider>
        <Hamburger onClick={onClickSpy} useMobileNav={useMobileNavMock} />
      </MockProvider>,
    );

    cy.get(boxInnerElement).should("have.class", "box__inner--side-nav-closed");
    cy.get(boxInnerElement).should(
      "not.have.class",
      "box__inner--side-nav-open",
    );
  });

  it("applies correct styles when the mobile menu is OPEN", () => {
    const useMobileNavMock = mockUseMobileNav();

    const customValue = {
      isMenuOpen: true,
      menuToggleHandler: () => {},
      closeSideNavHandler: () => {},
    };

    cy.mount(
      <MockProvider value={customValue}>
        <Hamburger onClick={onClickSpy} useMobileNav={useMobileNavMock} />
      </MockProvider>,
    );

    cy.get(boxInnerElement).should("have.class", "box__inner--side-nav-open");
    cy.get(boxInnerElement).should(
      "not.have.class",
      "box__inner--side-nav-closed",
    );
  });

  it("calls both onClickSpy and useMobileNavClickHandler when clicked", () => {
    const useMobileNavMock = mockUseMobileNav();

    mount(<Hamburger onClick={onClickSpy} useMobileNav={useMobileNavMock} />);

    cy.get(hamburgerElement).click();
    cy.get("@onClickSpy").should("have.been.calledOnce");
    cy.get("@useMobileNavClickHandler").should("have.been.calledOnce");
  });
});
