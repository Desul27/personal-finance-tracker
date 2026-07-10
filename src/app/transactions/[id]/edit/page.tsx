import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect} from "next/navigation";
import TransactionForm from "@/components/TransactionForm";
export const dynamic = "force-dynamic"; //->Jangan prerender halaman ini saat build. Render halaman ini setiap ada request.
type EditTransactionPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTransactionPage({
  params,
}: EditTransactionPageProps) {

  const session = await getServerSession(authOptions);      

if (!session?.user?.id) {
    redirect("/login");
  } 
  // const UserId = session.user.id;
  const { id } = await params;
  
  
  const transaction = await prisma.transaction.findUnique({
  where: { id, userId: session.user.id },
  include: { category: true },
});
 if (!transaction) {
    redirect("/dashboard");
   
  }
    const categories =
    await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

const initialData = {
  id: transaction.id,
  amount: Number(transaction.amount),
  description: transaction.description || "",
  type: transaction.type,
  date: transaction.date,
  categoryId: transaction.categoryId,
};
 

  return (
    <div className="p-6"> 
    
      {/* <TransactionForm 
      categories={[]} 
      initialData={initialData} />  */}
      <TransactionForm
    categories={categories}
    initialData={initialData}
/>

    </div>
  );
}