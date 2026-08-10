import prisma from "../../database/prisma";

export class RoleRepository {
  findAll() {
    return prisma.role.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }
}
