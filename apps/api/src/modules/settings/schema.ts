import { z } from "zod";

export const updateSettingsSchema = z.object({
  value: z.record(z.string(), z.unknown()),
});
