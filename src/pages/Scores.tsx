import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Award, Zap, Target, Flame, TrendingUp } from "lucide-react";

const Scores = () => {
  const userStats = {
    totalScore: 2450,
    rank: 12,
    challengesCompleted: 18,
    currentStreak: 5,
    level: 7,
    xpToNextLevel: 350,
    totalXP: 2450
  };

  const recentChallenges = [
    { name: "Binary Tree Traversal", difficulty: "Medium", result: "Passed", xp: 250, timeAgo: "2 hours ago" },
    { name: "Two Sum Problem", difficulty: "Easy", result: "Passed", xp: 100, timeAgo: "1 day ago" },
    { name: "Dynamic Programming", difficulty: "Medium", result: "Failed", xp: 0, timeAgo: "2 days ago" },
    { name: "Palindrome Check", difficulty: "Easy", result: "Passed", xp: 120, timeAgo: "3 days ago" },
  ];

  const achievements = [
    { name: "First Steps", description: "Complete your first challenge", icon: <Target className="h-6 w-6" />, unlocked: true },
    { name: "Speed Runner", description: "Complete 5 challenges in under 10 minutes", icon: <Zap className="h-6 w-6" />, unlocked: true },
    { name: "Persistent", description: "Maintain a 7-day streak", icon: <Flame className="h-6 w-6" />, unlocked: false },
    { name: "Master Coder", description: "Complete 50 challenges", icon: <Award className="h-6 w-6" />, unlocked: false },
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Chen", avatar: "", score: 8950, badge: "Grandmaster" },
    { rank: 2, name: "Sarah Kim", avatar: "", score: 7420, badge: "Master" },
    { rank: 3, name: "Mike Rodriguez", avatar: "", score: 6850, badge: "Expert" },
    { rank: 4, name: "Emily Wang", avatar: "", score: 5940, badge: "Advanced" },
    { rank: 5, name: "David Park", avatar: "", score: 4720, badge: "Intermediate" },
    // ... user's position
    { rank: 12, name: "You", avatar: "", score: 2450, badge: "Beginner", isCurrentUser: true },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return <span className="h-6 w-6 flex items-center justify-center text-sm font-bold">#{rank}</span>;
  };

  const getBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "secondary";
      case "Medium": return "default";
      case "Hard": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-orbitron font-black mb-6 gradient-text-primary slide-in-up">
            Personal Scores
          </h1>
          <p className="text-xl text-muted-foreground slide-in-up stagger-1">
            Track your progress and compete with others
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Stats & Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* User Score Overview */}
            <Card className="glass-card glow-primary slide-in-up stagger-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-orbitron">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-orbitron font-bold text-primary">{userStats.totalScore}</div>
                    <div className="text-sm text-muted-foreground">Total Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-orbitron font-bold text-secondary">#{userStats.rank}</div>
                    <div className="text-sm text-muted-foreground">Global Rank</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-orbitron font-bold text-accent">{userStats.challengesCompleted}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-orbitron font-bold text-orange-400">{userStats.currentStreak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                </div>

                {/* Level Progress */}
                <div className="mt-8 p-4 glass-card">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-orbitron font-bold">Level {userStats.level}</span>
                    <span className="text-sm text-muted-foreground">{userStats.xpToNextLevel} XP to next level</span>
                  </div>
                  <Progress value={(userStats.totalXP % 1000) / 10} className="mb-2" />
                  <div className="text-xs text-muted-foreground">
                    {userStats.totalXP} / {Math.ceil(userStats.totalXP / 1000) * 1000} XP
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Challenges */}
            <Card className="glass-card slide-in-up stagger-2">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron">Recent Challenges</CardTitle>
                <CardDescription>Your latest challenge attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentChallenges.map((challenge, index) => (
                    <div key={index} className="flex items-center justify-between p-4 glass-card hover:glow-primary transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${challenge.result === 'Passed' ? 'bg-secondary' : 'bg-destructive'}`} />
                        <div>
                          <div className="font-medium">{challenge.name}</div>
                          <div className="text-sm text-muted-foreground">{challenge.timeAgo}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getBadgeVariant(challenge.difficulty)}>
                          {challenge.difficulty}
                        </Badge>
                        <div className="text-right">
                          <div className={`font-bold ${challenge.result === 'Passed' ? 'text-secondary' : 'text-destructive'}`}>
                            {challenge.result}
                          </div>
                          <div className="text-sm text-muted-foreground">+{challenge.xp} XP</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="glass-card slide-in-up stagger-3">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron">Achievements</CardTitle>
                <CardDescription>Badges and milestones you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-4 glass-card flex items-center gap-4 transition-all duration-300 ${
                        achievement.unlocked ? 'glow-secondary hover:scale-105' : 'opacity-50'
                      }`}
                    >
                      <div className={`${achievement.unlocked ? 'text-secondary' : 'text-muted-foreground'}`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <div className="font-bold">{achievement.name}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                      </div>
                      {achievement.unlocked && (
                        <Badge className="ml-auto bg-secondary/20 text-secondary border-secondary/50">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Leaderboard */}
          <div className="space-y-8">
            <Card className="glass-card glow-accent slide-in-up stagger-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-orbitron">
                  <Trophy className="h-6 w-6 text-accent" />
                  Global Leaderboard
                </CardTitle>
                <CardDescription>Top performers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-4 p-3 glass-card transition-all duration-300 ${
                        player.isCurrentUser 
                          ? 'border-primary/50 glow-primary' 
                          : 'hover:glow-primary hover:scale-105'
                      }`}
                    >
                      <div className="flex items-center justify-center w-8">
                        {getRankIcon(player.rank)}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback className="bg-primary/20 text-primary font-bold">
                          {player.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className={`font-bold ${player.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                          {player.name}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {player.badge}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-orbitron font-bold">{player.score}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 glow-primary" variant="outline">
                  View Full Leaderboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scores;