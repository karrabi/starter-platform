import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),

  slug: z.string().trim().min(1, "Slug is required").max(200),

  summary: z.string().trim().max(500).optional(),

  content: z.string().trim().min(1, "Content is required"),

  status: z.enum(["DRAFT", "PUBLISHED"]),

  categoryIds: z.array(z.number().int().positive()),

  tagIds: z.array(z.number().int().positive()),

  seoTitle: z.string().trim().max(200).optional(),

  seoDescription: z.string().trim().max(500).optional(),

  seoOgImageId: z.number().int().positive().nullable(),
});

export type CreateBlogFormData = z.output<typeof createBlogSchema>;
