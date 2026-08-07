"use client";

import { useFormStatus } from "react-dom";

export default function RegisterSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        w-full
        rounded
        border
        p-2
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {pending ? "Creating Account..." : "Register"}
    </button>
  );
}