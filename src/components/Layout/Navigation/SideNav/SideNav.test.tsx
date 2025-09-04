jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: React.ReactNode) => node,
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { render, screen } from "@testing-library/react";

import MockProvider from "@/test-utils/mockContextProvider";
import { mockNavData } from "@/test-utils/mockData";
import SideNav from "@/components/Layout/Navigation/SideNav/SideNav";

describe("SideNav component", () => {
  const mockOnBackdropClick = jest.fn();
  const customProviderValue = {
    isMenuOpen: true,
    menuToggleHandler: () => {},
    closeSideNavHandler: () => {},
  };

  it("renders an overlay when isMenuOpen is TRUE", () => {
    render(
      <MockProvider value={customProviderValue}>
        <SideNav navData={mockNavData} onBackdropClick={mockOnBackdropClick} />
      </MockProvider>,
    );

    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).toBeVisible();
  });

  it("does not render an overlay when isMenuOpen is FALSE", () => {
    render(
      <MockProvider>
        <SideNav navData={mockNavData} onBackdropClick={mockOnBackdropClick} />
      </MockProvider>,
    );

    const backdrop = screen.queryByTestId("backdrop");
    expect(backdrop).not.toBeInTheDocument();
  });

  it("renders mobile nav and sets aria-hidden to false when isMenuOpen is TRUE", () => {
    render(
      <MockProvider value={customProviderValue}>
        <SideNav navData={mockNavData} onBackdropClick={mockOnBackdropClick} />
      </MockProvider>,
    );

    const mainMobileNav = screen.getByLabelText("Main mobile navigation");

    expect(mainMobileNav).toBeVisible();
    expect(mainMobileNav).toHaveAttribute("aria-hidden", "false");
  });

  it("does not render mobile nav when isMenuOpen is FALSE", () => {
    render(
      <MockProvider>
        <SideNav navData={mockNavData} onBackdropClick={mockOnBackdropClick} />
      </MockProvider>,
    );

    const mainMobileNav = screen.queryByLabelText("Main mobile navigation");
    expect(mainMobileNav).not.toBeInTheDocument();
  });

  it("calls closeSideNavHandler when viewport is ≥ 1024px", () => {
    const closeSideNavMock = jest.fn();

    const customProviderValue = {
      isMenuOpen: true,
      menuToggleHandler: () => {},
      closeSideNavHandler: closeSideNavMock,
    };

    render(
      <MockProvider value={customProviderValue}>
        <SideNav navData={mockNavData} onBackdropClick={mockOnBackdropClick} />
      </MockProvider>,
    );

    document.body.classList.add("overflow-hidden");

    (window.innerWidth as number) = 1200;
    window.dispatchEvent(new Event("resize"));

    expect(closeSideNavMock).toHaveBeenCalledTimes(1);
    expect(document.body).not.toHaveClass("overflow-hidden");
  });
});
