"use server";

import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/validations/auth-schema";

type RegisterState = {
  success: boolean;
  message: string;
};

export async function registerUser(
    
  formData: FormData
): Promise<RegisterState> {
  try {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

const validatedData =
  registerSchema.safeParse(data);

if (!validatedData.success) {
  console.log(
    validatedData.error.flatten()
  );

  return {
    success: false,
    message: "Data tidak valid",
  };
}

const validatedInput =
  validatedData.data;

const existingUser =
  await prisma.user.findUnique({
    where: {
      email: validatedInput.email,
    },
  });

if (existingUser) {
  return {
    success: false,
    message: "Email sudah digunakan",
  };
}
const hashedPassword =
  await bcrypt.hash(
    validatedInput.password,
    10
  );

const user =
  await prisma.user.create({
    data: {
      name: validatedInput.name,
      email: validatedInput.email,
      password: hashedPassword,
    },
  });

console.log(user);
    
return {
      success: true,
      message: "Registrasi berhasil",
    };
  } catch(error){
    console.error(error);
  } {
    return {
      success: false,
      message: "Terjadi kesalahan",
    };
  }
}