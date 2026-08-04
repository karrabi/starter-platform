import bcrypt from "bcrypt";

import prisma from "../database/prisma";

export async function seedUsers() {
  const adminRole = await prisma.role.findUnique({
    where: {
      name: "Admin",
    },
  });

  if (!adminRole) {
    throw new Error("Admin role not found.");
  }

  const passwordHash = await bcrypt.hash("Admin123!", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@test.com",
    },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@test.com",
      passwordHash,
      isActive: true,
      roleId: adminRole.id,
    },
  });
}
