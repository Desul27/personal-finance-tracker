"use client";
import {AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Transaction } from "@prisma/client";

type DeleteTransaction = {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
};

type DeleteTransactionButtonProps = {
  transaction: DeleteTransaction;
};

export default function DeleteTransactionButton({
  transaction,
}: DeleteTransactionButtonProps) {
  
  const router = useRouter();

  const handleDelete = async () => {
  const response = await fetch(
    `/api/transactions/${transaction.id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    toast.error(data.message);
    return;
  }
  toast.success(data.message);
  router.refresh();
};
const transactionType = transaction.type === "INCOME"
    ? "Pemasukan"
    : "Pengeluaran";

  return (
    <div>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">  
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hapus Transaksi {transactionType} ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            
            Anda yakin ingin menghapus transaksi { transactionType} <strong className="font-bold">
              {transaction.amount.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}-  <br />
              {transaction.description}
              ?
              </strong> <br />
              Data yang dihapus tidak dapat dikembalikan
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-2 gap-2">
          <AlertDialogCancel className="flex-1">
            Batal
          </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button className="flex-1" onClick={handleDelete}>
                Hapus 
              </Button>
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    
    </div>
  );
}