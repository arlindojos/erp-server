
export default {
  validator(employees: string) {
    

    if(!employees) {
      return false
    }

    if(
      employees.match(/<=5/) ||
      employees.match(/<=15/) ||
      employees.match(/<=50/) ||
      employees.match(/<=100/) ||
      employees.match(/<=500/) ||
      employees.match(/>500/)
    ) {
      return true
    }

    return false
  },

  create(employeesNumber: string) {
    
    if(!this.validator(employeesNumber)) {
      const error = new Error(`The employees number is invalid.`);
      error.name = 'InvalidEmployeesNumberError';

      return error;
    }

    return employeesNumber;
  }
}
