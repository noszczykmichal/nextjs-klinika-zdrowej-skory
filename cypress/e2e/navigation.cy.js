describe("Navigation", () => {
  describe("on Mobile Viewport", () => {
    const hamburgerElement = 'button[aria-label="Open main navigation"]';
    const mobileNavElement = 'aside[aria-label="Main mobile navigation"]';
    const aboutUsLinkElement = `${mobileNavElement} a[data-testid="o-nas"]`;
    const blogLinkElement = `${mobileNavElement} a[data-testid="blog"]`;
    const accordionItemElement = 'div[data-slot="accordion-item"]';
    const accordionTriggerElement = `${accordionItemElement} button[data-slot="accordion-trigger"]`;

    beforeEach(() => {
      // Iphone HR viewport dimensions
      cy.viewport(414, 896);
      cy.visit("/");
    });

    it("should display mobile navigation, allow clicking the hamburger to toggle the mobile navigation, and update ARIA attributes correctly on small screens", () => {
      cy.get(hamburgerElement).should("be.visible");
      cy.get(hamburgerElement).should("have.attr", "aria-expanded", "false");
      cy.get(mobileNavElement).should("not.be.exist");

      cy.get(hamburgerElement).click();
      cy.get(hamburgerElement).should("have.attr", "aria-expanded", "true");
      cy.get(mobileNavElement).should("be.visible");
      cy.get(mobileNavElement).should("have.attr", "aria-hidden", "false");

      cy.get(hamburgerElement).click();
      cy.get(hamburgerElement).should("have.attr", "aria-expanded", "false");
      cy.get(mobileNavElement).should("not.be.exist");
    });

    it("should navigate to the correct page when clicking a link in the mobile navigation", () => {
      cy.get(hamburgerElement).click();
      cy.get(aboutUsLinkElement).click();

      cy.url({ timeout: 8000 }).should("include", "/o-nas");
      cy.contains("h1", "O Nas").should("be.visible");

      cy.visit("/");
      cy.get(hamburgerElement).click();
      cy.get(blogLinkElement).click();

      cy.url({ timeout: 8000 }).should("include", "/blog");
      cy.contains("h1", "Blog").should("be.visible");
    });

    it("should open mobile nav, update data and aria attribute values", () => {
      cy.get(hamburgerElement).click();

      cy.get(accordionItemElement).should("be.visible");
      cy.get(accordionItemElement).should("have.attr", "data-state", "closed");
      cy.get(accordionTriggerElement).should("be.visible");
      cy.get(accordionTriggerElement).should(
        "have.attr",
        "data-state",
        "closed",
      );
      cy.get(accordionTriggerElement).should(
        "have.attr",
        "aria-expanded",
        "false",
      );

      cy.get(accordionTriggerElement).click();
      cy.get(accordionItemElement).should("have.attr", "data-state", "open");
      cy.get(accordionTriggerElement).should("have.attr", "data-state", "open");
      cy.get(accordionTriggerElement).should(
        "have.attr",
        "aria-expanded",
        "true",
      );

      cy.get(accordionTriggerElement).click();
      cy.get(accordionItemElement).should("have.attr", "data-state", "closed");
      cy.get(accordionTriggerElement).should(
        "have.attr",
        "data-state",
        "closed",
      );
      cy.get(accordionTriggerElement).should(
        "have.attr",
        "aria-expanded",
        "false",
      );
    });

    // it("should navigate to the correct page when clicking a link inside an expanded accordion in mobile navigation", () => {
    //   const holisticTreatmentsLink = `${accordionItemElement} a:contains('Holistyczne zabiegi na twarz')`;
    //   const laserTherapyLink = `${accordionItemElement} a:contains('Laseroterapia')`;

    //   cy.get(hamburgerElement).click();
    //   cy.get(accordionTriggerElement).click();

    //   cy.get(holisticTreatmentsLink).should("be.visible");
    //   cy.get(holisticTreatmentsLink).click();
    //   cy.url({ timeout: 8000 }).should(
    //     "include",
    //     "/zabiegi/holistyczne-zabiegi-na-twarz",
    //   );
    //   cy.contains("h1", "Holistyczne zabiegi na twarz").should("be.visible");

    //   cy.visit("/");
    //   cy.get(hamburgerElement).click();
    //   cy.get(accordionTriggerElement).click();

    //   cy.get(laserTherapyLink).should("be.visible");
    //   cy.get(laserTherapyLink).click();
    //   cy.url({ timeout: 8000 }).should("include", "/zabiegi/laseroterapia");
    //   cy.contains("h1", "Laseroterapia").should("be.visible");
    // });
  });
});
