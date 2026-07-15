import { NextResponse } from "next/server"; //diperlukan untuk mengirimkan response dari API route
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/validations/auth-schema";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();//memanggil data dari request body yang dikirimkan dari form
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validatedData = registerSchema.safeParse(data);

    if (!validatedData.success) {
      console.log(validatedData.error.flatten());

      return NextResponse.json(
        {
          success: false,
          message: "Data tidak valid",
        },
        {
          status: 400, //input salah, bad request
        }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.data.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email sudah digunakan",
        },
        {
          status: 409, //email sudah digunakan, conflict
        }
      );
    }

    const hashedPassword = await bcrypt.hash(
      validatedData.data.password,
      10
    );

    await prisma.user.create({
      data: {
        name: validatedData.data.name,
        email: validatedData.data.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registrasi berhasil",
      },
      {
        status: 201,//user berhasil dibuat
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
      },
      {
        status: 500,
      }
    );
  }
}