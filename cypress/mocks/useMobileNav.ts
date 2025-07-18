// This file provides a mocked version of the useMobileNav hook
// for isolated component testing.

import { stub } from "cypress-sinon"; // Ensure you have sinon installed (comes with Cypress)

// Declare variables to hold the mock state and spy.
// These need to be mutable so we can control them from our tests.
let currentIsMenuOpen = false;
let onClickHandlerSpy: Cypress.Agent<sinon.SinonSpy>;

// Function to reset the mock state and create a new spy before each test
export const resetUseMobileNavMock = () => {
  currentIsMenuOpen = false; // Default to menu closed
  onClickHandlerSpy = stub().as("onClickHandlerSpy"); // Create a fresh spy
};

// Function to control the `isMenuOpen` value returned by the mock hook
export const setMockIsMenuOpen = (value: boolean) => {
  currentIsMenuOpen = value;
};

// This is the actual mock hook that will be used by the Hamburger component
const useMobileNavMock = () => {
  // It returns the current controlled state and the spy
  return {
    isMenuOpen: currentIsMenuOpen,
    onClickHandler: onClickHandlerSpy,
  };
};

export default useMobileNavMock;
