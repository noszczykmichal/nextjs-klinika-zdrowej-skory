import validator from "validator";

import { FormValues } from "@/types/types";

import {
  SocialIcon,
  HeroArticleData,
  FormFieldConfig,
  NavConfigItem,
} from "@/types/types";

export const navConfig: NavConfigItem[] = [
  { id: "o-nas", label: "O nas", href: "/o-nas" },
  {
    id: "zabiegi",
    label: "Zabiegi",
    href: "/zabiegi",
    resourceType: "treatment",
  },
  {
    id: "szkolenia",
    label: "Szkolenia",
    href: "/szkolenia",
    resourceType: "training",
  },
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
    href: "https://www.instagram.com/klinikazdrowejskory.warszawa",
    className: "var(--white-100)",
  },
  {
    name: "booksy",
    href: "https://booksy.com/pl-pl/13989_olga-noszczyk-klinika-zdrowej-skory_medycyna-estetyczna_3_warszawa?do=invite#ba_s=dl_1",
    className: "h-[30px] w-[30px] fill-[var(--white-100)]",
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

const fieldRegistry: FormFieldConfig[] = [
  {
    type: "text",
    name: "full_name",
    label: "Imię i Nazwisko",
    validator: (v: unknown) => {
      const val = typeof v === "string" ? v.trim() : "";
      return validator.isEmpty(val, { ignore_whitespace: true }) ||
        !validator.isLength(val, { min: 4 })
        ? "To pole jest wymagane"
        : undefined;
    },
  },
  {
    component: "textarea",
    name: "message",
    label: "Wiadomość",
    validator: (v: unknown) => {
      const val = typeof v === "string" ? v.trim() : "";
      return validator.isEmpty(val) || !validator.isLength(val, { min: 4 })
        ? "Proszę wpisać wiadomość"
        : undefined;
    },
  },
  {
    type: "text",
    name: "name",
    label: "Imię",
    validator: (v: unknown) => {
      const val = typeof v === "string" ? v.trim() : "";

      return validator.isEmpty(val) || !validator.isLength(val, { min: 4 })
        ? "To pole jest wymagane"
        : undefined;
    },
  },
  {
    type: "text",
    name: "surname",
    label: "Nazwisko",
    validator: (v: unknown) => {
      const val = typeof v === "string" ? v.trim() : "";

      return validator.isEmpty(val) || !validator.isLength(val, { min: 4 })
        ? "To pole jest wymagane"
        : undefined;
    },
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    validator: (v: unknown) => {
      const val = typeof v === "string" ? v.trim() : "";
      if (validator.isEmpty(val)) {
        return "To pole jest wymagane";
      }

      if (!validator.isEmail(val)) {
        return "Proszę wprowadzić poprawny email";
      }
      return undefined;
    },
  },
  {
    type: "tel",
    name: "tel",
    label: "Telefon",
    validator: (v: unknown) => {
      const val = typeof v === "string" ? v.trim() : "";

      if (validator.isEmpty(val)) {
        return "To pole jest wymagane";
      }
      if (
        !validator.isNumeric(val, { locale: "pl-PL" }) ||
        !validator.isLength(val, { min: 9, max: 9 })
      ) {
        return "Podaj 9 cyfr bez spacji, np. 123456789";
      }
      return undefined;
    },
  },
  {
    component: "select",
    name: "selected_training",
    label: "Wybierz interesujące Cię szkolenie",
    validator: (v: unknown) => {
      const val = typeof v === "string" ? v.trim() : "";
      return validator.isEmpty(val, { ignore_whitespace: true })
        ? "To pole jest wymagane"
        : undefined;
    },
  },
  {
    type: "checkbox",
    name: "privacy_policy",
    label: "Zapoznałem/am się z polityką prywatności.",
    validator: (v: unknown) =>
      v !== true ? "To pole jest wymagane" : undefined,
    wrapperClassName: "md:col-span-2",
  },
];

function filterFormFields(arrayOfFields: Array<keyof FormValues>) {
  return arrayOfFields.map((requestedField) => {
    const foundField = fieldRegistry.find(
      (field) => field.name === requestedField,
    );

    if (!foundField) {
      throw new Error(`Field ${requestedField} not found in registry!`);
    }

    return foundField;
  });
}

export const contactFormConfig: FormFieldConfig[] = filterFormFields([
  "full_name",
  "email",
  "tel",
  "message",
]);

export const enrollmentFormConfig: FormFieldConfig[] = filterFormFields([
  "name",
  "surname",
  "email",
  "tel",
  "selected_training",
  "privacy_policy",
]);
