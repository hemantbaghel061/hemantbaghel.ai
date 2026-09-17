import type { Metadata } from "next";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hemant Baghel — AI & Computer Vision Engineer",
  description:
    "Hemant Baghel is an AI and Computer Vision engineer focused on intelligent vision systems, machine learning, real-time computer vision and AI research.",
  metadataBase: new URL("https://hemantbaghel.netlify.app"),
  openGraph: {
    title: "Hemant Baghel — AI & Computer Vision Engineer",
    description:
      "Intelligent vision systems, real-time computer vision, and AI security research.",
    url: "https://hemantbaghel.netlify.app",
    siteName: "Hemant Baghel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemant Baghel — AI & Computer Vision Engineer",
    description:
      "Intelligent vision systems, real-time computer vision, and AI security research.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full bg-graphite text-bone font-body antialiased selection:bg-signal selection:text-graphite">
        {children}
      </body>
    </html>
  );
}
