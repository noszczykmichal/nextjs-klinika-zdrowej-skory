import { render, screen } from "@testing-library/react";

import ErrorMessage from "@/components/Layout/Footer/ContactForm/FormContent/ErrorMessage/ErrorMessage";

describe("ErrorMessage component", () => {
  const setErrorMock = jest.fn();
  const errorDataMock = {
    errorMessage: "Error Test Message",
    hasError: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders errorMessage component when hasError equals true", () => {
    render(
      <ErrorMessage setErrorHandler={setErrorMock} errorData={errorDataMock} />,
    );

    const errorOverlay = screen.getByTestId("error-overlay");

    expect(errorOverlay).toBeInTheDocument();
    expect(screen.getByText("Coś poszło nie tak...")).toBeInTheDocument();
    expect(screen.getByText("Błąd: Error Test Message")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Spróbuj ponownie później lub skontaktuj się z nami telefonicznie.",
      ),
    ).toBeInTheDocument();
  });

  it("calls setErrorHandler after timeout when hasError is true", () => {
    jest.useFakeTimers();

    render(
      <ErrorMessage setErrorHandler={setErrorMock} errorData={errorDataMock} />,
    );

    expect(setErrorMock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(4000);
    expect(setErrorMock).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it("does not render errorMessage component when hasError equals false", () => {
    const customErrorProps = {
      ...errorDataMock,
      hasError: false,
    };

    render(
      <ErrorMessage
        setErrorHandler={setErrorMock}
        errorData={customErrorProps}
      />,
    );

    const errorOverlay = screen.queryByTestId("error-overlay");

    expect(errorOverlay).not.toBeInTheDocument();
  });
});
