const hookClickHandlerMock = jest.fn();

jest.mock("@/hooks/useMobileNav.ts", () => ({
  useMobileNav: () => ({ onClickHandler: hookClickHandlerMock }),
}));

import { render, screen } from "@testing-library/react";

import MockProvider from "@/test-utils/mockContextProvider";
import Hamburger from "@/components/Layout/Navigation/Hamburger/Hamburger";

describe("Hamburger component", () => {
  const onClickHandlerMock = jest.fn();
  const customProviderValue = {
    isMenuOpen: true,
    menuToggleHandler: () => {},
    closeSideNavHandler: () => {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("applies correct styles when the mobile menu is CLOSED", () => {
    render(
      <MockProvider>
        <Hamburger onClick={onClickHandlerMock} />
      </MockProvider>,
    );

    const hamburgerElement = screen.getByLabelText("Open main navigation");
    const innerDiv = hamburgerElement.querySelector(
      "div > div",
    ) as HTMLDivElement;

    expect(innerDiv).toHaveClass("box__inner box__inner--side-nav-closed");
    expect(innerDiv).not.toHaveClass("box__inner--side-nav-open");
  });

  it("applies correct styles when the mobile menu is OPEN", () => {
    const customProviderValue = {
      isMenuOpen: true,
      menuToggleHandler: () => {},
      closeSideNavHandler: () => {},
    };

    render(
      <MockProvider value={customProviderValue}>
        <Hamburger onClick={onClickHandlerMock} />
      </MockProvider>,
    );

    const hamburgerElement = screen.getByLabelText("Open main navigation");
    const innerDiv = hamburgerElement.querySelector(
      "div > div",
    ) as HTMLDivElement;

    expect(innerDiv).toHaveClass("box__inner box__inner--side-nav-open");
    expect(innerDiv).not.toHaveClass("box__inner--side-nav-closed");
  });

  it("calls the provided onClick and the useMobileNav handler on click", () => {
    render(
      <MockProvider value={customProviderValue}>
        <Hamburger onClick={onClickHandlerMock} />
      </MockProvider>,
    );

    const hamburgerElement = screen.getByLabelText("Open main navigation");
    hamburgerElement.click();

    expect(hookClickHandlerMock).toHaveBeenCalledTimes(1);
    expect(onClickHandlerMock).toHaveBeenCalledTimes(1);
  });

  it("sets aria-expanded=false when menu is closed", () => {
    render(
      <MockProvider>
        <Hamburger onClick={onClickHandlerMock} />
      </MockProvider>,
    );

    const hamburgerElement = screen.getByLabelText("Open main navigation");
    expect(hamburgerElement).toHaveAttribute("aria-expanded", "false");
  });

  it("sets aria-expanded=true when menu is open", () => {
    render(
      <MockProvider value={customProviderValue}>
        <Hamburger onClick={onClickHandlerMock} />
      </MockProvider>,
    );

    const hamburgerElement = screen.getByLabelText("Open main navigation");
    expect(hamburgerElement).toHaveAttribute("aria-expanded", "true");
  });
});
