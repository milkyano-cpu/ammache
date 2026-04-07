import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SplashScreen from "@/components/splash-screen"

const aktivGrotesk = localFont({
  src: [
    { path: "../public/font/AktivGrotesk/OTF/AktivGrotesk-Hairline.otf", weight: "100" },
    { path: "../public/font/AktivGrotesk/OTF/AktivGrotesk-Thin.otf", weight: "200" },
    { path: "../public/font/AktivGrotesk/OTF/AktivGrotesk-Light.otf", weight: "300" },
    { path: "../public/font/AktivGrotesk/OTF/AktivGrotesk-Regular.otf", weight: "400" },
    { path: "../public/font/AktivGrotesk/OTF/AktivGrotesk-Medium.otf", weight: "500" },
    { path: "../public/font/AktivGrotesk/OTF/AktivGrotesk-Bold.otf", weight: "600" },
    { path: "../public/font/AktivGrotesk/OTF/AktivGrotesk-Bold.otf", weight: "700" },
    { path: "../public/font/AktivGrotesk/OTF/AktivGrotesk-XBold.otf", weight: "800" },
    { path: "../public/font/AktivGrotesk/OTF/AktivGrotesk-Black.otf", weight: "900" },
  ],
  variable: "--font-aktiv-grotesk",
});

const helveticaNeue = localFont({
  src: [
    { path: "../public/font/helvetica-neue-5/HelveticaNeueUltraLight.otf", weight: "100" },
    { path: "../public/font/helvetica-neue-5/HelveticaNeueThin.otf", weight: "200" },
    { path: "../public/font/helvetica-neue-5/HelveticaNeueLight.otf", weight: "300" },
    { path: "../public/font/helvetica-neue-5/HelveticaNeueRoman.otf", weight: "400" },
    { path: "../public/font/helvetica-neue-5/HelveticaNeueMedium.otf", weight: "500" },
    { path: "../public/font/helvetica-neue-5/HelveticaNeueBold.otf", weight: "700" },
    { path: "../public/font/helvetica-neue-5/HelveticaNeueHeavy.otf", weight: "800" },
    { path: "../public/font/helvetica-neue-5/HelveticaNeueBlack.otf", weight: "900" },
  ],
  variable: "--font-helvetica-neue",
});

export const metadata: Metadata = {
  title: "Ammache Architects | Innovative Architecture Melbourne",
  description:
    "Ammache Architects is a Melbourne-based architecture studio founded in 1998, delivering thoughtful, innovative, and enduring design across residential, commercial, and industrial sectors.",

  openGraph: {
    title: "Ammache Architects | Innovative Architecture Melbourne",
    description:
      "Founded in 1998, Ammache Architects delivers thoughtful architecture shaped by people, place, and purpose across diverse sectors.",
    url: "https://ammachearchitects.com.au",
    siteName: "Ammache Architects",
    images: [
      {
        url: "https://ammachearchitects.com.au/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ammache Architects | Innovative Architecture Melbourne",
    description:
      "Melbourne-based architecture studio delivering thoughtful, enduring design since 1998.",
    images: ["https://ammachearchitects.com.au/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${aktivGrotesk.variable} ${helveticaNeue.variable}`}>
      <body className="antialiased">
         <SplashScreen />
          {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
