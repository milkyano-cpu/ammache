import {
  AWARDS,
  INSIGHTS,
  ORG_ID,
  PAGE_URL,
  PERSON_ID,
  PORTRAIT,
  PROFILES,
  REGISTRATION,
  SEO,
  SITE_URL,
} from "./data";

export function NidalJsonLd() {
  const sameAs = PROFILES.filter((p) => p.sameAs && p.href).map((p) => p.href);
  const awards = AWARDS.map((a) => `${a.title} — ${a.source}`);
  const articles = INSIGHTS.filter((i) => i.href).map((i) => ({
    "@type": "Article",
    headline: i.title,
    url: new URL(i.href!, SITE_URL).toString(),
  }));

  const graph = [
    {
      "@type": "ProfilePage",
      "@id": `${PAGE_URL}#profilepage`,
      url: PAGE_URL,
      name: SEO.title,
      description: SEO.description,
      inLanguage: "en-AU",
      mainEntity: { "@id": PERSON_ID },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Nidal Ammache",
      givenName: "Nidal",
      familyName: "Ammache",
      url: PAGE_URL,
      image: `${SITE_URL}${PORTRAIT.desktop}`,
      description:
        "Australian architect, development strategist and business leader. Founder of Ammache Architects, established in Melbourne in 1998.",
      jobTitle: ["Architect", "Development Strategist", "Business Leader"],
      worksFor: { "@id": ORG_ID },
      knowsAbout: [
        "Architecture",
        "Property development",
        "Development strategy",
        "Human-centred design",
        "Mixed-use development",
      ],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Architect registration",
        name: `Registered Architect, Victoria (No. ${REGISTRATION.number})`,
        recognizedBy: { "@type": "Organization", name: REGISTRATION.board },
      },
      award: awards,
      ...(sameAs.length ? { sameAs } : {}),
      ...(articles.length ? { subjectOf: articles } : {}),
    },
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Ammache Architects",
      url: `${SITE_URL}/`,
      foundingDate: "1998",
      founder: { "@id": PERSON_ID },
      address: {
        "@type": "PostalAddress",
        streetAddress: "11 Meaden St",
        addressLocality: "Southbank",
        addressRegion: "VIC",
        postalCode: "3006",
        addressCountry: "AU",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Ammache Architects",
      publisher: { "@id": ORG_ID },
    },
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
