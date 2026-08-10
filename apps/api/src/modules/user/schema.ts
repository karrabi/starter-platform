import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().trim().min(2).max(50),

  lastName: z.string().trim().min(2).max(50),

  email: z.email().transform((value) => value.trim().toLowerCase()),

  password: z.string().min(8).max(100),

  roleId: z.number().int().positive().nullable().optional(),

  isActive: z.boolean().optional(),
});

export const updateUserSchema = z.object({
  firstName: z.string().trim().min(2).max(50).optional(),

  lastName: z.string().trim().min(2).max(50).optional(),

  email: z
    .email()
    .transform((value) => value.trim().toLowerCase())
    .optional(),

  password: z.string().min(8).max(100).optional(),

  roleId: z.number().int().positive().nullable().optional(),

  isActive: z.boolean().optional(),
});

export type CreateUserInput = z.output<typeof createUserSchema>;

export type UpdateUserInput = z.output<typeof updateUserSchema>;
