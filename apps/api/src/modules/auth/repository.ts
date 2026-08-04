import prisma from "../../database/prisma";

export class AuthRepository {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });
  }
}
