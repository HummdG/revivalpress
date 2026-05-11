import type { Metadata } from "next";
import { Fraunces, Newsreader, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Revival Press — Revolutionary Islamic Research and Innovation",
    template: "%s — Revival Press",
  },
  description:
    "Revival Press is an academic publisher of peer-reviewed scholarship on Islamic law, jurisprudence, and global affairs, including the journals Legal Transformation in Muslim Societies (LTIMS) and Islamic International Law and Global Affairs (IILGA).",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://revivalpress.co.uk",
  ),
  openGraph: {
    title: "Revival Press",
    description:
      "Your home of revolutionary Islamic research and innovation.",
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
      className={`${fraunces.variable} ${newsreader.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
