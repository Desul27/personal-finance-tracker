import { seedCategories }
  from "@/actions/seed-categories";

export default function SeedPage() {
  return (
    <form action={seedCategories}>
      <button
        type="submit"
        className="border p-2"
      >
        Seed Categories
      </button>
    </form>
  );
}