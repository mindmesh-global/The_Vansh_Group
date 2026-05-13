import type { Metadata } from "next";
import { HomePageClient } from "./HomePageClient";

const homeTitle =
  "The Vansh Group | AI-Native Software Products & Intelligent Digital Experiences";
const homeDescription =
  "The Vansh Group builds premium digital products—including MindMesh—where AI, modern engineering, and thoughtful design solve real-world problems.";

export const metadata: Metadata = {
  title: {
    absolute: homeTitle,
  },
  description: homeDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "The Vansh Group",
    title: homeTitle,
    description: homeDescription,
    images: [
      {
        url: "/vansh-logo-mark.png",
        width: 1200,
        height: 630,
        alt: "The Vansh Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/vansh-logo-mark.png"],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
