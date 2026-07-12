"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    const loginResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!loginResult?.ok) {
      toast.error("Login gagal setelah registrasi");
      return;
    }

    router.push("/dashboard");  
    router.refresh(); // Refresh the page to update the UI after login
    toast.success("🎉 Registrasi berhasil. Selamat datang!");
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-6">
        <h1 className="mb-6 text-2xl font-bold">
          Register
        </h1>

        <form action={handleRegister}>
          <div className="mb-4">
            <label>Name</label>

            <input
              name="name"
              className="w-full rounded border p-2"
            />
          </div>

          <div className="mb-4">
            <label>Email</label>

            <input
              name="email"
              type="email"
              className="w-full rounded border p-2"
            />
          </div>

          <div className="mb-4">
            <label>Password</label>

            <input
              name="password"
              type="password"
              className="w-full rounded border p-2"
            />
          </div>

          <button
          
            type="submit"
            className="w-full rounded border p-2"
          >
            
            Register
          </button>
        </form>
      </div>
    </main>
  );
}