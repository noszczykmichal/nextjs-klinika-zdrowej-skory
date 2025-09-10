import { render, screen } from "@testing-library/react";

import PostPageBanner from "@/components/BlogPage/Category/PostPage/PostPageBanner/PostPageBanner";
import {
  mockPostDetailsWithTreatment,
  mockPostDetailsWithGroup,
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
    const treatmentGroup = treatment?.treatmentGroup.groupSlug.current;
    const hrefValue = `/zabiegi/${treatmentGroup}/${treatment?.treatmentSlug.current}`;
    const testedButton = screen.getByRole("link", {
      name: /Przejdź do zabiegu/i,
    });

    expect(testedButton).toHaveAttribute("href", hrefValue);
  });

  it("links the group button to the correct group page", () => {
    render(<PostPageBanner postDetails={mockPostDetailsWithGroup} />);

    const { treatmentGroup: group } = mockPostDetailsWithGroup;
    const hrefValue = `/zabiegi/${group?.groupSlug.current}`;
    const testedButton = screen.getByRole("link", {
      name: /Poznaj ofertę/i,
    });

    expect(testedButton).toHaveAttribute("href", hrefValue);
  });

  it("renders main image with correct alt text when imageData is provided", () => {
    render(<PostPageBanner postDetails={mockPostDetailsWithGroup} />);
    const image = screen.getByAltText(mockPostDetailsWithGroup.altForMainImage);

    expect(image).toBeInTheDocument();
  });

  it("does not render main image when imageData is missing", () => {
    render(
      <PostPageBanner
        postDetails={{ ...mockPostDetailsWithGroup, imageData: null }}
      />,
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
