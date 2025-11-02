import { render, screen } from "@testing-library/react";

import { homePageArticleContent } from "@/utils/config";
import HeroArticle from "@/components/HomePage/HeroArticle/HeroArticle";

jest.mock("next-reveal", () => ({
  RevealWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("HeroArticle component", () => {
  it("renders proper contents of header and article", () => {
    const headerText =
      "Klinika Zdrowej Skóry – miejsce tworzone z pasją i sercem";

    render(
      <HeroArticle
        headerText={headerText}
        articleContent={homePageArticleContent}
      />,
    );

    const headerEl = screen.getByRole("heading", { level: 2 });
    const paragraphEl = screen.getByText(
      homePageArticleContent[1].paragraphContent,
    );
    const paragraphs = screen.getAllByText(/./, { selector: "p" });

    expect(headerEl).toBeInTheDocument();
    expect(headerEl).toHaveTextContent(headerText);
    expect(paragraphEl).toBeInTheDocument();
    expect(paragraphs).toHaveLength(homePageArticleContent.length);
  });
});
