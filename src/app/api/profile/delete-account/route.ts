import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import bcrypt from "bcrypt";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import {
  deleteAccountSchema,
} from "@/lib/validations/delete-account";

export async function POST(request: Request) {
  try {
    const session =
      await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const validation =
      deleteAccountSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message:
            validation.error.issues[0].message,
        },
        {
          status: 400,
        }
      );
    }

    const { currentPassword } =
      validation.data;

    const user =
      await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    const isPasswordValid =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message:
            "Kata sandi saat ini salah. Silakan coba lagi.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.$transaction([
      prisma.budget.deleteMany({
        where: {
          userId: user.id,
        },
      }),

      prisma.transaction.deleteMany({
        where: {
          userId: user.id,
        },
      }),

      prisma.user.delete({
        where: {
          id: user.id,
        },
      }),
    ]);

    return NextResponse.json({
      message:
        "Akun Berhasil dihapus. Terima kasih telah menggunakan aplikasi kami.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}