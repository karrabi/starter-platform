import { z } from "zod";

export const seoSchema = z.object({
  title: z.string().trim().max(200).optional(),

  description: z.string().trim().max(500).optional(),

  keywords: z.array(z.string().trim().min(1).max(100)).optional(),

  canonicalUrl: z.string().trim().url().optional(),

  robots: z.string().trim().max(100).optional(),

  ogTitle: z.string().trim().max(200).optional(),

  ogDescription: z.string().trim().max(500).optional(),

  ogImageId: z.number().int().positive().optional(),

  schemaMarkup: z.record(z.string(), z.unknown()).optional(),
});
