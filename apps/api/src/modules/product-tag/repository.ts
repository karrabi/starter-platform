import prisma from "../../database/prisma";

export class ProductTagRepository {
  assign(productId: number, tagId: number) {
    return prisma.productTag.create({
      data: {
        productId,
        tagId,
      },
    });
  }

  getTags(productId: number) {
    return prisma.productTag.findMany({
      where: {
        productId,
      },
      include: {
        tag: true,
      },
      orderBy: {
        tag: {
          name: "asc",
        },
      },
    });
  }

  remove(productId: number, tagId: number) {
    return prisma.productTag.delete({
      where: {
        productId_tagId: {
          productId,
          tagId,
        },
      },
    });
  }
}
