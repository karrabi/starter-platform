import { z } from "zod";

export const createMenuSchema = z.object({
  name: z.string().trim().min(2).max(100),

  description: z.string().trim().nullable().optional(),
});

export const updateMenuSchema = createMenuSchema.partial();

export const createMenuItemSchema = z.object({
  title: z.string().trim().min(1).max(100),

  url: z.string().trim().min(1).max(500),

  icon: z.string().trim().nullable().optional(),

  parentId: z.number().int().positive().nullable().optional(),

  sortOrder: z.number().int().default(0),

  target: z.enum(["_self", "_blank"]).default("_self"),

  isVisible: z.boolean().default(true),
});

export const updateMenuItemSchema = createMenuItemSchema.partial();
