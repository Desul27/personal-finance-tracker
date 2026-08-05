import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import PersonalInformationCard from "@/components/profile/PersonalInformationCard";
import DeleteAccountCard from "@/components/profile/DeleteAccountCard";
import PreferencesCard from "@/components/profile/PreferencesCard";
import ChangePasswordCard from "@/components/profile/ChangePasswordCard";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      currency: true,
      timezone: true,
    },
  });

  if (!user) {
    redirect("/login");
  }


  return (
    <main className="container mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10">
<header className="mb-6">

<Link
    href="/dashboard"
    className="
        inline-flex
        items-center
        gap-2
        text-sm
        text-muted-foreground
        hover:underline
    "
>
    <ArrowLeft
        className="h-4 w-4"
    />

    Dashboard
</Link>

  <h1
    className="
      text-3xl
      font-bold
      mt-2
    "
  >
    Profile
  </h1>

</header>

        <p className="mt-1 text-muted-foreground">
          Manage your personal information, preferences and account security.
        </p>
      </div>

      <div className="space-y-6">
          <PersonalInformationCard
             name={user.name}
            //  email={user.email}
            />

      <ChangePasswordCard />
      
        <PreferencesCard
          currency={user.currency}
          timezone={user.timezone}
        />

        <DeleteAccountCard />
      </div>
    </main>
  );
}