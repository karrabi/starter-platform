import prisma from "../../database/prisma";
import { CreateBlogDto, UpdateBlogDto } from "./dto";

export class BlogRepository {
  findAll() {
    return prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findById(id: number) {
    return prisma.blog.findUnique({
      where: { id },
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
    });
  }

  create(data: CreateBlogDto) {
    return prisma.blog.create({
      data,
    });
  }

  update(id: number, data: UpdateBlogDto) {
    return prisma.blog.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return prisma.blog.delete({
      where: { id },
    });
  }
}
