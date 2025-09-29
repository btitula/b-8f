import {randomBytes} from 'crypto';

type Employee = {
  name: string;
  id: string;
  email: string;
  salary: number;
}

function generateRandomId(): string {
  return randomBytes(10).toString("hex");
}

function createEmployee(name: string, email: string, salary: number): Employee {
  return {
    name,
    id: generateRandomId(),
    email,
    salary
  };
}

const foo = createEmployee(
  "Foo",
  "foo@local.net",
  1000
)

const bar = createEmployee(
  "Bar",
  "bar@local.net",
  500
)

const allEmployees: Employee[] = [foo, bar];

function sendWelcomeEmail(employee: Employee): void {
  let content = `
  Welcome ${employee.name}!
  Your employee ID is ${employee.id}.
  Your starting salary is $${employee.salary} per month.
  `;
  console.log(`Sending email to: ${employee.email}`);
  console.log(content);
}

allEmployees.forEach(employee => sendWelcomeEmail(employee));
