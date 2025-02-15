import React from "react"; // Add this if your setup requires an explicit import
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ChartCardProps {
  title: string;
  data: { value: number; label: string }[];
  yDomain?: [number, number] | string[];
}

const ChartCard = ({ title, data, yDomain }: ChartCardProps) => {
  return (
    <Card className="p-6 w-full mb-6 animate-fadeIn hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-4">
        <h3 className="text-lg font-medium tracking-tight">{title}</h3>
        <div className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
              <XAxis
                dataKey="label"
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                domain={yDomain ? yDomain : ['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default ChartCard;
