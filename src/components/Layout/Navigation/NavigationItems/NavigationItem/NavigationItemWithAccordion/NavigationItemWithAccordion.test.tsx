jest.mock("next/navigation", () => ({
  usePathname: () => "/zabiegi/holistyczne-zabiegi-na-twarz",
}));

import { render, fireEvent, screen } from "@testing-library/react";

import NavigationItemWithAccordion from "@/components/Layout/Navigation/NavigationItems/NavigationItem/NavigationItemWithAccordion/NavigationItemWithAccordion";
import { mockNavData } from "@/test-utils/mockData";

describe("NavigationItemWithAccordion Component", () => {
  const contentClasses = `relative whitespace-nowrap before:absolute before:bottom-[-5px] py-[10px] before:left-0 before:h-[1px] before:bg-[var(--magenta-100)] before:transition-all before:duration-300 before:content-[''] hover:text-[var(--magenta-100)] hover:before:w-full active:before:w-full focus:before:w-full`;
  const mockLinkData = {
    id: "zabiegi",
    label: "Zabiegi",
    href: "/zabiegi",
  };

  it("applies active link styling when pathname matches href", () => {
    render(
      <NavigationItemWithAccordion
        linkData={mockLinkData}
        navData={mockNavData}
        contentClasses={contentClasses}
      />,
    );

    const accordionTriggerElement = screen.getByRole("button");

    fireEvent.click(accordionTriggerElement);
    const testedLink = screen.getByText(mockNavData[0].title);

    expect(testedLink).toHaveClass(
      "before:w-full",
      "text-[var(--magenta-100)]",
    );
  });

  it("does not apply active styling when pathname does not match href", () => {
    render(
      <NavigationItemWithAccordion
        linkData={mockLinkData}
        navData={mockNavData}
        contentClasses={contentClasses}
      />,
    );

    const accordionTriggerElement = screen.getByRole("button");

    fireEvent.click(accordionTriggerElement);
    const testedLink = screen.getByText(mockNavData[1].title);

    expect(testedLink).toHaveClass("before:w-[0px]");
  });

  it("calls onClick handler when a link in the accordion is clicked", () => {
    const onClickMock = jest.fn();

    render(
      <NavigationItemWithAccordion
        linkData={mockLinkData}
        navData={mockNavData}
        contentClasses={contentClasses}
        onLinkClick={onClickMock}
      />,
    );

    const accordionTriggerElement = screen.getByRole("button");
    fireEvent.click(accordionTriggerElement);
    const testedLink = screen.getByText(mockNavData[0].title);
    fireEvent.click(testedLink);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
