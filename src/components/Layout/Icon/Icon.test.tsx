import { render, screen } from "@testing-library/react";

import Icon from "@/components/Layout/Icon/Icon";
import { IconVariants } from "@/types/types";

describe("Icon component", () => {
  const testHref = "https://example.com/";

  it.each<[IconVariants, string]>([
    ["facebook", "Facebook"],
    ["instagram", "Instagram"],
    ["booksy", "Booksy"],
  ])(
    "renders the %s link with an accessible name and new tab attributes",
    (name, label) => {
      render(<Icon name={name} href={testHref} className="test-class" />);

      const link = screen.getByRole("link", {
        name: `${label} (otwiera się w nowej karcie)`,
      });

      expect(link).toHaveAttribute("href", testHref);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link.querySelector("svg")).toBeInTheDocument();
    },
  );

  it("passes className to the Booksy icon", () => {
    render(<Icon name="booksy" href={testHref} className="test-class" />);

    expect(screen.getByRole("link").querySelector("svg")).toHaveClass(
      "test-class",
    );
  });
});
