import { z } from "zod";

export const deleteAccountSchema = z.object({
  currentPassword: z
    .string()
    .min(
      8,
      "Kata sandi harus terdiri dari minimal 8 karakter."
    ),
});

export type DeleteAccountInput =
  z.infer<typeof deleteAccountSchema>;