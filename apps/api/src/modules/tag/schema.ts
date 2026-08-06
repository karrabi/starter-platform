import { TagType } from "@prisma/client";
import { z } from "zod";

export const createTagSchema = z.object({
  name: z.string().trim().min(2).max(100),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(150)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers, and hyphens only",
    ),

  type: z.nativeEnum(TagType),

  isActive: z.boolean().default(true),
});

export const updateTagSchema = createTagSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
