// SVGR isn't applied under Jest, so the logo SVG has to be stubbed as a component
jest.mock("@/assets/icons/on-logo.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="logo-svg" />,
}));

jest.mock("@/components/Layout/Footer/ContactForm/ContactForm", () => ({
  __esModule: true,
  default: () => <div data-testid="contact-form" />,
}));

import { render, screen, within } from "@testing-library/react";

import Footer from "@/components/Layout/Footer/Footer";
import { socialIconsConfig } from "@/utils/config";

describe("Footer component", () => {
  beforeEach(() => {
    render(<Footer className="test-class" />);
  });

  it("renders a contentinfo landmark with the contact anchor id and merged className", () => {
    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveAttribute("id", "contact");
    expect(footer).toHaveClass("test-class", "text-white-100");
  });

  it("renders a level 2 'Kontakt' heading for screen readers", () => {
    const heading = screen.getByRole("heading", { level: 2, name: "Kontakt" });

    expect(heading).toHaveClass("sr-only");
  });

  it("renders the logo link to the home page", () => {
    const logoLink = screen.getByRole("link", {
      name: "Przejdź do strony głównej",
    });

    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders a social link for every configured icon", () => {
    socialIconsConfig.forEach(({ name, href }) => {
      const iconName = name.charAt(0).toUpperCase() + name.slice(1);
      const socialLink = screen.getByRole("link", {
        name: `${iconName} (otwiera się w nowej karcie)`,
      });

      expect(socialLink).toHaveAttribute("href", href);
      expect(socialLink).toHaveAttribute("target", "_blank");
    });
  });

  it("renders contact details inside an address element", () => {
    const address = screen.getByText("Adres").closest("address")!;
    expect(address).toBeInTheDocument();

    const mapsLink = within(address).getByRole("link", {
      name: /ul\. Szaserów 31\/LU\. 2/,
    });
    expect(mapsLink).toHaveAttribute(
      "href",
      "https://maps.app.goo.gl/GBaDRtSft9FWCSuW8",
    );
    expect(mapsLink).toHaveAttribute("target", "_blank");
    expect(mapsLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(
      within(address).getByRole("link", { name: "508 832 553" }),
    ).toHaveAttribute("href", "tel:+48508832553");
    expect(
      within(address).getByRole("link", { name: "olga.noszczyk@gmail.com" }),
    ).toHaveAttribute("href", "mailto:olga.noszczyk@gmail.com");

    expect(
      within(address).getByText("pon. - czw. 10:00 - 21:00"),
    ).toBeInTheDocument();
    expect(within(address).getByText("pt. 10:00 - 19:00")).toBeInTheDocument();
  });

  it("renders the contact form", () => {
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });

  it("renders the copyright link opening in a new tab", () => {
    const copyrightLink = screen.getByRole("link", { name: "MNSS" });

    expect(copyrightLink).toHaveAttribute(
      "href",
      "https://michalnoszczyk.com/",
    );
    expect(copyrightLink).toHaveAttribute("target", "_blank");
    expect(copyrightLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the privacy policy link inside a list", () => {
    const privacyLink = screen.getByRole("link", {
      name: "Polityka prywatności",
    });

    expect(privacyLink).toHaveAttribute("href", "/polityka-prywatnosci");
    expect(privacyLink.closest("li")).toBeInTheDocument();
  });
});
