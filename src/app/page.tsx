"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const dot = root.querySelector<HTMLElement>("#c-dot");
    const ring = root.querySelector<HTMLElement>("#c-ring");
    const nav = root.querySelector<HTMLElement>("#nav");
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

    const onScroll = () => nav?.classList.toggle("solid", window.scrollY > 80);
    window.addEventListener("scroll", onScroll);

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

    const connectBtn = root.querySelector("#connect-btn");
    const exploreBtn = root.querySelector("#explore-btn");
    const storyBtn = root.querySelector("#story-btn");

    const goContact = () =>
      root.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    const goProducts = () =>
      root.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
    const goAbout = () =>
      root.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });

    connectBtn?.addEventListener("click", goContact);
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
      window.removeEventListener("scroll", onScroll);
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
      connectBtn?.removeEventListener("click", goContact);
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

      <nav id="nav">
        <a href="#" className="nav-logo-wrap" aria-label="The Vansh Group">
          <span className="nav-sunrise" aria-hidden="true">
            <span className="sun-core" />
            <span className="sun-glow" />
            <span className="sun-horizon" />
          </span>
          <span className="nav-logo">
            THE <span>VANSH</span> GROUP
          </span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#manifesto">Purpose</a>
          </li>
          <li>
            <a href="#products">Products</a>
          </li>
          <li>
            <a href="#team">Team</a>
          </li>
          <li>
            <a href="#blog">Blog</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <button type="button" className="nav-btn" id="connect-btn">
          <span>Connect →</span>
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-inner">
          <h1 className="hero-h1">
            <span className="hero-line">Where</span>
            <span className="hero-line">Intelligence</span>
            <span className="hero-line">Meets Design</span>
          </h1>
          <p className="hero-sub">
            We build intelligent technology that solves real-world problems —
            blending AI, design, and engineering into products that create
            meaningful impact.
          </p>
          <div className="hero-ctas">
            <button type="button" className="cta-primary" id="explore-btn">
              <span>Explore Products</span>
            </button>
            <button type="button" className="cta-sec" id="story-btn">
              Our Story
            </button>
          </div>
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee-track">
          <div className="marquee-item">
            <span>✦</span> Real-World Impact
          </div>
          <div className="marquee-item">
            <span>✦</span> Premium Software
          </div>
          <div className="marquee-item">
            <span>✦</span> AI Products
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
          <div className="marquee-item">
            <span>✦</span> Building Tomorrow
          </div>
          <div className="marquee-item">
            <span>✦</span> India · Global
          </div>
          <div className="marquee-item">
            <span>✦</span> Real-World Impact
          </div>
          <div className="marquee-item">
            <span>✦</span> Premium Software
          </div>
          <div className="marquee-item">
            <span>✦</span> AI Products
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
          <div className="marquee-item">
            <span>✦</span> Building Tomorrow
          </div>
          <div className="marquee-item">
            <span>✦</span> India · Global
          </div>
        </div>
      </div>

      <section className="about" id="about">
        <div className="about-grid">
          <div className="about-left">
            <div className="section-tag reveal">About the Group</div>
            <h2 className="s-title reveal d1">
              We Don&apos;t Just
              <br />
              Build Software.
              <br />
              <em>We Build Legacy.</em>
            </h2>
            <p className="about-text reveal d2">
              Our philosophy is simple: technology should solve meaningful
              problems, not create unnecessary complexity.
              <br />
              <br />
              Every product we build is designed to be intelligent, scalable,
              and deeply useful in the real world.
            </p>
            <p className="about-text reveal d3">
              From AI-native platforms to modern digital infrastructure, The
              Vansh Group focuses on creating software that delivers clarity,
              performance, and long-term impact.
            </p>
            <div className="about-nums reveal d2">
              <div className="num-block">
                <div className="nb-num">2+</div>
                <div className="nb-label">Products Shipped</div>
              </div>
              <div className="num-block">
                <div className="nb-num">∞</div>
                <div className="nb-label">Vision Horizon</div>
              </div>
              <div className="num-block">
                <div className="nb-num">100%</div>
                <div className="nb-label">Client Obsessed</div>
              </div>
              <div className="num-block">
                <div className="nb-num">24/7</div>
                <div className="nb-label">Always Building</div>
              </div>
            </div>
          </div>
          <div className="about-right reveal d2">
            <div className="about-img-wrap">
              <div className="ai-box1">
                <div className="ai-box1-letter">V</div>
              </div>
              <div className="ai-box2">
                <div className="ai-box2-quote">
                  &quot;The best technology is the kind that dissolves a real
                  problem — then gets out of the way.&quot;
                </div>
                <div className="ai-box2-attr">— The Vansh Group</div>
              </div>
              <div className="ai-box3">
                <div className="ai-box3-num">01</div>
                <div className="ai-box3-txt">
                  Est.
                  <br />
                  2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto" id="manifesto">
        <div className="manifesto-inner">
          <div className="section-tag reveal manifesto-tag">Philosophy</div>
          <h2 className="s-title reveal d1 manifesto-title">
            Built With <em>Purpose</em>
          </h2>
          <p className="manifesto-text reveal d2">
            We believe technology should feel invisible — powerful enough to
            solve difficult problems, yet simple enough to disappear into
            everyday life.
          </p>
          <p className="manifesto-text reveal d3">
            At The Vansh Group, we focus on creating software that is
            intelligent, human-centered, and built to leave a meaningful impact
            on the world.
          </p>
        </div>
      </section>

      <section className="products" id="products">
        <div className="products-head">
          <div>
            <div className="section-tag reveal">Our Products</div>
            <h2 className="s-title reveal d1" style={{ marginBottom: 0 }}>
              What We&apos;ve <em>Launched</em>
            </h2>
          </div>
          <button
            type="button"
            className="cta-sec reveal"
            style={{ alignSelf: "flex-end" }}
          >
            View All →
          </button>
        </div>
        <div className="products-scroll" id="pscroll">
          <div className="products-row">
            <div className="p-card reveal">
              <div className="p-num">01</div>
              <div className="p-card-top">
                <div className="p-label">AI Platform · Live</div>
                <div className="p-name">MindMesh</div>
                <p className="p-desc">
                  MindMesh is an AI-native collaboration platform designed to
                  connect ideas, workflows, and teams through intelligent
                  orchestration and modern productivity systems.
                </p>
              </div>
              <div className="p-card-bot">
                <div className="p-status">
                  <div className="p-status-dot" />
                  Live &amp; Growing
                </div>
              </div>
            </div>
            <div className="p-card reveal d1">
              <div className="p-num">02</div>
              <div className="p-card-top">
                <div className="p-label">Stealth · 2025</div>
                <div className="p-name">Project Orion</div>
                <p className="p-desc">
                  Our next flagship platform is currently in stealth development
                  — built to redefine how technology interacts with one of the
                  world&apos;s largest industries.
                </p>
              </div>
              <div className="p-card-bot">
                <div className="p-status">
                  <div className="p-status-dot soon" />
                  In Development
                </div>
              </div>
            </div>
            <div className="p-card reveal d2">
              <div className="p-num">03</div>
              <div className="p-card-top">
                <div className="p-label">Partnership</div>
                <div className="p-name">Build With Us</div>
                <p className="p-desc">
                  Have a vision that deserves world-class engineering? Partner
                  with The Vansh Group to bring extraordinary ideas to life.
                </p>
              </div>
              <div className="p-card-bot">
                <div className="p-status">
                  <div
                    className="p-status-dot soon"
                    style={{
                      background: "var(--gold2)",
                      boxShadow: "0 0 8px var(--gold2)",
                    }}
                  />
                  Open for Partners
                </div>
              </div>
            </div>
            <div className="p-card reveal d3">
              <div className="p-num">04</div>
              <div className="p-card-top">
                <div className="p-label">Coming 2026</div>
                <div className="p-name">Horizon Labs</div>
                <p className="p-desc">
                  Our internal R&amp;D division exploring AI, spatial computing,
                  and next-gen human-computer interaction.
                </p>
              </div>
              <div className="p-card-bot">
                <div className="p-status">
                  <div
                    className="p-status-dot"
                    style={{ background: "var(--muted)", boxShadow: "none" }}
                  />
                  Research Phase
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-scroll-hint reveal">
          <span>Scroll to explore</span>
          <div className="p-scroll-line" />
          <div className="p-scroll-dots">
            <div className="sd active" data-dot="0" />
            <div className="sd" data-dot="1" />
            <div className="sd" data-dot="2" />
            <div className="sd" data-dot="3" />
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
            <div className="fs-title">Speed First</div>
            <p className="fs-text">
              We move fast with precision — shipping intentionally, never
              carelessly.
            </p>
          </div>
          <div className="fs-item">
            <div className="fs-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="fs-title">Enterprise Grade</div>
            <p className="fs-text">
              Reliability, scalability, and security are foundational to every
              system we design.
            </p>
          </div>
          <div className="fs-item">
            <div className="fs-icon">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
              </svg>
            </div>
            <div className="fs-title">AI Native</div>
            <p className="fs-text">
              Intelligence is embedded from the beginning, not added later.
            </p>
          </div>
          <div className="fs-item">
            <div className="fs-icon">
              <svg viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div className="fs-title">Human Centered</div>
            <p className="fs-text">
              Every experience is crafted for clarity, usefulness, and delight.
            </p>
          </div>
        </div>
      </div>

      <section className="team" id="team">
        <div className="team-hd">
          <div>
            <div className="section-tag reveal">The People</div>
            <h2 className="s-title reveal d1" style={{ marginBottom: 0 }}>
              Minds Behind
              <br />
              the <em>Vision</em>
            </h2>
            <p className="team-lead reveal d2">
              Builders, designers, and engineers shaping the future of
              intelligent software.
            </p>
          </div>
          <button
            type="button"
            className="cta-sec reveal"
            style={{ alignSelf: "flex-end" }}
          >
            Full Team →
          </button>
        </div>
        <div className="team-grid">
          <div className="t-card reveal">
            <div className="t-photo">
              <div className="t-monogram">V</div>
              <div className="t-info">
                <div className="t-name">Vansh</div>
                <div className="t-role">Founder &amp; CEO</div>
              </div>
            </div>
          </div>
          <div className="t-card reveal d1">
            <div className="t-photo">
              <div className="t-monogram">A</div>
              <div className="t-info">
                <div className="t-name">Add Member</div>
                <div className="t-role">Chief Technology Officer</div>
              </div>
            </div>
          </div>
          <div className="t-card reveal d2">
            <div className="t-photo">
              <div className="t-monogram">D</div>
              <div className="t-info">
                <div className="t-name">Add Member</div>
                <div className="t-role">Head of Design</div>
              </div>
            </div>
          </div>
          <div className="t-card t-card-join reveal d3">
            <div className="t-join-icon">+</div>
            <span className="t-join-text">We&apos;re Hiring</span>
          </div>
        </div>
      </section>

      <section className="blog" id="blog">
        <div className="blog-hd">
          <div className="section-tag reveal blog-tag">Journal</div>
          <h2 className="s-title reveal d1">
            Insights, Ideas &amp; <em>Updates</em>
          </h2>
        </div>
        <div className="blog-grid">
          <div className="b-card reveal">
            <div className="b-body">
              <div className="b-cat">Product Update · April 2025</div>
              <div className="b-title">
                Introducing MindMesh 2.0 — The Future of AI-Native Collaboration
              </div>
              <div className="b-excerpt">
                We rebuilt MindMesh from the ground up with a new neural engine
                that understands context, intent, and workflow patterns.
              </div>
            </div>
          </div>
          <div className="b-card b-sm reveal d1">
            <div className="b-body">
              <div className="b-cat">Thought Leadership · March 2025</div>
              <div className="b-title">
                Why Most Software Companies Are Building The Wrong Thing
              </div>
            </div>
          </div>
          <div className="b-card b-sm reveal d2">
            <div className="b-body">
              <div className="b-cat">Company · Feb 2025</div>
              <div className="b-title">
                The Vansh Group&apos;s Decade Vision: Software With a Soul
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
              Let&apos;s Build
              <br />
              <em>Something</em>
              <br />
              Extraordinary.
            </h2>
            <p className="contact-lead reveal d2">
              Whether you&apos;re building a product, exploring AI, or solving a
              difficult problem — we&apos;d love to hear what you&apos;re
              working on.
            </p>
          </div>
          <div>
            <div className="c-form reveal d2">
              <div className="f-row">
                <div className="f-group">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    id="first-name"
                    type="text"
                    placeholder="Aryan"
                    autoComplete="given-name"
                  />
                </div>
                <div className="f-group">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    id="last-name"
                    type="text"
                    placeholder="Sharma"
                    autoComplete="family-name"
                  />
                </div>
              </div>
              <div className="f-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="aryan@company.com"
                  autoComplete="email"
                />
              </div>
              <div className="f-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your vision..."
                />
              </div>
              <button type="button" className="f-submit">
                <span>Send Message →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="ft-top">
          <div>
            <div className="ft-logo">
              THE <span>VANSH</span> GROUP
            </div>
            <p className="ft-tagline">
              Technology in service of real problems—crafted with precision,
              launched with purpose.
            </p>
          </div>
          <div className="ft-col">
            <h4>Products</h4>
            <ul>
              <li>
                <a href="#">MindMesh</a>
              </li>
              <li>
                <a href="#">Project Orion</a>
              </li>
              <li>
                <a href="#">Horizon Labs</a>
              </li>
            </ul>
          </div>
          <div className="ft-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div className="ft-col">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ft-bot">
          <div className="ft-copy">© 2026 The Vansh Group. All rights reserved.</div>
          <div className="socials">
            <div className="soc">in</div>
            <div className="soc">x</div>
            <div className="soc">ig</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
