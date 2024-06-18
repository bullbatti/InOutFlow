import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { SmartCard } from '../interface/smart-card';

@Injectable({
  providedIn: 'root'
})
export class SmartCardService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  readSmartCardId() {
    return this.http.get(`${this.baseUrl}smart-cards/new`, { responseType: 'text' });
  }
}
