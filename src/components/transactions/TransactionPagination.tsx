import Link from "next/link";//import Link dari Next.js digunakan untuk membuat tautan navigasi antar halaman dalam aplikasi Next.js. Ini memungkinkan pengguna untuk berpindah halaman tanpa memuat ulang seluruh halaman, sehingga memberikan pengalaman pengguna yang lebih cepat dan mulus.

import { Button } from "@/components/ui/button";

type TransactionPaginationProps = {
  currentPage: number;
  totalPages: number;
}; //tipe dari props yang diterima oleh komponen TransactionPagination. currentPage adalah halaman saat ini, dan totalPages adalah jumlah total halaman yang tersedia. 

export default function TransactionPagination({
  currentPage,
  totalPages,
}: TransactionPaginationProps) {

  if (totalPages <= 1) {
    return null;//jangan render apapun
  
  }//Jika totalPages kurang dari atau sama dengan 1, komponen tidak akan menampilkan apa pun (mengembalikan null). Ini berarti bahwa jika hanya ada satu halaman atau tidak ada halaman sama sekali, tidak perlu menampilkan navigasi pagination.ini disebut sebagai guard clause, yang digunakan untuk menghindari rendering komponen pagination ketika tidak diperlukan.

  const pages = Array.from(//Array.from digunakan untuk membuat array baru dari panjang totalPages. Setiap elemen dalam array diisi dengan nomor halaman yang sesuai (index + 1). Misalnya, jika totalPages adalah 5, maka pages akan menjadi [1, 2, 3, 4, 5].
    { length: totalPages },
    (_, index) => index + 1//callback function (_, index)yang digunakan untuk mengisi setiap elemen dalam array baru dengan nomor halaman yang sesuai. index adalah indeks dari elemen saat ini dalam array, dan index + 1 memberikan nomor halaman yang sesuai
  );//membuat array pages yang berisi nomor halaman dari 1 hingga totalPages. Array.from digunakan untuk membuat array baru berdasarkan panjang totalPages, dan setiap elemen diisi dengan nomor halaman yang sesuai (index + 1).

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Button
        asChild
        variant="outline"
        disabled={currentPage === 1}
      >
        <Link
          href={`/transactions?page=${currentPage - 1}`}
        >
          Previous
        </Link>
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          asChild // asChild digunakan untuk membungkus komponen Link di dalam Button. Ini memungkinkan Button untuk berfungsi sebagai tombol navigasi, tetapi tetap mempertahankan perilaku tautan dari Link. Dengan menggunakan asChild, kita dapat menggabungkan gaya dan perilaku tombol dengan navigasi tautan.
          variant={
            currentPage === page
              ? "default"
              : "outline"
          }
        >
          <Link
            href={`/transactions?page=${page}`}
          >
            {page}
          </Link>
        </Button>
      ))}

      <Button
        asChild
        variant="outline"
        disabled={currentPage === totalPages}
      >
        <Link
          href={`/transactions?page=${currentPage + 1}`}
        >
          Next
        </Link>
      </Button>
    </div>
  );
}