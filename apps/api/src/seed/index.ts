import prisma from "../database/prisma";

import { seedRoles } from "./roles";
import { seedUsers } from "./users";

async function main() {
  console.log("Seeding database...");

  await seedRoles();

  await seedUsers();

  console.log("Seed completed.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
