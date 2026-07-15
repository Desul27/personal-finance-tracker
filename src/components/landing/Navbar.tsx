import Link from "next/link";
import {
  Menu,
  Wallet,
} from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="
        sticky 
        top-0
        z-50
        border-b
        border-border/50
        bg-background/80
        backdrop-blur-md
      "
    >
      <nav
        className="
          container
          mx-auto
          flex
          h-16
          items-center
          justify-between
          px-6
        "
      >
        {/* Logo */}

        <Link
          href="/"
          className="
            flex
            items-center
            gap-2
            font-bold
            text-lg
          "
        >
          <Wallet
            className="
              h-7
              w-6
              text-blue-600
              dark:text-emerald-400
            "
          />

          <span>Personal Finance</span>
        </Link>

        {/* Desktop Menu */}

        <div
          className="
            hidden
            items-center
            gap-8
            lg:flex
          "
        >
          <Link
            href="#features"
            className="
              text-sm
              font-medium
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
          >
            Features
          </Link>

          <Link
            href="#why-us"
            className="
              text-sm
              font-medium
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
          >
            Why Us
          </Link>

          <Link
            href="/login"
            className="
              text-sm
              font-medium
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
          >
            Login
          </Link>

          <Link
            href="/register"
            className="
              rounded-lg
              bg-blue-600
              px-5
              py-2
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:bg-blue-700
              dark:bg-emerald-600
              dark:hover:bg-emerald-700
            "
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu */}

        <button
          className="
            rounded-lg
            p-2
            transition-colors
            hover:bg-muted
            lg:hidden
          "
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>
    </header>
  );
}