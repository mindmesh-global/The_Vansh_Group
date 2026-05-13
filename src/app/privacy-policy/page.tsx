import type { Metadata } from "next";
import { LegalDocShell } from "@/components/LegalDocShell";
import { MindMeshExternalLink } from "@/components/MindMeshExternalLink";

const pageTitle = "Privacy Policy";
const pageDescription =
  "How The Vansh Group collects, uses, and protects your information when you use our website.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    type: "article",
    url: "/privacy-policy",
    title: `${pageTitle} | The Vansh Group`,
    description: pageDescription,
    siteName: "The Vansh Group",
    images: [{ url: "/vansh-logo-mark.png", width: 1200, height: 630, alt: "The Vansh Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | The Vansh Group`,
    description: pageDescription,
    images: ["/vansh-logo-mark.png"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocShell title="Privacy Policy">
      <h2>Overview</h2>
      <p>
        The Vansh Group (“we,” “us,” “our”) explains here how we handle information when you use
        our website or contact us. By using the site, you agree to this policy. If you do not
        agree, please stop using the site.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>You give us:</strong> name, email, company, and anything you send via forms or
          email.
        </li>
        <li>
          <strong>Automatically:</strong> basic technical data (e.g. IP, browser, device) to run
          and secure the site.
        </li>
        <li>
          <strong>Cookies:</strong> we may use cookies or similar tools for preferences and
          analytics. You can control these in your browser.
        </li>
      </ul>

      <h2>How we use it</h2>
      <p>
        We use this information to reply to you, run and improve the website, send important
        notices, protect against abuse, and meet legal requirements. We do not sell your
        personal data for others’ marketing.
      </p>

      <h2>Sharing</h2>
      <p>
        We may share data with trusted service providers (e.g. hosting, email) who help us
        operate the site, when the law requires it, or in a merger or sale of assets. Products
        like{" "}
        <MindMeshExternalLink keyword="privacy_policy">MindMesh</MindMeshExternalLink>{" "}
        have their own policies when you use them there.
      </p>

      <h2>Retention & security</h2>
      <p>
        We keep data only as long as needed for these purposes or as the law requires. We use
        reasonable safeguards, but no online service is 100% secure.
      </p>

      <h2>Your choices</h2>
      <p>
        Where the law gives you rights (access, correction, deletion, etc.), you may contact
        us and we will respond as required.
      </p>

      <h2>Children</h2>
      <p>
        The site is not aimed at children under 16. If you think we have collected a child’s
        data, contact us and we will delete it.
      </p>

      <h2>Updates & contact</h2>
      <p>
        We may update this page from time to time. Questions? Reach us via{" "}
        <a href="/#contact">Contact</a> on our website.
      </p>
    </LegalDocShell>
  );
}
