import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getDashboardSummary,
  getMonthlyChart,
  getExpenseByCategory,
} from "@/lib/dashboard";
import { formatCurrency  } from "@/lib/format";


import LogoutButton from "@/components/logout-button";
import Link from "next/link";
import { UserCircle2 } from "lucide-react";

import MonthlyChart from "@/components/dashboard/MonthlyChart";
import SummaryCard from "@/components/dashboard/SummaryCard";

import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import ThemeToggle  from "@/components/ThemeToggle";
import TransactionPagination from "@/components/transactions/TransactionPagination";  
import SearchFilter from "@/components/transactions/SearchFilter"; 
import TransactionList from "@/components/transactions/TransactionList";

type TransactionsPageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    
  }>;
};

export default async function DashboardPage(
  {
  searchParams,
}: TransactionsPageProps
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }
  
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      
        select: {
          name: true,
        },
      });

      const summary =
      await getDashboardSummary(
          session.user.id
      );

      const monthlyChart =
      await getMonthlyChart(
          session.user.id
      );

      const expenseByCategory =
      await getExpenseByCategory(
          session.user.id
      );

  const totalTransactions = await prisma.transaction.count({
    where: {
      userId: session.user.id,
    },
  });

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
      take: 5,
    });

  const currentPage = 1;
  const totalPages = Math.max(1, Math.ceil(totalTransactions / 5));
   const params = await searchParams;

  // const page = Number(params.page) || 1;
  const search = params.search; 

  return (
    <main className="p-6">
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">
                Dashboard
              </h1>

              <p className="text-gray-500">
                Welcome back  🔥
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <Link
                  href="/profile"
                  className="
                      flex
                      items-center
                      gap-2
                      rounded-md
                      border
                      px-3
                      py-2
                      hover:bg-accent
                      transition-colors
                  "
              >
                  <UserCircle2
                      className="h-4 w-4"
                  />
                  {user?.name }
              </Link>

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
      

        <section className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          <SummaryCard
            title="Total Income"
            value={formatCurrency(summary.totalIncome)}
          />

          <SummaryCard
            title="Total Expense"
            value={formatCurrency(summary.totalExpense)}
          />

          <SummaryCard
            title="Balance"
            value={formatCurrency(summary.balance)}
          />
          <SummaryCard
            title="Transactions"
            value={summary.totalTransactions.toString()}
          />
         </section>

             <MonthlyChart
              data={monthlyChart}
            />

            <ExpensePieChart
              data={expenseByCategory}
            />

              <h2 className="text-xl font-bold mt-6 mb-1.5">
              Recent Transactions
             </h2>

             <section className="space-y-6">  

              <SearchFilter
              search={search}
                />

             <TransactionList
             transactions={transactions}
              />

              <TransactionPagination
                currentPage={currentPage}
                totalPages={totalPages}
                search={search}
              />
              </section>

 </main>
  );
}