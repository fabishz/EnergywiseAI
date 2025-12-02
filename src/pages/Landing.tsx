import { Link } from "react-router-dom";
import { Leaf, Zap, TrendingDown, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-energy.jpg";
import aiAnalytics from "@/assets/ai-analytics.jpg";
import sustainableLiving from "@/assets/sustainable-living.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EnergySaver AI
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Button asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary-light rounded-full px-4 py-2 mb-6">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary-dark">
                Built for CodeCraze Hackathon
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                EnergySaver AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Optimize your energy use, save money, and go green – powered by AI
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
              Input your habits, get personalized predictions, tips, and visualizations to cut your electricity bill by up to 20%
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Button asChild size="lg" className="text-lg px-8 shadow-eco">
                <Link to="/dashboard">
                  Get Started <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <img 
              src={heroImage} 
              alt="Sustainable energy monitoring with solar panels and eco-friendly technology" 
              className="rounded-2xl shadow-eco w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 animate-slide-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Smart Energy Management</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Leverage cutting-edge AI and visualization tools to transform your energy habits
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <Card className="border-2 hover:shadow-eco transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Predictions</h3>
              <p className="text-muted-foreground">
                Get accurate monthly bill predictions based on your usage patterns and smart optimization suggestions
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-eco transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Up to 20%</h3>
              <p className="text-muted-foreground">
                Visualize your potential savings with interactive charts and personalized energy-saving recommendations
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-eco transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability Focus</h3>
              <p className="text-muted-foreground">
                Track your environmental impact with location-based insights and earn badges for eco-friendly behavior
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <img 
              src={aiAnalytics} 
              alt="AI-powered energy analytics dashboard with charts and graphs" 
              className="rounded-2xl shadow-card w-full"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4">Smart Analytics That Save You Money</h3>
            <p className="text-muted-foreground mb-4">
              Our advanced AI algorithms analyze your energy consumption patterns to identify optimization opportunities you might miss.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-foreground text-sm">✓</span>
                </div>
                <span className="text-muted-foreground">Real-time energy usage tracking and predictions</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-foreground text-sm">✓</span>
                </div>
                <span className="text-muted-foreground">Personalized recommendations based on your habits</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-foreground text-sm">✓</span>
                </div>
                <span className="text-muted-foreground">Visual insights that make optimization easy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mt-20">
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl font-bold mb-4">Built for Student Life</h3>
            <p className="text-muted-foreground mb-4">
              Whether you're in a dorm, apartment, or shared housing, EnergySaver AI adapts to your unique living situation.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-foreground text-sm">✓</span>
                </div>
                <span className="text-muted-foreground">Easy setup with no hardware required</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-foreground text-sm">✓</span>
                </div>
                <span className="text-muted-foreground">Works with any living arrangement</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-foreground text-sm">✓</span>
                </div>
                <span className="text-muted-foreground">Make a real impact on climate change while saving money</span>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src={sustainableLiving} 
              alt="Student using smart devices for energy monitoring in eco-friendly dorm room" 
              className="rounded-2xl shadow-card w-full"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            Built for CodeCraze Hackathon | Powered by AI & GIS Technology
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2025 EnergySaver AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
