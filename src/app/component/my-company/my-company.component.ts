import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../interface/employee';
import { Table, TableModule } from 'primeng/table';

import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { EmployeeService } from '../../service/employee.service';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { SmartCardService } from '../../service/smart-card.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { er } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-my-company',
  standalone: true,
  imports: [
    AllEmployeesComponent,
    TableModule,
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
    TabViewModule,
    DialogModule,
    ProgressSpinnerModule
  ],
  providers:[MessageService],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  templateUrl: './my-company.component.html',
  styleUrl: './my-company.component.css',
})
export class MyCompanyComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  user!: Employee;
  textASmartCard: string = '';

  constructor(private employeeService: EmployeeService, private smartCardService: SmartCardService, private messageService: MessageService) {}

  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

  ngOnInit() {
    /**
     * Sends a request to the server to gets user informations
     */
    this.employeeService.getUserFromServer().subscribe((resp: Employee) => {
      this.user = resp;
    });
  }

  readNewSmartCard() {
    /**
     * Invbiare una richiesta server side che attende la lettura di una smartcard e restituisce la stringa equivalente all'id
     */
    this.textASmartCard = '';
    this.smartCardService.readSmartCardId().subscribe({
      next: (resp: string) => {
        console.log(resp);
        this.textASmartCard = resp;
      },
      error: (err: Error) => {
        console.error(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'SmartCard unavailable' });
        this.visible = false
      }
    })
  }
}
