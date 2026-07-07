import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { transactionSchema } from "@/validations/transaction-schema";
// import { redirect }  from "next/navigation";
// import { revalidatePath,} from "next/cache";

export async function POST(request: Request) {

  
  const data = await request.json();  //ambil data dari API request body
  const validatedData = transactionSchema.safeParse(data); //Validation dilakukan sebelum menyentuh database.

  if (!validatedData.success) {
    console.log(validatedData.error.flatten());

    return NextResponse.json(
      {
        success: false,
        message: "Data tidak valid",
      },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);
  const category = await prisma.category.findUnique({
    where: {
      id: validatedData.data.categoryId,
    },
  });

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        success: false,
        message: "User tidak ditemukan",
      },
      { status: 401 }
    );
  }

  if (!category) {
    return NextResponse.json(
      {
        success: false,
        message: "Kategori tidak ditemukan",
      },
      { status: 404 }
    );
  }

  const transaction = await prisma.transaction.create({
    data: {
      amount: validatedData.data.amount,
      description: validatedData.data.description,
      date: new Date(validatedData.data.date),
      userId: session.user.id,
      categoryId: category.id,
      type: category.type,
    },
  });

  return NextResponse.json(
    {
      message: "Transaksi berhasil dibuat",
      transaction,
    },
    { status: 201 }
  );
}
