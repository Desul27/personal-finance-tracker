"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
const router = useRouter();

const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget
    );

    const email =
      formData.get("email") as string;

    const password =
      formData.get("password") as string;
      setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError(
        "Email atau password salah"
       );
     return;
        }

    if (result?.ok) {
      router.push("/dashboard");
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label>Email</label>

        <input
          type="email"
          name="email"
          className="w-full rounded border p-2"
        />
      </div>

      <div className="mb-4">
        <label>Password</label>

        <input
          type="password"
          name="password"
          className="w-full rounded border p-2"
        />
      </div>
      {error && (
        <p className="mb-4 text-sm text-red-500">
          {error}
        </p>
      )}  
      <button
        type="submit"
        className="w-full rounded border p-2"
      >
        Login
      </button>
    </form>
  );
}