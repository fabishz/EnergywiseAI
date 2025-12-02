import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Trophy, Star, Leaf } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: typeof Award;
  earned: boolean;
  threshold: number;
}

interface GamificationPanelProps {
  savingsPercentage: number;
}

const GamificationPanel = ({ savingsPercentage }: GamificationPanelProps) => {
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "green-starter",
      name: "Green Starter",
      description: "First energy analysis",
      icon: Leaf,
      earned: false,
      threshold: 0,
    },
    {
      id: "eco-hero",
      name: "Eco Hero",
      description: "Achieved 10%+ savings",
      icon: Award,
      threshold: 10,
      earned: false,
    },
    {
      id: "energy-master",
      name: "Energy Master",
      description: "Achieved 20%+ savings",
      icon: Trophy,
      threshold: 20,
      earned: false,
    },
    {
      id: "sustainability-champion",
      name: "Sustainability Champion",
      description: "Achieved 25%+ savings",
      icon: Star,
      threshold: 25,
      earned: false,
    },
  ]);

  const [sustainabilityScore, setSustainabilityScore] = useState(0);

  useEffect(() => {
    // Load badges from localStorage
    const savedBadges = localStorage.getItem("energySaverBadges");
    if (savedBadges) {
      setBadges(JSON.parse(savedBadges));
    }

    const savedScore = localStorage.getItem("sustainabilityScore");
    if (savedScore) {
      setSustainabilityScore(parseInt(savedScore));
    }
  }, []);

  useEffect(() => {
    if (savingsPercentage > 0) {
      const updatedBadges = badges.map((badge) => ({
        ...badge,
        earned: badge.earned || savingsPercentage >= badge.threshold,
      }));

      setBadges(updatedBadges);
      localStorage.setItem("energySaverBadges", JSON.stringify(updatedBadges));

      // Update sustainability score
      const newScore = Math.min(100, Math.round(savingsPercentage * 3));
      setSustainabilityScore(newScore);
      localStorage.setItem("sustainabilityScore", newScore.toString());
    }
  }, [savingsPercentage]);

  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <Card className="border-2 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Your Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sustainability Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Sustainability Score</span>
            <span className="text-2xl font-bold text-primary">
              {sustainabilityScore}
            </span>
          </div>
          <Progress value={sustainabilityScore} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            Based on your energy-saving achievements
          </p>
        </div>

        {/* Badges */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Earned Badges</span>
            <span className="text-sm text-muted-foreground">
              {earnedCount} / {badges.length}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    badge.earned
                      ? "bg-primary-light border-primary shadow-eco"
                      : "bg-muted border-border opacity-50"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        badge.earned
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-xs mb-1">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        {savingsPercentage === 0 && (
          <div className="p-3 bg-primary-light rounded-lg">
            <p className="text-sm text-primary-dark">
              💡 <strong>Tip:</strong> Complete your first energy analysis to start
              earning badges and building your sustainability score!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GamificationPanel;
