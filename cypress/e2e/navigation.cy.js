describe("Navigation", () => {
  describe("on Desktop Viewport", () => {
    const mainNavigationElement = 'nav[aria-label="Main"]';
    const aboutUsLinkDesktop = `${mainNavigationElement} a[data-testid="o-nas"]`;
    const blogLinkDesktop = `${mainNavigationElement} a[data-testid="blog"]`;
    const dropDownTrigger = `${mainNavigationElement} button[data-slot="navigation-menu-trigger"]`;
    const dropDownElement = 'div[data-slot="navigation-menu-content"]';

    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit("/");
    });

    it("should correctly display desktop navigation and allow to navigate to correct page when a link is clicked", () => {
      cy.get(mainNavigationElement).should("be.visible");

      cy.get(aboutUsLinkDesktop).click();
      cy.url({ timeout: 10000 }).should("include", "/o-nas");
      cy.contains("h1", "O Nas").should("be.visible");

      cy.visit("/");
      cy.get(blogLinkDesktop).click();
      cy.url({ timeout: 10000 }).should("include", "/blog");
      cy.contains("h1", "Blog").should("be.visible");
    });

    it("should display dropdown menu when dropdown trigger is clicked and correctly update aria and data attributes", () => {
      cy.get(dropDownElement).should("not.be.exist");
      cy.get(dropDownTrigger).should("have.attr", "data-state", "closed");
      cy.get(dropDownTrigger).should("have.attr", "aria-expanded", "false");

      cy.get(dropDownTrigger).click();
      cy.get(dropDownTrigger).should("have.attr", "data-state", "open");
      cy.get(dropDownTrigger).should("have.attr", "aria-expanded", "true");

      cy.get(dropDownElement).should("be.visible");
      cy.get(dropDownElement).should("have.attr", "data-state", "open");
    });

    it("should allow to navigate to correct page when link inside dropdown is clicked", () => {
      const aestheticCosmetologyDropdownLink = `${dropDownElement} a:contains('Kosmetologia i medycyna estetyczna')`;
      const bodyShapingDropdownLink = `${dropDownElement} a:contains('Modelowanie sylwetki')`;

      cy.get(dropDownTrigger).click();
      cy.get(aestheticCosmetologyDropdownLink).should("be.visible");
      cy.get(aestheticCosmetologyDropdownLink).click();
      cy.url({ timeout: 10000 }).should(
        "include",
        "/zabiegi/kosmetologia-i-medycyna-estetyczna",
      );
      cy.contains("h1", "Kosmetologia i medycyna estetyczna").should(
        "be.visible",
      );

      cy.visit("/");
      cy.get(dropDownTrigger).click();
      cy.get(bodyShapingDropdownLink).should("be.visible");
      cy.get(bodyShapingDropdownLink).click();
      cy.url({ timeout: 10000 }).should(
        "include",
        "/zabiegi/modelowanie-sylwetki",
      );
      cy.contains("h1", "Modelowanie sylwetki").should("be.visible");
    });
  });

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

      cy.url({ timeout: 10000 }).should("include", "/o-nas");
      cy.contains("h1", "O Nas").should("be.visible");

      cy.visit("/");
      cy.get(hamburgerElement).click();
      cy.get(blogLinkElement).click();

      cy.url({ timeout: 10000 }).should("include", "/blog");
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

    it("should navigate to the correct page when clicking a link inside an expanded accordion in mobile navigation", () => {
      const holisticTreatmentsLink = `${accordionItemElement} a:contains('Holistyczne zabiegi na twarz')`;
      const laserTherapyLink = `${accordionItemElement} a:contains('Laseroterapia')`;

      cy.get(hamburgerElement).click();
      cy.get(accordionTriggerElement).click();

      cy.get(holisticTreatmentsLink).should("be.visible");
      cy.get(holisticTreatmentsLink).click();
      cy.url({ timeout: 10000 }).should(
        "include",
        "/zabiegi/holistyczne-zabiegi-na-twarz",
      );
      cy.contains("h1", "Holistyczne zabiegi na twarz").should("be.visible");

      cy.visit("/");
      cy.get(hamburgerElement).click();
      cy.get(accordionTriggerElement).click();

      cy.get(laserTherapyLink).should("be.visible");
      cy.get(laserTherapyLink).click();
      cy.url({ timeout: 10000 }).should("include", "/zabiegi/laseroterapia");
      cy.contains("h1", "Laseroterapia").should("be.visible");
    });
  });
});
