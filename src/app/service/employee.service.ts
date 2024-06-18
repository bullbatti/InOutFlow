import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Employee } from '../interface/employee';
import { EmployeeToInsert } from '../interface/employee-to-insert';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getToken() {
    return localStorage.getItem('token') ?? '';
  }

  getHeaderParams() {
    const token = this.getToken();

    return new HttpHeaders({
      Authorization: token,
    });
  }

  getUserFromServer() {
    const headers = this.getHeaderParams();

    return this.http.get<any>(`${this.baseUrl}employees/`, { headers });
  }

  getAllByCompany() {
    const headers = this.getHeaderParams();

    return this.http.get<Employee[]>(`${this.baseUrl}employees/my-company`, {
      headers,
    });
  }

  addNewEmployee(employee: EmployeeToInsert) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Employee>(`${this.baseUrl}employees/`, employee, { headers });
  }
}
