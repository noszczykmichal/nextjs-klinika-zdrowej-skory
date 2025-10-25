import { render, screen } from "@testing-library/react";

import LoaderMessage from "@/components/Layout/Footer/ContactForm/FormContent/LoaderMessage/LoaderMessage";

describe("LoaderMessage component", () => {
  it("displays the loader and message when submitting is true", () => {
    render(<LoaderMessage submitting />);

    const loaderMessageEl = screen.getByTestId("loader-message");
    const messageEl = screen.getByText("Wysyłanie...");
    const spinner = screen.getByTestId("loader");

    expect(loaderMessageEl).toBeInTheDocument();
    expect(messageEl).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });
  it("does not render when submitting is false", () => {
    render(<LoaderMessage submitting={false} />);

    const loaderMessageEl = screen.queryByTestId("loader-message");

    expect(loaderMessageEl).not.toBeInTheDocument();
  });
});
