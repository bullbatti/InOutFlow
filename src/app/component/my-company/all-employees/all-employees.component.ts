import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Employee } from '../../../interface/employee';
import { EmployeeToInsert } from '../../../interface/employee-to-insert';
import { EmployeeService } from '../../../service/employee.service';
import { AccountType } from '../../../account-type';

@Component({
  selector: 'app-all-employees',
  standalone: true,
  imports: [TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    CommonModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    RatingModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    CalendarModule,
    PasswordModule,
    TabViewModule],
  templateUrl: './all-employees.component.html',
  styleUrl: './all-employees.component.css'
})
export class AllEmployeesComponent {
  @ViewChild('dt') dt: Table | undefined;

  user!: Employee;
  employees!: Employee[];
  employee!: EmployeeToInsert;
  selectedEmployees!: Employee[] | null;
  submitted: boolean = false;
  productDialog: boolean = false;
  accountTypes = [
    {name: "ADMINISTRATOR", code: AccountType.ADMINISTRATOR},
    {name: "SUPPORT", code: AccountType.SUPPORT},
    {name: "USER", code: AccountType.USER},
  ];

  statuses!: any[];

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit() {
    /**
     * Sends a request to the server to gets user informations
     */
    this.employeeService.getUserFromServer().subscribe((resp: Employee) => {
      this.user = resp;
    });

    this.employeeService.getAllByCompany().subscribe((resp: Employee[]) => {
      this.employees = resp;
      console.log(this.employees);
    });
  }

  openNew() {
    this.employee = {
      firstName: '',
      lastName: '',
      rollNumber: '',
      accountType: AccountType.USER,
      email: '',
      birthdate: new Date,
      password: '',
      phoneNumber: ''
    };
    
    this.submitted = false;
    this.productDialog = true;
  }

  onGlobalFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.dt && inputElement) {
      const value = inputElement.value;
      this.dt.filterGlobal(value, 'contains');
    }
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveEmployee(employee: EmployeeToInsert) {
    this.employeeService.addNewEmployee(employee).subscribe((resp: Employee) => {
      this.employees.unshift(resp);
    });

    this.submitted = true
  }

  saveProduct() {





    /* this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    } */
  }

  /* getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  } */
}
