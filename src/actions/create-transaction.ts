"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { transactionSchema } from "@/validations/transaction-schema";
import { redirect }  from "next/navigation";
import { revalidatePath,} from "next/cache";

export async function createTransaction(
  formData: FormData
) {
  const data = {
    amount: formData.get("amount"),
    categoryId:
      formData.get("categoryId"),
    description:
      formData.get("description"),
    date: formData.get("date"),
  };

  const validatedData =
    transactionSchema.safeParse(
      data
    );

  if (!validatedData.success) {
    console.log(
      validatedData.error.flatten()
    );

    return {
      success: false,
      message: "Data tidak valid",
    };
  }
const session =
  await getServerSession(
    authOptions
  );
const category =
  await prisma.category.findUnique({
    where: {
      id: validatedData.data.categoryId,
    },
  });

  if (!session?.user?.id) {
  return {
    success: false,
    message: "User tidak ditemukan",
  };
}

  if (!category) {
    return {
    success: false,
    message: "Kategori tidak ditemukan",
  };
}

const transaction =
  await prisma.transaction.create({
    data: {
      amount:
        validatedData.data.amount,

      description:
        validatedData.data.description,

      date: new Date(
        validatedData.data.date
      ),

      userId:
        session.user.id,

      categoryId:
        category.id,

      type:
        category.type,
    },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}