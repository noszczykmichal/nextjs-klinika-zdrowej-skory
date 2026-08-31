describe("Navigation", () => {
  const customTimeout = { timeout: 8000 };

  describe("on Desktop Viewport", () => {
    const mainNavigationElement = 'nav[aria-label="Main"]';
    const aboutUsLinkDesktop = `${mainNavigationElement} a[data-testid="o-nas"]`;
    const blogLinkDesktop = `${mainNavigationElement} a[data-testid="blog"]`;
    const dropDownTriggerTreatments =
      'button[data-testid="dropDownTrigger-zabiegi"]';
    const dropDownElementTreatments = 'div[data-testid="dropDown-zabiegi"]';

    beforeEach(() => {
      cy.viewport("macbook-11");
      cy.visit("/");
      cy.waitForHydration();
    });

    it("should correctly display desktop navigation and allow to navigate to correct page when a link is clicked", () => {
      cy.get(mainNavigationElement).should("be.visible");

      cy.get(aboutUsLinkDesktop).click();
      cy.url().should("include", "/o-nas");
      cy.contains("h1", "O Nas").should("be.visible");

      cy.get(blogLinkDesktop).click();
      cy.url().should("include", "/blog");
      cy.contains("h1", "Blog").should("be.visible");
    });

    it("should display dropdown menu when 'Zabiegi' dropdown trigger is clicked and correctly update aria and data attributes", () => {
      cy.get(dropDownElementTreatments).should("not.exist");
      cy.get(dropDownTriggerTreatments).should(
        "have.attr",
        "data-state",
        "closed",
      );
      cy.get(dropDownTriggerTreatments).should(
        "have.attr",
        "aria-expanded",
        "false",
      );

      cy.get(dropDownTriggerTreatments).click();
      cy.get(dropDownTriggerTreatments).should(
        "have.attr",
        "data-state",
        "open",
      );
      cy.get(dropDownTriggerTreatments).should(
        "have.attr",
        "aria-expanded",
        "true",
      );

      cy.get(dropDownElementTreatments).should("be.visible");
      cy.get(dropDownElementTreatments).should(
        "have.attr",
        "data-state",
        "open",
      );

      cy.get(`h1:contains('Poznaj Nas bliżej')`).click();
      cy.get(dropDownElementTreatments).should("not.be.visible");
      cy.get(dropDownTriggerTreatments).should(
        "have.attr",
        "data-state",
        "closed",
      );
      cy.get(dropDownTriggerTreatments).should(
        "have.attr",
        "aria-expanded",
        "false",
      );
    });

    it("should allow to navigate to correct page when link inside 'Zabiegi' dropdown is clicked", () => {
      const aestheticCosmetologyDropdownLink = `${dropDownElementTreatments} a:contains('Kosmetologia i medycyna estetyczna')`;
      const bodyShapingDropdownLink = `${dropDownElementTreatments} a:contains('Modelowanie sylwetki')`;

      cy.get(dropDownTriggerTreatments).click();
      cy.get(aestheticCosmetologyDropdownLink).should("be.visible");
      cy.get(aestheticCosmetologyDropdownLink).click();
      cy.get(dropDownElementTreatments).should("not.be.visible");
      cy.url(customTimeout).should(
        "include",
        "/zabiegi/kosmetologia-i-medycyna-estetyczna",
      );
      cy.contains("h1", "Kosmetologia i medycyna estetyczna").should(
        "be.visible",
      );

      cy.get(dropDownTriggerTreatments).click();
      cy.get(bodyShapingDropdownLink).should("be.visible");
      cy.get(bodyShapingDropdownLink).click();
      cy.get(dropDownElementTreatments).should("not.be.visible");
      cy.url().should("include", "/zabiegi/modelowanie-sylwetki");
      cy.contains("h1", "Modelowanie sylwetki").should("be.visible");
    });

    it("should display 'Szkolenia' dropdown and navigate to correct pages when links are clicked", () => {
      const dropDownTriggerTrainings =
        'button[data-testid="dropDownTrigger-szkolenia"]';
      const dropDownElementTrainings = 'div[data-testid="dropDown-szkolenia"]';
      const fundamentalsOfCosmetologyLink = `${dropDownElementTrainings} a:contains('Podstawy kosmetologii')`;
      const aestheticCosmetologyLink = `${dropDownElementTrainings} a:contains('Kosmetologia estetyczna')`;

      cy.get(dropDownTriggerTrainings).click();
      cy.get(dropDownElementTrainings).should("be.visible");
      cy.get(`${dropDownElementTrainings} a`).should(
        "have.length.greaterThan",
        0,
      );

      cy.get(fundamentalsOfCosmetologyLink).click();
      cy.url().should("include", "/szkolenia/podstawy-kosmetologii");
      cy.contains("h1", "Podstawy kosmetologii").should("be.visible");

      cy.get(dropDownTriggerTrainings).click();
      cy.get(dropDownElementTrainings).should("be.visible");

      cy.get(aestheticCosmetologyLink).click();
      cy.url().should("include", "/szkolenia/kosmetologia-estetyczna");
      cy.contains("h1", "Kosmetologia estetyczna").should("be.visible");
    });
  });

  describe("on Mobile Viewport", () => {
    const hamburgerElement = 'button[aria-label="Open main navigation"]';
    const mobileNavElement = 'aside[aria-label="Main mobile navigation"]';
    const aboutUsLinkElement = `${mobileNavElement} a[data-testid="o-nas"]`;
    const blogLinkElement = `${mobileNavElement} a[data-testid="blog"]`;
    const accordionItemElementTreatment =
      'div[data-testid="accordionItem-zabiegi"]';
    const accordionTriggerElementTreatment =
      'button[data-testid="accordionTrigger-zabiegi"]';

    beforeEach(() => {
      cy.viewport("iphone-xr");
      cy.visit("/");
      cy.waitForHydration();
    });

    it("should display mobile navigation, allow clicking the hamburger to toggle the mobile navigation, and update ARIA attributes correctly on small screens", () => {
      cy.get(hamburgerElement).should("be.visible");
      cy.get(hamburgerElement).should("have.attr", "aria-expanded", "false");
      cy.get(mobileNavElement).should("not.exist");

      cy.get(hamburgerElement).click();
      cy.get(mobileNavElement).should("have.class", "sideNav-enter-done");
      cy.get(hamburgerElement).should("have.attr", "aria-expanded", "true");
      cy.get(mobileNavElement).should("be.visible");
      cy.get(mobileNavElement).should("have.attr", "aria-hidden", "false");

      cy.get(hamburgerElement).click();
      cy.get(hamburgerElement).should("have.attr", "aria-expanded", "false");
      cy.get(mobileNavElement).should("not.exist");
    });

    it("should navigate to the correct page when clicking a link in the mobile navigation", () => {
      cy.get(hamburgerElement).click();
      cy.get(mobileNavElement).should("have.class", "sideNav-enter-done");
      cy.get(aboutUsLinkElement).click();

      cy.get(mobileNavElement).should("not.be.visible");
      cy.url().should("include", "/o-nas");
      cy.contains("h1", "O Nas").should("be.visible");

      cy.get(hamburgerElement).click();
      cy.get(mobileNavElement).should("have.class", "sideNav-enter-done");
      cy.get(blogLinkElement).click();

      cy.get(mobileNavElement).should("not.be.visible");
      cy.url().should("include", "/blog");
      cy.contains("h1", "Blog").should("be.visible");
    });

    it("should toggle accordion state in mobile navigation and correctly update data-state and aria-expanded attributes", () => {
      cy.get(hamburgerElement).click();
      cy.get(mobileNavElement).should("have.class", "sideNav-enter-done");

      cy.get(accordionItemElementTreatment).should("be.visible");
      cy.get(accordionItemElementTreatment).should(
        "have.attr",
        "data-state",
        "closed",
      );
      cy.get(accordionTriggerElementTreatment).should("be.visible");
      cy.get(accordionTriggerElementTreatment).should(
        "have.attr",
        "data-state",
        "closed",
      );
      cy.get(accordionTriggerElementTreatment).should(
        "have.attr",
        "aria-expanded",
        "false",
      );

      cy.get(accordionTriggerElementTreatment).click();
      cy.get(mobileNavElement).should("have.class", "sideNav-enter-done");
      cy.get(accordionItemElementTreatment).should(
        "have.attr",
        "data-state",
        "open",
      );
      cy.get(accordionTriggerElementTreatment).should(
        "have.attr",
        "data-state",
        "open",
      );
      cy.get(accordionTriggerElementTreatment).should(
        "have.attr",
        "aria-expanded",
        "true",
      );

      cy.get(accordionTriggerElementTreatment).click();
      cy.get(accordionItemElementTreatment).should(
        "have.attr",
        "data-state",
        "closed",
      );
      cy.get(accordionTriggerElementTreatment).should(
        "have.attr",
        "data-state",
        "closed",
      );
      cy.get(accordionTriggerElementTreatment).should(
        "have.attr",
        "aria-expanded",
        "false",
      );
    });

    it("should navigate to the correct page when clicking a link inside an expanded 'Zabiegi' accordion in mobile navigation", () => {
      const holisticTreatmentsLink = `${accordionItemElementTreatment} a:contains('Holistyczne zabiegi na twarz')`;
      const laserTherapyLink = `${accordionItemElementTreatment} a:contains('Laseroterapia')`;

      cy.get(hamburgerElement).click();
      cy.get(mobileNavElement).should("have.class", "sideNav-enter-done");
      cy.clickAccordionTrigger(accordionTriggerElementTreatment);

      cy.get(holisticTreatmentsLink).should("be.visible");
      cy.get(holisticTreatmentsLink).click();

      cy.get(mobileNavElement).should("not.be.visible");
      cy.url().should("include", "/zabiegi/holistyczne-zabiegi-na-twarz");
      cy.contains("h1", "Holistyczne zabiegi na twarz").should("be.visible");

      cy.get(hamburgerElement).click();
      cy.get(mobileNavElement).should("have.class", "sideNav-enter-done");
      cy.clickAccordionTrigger(accordionTriggerElementTreatment);

      cy.get(laserTherapyLink).should("be.visible");
      cy.get(laserTherapyLink).click();

      cy.get(mobileNavElement).should("not.be.visible");
      cy.url().should("include", "/zabiegi/laseroterapia");
      cy.contains("h1", "Laseroterapia").should("be.visible");
    });

    it("should navigate to the correct page when clicking a link inside an expanded 'Szkolenia' accordion in mobile navigation", () => {
      const accordionItemElementTrainings =
        'div[data-testid="accordionItem-szkolenia"]';
      const accordionTriggerElementTrainings =
        'button[data-testid="accordionTrigger-szkolenia"]';
      const fundamentalsOfCosmetologyLink = `${accordionItemElementTrainings} a:contains('Podstawy kosmetologii')`;
      const aestheticCosmetologyLink = `${accordionItemElementTrainings} a:contains('Kosmetologia estetyczna')`;

      cy.get(hamburgerElement).click();
      cy.get(mobileNavElement).should("have.class", "sideNav-enter-done");
      cy.clickAccordionTrigger(accordionTriggerElementTrainings);

      cy.get(fundamentalsOfCosmetologyLink).should("be.visible");
      cy.get(fundamentalsOfCosmetologyLink).click();

      cy.get(mobileNavElement).should("not.be.visible");
      cy.url().should("include", "/szkolenia/podstawy-kosmetologii");
      cy.contains("h1", "Podstawy kosmetologii").should("be.visible");

      cy.get(hamburgerElement).click();
      cy.get(mobileNavElement).should("have.class", "sideNav-enter-done");
      cy.clickAccordionTrigger(accordionTriggerElementTrainings);

      cy.get(aestheticCosmetologyLink).should("be.visible");
      cy.get(aestheticCosmetologyLink).click();

      cy.get(mobileNavElement).should("not.be.visible");
      cy.url().should("include", "/szkolenia/kosmetologia-estetyczna");
      cy.contains("h1", "Kosmetologia estetyczna").should("be.visible");
    });
  });
});
