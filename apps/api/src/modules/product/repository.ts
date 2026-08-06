import prisma from "../../database/prisma";

import type { CreateProductDto, UpdateProductDto } from "./dto";

export class ProductRepository {
  findAll() {
    return prisma.product.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  findById(id: number) {
    return prisma.product.findUnique({
      where: {
        id,
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
    return prisma.product.create({
      data,
    });
  }

  update(id: number, data: UpdateProductDto) {
    return prisma.product.update({
      where: {
        id,
      },
      data,
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
