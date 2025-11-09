import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Browse Directory",
  description: "Explore 225+ restaurants, cafés, and food spots on Maginhawa Street. Filter by cuisine, price range, and amenities to find your perfect dining spot in Teacher's Village, Quezon City.",
  keywords: [
    "Maginhawa restaurants directory",
    "QC restaurants list",
    "Maginhawa cafes",
    "Teacher's Village dining",
    "Maginhawa food directory",
    "browse restaurants Maginhawa",
  ],
  openGraph: {
    title: "Browse Directory | Where In Maginhawa",
    description: "Explore 225+ restaurants, cafés, and food spots on Maginhawa Street. Filter by cuisine, price range, and amenities.",
    url: "https://whereinmaginhawa.com/places",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Directory | Where In Maginhawa",
    description: "Explore 225+ restaurants, cafés, and food spots on Maginhawa Street. Filter by cuisine, price range, and amenities.",
  },
};

export default function PlacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
