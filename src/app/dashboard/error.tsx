"use client";

export default function Error({
  error,
}: {
  error: Error;
}) {
  return (
    <div>
      <h2>
        Terjadi kesalahan
      </h2>

      <p>
        Silakan coba lagi.
      </p>
    </div>
  );
}