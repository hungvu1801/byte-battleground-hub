import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Terminal, Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 animated-grid opacity-10" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-destructive rounded-full float opacity-40" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent rounded-full float opacity-30" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary rounded-full float opacity-20" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto glass-card p-12 glow-accent">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Terminal className="h-20 w-20 text-destructive glow-accent" />
            <AlertCircle className="absolute -top-2 -right-2 h-8 w-8 text-destructive bg-background rounded-full p-1" />
          </div>
        </div>

        <Badge 
          variant="outline" 
          className="mb-6 px-4 py-2 border-destructive/50 text-destructive bg-destructive/10"
        >
          System Error
        </Badge>

        <h1 className="text-6xl font-orbitron font-black mb-4 gradient-text-primary slide-in-up">
          404
        </h1>
        
        <h2 className="text-2xl font-orbitron font-bold mb-6 text-foreground slide-in-up stagger-1">
          Access Denied
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed slide-in-up stagger-2">
          The requested terminal path <code className="bg-muted px-2 py-1 rounded font-mono text-destructive">{location.pathname}</code> does not exist in our system.
        </p>

        <div className="space-y-4 slide-in-up stagger-3">
          <Button 
            asChild 
            size="lg" 
            className="mr-4 glow-primary hover:scale-105 transition-all duration-300"
          >
            <a href="/">
              <Home className="mr-2 h-5 w-5" />
              Return to Base
            </a>
          </Button>
          
          <div className="pt-6 border-t border-border/30">
            <div className="font-mono text-sm text-muted-foreground/70 space-y-1">
              <div>$ error: route not found in system registry</div>
              <div>$ suggestion: check available routes in main terminal</div>
              <div className="text-destructive">$ status: navigation failed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
