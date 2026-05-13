"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/gtag";

const MINDMESH_URL = "https://www.mindmesh.global/";

type MindMeshExternalLinkProps = {
  children: ReactNode;
  /** Segment for GA4 (e.g. legal page vs footer). */
  keyword: string;
};

export function MindMeshExternalLink({ children, keyword }: MindMeshExternalLinkProps) {
  return (
    <a
      href={MINDMESH_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("mindmesh_click", {
          destination_url: MINDMESH_URL,
          button_text: "MindMesh",
          keyword,
        })
      }
    >
      {children}
    </a>
  );
}
