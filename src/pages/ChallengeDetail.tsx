import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timer, Play, CheckCircle, XCircle, ArrowLeft, Code2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Challenge data - in a real app, this would come from the database
  const challengeData = {
    "easy-1": {
      title: "Two Sum Problem",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      difficulty: "Easy",
      timeLimit: 15,
      xp: 100,
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6", 
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
        }
      ],
      constraints: [
        "2 ≤ nums.length ≤ 10⁴",
        "-10⁹ ≤ nums[i] ≤ 10⁹",
        "-10⁹ ≤ target ≤ 10⁹",
        "Only one valid answer exists."
      ],
      templates: {
        python: `def two_sum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your code here
    pass`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[0];
    }
}`,
        c: `#include <stdio.h>
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize){
    // Your code here
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    return result;
}`
      }
    }
  };

  const challenge = challengeData[challengeId as keyof typeof challengeData];

  useEffect(() => {
    if (!challenge) {
      navigate("/challenges");
      return;
    }
    
    // Set initial code template
    setCode(challenge.templates[selectedLanguage as keyof typeof challenge.templates]);
    
    // Start timer
    setTimeLeft(challenge.timeLimit * 60); // Convert to seconds
    setIsTimerActive(true);
  }, [challenge, selectedLanguage, navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      toast.error("Time's up! Challenge expired.");
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setCode(challenge.templates[language as keyof typeof challenge.templates]);
    setTestResults(null);
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error("Please write some code before submitting!");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('compile-code', {
        body: {
          code,
          language: selectedLanguage,
          challengeId
        }
      });

      if (error) throw error;

      setTestResults(data);
      
      if (data.success) {
        toast.success("All test cases passed! 🎉");
        setIsTimerActive(false);
      } else {
        toast.error("Some test cases failed. Try again!");
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Failed to submit code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!challenge) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/challenges")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Challenges
          </Button>
          
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-orbitron font-bold gradient-text-primary">
                {challenge.title}
              </h1>
              <Badge variant="outline" className="text-secondary border-secondary">
                {challenge.difficulty}
              </Badge>
              <Badge variant="outline" className="text-primary border-primary">
                {challenge.xp} XP
              </Badge>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 glass-card p-3">
            <Timer className="h-5 w-5 text-primary" />
            <span className={`font-mono text-lg font-bold ${timeLeft < 300 ? 'text-destructive' : 'text-foreground'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Problem Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {challenge.description}
                </p>
                
                <div>
                  <h4 className="font-semibold mb-3">Examples:</h4>
                  <div className="space-y-4">
                    {challenge.examples.map((example, index) => (
                      <div key={index} className="bg-muted/50 p-4 rounded-lg">
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium">Input:</span>
                            <code className="ml-2 text-sm bg-background px-2 py-1 rounded">
                              {example.input}
                            </code>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Output:</span>
                            <code className="ml-2 text-sm bg-background px-2 py-1 rounded">
                              {example.output}
                            </code>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Explanation:</span>
                            <span className="ml-2 text-sm text-muted-foreground">
                              {example.explanation}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Constraints:</h4>
                  <ul className="space-y-1">
                    {challenge.constraints.map((constraint, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Test Results */}
            {testResults && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {testResults.success ? (
                      <CheckCircle className="h-5 w-5 text-secondary" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Status:</span>
                      <Badge variant={testResults.success ? "default" : "destructive"}>
                        {testResults.success ? "All Passed" : "Failed"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Test Cases:</span>
                      <span>{testResults.passedTests}/{testResults.totalTests}</span>
                    </div>
                    {testResults.error && (
                      <div className="bg-destructive/10 p-3 rounded-lg">
                        <p className="text-sm text-destructive font-medium">Error:</p>
                        <pre className="text-xs text-destructive mt-1 whitespace-pre-wrap">
                          {testResults.error}
                        </pre>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Code Editor</CardTitle>
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="c">C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your code here..."
                  className="min-h-[400px] font-mono text-sm resize-none"
                />
                
                <div className="flex gap-3 mt-4">
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || timeLeft === 0}
                    className="flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    {isSubmitting ? "Submitting..." : "Submit Solution"}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setCode(challenge.templates[selectedLanguage as keyof typeof challenge.templates])}
                  >
                    Reset Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;