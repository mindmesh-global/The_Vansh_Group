"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteNav() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav id="nav" className={navScrolled ? "solid compact" : undefined}>
      <Link href="/" className="nav-logo-wrap" aria-label="The Vansh Group">
        <span className="nav-mark" aria-hidden="true">
          <Image
            src="/vansh-logo-mark.png"
            alt=""
            width={224}
            height={224}
            className="nav-mark-img"
            priority
          />
        </span>
        <span className="nav-logo">
          THE <span>VANSH</span> GROUP
        </span>
      </Link>
      <ul className="nav-links">
        <li>
          <Link href="/#about">About</Link>
        </li>
        <li>
          <Link href="/#vision">Vision</Link>
        </li>
        <li>
          <Link href="/#products">Products</Link>
        </li>
        <li>
          <Link href="/#journal">Journal</Link>
        </li>
        <li>
          <Link href="/#contact">Contact</Link>
        </li>
      </ul>
      <Link href="/#contact" className="nav-btn">
        <span>Connect →</span>
      </Link>
    </nav>
  );
}
