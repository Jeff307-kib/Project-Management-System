import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  count: number;
  color?: string;
}

const SummaryCard = ({ title, count, color = "primary" }: SummaryCardProps) => {
  return (
    <Card className={`bg-${color}-100 text-${color}-800 w-full md:flex-1 p-6 flex items-center justify-center`}>
      <CardContent className="text-center flex flex-col items-center justify-center space-y-2">
        <p className="text-4xl font-extrabold tracking-tight ">{count}</p>
        <p className="text-sm uppercase text-muted-foreground font-medium">{title}</p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
