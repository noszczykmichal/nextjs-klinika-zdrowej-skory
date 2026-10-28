type MainRoute = "zabiegi" | "szkolenia" | "blog";

interface SectionFixture {
  category: string;
  resource: string;
  otherCategory: string | undefined;
}

const sections: MainRoute[] = ["zabiegi", "szkolenia", "blog"];
const notFoundHeading = "Przykro nam...";
const nonExistentSlug = "nieistniejacy-adres-e2e";

// Slugs are read from the sitemap so content changes in Sanity don't break the spec.
function getSectionFixtures(): Cypress.Chainable<
  Record<MainRoute, SectionFixture>
> {
  return cy.request("/sitemap.xml").then(({ body }) => {
    const paths = [...(body as string).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      ([, loc]) => new URL(loc).pathname,
    );

    return sections.reduce(
      (fixtures, section) => {
        const resourcePaths = paths
          .map((path) => path.split("/").filter(Boolean))
          .filter(
            (segments) => segments.length === 3 && segments[0] === section,
          );

        expect(resourcePaths, `resource pages for /${section} in sitemap`).to
          .not.be.empty;

        const [, category, resource] = resourcePaths[0];
        const otherCategory = resourcePaths.find(
          ([, itemCategory]) => itemCategory !== category,
        )?.[1];

        fixtures[section] = { category, resource, otherCategory };
        return fixtures;
      },
      {} as Record<MainRoute, SectionFixture>,
    );
  });
}

describe("Routing", () => {
  let fixtures: Record<MainRoute, SectionFixture>;

  before(() => {
    getSectionFixtures().then((data) => {
      fixtures = data;
    });
  });

  sections.forEach((section) => {
    describe(`/${section}`, () => {
      it("should render the resource page under its canonical category", () => {
        const { category, resource } = fixtures[section];
        const canonicalPath = `/${section}/${category}/${resource}`;

        cy.request(canonicalPath).its("status").should("eq", 200);

        cy.visit(canonicalPath);
        cy.location("pathname").should("eq", canonicalPath);
        cy.get("h1").should("be.visible").and("not.contain", notFoundHeading);
      });

      it("should permanently redirect a resource requested under a non-existent category to its canonical URL", () => {
        const { category, resource } = fixtures[section];
        const canonicalPath = `/${section}/${category}/${resource}`;

        cy.request({
          url: `/${section}/${nonExistentSlug}/${resource}`,
          followRedirect: false,
        }).then((response) => {
          expect(response.status).to.eq(308);
          expect(response.headers.location).to.eq(canonicalPath);
        });

        cy.visit(`/${section}/${nonExistentSlug}/${resource}`);
        cy.location("pathname").should("eq", canonicalPath);
        cy.get("h1").should("be.visible").and("not.contain", notFoundHeading);
      });

      it("should permanently redirect a resource requested under another existing category to its canonical URL", function () {
        const { category, resource, otherCategory } = fixtures[section];

        if (!otherCategory) {
          cy.log(`/${section} has only one category with resources – skipping`);
          this.skip();
        }

        cy.request({
          url: `/${section}/${otherCategory}/${resource}`,
          followRedirect: false,
        }).then((response) => {
          expect(response.status).to.eq(308);
          expect(response.headers.location).to.eq(
            `/${section}/${category}/${resource}`,
          );
        });
      });

      it("should return 404 for a non-existent resource in an existing category", () => {
        const { category } = fixtures[section];
        const path = `/${section}/${category}/${nonExistentSlug}`;

        cy.request({ url: path, failOnStatusCode: false })
          .its("status")
          .should("eq", 404);

        cy.visit(path, { failOnStatusCode: false });
        cy.contains("h1", notFoundHeading).should("be.visible");
      });

      it("should return 404 for a non-existent resource in a non-existent category", () => {
        cy.request({
          url: `/${section}/${nonExistentSlug}/${nonExistentSlug}`,
          failOnStatusCode: false,
        })
          .its("status")
          .should("eq", 404);
      });

      it("should return 404 for a non-existent category", () => {
        const path = `/${section}/${nonExistentSlug}`;

        cy.request({ url: path, failOnStatusCode: false })
          .its("status")
          .should("eq", 404);

        cy.visit(path, { failOnStatusCode: false });
        cy.contains("h1", notFoundHeading).should("be.visible");
      });
    });
  });

  describe("Not found page", () => {
    it("should redirect to the home page after the countdown", () => {
      cy.visit(`/${nonExistentSlug}`, { failOnStatusCode: false });
      cy.contains("h1", notFoundHeading).should("be.visible");
      cy.contains("p", "Przekierowanie do strony głównej za:").should(
        "be.visible",
      );

      // Countdown lasts 5s
      cy.location("pathname", { timeout: 10000 }).should("eq", "/");
      cy.contains("h1", notFoundHeading).should("not.exist");
    });
  });
});
