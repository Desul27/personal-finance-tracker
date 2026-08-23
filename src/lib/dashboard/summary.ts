import { prisma } from "@/lib/prisma";

export async function getDashboardSummary(
  userId: string
) {
   const [
  income,
  expense,
  totalTransactions,
] = await Promise.all([
  prisma.transaction.aggregate({
    where: {
      userId,
      type: "INCOME",
    },
    _sum: {
      amount: true,
    },
  }),

  prisma.transaction.aggregate({
    where: {
      userId,
      type: "EXPENSE",
    },
    _sum: {
      amount: true,
    },
  }),

  prisma.transaction.count({
    where: {
      userId,
    },
  }),
]);

const totalIncome = Number(
  income._sum.amount ?? 0
);

const totalExpense = Number(
  expense._sum.amount ?? 0
);

const balance =
  totalIncome - totalExpense;
    
  return {
    totalIncome,
    totalExpense,
    balance,
    totalTransactions,
  };
}