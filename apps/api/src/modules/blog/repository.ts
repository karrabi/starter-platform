import prisma from "../../database/prisma";
import { CreateBlogDto, UpdateBlogDto } from "./dto";

export class BlogRepository {
  findAll() {
    return prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        categories: {
          include: {
            category: true,
          },
        },

        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  findPublished() {
    return prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
      },

      orderBy: {
        publishedAt: "desc",
      },

      include: {
        categories: {
          include: {
            category: true,
          },
        },

        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  findById(id: number) {
    return prisma.blog.findUnique({
      where: {
        id,
      },

      include: {
        categories: {
          include: {
            category: true,
          },
        },

        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  findBySlug(slug: string) {
    return prisma.blog.findUnique({
      where: { slug },
    });
  }

  findPublishedBySlug(slug: string) {
    return prisma.blog.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
      },

      include: {
        categories: {
          include: {
            category: true,
          },
        },

        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  create(data: CreateBlogDto) {
    const { categoryIds, tagIds, ...blogData } = data;

    return prisma.blog.create({
      data: {
        ...blogData,

        categories: {
          create: (categoryIds ?? []).map((categoryId) => ({
            categoryId,
          })),
        },

        tags: {
          create: (tagIds ?? []).map((tagId) => ({
            tagId,
          })),
        },
      },

      include: {
        categories: {
          include: {
            category: true,
          },
        },

        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateBlogDto) {
    const { categoryIds, tagIds, ...blogData } = data;

    return prisma.$transaction(async (tx) => {
      if (categoryIds !== undefined) {
        await tx.blogCategory.deleteMany({
          where: {
            blogId: id,
          },
        });
      }

      if (tagIds !== undefined) {
        await tx.blogTag.deleteMany({
          where: {
            blogId: id,
          },
        });
      }

      return tx.blog.update({
        where: {
          id,
        },

        data: {
          ...blogData,

          ...(categoryIds !== undefined && {
            categories: {
              create: categoryIds.map((categoryId) => ({
                categoryId,
              })),
            },
          }),

          ...(tagIds !== undefined && {
            tags: {
              create: tagIds.map((tagId) => ({
                tagId,
              })),
            },
          }),
        },

        include: {
          categories: {
            include: {
              category: true,
            },
          },

          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    });
  }

  delete(id: number) {
    return prisma.blog.delete({
      where: { id },
    });
  }
}
