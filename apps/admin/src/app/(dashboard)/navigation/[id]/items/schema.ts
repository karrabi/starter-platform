import { z } from "zod";

export const menuItemSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),

  url: z.string().trim().min(1, "URL is required").max(500),

  icon: z.string().trim().optional(),

  parentId: z.number().int().positive().nullable(),

  sortOrder: z.number().int().min(0),

  target: z.enum(["_self", "_blank"]),

  isVisible: z.boolean(),
});

export type MenuItemFormData = z.output<typeof menuItemSchema>;
