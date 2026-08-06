import { z } from "zod";

export const assignTagSchema = z.object({
  tagId: z.coerce.number().int().positive(),
});
