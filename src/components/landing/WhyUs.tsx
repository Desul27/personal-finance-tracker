import {
  CheckCircle2,
  ShieldCheck,
  Rocket,
} from "lucide-react";

const benefits = [
  {
    title: "Modern Interface",
    description:
      "A clean and intuitive interface that helps you focus on your finances.",
    icon: CheckCircle2,
  },
  {
    title: "Secure Authentication",
    description:
      "Your account is protected with encrypted passwords and secure authentication.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Performance",
    description:
      "Built with Next.js, Prisma, and Supabase for a smooth experience.",
    icon: Rocket,
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="
        container
        mx-auto
        px-6
        py-24
      "
    >
      <div
        className="
          grid
          items-center
          gap-16
          lg:grid-cols-2
        "
      >
        {/* LEFT */}

        <div>
          <span
            className="
              rounded-full
              bg-emerald-500/10
              px-4
              py-2
              text-sm
              font-medium
              text-emerald-500
            "
          >
            Why Choose Us
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-bold
              leading-tight
            "
          >
            Built for simplicity,
            <br />
            designed for productivity.
          </h2>

          <p
            className="
              mt-6
              max-w-lg
              leading-8
              text-muted-foreground
            "
          >
            Personal Finance Tracker helps you
            organize your income and expenses
            with a fast, modern, and secure
            experience.
          </p>

          <div className="mt-10 space-y-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="
                    flex
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-500/10
                    "
                  >
                    <Icon
                      className="
                        h-6
                        w-6
                        text-emerald-500
                      "
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        font-semibold
                        text-lg
                      "
                    >
                      {benefit.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-muted-foreground
                      "
                    >
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="
            rounded-3xl
            border
            bg-background
            p-8
            shadow-xl
          "
        >
          <div
            className="
              flex
              h-105
              items-center
              justify-center
              rounded-2xl
              border
              border-dashed
            "
          >
            <p
              className="
                text-center
                text-muted-foreground
              "
            >
              Analytics Illustration
              <br />
              (Coming Soon)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}