import prisma from "../database/prisma";

import { seedRoles } from "./roles";
import { seedUsers } from "./users";
import { seedSettings } from "./settings";

async function main() {
  console.log("Seeding database...");

  await seedRoles();

  await seedUsers();

  await seedSettings();

  console.log("Seed completed.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
