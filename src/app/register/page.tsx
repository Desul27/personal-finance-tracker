"use client";

import { registerUser } from "@/actions/register";

export default function RegisterPage() {
  const handleRegister = async (formData: FormData) => {
    await registerUser(formData);
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