import { prisma } from "@/lib/prisma";


const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export async function getMonthlyChart(
  userId: string
) {
  const transactions =
    await prisma.transaction.findMany({
      where: {
        userId,
      },

      orderBy: {
        date: "asc",
      },

      select: {
        amount: true,
        type: true,
        date: true,
      },
    }); //mengambil semua transaksi dari user tertentu berdasarkan userId, diurutkan berdasarkan tanggal secara ascending, dan hanya mengambil field amount, type, dan date.

  const monthlyData = transactions.reduce(
    (acc, transaction) => { //menggunakan reduce untuk mengelompokkan transaksi berdasarkan bulan dan menghitung total income dan expense per bulan.
      const month =transaction.date.getMonth(); //mengambil bulan dari tanggal transaksi (0-11)

      if (!acc[month]) {
        acc[month] = {
          month,
          income: 0,
          expense: 0,
        };
      } //jika bulan tersebut belum ada di accumulator, maka buat objek baru dengan bulan tersebut dan inisialisasi income dan expense dengan 0.

      if (
        transaction.type === "INCOME"
      ) {
        acc[month].income += Number(
          transaction.amount
        ); //jika tipe transaksi adalah INCOME, maka tambahkan jumlah transaksi ke total income bulan tersebut.
      } else {
        acc[month].expense += Number(
          transaction.amount
        );//jika tipe transaksi adalah EXPENSE, maka tambahkan jumlah transaksi ke total expense bulan tersebut.
      }

      return acc; //kembalikan accumulator untuk iterasi berikutnya.
    },
    {} as Record<
      number, //menggunakan Record untuk mendefinisikan tipe data accumulator sebagai objek dengan key berupa number (bulan) dan value berupa objek yang memiliki properti month, income, dan expense.
      {
        month: number;
        income: number;
        expense: number;
      }
    >
  );

 return Object.values(monthlyData).map(
  (item) => ({
    month: MONTH_NAMES[item.month],
    income: item.income,
    expense: item.expense,
  })
);//mengembalikan nilai dari monthlyData dalam bentuk array, sehingga setiap elemen array merupakan objek yang berisi bulan, total income, dan total expense untuk bulan tersebut.   
}