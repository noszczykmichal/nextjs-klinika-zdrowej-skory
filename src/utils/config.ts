import validator from "validator";

import { SocialIcon, HeroArticleData, FormFieldConfig } from "@/types/types";

export const navConfig = [
  { id: "o-nas", label: "O nas", href: "/o-nas" },
  { id: "zabiegi", label: "Zabiegi", href: "/zabiegi" },
  // { id: "cennik", label: "Cennik", href: "/cennik" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "kontakt", label: "Kontakt", href: "#contact" },
];

export const socialIconsConfig: SocialIcon[] = [
  {
    name: "facebook",
    href: "https://www.facebook.com/OlgaNoszczykKlinika",
    className: "var(--white-100)",
  },
  {
    name: "instagram",
    href: "https://www.instagram.com/olganoszczyk.klinikaskory/?igsh=MWxzY2h2endpNGxlNQ%3D%3D#",
    className: "var(--white-100)",
  },
  {
    name: "b-visit",
    href: "https://www.appointo.pl/64681bdf-ffc7-4db4-8875-f598177086ae",
    className: "h-[40px] w-[40px]",
  },
];

export const homePageArticleContent: HeroArticleData[] = [
  {
    id: 1,
    paragraphContent:
      "Nazywam się Olga Noszczyk i z pełnym zaangażowaniem prowadzę Klinikę Zdrowej Skóry w Warszawie – miejsce, które powstało z miłości do kosmetologii i troski o drugiego człowieka. Każdy, kto przekracza próg mojej kliniki, może liczyć na pełną uwagę, indywidualne podejście i zabiegi dopasowane nie tylko do potrzeb skóry, ale i stylu życia. W swoją pracę wkładam całe serce – wierzę, że tylko wtedy efekty są prawdziwie trwałe i piękne.",
  },
  {
    id: 2,
    paragraphContent:
      "Łączę kosmetologię holistyczną, estetyczną i hi-tech, pracując wyłącznie na sprawdzonych, najwyższej klasy urządzeniach i preparatach. Nieustannie poszerzam swoją wiedzę i umiejętności, by móc oferować Ci najskuteczniejsze terapie oparte na najnowszych osiągnięciach nauki. Jeśli szukasz miejsca, gdzie Twoje potrzeby naprawdę mają znaczenie – jesteś we właściwym miejscu.",
  },
  {
    id: 3,
    paragraphContent:
      "Zapraszam Cię do świata, w którym piękno zaczyna się od zdrowej, zadbanej skóry i pełnego szacunku podejścia do Ciebie jako człowieka.",
  },
];

export const aboutUsArticleContent: HeroArticleData[] = [
  {
    id: 1,
    paragraphContent:
      "Olga Noszczyk to doświadczona kosmetolog i szkoleniowiec, założycielka Kliniki Zdrowej Skóry w Warszawie oraz Mazowieckiego Centrum Szkoleniowego. Specjalizuje się w kosmetologii holistycznej, estetycznej i hi-tech, łącząc wiedzę medyczną z nowoczesną technologią oraz indywidualnym podejściem do każdej osoby.",
  },
  {
    id: 2,
    paragraphContent:
      "W swojej pracy skupia się na kompleksowej pielęgnacji skóry twarzy i ciała, zdrowym modelowaniu sylwetki oraz profilaktyce anti-aging. Jej pacjenci cenią ją za skuteczność, profesjonalizm i naturalne efekty terapii.",
  },
  {
    id: 3,
    paragraphContent:
      "Jako edukatorka prowadzi autorskie kursy i szkolenia, wspierając rozwój specjalistów z branży beauty i kosmetologii. W Mazowieckim Centrum Szkoleniowym przekazuje wiedzę praktyczną i merytoryczną z zakresu kosmetologii, medycyny estetycznej, stylizacji rzęs i brwi oraz nowoczesnych technologii zabiegowych.",
  },
  {
    id: 4,
    paragraphContent:
      "Olga Noszczyk łączy pasję do piękna z wysokimi standardami pracy, stawiając na jakość, bezpieczeństwo i rozwój – zarówno w pracy z klientami, jak i w edukacji profesjonalistów.",
  },
];

export const formConfig: FormFieldConfig[] = [
  {
    type: "text",
    name: "full_name",
    label: "Imię i Nazwisko",
    validator: (v: string) =>
      validator.isEmpty(v || "", { ignore_whitespace: true }) ||
      !validator.isLength(v.trim() || "", { min: 4 })
        ? "To pole jest wymagane"
        : undefined,
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    validator: (v: string) =>
      !validator.isEmail(v || "")
        ? "Proszę wprowadzić poprawny email"
        : undefined,
  },
  {
    type: "tel",
    name: "tel",
    label: "Telefon",
    validator: (v: string) =>
      !validator.isNumeric(v?.trim() || "", { locale: "pl-PL" }) ||
      !validator.isLength(v?.trim() || "", { min: 9 })
        ? "Proszę wprowadzić poprawny numer telefonu"
        : undefined,
  },
  {
    component: "textarea",
    name: "message",
    label: "Wiadomość",
    validator: (v: string) =>
      validator.isEmpty(v || "", { ignore_whitespace: true }) ||
      !validator.isLength(v.trim() || "", { min: 4 })
        ? "Proszę wpisać wiadomość"
        : undefined,
  },
];
