"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONSENT_KEY, updateConsent, type ConsentChoice } from "@/lib/gtag";

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function choose(choice: ConsentChoice) {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {}
    updateConsent(choice);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Zgoda na pliki cookie"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-lg border bg-background p-4 shadow-lg md:left-auto md:right-4"
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
