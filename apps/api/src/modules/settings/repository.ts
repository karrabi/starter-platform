import type { Prisma } from "@prisma/client";

import prisma from "../../database/prisma";

export class SettingsRepository {
  getGroup(key: string) {
    return prisma.setting.findUnique({
      where: {
        key,
      },
    });
  }

  updateGroup(key: string, value: Prisma.InputJsonValue) {
    return prisma.setting.upsert({
      where: {
        key,
      },
      update: {
        value,
      },
      create: {
        key,
        value,
      },
    });
  }
}
