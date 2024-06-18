import { AccountType } from "../account-type";

export interface Employee {
    firstName: string;
    lastName: string;
    rollNumber: string;
    accountType: AccountType;
    email: string;
}