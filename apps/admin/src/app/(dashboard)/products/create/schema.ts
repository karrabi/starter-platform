import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(200),

  slug: z
    .string()
    .trim()
    .min(2, "Slug is required")
    .max(200)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and hyphens only",
    ),

  shortDescription: z.string().trim().max(500).optional(),

  description: z.string().trim().min(1, "Description is required"),

  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]),

  featured: z.boolean(),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
