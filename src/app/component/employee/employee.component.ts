import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { HttpErrorResponse } from '@angular/common/http';
import { delay } from 'rxjs';
import { Section } from '../../interface/section';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../interface/employee';
import { AccountType } from '../../account-type';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterModule,
    SidebarModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    MenubarModule,
    ProgressSpinnerModule,
    MessagesModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  sidebarVisible: boolean = false;
  sections: Section[] = [];
  sectionsInView: Section[] = [];
  employee!: Employee;
  displayMessage: boolean = true;

  ADMIN = AccountType.ADMINISTRATOR;
  USER = AccountType.USER;
  SUPPORT = AccountType.SUPPORT

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /**
     * Fetches the user information from the server.
     * Makes use of the employeeService to send a request to the server to fetch
     * the details of the employee. Upon receiving a successful response, it assigns the response
     * to the employee object and navigates to the user's profile page. If an error occurs,
     * particularly when the token has expired, it logs the error message and hides the display message.
     */
    this.employeeService.getUserFromServer().subscribe({
      next: (resp: Employee) => {
        this.employee = resp;
        this.router.navigate(['/employee/profile']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Token expired!', err.message);
        this.displayMessage = false;
      },
    });

    // Initializating all sections in the application. This array contains all sections but not all sections are visible by every employee.
    this.sections = [
      {
        id: 1,
        link: '/employee/profile',
        name: 'My Profile',
        icon: 'pi pi-user mr-2',
      },
      {
        id: 2,
        link: '/employee/my-company',
        name: 'My Company',
        icon: 'pi pi-building mr-2',
      },
      {
        id: 3,
        link: '/employee/companies',
        name: 'All Companies',
        icon: 'pi pi-objects-column mr-2',
      },
    ];

    this.sectionsInView = [...this.sections];
  }

  /**
   * Closes the sidebar
   *
   * @param e Closing event
   */
  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }
}
