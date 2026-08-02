import { z } from "zod";

export const transactionSchema =
  z.object({
    amount: z.coerce
      .number()
      .positive(
        "Amount harus lebih dari 0"
      ),

    categoryId: z
      .string()
      .min(
        1,
        "Kategori wajib dipilih"
      ),

    description: z
      .string()
      .optional(),

    date: z
      .string()
      .min(
        1,
        "Tanggal wajib diisi"
      ),
  });

export type TransactionInput =
  z.infer<typeof transactionSchema>;