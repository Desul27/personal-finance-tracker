import Link from "next/link";
import { Wallet } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div
        className="
          container
          mx-auto
          px-6
          py-12
        "
      >
        {/* Top */}

        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-8
            lg:flex-row
          "
        >
          {/* Logo */}

          <Link
            href="/"
            className="
              flex
              items-center
              gap-2
            "
          >
            <Wallet
              className="
                h-6
                w-6
                text-blue-600
                dark:text-emerald-400
              "
            />

            <span
              className="
                text-lg
                font-bold
              "
            >
              Personal Finance
            </span>
          </Link>

          {/* Navigation */}

          <nav
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-6
            "
          >
            <Link
              href="#features"
              className="
                text-sm
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
                text-sm
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
            >
              Register
            </Link>
          </nav>
        </div>

        {/* Bottom */}

        <div
          className="
            mt-10
            border-t
            pt-8
            text-center
          "
        >
          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            © 2026 Personal Finance Tracker.
          </p>

          <p
            className="
              mt-2
              text-sm
              text-muted-foreground
            "
          >
            Built with ❤️ using Next.js,
            Prisma & Supabase.
          </p>
        </div>
      </div>
    </footer>
  );
}