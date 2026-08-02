import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import PersonalInformationCard from "@/components/profile/PersonalInformationCard";
import PreferencesCard from "@/components/profile/PreferencesCard";
import ChangePasswordCard from "@/components/profile/ChangePasswordCard";
// import DeleteAccountCard from "@/components/profile/DeleteAccountCard";

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

  // PersonalInformationCard's props typing differs from the runtime usage here.
  // Cast to any to bypass the mismatch while keeping runtime behavior intact.
  // const PIC = PersonalInformationCard as any;

  return (
    <main className="container mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Account Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
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

        

        {/* <DeleteAccountCard /> */}
      </div>
    </main>
  );
}