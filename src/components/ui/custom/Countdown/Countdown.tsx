"use client";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { redirect } from "next/navigation";

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  const timerText =
    remainingTime === 5
      ? "sekund"
      : remainingTime === 4 || remainingTime === 3 || remainingTime === 2
        ? "sekundy"
        : "sekundę";

  if (remainingTime === 0) {
    redirect("/");
  }
  return (
    <div className="flex flex-col items-center">
      <div className="text-[var(--gray-100)]"></div>
      <div className="text-[20px]">{remainingTime}</div>
      <div className="text-[var(--gray-100)]">{timerText}</div>
    </div>
  );
};

export default function Countdown() {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={5}
      colors={["#171a1a", "#5e5a5a", "#a59f9f", "#d7d4d4"]}
      colorsTime={[10, 6, 3, 0]}
      onComplete={() => ({ shouldRepeat: true, delay: 1 })}
      size={100}
      strokeWidth={5}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
}
