import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updatePreferencesSchema } from "@/lib/validations/preferences";

export async function PATCH(request: Request) {
  try {
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
    const body = await request.json();
    const validation =
      updatePreferencesSchema.safeParse(body);
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
    const { currency, timezone } =
      validation.data;
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        currency,
        timezone,
      },
    });
    return NextResponse.json({
      message:
        "Preferences updated successfully.",
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