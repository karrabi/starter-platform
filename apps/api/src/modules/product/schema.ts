import { ProductStatus } from "@prisma/client";
import { z } from "zod";

import { seoSchema } from "../../schemas/seo";

const baseProductSchema = z.object({
  name: z.string().trim().min(2).max(200),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(200)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers, and hyphens only",
    ),

  shortDescription: z.string().trim().max(500).nullable().optional(),

  description: z.record(z.string(), z.unknown()),

  gallery: z.array(z.number().int().positive()).optional(),

  seo: seoSchema.optional(),

  status: z.nativeEnum(ProductStatus).default(ProductStatus.DRAFT),

  featured: z.boolean().default(false),

  categoryIds: z.array(z.number().int().positive()).optional(),
});

export const createProductSchema = baseProductSchema;

export const updateProductSchema = baseProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
