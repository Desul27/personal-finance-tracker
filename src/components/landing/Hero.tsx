import Link from "next/link";

import {
  ArrowRight,
  ShieldCheck,
  // Wallet,
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Wallet,
  Plus,
} from "lucide-react";

import Navbar from "./Navbar";

  const techStack = [
  "Next.js",
  "Prisma",
  "Supabase",
  "TypeScript",
];
const summary = [
  {
    title: "Income",
    amount: "Rp12.500.000",
    icon: TrendingUp,
    color: "text-emerald-500",
  },
  {
    title: "Expense",
    amount: "Rp5.200.000",
    icon: TrendingDown,
    color: "text-red-500",
  },
  {
    title: "Balance",
    amount: "Rp7.300.000",
    icon: Wallet,
    color: "text-blue-500",
  },
];

const transactions = [
  {
    title: "Salary",
    amount: "+Rp8.000.000",
    income: true,
    date: "Aug 25, 2026",
  },
  {
    title: "Groceries",
    amount: "-Rp350.000",
    income: false,
    date: "Aug 24, 2026",
  },
  {
    title: "Coffee",
    amount: "-Rp45.000",
    income: false,
    date: "Aug 24, 2026",
  },
];

export default function Hero() {
  return (
    <section
  className="
    relative
    overflow-hidden
    min-h-screen
    container
    mx-auto
    px-6
    pt-7
    pb-20
    lg:pt-16
  "
>

  {/* Blue Glow */}

  <div
    className="
      absolute
      -top-32
      -left-32
      h-80
      w-80
      rounded-full
      bg-blue-500/10
      blur-[180px]
    "
  />

  {/* Green Glow */}

  <div
    className="
      absolute
      top-16
      right-0
      h-96
      w-96
      rounded-full
      bg-emerald-500/10
      blur-[180px]
    "
  />

  {/* Content */}

  <div className="relative z-10">
    <div className="grid items-start gap-16 lg:grid-cols-2">

      <HeroContent />

      <DashboardMockup />

    </div>

  </div>

</section>
  );
}

function HeroContent() {
    return (
        <div>
            <HeadParagraph />
            <GetStarted />
            <TechStack />
        </div>
    );
}
function HeadParagraph() {
  return (
    <>
              <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-blue-200
            bg-blue-50
            px-4
            py-2
            text-sm
            font-medium
            text-blue-700
            w-fit
            dark:border-blue-900
            dark:bg-blue-950/40
            dark:text-blue-300
          
          "
        >
          <ShieldCheck className="h-4 w-4" />
          Smart Finance Management
        </div>

        <h1
            className="
              mt-5
              text-5xl
              font-extrabold
              leading-tight
              tracking-tight
            "
          >
          Take Control
         <br />

        <span className="text-blue-600 dark:text-emerald-400">
       of Your Finances.
      </span>
      </h1>
          <p
            className="
              mt-6
              max-w-xl
              text-lg
              leading-8
              text-gray-600
              dark:text-gray-300
            "
          >
            Track your income, monitor your expenses,
            and build better financial habits with a
            modern, secure, and responsive Personal
            Finance Tracker.
          </p>



   
    </>
  );
}

function GetStarted(){
  return (
    <> 
            <div className="mt-8 flex flex-wrap gap-4">
          <Link
          href="/register"
          className="
            group
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-blue-600
            px-6
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-blue-700
            hover:scale-105
            shadow-md
            hover:shadow-lg
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
            dark:bg-emerald-600
            dark:hover:bg-emerald-700
            dark:focus:ring-emerald-500
            
          " >       
          Get Started
          <ArrowRight className="
              h-4
              w-4
              transition-all
              duration-300
              group-hover:translate-x-2
              group-hover:opacity-80
              " />
          </Link>
        <br />
        <div className="mt-1 flex items-center gap-4">
          <Link
            href="/login"
            className="
              text-sm
              font-medium
              text-gray-600
              transition-all
              duration-300
              hover:text-gray-900
              dark:text-gray-300
              dark:hover:text-white
            "
          >
            Already have an account? Log in
          </Link>   
        </div>
     </div>



    </>
  );
}

function TechStack() {
  return (
    <div className="mt-7 flex flex-wrap gap-2">
      {techStack.map((tech) => (
        <span
          key={tech}
          className="
            rounded-full
            border
            px-3
            py-1
            text-sm
          "
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function DashboardMockup() {
  return (
    <div
      className="
        relative
        rounded-3xl
        border
        bg-background
        p-6
        shadow-2xl
        transition-all
        duration-500
        hover:-translate-y-2
        lg:rotate-2
        hover:rotate-0
        lg:mt-9
        max-w-lg
        
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5 text-blue-600 dark:text-emerald-400" />
          <h3 className="font-semibold text-lg">
            Dashboard
          </h3>
        </div>

        <span
          className="
            rounded-full
            bg-emerald-100
            px-3
            py-1
            text-xs
            font-medium
            text-emerald-700
            dark:bg-emerald-900/40
            dark:text-emerald-300
          "
        >
          ● Live
        </span>
      </div>

      <div className="my-6 border-t" />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {summary.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                rounded-xl
                border
                p-3
              "
            >
              <Icon
                className={`h-5 w-5 ${item.color}`}
              />

              <p className="mt-2 text-xs text-muted-foreground">
                {item.title}
              </p>

              <h4 className="font-semibold text-sm mt-1">
                {item.amount}
              </h4>
            </div>
          );
        })}
      </div>

      <div className="my-6 border-t" />

      {/* Recent Transaction */}
      <div>
        <h4 className="mb-4 font-semibold">
          Recent Transactions
        </h4>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.title}
              className="
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p className="font-medium text-sm">
                  {transaction.title}
                </p>

                <p className="text-xs text-muted-foreground">
                  {transaction.date}
                </p>
              </div>

              <span
                className={
                  transaction.income
                    ? "text-emerald-500 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-blue-600
          px-4
          py-3
          font-medium
          text-white
          transition
          hover:bg-blue-700
          dark:bg-emerald-600
          dark:hover:bg-emerald-700
        "
      >
        <Plus className="h-4 w-4" />
        Add Transaction
      </button>
    </div>
  );
}
