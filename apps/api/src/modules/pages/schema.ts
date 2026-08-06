import { z } from "zod";

import { seoSchema } from "../../schemas/seo";

const pageStatusSchema = z.enum(["DRAFT", "PUBLISHED"]);

const basePageSchema = z.object({
  title: z.string().trim().min(2).max(200),

  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers, and hyphens only",
    ),

  content: z.record(z.string(), z.unknown()),

  status: pageStatusSchema.default("DRAFT"),

  seo: seoSchema.nullable().optional(),
});

export const createPageSchema = basePageSchema;

export const updatePageSchema = basePageSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
