describe("Navigation", () => {
  it("should display mobile navigation, allow clicking the hamburger to toggle the mobile navigation, and update ARIA attributes correctly on small screens", () => {
    // Iphone HR viewport dimensions
    cy.viewport(414, 896);
    cy.visit("/");

    const hamburgerElement = 'button[aria-label="Open main navigation"]';
    const mobileNavElement = 'aside[aria-label="Main mobile navigation"]';

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
});
