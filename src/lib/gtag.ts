declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a GA4 custom event when gtag is available (client-only, safe for SSR).
 */
export function trackEvent(
  eventName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- GA4 accepts arbitrary event params
  params?: Record<string, any>,
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  const page_path =
    typeof params?.page_path === "string" && params.page_path.length > 0
      ? params.page_path
      : `${window.location.pathname}${window.location.search}`;

  window.gtag("event", eventName, {
    ...(params ?? {}),
    page_path,
  });
}
