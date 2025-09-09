import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Github, Chrome, Terminal, Lock, User } from "lucide-react";

const SignIn = () => {
  const location = useLocation();
  const isSignUp = location.pathname === "/signup";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (isSignUp && password !== confirmPassword) {
      setIsLoading(false);
      console.log("Passwords don't match");
      return;
    }
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      console.log(`${isSignUp ? 'Sign up' : 'Sign in'} attempted with:`, { email, password });
    }, 2000);
  };

  const handleOAuthSignIn = (provider: string) => {
    console.log(`OAuth sign in with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Terminal Background Effect */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 animated-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Simulated terminal text */}
          <div className="font-mono text-xs text-primary/20 p-8 space-y-1">
            <div className="animate-pulse">$ initializing secure connection...</div>
            <div className="animate-pulse" style={{ animationDelay: "0.5s" }}>$ loading authentication module...</div>
            <div className="animate-pulse" style={{ animationDelay: "1s" }}>$ waiting for user input...</div>
            <div className="animate-pulse" style={{ animationDelay: "1.5s" }}>$ _</div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-primary rounded-full float opacity-40" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-secondary rounded-full float opacity-30" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-accent rounded-full float opacity-20" style={{ animationDelay: "4s" }} />
      </div>

      <Card className="w-full max-w-md glass-card glow-primary slide-in-up relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Terminal className="h-12 w-12 text-primary glow-primary" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                <Lock className="h-2 w-2 text-background" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-orbitron font-black gradient-text-primary">
            {isSignUp ? "Join Arena" : "Access Terminal"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isSignUp ? "Create your account to start coding" : "Enter your credentials to join the arena"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 font-medium">
                <User className="h-4 w-4 text-primary" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="user@codearena.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input/50 border-border/50 focus:border-primary focus:ring-primary/30 transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2 font-medium">
                <Lock className="h-4 w-4 text-primary" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input/50 border-border/50 focus:border-primary focus:ring-primary/30 transition-all duration-300 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2 font-medium">
                  <Lock className="h-4 w-4 text-primary" />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-input/50 border-border/50 focus:border-primary focus:ring-primary/30 transition-all duration-300 pr-10"
                    required={isSignUp}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-primary" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            )}

            <Button 
              type="submit" 
              className="w-full glow-primary hover:scale-105 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                isSignUp ? "Create Account" : "Access Granted"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-4 text-muted-foreground font-mono">
                or connect with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn("github")}
              className="hover:bg-muted/50 hover:border-primary/50 transition-all duration-300"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn("google")}
              className="hover:bg-muted/50 hover:border-primary/50 transition-all duration-300"
            >
              <Chrome className="h-4 w-4 mr-2" />
              Google
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "New to CodeArena?"}{" "}
            <Link 
              to={isSignUp ? "/signin" : "/signup"} 
              className="text-secondary hover:text-secondary/80 transition-colors font-medium"
            >
              {isSignUp ? "Sign in" : "Create an account"}
            </Link>
          </div>

          {/* Terminal-style footer */}
          <div className="pt-4 border-t border-border/30">
            <div className="font-mono text-xs text-muted-foreground/70 space-y-1">
              <div>$ connection secured with 256-bit encryption</div>
              <div>$ logged from terminal: /dev/{isSignUp ? 'signup' : 'signin'}</div>
              <div className="text-secondary">$ status: ready for authentication</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;