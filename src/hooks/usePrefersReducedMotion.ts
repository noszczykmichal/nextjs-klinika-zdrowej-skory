import { useMediaQuery } from "@/hooks/useMediaQuery";

const QUERY = "(prefers-reduced-motion: reduce)";

export default function usePrefersReducedMotion() {
  return useMediaQuery(QUERY);
}
