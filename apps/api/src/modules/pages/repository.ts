import type { PageStatus, Prisma } from "@prisma/client";

import prisma from "../../database/prisma";

export interface CreatePageData {
  title: string;
  slug: string;
  content: Prisma.InputJsonValue;
  status: PageStatus;
  seo?: Prisma.InputJsonValue;
}

export interface UpdatePageData {
  title?: string;
  slug?: string;
  content?: Prisma.InputJsonValue;
  status?: PageStatus;
  seo?: Prisma.InputJsonValue;
}

export class PagesRepository {
  findAll() {
    return prisma.page.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  findPublished() {
    return prisma.page.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  findById(id: number) {
    return prisma.page.findUnique({
      where: {
        id,
      },
    });
  }

  findPublishedBySlug(slug: string) {
    return prisma.page.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
      },
    });
  }

  create(data: CreatePageData) {
    return prisma.page.create({
      data,
    });
  }

  update(id: number, data: UpdatePageData) {
    return prisma.page.update({
      where: {
        id,
      },
      data,
    });
  }

  delete(id: number) {
    return prisma.page.delete({
      where: {
        id,
      },
    });
  }
}
