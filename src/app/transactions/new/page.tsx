import { prisma } from "@/lib/prisma";
import { createTransaction} from "@/actions/create-transaction";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewTransactionPage() {
  const categories =
    await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Add Transaction
      </h1>

      <form  action={createTransaction}  className="mt-4 flex flex-col gap-4">

        <input
          type="number"
          name="amount"
          placeholder="Amount"
        />

        <select name="categoryId">
          <option value="">
            Pilih Kategori
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="description"
          placeholder="Description"
        />

        <input
          type="date"
          name="date"
        />

        <button type="submit">
          Simpan
        </button>

      </form>
    </div>
  );
}