import { render, screen } from "@testing-library/react";

import MainBanner from "@/components/HomePage/MainBanner/MainBanner";

describe("MainBanner component", () => {
  const headerText = "Test Header";

  it("renders the header text", () => {
    render(<MainBanner headerText={headerText} />);

    const h1Element = screen.getByRole("heading", { level: 1 });
    expect(h1Element).toBeInTheDocument();
    expect(h1Element).toHaveTextContent(headerText);
  });

  it("uses default alt when customAlt is not provided", () => {
    render(<MainBanner headerText={headerText} />);

    const imgElement = screen.getByAltText(/Olga Noszczyk/i);

    expect(imgElement).toBeInTheDocument();
  });

  it("uses customAlt when provided", () => {
    const customAlt = "Custom alt text";

    render(<MainBanner headerText={headerText} customAlt={customAlt} />);

    const imgElement = screen.getByAltText(customAlt);
    expect(imgElement).toBeInTheDocument();
  });
});
