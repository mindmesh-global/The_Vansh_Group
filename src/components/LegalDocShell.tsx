import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

type LegalDocShellProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalDocShell({ title, children }: LegalDocShellProps) {
  return (
    <div className="legal-page-root min-h-screen cursor-auto bg-[var(--dark)] text-[var(--text)] selection:bg-[var(--gold-dim)] selection:text-[var(--gold2)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded focus:bg-[var(--navy)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--gold2)]"
      >
        Skip to content
      </a>
      <SiteNav />
      <div className="legal-fixed-nav-placeholder" aria-hidden />
      <main
        id="main"
        className="legal-page-header legal-doc-wrap legal-doc-main pb-12 sm:pb-16"
      >
        <h1 className="legal-page-title text-balance text-3xl font-normal tracking-tight text-[var(--gold2)] md:text-[2.35rem] md:leading-tight">
          {title}
        </h1>
        <div className="legal-prose">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
