import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      className="
        container
        mx-auto
        px-6
        py-24
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          bg-gradient-to-r
          from-blue-600
          to-emerald-600
          px-8
          py-20
          text-center
          text-white
          shadow-2xl
        "
      >
        {/* Glow */}

        <div
          className="
            absolute
            -top-24
            -left-20
            h-64
            w-64
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-20
            right-0
            h-72
            w-72
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        <div className="relative z-10">
          <h2
            className="
              text-4xl
              font-bold
              leading-tight
            "
          >
            Ready to Take Control
            <br />
            of Your Finances?
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              text-white/80
            "
          >
            Start tracking your income and expenses today
            with a modern and secure Personal Finance
            Tracker.
          </p>

          <Link
            href="/register"
            className="
              group
              mt-10
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-white
              px-8
              py-4
              font-semibold
              text-emerald-600
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-xl
            "
          >
            Get Started

            <ArrowRight
              className="
                h-5
                w-5
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}