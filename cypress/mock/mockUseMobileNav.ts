const mockUseMobileNav = () => () => {
  return {
    onClickHandler: cy.stub().as("useMobileNavClickHandler"),
  };
};

export default mockUseMobileNav;
