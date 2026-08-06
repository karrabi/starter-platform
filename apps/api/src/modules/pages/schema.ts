import { z } from "zod";

const pageStatusSchema = z.enum(["DRAFT", "PUBLISHED"]);

export const createPageSchema = z.object({
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

  seoTitle: z.string().trim().max(200).optional(),

  seoDescription: z.string().trim().max(500).optional(),
});

export const updatePageSchema = createPageSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
