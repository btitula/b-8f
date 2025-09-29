enum Position {
  Programmer = 'Programmer',
  HR = 'HR',
  Manager = 'Manager',
  CEO = 'CEO'
}

type Employee = {
  name: string,
  salary: number,
  position: Position
}

/*
 * Function help to check the bonus percent based on the position of the employee
 * And remind to update the enum if there is a new position added `_exhaustiveCheck`
 */
function payAnnualBonus(employee: Employee) {
  let bonusPercent: number = 0
  const position = employee.position

  switch (position) {
    case Position.Programmer:
      bonusPercent = 0.1
      break
    case Position.HR:
      bonusPercent = 0.12
      break
    case Position.CEO:
      bonusPercent = 0.2
      break
    default:
      // -- exhaustive check enum
      // const _exhaustiveCheck: never = position
      break
  }
}
