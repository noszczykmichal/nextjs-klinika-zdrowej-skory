const createUseMobileNavMock = (isMenuOpen: boolean) => () => {
  return {
    isMenuOpen: isMenuOpen,
    onClickHandler: cy.stub().as("useMobileNavClickHandler"),
  };
};

export default createUseMobileNavMock;
