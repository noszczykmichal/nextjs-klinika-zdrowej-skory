const mockUseMobileNav = (isMenuOpen: boolean) => () => {
  return {
    isMenuOpen: isMenuOpen,
    onClickHandler: cy.stub().as("useMobileNavClickHandler"),
  };
};

export default mockUseMobileNav;
