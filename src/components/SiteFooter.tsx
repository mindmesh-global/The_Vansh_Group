import Link from "next/link";

const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ||
  "https://www.linkedin.com/company/the-vansh-group/";

export function SiteFooter() {
  return (
    <footer>
      <div className="ft-top">
        <div>
          <div className="ft-logo">
            THE <span>VANSH</span> GROUP
          </div>
          <p className="ft-tagline">
            Using technology to solve real-world problems through intelligent products and
            thoughtful design.
          </p>
        </div>
        <div className="ft-col">
          <h4>Products</h4>
          <ul>
            <li>
              <a
                href="https://www.mindmesh.global/"
                target="_blank"
                rel="noopener noreferrer"
              >
                MindMesh
              </a>
            </li>
          </ul>
        </div>
        <div className="ft-col">
          <h4>Company</h4>
          <ul>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <Link href="/#journal">Journal</Link>
            </li>
          </ul>
        </div>
        <div className="ft-col">
          <h4>Legal</h4>
          <ul>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-of-use">Terms of Use</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="ft-bot">
        <div className="ft-copy">© 2026 The Vansh Group. All rights reserved.</div>
        <div className="socials">
          <a
            className="soc"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Vansh Group on LinkedIn"
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
