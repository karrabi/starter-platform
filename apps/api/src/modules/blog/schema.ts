import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().trim().min(2).max(255),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(255)
    .regex(/^[a-z0-9-]+$/),

  summary: z.string().trim().nullable().optional(),

  content: z.record(z.string(), z.unknown()),

  status: z.enum(["DRAFT", "PUBLISHED"]),

  seoTitle: z.string().trim().nullable().optional(),

  seoDescription: z.string().trim().nullable().optional(),

  publishedAt: z.coerce.date().nullable().optional(),
});

export const updateBlogSchema = createBlogSchema.partial();
