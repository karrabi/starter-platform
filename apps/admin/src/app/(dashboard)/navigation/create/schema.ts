import { z } from "zod";

export const menuSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100),

  description: z.string().trim().optional(),
});

export type MenuFormData = z.output<typeof menuSchema>;
