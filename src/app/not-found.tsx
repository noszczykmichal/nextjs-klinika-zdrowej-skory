"use client";
import dynamic from "next/dynamic";

const Countdown = dynamic(
  () => import("@/components/ui/custom/Countdown/Countdown"),
  { ssr: false }
);

export default function NotFound() {
  return (
    <main className="w-full flex justify-center px-[25px] md:px-[42px] mx-auto">
      <section className="w-full flex flex-col gap-y-[20px] items-center pb-[70px] lg:pb-[100px] max-w-[1300px]">
        <h1 className="text-(length:--font-size-h2)">Przykro nam...</h1>
        <p>Strona nie został znaleziona.</p>
        <p>Przekierowanie do strony głównej za:</p>
        <Countdown />
      </section>
    </main>
  );
}
