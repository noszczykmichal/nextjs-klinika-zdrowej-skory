import { useMediaQuery } from "@/hooks/useMediaQuery";

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

export function useIsMobile() {
  return useMediaQuery(QUERY);
}
