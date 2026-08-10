import prisma from "../../database/prisma";

export class UserRepository {
  findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isActive: true,
        roleId: true,
        role: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findById(id: number) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isActive: true,
        roleId: true,
        role: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  create(data: {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    roleId?: number | null;
    isActive?: boolean;
  }) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isActive: true,
        roleId: true,
        role: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  update(
    id: number,
    data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      passwordHash?: string;
      roleId?: number | null;
      isActive?: boolean;
    },
  ) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isActive: true,
        roleId: true,
        role: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  delete(id: number) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
