import prisma from "../../database/prisma";

import type { CreateProductDto, UpdateProductDto } from "./dto";

export class ProductRepository {
  findAll() {
    return prisma.product.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        media: {
          orderBy: {
            position: "asc",
          },
          include: {
            media: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  findById(id: number) {
    return prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        media: {
          orderBy: {
            position: "asc",
          },
          include: {
            media: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: {
        slug,
      },
    });
  }

  findActiveBySlug(slug: string) {
    return prisma.product.findFirst({
      where: {
        slug,
        status: "ACTIVE",
      },
    });
  }

  create(data: CreateProductDto) {
    const { gallery, categoryIds, ...productData } = data;

    const mediaIds = Array.isArray(gallery)
      ? gallery.filter((value): value is number => typeof value === "number")
      : [];

    return prisma.product.create({
      data: {
        ...productData,

        media: {
          create: mediaIds.map((mediaId, position) => ({
            mediaId,
            position,
            featured: position === 0,
          })),
        },
        categories: {
          create: (categoryIds ?? []).map((categoryId) => ({
            categoryId,
          })),
        },
      },

      include: {
        media: {
          orderBy: {
            position: "asc",
          },
          include: {
            media: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateProductDto) {
    const { gallery, categoryIds, ...productData } = data;

    const mediaIds = Array.isArray(gallery)
      ? gallery.filter((value): value is number => typeof value === "number")
      : undefined;

    return prisma.$transaction(async (tx) => {
      if (mediaIds !== undefined) {
        await tx.productMedia.deleteMany({
          where: {
            productId: id,
          },
        });
      }

      if (categoryIds !== undefined) {
        await tx.productCategory.deleteMany({
          where: {
            productId: id,
          },
        });
      }

      return tx.product.update({
        where: {
          id,
        },

        data: {
          ...productData,

          ...(mediaIds !== undefined && {
            media: {
              create: mediaIds.map((mediaId, position) => ({
                mediaId,
                position,
                featured: position === 0,
              })),
            },
          }),

          ...(categoryIds !== undefined && {
            categories: {
              create: categoryIds.map((categoryId) => ({
                categoryId,
              })),
            },
          }),
        },

        include: {
          media: {
            orderBy: {
              position: "asc",
            },
            include: {
              media: true,
            },
          },

          categories: {
            include: {
              category: true,
            },
          },
        },
      });
    });
  }
  delete(id: number) {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
