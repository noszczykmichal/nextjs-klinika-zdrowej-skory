const hookClickHandlerMock = jest.fn();

jest.mock("@/hooks/useMobileNav.ts", () => ({
  useMobileNav: () => ({ onClickHandler: hookClickHandlerMock }),
}));

import { fireEvent, render, screen } from "@testing-library/react";

import Backdrop from "@/components/Layout/Navigation/SideNav/Backdrop/Backdrop";
import MockProvider from "@/test-utils/mockContextProvider";

describe("Backdrop component", () => {
  const customProviderValue = {
    isMenuOpen: true,
    menuToggleHandler: () => {},
    closeSideNavHandler: () => {},
  };
  const propsClickHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("applies blur class when isMenuOpen is TRUE", () => {
    render(
      <MockProvider value={customProviderValue}>
        <Backdrop onClick={propsClickHandler} />
      </MockProvider>,
    );

    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).toHaveClass("backdrop-blur-md");
  });

  it("does not apply blur class when isMenuOpen is FALSE", () => {
    render(
      <MockProvider>
        <Backdrop onClick={propsClickHandler} />
      </MockProvider>,
    );
    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).not.toHaveClass("backdrop-blur-md");
  });

  it("invokes both onClick prop and onBackdropClick when the backdrop is clicked", () => {
    render(
      <MockProvider value={customProviderValue}>
        <Backdrop onClick={propsClickHandler} />
      </MockProvider>,
    );

    const backdrop = screen.getByTestId("backdrop");
    fireEvent.click(backdrop);

    expect(hookClickHandlerMock).toHaveBeenCalledTimes(1);
    expect(propsClickHandler).toHaveBeenCalledTimes(1);
  });
});
