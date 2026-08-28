import { PrismaClient } from "@prisma/client"; //Mengimpor PrismaClient dari package @prisma/client. PrismaClient adalah class yang digunakan untuk berinteraksi dengan database melalui Prisma ORM.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
}; //Membuat variabel globalForPrisma yang menyimpan instance PrismaClient. Variabel ini digunakan untuk mencegah pembuatan banyak instance PrismaClient yang dapat menyebabkan masalah koneksi database.

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient(); //menggunakan PrismaClient untuk berinteraksi dengan database. Jika sudah ada instance PrismaClient yang tersimpan di globalForPrisma.prisma, maka gunakan instance tersebut. Jika belum ada, maka buat instance baru dan simpan di globalForPrisma.prisma. Hal ini untuk mencegah pembuatan banyak instance PrismaClient yang dapat menyebabkan masalah koneksi database.

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}//Jika environment bukan production, maka simpan instance PrismaClient di globalForPrisma.prisma. Hal ini untuk mencegah pembuatan banyak instance PrismaClient yang dapat menyebabkan masalah koneksi database saat pengembangan.