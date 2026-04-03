import type { Metadata } from "next";
import { EB_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteBreadcrumb } from "@/components/SiteBreadcrumb";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ribeon",
  description:
    "Ribeon builds actionable signals from primary sources and maps them to tradeable instruments for institutional investors and researchers.",
  keywords: [
    "alternative data",
    "institutional data",
    "quantitative finance",
    "hedge fund data",
    "actionable signals",
    "alpha generation",
  ],
  openGraph: {
    title: "Ribeon",
    description:
      "Alternative data mapped to tradeable instruments for institutional investors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Thin navy accent line */}
        <div style={{ background: "var(--navy)", height: "5px", width: "100%" }} />

        {/* Persistent breadcrumb — always in the same position */}
        <SiteBreadcrumb />

        {children}
      </body>
    </html>
  );
}
