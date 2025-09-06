import { render, screen } from "@testing-library/react";
import StyledButton from "@/components/ui/custom/StyledButton/StyledButton";

describe("StyledButton component", () => {
  const innerText = "about";
  const testHref = "/about";

  it("renders a link with the correct text and href", () => {
    render(<StyledButton href={testHref}>{innerText}</StyledButton>);

    const styledButton = screen.getByRole("link");

    expect(styledButton).toHaveTextContent(innerText);
    expect(styledButton).toHaveAttribute("href", testHref);
  });

  it("applies the aria-label when provided", () => {
    const testAriaLabel = "about link";

    render(
      <StyledButton href={testHref} ariaLabel={testAriaLabel}>
        {innerText}
      </StyledButton>,
    );

    const styledButton = screen.getByRole("link");

    expect(styledButton).toHaveAttribute("aria-label", testAriaLabel);
  });

  it("uses default wrapper classes when none are provided", () => {
    render(<StyledButton href={testHref}>{innerText}</StyledButton>);

    const styledButton = screen.getByRole("link");

    expect(styledButton).toHaveClass("h-[36px] max-w-[100px]");
  });

  it("applies custom wrapper classes when provided", () => {
    const customWrapperClasses = "bg-red-900";

    render(
      <StyledButton href={testHref} wrapperClasses={customWrapperClasses}>
        {innerText}
      </StyledButton>,
    );

    const styledButton = screen.getByRole("link");

    expect(styledButton).toHaveClass(customWrapperClasses);
  });

  it("applies custom content classes when provided", () => {
    const customContentClasses = "bg-red-900";

    render(
      <StyledButton href={testHref} contentClasses={customContentClasses}>
        {innerText}
      </StyledButton>,
    );

    const styledButton = screen.getByRole("link");
    const contentElement = styledButton.querySelector("span");

    expect(contentElement).toHaveClass(customContentClasses);
  });
});
