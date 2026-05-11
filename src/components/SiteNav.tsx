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
