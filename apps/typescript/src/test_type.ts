type SimpleJob = {
  codingLanguage: string,
  sourceControl: string
}

type ComplicatedJob = {
  codingLanguage: string,
  sourceControl: string,
  hasManyMeeting: true,
  reportsToBeCompleted: string[]
}

type QaJob = {
  scriptingLanguage: string,
  hasAutomatedTests: true
}

let simpleJob: SimpleJob = {
  codingLanguage: "TypeScript",
  sourceControl: "Git"
}

let complicatedJob: ComplicatedJob = {
  codingLanguage: "TypeScript",
  sourceControl: "Git",
  hasManyMeeting: true,
  reportsToBeCompleted: ["Daily Report", "Weekly Report"]
}

let qaJob: QaJob = {
  scriptingLanguage: "Python",
  hasAutomatedTests: true
}

simpleJob = complicatedJob
console.log("simpleJob", simpleJob)

complicatedJob = simpleJob as ComplicatedJob
// console.log("complicatedJob", complicatedJob)

complicatedJob = qaJob as unknown as ComplicatedJob
console.log("complicatedJob", complicatedJob)
