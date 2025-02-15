
import { Card } from "@/components/ui/card";

const ChartSkeleton = () => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="h-6 w-1/3 bg-muted rounded animate-pulse" />
        <div className="h-[200px] w-full bg-muted rounded animate-pulse" />
      </div>
    </Card>
  );
};

export default ChartSkeleton;
