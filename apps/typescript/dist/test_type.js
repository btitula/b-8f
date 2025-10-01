let simpleJob = {
    codingLanguage: "TypeScript",
    sourceControl: "Git"
};
let complicatedJob = {
    codingLanguage: "TypeScript",
    sourceControl: "Git",
    hasManyMeeting: true,
    reportsToBeCompleted: ["Daily Report", "Weekly Report"]
};
let qaJob = {
    scriptingLanguage: "Python",
    hasAutomatedTests: true
};
simpleJob = complicatedJob;
console.log("simpleJob", simpleJob);
complicatedJob = simpleJob;
console.log("complicatedJob", complicatedJob);
export {};
//# sourceMappingURL=test_type.js.map