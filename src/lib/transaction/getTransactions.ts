import { Prisma } from "@prisma/client";// Mengimpor tipe Prisma dari paket @prisma/client. Tipe ini digunakan untuk mendefinisikan tipe data yang berkaitan dengan model transaksi dalam database, termasuk relasi dengan kategori transaksi.
import { prisma } from "@/lib/prisma";// Mengimpor instance Prisma dari file prisma.ts di direktori lib. Instance ini digunakan untuk berinteraksi dengan database, termasuk melakukan query untuk mengambil data transaksi berdasarkan userId dan halaman saat ini.

const PAGE_SIZE = 10;

export async function getTransactions(
  userId: string,
  page: number = 1,
  search?: string
) {
  const skip = (page - 1) * PAGE_SIZE;
  
  const where: Prisma.TransactionWhereInput = {
  userId,
  
  
};

if (search) {
  where.OR = [
    {
      description: {
        contains: search,
        mode: "insensitive",
      },
    },
    {
      category: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    },
  ];
}

  const [transactions, totalTransactions] =
    await Promise.all([
      prisma.transaction.findMany({
             where,
          
       
        include: {
          category: true,
        },
        orderBy: {
          date: "desc",
        },
        skip,
        take: PAGE_SIZE,
      }),

      prisma.transaction.count({
        where,
      }),
    ]);

  const totalPages = Math.ceil(
    totalTransactions / PAGE_SIZE
  ); //Menghitung total halaman berdasarkan jumlah transaksi dan ukuran halaman (PAGE_SIZE). Gunakan Math.ceil untuk membulatkan ke atas, sehingga jika ada sisa transaksi yang tidak cukup untuk mengisi satu halaman penuh, tetap akan dihitung sebagai satu halaman tambahan.

  return {
    transactions,
    currentPage: page,
    totalPages,
    totalTransactions,
    pageSize: PAGE_SIZE,
    
  };
}