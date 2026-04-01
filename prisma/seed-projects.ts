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

async function upsertProjects(
  prisma: PrismaClient,
  projects: { name: string; image: string; desc: string }[],
  categoryId: number
) {
  for (const p of projects) {
    const slug = slugify(p.name);
    await prisma.project.upsert({
      where: { slug },
      update: {
        name: p.name,
        images: [p.image],
        shortDescription: p.desc,
        categoryId,
        published: true,
        projectType: "AMMACHE",
      },
      create: {
        slug,
        name: p.name,
        images: [p.image],
        shortDescription: p.desc,
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

  await upsertProjects(prisma, residentialProjects, residentialCat.id);
  await upsertProjects(prisma, commercialProjects, commercialCat.id);
  await upsertProjects(prisma, retailProjects, retailCat.id);

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
