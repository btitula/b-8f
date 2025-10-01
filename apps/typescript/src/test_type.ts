// Type definitions
type SimpleJob = {
  codingLanguage: string,
  sourceControl: string
}

type ComplicatedJob = {
  codingLanguage: string,
  sourceControl: string,
  hasManyMeeting: Boolean,
  reportsToBeCompleted: string[]
}

type QaJob = {
  scriptingLanguage: string,
  hasAutomatedTests: true
}

// Example job objects
const simpleJob: SimpleJob = {
  codingLanguage: "TypeScript",
  sourceControl: "Git"
};

const complicatedJob: ComplicatedJob = {
  codingLanguage: "TypeScript",
  sourceControl: "Git",
  hasManyMeeting: true,
  reportsToBeCompleted: ["Daily Report", "Weekly Report"]
};

const qaJob: QaJob = {
  scriptingLanguage: "Python",
  hasAutomatedTests: true
};

// Utility functions for safe conversion
function toSimpleJob(job: ComplicatedJob): SimpleJob {
  return {
    codingLanguage: job.codingLanguage,
    sourceControl: job.sourceControl
  };
}

function toComplicatedJob(job: SimpleJob): ComplicatedJob {
  return {
    codingLanguage: job.codingLanguage,
    sourceControl: job.sourceControl,
    hasManyMeeting: false, // default value
    reportsToBeCompleted: [] // default value
  };
}

// Demonstrate conversions
const simpleFromComplicated = toSimpleJob(complicatedJob);
console.log("simpleFromComplicated", simpleFromComplicated);

const complicatedFromSimple = toComplicatedJob(simpleJob);
console.log("complicatedFromSimple", complicatedFromSimple);

// Example: converting QaJob to ComplicatedJob (not type-safe, for demonstration)
function qaToComplicatedJob(job: QaJob): ComplicatedJob {
  return {
    codingLanguage: job.scriptingLanguage,
    sourceControl: "Unknown",
    hasManyMeeting: true,
    reportsToBeCompleted: []
  };
}
const complicatedFromQa = qaToComplicatedJob(qaJob);
console.log("complicatedFromQa", complicatedFromQa);

// Utility function: count how many times n can be divided by 2
function test() {
  let n = 500;
  let count = 0;
  while (n % 2 === 0) {
    n = n / 2;
    count += 1;
  }
  console.log("count", count);
}
test();

// Utility function: reverse a number
function revertedNumber(num: number): number {
  let reversed = 0;
  while (num > 0) {
    const digit = num % 10;
    num = Math.floor(num / 10);
    reversed = reversed * 10 + digit;
  }
  return reversed;
}
console.log("result", revertedNumber(52140));
