"use client";

import { trackEvent } from "@/lib/gtag";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

const MOBILE_NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#vision", label: "Vision" },
  { href: "/#products", label: "Products" },
  { href: "/#journal", label: "Journal" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuPanelId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    requestAnimationFrame(() => {
      menuButtonRef.current?.focus();
    });
  }, []);

  const openMobileMenu = useCallback(() => {
    setMobileOpen(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobileMenu();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      const panel = panelRef.current;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          menuButtonRef.current?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobileMenu]);

  useEffect(() => {
    if (!mobileOpen) return;

    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      firstLinkRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <div
        className={`nav-mobile-backdrop${mobileOpen ? " nav-mobile-backdrop--open" : ""}`}
        aria-hidden={!mobileOpen}
        onClick={closeMobileMenu}
      />

      <div
        ref={panelRef}
        id={menuPanelId}
        className={`nav-mobile-drawer${mobileOpen ? " nav-mobile-drawer--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!mobileOpen}
        {...(!mobileOpen ? { inert: true as const } : {})}
      >
        <ul className="nav-mobile-list">
          {MOBILE_NAV_LINKS.map(({ href, label }, i) => (
            <li key={href}>
              <Link
                ref={i === 0 ? firstLinkRef : undefined}
                href={href}
                className="nav-mobile-link"
                onClick={closeMobileMenu}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          className="nav-mobile-cta"
          onClick={() => {
            trackEvent("connect_click", {
              button_text: "Connect →",
              destination_url: "/#contact",
              keyword: "nav_mobile_drawer",
            });
            closeMobileMenu();
          }}
        >
          Connect →
        </Link>
      </div>

      <nav id="nav" className={navScrolled ? "solid compact" : undefined}>
        <Link href="/" className="nav-logo-wrap" aria-label="The Vansh Group">
          <span
            className="nav-mark-slot relative flex size-[106px] shrink-0 items-center justify-center overflow-hidden max-lg:size-[80px] max-[480px]:size-[72px]"
            aria-hidden="true"
          >
            <span className="relative flex size-[135px] shrink-0 origin-center scale-[calc(106/135)] items-center justify-center max-lg:scale-[calc(80/135)] max-[480px]:scale-[calc(72/135)]">
              <Image
                src="/vansh-logo-mark.png"
                alt=""
                width={500}
                height={500}
                sizes="(max-width: 480px) 72px, (max-width: 1024px) 80px, 106px"
                className="nav-mark-img relative h-auto w-[57%] shrink-0 object-contain"
                priority
              />
            </span>
          </span>
          <span className="nav-logo">
            THE <span>VANSH</span> GROUP
          </span>
        </Link>
        <ul className="nav-links">
          {MOBILE_NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>

        <div className="nav-trailing">
          <button
            ref={menuButtonRef}
            type="button"
            className={`nav-hamburger${mobileOpen ? " nav-hamburger--open" : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={menuPanelId}
            onClick={() => {
              trackEvent("hamburger_click", {
                button_text: mobileOpen ? "Close menu" : "Open menu",
                keyword: mobileOpen ? "nav_hamburger_close" : "nav_hamburger_open",
              });
              mobileOpen ? closeMobileMenu() : openMobileMenu();
            }}
            onKeyDown={(e) => {
              if (!mobileOpen || !panelRef.current) return;
              if (e.key !== "Tab") return;
              const focusables = panelRef.current.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
              );
              if (focusables.length === 0) return;
              const last = focusables[focusables.length - 1];
              if (e.shiftKey) {
                e.preventDefault();
                last.focus();
              } else {
                e.preventDefault();
                firstLinkRef.current?.focus();
              }
            }}
          >
            <span className="nav-hamburger-line" aria-hidden />
            <span className="nav-hamburger-line" aria-hidden />
            <span className="nav-hamburger-line" aria-hidden />
          </button>
          <Link
            href="/#contact"
            className="nav-btn"
            tabIndex={mobileOpen ? -1 : undefined}
            onClick={() => {
              trackEvent("connect_click", {
                button_text: "Connect →",
                destination_url: "/#contact",
                keyword: "nav_desktop",
              });
              if (mobileOpen) closeMobileMenu();
            }}
          >
            <span>Connect →</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
