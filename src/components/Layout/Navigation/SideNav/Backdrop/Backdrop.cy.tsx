import { mount } from "cypress/react";

import Backdrop from "@/components/Layout/Navigation/SideNav/Backdrop/Backdrop";
import mockUseMobileNav from "@cypress/mock/mockUseMobileNav";

describe("Backdrop component", () => {
  let onClickSpy: () => void;
  beforeEach(() => {
    onClickSpy = cy.stub().as("onClickSpy");
  });

  it("applies blur class when isMenuOpen is TRUE", () => {
    const useMobileNavMock = mockUseMobileNav(true);
    const backdrop = "div[data-testid=backdrop]";

    mount(<Backdrop useMobileNav={useMobileNavMock} onClick={onClickSpy} />);

    cy.get(backdrop).should("have.class", "backdrop-blur-md");
  });

  it("does not apply blur class when isMenuOpen is FALSE", () => {
    const useMobileNavMock = mockUseMobileNav(false);
    const backdrop = "div[data-testid=backdrop]";

    mount(<Backdrop useMobileNav={useMobileNavMock} onClick={onClickSpy} />);

    cy.get(backdrop).should("not.have.class", "backdrop-blur-md");
  });

  it("invokes both onClick prop and onBackdropClick when the backdrop is clicked", () => {
    const useMobileNavMock = mockUseMobileNav(true);
    const backdrop = "div[data-testid=backdrop]";

    mount(<Backdrop useMobileNav={useMobileNavMock} onClick={onClickSpy} />);
    cy.get(backdrop).click();

    cy.get("@onClickSpy").should("have.been.calledOnce");
    cy.get("@useMobileNavClickHandler").should("have.been.calledOnce");
  });
});
