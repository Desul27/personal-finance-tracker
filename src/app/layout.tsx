import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ThemeProvider from "@/components/ThemeProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance Tracker",
  description: "Manage your finances easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning //ketika server merender pref. yang beda dengan pref. user akan disesuaikan dengan pref user
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class" //tailwind akan otomatis membaca class tersebut
          defaultTheme="system"//if perangkat user menggunakan dark maka web ikut, begitu sebaliknya
          enableSystem // agar browser membaca color schema milik sistem operas
          disableTransitionOnChange //agar perpindahan tema terasa lebih halus tanpa kedip
        >
          {children}
         <Toaster richColors  
         position="top-right" />
      </ThemeProvider>
      </body>
    </html>
  );
}
