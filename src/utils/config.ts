import { SocialIcon } from "@/types/types";

export const navConfig = [
  { id: "o-nas", label: "O nas", href: "/o-nas" },
  { id: "zabiegi", label: "Zabiegi", href: "/zabiegi" },
  { id: "cennik", label: "Cennik", href: "/cennik" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "kontakt", label: "Kontakt", href: "/kontakt" },
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
