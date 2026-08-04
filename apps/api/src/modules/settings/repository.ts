import prisma from "../../database/prisma";

export class SettingsRepository {
  getAll() {
    return prisma.setting.findMany({
      orderBy: {
        key: "asc",
      },
    });
  }

  get(key: string) {
    return prisma.setting.findUnique({
      where: { key },
    });
  }

  set(key: string, value: unknown) {
    return prisma.setting.upsert({
      where: { key },
      update: { value },
      create: {
        key,
        value,
      },
    });
  }
}
