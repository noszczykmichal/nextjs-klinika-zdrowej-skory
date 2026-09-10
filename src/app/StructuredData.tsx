export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Klinika Zdrowej Skóry",
    image: "https://www.olganoszczyk.pl/social_card.jpg",
    url: "https://www.olganoszczyk.pl",
    telephone: "+48 508 832 553",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Szaserów 31/LU. 2",
      addressLocality: "Warszawa",
      postalCode: "04-306",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.244127,
      longitude: 21.115551,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "10:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/OlgaNoszczykKlinika",
      "https://www.instagram.com/klinikazdrowejskory.warszawa",
      "https://booksy.com/pl-pl/13989_olga-noszczyk-klinika-zdrowej-skory_medycyna-estetyczna_3_warszawa",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
