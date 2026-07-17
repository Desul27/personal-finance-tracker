"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Wallet,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => {
    
  setOpen(false);
};
  
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

          <Sheet
            open={open}
            onOpenChange={setOpen}
            >
            <SheetTrigger asChild>
              <button
                className="
                  rounded-lg
                  p-2
                  transition-colors
                  hover:bg-muted
                  lg:hidden
                "
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-75 p-0"
                >
<SheetHeader
  className="
    border-b
    px-6
    py-5
  "
>
  <SheetTitle
    className="text-left"
  >
    Navigation
  </SheetTitle>

  <SheetDescription
    className="text-left"
  >
    Navigate to different sections of the application.
  </SheetDescription>
</SheetHeader>

                  <nav
                    className="
                      flex
                      flex-col
                      px-6
                      py-6
                    "
                  >
                    <Link
                      href="#features"
                      onClick={closeMenu}
                      className="
                        rounded-md
                        px-3
                        py-3
                        text-base
                        font-medium
                        transition-colors
                        hover:bg-muted
                        hover:text-emerald-500
                      "
                    >
                      Features
                    </Link>

                    <Link
                      href="#why-us"
                      onClick={closeMenu}
                      className="
                        rounded-md
                        px-3
                        py-3
                        text-base
                        font-medium
                        transition-colors
                        hover:bg-muted
                        hover:text-emerald-500
                      "
                    >
                      Why Us
                    </Link>

                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="
                        rounded-md
                        px-3
                        py-3
                        text-base
                        font-medium
                        transition-colors
                        hover:bg-muted
                        hover:text-emerald-500
                      "
                    >
                      Login
                    </Link>

                    <div className="my-6 border-t" />

                    <Link
                      href="/register"
                      onClick={closeMenu}
                      className="
                        rounded-lg
                        bg-emerald-600
                        px-5
                        py-3
                        text-center
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:bg-emerald-700
                      "
                    >
                      Get Started
                    </Link>
                  </nav>
                </SheetContent>
          </Sheet>
      </nav>
    </header>
  );
}