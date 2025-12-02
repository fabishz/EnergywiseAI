import { Link } from "react-router-dom";
import { Leaf, Target, Code, Award, Users, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import energyMap from "@/assets/energy-map.jpg";
import aiAnalytics from "@/assets/ai-analytics.jpg";

const About = () => {
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
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/about" className="text-sm font-medium text-primary">
              About
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12 animate-fade-in text-center">
          <div className="inline-flex items-center gap-2 bg-primary-light rounded-full px-4 py-2 mb-6">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary-dark">
              CodeCraze Hackathon 2025
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4">About EnergySaver AI</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering students to make a real impact on climate change through smart energy management
          </p>
        </div>

        <div className="space-y-6 animate-slide-up">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="border-2 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  EnergySaver AI addresses a critical challenge faced by students in dorms and shared spaces: 
                  understanding and reducing personal electricity consumption. With rising energy costs and 
                  increasing environmental concerns, students need accessible tools to track their usage and 
                  make informed decisions.
                </p>
                <div className="bg-primary-light p-4 rounded-lg">
                  <p className="font-semibold text-primary-dark mb-2">Real-World Impact:</p>
                  <ul className="space-y-2 text-sm text-primary-dark">
                    <li>• Potential 10-20% reduction in electricity bills for students</li>
                    <li>• Decreased carbon footprint through optimized energy usage</li>
                    <li>• Educational tool promoting sustainability awareness</li>
                    <li>• Scalable solution applicable to millions of students worldwide</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <img 
                src={energyMap} 
                alt="Global energy insights map with location markers" 
                className="rounded-xl shadow-card w-full"
              />
              <p className="text-sm text-muted-foreground text-center">
                Location-based energy insights powered by GIS technology
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src={aiAnalytics} 
                alt="AI analytics dashboard showing energy data and savings" 
                className="rounded-xl shadow-card w-full"
              />
            </div>

            <Card className="border-2 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Technologies Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Frontend</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• React.js with TypeScript</li>
                      <li>• Tailwind CSS for styling</li>
                      <li>• Chart.js for visualizations</li>
                      <li>• React Router for navigation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Integrations</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Esri ArcGIS for mapping</li>
                      <li>• AI/ML APIs for predictions</li>
                      <li>• Geolocation services</li>
                      <li>• LocalStorage for persistence</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Unique Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">AI-Powered Chat Assistant</h4>
                    <p className="text-sm text-muted-foreground">
                      Get personalized energy-saving tips through natural conversation
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Location-Based Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Interactive maps showing energy efficiency opportunities in your area
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Gamification System</h4>
                    <p className="text-sm text-muted-foreground">
                      Earn badges and track progress to stay motivated in your sustainability journey
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-card bg-gradient-primary text-primary-foreground">
            <CardContent className="pt-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-2">Join the Movement</h3>
              <p className="mb-6 opacity-90">
                Start tracking your energy usage today and be part of the solution to climate change
              </p>
              <Button asChild variant="secondary" size="lg">
                <Link to="/dashboard">Get Started Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
