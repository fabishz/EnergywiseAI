import { useState } from "react";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import EnergyForm from "@/components/dashboard/EnergyForm";
import ResultsDisplay from "@/components/dashboard/ResultsDisplay";
import ChatInterface from "@/components/dashboard/ChatInterface";
import MapView from "@/components/dashboard/MapView";
import GamificationPanel from "@/components/dashboard/GamificationPanel";

export interface PredictionResult {
  predictedBill: number;
  potentialSavings: number;
  savingsPercentage: number;
  optimizedBill: number;
}

const Dashboard = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [location, setLocation] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EnergySaver AI
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Energy Dashboard</h1>
          <p className="text-muted-foreground">
            Track your energy usage and discover ways to save
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-slide-up">
              <EnergyForm 
                onPredictionResult={setPredictionResult}
                onLocationChange={setLocation}
              />
            </div>

            {predictionResult && (
              <div className="animate-fade-in">
                <ResultsDisplay result={predictionResult} />
              </div>
            )}

            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <MapView location={location} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <GamificationPanel savingsPercentage={predictionResult?.savingsPercentage || 0} />
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
