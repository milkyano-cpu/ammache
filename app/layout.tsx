import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const aktivGrotesk = localFont({
  src: [
    { path: "../public/font/AktivGrotesk/OTF/AktivGrotesk-Regular.otf", weight: "400" },
    { path: "../public/font/AktivGrotesk/OTF/AktivGrotesk-Medium.otf", weight: "500" },
    { path: "../public/font/AktivGrotesk/OTF/AktivGrotesk-Bold.otf", weight: "700" },
  ],
  variable: "--font-aktiv-grotesk",
});

const helveticaNeue = localFont({
  src: [
    { path: "../public/font/helvetica-neue-5/HelveticaNeueRoman.otf", weight: "400" },
    { path: "../public/font/helvetica-neue-5/HelveticaNeueMedium.otf", weight: "500" },
    { path: "../public/font/helvetica-neue-5/HelveticaNeueBold.otf", weight: "700" },
  ],
  variable: "--font-helvetica-neue",
});

export const metadata: Metadata = {
  title: "Ammache Architecture",
  description: "Innovative Architecture Built on Experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${aktivGrotesk.variable} ${helveticaNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
