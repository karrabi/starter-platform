import prisma from "../../database/prisma";

export class ProductCategoryRepository {
  assign(productId: number, categoryId: number) {
    return prisma.productCategory.create({
      data: {
        productId,
        categoryId,
      },
    });
  }

  getCategories(productId: number) {
    return prisma.productCategory.findMany({
      where: {
        productId,
      },
      include: {
        category: true,
      },
      orderBy: {
        category: {
          name: "asc",
        },
      },
    });
  }

  remove(productId: number, categoryId: number) {
    return prisma.productCategory.delete({
      where: {
        productId_categoryId: {
          productId,
          categoryId,
        },
      },
    });
  }
}
