import { z } from "zod";

export const createPageSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must contain at least 2 characters")
    .max(200),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(200)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers, and hyphens only",
    ),

  content: z.string().trim().min(1, "Content is required"),

  status: z.enum(["DRAFT", "PUBLISHED"]),

  seoTitle: z.string().trim().max(200).optional(),

  seoDescription: z.string().trim().max(500).optional(),

  seoOgImageId: z.number().int().positive().nullable(),
});

export type CreatePageFormData = z.output<typeof createPageSchema>;
