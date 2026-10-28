"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONSENT_KEY, updateConsent, type ConsentChoice } from "@/lib/gtag";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);

  return () => window.removeEventListener("storage", onChange);
}

function needsConsentSnapshot() {
  try {
    return !localStorage.getItem(CONSENT_KEY);
  } catch {
    return true;
  }
}

export function CookieConsent() {
  const needsConsent = useSyncExternalStore(
    subscribe,
    needsConsentSnapshot,
    () => false,
  );

  const [dismissed, setDismissed] = useState(false);

  function choose(choice: ConsentChoice) {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {}
    updateConsent(choice);
    setDismissed(true);
  }

  if (!needsConsent || dismissed) return null;

  return (
    <div
      role="dialog"
      aria-label="Zgoda na pliki cookie"
      className="bg-background fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-lg border p-4 shadow-lg md:right-4 md:left-auto"
    >
      <p className="text-sm">
        Używamy plików cookie Google do pomiaru skuteczności reklam. Możesz je
        zaakceptować lub odrzucić. Szczegóły w{" "}
        <Link href="/polityka-prywatnosci" className="underline">
          polityce prywatności
        </Link>
        .
      </p>
      <div className="mt-3 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => choose("denied")}>
          Odrzuć
        </Button>
        <Button size="sm" onClick={() => choose("granted")}>
          Akceptuję
        </Button>
      </div>
    </div>
  );
}
