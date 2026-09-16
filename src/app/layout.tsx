import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://buyer-founder.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Buyer Founder — From buyer pain to shipped product",
    template: "%s · Buyer Founder",
  },
  description:
    "Tools for technical founders: discover buyer pain, incubate ideas, validate before launch, and sell named outcomes.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Buyer Founder",
    title: "Buyer Founder — From buyer pain to shipped product",
    description:
      "Tools for technical founders: discover buyer pain, incubate ideas, validate before launch, and sell named outcomes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buyer Founder",
    description:
      "Tools for technical founders: discover buyer pain, incubate ideas, validate before launch, and sell named outcomes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
