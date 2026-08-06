import prisma from "../../database/prisma";

import type { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import type { CategoryType } from "@prisma/client";

export class CategoryRepository {
  findAll() {
    return prisma.category.findMany({
      orderBy: [
        {
          type: "asc",
        },
        {
          sortOrder: "asc",
        },
        {
          name: "asc",
        },
      ],
    });
  }

  findById(id: number) {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  findByType(type: CategoryType) {
    return prisma.category.findMany({
      where: {
        type,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });
  }

  create(data: CreateCategoryDto) {
    return prisma.category.create({
      data,
    });
  }

  update(id: number, data: UpdateCategoryDto) {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    });
  }

  delete(id: number) {
    return prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
