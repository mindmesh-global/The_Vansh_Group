import type { Metadata } from "next";
import { LegalDocShell } from "@/components/LegalDocShell";

export const metadata: Metadata = {
  title: "Terms of Use | The Vansh Group",
  description:
    "Terms governing your use of The Vansh Group website.",
};

export default function TermsOfUsePage() {
  return (
    <LegalDocShell title="Terms of Use">
      <h2>Using this site</h2>
      <p>
        These terms apply to The Vansh Group’s website and related online content. By using the
        site, you agree to them. If you disagree, do not use the site.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not break the law, attack or probe our systems, overload or scrape the site against
        our rules, spread malware, or harass anyone. We may suspend access if you violate
        these terms or put the site or others at risk.
      </p>

      <h2>Content & IP</h2>
      <p>
        Text, graphics, logos, and layout on this site belong to The Vansh Group or our
        licensors. You may browse and use the site for personal or internal business use; do
        not copy or reuse our materials without permission except as allowed by law.
      </p>

      <h2>Links & other products</h2>
      <p>
        We may link to services such as{" "}
        <a href="https://www.mindmesh.global/" target="_blank" rel="noopener noreferrer">
          MindMesh
        </a>
        . Those services have their own terms. We are not responsible for third-party sites or
        content.
      </p>

      <h2>Feedback</h2>
      <p>
        If you send ideas or feedback, we may use it to improve our products without owing you
        compensation, except where the law says otherwise.
      </p>

      <h2>Disclaimer & liability</h2>
      <p>
        THE SITE IS PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES OF ANY KIND TO THE
        MAXIMUM EXTENT ALLOWED BY LAW. WE ARE NOT LIABLE FOR INDIRECT OR CONSEQUENTIAL DAMAGES
        OR LOST PROFITS ARISING FROM YOUR USE OF THE SITE. OUR TOTAL LIABILITY FOR A CLAIM IS
        LIMITED TO THE GREATER OF WHAT YOU PAID US FOR THE RELATED SERVICE IN THE PRIOR 12
        MONTHS OR USD $100 IF NOTHING WAS PAID.
      </p>

      <h2>Indemnity</h2>
      <p>
        You agree to cover reasonable losses we suffer due to your misuse of the site or
        breach of these terms, to the extent allowed by law.
      </p>

      <h2>Law & changes</h2>
      <p>
        These terms follow the laws of the place where The Vansh Group mainly operates its
        business, unless your local consumer laws require otherwise. We may update this page;
        continued use after changes means you accept the update. If one part of these terms is
        invalid, the rest still applies.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about these terms, use{" "}
        <a href="/#contact">Contact</a> on our website.
      </p>
    </LegalDocShell>
  );
}
