type SummaryCardProps = {
  title: string;
  value: string;
};

export default function SummaryCard({
  title,
  value,
}: SummaryCardProps) {
  return (
    <div>
      <h3>{title}</h3>

      <p className="text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}