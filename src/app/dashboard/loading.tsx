export default function Loading() {
  return (
    <main className="p-6">

      <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="h-28 bg-gray-200 rounded animate-pulse" />
        <div className="h-28 bg-gray-200 rounded animate-pulse" />
        <div className="h-28 bg-gray-200 rounded animate-pulse" />

      </div>

      <div className="space-y-4">

        <div className="h-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-24 bg-gray-200 rounded animate-pulse" />

      </div>

    </main>
  );
}