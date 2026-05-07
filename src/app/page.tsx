"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const root = document.getElementById("vansh-root");
    if (!root) return;

    root.innerHTML = `
<div id="c-dot"></div>
<div id="c-ring"></div>
<div id="sunrise-bg"></div>
<div class="grain"></div>
<canvas id="bg-canvas"></canvas>

<nav id="nav">
  <a href="#" class="nav-logo-wrap" aria-label="The Vansh Group">
    <span class="nav-sunrise" aria-hidden="true">
      <span class="sun-core"></span>
      <span class="sun-glow"></span>
      <span class="sun-horizon"></span>
    </span>
    <span class="nav-logo">THE <span>VANSH</span> GROUP</span>
  </a>
  <ul class="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="#manifesto">Purpose</a></li>
    <li><a href="#products">Products</a></li>
    <li><a href="#team">Team</a></li>
    <li><a href="#blog">Blog</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <button class="nav-btn" id="connect-btn"><span>Connect →</span></button>
</nav>

<section class="hero" id="home">
  <div class="hero-inner">

    <h1 class="hero-h1">
      <span class="hero-line">Where</span>
      <span class="hero-line">Intelligence</span>
      <span class="hero-line">Meets Design</span>
    </h1>
    <p class="hero-sub">We build intelligent technology that solves real-world problems — blending AI, design, and engineering into products that create meaningful impact.</p>
    <div class="hero-ctas">
      <button class="cta-primary" id="explore-btn"><span>Explore Products</span></button>
      <button class="cta-sec" id="story-btn">Our Story</button>
    </div>
  </div>
</section>

<div class="marquee-wrap">
  <div class="marquee-track">
    <div class="marquee-item"><span>✦</span> Real-World Impact</div>
    <div class="marquee-item"><span>✦</span> Premium Software</div>
    <div class="marquee-item"><span>✦</span> AI Products</div>
    <div class="marquee-item"><span>✦</span> MindMesh</div>
    <div class="marquee-item"><span>✦</span> Innovation First</div>
    <div class="marquee-item"><span>✦</span> The Vansh Group</div>
    <div class="marquee-item"><span>✦</span> Building Tomorrow</div>
    <div class="marquee-item"><span>✦</span> India · Global</div>
    <div class="marquee-item"><span>✦</span> Real-World Impact</div>
    <div class="marquee-item"><span>✦</span> Premium Software</div>
    <div class="marquee-item"><span>✦</span> AI Products</div>
    <div class="marquee-item"><span>✦</span> MindMesh</div>
    <div class="marquee-item"><span>✦</span> Innovation First</div>
    <div class="marquee-item"><span>✦</span> The Vansh Group</div>
    <div class="marquee-item"><span>✦</span> Building Tomorrow</div>
    <div class="marquee-item"><span>✦</span> India · Global</div>
  </div>
</div>

<section class="about" id="about">
  <div class="about-grid">
    <div class="about-left">
      <div class="section-tag reveal">About the Group</div>
      <h2 class="s-title reveal d1">We Don't Just<br>Build Software.<br><em>We Build Legacy.</em></h2>
      <p class="about-text reveal d2">Our philosophy is simple: technology should solve meaningful problems, not create unnecessary complexity.<br><br>Every product we build is designed to be intelligent, scalable, and deeply useful in the real world.</p>
      <p class="about-text reveal d3">From AI-native platforms to modern digital infrastructure, The Vansh Group focuses on creating software that delivers clarity, performance, and long-term impact.</p>
      <div class="about-nums reveal d2">
        <div class="num-block"><div class="nb-num">2+</div><div class="nb-label">Products Shipped</div></div>
        <div class="num-block"><div class="nb-num">∞</div><div class="nb-label">Vision Horizon</div></div>
        <div class="num-block"><div class="nb-num">100%</div><div class="nb-label">Client Obsessed</div></div>
        <div class="num-block"><div class="nb-num">24/7</div><div class="nb-label">Always Building</div></div>
      </div>
    </div>
    <div class="about-right reveal d2">
      <div class="about-img-wrap">
        <div class="ai-box1"><div class="ai-box1-letter">V</div></div>
        <div class="ai-box2">
          <div class="ai-box2-quote">"The best technology is the kind that dissolves a real problem — then gets out of the way."</div>
          <div class="ai-box2-attr">— The Vansh Group</div>
        </div>
        <div class="ai-box3">
          <div class="ai-box3-num">01</div>
          <div class="ai-box3-txt">Est.<br>2024</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="manifesto" id="manifesto">
  <div class="manifesto-inner">
    <div class="section-tag reveal manifesto-tag">Philosophy</div>
    <h2 class="s-title reveal d1 manifesto-title">Built With <em>Purpose</em></h2>
    <p class="manifesto-text reveal d2">We believe technology should feel invisible — powerful enough to solve difficult problems, yet simple enough to disappear into everyday life.</p>
    <p class="manifesto-text reveal d3">At The Vansh Group, we focus on creating software that is intelligent, human-centered, and built to leave a meaningful impact on the world.</p>
  </div>
</section>

<section class="products" id="products">
  <div class="products-head">
    <div>
      <div class="section-tag reveal">Our Products</div>
      <h2 class="s-title reveal d1" style="margin-bottom:0">What We've <em>Launched</em></h2>
    </div>
    <button class="cta-sec reveal" style="align-self:flex-end">View All →</button>
  </div>
  <div class="products-scroll" id="pscroll">
    <div class="products-row">
      <div class="p-card reveal"><div class="p-num">01</div><div class="p-card-top"><div class="p-label">AI Platform · Live</div><div class="p-name">MindMesh</div><p class="p-desc">MindMesh is an AI-native collaboration platform designed to connect ideas, workflows, and teams through intelligent orchestration and modern productivity systems.</p></div><div class="p-card-bot"><div class="p-status"><div class="p-status-dot"></div>Live & Growing</div></div></div>
      <div class="p-card reveal d1"><div class="p-num">02</div><div class="p-card-top"><div class="p-label">Stealth · 2025</div><div class="p-name">Project Orion</div><p class="p-desc">Our next flagship platform is currently in stealth development — built to redefine how technology interacts with one of the world&apos;s largest industries.</p></div><div class="p-card-bot"><div class="p-status"><div class="p-status-dot soon"></div>In Development</div></div></div>
      <div class="p-card reveal d2"><div class="p-num">03</div><div class="p-card-top"><div class="p-label">Partnership</div><div class="p-name">Build With Us</div><p class="p-desc">Have a vision that deserves world-class engineering? Partner with The Vansh Group to bring extraordinary ideas to life.</p></div><div class="p-card-bot"><div class="p-status"><div class="p-status-dot soon" style="background:var(--gold2);box-shadow:0 0 8px var(--gold2)"></div>Open for Partners</div></div></div>
      <div class="p-card reveal d3"><div class="p-num">04</div><div class="p-card-top"><div class="p-label">Coming 2026</div><div class="p-name">Horizon Labs</div><p class="p-desc">Our internal R&D division exploring AI, spatial computing, and next-gen human-computer interaction.</p></div><div class="p-card-bot"><div class="p-status"><div class="p-status-dot" style="background:var(--muted);box-shadow:none"></div>Research Phase</div></div></div>
    </div>
  </div>
  <div class="p-scroll-hint reveal">
    <span>Scroll to explore</span>
    <div class="p-scroll-line"></div>
    <div class="p-scroll-dots">
      <div class="sd active" data-dot="0"></div>
      <div class="sd" data-dot="1"></div>
      <div class="sd" data-dot="2"></div>
      <div class="sd" data-dot="3"></div>
    </div>
  </div>
</section>

<div class="feature-strip">
  <div class="fs-inner">
    <div class="fs-item">
      <div class="fs-icon"><svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div>
      <div class="fs-title">Speed First</div>
      <p class="fs-text">We move fast with precision — shipping intentionally, never carelessly.</p>
    </div>
    <div class="fs-item">
      <div class="fs-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
      <div class="fs-title">Enterprise Grade</div>
      <p class="fs-text">Reliability, scalability, and security are foundational to every system we design.</p>
    </div>
    <div class="fs-item">
      <div class="fs-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"></path></svg></div>
      <div class="fs-title">AI Native</div>
      <p class="fs-text">Intelligence is embedded from the beginning, not added later.</p>
    </div>
    <div class="fs-item">
      <div class="fs-icon"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div>
      <div class="fs-title">Human Centered</div>
      <p class="fs-text">Every experience is crafted for clarity, usefulness, and delight.</p>
    </div>
  </div>
</div>

<section class="team" id="team">
  <div class="team-hd">
    <div>
      <div class="section-tag reveal">The People</div>
      <h2 class="s-title reveal d1" style="margin-bottom:0">Minds Behind<br>the <em>Vision</em></h2>
      <p class="team-lead reveal d2">Builders, designers, and engineers shaping the future of intelligent software.</p>
    </div>
    <button class="cta-sec reveal" style="align-self:flex-end">Full Team →</button>
  </div>
  <div class="team-grid">
    <div class="t-card reveal">
      <div class="t-photo">
        <div class="t-monogram">V</div>
        <div class="t-info">
          <div class="t-name">Vansh</div>
          <div class="t-role">Founder & CEO</div>
        </div>
      </div>
    </div>
    <div class="t-card reveal d1">
      <div class="t-photo">
        <div class="t-monogram">A</div>
        <div class="t-info">
          <div class="t-name">Add Member</div>
          <div class="t-role">Chief Technology Officer</div>
        </div>
      </div>
    </div>
    <div class="t-card reveal d2">
      <div class="t-photo">
        <div class="t-monogram">D</div>
        <div class="t-info">
          <div class="t-name">Add Member</div>
          <div class="t-role">Head of Design</div>
        </div>
      </div>
    </div>
    <div class="t-card t-card-join reveal d3">
      <div class="t-join-icon">+</div>
      <span class="t-join-text">We&apos;re Hiring</span>
    </div>
  </div>
</section>

<section class="blog" id="blog">
  <div class="blog-hd">
    <div class="section-tag reveal blog-tag">Journal</div>
    <h2 class="s-title reveal d1">Insights, Ideas &amp; <em>Updates</em></h2>
  </div>
  <div class="blog-grid">
    <div class="b-card reveal">
      <div class="b-body">
        <div class="b-cat">Product Update · April 2025</div>
        <div class="b-title">Introducing MindMesh 2.0 — The Future of AI-Native Collaboration</div>
        <div class="b-excerpt">We rebuilt MindMesh from the ground up with a new neural engine that understands context, intent, and workflow patterns.</div>
      </div>
    </div>
    <div class="b-card b-sm reveal d1">
      <div class="b-body">
        <div class="b-cat">Thought Leadership · March 2025</div>
        <div class="b-title">Why Most Software Companies Are Building The Wrong Thing</div>
      </div>
    </div>
    <div class="b-card b-sm reveal d2">
      <div class="b-body">
        <div class="b-cat">Company · Feb 2025</div>
        <div class="b-title">The Vansh Group&apos;s Decade Vision: Software With a Soul</div>
      </div>
    </div>
  </div>
</section>

<section class="contact" id="contact">
  <div class="contact-grid">
    <div>
      <div class="section-tag reveal">Get in Touch</div>
      <h2 class="s-title reveal d1">Let's Build<br><em>Something</em><br>Extraordinary.</h2>
      <p class="contact-lead reveal d2">Whether you&apos;re building a product, exploring AI, or solving a difficult problem — we&apos;d love to hear what you&apos;re working on.</p>
    </div>
    <div>
      <div class="c-form reveal d2">
        <div class="f-row">
          <div class="f-group"><label>First Name</label><input type="text" placeholder="Aryan"></div>
          <div class="f-group"><label>Last Name</label><input type="text" placeholder="Sharma"></div>
        </div>
        <div class="f-group"><label>Email Address</label><input type="email" placeholder="aryan@company.com"></div>
        <div class="f-group"><label>Message</label><textarea rows="5" placeholder="Tell us about your vision..."></textarea></div>
        <button class="f-submit"><span>Send Message →</span></button>
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="ft-top">
    <div>
      <div class="ft-logo">THE <span>VANSH</span> GROUP</div>
      <p class="ft-tagline">Technology in service of real problems—crafted with precision, launched with purpose.</p>
    </div>
    <div class="ft-col">
      <h4>Products</h4>
      <ul><li><a href="#">MindMesh</a></li><li><a href="#">Project Orion</a></li><li><a href="#">Horizon Labs</a></li></ul>
    </div>
    <div class="ft-col">
      <h4>Company</h4>
      <ul><li><a href="#">About</a></li><li><a href="#">Team</a></li><li><a href="#">Blog</a></li></ul>
    </div>
    <div class="ft-col">
      <h4>Legal</h4>
      <ul><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Use</a></li></ul>
    </div>
  </div>
  <div class="ft-bot">
    <div class="ft-copy">© 2026 The Vansh Group. All rights reserved.</div>
    <div class="socials">
      <div class="soc">in</div>
      <div class="soc">x</div>
      <div class="soc">ig</div>
    </div>
  </div>
</footer>
`;

    const dot = document.getElementById("c-dot");
    const ring = document.getElementById("c-ring");
    const nav = document.getElementById("nav");
    const canvas = document.getElementById("bg-canvas") as HTMLCanvasElement | null;
    const pscroll = document.getElementById("pscroll");
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
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

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

    const connectBtn = document.getElementById("connect-btn");
    const exploreBtn = document.getElementById("explore-btn");
    const storyBtn = document.getElementById("story-btn");

    const goContact = () =>
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    const goProducts = () =>
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    const goAbout = () =>
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

    connectBtn?.addEventListener("click", goContact);
    exploreBtn?.addEventListener("click", goProducts);
    storyBtn?.addEventListener("click", goAbout);

    dotEls.forEach((d, i) => {
      d.addEventListener("click", () => {
        (pscroll as HTMLElement).scrollTo({ left: i * 444, behavior: "smooth" });
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
    <div id="vansh-root" />
  );
}
