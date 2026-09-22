// Google Ads helpers: conversion events + Consent Mode v2 updates.

export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";

// Conversion labels come from Google Ads (the part after the slash in send_to: 'AW-xxx/LABEL').
export const LABELS = {
  phone: process.env.NEXT_PUBLIC_ADS_LABEL_PHONE ?? "",
  form: process.env.NEXT_PUBLIC_ADS_LABEL_FORM ?? "",
  booksy: process.env.NEXT_PUBLIC_ADS_LABEL_BOOKSY ?? "",
} as const;

export const CONSENT_KEY = "cookie-consent";
export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.gtag?.(...args);
}

export function trackConversion(label: string) {
  if (!ADS_ID || !label) return;
  gtag("event", "conversion", {
    send_to: `${ADS_ID}/${label}`,
    transport_type: "beacon", // survives navigation away (tel:, Booksy)
  });
}

export function updateConsent(choice: ConsentChoice) {
  gtag("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}
