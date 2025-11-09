import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { WebsiteStructuredData } from "@/components/seo/structured-data";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://whereinmaginhawa.com'),
  title: {
    default: "Where In Maginhawa | Find the Best Restaurants & Cafés",
    template: "%s | Where In Maginhawa",
  },
  description: "Discover the best restaurants, cafés, and food spots on Maginhawa Street and nearby areas in Teacher's Village, Quezon City. Your ultimate guide to dining with 225+ places to explore.",
  keywords: [
    "Maginhawa Street",
    "Maginhawa restaurants",
    "Quezon City food",
    "Teacher's Village",
    "Manila restaurants",
    "Philippines dining",
    "QC cafes",
    "Maginhawa food guide",
    "best restaurants Maginhawa",
    "where to eat Maginhawa",
  ],
  authors: [{ name: "Where In Maginhawa" }],
  creator: "Where In Maginhawa",
  publisher: "Where In Maginhawa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Where In Maginhawa | Find the Best Restaurants & Cafés",
    description: "Discover the best restaurants, cafés, and food spots on Maginhawa Street and nearby areas in Teacher's Village, Quezon City. Your ultimate guide to dining with 225+ places to explore.",
    url: "https://whereinmaginhawa.com",
    siteName: "Where In Maginhawa",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Where In Maginhawa - Discover Maginhawa Street Restaurants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Where In Maginhawa | Find the Best Restaurants & Cafés",
    description: "Discover the best restaurants, cafés, and food spots on Maginhawa Street and nearby areas in Teacher's Village, Quezon City.",
    images: ["/og-image.jpg"],
    creator: "@whereinmaginhawa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <WebsiteStructuredData />
      </head>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
