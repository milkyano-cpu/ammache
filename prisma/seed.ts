import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { seedProjects } from "./seed-projects";

const prisma = new PrismaClient();

async function main() {
  // ================= SEED ADMIN USER =================
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@ammache.com" },
    update: {},
    create: {
      email: "admin@ammache.com",
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log(`Seeded admin user: ${admin.email} (${admin.id})`);

  // ================= SEED CATEGORIES & PROJECTS =================
  await seedProjects(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
