import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1.Cek apakah user sudah login(Authentication)
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
  // 2. Ambil id user dari session
  const userId = session.user.id;

  // 3. Ambil id transaksi dari URL
  const { id } = await params;

  // 4. Cari transaction milik user tersebut
  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
      userId,
    },
  });
  // 5. Jika transaksi tidak ditemukan, kirim response 404
  if (!transaction) {
    return NextResponse.json(
      { message: "Transaksi tidak ditemukan" },
      { status: 404 }
    );
  }

  // 6. Hapus transaksi
  await prisma.transaction.delete({
    where: {
      id,
    },
  });

  // 7. Kirim response sukses
  return NextResponse.json({
    message: "Transaksi berhasil dihapus",
  });
}
