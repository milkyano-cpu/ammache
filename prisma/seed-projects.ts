import { PrismaClient } from "@prisma/client";

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

const residentialProjects = [
  { name: "Riverside Residences", image: "/project1.png", desc: "Modern riverside apartment complex with panoramic views" },
  { name: "Parkview Apartments", image: "/project2.png", desc: "Contemporary living spaces overlooking the park" },
  { name: "Thornbury Townhouses", image: "/project3.png", desc: "Boutique townhouse development in a prime location" },
  { name: "Hawthorn Heritage Homes", image: "/project4.png", desc: "Heritage-inspired residential dwellings" },
  { name: "Bayside Villas", image: "/project5.png", desc: "Luxurious seaside villa residences" },
  { name: "Kew Garden Estate", image: "/project6.png", desc: "Elegant garden estate with premium finishes" },
  { name: "Docklands Tower", image: "/project7.png", desc: "High-rise waterfront residential tower" },
  { name: "Southbank Suites", image: "/project8.png", desc: "Premium inner-city suite apartments" },
  { name: "Toorak Manor", image: "/project9.png", desc: "Exclusive manor-style luxury residences" },
  { name: "Brighton Beach House", image: "/project10.png", desc: "Coastal beach house with modern design" },
  { name: "Camberwell Courtyard", image: "/project11.png", desc: "Courtyard-style apartment living" },
  { name: "Fitzroy Loft Apartments", image: "/project12.png", desc: "Industrial-chic loft conversions" },
];

const commercialProjects = [
  { name: "Harbor Commerce Tower", image: "/project3.png", desc: "State-of-the-art commercial office tower" },
  { name: "Docklands Industrial Hub", image: "/project4.png", desc: "Modern industrial facility with flexible spaces" },
];

const retailProjects = [
  { name: "Highpoint Retail Plaza", image: "/project6.png", desc: "Premium retail destination with contemporary architecture" },
];

const residentialSpecs = [
  { key: "Building Type", value: "Residential Apartment" },
  { key: "Storeys", value: "12" },
  { key: "Net Lettable Area", value: "8,500 sqm" },
  { key: "Set Area", value: "1,200 sqm" },
  { key: "Construction Cost", value: "$45M" },
];

const commercialSpecs = [
  { key: "Building Type", value: "Commercial Office" },
  { key: "Storeys", value: "24" },
  { key: "Net Lettable Area", value: "18,000 sqm" },
  { key: "Set Area", value: "3,500 sqm" },
  { key: "Construction Cost", value: "$120M" },
];

const retailSpecs = [
  { key: "Building Type", value: "Retail Complex" },
  { key: "Storeys", value: "3" },
  { key: "Net Lettable Area", value: "12,000 sqm" },
  { key: "Set Area", value: "4,000 sqm" },
  { key: "Construction Cost", value: "$65M" },
];

const residentialScopeStatus = [
  { key: "Amenities", value: "Pool, Gym, Rooftop Garden" },
  { key: "Sustainability", value: "6 Star Energy Rating" },
  { key: "Approval", value: "City of Melbourne — Approved" },
  { key: "Role", value: "Sketch · Design Dev · Construction" },
  { key: "Status", value: "Completed" },
];

const commercialScopeStatus = [
  { key: "Amenities", value: "Lobby, Conference Center, Parking" },
  { key: "Sustainability", value: "5 Star Green Star" },
  { key: "Approval", value: "City of Melbourne — Approved" },
  { key: "Role", value: "Design Dev · Documentation" },
  { key: "Status", value: "Under Construction" },
];

const retailScopeStatus = [
  { key: "Amenities", value: "Food Court, Parking, Play Area" },
  { key: "Sustainability", value: "4 Star Green Star" },
  { key: "Approval", value: "City of Melbourne — Approved" },
  { key: "Role", value: "Sketch · Design Dev" },
  { key: "Status", value: "In Design" },
];

async function upsertProjects(
  prisma: PrismaClient,
  projects: { name: string; image: string; desc: string }[],
  categoryId: number,
  specifications: { key: string; value: string }[],
  scopeStatus: { key: string; value: string }[]
) {
  for (const p of projects) {
    const slug = slugify(p.name);
    await prisma.project.upsert({
      where: { slug },
      update: {
        name: p.name,
        images: [p.image],
        shortDescription: p.desc,
        specifications,
        scopeStatus,
        categoryId,
        published: true,
        projectType: "AMMACHE",
      },
      create: {
        slug,
        name: p.name,
        images: [p.image],
        shortDescription: p.desc,
        specifications,
        scopeStatus,
        categoryId,
        published: true,
        projectType: "AMMACHE",
      },
    });
  }
}

export async function seedProjects(prisma: PrismaClient) {
  const residentialCat = await prisma.category.upsert({
    where: { id: 1 },
    update: { name: "Residential Projects" },
    create: { name: "Residential Projects" },
  });

  const commercialCat = await prisma.category.upsert({
    where: { id: 2 },
    update: { name: "Commercial and Industrial Projects" },
    create: { name: "Commercial and Industrial Projects" },
  });

  const retailCat = await prisma.category.upsert({
    where: { id: 3 },
    update: { name: "Retail Projects" },
    create: { name: "Retail Projects" },
  });

  console.log("✅ Categories seeded");

  await upsertProjects(prisma, residentialProjects, residentialCat.id, residentialSpecs, residentialScopeStatus);
  await upsertProjects(prisma, commercialProjects, commercialCat.id, commercialSpecs, commercialScopeStatus);
  await upsertProjects(prisma, retailProjects, retailCat.id, retailSpecs, retailScopeStatus);

  console.log("✅ Projects seeded (15 total)");
}

// Run standalone when executed directly
const prisma = new PrismaClient();
seedProjects(prisma)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
