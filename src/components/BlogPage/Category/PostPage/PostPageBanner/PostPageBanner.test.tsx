import { render, screen } from "@testing-library/react";

import PostPageBanner from "@/components/BlogPage/Category/PostPage/PostPageBanner/PostPageBanner";
import {
  mockPostDetailsWithTreatment,
  mockPostDetailsWithCategory,
} from "@/test-utils/mockData";

describe("PostPageBanner component", () => {
  it("renders correct heading", () => {
    render(<PostPageBanner postDetails={mockPostDetailsWithTreatment} />);

    const h1Element = screen.getByRole("heading", { level: 1 });

    expect(h1Element).toHaveTextContent(mockPostDetailsWithTreatment.title);
  });

  it("renders back button with correct href", () => {
    render(<PostPageBanner postDetails={mockPostDetailsWithTreatment} />);
    const backButton = screen.getByRole("link", { name: /Powrót/i });

    expect(backButton).toHaveAttribute("href", "/blog");
  });

  it("links the treatment button to the correct treatment page", () => {
    render(<PostPageBanner postDetails={mockPostDetailsWithTreatment} />);

    const { treatment } = mockPostDetailsWithTreatment;
    const treatmentCategory = treatment?.treatmentCategory.categorySlug.current;
    const hrefValue = `/zabiegi/${treatmentCategory}/${treatment?.treatmentSlug.current}`;
    const testedButton = screen.getByRole("link", {
      name: /Przejdź do zabiegu/i,
    });

    expect(testedButton).toHaveAttribute("href", hrefValue);
  });

  it("links the category button to the correct category page", () => {
    render(<PostPageBanner postDetails={mockPostDetailsWithCategory} />);

    const { treatmentCategory: category } = mockPostDetailsWithCategory;
    const hrefValue = `/zabiegi/${category?.categorySlug.current}`;
    const testedButton = screen.getByRole("link", {
      name: /Poznaj ofertę/i,
    });

    expect(testedButton).toHaveAttribute("href", hrefValue);
  });

  it("renders main image with correct alt text when imageData is provided", () => {
    render(<PostPageBanner postDetails={mockPostDetailsWithCategory} />);
    const image = screen.getByAltText(
      mockPostDetailsWithCategory.altForMainImage,
    );

    expect(image).toBeInTheDocument();
  });

  it("does not render main image when imageData is missing", () => {
    render(
      <PostPageBanner
        postDetails={{ ...mockPostDetailsWithCategory, imageData: null }}
      />,
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
