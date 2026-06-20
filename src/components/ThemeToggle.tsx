"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [mounted, setMounted] =
    useState(false);

  const {
    theme,
    setTheme,
  } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() =>
        setTheme(
          theme === "dark"
            ? "light"
            : "dark"
        )
      }
      className="
        border
        rounded
        px-3
        py-2
      "
    >
      {theme === "dark"
        ? "☀️"
        : "🌙"}
    </button>
  );
}