import { useChartData } from "@/hooks/use-chart-data";
import ChartCard from "@/components/ChartCard";
import ChartSkeleton from "@/components/ChartSkeleton";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { Moon, Sun, Github, FileText} from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const { data: charts, isLoading, error } = useChartData();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  if (error) {
    toast({
      variant: "destructive",
      title: "Error loading charts",
      description: "Please try again later.",
    });
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-2 relative">
          <div className="absolute left-0 top-0 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => window.open('https://github.com/JoshMann15', '_blank')}
              title="View on GitHub"
            >
              <Github className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => window.open('/docs', '_blank')}
              title="View Documentation"
            >
              <FileText className="h-5 w-5" />
            </Button>
            </div>
            <div className="absolute right-0 top-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              title="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
          <h1 className="text-3xl font-medium tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time visualization of data from various API's
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <ChartSkeleton key={i} />
            ))
          ) : (
            charts?.map((chart) => (
              <ChartCard
                key={chart.id}
                title={chart.title}
                data={chart.data.map((value, index) => ({
                  value,
                  label: chart.labels[index],
                }))}
                yDomain={chart.id === 2 ? [0.8, 1] : undefined}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
