import prisma from "../../database/prisma";

export class BlogTagRepository {
  assign(blogId: number, tagId: number) {
    return prisma.blogTag.create({
      data: {
        blogId,
        tagId,
      },
      include: {
        tag: true,
      },
    });
  }

  getTags(blogId: number) {
    return prisma.blogTag.findMany({
      where: {
        blogId,
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

  remove(blogId: number, tagId: number) {
    return prisma.blogTag.delete({
      where: {
        blogId_tagId: {
          blogId,
          tagId,
        },
      },
    });
  }
}
