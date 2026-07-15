import {
  Wallet,
  ChartColumn,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "Track Income",
    description:
      "Record every source of income quickly and keep your financial records organized.",
    icon: Wallet,
  },
  {
    title: "Analyze Expenses",
    description:
      "Monitor your spending habits and understand where your money goes.",
    icon: ChartColumn,
  },
  {
    title: "Secure Storage",
    description:
      "Your financial data is protected with authentication and secure storage.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="
        container
        mx-auto
        px-6
        py-24
      "
    >
      {/* Heading */}

      <div
        className="
          mx-auto
          max-w-2xl
          text-center
        "
      >
        <h2
          className="
            text-4xl
            font-bold
            tracking-tight
          "
        >
          Powerful Features
        </h2>

        <p
          className="
            mt-5
            text-lg
            text-muted-foreground
          "
        >
          Everything you need to manage your
          personal finances with confidence.
        </p>
      </div>

      {/* Cards */}

      <div
        className="
          mt-16
          grid
          gap-8
          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="
                group
                rounded-2xl
                border
                bg-background
                p-8
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-emerald-500/40
                hover:shadow-xl
              "
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  transition-colors
                  duration-300
                  group-hover:bg-blue-600
                  dark:bg-emerald-900/40
                  dark:group-hover:bg-emerald-600
                "
              >
                <Icon
                  className="
                    h-7
                    w-7
                    text-blue-600
                    transition-colors
                    duration-300
                    group-hover:text-white
                    dark:text-emerald-400
                  "
                />
              </div>

              <h3
                className="
                  mt-6
                  text-xl
                  font-semibold
                "
              >
                {feature.title}
              </h3>

              <p
                className="
                  mt-4
                  leading-7
                  text-gray-400
                "
              >
                {feature.description}
              </p>
              <LearnMoreLink/>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LearnMoreLink() {
  return(
      <>
  <Link
  href="/register"
  className="
    group
    mt-6
    inline-flex
    items-center
    gap-2
    text-sm
    font-medium
    text-muted-foreground
    transition-colors
    duration-300
    hover:text-emerald-500
  "
>
  Learn More

  <ArrowRight
    className="
      h-4
      w-4
      transition-transform
      duration-300
      group-hover:translate-x-1
    "
  />
</Link>
      </>
  );
}
   

