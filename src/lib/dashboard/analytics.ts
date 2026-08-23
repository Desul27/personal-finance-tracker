// import { getServerSession } from "next-auth"; //Ambil session dari next-auth, yang berisi informasi tentang user yang sedang login, termasuk userId.
// import { authOptions } from "@/lib/auth"; //konfigurasi autentikasi project ini, yang digunakan untuk mengatur strategi autentikasi dan otorisasi.
import { prisma } from "@/lib/prisma"; //Ambil instance PrismaClient yang digunakan untuk berinteraksi dengan database, termasuk mengambil data transaksi dan kategori berdasarkan userId.

export async function getExpenseByCategory(UserId: string) {

  // const session = await getServerSession(authOptions); //Ambil session berdasarkan konfigurasi autentikasi project ini. lalu masukan ke dalam variabel session. session ini berisi informasi tentang user yang sedang login, termasuk userId.

  // if (!session?.user?.id) {
  //   throw new Error("Unauthorized");
  // } //Jika session tidak ada atau userId tidak ada, maka lempar error Unauthorized. Hal ini untuk memastikan bahwa hanya user yang sudah login yang bisa mengakses data transaksi dan kategori.

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: UserId,
      type: "EXPENSE",
    },
    select: {
      amount: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  //reduce digunakan untuk mengelompokkan transaksi berdasarkan kategori dan menghitung total pengeluaran per kategori. accumulator adalah objek yang menyimpan total pengeluaran per kategori, dengan key berupa nama kategori dan value berupa total pengeluaran. Jika kategori belum ada di accumulator, maka inisialisasi dengan 0. Lalu tambahkan jumlah transaksi ke total pengeluaran kategori tersebut.
  const groupedExpenses = transactions.reduce ((accumulator, transaction) => {
    const categoryName = transaction.category.name; //Ambil nama kategori dari transaksi. Nama kategori ini akan digunakan sebagai key dalam objek accumulator untuk mengelompokkan total pengeluaran berdasarkan kategori.

    accumulator[categoryName] =
      (accumulator[categoryName] ?? 0) + Number(transaction.amount); //Jika kategori belum ada di accumulator, maka inisialisasi dengan 0. Lalu tambahkan jumlah transaksi ke total pengeluaran kategori tersebut. Gunakan Number() untuk memastikan bahwa amount adalah tipe number.

    return accumulator; //mengembalikan accumulator pada iterasi saat ini, sehingga iterasi berikutnya dapat melanjutkan proses dengan hasil yang sudah diperbarui."
  }, {} as Record<string, number>); //Gunakan reduce untuk mengelompokkan transaksi berdasarkan kategori dan menghitung total pengeluaran per kategori. accumulator adalah objek yang menyimpan total pengeluaran per kategori, dengan key berupa nama kategori dan value berupa total pengeluaran. Jika kategori belum ada di accumulator, maka inisialisasi dengan 0. Lalu tambahkan jumlah transaksi ke total pengeluaran kategori tersebut.

  return Object.entries(groupedExpenses).map(([name, value]) => ({
    name,
    value,
  }));
} //Mengubah hasil agregasi yang masih berbentuk object menjadi array of objects yang sesuai dengan format data yang diharapkan oleh Recharts PieChart.. Gunakan Object.entries untuk mengubah objek groupedExpenses menjadi array of entries, lalu gunakan map untuk mengubah setiap entry menjadi object dengan properti name dan value.