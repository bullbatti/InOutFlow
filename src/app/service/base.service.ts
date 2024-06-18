import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl: string = 'http://localhost:8080/api/';

  constructor() { }
}
