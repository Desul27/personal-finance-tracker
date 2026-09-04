
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, X } from "lucide-react";

type SearchFilterProps = {
  search?: string;
};

export default function SearchFilter({ 
  search,
 }: SearchFilterProps) {
  return (

    <form className="flex items-center justify-center mb-4"
      action="/transactions"
      method="GET"
    >
    <div className="relative flex-1">
        
      <Input
        type="text"
        name="search"
        defaultValue={search} 
        placeholder="Cari transaksi..."
        className="flex-1 pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />    
    {/* Icon Search */}
    <Search
        className="
        absolute
        left-3
        top-1/2
        h-4
        w-4
        -translate-y-1/2
        text-muted-foreground
      "
        /> 

   
    {/* Icon Clear */}
    {search && (
        <Link
          href="/transactions"
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-muted-foreground
            transition-colors
            hover:bg-muted
            hover:text-foreground
          "
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Link>
)}
 </div>
        </form>
  );
}

  