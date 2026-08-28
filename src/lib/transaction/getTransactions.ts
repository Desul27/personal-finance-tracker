import { prisma } from "@/lib/prisma"; 

const PAGE_SIZE = 10;

export async function getTransactions(
  userId: string,
  page: number = 1
) {
  const skip = (page - 1) * PAGE_SIZE;

  const [transactions, totalTransactions] =
    await Promise.all([
      prisma.transaction.findMany({
        where: {
          userId,
        },
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
        where: {
          userId,
        },
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