type SummaryCardProps = {
  title: string;
  amount: string;
};

export default function SummaryCard({
  title,
  amount,
}: SummaryCardProps) {
  return (
    <div className="border rounded p-4">
      <h2>{title}</h2>

      <p className="text-2xl font-bold">
        {amount}
      </p>
    </div>
  );
}