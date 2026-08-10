import type { Prisma } from "@prisma/client";

import { AppError } from "../../utils/app-error";

import { SettingsRepository } from "./repository";

import {
  contactSettingsSchema,
  generalSettingsSchema,
  seoSettingsSchema,
  socialSettingsSchema,
} from "./schema";

const settingsSchemas = {
  general: generalSettingsSchema,
  seo: seoSettingsSchema,
  contact: contactSettingsSchema,
  social: socialSettingsSchema,
} as const;

type SettingsGroup = keyof typeof settingsSchemas;

export class SettingsService {
  constructor(private readonly repository = new SettingsRepository()) {}

  getGroup(key: string) {
    this.validateGroup(key);

    return this.repository.getGroup(key);
  }

  updateGroup(key: string, value: Prisma.InputJsonValue) {
    const schema = this.getSchema(key);

    const result = schema.safeParse(value);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Invalid settings";

      throw new AppError(message, 400);
    }

    return this.repository.updateGroup(
      key,
      result.data as Prisma.InputJsonValue,
    );
  }

  private validateGroup(key: string): asserts key is SettingsGroup {
    if (!(key in settingsSchemas)) {
      throw new AppError("Invalid settings group", 400);
    }
  }

  private getSchema(key: string) {
    this.validateGroup(key);

    return settingsSchemas[key];
  }
}
