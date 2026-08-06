import prisma from "../../database/prisma";

export class BlogCategoryRepository {
  add(blogId: number, categoryId: number) {
    return prisma.blogCategory.create({
      data: {
        blogId,
        categoryId,
      },
    });
  }

  remove(blogId: number, categoryId: number) {
    return prisma.blogCategory.delete({
      where: {
        blogId_categoryId: {
          blogId,
          categoryId,
        },
      },
    });
  }

  getCategories(blogId: number) {
    return prisma.blogCategory.findMany({
      where: {
        blogId,
      },
      include: {
        category: true,
      },
    });
  }
}
