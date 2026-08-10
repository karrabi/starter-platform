import { z } from "zod";

export const userFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must contain at least 2 characters")
    .max(50),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must contain at least 2 characters")
    .max(50),

  email: z
    .email("Invalid email address")
    .transform((value) => value.trim().toLowerCase()),

  password: z.string().max(100).optional(),

  roleId: z.number().int().positive().nullable(),

  isActive: z.boolean(),
});

export type UserFormData = z.output<typeof userFormSchema>;
