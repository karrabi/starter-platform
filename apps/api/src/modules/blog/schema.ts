import { z } from "zod";

import { seoSchema } from "../../schemas/seo";

const baseBlogSchema = z.object({
  title: z.string().trim().min(2).max(255),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(255)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers, and hyphens only",
    ),

  summary: z.string().trim().nullable().optional(),

  content: z.record(z.string(), z.unknown()),

  status: z.enum(["DRAFT", "PUBLISHED"]),

  seo: seoSchema.nullable().optional(),

  publishedAt: z.coerce.date().nullable().optional(),

  categoryIds: z.array(z.number().int().positive()).optional(),

  tagIds: z.array(z.number().int().positive()).optional(),
});

export const createBlogSchema = baseBlogSchema;

export const updateBlogSchema = baseBlogSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
