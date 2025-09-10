import { render, screen } from "@testing-library/react";
import { urlFor } from "@/utils/clientSideUtils";

import ImageCard from "@/components/ui/custom/ItemsList/ListItem/ImageCard/ImageCard";
import { ListItemData } from "@/types/types";

jest.mock("@/utils/clientSideUtils", () => ({
  urlFor: jest.fn(),
}));

describe("ImageCard component", () => {
  const mockItemData: ListItemData = {
    _id: "1",
    slug: { current: "test-slug" },
    category: {
      title: "Test Category",
      categorySlug: { current: "test-category" },
    },
    title: "Test Title",
    summary: "Test summary",
    mainImage: {
      _type: "image",
      asset: { _ref: "test-image", _type: "reference" },
    },
    altForMainImage: "Test alt text",
    imageData: null,
  };

  const rootRoute = "blog";

  beforeEach(() => {
    (urlFor as jest.Mock).mockReturnValue({
      fit: () => ({ url: () => "https://example.com/test.jpg" }),
    });
  });

  it("renders link with correct href", () => {
    const { category, slug } = mockItemData;
    const { categorySlug } = category;

    render(<ImageCard itemData={mockItemData} rootRoute={rootRoute} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      `/${rootRoute}/${categorySlug.current}/${slug.current}`,
    );
  });

  it("renders image with correct alt", () => {
    render(<ImageCard itemData={mockItemData} rootRoute={rootRoute} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Test alt text");
  });

  it("renders category title inside overlay", () => {
    render(<ImageCard itemData={mockItemData} rootRoute={rootRoute} />);

    expect(screen.getByText("Test Category")).toBeInTheDocument();
  });
});
