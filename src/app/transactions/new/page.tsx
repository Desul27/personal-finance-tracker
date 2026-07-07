import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TransactionForm from "@/components/TransactionForm";

export default async function NewTransactionPage() {
  const categories =
    await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }
  // const UserId = session.user.id;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Add Transaction
      </h1>

      <TransactionForm categories={categories} />
    </div>
  );
}