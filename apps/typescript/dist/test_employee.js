import { randomBytes } from 'crypto';
function generateRandomId() {
    return randomBytes(10).toString("hex");
}
function createEmployee(name, email, salary) {
    return {
        name,
        id: generateRandomId(),
        email,
        salary
    };
}
const foo = createEmployee("Foo", "foo@local.net", 1000);
const bar = createEmployee("Bar", "bar@local.net", 500);
const allEmployees = [foo, bar];
function sendWelcomeEmail(employee) {
    let content = `
  Welcome ${employee.name}!
  Your employee ID is ${employee.id}.
  Your starting salary is $${employee.salary} per month.
  `;
    console.log(`Sending email to: ${employee.email}`);
    console.log(content);
}
allEmployees.forEach(employee => sendWelcomeEmail(employee));
//# sourceMappingURL=test_employee.js.map