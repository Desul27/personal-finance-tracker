import TransactionCard from "@/components/TransactionCard";
import type { TransactionWithCategory } from "@/types/transaction";



type TransactionListProps = {
  transactions: TransactionWithCategory[];
};

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No transactions found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
        />
      ))}
    </div>
  );
}