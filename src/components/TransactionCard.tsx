import {formatCurrency, formatDate,} from "@/lib/format";
import DeleteTransactionButton from "./DeleteTransactionButton";
import Link from "next/link";
import { Pencil, SquarePen } from "lucide-react";
import { Button } from "./ui/button";



type TransactionCardProps = {
  transaction: {
    id: string;
    amount: number;
    description: string | null;
    type: "INCOME" | "EXPENSE";
    date: Date;

    category: {
      name: string;
    };
  };
};

export default function TransactionCard({
  transaction,
}: TransactionCardProps) {
  const transactionType =
  transaction.type === "INCOME"
    ? "Pemasukan"
    : "Pengeluaran";
  return (
    <div
      className="
        border
        rounded
        p-4
        mb-4
        space-y-2
      "
    >
      <div className="flex justify-between">

        <p className="font-bold">
          {transaction.category.name}
        </p>
                <span
            className={`
              text-sm
              border
              rounded
              px-2
              py-1
              ${
                transaction.type === "INCOME"
                  ? `
                    bg-green-100
                    text-green-800
                    dark:bg-green-900
                    dark:text-green-200
                  `
                  : `
                    bg-red-100
                    text-red-800
                    dark:bg-red-900
                    dark:text-red-200
                  `
              }
            `}
          >
            {transactionType}
          </span>
       

      </div>

      <p>
        {transaction.description}
      </p>

      <p className="text-lg font-semibold">
        {formatCurrency(
          Number(transaction.amount)
        )}
      </p>
      
        <p>
        {formatDate(
          transaction.date
        )}
      </p>
      <hr className="border-zinc-700" />
        <div className=" mt-3 flex gap-2 pt-3">

            <Button
              asChild
              variant="outline"
              size="icon"
           >
              <Link
                 href={`/transactions/${transaction.id}/edit`}
              >
                  <SquarePen className="h-4 w-4"/>
              </Link>
           </Button>

            <DeleteTransactionButton
              transaction={{
                id: transaction.id,
                description: transaction.description || "",
                amount: Number(transaction.amount),
                type: transaction.type,
              }}
            />

        </div>
    </div>
  );
}