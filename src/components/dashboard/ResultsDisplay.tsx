import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, DollarSign, Sparkles } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PredictionResult } from "@/pages/Dashboard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ResultsDisplayProps {
  result: PredictionResult;
}

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  const chartData = {
    labels: ["Current Bill", "Optimized Bill"],
    datasets: [
      {
        label: "Monthly Cost ($)",
        data: [result.predictedBill, result.optimizedBill],
        backgroundColor: ["hsl(0, 0%, 45%)", "hsl(122, 39%, 49%)"],
        borderColor: ["hsl(0, 0%, 35%)", "hsl(122, 39%, 39%)"],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "hsl(0, 0%, 10%)",
        padding: 12,
        titleColor: "hsl(0, 0%, 100%)",
        bodyColor: "hsl(0, 0%, 100%)",
        borderColor: "hsl(122, 39%, 49%)",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number | string) => `$${value}`,
        },
        grid: {
          color: "hsl(0, 0%, 90%)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2 shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Predicted Monthly Bill</span>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">${result.predictedBill}</div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-card bg-primary-light">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-primary-dark">Potential Savings</span>
              <TrendingDown className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary">
              ${result.potentialSavings}
            </div>
            <div className="text-sm text-primary-dark mt-1">
              {result.savingsPercentage}% reduction
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-card bg-gradient-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-90">Optimized Bill</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-3xl font-bold">${result.optimizedBill}</div>
            <div className="text-sm opacity-90 mt-1">With AI optimization</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 shadow-card">
        <CardHeader>
          <CardTitle>Savings Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
