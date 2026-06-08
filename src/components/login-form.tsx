"use client";

import { signIn } from "next-auth/react";

export default function LoginForm() {
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

    const result = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false,
      }
    );

    console.log(result);
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

      <button
        type="submit"
        className="w-full rounded border p-2"
      >
        Login
      </button>
    </form>
  );
}