import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PredictionResult } from "@/pages/Dashboard";

interface EnergyFormProps {
  onPredictionResult: (result: PredictionResult) => void;
  onLocationChange: (location: string) => void;
}

const EnergyForm = ({ onPredictionResult, onLocationChange }: EnergyFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    usageHours: "",
    applianceCount: "",
    location: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.usageHours || !formData.applianceCount || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const hours = parseFloat(formData.usageHours);
    const count = parseInt(formData.applianceCount);

    if (hours <= 0 || count <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter positive numbers",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    onLocationChange(formData.location);

    // Simulate API call - replace with actual backend
    setTimeout(() => {
      const baseRate = 0.12; // $ per kWh
      const avgWattage = 100; // average appliance wattage
      const daysInMonth = 30;

      const monthlyKWh = (hours * count * avgWattage * daysInMonth) / 1000;
      const predictedBill = monthlyKWh * baseRate;
      const savingsPercentage = 15 + Math.random() * 10; // 15-25% savings
      const potentialSavings = predictedBill * (savingsPercentage / 100);
      const optimizedBill = predictedBill - potentialSavings;

      onPredictionResult({
        predictedBill: parseFloat(predictedBill.toFixed(2)),
        potentialSavings: parseFloat(potentialSavings.toFixed(2)),
        savingsPercentage: parseFloat(savingsPercentage.toFixed(1)),
        optimizedBill: parseFloat(optimizedBill.toFixed(2)),
      });

      toast({
        title: "Prediction Complete!",
        description: "Your energy analysis is ready",
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="border-2 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Energy Usage Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="usageHours">Daily Appliance Usage Hours</Label>
            <Input
              id="usageHours"
              type="number"
              step="0.1"
              placeholder="e.g., 5"
              value={formData.usageHours}
              onChange={(e) => setFormData({ ...formData, usageHours: e.target.value })}
              className="focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="applianceCount">Number of Appliances</Label>
            <Input
              id="applianceCount"
              type="number"
              placeholder="e.g., 3"
              value={formData.applianceCount}
              onChange={(e) => setFormData({ ...formData, applianceCount: e.target.value })}
              className="focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location (City)</Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., New York"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="focus:ring-primary"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full shadow-eco"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              "Predict & Optimize"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnergyForm;
