import { z } from "zod";
import { CategoryType } from "@prisma/client";

const categoryTypes = Object.values(CategoryType) as [
  CategoryType,
  ...CategoryType[],
];

export const createCategorySchema = z.object({
  name: z.string().trim().min(2).max(100),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(150)
    .regex(/^[a-z0-9-]+$/),

  type: z.enum(categoryTypes),

  description: z.string().trim().nullable().optional(),

  parentId: z.number().int().positive().nullable().optional(),

  sortOrder: z.number().int().default(0),

  isActive: z.boolean().default(true),
});

export const updateCategorySchema = createCategorySchema.partial();
