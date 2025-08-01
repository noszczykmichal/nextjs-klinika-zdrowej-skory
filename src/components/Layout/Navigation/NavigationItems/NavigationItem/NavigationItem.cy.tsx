import { mount } from "cypress/react";

import { NavigationMenu } from "@/components/ui/navigation-menu";
import NavigationItem from "@/components/Layout/Navigation/NavigationItems/NavigationItem/NavigationItem";

describe("NavigationItem Component", () => {
  it("applies active link styling when pathname matches href", () => {
    const mockUsePathname = () => "/blog";
    const mockLinkData = {
      id: "blog",
      label: "Blog",
      href: "/blog",
    };

    const mockNavData = [
      {
        _id: "07a9584e-1b85-4119-897f-6f019d36ff65",
        slug: {
          _type: "slug",
          current: "holistyczne-zabiegi-na-twarz",
        },
        title: "Holistyczne zabiegi na twarz",
      },
    ];

    mount(
      <NavigationMenu>
        <NavigationItem
          linkData={mockLinkData}
          navData={mockNavData}
          isMobileNav={true}
          usePathname={mockUsePathname}
        />
      </NavigationMenu>,
    );

    cy.get(`[data-testid=${mockLinkData.id}] span`)
      .should("have.class", "before:w-full")
      .and("have.class", "text-[var(--magenta-100)]");
  });

  it("does not apply active styling when pathname does not match href", () => {
    const mockUsePathname = () => "/zabiegi";
    const mockLinkData = {
      id: "blog",
      label: "Blog",
      href: "/blog",
    };

    const mockNavData = [
      {
        _id: "07a9584e-1b85-4119-897f-6f019d36ff65",
        slug: {
          _type: "slug",
          current: "holistyczne-zabiegi-na-twarz",
        },
        title: "Holistyczne zabiegi na twarz",
      },
    ];

    mount(
      <NavigationMenu>
        <NavigationItem
          linkData={mockLinkData}
          navData={mockNavData}
          isMobileNav={true}
          usePathname={mockUsePathname}
        />
      </NavigationMenu>,
    );

    cy.get(`[data-testid=${mockLinkData.id}] span`).should(
      "have.class",
      "before:w-[0px]",
    );
  });
});
