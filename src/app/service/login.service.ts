import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  /**
   * Performs a login operation by sending a POST request to the API endpoint.
   *
   * @param login The login information provided by the user.
   * @return An observable of the HTTP response, allowing asynchronous handling of the response.
   */
  login(login: Login) {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post('http://localhost:8080/api/login', login, {
      headers,
      observe: 'response',
    });
  }
}
