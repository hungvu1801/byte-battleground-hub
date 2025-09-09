import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Zap, Trophy, Target, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 animated-grid opacity-20" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 border-primary/50 text-primary bg-primary/10 hover:bg-primary/20 transition-colors slide-in-up"
          >
            <Zap className="w-4 h-4 mr-2" />
            Level Up Your Coding Skills
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-orbitron font-black mb-6 slide-in-up stagger-1">
            <span className="gradient-text-primary text-shadow-glow">
              Test Your Code.
            </span>
            <br />
            <span className="text-foreground">
              Level Up Your Skills.
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed slide-in-up stagger-2">
            Join the ultimate coding arena where challenges meet gaming. 
            Compete, learn, and dominate the leaderboards in our futuristic coding platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center slide-in-up stagger-3">
            <Button 
              asChild 
              size="lg" 
              className="text-lg px-8 py-6 glow-primary hover:scale-105 transition-all duration-300"
            >
              <Link to="/challenges">
                Start Challenge
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              <Link to="/scores">
                View Leaderboard
                <Trophy className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full float opacity-60" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary rounded-full float opacity-40" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-accent rounded-full float opacity-30" style={{ animationDelay: "4s" }} />
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-primary rounded-full float opacity-50" style={{ animationDelay: "1s" }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-orbitron font-bold mb-6 gradient-text-primary">
              Why Choose CodeArena?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience coding challenges like never before with our gamified platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 className="h-12 w-12 mb-6 text-primary" />,
                title: "Real Challenges",
                description: "Solve authentic coding problems used by top tech companies",
                delay: "stagger-1"
              },
              {
                icon: <Target className="h-12 w-12 mb-6 text-secondary" />,
                title: "Skill Progression",
                description: "Track your improvement with detailed analytics and badges",
                delay: "stagger-2"
              },
              {
                icon: <Trophy className="h-12 w-12 mb-6 text-accent" />,
                title: "Compete & Win",
                description: "Climb leaderboards and compete with developers worldwide",
                delay: "stagger-3"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`glass-card p-8 text-center hover:scale-105 transition-all duration-300 hover:glow-primary slide-in-up ${feature.delay}`}
              >
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-orbitron font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-orbitron font-bold mb-6 text-foreground">
            Ready to Level Up?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of developers already improving their skills in CodeArena
          </p>
          <Button 
            asChild 
            size="lg" 
            className="text-lg px-12 py-6 glow-primary pulse-glow"
          >
            <Link to="/challenges">
              Enter the Arena
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;