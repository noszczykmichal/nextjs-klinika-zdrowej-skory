"use client";

import { useEffect } from "react";
import { LABELS, trackConversion } from "@/lib/gtag";

// One global listener: counts clicks on any tel: link and any Booksy link,
// so existing buttons/links don't need to be edited.
export function ContactTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackConversion(LABELS.phone);
      } else if (href.includes("booksy.com")) {
        trackConversion(LABELS.booksy);
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
