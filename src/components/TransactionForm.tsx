"use client";
import { useState } from "react";
import { ArrowUpDown, DollarSign,  FileText,  Tag,  Calendar,} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type InitialTransaction = {
  id: string;
  amount: number;
  description: string;
  type: "INCOME" | "EXPENSE";
  date: Date;
  categoryId: string;
};

type Category = {id: string;  name: string;  type: string;};

type TransactionFormProps = {
  categories: Category[];
  initialData?: InitialTransaction;
};

export default function TransactionForm({
  categories,
  initialData,
}: TransactionFormProps) {
const [type, setType] = useState( initialData?.type ?? "EXPENSE");

const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? ""
);

const [description, setDescription] = useState(initialData?.description ?? ""
);

const [amount, setAmount] = useState(
  initialData
    ? initialData.amount.toString()
    : ""
);

const [date, setDate] = useState(initialData?.date ? initialData.date.toISOString().split("T")[0]: ""
);

const router = useRouter();

  const filteredCategories =
  categories.filter(
    (category) =>
      category.type === type
  );



  const handleSubmit = async (
    e: React.FormEvent
) => {
    e.preventDefault();

      const data = {
    amount,
    description,
    // type,
    date,
    categoryId,
  };  
  
  const url = initialData
  ? `/api/transactions/${initialData.id}`
  : "/api/transactions";

const method = initialData
  ? "PUT"
  : "POST";

  console.log(url);
  console.log(method);
  // console.log(data);

  const response = await fetch(url,
  {
    method: method,

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify(data),
  }
);


  const result = await response.json();
  if(!response.ok){
    toast.error(result.message);
  } else {
    
    router.push("/dashboard");
    router.refresh();
    toast.success(result.message);
  } 
};


  return (
    <div>
       <form  onSubmit={handleSubmit}  className="mt-4 flex flex-col gap-4">
        <div>
            <label className="flex items-center gap-1 mb-2">
              <DollarSign
                className="h-4 w-4 " 
              />Amount
            </label>
            <div className="relative">            
                 <input
                    className="
                    border
                    rounded
                    p-2
                    w-full
                    bg-white
                    text-black
                    dark:bg-gray-800
                    dark:text-white
                    dark:border-gray-600
                      "            
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="10000"
                    min="0"
                    required

                  />
                  </div>
              </div>

            {/* pilih Type */}
                 <div>
                    <label className="flex items-center gap-2 mb-2">
                      <ArrowUpDown className="h-4 w-4" />
                      Type
                    </label>
                    <div className="relative">
                        <select  
                        value={type} onChange={(e) => setType(e.target.value as "INCOME" | "EXPENSE")}
                        
                        className="border  rounded  p-2 w-full bg-white text-black   dark:bg-gray-800 dark:text-white    dark:border-gray-600"  required
                    >
                      <option value="EXPENSE">
                        Expense
                      </option>

                      <option value="INCOME">
                        Income
                      </option>
                    </select>
                    </div>
                  </div>       

                  {/* Category */}
          <div>
           <label className="flex items-center gap-2 mb-2">
              <Tag className="h-4 w-4" />
                  Category
            </label>
            <div className="relative">  
              <select
             className="
              border
              rounded
              p-2
              w-full
              bg-white
              text-black
              dark:bg-gray-800
              dark:text-white
              dark:border-gray-600
            "
            required
            name="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)} 
          >

           <option value="">
              Pilih Kategori
            </option>
          
            {filteredCategories.map(
              (category) => (
                <option
                  key={category.id}
                  value={category.id}
                  
                >
                  {category.name}
                </option>
              )
            )}
           </select>
            </div>
          </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4" />
            Description
          </label>
          <div className="relative"> 
            <input
              className="
                border
                rounded
                p-2
                w-full
                bg-white
                text-black
                dark:bg-gray-800
                dark:text-white
                dark:border-gray-600
              "
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}  
              placeholder="Description"
              required
            />
          </div>
        </div>

    
        {/* Date */}
        <div>
          <label className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4" />
            Date
          </label>
          <div className="relative">            
        <input
          className="
            border
            rounded
            p-2
            w-full
            bg-white
            text-black
            dark:bg-gray-800
            dark:text-white
            dark:border-gray-600"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)} 
          required
        />
      </div>
    </div>

      {/* Submit Button */}
    <div className="mt-4"     >
      <div className="flex items-center gap-2 mb-2" >

        <button type="submit"
          className="
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
          w-full
          rounded-sm
          px-4
          py-3
          font-semibold
          text-white

          bg-blue-600
          hover:bg-blue-700

          dark:bg-emerald-600
          dark:hover:bg-emerald-700

          shadow-lg

          transition-all
          duration-300
          "
        > 
           Save Transaction 
        </button>
       </div>  
    </div>
      </form>
    </div>
  );
}

function push(arg0: string) {
  throw new Error("Function not implemented.");
}
