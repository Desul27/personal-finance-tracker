import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(50, "Name cannot exceed 50 characters."),
});

export type UpdateProfileInput = z.infer<
  typeof updateProfileSchema
>; //Kenapa TypeScript Infer, Schema adalah single source of truth.kita tidak menulis type dua kali.