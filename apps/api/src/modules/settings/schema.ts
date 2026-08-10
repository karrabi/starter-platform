import { z } from "zod";

const nullablePositiveInt = z.number().int().positive().nullable();

export const generalSettingsSchema = z.object({
  siteName: z.string().trim().min(1, "Site name is required").max(100),

  siteDescription: z.string().trim().max(500),

  logoMediaId: nullablePositiveInt,

  faviconMediaId: nullablePositiveInt,
});

export const seoSettingsSchema = z.object({
  defaultTitle: z.string().trim().max(100),

  titleTemplate: z.string().trim().max(150),

  defaultDescription: z.string().trim().max(500),

  defaultOgImageId: nullablePositiveInt,
});

export const contactSettingsSchema = z.object({
  email: z.union([z.email("Invalid email address"), z.literal("")]),

  phone: z.string().trim().max(50),

  address: z.string().trim().max(500),
});

export const socialSettingsSchema = z.object({
  facebook: z.string().trim().max(500),
  instagram: z.string().trim().max(500),
  linkedin: z.string().trim().max(500),
  x: z.string().trim().max(500),
  youtube: z.string().trim().max(500),
});

export const updateSettingsSchema = z.object({
  value: z.record(z.string(), z.unknown()),
});
