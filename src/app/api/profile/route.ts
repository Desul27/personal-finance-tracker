import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { updateProfileSchema } from "@/lib/validations/profile";

export async function PATCH(request: Request) {
  try {
    // ==========================
    // Authentication
    // ==========================

    const session = await getServerSession(authOptions);

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

    // ==========================
    // Parse Body
    // ==========================

    const body = await request.json();

    // ==========================
    // Validation
    // ==========================

    const validation =
      updateProfileSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid request.",
          errors: validation.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const { name } = validation.data;

    // ==========================
    // Find User
    // ==========================

    const user = await prisma.user.findUnique({
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

    // ==========================
    // Update User
    // ==========================

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
      },
    });

    // ==========================
    // Success Response
    // ==========================

    return NextResponse.json({
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}