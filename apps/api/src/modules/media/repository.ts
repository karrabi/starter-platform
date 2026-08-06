import prisma from "../../database/prisma";

export interface CreateMediaDto {
  fileName: string;
  originalName: string;
  mimeType: string;
  extension: string;
  size: number;
  path: string;
}

export class MediaRepository {
  create(data: CreateMediaDto) {
    return prisma.media.create({
      data,
    });
  }

  findAll() {
    return prisma.media.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findById(id: number) {
    return prisma.media.findUnique({
      where: {
        id,
      },
    });
  }

  delete(id: number) {
    return prisma.media.delete({
      where: {
        id,
      },
    });
  }
}
