import { z } from "zod";

export const updatePreferencesSchema = z.object({
  currency: z
    .string()
    .min(3, "Currency is required.")
    .max(10, "Invalid currency."),

  timezone: z
    .string()
    .min(3, "Timezone is required.")
    .max(100, "Invalid timezone."),
});

export type UpdatePreferencesInput =
  z.infer<typeof updatePreferencesSchema>;