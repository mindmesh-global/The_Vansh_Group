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
        <span
          className="nav-mark-slot relative flex size-[92px] shrink-0 items-center justify-center overflow-hidden max-lg:size-[70px] max-[480px]:size-[64px]"
          aria-hidden="true"
        >
          <span className="relative flex size-[135px] shrink-0 origin-center scale-[calc(92/135)] items-center justify-center max-lg:scale-[calc(70/135)] max-[480px]:scale-[calc(64/135)]">
            <Image
              src="/vansh-logo-mark.png"
              alt=""
              width={500}
              height={500}
              sizes="(max-width: 480px) 64px, (max-width: 1024px) 70px, 92px"
              className="nav-mark-img relative h-auto w-[54%] shrink-0 object-contain"
              priority
            />
          </span>
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
