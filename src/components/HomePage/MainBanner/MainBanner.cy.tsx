import { mount } from "cypress/react";
import MainBanner from "./MainBanner";

describe("MainBanner component", () => {
  const headerText = "Test Header";

  it("renders the header text", () => {
    mount(<MainBanner headerText={headerText} />);

    cy.get("h1").should("contain.text", headerText);
  });

  it("uses default alt when customAlt is not provided", () => {
    mount(<MainBanner headerText={headerText} />);

    cy.get("img")
      .eq(1)
      .should("have.attr", "alt")
      .and("contain", "Olga Noszczyk");
  });

  it("uses customAlt when provided", () => {
    const customAlt = "Custom alt text";

    mount(<MainBanner headerText={headerText} customAlt={customAlt} />);

    cy.get("img").eq(1).should("have.attr", "alt", customAlt);
  });
});
