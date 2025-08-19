import { mount } from "cypress/react";

import Backdrop from "@/components/Layout/Navigation/SideNav/Backdrop/Backdrop";
import MockProvider from "@cypress/mock/mockContextProvider";
import mockUseMobileNav from "@cypress/mock/mockUseMobileNav";

describe("Backdrop component", () => {
  let onClickSpy: () => void;
  const customProviderValue = {
    isMenuOpen: true,
    menuToggleHandler: () => {},
    closeSideNavHandler: () => {},
  };

  beforeEach(() => {
    cy.viewport("iphone-xr");
    onClickSpy = cy.stub().as("onClickSpy");
  });

  it("applies blur class when isMenuOpen is TRUE", () => {
    const useMobileNavMock = mockUseMobileNav();
    const backdrop = "div[data-testid=backdrop]";

    mount(
      <MockProvider value={customProviderValue}>
        <Backdrop useMobileNav={useMobileNavMock} onClick={onClickSpy} />
      </MockProvider>,
    );

    cy.get(backdrop).should("have.class", "backdrop-blur-md");
  });

  it("does not apply blur class when isMenuOpen is FALSE", () => {
    const useMobileNavMock = mockUseMobileNav();
    const backdrop = "div[data-testid=backdrop]";

    mount(
      <MockProvider>
        <Backdrop useMobileNav={useMobileNavMock} onClick={onClickSpy} />
      </MockProvider>,
    );

    cy.get(backdrop).should("not.have.class", "backdrop-blur-md");
  });

  it("invokes both onClick prop and onBackdropClick when the backdrop is clicked", () => {
    const useMobileNavMock = mockUseMobileNav();
    const backdrop = "div[data-testid=backdrop]";

    mount(
      <MockProvider value={customProviderValue}>
        <Backdrop useMobileNav={useMobileNavMock} onClick={onClickSpy} />
      </MockProvider>,
    );
    cy.get(backdrop).click();

    cy.get("@onClickSpy").should("have.been.calledOnce");
    cy.get("@useMobileNavClickHandler").should("have.been.calledOnce");
  });
});
