"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function pagePath(pathname: string, searchParams: URLSearchParams | null) {
  const q = searchParams?.toString();
  return q ? `${pathname}?${q}` : pathname;
}

function GoogleAnalyticsPageViews({ id }: { id: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const path = pagePath(pathname, searchParams);
    if (lastPath.current === path) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 80;

    const tick = () => {
      if (cancelled) return;
      const gtag = window.gtag;
      if (typeof gtag === "function") {
        lastPath.current = path;
        gtag("config", id, { page_path: path });
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [pathname, searchParams, id]);

  return null;
}

export function GoogleAnalytics() {
  if (!measurementId) return null;

  const inlineInit = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}', { send_page_view: false });
`;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga-gtag-inline"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: inlineInit }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsPageViews id={measurementId} />
      </Suspense>
    </>
  );
}
