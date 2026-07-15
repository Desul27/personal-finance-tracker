import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/logout-button";
import Link from "next/link";
import { formatCurrency, formatDate, } from "@/lib/format";
import SummaryCard from "@/components/SummaryCard";
import TransactionCard from "@/components/TransactionCard";
import ThemeToggle  from "@/components/ThemeToggle";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const transactions =
    await prisma.transaction.findMany({
      where: {
        userId: session.user.id,
      },

      include: {
        category: true,
      },

      orderBy: {
        date: "desc",
      },
    });
  const totalIncome =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "INCOME"
      )
      .reduce(
        (sum, transaction) =>
          sum +
          Number(
            transaction.amount
          ),
        0
      );

  const totalExpense =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "EXPENSE"
      )
      .reduce(
        (sum, transaction) =>
          sum +
          Number(
            transaction.amount
          ),
        0
      );

  const balance = totalIncome - totalExpense;

  return (
    <main className="p-6">
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">
                Dashboard
              </h1>

              <p className="text-gray-500">
                Welcome back, {session.user.name } 🔥
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <ThemeToggle />
              <LogoutButton />
            </div>
          </header>

          <div className="mb-6">
            <Link href="/transactions/new"
                  className="
                    inline-block
                    rounded
                    border
                    px-4
                    py-2
                  "
                >
                  + Add Transaction
            </Link>
          </div>
      

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <SummaryCard
              title="Total Income"
              amount={formatCurrency(
                totalIncome
              )}
            />

            <SummaryCard
              title="Total Expense"
              amount={formatCurrency(
                totalExpense
              )}
            />

            <SummaryCard
              title="Balance"
              amount={formatCurrency(
                balance
              )}
            />

          </section>

              <h2 className="text-xl font-bold mt-6">
              Recent Transactions
             </h2>
          <section className="mt-1">
            {transactions.length === 0 ? (
              <div
                className="
                  border
                  rounded
                  p-8
                  text-center
                "
              >
                <h3 className="font-bold">
                  Belum ada transaksi
                </h3>
            
                <p>
                  Tambahkan transaksi
                  pertama Anda.
                </p>
              </div>
            ) : (
              transactions.map(
                (transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={{
                      ...transaction,
                      amount: Number(transaction.amount),
                    }}
                  />
                )
              )
            )}
      </section>
 </main>
  );
}