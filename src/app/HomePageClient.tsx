"use client";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { trackEvent } from "@/lib/gtag";
import { useEffect, useRef, useState } from "react";

export function HomePageClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [contactError, setContactError] = useState<string | null>(null);

  const onContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);
    setContactStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          message,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setContactStatus("error");
        setContactError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      trackEvent("contact_submit", {
        button_text: "Send Message →",
        keyword: "homepage_contact_form",
      });
      setContactStatus("sent");
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch {
      setContactStatus("error");
      setContactError("Network error. Check your connection and try again.");
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const dot = root.querySelector<HTMLElement>("#c-dot");
    const ring = root.querySelector<HTMLElement>("#c-ring");
    const canvas = root.querySelector<HTMLCanvasElement>("#bg-canvas");
    const pscroll = root.querySelector<HTMLElement>("#pscroll");
    if (!dot || !ring || !canvas || !pscroll) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf1 = 0;
    let raf2 = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };
    document.addEventListener("mousemove", onMouseMove);

    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf1 = requestAnimationFrame(animateRing);
    };
    animateRing();

    const hoverTargets = root.querySelectorAll(
      "a,button,.p-card,.t-card,.b-card,.soc,.sd,.t-card-join",
    );
    const enterHandlers = new Map<Element, EventListener>();
    const leaveHandlers = new Map<Element, EventListener>();
    hoverTargets.forEach((el) => {
      const onEnter = () => document.body.classList.add("hovering");
      const onLeave = () => document.body.classList.remove("hovering");
      enterHandlers.set(el, onEnter);
      leaveHandlers.set(el, onLeave);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    const onDown = () => document.body.classList.add("clicking");
    const onUp = () => document.body.classList.remove("clicking");
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = 0;
    let H = 0;
    let pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      pts = [];
      for (let i = 0; i < 80; i += 1) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.5,
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const drawMesh = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i += 1) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245,191,128,0.48)";
        ctx.fill();
      }
      raf2 = requestAnimationFrame(drawMesh);
    };
    drawMesh();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) (entry.target as HTMLElement).classList.add("in");
        });
      },
      { threshold: 0.12 },
    );
    root.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    const dotEls = Array.from(root.querySelectorAll(".sd"));
    const onProductsScroll = () => {
      const i = Math.round(pscroll.scrollLeft / 444);
      dotEls.forEach((d, j) => d.classList.toggle("active", j === i));
    };
    pscroll.addEventListener("scroll", onProductsScroll);

    const magneticTargets = root.querySelectorAll(
      ".cta-primary,.cta-sec,.nav-btn,.f-submit",
    );
    const magneticMoveHandlers = new Map<Element, EventListener>();
    const magneticLeaveHandlers = new Map<Element, EventListener>();

    magneticTargets.forEach((el) => {
      const onMagneticMove = (event: Event) => {
        const mouseEvent = event as MouseEvent;
        const rect = (el as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;
        (el as HTMLElement).style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      };

      const onMagneticLeave = () => {
        (el as HTMLElement).style.transform = "translate(0, 0)";
      };

      magneticMoveHandlers.set(el, onMagneticMove);
      magneticLeaveHandlers.set(el, onMagneticLeave);
      el.addEventListener("mousemove", onMagneticMove);
      el.addEventListener("mouseleave", onMagneticLeave);
    });

    const exploreBtn = root.querySelector("#explore-btn");
    const storyBtn = root.querySelector("#story-btn");

    const goProducts = () =>
      root.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
    const goAbout = () =>
      root.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });

    exploreBtn?.addEventListener("click", goProducts);
    storyBtn?.addEventListener("click", goAbout);

    dotEls.forEach((d, i) => {
      d.addEventListener("click", () => {
        pscroll.scrollTo({ left: i * 444, behavior: "smooth" });
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", resize);
      pscroll.removeEventListener("scroll", onProductsScroll);
      hoverTargets.forEach((el) => {
        const onEnter = enterHandlers.get(el);
        const onLeave = leaveHandlers.get(el);
        if (onEnter) el.removeEventListener("mouseenter", onEnter);
        if (onLeave) el.removeEventListener("mouseleave", onLeave);
      });
      magneticTargets.forEach((el) => {
        const onMove = magneticMoveHandlers.get(el);
        const onLeave = magneticLeaveHandlers.get(el);
        if (onMove) el.removeEventListener("mousemove", onMove);
        if (onLeave) el.removeEventListener("mouseleave", onLeave);
      });
      exploreBtn?.removeEventListener("click", goProducts);
      storyBtn?.removeEventListener("click", goAbout);
      obs.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} id="vansh-root">
      <div id="c-dot" />
      <div id="c-ring" />
      <div id="sunrise-bg" />
      <div className="grain" />
      <canvas id="bg-canvas" aria-hidden />

      <SiteNav />

      <section className="hero" id="home">
        <div className="hero-inner">
          <h1 className="hero-h1">
            <span className="hero-line">Where Intelligence</span>
            <span className="hero-line">Becomes Products</span>
            <span className="hero-line">for Everyday Life</span>
          </h1>
          <p className="hero-sub">
            At The Vansh Group, we create intelligent software products designed
            to solve real-world problems through AI, modern engineering, and
            thoughtful design.
          </p>

          <div className="hero-ctas">
            <button type="button" className="cta-primary" id="explore-btn">
              <span>Explore Products</span>
            </button>
            <button type="button" className="cta-sec" id="story-btn">
              Our Vision
            </button>
          </div>
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee-track">
          <div className="marquee-item">
            <span>✦</span> AI-Native Products
          </div>
          <div className="marquee-item">
            <span>✦</span> Built for the Future
          </div>
          <div className="marquee-item">
            <span>✦</span> Intelligent Systems
          </div>
          <div className="marquee-item">
            <span>✦</span> MindMesh
          </div>

          <div className="marquee-item">
            <span>✦</span> Innovation First
          </div>

          <div className="marquee-item">
            <span>✦</span> Modern Software
          </div>

          <div className="marquee-item">
            <span>✦</span> The Vansh Group
          </div>

          <div className="marquee-item">
            <span>✦</span> AI-Native Products
          </div>
          <div className="marquee-item">
            <span>✦</span> Built for the Future
          </div>
          <div className="marquee-item">
            <span>✦</span> Intelligent Systems
          </div>
          <div className="marquee-item">
            <span>✦</span> MindMesh
          </div>
          <div className="marquee-item">
            <span>✦</span> Innovation First
          </div>
          <div className="marquee-item">
            <span>✦</span> The Vansh Group
          </div>
        </div>
      </div>

      <section className="about" id="about">
        <div className="about-grid">
          <div className="about-left">
            <div className="section-tag reveal">About Section</div>
            <h2 className="s-title reveal d1">
              We Build Technology
              <br />
              With Purpose.
              <br />
              <em>For Real-World Problems.</em>
            </h2>
            <p className="about-text reveal d2">
              The Vansh Group is a product-focused technology company creating
              original digital platforms and intelligent software experiences.
              <br />
              <br />
              Every product we build is designed with long-term thinking —
              combining simplicity, performance, and modern technology into
              tools that solve meaningful real-world problems.
            </p>
            <p className="about-text reveal d3">
              Our goal is to create products that feel effortless to use while
              delivering clarity, usefulness, and innovation at scale.
            </p>
            <div className="about-nums reveal d2">
              <div className="num-block">
                <div className="nb-num">01</div>
                <div className="nb-label">Product Launched</div>
              </div>
              <div className="num-block">
                <div className="nb-num">MindMesh</div>
                <div className="nb-label">Product</div>
              </div>
              <div className="num-block">
                <div className="nb-num">2025</div>
                <div className="nb-label">Founded</div>
              </div>
              <div className="num-block">
                <div className="nb-num">∞</div>
                <div className="nb-label">Problems Worth Solving</div>
              </div>
            </div>
          </div>
          <div className="about-right reveal d2">
            <div className="about-img-wrap">
              <div className="ai-box1">
                <img
                  src="/vansh-logo-mark.png"
                  alt=""
                  width={480}
                  height={480}
                  decoding="async"
                  className="ai-box1-mark"
                />
              </div>
              <div className="ai-box2">
                <div className="ai-box2-quote">
                  &quot;Using technology to solve real world problems.&quot;
                </div>
                <div className="ai-box2-attr">— The Vansh Group</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto" id="vision">
        <div className="manifesto-inner">
          <div className="section-tag reveal manifesto-tag">Philosophy Section</div>
          <h2 className="s-title reveal d1 manifesto-title">
            Built for the <em>Future</em>
          </h2>
          <p className="manifesto-text reveal d2">
            We believe technology should remove complexity, not create it.
          </p>
          <p className="manifesto-text reveal d3">
            That philosophy shapes every product we design — intelligent systems
            built with clarity, usability, and human-centered experiences at
            their core.
          </p>
          <p className="manifesto-text reveal d3">
            From AI-native platforms to modern digital ecosystems, The Vansh
            Group focuses on building products designed to evolve with the
            future.
          </p>
        </div>
      </section>

      <section className="products" id="products">
        <div className="products-head">
          <div>
            <div className="section-tag reveal">Products Section</div>
            <h2 className="s-title reveal d1" style={{ marginBottom: 0 }}>
              What We&apos;ve <em>Built</em>
            </h2>
          </div>
        </div>
        <div className="products-scroll" id="pscroll">
          <div className="products-row">
            <div className="p-card reveal">
              <a
                className="p-card-link"
                href="https://www.mindmesh.global/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MindMesh — open mindmesh.global"
                onClick={() =>
                  trackEvent("mindmesh_click", {
                    destination_url: "https://www.mindmesh.global/",
                    button_text: "MindMesh",
                    keyword: "homepage_product_card",
                  })
                }
              >
                <span className="sr-only">MindMesh</span>
              </a>
              <div className="p-num">01</div>
              <div className="p-card-top">
                <div className="p-label">Click to visit site</div>
                <div className="p-name">MindMesh</div>
                <p className="p-desc">
                  MindMesh is an AI-powered desktop workspace that connects your emails,
                  calendar, and personal memory into one intelligent productivity system.

                  Built for modern workflows, MindMesh helps you organize communication,

                </p>
              </div>
              <div className="p-card-bot">
                <div className="p-status">
                  <div className="p-status-dot" />
                  Live &amp; Growing
                </div>
              </div>
            </div>
            <div className="p-card p-card-coming">
              <div className="p-num">02</div>
              <div className="p-card-top">
                <div className="p-name p-name-coming">Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-scroll-hint reveal">
          <div className="p-scroll-line" />
          <div className="p-scroll-dots">
            <div className="sd active" data-dot="0" />
            <div className="sd" data-dot="1" />
          </div>
        </div>
      </section>

      <div className="feature-strip">
        <div className="fs-inner">
          <div className="fs-item">
            <div className="fs-icon">
              <svg viewBox="0 0 24 24">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div className="fs-title">Product First</div>
            <p className="fs-text">
              We create original software products built with long-term vision
              and purpose.
            </p>
          </div>
          <div className="fs-item">
            <div className="fs-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="fs-title">AI Native</div>
            <p className="fs-text">
              Intelligence is integrated from the foundation of every
              experience.
            </p>
          </div>
          <div className="fs-item">
            <div className="fs-icon">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
              </svg>
            </div>
            <div className="fs-title">Design Driven</div>
            <p className="fs-text">
              Clean, modern, and thoughtful interfaces crafted for humans.
            </p>
          </div>
          <div className="fs-item">
            <div className="fs-icon">
              <svg viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div className="fs-title">Built to Evolve</div>
            <p className="fs-text">
              Our products are designed to continuously improve and grow over
              time.
            </p>
          </div>
        </div>
      </div>

      <section className="blog" id="journal">
        <div className="blog-hd">
          <div className="section-tag reveal blog-tag">Journal Section</div>
          <h2 className="s-title reveal d1">
            Insights, Ideas &amp; <em>Updates</em>
          </h2>
        </div>
        <div className="blog-grid">
          <div className="b-card reveal">
            <div className="b-body">
              <div className="b-cat">Product Update · 2026</div>
              <div className="b-title">
                Inside MindMesh — Building the Future of Intelligent
                Productivity
              </div>
              <div className="b-excerpt">
                A closer look at how MindMesh is being designed to simplify
                communication, workflows, and digital organization.
              </div>
            </div>
          </div>
          <div className="b-card b-sm reveal d1">
            <div className="b-body">
              <div className="b-cat">Technology · 2026</div>
              <div className="b-title">
                Why Simplicity Will Define The Next Generation of Software
              </div>
            </div>
          </div>
          <div className="b-card b-sm reveal d2">
            <div className="b-body">
              <div className="b-cat">Vision · 2026</div>
              <div className="b-title">
                The Vansh Group&apos;s Approach to AI-Native Product Design
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-grid">
          <div>
            <div className="section-tag reveal">Get in Touch</div>
            <h2 className="s-title reveal d1">
              Let&apos;s Shape
              <br />
              The Future
              <br />
              <em>of Technology.</em>
            </h2>
            <p className="contact-lead reveal d2">
              We&apos;re continuously exploring new ideas, intelligent systems,
              and future-focused digital experiences.
            </p>
          </div>
          <div>
            <form
              className="c-form reveal d2"
              onSubmit={onContactSubmit}
              onInput={() => {
                if (contactStatus === "sent") setContactStatus("idle");
              }}
            >
              <div className="f-row">
                <div className="f-group">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    id="first-name"
                    type="text"
                    placeholder="Vansh"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(ev) => setFirstName(ev.target.value)}
                  />
                </div>
                <div className="f-group">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    id="last-name"
                    type="text"
                    placeholder="group"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(ev) => setLastName(ev.target.value)}
                  />
                </div>
              </div>
              <div className="f-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="vansh@company.com"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </div>
              <div className="f-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your vision..."
                  value={message}
                  onChange={(ev) => setMessage(ev.target.value)}
                  required
                />
              </div>
              {contactError ? (
                <p className="f-contact-msg f-contact-msg--err" role="alert">
                  {contactError}
                </p>
              ) : null}
              {contactStatus === "sent" ? (
                <p className="f-contact-msg f-contact-msg--ok">
                  Thank you — your message was sent.
                </p>
              ) : null}
              <button
                type="submit"
                className="f-submit"
                disabled={contactStatus === "sending"}
              >
                <span>
                  {contactStatus === "sending" ? "Sending…" : "Send Message →"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
