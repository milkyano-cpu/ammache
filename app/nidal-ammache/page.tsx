import type { Metadata } from "next";
import { NidalAmmachePage } from "@/components/nidal-ammache";
import { PAGE_URL, PORTRAIT, SEO, SITE_URL } from "@/components/nidal-ammache/data";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: SEO.title },
  description: SEO.description,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    url: PAGE_URL,
    siteName: "Ammache Architects",
    title: SEO.title,
    description: SEO.description,
    firstName: "Nidal",
    lastName: "Ammache",
    locale: "en_AU",
    images: [{ url: `${SITE_URL}${PORTRAIT.desktop}`, alt: PORTRAIT.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [`${SITE_URL}${PORTRAIT.desktop}`],
  },
};

export default function Page() {
  return (
    <>
      <Header forceDark />
      <NidalAmmachePage />
      <Footer />
    </>
  );
}
