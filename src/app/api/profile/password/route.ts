import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { changePasswordSchema } from "@/lib/validations/password";

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
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
      changePasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed.",
          errors:
            validation.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const {
      currentPassword,
      newPassword,
    } = validation.data;

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

    const isPasswordCorrect =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message:
            "Current password is incorrect.",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message:
        "Password updated successfully.",
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