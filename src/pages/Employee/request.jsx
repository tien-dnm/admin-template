import employees from "../../db/employees.json";
import gender from "../../db/gender.json";
import employeeType from "../../db/employee-type.json";
export const getEmployees = () => {
  return new Promise((resolve) => {
    resolve({ data: employees });
  });
};
export const getEmployee = (id = 0) => {
  return new Promise((resolve) => {
    resolve({ data: employees.find((x) => x.EMPID == id) });
  });
};
export const saveEmployee = (saveData) => {
  console.log(saveData);
};
export const getGenderLookUp = () => {
  return new Promise((resolve) => {
    resolve({ data: gender });
  });
};
export const getEmployeeTypeLookUp = () => {
  return new Promise((resolve) => {
    resolve({ data: employeeType });
  });
};
