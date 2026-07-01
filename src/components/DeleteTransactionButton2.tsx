//pake gaya server action yang benar
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
import { deleteTransaction } from "@/actions/create-transaction";

type DeleteTransactionButtonProps = {
  transactionId: string;
};

export default function DeleteTransactionButton({
  transactionId,
}: DeleteTransactionButtonProps) {
 const handleDelete = async () => {
    await deleteTransaction(transactionId);
  };  

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">  
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hapus Transaksi?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Transaksi yang dihapus tidak dapat dikembalikan lagi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-2">
          <AlertDialogCancel className="flex-1">
            Batal
          </AlertDialogCancel>
        
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={handleDelete} >
                
                Hapus
              </Button>
            </AlertDialogAction>
        
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}