import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { transactionSchema } from "@/validations/transaction-schema";

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


export async function PUT(
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
     // 2. Ambil data dari request body
  const data = await request.json();

    // ambil id user dari session
  const userId = session.user.id;

  const validatedData = transactionSchema.safeParse(data);
  
      if (!validatedData.success) {
      return NextResponse.json(
        {
          message: "Data tidak valid",
        },
        {
          status: 400,
        }
      );
    }

    const category = await prisma.category.findUnique({
    where: {
      id: validatedData.data.categoryId,

    },
  });
    if (!category) {
    return NextResponse.json(
      {
        success: false,
        message: "Kategori tidak ditemukan",
      },
      { status: 404 }
    );
  }
  // Ambil id transaksi dari URL
  const { id } = await params;


  const transaction = await prisma.transaction.findFirst({
    where: {
      id,
      userId,
    },
  });
    if (!transaction) {
    return NextResponse.json(
      { message: "Transaksi tidak ditemukan" },
      { status: 404 }
    );
  }

  // Update transaksi
  const updatedTransaction = await prisma.transaction.update({
    where: {
      id,
    },
    data: {
      amount: validatedData.data.amount,
      description: validatedData.data.description,
      date: new Date(validatedData.data.date),
      categoryId: category.id,
      type: category.type,
    },
  });

  return NextResponse.json({
    message: "Transaksi berhasil diperbarui",
    transaction: updatedTransaction,
  });

    }