import { render, screen } from "@testing-library/react";

import SuccessMessage from "@/components/Layout/Footer/ContactForm/FormContent/SuccessMessage/SuccessMessage";

describe("SuccessMessage component", () => {
  it("renders SuccessMessage component when show success is true", () => {
    render(<SuccessMessage showSuccess={true} />);

    const successMessageEl = screen.getByTestId("success-message");

    expect(successMessageEl).toBeInTheDocument();
    expect(screen.getByText("Wiadomość wysłana!")).toBeInTheDocument();
  });

  it("does not render SuccessMessage component when show success is false", () => {
    render(<SuccessMessage showSuccess={false} />);

    const successMessageEl = screen.queryByTestId("success-message");

    expect(successMessageEl).not.toBeInTheDocument();
  });
});
