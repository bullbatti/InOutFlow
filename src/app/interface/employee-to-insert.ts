import { Employee } from "./employee";

export interface EmployeeToInsert extends Employee{
    birthdate: Date;
    phoneNumber: string;
    password: string;   
}
