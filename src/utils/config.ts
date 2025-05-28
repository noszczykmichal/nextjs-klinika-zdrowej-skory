import { SocialIcon, HeroArticleData } from "@/types/types";

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
    name: "booksy",
    href: "https://booksy.com/pl-pl/13989_olga-noszczyk-klinika-zdrowej-skory_medycyna-estetyczna_3_warszawa#ba_s=sh_1",
    className: "h-[30px] w-[30px] fill-[var(--white-100)]",
  },
];

export const scrollRevealConfig = (delay = 200, viewFactor = 0.25) => ({
  origin: "bottom",
  distance: "20px",
  duration: 500,
  delay,
  rotate: { x: 0, y: 0, z: 0 },
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  mobile: true,
  reset: false,
  useDelay: "always",
  viewFactor,
  viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
});

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
