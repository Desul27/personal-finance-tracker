import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { getTransactions } from "@/lib/transaction/getTransactions";
import Link from "next/link";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionPagination from "@/components/transactions/TransactionPagination";
import SearchFilter from "@/components/transactions/SearchFilter";


type TransactionsPageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    
  }>;
};// Mendefinisikan tipe TransactionsPageProps yang berisi properti searchParams. searchParams adalah sebuah Promise yang menghasilkan objek dengan properti opsional page bertipe string. Tipe ini digunakan untuk menentukan parameter pencarian yang diterima oleh halaman transaksi, termasuk nomor halaman yang akan ditampilkan.

export default async function TransactionsPage({
  searchParams,
}: TransactionsPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const params = await searchParams;

  const page = Number(params.page) || 1;
  const search = params.search; 

const {
  transactions,
  currentPage,
  totalPages,
} = await getTransactions(
  session.user.id,
  page,
  search
); //Mengambil data transaksi dari database berdasarkan userId dan halaman saat ini. Gunakan fungsi getTransactions yang sudah dibuat sebelumnya, dengan parameter userId dari session dan halaman saat ini (page). Hasilnya adalah objek yang berisi daftar transaksi, halaman saat ini, dan total halaman.

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold mb-4">
        Transactions
      </h1>
          <Link href="/dashboard" className="text-blue-500 hover:underline mb-3 inline-block">
            ← Dashboard
        </Link>
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
    </div>
  );
}