import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LogoutButton  from "@/components/logout-button";

export default async function DashboardPage() {
  const session =  await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } 
  

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>
    <LogoutButton />
      <p>
        Selamat datang di Personal Finance Tracker
      </p>

      <pre>
        {JSON.stringify(
          session,
          null,
          2
        )}
      </pre>
    </main>
  );
}