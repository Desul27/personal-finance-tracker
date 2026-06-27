"use client";
import { useState } from "react";
import { createTransaction } from "@/actions/create-transaction";
import { ArrowUpDown, Save, DollarSign,  FileText,  Tag,  Calendar,} from "lucide-react";


type Category = {id: string;  name: string;  type: string;};

export default function TransactionForm({
  categories,
}: {
  categories: Category[];
}) {
  const [type, setType] =
  useState("EXPENSE");

  const filteredCategories =
  categories.filter(
    (category) =>
      category.type === type
  );

  return (
    <div>
       <form  action={createTransaction}  className="mt-4 flex flex-col gap-4">

        {/* Amount */}
        <div>
            <label className="block text-sm font-medium mb-2">
              <DollarSign
                className="h-4 w-4 inline-block mr-2" 
              />
              Amount
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
                        <select  value={type} onChange={(e) => setType(e.target.value)}className="border  rounded  p-2 w-full bg-white text-black   dark:bg-gray-800 dark:text-white    dark:border-gray-600"  required
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
            name="categoryId"
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