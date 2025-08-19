export type MockUseMobileNavType = ReturnType<typeof mockUseMobileNav>;

const mockUseMobileNav = () => () => {
  return {
    onClickHandler: cy.stub().as("useMobileNavClickHandler"),
  };
};

export default mockUseMobileNav;
