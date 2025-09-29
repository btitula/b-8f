class Project {
  name: string
  budget: number

  constructor(name: string, budget: number) {
    this.name = name
    this.budget = budget
  }

  printBudget() {
    console.log(`Project ${this.name} has budget ${this.budget}`)
  }
}

class SecretProject extends Project {
  secretLevel: 1 | 2 | 3

  constructor(secretLevel: 1 | 2 | 3) {
    super("foo", 1000000)
    this.secretLevel = secretLevel
  }

  override printBudget() {
    console.log(`This is a secret project with level ${this.secretLevel}`)
  }
}

let project = new SecretProject(1)
project.printBudget()