import { Link } from "react-router-dom";
import { Leaf, Zap, TrendingDown, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import heroImage from "@/assets/hero-energy.jpg";
import aiAnalytics from "@/assets/ai-analytics.jpg";
import sustainableLiving from "@/assets/sustainable-living.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              EnergySaver AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <ThemeToggle />
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
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary dark:text-primary">
                Built for CodeCraze Hackathon
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent dark:from-primary dark:via-accent dark:to-primary">
                EnergySaver AI
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground/90 dark:text-foreground/90 mb-4 font-medium">
              Optimize your energy use, save money, and go green – powered by AI
            </p>

            <p className="text-lg text-muted-foreground dark:text-muted-foreground mb-8">
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
              className="rounded-2xl shadow-eco w-full border border-border/50"
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

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 border-t">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-primary mb-2">20%</div>
            <p className="text-muted-foreground">Average Savings</p>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <p className="text-muted-foreground">US Cities Covered</p>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl font-bold text-primary mb-2">5</div>
            <p className="text-muted-foreground">Achievement Badges</p>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <p className="text-muted-foreground">AI Assistant</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20 bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg">
                  <Leaf className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  EnergySaver AI
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering students to make a real impact on climate change through smart energy management.
              </p>
              <div className="flex gap-3">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                <li><a href="http://localhost:3001/api-docs" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">API Docs</a></li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Features</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">AI Predictions</li>
                <li className="text-muted-foreground">Energy Chat Assistant</li>
                <li className="text-muted-foreground">Gamification System</li>
                <li className="text-muted-foreground">Location-based Data</li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="https://docs.lovable.dev" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Built for CodeCraze Hackathon 2025 | Powered by AI & GIS Technology
            </p>
            <p className="text-sm text-muted-foreground">
              © 2025 EnergySaver AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
