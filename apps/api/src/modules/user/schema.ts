import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().min(2).max(50),

  lastName: z.string().min(2).max(50),

  email: z.email(),

  password: z.string().min(8).max(100),
});