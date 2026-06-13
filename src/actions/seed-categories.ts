"use server";

import { prisma } from "@/lib/prisma";
import { TransactionType } from "@prisma/client";

export async function seedCategories() {
  await prisma.category.createMany({
    data: [
      // Income
      {
        name: "Gaji",
        type: TransactionType.INCOME,
      },
      {
        name: "Freelance",
        type: TransactionType.INCOME,
      },
      {
        name: "Bonus",
        type: TransactionType.INCOME,
      },
      {
        name: "Investasi",
        type: TransactionType.INCOME,
      },
      {
        name: "Lainnya (Income)",
        type: TransactionType.INCOME,
      },

      // Expense
      {
        name: "Makanan",
        type: TransactionType.EXPENSE,
      },
      {
        name: "Transportasi",
        type: TransactionType.EXPENSE,
      },
      {
        name: "Belanja",
        type: TransactionType.EXPENSE,
      },
      {
        name: "Tagihan",
        type: TransactionType.EXPENSE,
      },
      {
        name: "Hiburan",
        type: TransactionType.EXPENSE,
      },
      {
        name: "Kesehatan",
        type: TransactionType.EXPENSE,
      },
      {
        name: "Pendidikan",
        type: TransactionType.EXPENSE,
      },
      {
        name: "Lainnya (Expense)",
        type: TransactionType.EXPENSE,
      },
    ],
  });

  console.log("Categories seeded");
}