import { Component, Input, ViewChild } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../interface/employee';
import { MessageService } from 'primeng/api';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ToastModule } from 'primeng/toast';
import { ProblemsFormComponent } from './problems-form/problems-form.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CalendarComponent,
    PieChartComponent,
    BarChartComponent,
    ProblemsFormComponent,
    ToastModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  providers: [MessageService],
})
export class UserProfileComponent {
  @Input() employee!: Employee;

  constructor(private userService: EmployeeService) {}

  ngOnInit(): void {
    /**
     * Fetches the user information from the server.
     * Uses the userService to send a request to the server to fetch
     * the details of the user. Upon receiving a successful response, it assigns the response
     * to the user property.
     */
    this.userService.getUserFromServer().subscribe((resp: Employee) => {
      this.employee = resp;
    });
  }
}
