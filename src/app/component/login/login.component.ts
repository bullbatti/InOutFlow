import { Component, OnInit } from '@angular/core';
import { Login } from '../../interface/login';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';
import {
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    MessageService
  ]
})
export class LoginComponent {

  // variables for form management
  loginForm!: FormGroup;
  isFormSubmitted: boolean = false;

  // Variable to store employee credentials from the login form
  employeeLogin!: Login;

  constructor(private loginService: LoginService, private router: Router, private messageService: MessageService) {
    // Initialize the login form with email and password fields, including validation rules
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Handles the submission of the login form.
   *
   * This method first checks if the login form is valid. If it is valid, it marks the form as submitted
   * and ensures all form controls are touched to trigger validation messages if necessary. It then extracts
   * the email and password from the form controls and assigns them to the employeeLogin object for authentication.
   * Finally, it initiates the login process by calling the login() method.
   */
  onSubmit() {
    const isFormValid = this.loginForm.valid;
    this.isFormSubmitted = true;
    this.loginForm.markAllAsTouched();

    if (isFormValid) {
      this.employeeLogin = {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value,
      };

      this.login();
    } else {
      console.error('Invalid data are present in the form. Please try again');
    }
  }

  /**
   * Calls the login service to send a login request to the server with the provided employeeLog
   * credentials. Upon receiving a response from the server, it checks the response status. If the status
   * is 200 (OK), it extracts the authorization token from the response headers and stores it in the local
   * storage. It then navigates the user to the profile page. If the response status is 401 (Unauthorized),
   * it sets a login error message indicating invalid email or password. For any other error status, it sets
   * a generic error message indicating inability to connect to the server.
   */
  login() {
    this.loginService.login(this.employeeLogin).subscribe({
      next: (resp: HttpResponse<any>) => {
        if (resp.status === 200) {
          const token = resp.headers.get('Authorization');

          if (token) {
            localStorage.setItem('token', token);

            this.router.navigateByUrl('/employee');
          } else {
            console.error('No token found');
          }
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid email or password, please try again' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to connect to the server, please try again' });
        }
      },
    });
  }
}
