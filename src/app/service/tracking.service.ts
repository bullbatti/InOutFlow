import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Tracking } from '../interface/tracking';
import { YearData } from '../interface/year-data';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TrackingService extends BaseService {
  baseTrackingUrl = `${this.baseUrl}tracking/`;

  constructor(
    private httpClient: HttpClient,
    private employeeService: EmployeeService
  ) {
    super();
  }

  getEventsByDate(date: Date) {
    const headers = this.employeeService.getHeaderParams();
    const dateParam = this.formatDate(date);

    return this.httpClient.get<Tracking[]>(
      `${this.baseTrackingUrl}${dateParam}`,
      { headers }
    );
  }

  getLastWeekPercentages() {
    const headers = this.employeeService.getHeaderParams();

    return this.httpClient.get<number[]>(
      `${this.baseTrackingUrl}last-week-percentages`,
      {
        headers,
      }
    );
  }

  getCurrentYearPercentages() {
    const headers = this.employeeService.getHeaderParams();

    return this.httpClient.get<number[]>(`${this.baseTrackingUrl}year-percentages`, {
      headers,
    });
  }

  formatDate(date: Date) {
    date.setHours(date.getHours() + 2);
    return date.toISOString().slice(0, 19);
  }
}
