import { render } from "@testing-library/react";

import Hamburger from "./Hamburger";

describe("Hamburger component", () => {
  it("test", () => {
    const onClickHandlerMock = jest.fn();

    render(<Hamburger onClick={onClickHandlerMock} />);
  });
});
