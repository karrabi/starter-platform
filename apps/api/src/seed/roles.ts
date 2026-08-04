import prisma from "../database/prisma";

export async function seedRoles() {
  const roles = [
    {
      name: "Admin",
      description: "System administrator",
    },
    {
      name: "Editor",
      description: "Content editor",
    },
    {
      name: "Author",
      description: "Content author",
    },
    {
      name: "User",
      description: "Standard user",
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name: role.name,
      },
      update: {},
      create: role,
    });
  }
}
