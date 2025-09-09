import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Timer, Star, Lock, CheckCircle, Zap, Brain, Rocket } from "lucide-react";

const Challenges = () => {
  const navigate = useNavigate();
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const challengeSections = [
    {
      difficulty: "Easy",
      icon: <Zap className="h-6 w-6" />,
      color: "text-secondary",
      borderColor: "border-secondary/30",
      glowClass: "glow-secondary",
      challenges: [
        {
          id: "easy-1",
          title: "Two Sum Problem",
          description: "Find two numbers in an array that add up to a target sum",
          xp: 100,
          timeLimit: 15,
          isLocked: false
        },
        {
          id: "easy-2", 
          title: "Palindrome Check",
          description: "Determine if a string reads the same forwards and backwards",
          xp: 120,
          timeLimit: 10,
          isLocked: false
        },
        {
          id: "easy-3",
          title: "FizzBuzz Challenge",
          description: "Classic programming challenge with number replacement rules",
          xp: 80,
          timeLimit: 8,
          isLocked: completedChallenges.length < 2
        }
      ]
    },
    {
      difficulty: "Medium",
      icon: <Brain className="h-6 w-6" />,
      color: "text-primary",
      borderColor: "border-primary/30",
      glowClass: "glow-primary",
      challenges: [
        {
          id: "medium-1",
          title: "Binary Tree Traversal",
          description: "Implement depth-first and breadth-first tree traversal algorithms",
          xp: 250,
          timeLimit: 30,
          isLocked: completedChallenges.length < 2
        },
        {
          id: "medium-2",
          title: "Dynamic Programming",
          description: "Solve the classic coin change problem using dynamic programming",
          xp: 300,
          timeLimit: 45,
          isLocked: completedChallenges.length < 4
        }
      ]
    },
    {
      difficulty: "Hard",
      icon: <Rocket className="h-6 w-6" />,
      color: "text-accent",
      borderColor: "border-accent/30", 
      glowClass: "glow-accent",
      challenges: [
        {
          id: "hard-1",
          title: "Graph Algorithms",
          description: "Implement Dijkstra's shortest path algorithm",
          xp: 500,
          timeLimit: 60,
          isLocked: completedChallenges.length < 6
        },
        {
          id: "hard-2",
          title: "System Design Challenge",
          description: "Design a scalable chat application architecture",
          xp: 800,
          timeLimit: 90,
          isLocked: completedChallenges.length < 8
        }
      ]
    }
  ];

  const handleStartChallenge = (challengeId: string) => {
    navigate(`/challenges/${challengeId}`);
  };

  const totalChallenges = challengeSections.reduce((acc, section) => acc + section.challenges.length, 0);
  const completedCount = completedChallenges.length;
  const progressPercentage = (completedCount / totalChallenges) * 100;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-orbitron font-black mb-6 gradient-text-primary slide-in-up">
            Code Challenges
          </h1>
          <p className="text-xl text-muted-foreground mb-8 slide-in-up stagger-1">
            Test your skills across different difficulty levels
          </p>
          
          {/* Progress Overview */}
          <div className="max-w-md mx-auto glass-card p-6 slide-in-up stagger-2">
            <div className="flex justify-between items-center mb-4">
              <span className="font-orbitron font-bold">Overall Progress</span>
              <span className="text-primary font-bold">{completedCount}/{totalChallenges}</span>
            </div>
            <Progress value={progressPercentage} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}% Complete
            </p>
          </div>
        </div>

        {/* Challenge Sections */}
        <div className="space-y-12">
          {challengeSections.map((section, sectionIndex) => (
            <div key={section.difficulty} className={`slide-in-up stagger-${sectionIndex + 1}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`${section.color} ${section.glowClass} p-3 rounded-xl glass-card`}>
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-orbitron font-bold text-foreground">
                    {section.difficulty}
                  </h2>
                  <p className="text-muted-foreground">
                    {section.challenges.length} challenges available
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.challenges.map((challenge, challengeIndex) => {
                  const isCompleted = completedChallenges.includes(challenge.id);
                  const isLocked = challenge.isLocked;

                  return (
                    <Card 
                      key={challenge.id}
                      className={`glass-card border-2 ${section.borderColor} hover:${section.glowClass} transition-all duration-300 hover:scale-105 ${
                        isLocked ? 'opacity-60' : ''
                      }`}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="flex items-center gap-2 text-foreground">
                              {isCompleted && <CheckCircle className="h-5 w-5 text-secondary" />}
                              {isLocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                              {challenge.title}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              {challenge.description}
                            </CardDescription>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                          <Badge variant="outline" className={`${section.color} border-current`}>
                            <Star className="h-3 w-3 mr-1" />
                            {challenge.xp} XP
                          </Badge>
                          <Badge variant="outline" className="text-muted-foreground">
                            <Timer className="h-3 w-3 mr-1" />
                            {challenge.timeLimit}min
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <Button 
                          onClick={() => handleStartChallenge(challenge.id)}
                          disabled={isLocked}
                          className={`w-full ${
                            isCompleted 
                              ? 'bg-secondary hover:bg-secondary/80' 
                              : isLocked 
                                ? 'opacity-50 cursor-not-allowed'
                                : section.glowClass
                          }`}
                          variant={isCompleted ? "secondary" : "default"}
                        >
                          {isCompleted ? 'Completed ✓' : isLocked ? 'Locked' : 'Start Challenge'}
                        </Button>
                        
                        {isLocked && (
                          <p className="text-xs text-muted-foreground mt-2 text-center">
                            Complete {Math.max(0, (challenge.isLocked ? 2 : 0) - completedCount)} more challenges to unlock
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar with Quick Links */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 hidden xl:block">
          <div className="glass-card p-4 space-y-3">
            <Button variant="outline" size="sm" asChild className="w-full">
              <a href="/">Home</a>
            </Button>
            <Button variant="outline" size="sm" asChild className="w-full">
              <a href="/scores">Scores</a>
            </Button>
            <Button variant="outline" size="sm" asChild className="w-full">
              <a href="/dashboard">Dashboard</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;