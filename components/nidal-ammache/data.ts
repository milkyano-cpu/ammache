/**
 * Semua konten halaman /nidal-ammache ada di sini.
 * Edit teks/URL di file ini, komponen tidak perlu disentuh.
 *
 * PENTING (sesuai brief): hanya isi URL yang sudah terverifikasi.
 * href kosong ("") = belum ada link → tampil sebagai teks biasa & tidak masuk ke JSON-LD.
 */

export const SITE_URL = "https://ammachearchitects.com.au";
export const PAGE_PATH = "/nidal-ammache/";
export const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
export const PERSON_ID = `${PAGE_URL}#person`;
export const ORG_ID = `${SITE_URL}/#organization`;

export const CONTACT_HREF = "/contact"; 

export const PORTRAIT = {
  desktop: "/nidal/nidal-image.png",
  mobile: "/nidal/nidal-image-mobile.png",
  alt: "Nidal Ammache, Australian architect and development strategist",
};

export const SEO = {
  title: "Nidal Ammache | Architect, Development Strategist & Business Leader",
  description:
    "Nidal Ammache is an Australian architect, development strategist and founder of Ammache Architects, with 30+ years of experience connecting architecture, property development and human-centred design.",
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const HERO = {
  roles: ["Architect", "Development Strategist", "Business Leader"],
  // Angka dianimasikan (count up) — prefix/suffix tidak ikut dihitung
  stats: [
    { value: 33, prefix: "", suffix: "+", label: ["Years Designing", "for Real Life"] },
    { value: 900, prefix: "$", suffix: "M+", label: ["Projects", "Delivered"] },
    { value: 15, prefix: "", suffix: "+", label: ["Industry Awards &", "Recognition"] },
  ],
  // lead = kata pertama yang di-bold
  bio: [
    {
      lead: "Nidal",
      text: "Ammache is an Australian architect, development strategist and business leader with more than three decades of experience across architecture, property development and international business.",
    },
    {
      lead: "",
      text: "He is the Founder of Ammache Architects, a Melbourne-based practice he established in 1998 from a single-room office. Today the firm has delivered over $900 million in construction value across residential, commercial, industrial, retail, and mixed-use developments.",
    },
    {
      lead: "Nidal",
      text: "has built his career around a human-centred approach — the conviction that architecture should respond to the way people actually live, not just satisfy a brief. Every project he takes on begins with understanding the people who will inhabit the space.",
    },
  ],
};

export const FOUNDER_QUOTE = {
  lines: [
    "Architecture is not about producing something symmetrical or exciting.",
    "It is an understanding of people that is the measure of a building’s worth.",
  ],
  cite: "Nidal Ammache, Founder, Ammache Architects",
};

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const ABOUT = [
  {
    lead: "Nidal’s",
    text: "practice sits at the intersection of architecture and development strategy. Where most firms focus purely on design, Nidal has spent three decades understanding how architecture creates real commercial and social value for developers, investors, and the communities that surround their projects.",
  },
  {
    lead: "",
    text: "His hands-on approach has made him a trusted partner for developers seeking to maximise yield without compromising liveability. He navigates council approvals with a track record of securing outcomes other firms cannot — not by working around the process, but by understanding what councils, communities, and markets actually need.",
  },
  {
    lead: "Nidal’s",
    text: "work spans residential, commercial, industrial, retail, and mixed-use sectors across Melbourne. He has also designed buildings in the Middle East, bringing a cross-cultural understanding of how human behaviour shapes the built environment differently across communities.",
  },
  {
    lead: "",
    text: "As the practice enters its second generation with his sons Amir and Adam, Nidal remains the principal voice on design direction and development strategy — the foundation from which every Ammache project is built.",
  },
];

/* ------------------------------------------------------------------ */
/* Philosophy                                                          */
/* ------------------------------------------------------------------ */

export const PHILOSOPHY = [
  {
    icon: "/nidal/design.png",
    title: "Design From the Inside Out",
    text: "Before facades, before floor plans — there is the person who will live or work inside the space. Nidal designs from human behaviour outward: how people move, how light shapes mood, how space influences daily experience.",
  },
  {
    icon: "/nidal/architecture.png",
    title: "Architecture as Development Strategy",
    text: "The best architecture is also the best development decision. Spaces designed around people generate stronger buyer demand, fewer redesigns, faster approvals, and outcomes that hold their value over time.",
  },
  {
    icon: "/nidal/live.png",
    title: "Liveability and Yield in Balance",
    text: "Great development does not choose between liveability and commercial performance. Nidal’s approach is to maximise both — because spaces people genuinely want to live in are the ones that perform best in the market.",
  },
  {
    icon: "/nidal/enduring.png",
    title: "Enduring Over Trending",
    text: "Trends change. Human needs do not. Every project Nidal leads is designed to remain relevant, functional, and valued — not just at handover, but decades into the future.",
  },
];

/* ------------------------------------------------------------------ */
/* Business leadership                                                 */
/* ------------------------------------------------------------------ */

export const LEADERSHIP_INTRO =
  "Nidal’s influence extends beyond the drawing board. He is a recognised business leader and community figure whose work connects architecture, property development, and international commerce.";

export const LEADERSHIP = [
  {
    name: "Ammache Architects",
    text: "Founder and principal architect. Established in Melbourne in 1998. Portfolio of $900M+ in delivered construction value across Victoria and internationally.",
  },
  {
    name: "Australia Lebanon Chamber of Commerce",
    text: "Founder. Built to strengthen trade, investment, and business relationships between Australia and Lebanon and the broader GCC region.",
  },
  {
    name: "Australian Piling Technology",
    text: "Previous role. Contributed specialist knowledge in construction technology and structural systems to large-scale development projects.",
  },
  {
    name: "International Practice",
    text: "Designed buildings in Australia and the Middle East. Active interest in GCC development strategy, human-centred urbanism, and the evolution of Dubai’s built environment.",
  },
];

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */

// Nama Nidal di-underline (link ke atas halaman) sesuai desain mobile
export const CASE_STUDIES_INTRO = {
  before: "Six developments led by founder",
  name: "Nidal Ammache",
  after:
    "— mixed-use, commercial, industrial and hospitality — presented as development case studies: the opportunity, the challenge, the thinking, and the outcome. Project facts are drawn from Ammache Architects’ records; narrative reflects the practice’s human-centred development approach.",
};

/**
 * Case study. Pembagian sumber data:
 * - DATABASE (tabel `projects`, dicari lewat `dbSlug`): nama, foto (images[0]),
 *   description, dan stats bar dari `specifications`.
 * - HARDCODE (di sini): subjudul, quote, dan 7 poin case study
 *   (The Opportunity → Project Facts).
 */
export type CaseStudy = {
  dbSlug: string;
  /** Dipakai kalau project tidak ditemukan di database */
  fallbackName: string;
  type: string;
  location: string;
  opportunity: string;
  challenge: string;
  thinking: string;
  quote: string;
  response: string;
  humanOutcome: string;
  commercialOutcome: string;
  facts: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    dbSlug: "hindson",
    fallbackName: "Hindson",
    type: "Contemporary Mixed-Use",
    location: "Melbourne, Victoria",
    opportunity:
      "A 4,601-square-metre site with a rare 49-metre frontage is an uncommon asset in Melbourne’s middle-ring corridors. A parcel of this width and depth can carry more than a single use — ground-level commercial that serves the street, with residential above that gives the block a resident population. The opportunity was to treat the whole site as one integrated place rather than two programs stacked on top of each other.",
    challenge:
      "Mixed-use at this scale has to satisfy several audiences at once: a council assessing bulk, overshadowing and traffic against the corridor’s expectations; commercial tenants who need visibility and foot traffic; and residents who need the building to feel like home, not the floors above a shop. The wide frontage that makes the site valuable also makes it exposed, as a long street wall can easily read as a single heavy mass.",
    thinking:
      "Nidal’s approach begins before the plans are drawn. His documented strength is securing planning outcomes through early, direct engagement, attaining approvals through preliminary discussion before formal submission, so there are minimal surprises for any stakeholder. On a site this visible, that means shaping the massing around what the corridor can genuinely absorb, then designing the ground plane so the commercial edge earns its place on the street.",
    quote:
      "The wide frontage isn’t a constraint to hide. It’s the part of the building the whole street will judge, so it has to do the most work for people.",
    response:
      "The 49-metre frontage is broken into legible vertical rhythms so the street wall reads as a sequence of parts. Commercial tenancies hold the ground plane and activate the footpath; residential above is oriented for light and outlook away from the busiest edge. The depth of the site pulls private open space and circulation into the centre, giving residents quiet away from the commercial frontage.",
    humanOutcome:
      "A building that works at two speeds: a public, active edge by day, and a calm residential world above and behind it. Living above commercial is designed to feel like an advantage with walkable amenity downstairs, rather than a compromise.",
    commercialOutcome:
      "Currently under construction. A well-resolved mixed-use scheme on a corridor site of this size supports stronger commercial leasing at the base and sustained residential demand above, with the ground-plane activation councils increasingly require along main-road frontages.",
    facts: [
      "Sector: Mixed-use (commercial + residential)",
      "Site area: 4,601 sqm",
      "Frontage: 49 m",
      "Location: Melbourne, Victoria",
      "Status: Under construction",
      "Architect & development lead: Ammache Architects (Nidal Ammache)",
    ],
  },
  {
    dbSlug: "center-rd", 
    fallbackName: "Centre Rd",
    type: "Contemporary Apartment / Commercial",
    location: "Melbourne, Victoria",
    opportunity:
      "A 1,422-square-metre parcel on an established commercial road — the kind of site where an apartment building can borrow the convenience of the street while giving something back to it. The opportunity was density done well: enough homes to make the numbers work, designed so each one still feels individual.",
    challenge:
      "Delivering apartment yield on a compact commercial-road site without producing repetitive, dark or poorly-oriented dwellings. On a busy road, the challenge is also acoustic and visual — protecting residents from the street they benefit from being close to.",
    thinking:
      "Ammache’s consistent position is that liveability and yield are not opposites: the spaces people genuinely want to live in are the ones that perform best in the market. On Centre Rd that meant designing each apartment from the resident’s daily experience outward — orientation, light and outlook first — and letting the built form follow, rather than maximising the envelope and dividing what was left.",
    quote:
      "Density is only a problem when you design the building and forget the apartment. We start with the apartment.",
    response:
      "The scheme places commercial or shared functions at the active street edge and lifts living spaces to quieter, better-oriented positions. Balcony placement, ventilation and daylight were resolved dwelling-by-dwelling so the building reads as a collection of good homes at density, not a single mass subdivided after the fact.",
    humanOutcome:
      "Residents get the trade they actually wanted: the walkable convenience of a commercial-road address without the noise and exposure that usually comes with it. Each apartment holds its own light and outlook.",
    commercialOutcome:
      "Completed and built. A dwelling mix designed for liveability on a well-located site supports both absorption at sale/lease and long-term value retention.",
    facts: [
      "Sector: Contemporary apartment / commercial",
      "Site area: 1,422 m²",
      "Location: Melbourne, Victoria",
      "Status: Construction completed",
      "Architect & development lead: Ammache Architects (Nidal Ammache)",
    ],
  },
  {
    dbSlug: "rooks-rd-vermont",
    fallbackName: "Rooks Road, Vermont",
    type: "Warehouse Development / Business Park",
    location: "Vermont, Victoria",
    opportunity:
      "A 5,541-square-metre site with a 59-metre frontage — the largest development in this set, with the depth and street presence to become a genuine multi-tenancy business park rather than a single shed. Branded “Vermont Inc Business Park”, the opportunity was to lift industrial from purely functional to a workplace address businesses are proud to occupy.",
    challenge:
      "Industrial developments are usually judged on efficiency alone: how much lettable floor, how many trucks, how little else. The challenge here was to keep that operational performance — turning circles, loading, clear spans — while giving the estate an identity, a legible address system and a human-quality frontage that holds value as the surrounding area matures.",
    thinking:
      "Even in industrial, Ammache designs for the people who use the building — staff, drivers, visitors — not just the forklift. A business park that reads as considered attracts better tenants, holds longer leases, and ages better than a commodity warehouse row. On a 5,541 sqm site, getting the circulation and address hierarchy right is what turns floor area into a functioning place.",
    quote:
      "Industrial doesn’t have to be anonymous. People still arrive here every morning — the building should be worth arriving at.",
    response:
      "The estate is planned around clear vehicle movement and a wayfinding system (unit and level addressing, basement and gym parking noted on the signage) that lets multiple tenancies operate independently. A crafted street frontage — glazing, articulation and material quality at the entry — gives the business park a front door rather than a roller-shutter face.",
    humanOutcome:
      "A working address that staff and clients experience as professional and easy to navigate — a business park with identity, not an interchangeable shed.",
    commercialOutcome:
      "Completed and built. A multi-tenancy business park on a 5,541 sqm holding supports diversified rental income and stronger asset value than a single-use warehouse, while the quality frontage protects value over time.",
    facts: [
      "Sector: Warehouse / multi-tenancy business park",
      "Site area: 5,541 sqm",
      "Frontage: 59 m",
      "Location: Rooks Road, Vermont, Victoria",
      "Marketed as: Vermont Inc Business Park",
      "Status: Construction completed",
      "Architect & development lead: Ammache Architects (Nidal Ammache)",
    ],
  },
  {
    dbSlug: "maroondah-hwy",
    fallbackName: "Maroondah Highway",
    type: "Mixed-Use Tourism & Hospitality Destination",
    location: "Healesville, Victoria",
    opportunity:
      "A destination-scale mixed-use development on Maroondah Highway in Healesville — the gateway to the Yarra Valley — combining an antique market, hotel, epicurean centre, brewery and function centre on a single site. The opportunity was rare: not a building, but a place that gives visitors a reason to stop, stay and spend a day.",
    challenge:
      "Five very different uses — retail, accommodation, food and drink production, dining and events — each with its own servicing, hours, noise and visitor flow, have to share one site without colliding. A brewery’s logistics, a hotel’s calm, and a function centre’s event peaks are hard neighbours. The whole must also read as a coherent destination, not a strip of unrelated tenancies.",
    thinking:
      "This is human-centred development at its most literal: the entire brief is the visitor’s experience across a whole day. Ammache’s conviction — that the measure of a place is how people move through and feel in it — drives the planning. Arrival, wayfinding, the sequence from market to meal to stay, and the transitions between public buzz and private rest are the real design problem, more than any single façade.",
    quote:
      "A destination isn’t one great building. It’s a sequence of moments that add up to a day worth travelling for.",
    response:
      "The programs are organised so public, high-energy uses (market, brewery, function centre, epicurean centre) anchor the visitor journey, while the hotel is positioned for quiet and outlook. Servicing and event logistics are separated from the visitor experience, and the site is composed as a walkable destination that draws people deeper in rather than past.",
    humanOutcome:
      "A Yarra Valley destination where a visitor can browse, eat, drink and stay — each experience distinct but connected — in a place that feels made for a day out, not merely transacted through.",
    commercialOutcome:
      "A multi-revenue hospitality destination diversifies income across retail, accommodation, food-and-beverage production and events, and captures the Yarra Valley tourism economy that day-trip and overnight visitors bring to Healesville.",
    facts: [
      "Sector: Mixed-use tourism & hospitality",
      "Program: antique market, hotel, epicurean centre, brewery and function centre",
      "Location: Maroondah Highway, Healesville, Victoria",
      "Architect & development lead: Ammache Architects (Nidal Ammache)",
    ],
  },
  {
    dbSlug: "industrial-drive",
    fallbackName: "Industrial Drive",
    type: "Commercial / Industrial Estate",
    location: "Melbourne, Victoria",
    opportunity:
      "A multi-unit industrial estate — the signage on the scheme addresses warehouses numbered 1 to 16 — aimed at the strong Melbourne market for small-to-medium warehouse and trade tenancies. The opportunity was to deliver a large volume of flexible, sub-dividable industrial space with a single coherent identity.",
    challenge:
      "An estate of this many units has to work as a machine: truck access, turning, loading and parking for sixteen tenancies without gridlock, plus a clear addressing system so occupants and their customers can find each unit. Every square metre lost to poor circulation is lost yield.",
    thinking:
      "Industrial is where development discipline shows. Ammache’s approach is to resolve the operational logic first — how vehicles and people actually move through the estate — then give the whole a consistent, quality frontage so it leases faster and holds value. Get the circulation right and the yield follows.",
    quote:
      "In an estate, the driveway is the design. Get the movement right and everything else pays for itself.",
    response:
      "Units are arranged for independent access and efficient servicing, with a legible numbering and address system across the estate. A consistent architectural treatment — proportion, glazing and signage integration at each unit’s office frontage — lifts the estate above a plain warehouse row.",
    humanOutcome:
      "Tenancies that are easy to operate from and easy for customers to find, in an estate that presents as professional rather than purely utilitarian.",
    commercialOutcome:
      "A multi-unit estate spreads risk across many tenancies and suits the deep demand for flexible industrial and trade space, supporting both staged leasing and strata sale.",
    facts: [
      "Sector: Commercial / industrial estate",
      "Configuration: multi-unit warehouse estate (signage: Warehouse 1–16)",
      "Location: Melbourne, Victoria",
      "Architect: Ammache Architects (Nidal Ammache)",
    ],
  },
  {
    dbSlug: "guilded-way",
    fallbackName: "Guilded Way",
    type: "Contemporary Mixed-Use",
    location: "Melbourne, Victoria",
    opportunity:
      "A 1,299-square-metre mixed-use site with a 21-metre frontage — compact enough to demand discipline, generous enough to combine commercial at grade with dwellings above. The opportunity was a complete, built demonstration that mixed-use works at neighbourhood scale, not only on major corridors.",
    challenge:
      "On a mid-scale site, mixed-use has less room for error: the commercial ground floor must be viable and the homes above must be genuinely liveable, all within a tight envelope and a single 21-metre street face that has to serve both.",
    thinking:
      "The same principle that drives Ammache’s largest projects applies here: design from how people will use each part outward. A ground floor that reads as active and welcoming, and dwellings above planned for light and privacy, are what make a compact mixed-use building perform for both tenants and residents.",
    quote: "Scale isn’t what makes mixed-use hard. Care is. A small building forgives nothing.",
    response:
      "The commercial frontage activates the street within the 21-metre width, while residential above is set back and oriented for daylight and outlook. Circulation separates the two uses cleanly so each has its own identity and entry.",
    humanOutcome:
      "A neighbourhood building where the shopfront belongs to the street and the homes above feel private and light — mixed-use that improves the block rather than imposing on it.",
    commercialOutcome:
      "Completed and built. A proven, delivered mixed-use asset combining commercial income at grade with residential value above on a well-located mid-scale site.",
    facts: [
      "Sector: Contemporary mixed-use",
      "Site area: 1,299 sqm",
      "Frontage: 21 m",
      "Location: Melbourne, Victoria",
      "Status: Construction completed",
      "Architect: Ammache Architects (Nidal Ammache)",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Awards, media, registration                                         */
/* ------------------------------------------------------------------ */

export type LinkRow = { title: string; source: string; meta: string; href: string };

export const AWARDS: LinkRow[] = [
  {
    title: "Most Inspiring Architects Shaping the Future",
    source: "The Empire Magazine",
    meta: "2025",
    href: "https://theempiremagazine.com/magazine/nidal-ammache-the-most-inspiring-architects-shaping-the-future-2025/",
  },
  {
    title: "A’ Design Award The Hub Tourism Project",
    source: "A’ Design Award & Competition International Design Award",
    meta: "Architecture, Building & Structure Design",
    href: "https://competition.adesignaward.com/ada-winner-design.php?ID=111177", 
  },
  {
    title: "Best Full-Service Architecture & Sustainable Design Firm",
    source: "Melbourne Industry Recognition Award",
    meta: "Industry Recognition",
    href: "https://www.re-thinkingthefuture.com/design-studio-portfolios/a7596-ammache-architects-15-iconic-projects/", 
  },
  {
    title: "Founder Australia Lebanon Chamber of Commerce and Industry",
    source: "Community & Trade Leadership Recognition",
    meta: "Business Leadership",
    href: "https://designers.org/!287468", 
  },
];

export const MEDIA_INTRO =
  "Independent coverage, interviews and contributions. Each entry records publication, title and date, and links to the original source.";

export const MEDIA: LinkRow[] = [
  {
    title: "Feature — Most Inspiring Architects Shaping the Future",
    source: "The Empire Magazine",
    meta: "2020",
    href: "https://theempiremagazine.com/magazine/nidal-ammache-the-most-inspiring-architects-shaping-the-future-2025/",
  },
];

export const REGISTRATION = {
  title: "Registered Architect Victoria",
  board: "Architectural Registration Board of Victoria",
  registeredName: "Nidal Fayez Ammache",
  number: "15742",
};

/* ------------------------------------------------------------------ */
/* Insights                                                            */
/* ------------------------------------------------------------------ */

export type Insight = { category: string; title: string; excerpt: string; href?: string };

// href diisi setelah artikel di /insights/... benar-benar terbit (jangan link ke halaman 404)
export const INSIGHTS: Insight[] = [
  {
    category: "Development Strategy",
    title: "Why Human-Centred Development Creates Commercial Value",
    excerpt:
      "Spaces designed around how people actually live generate stronger buyer demand, fewer redesigns, and better long-term performance. This is not a design philosophy. It is a development strategy.",
  },
  {
    category: "Architecture & Practice",
    title: "What 33 Years in Architecture Taught Me About Property Development",
    excerpt:
      "The greatest lesson from three decades of practice: the projects that perform best are always the ones designed for the person who will actually live or work inside them. Not the render.",
  },
  {
    category: "Urban Development",
    title: "Architecture Should Start With Development Strategy",
    excerpt:
      "Too many projects separate design from development thinking. The best outcomes happen when architecture and strategy are part of the same conversation from the beginning.",
  },
  {
    category: "GCC & International",
    title: "Dubai’s Next Evolution: From Great Buildings to Great Human Experience",
    excerpt:
      "Dubai has mastered the building. The next chapter is about mastering what happens inside them: how people feel, connect, and live within the environments being created.",
  },
];

/* ------------------------------------------------------------------ */
/* Verified profiles                                                   */
/* ------------------------------------------------------------------ */

// sameAs: true = profil tentang Nidal (masuk ke Person.sameAs di JSON-LD)
export const PROFILES = [
  { label: "LinkedIn Profile", icon: "/nidal/linkedin.png", href: "https://au.linkedin.com/in/nidal-ammache-3ab8ab16", sameAs: true }, 
  { label: "Architect Register", icon: "/nidal/register.png", href: "https://portal.arbv.vic.gov.au/search-for-registrant/", sameAs: true },
  { label: "A’ Design Award Profile", icon: "/nidal/award.png", href: "https://competition.adesignaward.com/gooddesigner.php?profile=287468", sameAs: true }, 
  { label: "Empire Magazine Feature", icon: "/nidal/magazine.png", href: "https://theempiremagazine.com/magazine/nidal-ammache-the-most-inspiring-architects-shaping-the-future-2025/", sameAs: false }, 
  { label: "The Urban Developer", icon: "/nidal/urban.png", href: "https://www.theurbandeveloper.com/articles/ammache-architects-legacy", sameAs: true },
];
