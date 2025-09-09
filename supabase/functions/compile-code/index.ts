import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Test cases for the Two Sum problem
const testCases = [
  {
    input: { nums: [2, 7, 11, 15], target: 9 },
    expected: [0, 1]
  },
  {
    input: { nums: [3, 2, 4], target: 6 },
    expected: [1, 2]
  },
  {
    input: { nums: [3, 3], target: 6 },
    expected: [0, 1]
  }
];

async function executePythonCode(code: string, testCase: any): Promise<any> {
  const testCode = `
${code}

# Test execution
nums = ${JSON.stringify(testCase.input.nums)}
target = ${testCase.input.target}
try:
    result = two_sum(nums, target)
    print(f"RESULT:{result}")
except Exception as e:
    print(f"ERROR:{str(e)}")
`;

  try {
    const process = new Deno.Command("python3", {
      args: ["-c", testCode],
      stdout: "piped",
      stderr: "piped",
    });

    const { code: exitCode, stdout, stderr } = await process.output();
    const output = new TextDecoder().decode(stdout);
    const error = new TextDecoder().decode(stderr);

    if (exitCode !== 0) {
      return { success: false, error: error || "Runtime error" };
    }

    const resultMatch = output.match(/RESULT:\[(.*?)\]/);
    if (resultMatch) {
      const result = resultMatch[1].split(',').map(n => parseInt(n.trim()));
      return { success: true, result };
    }

    return { success: false, error: "No valid result found" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function executeJavaCode(code: string, testCase: any): Promise<any> {
  const fullCode = `
${code}

public class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {${testCase.input.nums.join(', ')}};
        int target = ${testCase.input.target};
        
        try {
            int[] result = solution.twoSum(nums, target);
            System.out.print("RESULT:[");
            for (int i = 0; i < result.length; i++) {
                System.out.print(result[i]);
                if (i < result.length - 1) System.out.print(",");
            }
            System.out.println("]");
        } catch (Exception e) {
            System.out.println("ERROR:" + e.getMessage());
        }
    }
}
`;

  try {
    // Write Java code to temp file
    const tempFile = `/tmp/Main_${Date.now()}.java`;
    await Deno.writeTextFile(tempFile, fullCode);

    // Compile Java code
    const compileProcess = new Deno.Command("javac", {
      args: [tempFile],
      stdout: "piped",
      stderr: "piped",
    });

    const compileResult = await compileProcess.output();
    if (compileResult.code !== 0) {
      const error = new TextDecoder().decode(compileResult.stderr);
      return { success: false, error: `Compilation error: ${error}` };
    }

    // Run Java code
    const classPath = tempFile.replace('.java', '');
    const runProcess = new Deno.Command("java", {
      args: ["Main"],
      cwd: "/tmp",
      stdout: "piped",
      stderr: "piped",
    });

    const runResult = await runProcess.output();
    const output = new TextDecoder().decode(runResult.stdout);
    const error = new TextDecoder().decode(runResult.stderr);

    // Cleanup
    try {
      await Deno.remove(tempFile);
      await Deno.remove(classPath + ".class");
    } catch {} // Ignore cleanup errors

    if (runResult.code !== 0) {
      return { success: false, error: error || "Runtime error" };
    }

    const resultMatch = output.match(/RESULT:\[(.*?)\]/);
    if (resultMatch) {
      const result = resultMatch[1].split(',').map(n => parseInt(n.trim()));
      return { success: true, result };
    }

    return { success: false, error: "No valid result found" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function executeCCode(code: string, testCase: any): Promise<any> {
  const testCode = `
${code}

#include <stdio.h>

int main() {
    int nums[] = {${testCase.input.nums.join(', ')}};
    int numsSize = ${testCase.input.nums.length};
    int target = ${testCase.input.target};
    int returnSize;
    
    int* result = twoSum(nums, numsSize, target, &returnSize);
    
    if (result != NULL && returnSize == 2) {
        printf("RESULT:[%d,%d]\\n", result[0], result[1]);
        free(result);
    } else {
        printf("ERROR:Invalid result\\n");
    }
    
    return 0;
}
`;

  try {
    // Write C code to temp file
    const tempFile = `/tmp/main_${Date.now()}.c`;
    const execFile = tempFile.replace('.c', '');
    await Deno.writeTextFile(tempFile, testCode);

    // Compile C code
    const compileProcess = new Deno.Command("gcc", {
      args: [tempFile, "-o", execFile],
      stdout: "piped",
      stderr: "piped",
    });

    const compileResult = await compileProcess.output();
    if (compileResult.code !== 0) {
      const error = new TextDecoder().decode(compileResult.stderr);
      return { success: false, error: `Compilation error: ${error}` };
    }

    // Run C code
    const runProcess = new Deno.Command(execFile, {
      stdout: "piped",
      stderr: "piped",
    });

    const runResult = await runProcess.output();
    const output = new TextDecoder().decode(runResult.stdout);
    const error = new TextDecoder().decode(runResult.stderr);

    // Cleanup
    try {
      await Deno.remove(tempFile);
      await Deno.remove(execFile);
    } catch {} // Ignore cleanup errors

    if (runResult.code !== 0) {
      return { success: false, error: error || "Runtime error" };
    }

    const resultMatch = output.match(/RESULT:\[(.*?)\]/);
    if (resultMatch) {
      const result = resultMatch[1].split(',').map(n => parseInt(n.trim()));
      return { success: true, result };
    }

    return { success: false, error: "No valid result found" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((x, y) => x - y);
  const sortedB = [...b].sort((x, y) => x - y);
  return sortedA.every((val, index) => val === sortedB[index]);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, language, challengeId } = await req.json();

    console.log(`Compiling ${language} code for challenge ${challengeId}`);

    if (challengeId !== 'easy-1') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Challenge not supported yet" 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

    let passedTests = 0;
    let totalTests = testCases.length;
    let firstError = null;

    // Run all test cases
    for (const testCase of testCases) {
      let result;

      switch (language) {
        case 'python':
          result = await executePythonCode(code, testCase);
          break;
        case 'java':
          result = await executeJavaCode(code, testCase);
          break;
        case 'c':
          result = await executeCCode(code, testCase);
          break;
        default:
          return new Response(JSON.stringify({ 
            success: false, 
            error: "Unsupported language" 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          });
      }

      if (result.success && arraysEqual(result.result, testCase.expected)) {
        passedTests++;
      } else if (!firstError) {
        firstError = result.error || `Expected ${JSON.stringify(testCase.expected)}, got ${JSON.stringify(result.result)}`;
      }
    }

    const success = passedTests === totalTests;

    return new Response(JSON.stringify({
      success,
      passedTests,
      totalTests,
      error: success ? null : firstError
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in compile-code function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});