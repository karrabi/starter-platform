import { z } from "zod";

export const assignCategorySchema = z.object({
  categoryId: z.coerce.number().int().positive(),
});

export type AssignCategoryDto = z.infer<typeof assignCategorySchema>;
