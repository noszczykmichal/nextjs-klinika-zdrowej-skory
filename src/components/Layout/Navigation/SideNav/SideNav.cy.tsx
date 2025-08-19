import { mount } from "cypress/react";

import mockUseMobileNav, {
  MockUseMobileNavType,
} from "@cypress/mock/mockUseMobileNav";
import MockProvider from "@cypress/mock/mockContextProvider";
import { mockNavData } from "@cypress/mock/navigation";
import SideNav from "./SideNav";

describe("SideNav component", () => {
  const backdrop = "div[data-testid=backdrop]";
  const mainMobileNav = "aside[aria-label='Main mobile navigation']";
  const mockPathname = () => "/";
  let mockOnBackdropClick: Cypress.Agent<sinon.SinonSpy>;
  let useMobileNavMock: MockUseMobileNavType;

  beforeEach(() => {
    cy.viewport("iphone-xr");

    if (!document.getElementById("overlay-root")) {
      const div = document.createElement("div");
      div.setAttribute("id", "overlay-root");
      document.body.appendChild(div);
    }

    mockOnBackdropClick = cy.stub().as("onBackdropClickSpy");
    useMobileNavMock = mockUseMobileNav();
  });

  it("renders overlay when isMenuOpen is TRUE", () => {
    const customProviderValue = {
      isMenuOpen: true,
      menuToggleHandler: () => {},
      closeSideNavHandler: () => {},
    };

    mount(
      <MockProvider value={customProviderValue}>
        <SideNav
          navData={mockNavData}
          usePathname={mockPathname}
          onBackdropClick={mockOnBackdropClick}
          useMobileNav={useMobileNavMock}
        />
      </MockProvider>,
    );

    cy.get(backdrop).should("exist");
  });

  it("renders overlay when isMenuOpen is FALSE", () => {
    mount(
      <MockProvider>
        <SideNav
          navData={mockNavData}
          usePathname={mockPathname}
          onBackdropClick={mockOnBackdropClick}
          useMobileNav={useMobileNavMock}
        />
      </MockProvider>,
    );

    cy.get(backdrop).should("not.exist");
  });

  it("renders mobile nav  and sets aria-hidden to false when isMenuOpen is TRUE", () => {
    const customProviderValue = {
      isMenuOpen: true,
      menuToggleHandler: () => {},
      closeSideNavHandler: () => {},
    };

    mount(
      <MockProvider value={customProviderValue}>
        <SideNav
          navData={mockNavData}
          usePathname={mockPathname}
          onBackdropClick={mockOnBackdropClick}
          useMobileNav={useMobileNavMock}
        />
      </MockProvider>,
    );

    cy.get(mainMobileNav).should("be.visible");
    cy.get(mainMobileNav).should("have.attr", "aria-hidden", "false");
  });

  it("does not render mobile nav when isMenuOpen is FALSE", () => {
    mount(
      <MockProvider>
        <SideNav
          navData={mockNavData}
          usePathname={mockPathname}
          onBackdropClick={mockOnBackdropClick}
          useMobileNav={useMobileNavMock}
        />
      </MockProvider>,
    );

    cy.get(mainMobileNav).should("not.exist");
  });

  it("calls closeSideNavHandler when viewport is ≥ 1024px", () => {
    const closeSideNavSpy = cy.stub().as("closeSideNavSpy");

    const customProviderValue = {
      isMenuOpen: true,
      menuToggleHandler: () => {},
      closeSideNavHandler: closeSideNavSpy,
    };

    cy.viewport(1023, 768); // below breakpoint

    mount(
      <MockProvider value={customProviderValue}>
        <SideNav
          navData={mockNavData}
          usePathname={mockPathname}
          onBackdropClick={mockOnBackdropClick}
          useMobileNav={useMobileNavMock}
        />
      </MockProvider>,
    );

    cy.viewport(1024, 768); //at the breakpoint

    cy.get("@closeSideNavSpy").should("have.been.called");
  });
});
