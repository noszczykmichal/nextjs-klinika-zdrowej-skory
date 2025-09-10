import { render, screen } from "@testing-library/react";

import BannerWithSummary from "@/components/ui/custom/BannerWithSummary/BannerWithSummary";

describe("BannerWithSummary component", () => {
  const mockBannerData = {
    title: "Test Header",
    summary: "Test summary text",
    imageData: {
      img: {
        src: "/test-image.jpg",
        height: 600,
        width: 800,
      },
      base64:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
      pixels: [
        [
          { r: 255, g: 0, b: 0, a: 255 },
          { r: 0, g: 255, b: 0, a: 255 },
        ],
        [
          { r: 0, g: 0, b: 255, a: 255 },
          { r: 128, g: 128, b: 128, a: 255 },
        ],
      ],
    },
    altForMainImage: "Test alt text",
  };

  it("renders header text and summary", () => {
    render(<BannerWithSummary bannerData={mockBannerData} />);

    const h1Element = screen.getByRole("heading", { level: 1 });

    expect(h1Element).toHaveTextContent(mockBannerData.title);
    expect(screen.getByText(mockBannerData.summary)).toBeInTheDocument();
  });

  it("renders alt text for dynamic image", () => {
    render(<BannerWithSummary bannerData={mockBannerData} />);

    const rightBanner = screen.getByRole("img");

    expect(rightBanner).toHaveAttribute("alt", mockBannerData.altForMainImage);
  });

  it("does not render dynamic image when imageData is null", () => {
    const bannerDataWithoutImage = {
      ...mockBannerData,
      imageData: null,
    };

    render(<BannerWithSummary bannerData={bannerDataWithoutImage} />);

    //left banner has an empty alt attribute value so it won't be treated as img
    const rightBanner = screen.queryByRole("img");
    expect(rightBanner).toBeNull();
  });

  it("handles missing base64 placeholder gracefully", () => {
    const bannerDataWithoutBase64 = {
      ...mockBannerData,
      imageData: {
        img: {
          src: "/test-image.jpg",
          height: 600,
          width: 800,
        },
        base64: "",
        pixels: [],
      },
    };

    render(<BannerWithSummary bannerData={bannerDataWithoutBase64} />);

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("alt", mockBannerData.altForMainImage);
  });
});
