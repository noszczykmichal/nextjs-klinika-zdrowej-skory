"use client";

import useScrollReveal from "@/hooks/useScrollReveal";
import { useRef } from "react";

export default function HeroArticleContent() {
  const revealItem = useRef<HTMLDivElement>(null);
  useScrollReveal(revealItem, 200, 0.1);

  return (
    <div className="flex flex-col lg:flex-row gap-x-[50px]" ref={revealItem}>
      <h2
        style={{
          fontSize: "var(--font-size-heading)",
        }}
        className="lg:w-[50%] font-extralight text-center lg:text-left"
      >
        Klinika Zdrowej Skóry – miejsce tworzone z pasją i sercem
      </h2>
      <div className="lg:w-[50%] text-[17px] text-justify pt-[26px] lg:pt-0">
        <p className="pb-[26px]">
          Nazywam się Olga Noszczyk i z pełnym zaangażowaniem prowadzę Klinikę
          Zdrowej Skóry w Warszawie – miejsce, które powstało z miłości do
          kosmetologii i troski o drugiego człowieka. Każdy, kto przekracza próg
          mojej kliniki, może liczyć na pełną uwagę, indywidualne podejście i
          zabiegi dopasowane nie tylko do potrzeb skóry, ale i stylu życia. W
          swoją pracę wkładam całe serce – wierzę, że tylko wtedy efekty są
          prawdziwie trwałe i piękne.
        </p>
        <p className="pb-[26px]">
          Łączę kosmetologię holistyczną, estetyczną i hi-tech, pracując
          wyłącznie na sprawdzonych, najwyższej klasy urządzeniach i
          preparatach. Nieustannie poszerzam swoją wiedzę i umiejętności, by móc
          oferować Ci najskuteczniejsze terapie oparte na najnowszych
          osiągnięciach nauki. Jeśli szukasz miejsca, gdzie Twoje potrzeby
          naprawdę mają znaczenie – jesteś we właściwym miejscu.
        </p>
        <p>
          Zapraszam Cię do świata, w którym piękno zaczyna się od zdrowej,
          zadbanej skóry i pełnego szacunku podejścia do Ciebie jako człowieka.
        </p>
      </div>
    </div>
  );
}
