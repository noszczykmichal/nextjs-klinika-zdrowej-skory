jest.mock("next/navigation", () => ({
  usePathname: () => "/zabiegi",
}));

import { fireEvent, render, screen } from "@testing-library/react";

import { mockNavData } from "@/test-utils/mockData";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavigationItem from "@/components/Layout/Navigation/NavigationItems/NavigationItem/NavigationItem";
import nextNavigation from "next/navigation";

describe("NavigationItem Component", () => {
  let mockLinkData = {
    id: "blog",
    label: "Blog",
    href: "/blog",
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("applies active link styling when pathname matches href", () => {
    jest.spyOn(nextNavigation, "usePathname").mockReturnValue("/blog");

    render(
      <NavigationMenu>
        <NavigationItem
          linkData={mockLinkData}
          navData={mockNavData}
          isMobileNav={true}
        />
      </NavigationMenu>,
    );

    const testedLink = screen.getAllByTestId(mockLinkData.id);
    const spanInside = testedLink[0].querySelector("span");

    expect(spanInside).toHaveClass(
      "before:w-full",
      "text-[var(--magenta-100)]",
    );
    expect(spanInside).not.toHaveClass("before:w-[0px]");
  });

  it("does not apply active styling when pathname does not match href", () => {
    render(
      <NavigationMenu>
        <NavigationItem
          linkData={mockLinkData}
          navData={mockNavData}
          isMobileNav={true}
        />
      </NavigationMenu>,
    );

    const testedLink = screen.getAllByTestId(mockLinkData.id);
    const spanInside = testedLink[0].querySelector("span");

    expect(spanInside).toHaveClass("before:w-[0px]");
    expect(spanInside).not.toHaveClass(
      "before:w-full",
      "text-[var(--magenta-100)]",
    );
  });

  it("renders the dropdown navigation for 'zabiegi' when isMobileNav is false", () => {
    mockLinkData = {
      id: "zabiegi",
      label: "Zabiegi",
      href: "/zabiegi",
    };

    render(
      <NavigationMenu>
        <NavigationItem
          linkData={mockLinkData}
          navData={mockNavData}
          isMobileNav={false}
        />
      </NavigationMenu>,
    );

    const dropDownTrigger = screen.getByRole("button");

    fireEvent.click(dropDownTrigger);
    const dropDownElement = screen.getByTestId("dropDown");

    expect(dropDownElement).toBeVisible();
  });

  it("renders the accordion navigation for 'zabiegi' when isMobileNav is true", () => {
    mockLinkData = {
      id: "zabiegi",
      label: "Zabiegi",
      href: "/zabiegi",
    };

    render(
      <NavigationMenu>
        <NavigationItem
          linkData={mockLinkData}
          navData={mockNavData}
          isMobileNav={true}
        />
      </NavigationMenu>,
    );

    const accordionTriggerElement = screen.getByRole("button");
    const accordionContentElement = screen.getByTestId("accordionContent");

    expect(accordionContentElement).not.toBeVisible();
    expect(accordionContentElement).toHaveAttribute("data-state", "closed");
    fireEvent.click(accordionTriggerElement);
    expect(accordionContentElement).toBeVisible();
    expect(accordionContentElement).toHaveAttribute("data-state", "open");
  });

  it("correctly invokes onClick handler when the link is clicked", () => {
    mockLinkData = { id: "o-nas", label: "O nas", href: "/o-nas" };
    const onClickMock = jest.fn();

    render(
      <NavigationMenu>
        <NavigationItem
          linkData={mockLinkData}
          navData={mockNavData}
          isMobileNav={false}
          onLinkClick={onClickMock}
        />
      </NavigationMenu>,
    );

    const aboutUsLink = screen.getByText(mockLinkData.label);

    expect(aboutUsLink).toBeInTheDocument();
    fireEvent.click(aboutUsLink);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
