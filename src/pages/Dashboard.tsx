import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  BarChart3, 
  AlertTriangle,
  Eye,
  Activity,
  TrendingUp,
  Shield
} from "lucide-react";

const Dashboard = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    difficulty: "",
    timeLimit: "",
    expectedOutput: ""
  });

  const existingChallenges = [
    { id: 1, title: "Two Sum Problem", difficulty: "Easy", attempts: 245, passRate: 87, status: "Active" },
    { id: 2, title: "Binary Tree Traversal", difficulty: "Medium", attempts: 156, passRate: 64, status: "Active" },
    { id: 3, title: "Graph Algorithms", difficulty: "Hard", attempts: 89, passRate: 32, status: "Draft" },
  ];

  const userStats = {
    totalUsers: 1247,
    activeUsers: 89,
    challengesAttempted: 2341,
    averagePassRate: 67
  };

  const recentActivity = [
    { user: "Alex Chen", action: "Completed 'Dynamic Programming'", time: "2 mins ago", type: "success" },
    { user: "Sarah Kim", action: "Failed 'Graph Algorithms' 3 times", time: "5 mins ago", type: "warning" },
    { user: "Mike Rodriguez", action: "New high score: 8950 points", time: "12 mins ago", type: "achievement" },
    { user: "Emily Wang", action: "Unlocked 'Speed Runner' badge", time: "25 mins ago", type: "achievement" },
  ];

  const handleCreateChallenge = () => {
    // Simulate challenge creation
    console.log("Creating challenge:", newChallenge);
    setIsCreateDialogOpen(false);
    setNewChallenge({
      title: "",
      description: "",
      difficulty: "",
      timeLimit: "",
      expectedOutput: ""
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success": return <div className="w-2 h-2 bg-secondary rounded-full" />;
      case "warning": return <div className="w-2 h-2 bg-destructive rounded-full" />;
      case "achievement": return <div className="w-2 h-2 bg-accent rounded-full" />;
      default: return <div className="w-2 h-2 bg-primary rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="slide-in-up">
            <h1 className="text-4xl sm:text-5xl font-orbitron font-black mb-4 gradient-text-primary">
              Admin Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage challenges and monitor platform activity
            </p>
          </div>
          <Badge className="bg-accent/20 text-accent border-accent/50 slide-in-up stagger-1">
            <Shield className="h-4 w-4 mr-2" />
            Admin Access
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Users", value: userStats.totalUsers, icon: <Users className="h-6 w-6 text-primary" />, trend: "+12%" },
            { label: "Active Now", value: userStats.activeUsers, icon: <Activity className="h-6 w-6 text-secondary" />, trend: "+5%" },
            { label: "Challenges Attempted", value: userStats.challengesAttempted, icon: <BarChart3 className="h-6 w-6 text-accent" />, trend: "+23%" },
            { label: "Avg Pass Rate", value: `${userStats.averagePassRate}%`, icon: <TrendingUp className="h-6 w-6 text-orange-400" />, trend: "+8%" }
          ].map((stat, index) => (
            <Card key={index} className={`glass-card glow-primary hover:scale-105 transition-all duration-300 slide-in-up stagger-${index + 1}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {stat.icon}
                  <Badge variant="outline" className="text-xs text-secondary border-secondary/50">
                    {stat.trend}
                  </Badge>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-orbitron font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="challenges" className="slide-in-up stagger-2">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="challenges" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-orbitron font-bold">Challenge Management</h2>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="glow-primary">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Challenge
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="font-orbitron">Create New Challenge</DialogTitle>
                        <DialogDescription>
                          Design a new coding challenge for the platform
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Challenge Title</Label>
                          <Input
                            id="title"
                            value={newChallenge.title}
                            onChange={(e) => setNewChallenge({...newChallenge, title: e.target.value})}
                            placeholder="Enter challenge title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newChallenge.description}
                            onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
                            placeholder="Describe the challenge..."
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="difficulty">Difficulty</Label>
                            <Select value={newChallenge.difficulty} onValueChange={(value) => setNewChallenge({...newChallenge, difficulty: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                            <Input
                              id="timeLimit"
                              type="number"
                              value={newChallenge.timeLimit}
                              onChange={(e) => setNewChallenge({...newChallenge, timeLimit: e.target.value})}
                              placeholder="30"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expectedOutput">Expected Output/Solution</Label>
                          <Textarea
                            id="expectedOutput"
                            value={newChallenge.expectedOutput}
                            onChange={(e) => setNewChallenge({...newChallenge, expectedOutput: e.target.value})}
                            placeholder="Define the expected solution or output..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateChallenge} className="glow-primary">
                          Create Challenge
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {existingChallenges.map((challenge) => (
                    <Card key={challenge.id} className="glass-card hover:glow-primary transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold">{challenge.title}</h3>
                              <Badge variant={challenge.difficulty === "Easy" ? "secondary" : challenge.difficulty === "Medium" ? "default" : "destructive"}>
                                {challenge.difficulty}
                              </Badge>
                              <Badge variant={challenge.status === "Active" ? "default" : "outline"}>
                                {challenge.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <span>{challenge.attempts} attempts</span>
                              <span>{challenge.passRate}% pass rate</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Preview
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <h2 className="text-2xl font-orbitron font-bold">User Management</h2>
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground py-12">
                      User management features coming soon...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <h2 className="text-2xl font-orbitron font-bold">Analytics & Reports</h2>
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground py-12">
                      Advanced analytics dashboard coming soon...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Recent Activity */}
          <div className="space-y-6">
            <Card className="glass-card glow-accent slide-in-up stagger-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-orbitron">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                  Live Activity
                </CardTitle>
                <CardDescription>Real-time platform events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 glass-card">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {activity.user}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-orbitron">
                  <Settings className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Export Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Platform Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;