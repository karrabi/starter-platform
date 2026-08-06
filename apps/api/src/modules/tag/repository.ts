import type { TagType } from "@prisma/client";

import prisma from "../../database/prisma";
import type {
  CreateTagDto,
  UpdateTagDto,
} from "./dto";

export class TagRepository {
  findAll() {
    return prisma.tag.findMany({
      orderBy: [
        {
          type: "asc",
        },
        {
          name: "asc",
        },
      ],
    });
  }

  findById(id: number) {
    return prisma.tag.findUnique({
      where: {
        id,
      },
    });
  }

  findByType(type: TagType) {
    return prisma.tag.findMany({
      where: {
        type,
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  create(data: CreateTagDto) {
    return prisma.tag.create({
      data,
    });
  }

  update(id: number, data: UpdateTagDto) {
    return prisma.tag.update({
      where: {
        id,
      },
      data,
    });
  }

  delete(id: number) {
    return prisma.tag.delete({
      where: {
        id,
      },
    });
  }
}