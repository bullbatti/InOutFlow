import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TrackingService } from '../../../service/tracking.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CardModule, ChartModule, ToastModule, TooltipModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent implements OnInit {
  data: any;
  options: any;

  constructor(
    private trackingService: TrackingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    /**
     * Fetches the percentage data for the last week and updates the chart data.
     *
     * Uses the trackingService to send a request to the server to fetch
     * percentage data for the last week. Upon receiving a successful response, it updates
     * the chart data structure with the received data. If an error occurs, it displays
     * an error message using the messageService.
     */
    this.trackingService.getLastWeekPercentages().subscribe({
      next: (weekData: number[]) => {
        this.data = {
          labels: ['Attendance', 'Absences', 'Delays', 'Early exits'],
          datasets: [
            {
              data: weekData,
              backgroundColor: [
                documentStyle.getPropertyValue('--blue-500'),
                documentStyle.getPropertyValue('--red-500'),
                documentStyle.getPropertyValue('--yellow-500'),
                documentStyle.getPropertyValue('--orange-400'),
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue('--blue-400'),
                documentStyle.getPropertyValue('--red-400'),
                documentStyle.getPropertyValue('--yellow-400'),
                documentStyle.getPropertyValue('--orange-300'),
              ],
            },
          ],
        };
      },
      error: (err: Error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error retreiving last week data. Please try reloading the page or fill the form to request assistance',
        });
        console.error(err.message);
      },
    });

    // chart initialization
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }
}
