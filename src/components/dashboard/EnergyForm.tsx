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

    try {
      // Call real backend API
      const response = await fetch('http://localhost:3001/api/predictions/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usageHours: hours,
          applianceCount: count,
          location: formData.location,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate prediction');
      }

      const result = await response.json();
      const data = result.data;

      onPredictionResult({
        predictedBill: data.predictedBill,
        potentialSavings: data.potentialSavings,
        savingsPercentage: data.savingsPercentage,
        optimizedBill: data.optimizedBill,
      });

      toast({
        title: "Prediction Complete!",
        description: "Your energy analysis is ready",
      });

      // Show new badge notifications
      if (data.newBadges && data.newBadges.length > 0) {
        data.newBadges.forEach((badge: any) => {
          setTimeout(() => {
            toast({
              title: `New Badge Unlocked! ${badge.icon}`,
              description: badge.name,
            });
          }, 500);
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to calculate prediction",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
