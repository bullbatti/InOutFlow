import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';

import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MessageService } from 'primeng/api';
import { Employee } from '../../../interface/employee';
import { CalendarModule } from 'primeng/calendar';
import { TrackingService } from '../../../service/tracking.service';
import { Tracking } from '../../../interface/tracking';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FullCalendarModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ContextMenuModule,
    DialogModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  @Input() employee!: Employee;
  @ViewChild(FullCalendarComponent) fullCalendar!: FullCalendarComponent;
  @ViewChild('cm') cm!: ContextMenu;

  fullDate: any;
  selectedDate: any;
  isPrimeNgCalendarInline: boolean = true;
  visible: boolean = false;
  eventDetails!: any;
  startTitle: string = '';
  endtitle: string = '';
  /* items!: MenuItem[]; */

  calendarOptions: CalendarOptions = {
    themeSystem: 'standard',
    initialView: 'timeGridDay',
    height: '100%',
    plugins: [timeGridPlugin, dayGridPlugin],
    dayHeaders: false,
    dayHeaderContent: false,
    nowIndicator: true,
    allDaySlot: false,
    expandRows: true,
    headerToolbar: false,
    slotDuration: '01:00:00',
    editable: true,
    eventContent: this.renderEventContent,
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private messageService: MessageService,
    private trackingService: TrackingService
  ) {}

  ngOnInit() {
    this.getEventsByDate(new Date());

    /*  this.items = [
      { label: 'View', icon: 'pi pi-fw pi-eye', command: () => this.viewEvent() },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.editEvent() },
      { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteEvent() }
    ] */
  }

  /**
   * Fetches events for a specific date and updates the calendar.
   * Uses the trackingService to send a request to the server to fetch
   * events for a given date. Upon receiving a successful response, it processes the event titles
   * to add line breaks after the word "ENTRY" and updates the calendar with the modified events.
   *
   * @param {Date} date - The date for which events are to be fetched.
   */
  getEventsByDate(date: Date) {
    this.trackingService
      .getEventsByDate(date)
      .subscribe((trackingResp: Tracking[]) => {
        this.fullDate = trackingResp.map((t) => {
          let modifiedTitle = this.getEventTitle(t);

          return {
            title: modifiedTitle,
            start: t.startDate,
            end: t.endDate,
          };
        });

        this.calendarOptions.events = this.fullDate;
        this.calendarOptions = { ...this.calendarOptions };
      });
  }

  /**
   * Handles the selection of a date on the calendar.
   * Updates the selected date, fetches events for the selected date,
   * and updates the calendar visualization to reflect the new date and its events.
   *
   * @param {Date} event - The selected date.
   */
  onDateSelect(event: Date) {
    this.selectedDate = event;
    this.calendarOptions.initialDate = this.selectedDate;

    this.getEventsByDate(this.selectedDate);

    if (this.fullCalendar) {
      this.fullCalendar.getApi().gotoDate(this.selectedDate);
    }
  }

  /**
   * Customizes the rendering of event content in the calendar.
   * Creates DOM elements for the event time and title and returns them
   * as nodes to be displayed in the calendar event.
   *
   * @param {Object} arg - The argument object containing time text and event details.
   * @param {string} arg.timeText - The text representing the event time.
   * @param {Object} arg.event - The event object containing event details.
   * @param {string} arg.event.title - The title of the event.
   * @returns {Object} An object containing the DOM nodes for the event content.
   */
  renderEventContent(arg: { timeText: string; event: { title: string } }) {
    // Create the DOM element for the event time
    const timeEl = document.createElement('div');
    timeEl.innerText = arg.timeText;

    // Create the DOM element for the event title with HTML
    const titleEl = document.createElement('div');
    titleEl.innerHTML = arg.event.title;

    // Return the elements as DOM nodes
    return { domNodes: [timeEl, titleEl] };
  }

  /**
   * Handles the click event on a calendar event.
   * Displays an informational message to the user.
   */
  handleEventClick(arg: any) {
    this.eventDetails = undefined;
    this.eventDetails = arg.event;
    this.visible = true;

    /* this.eventDetails = arg.event;
    // Prevent the default context menu
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Show PrimeNG context menu
    this.cm.show(arg.jsEvent);
    // Stop propagation of the event to avoid other listeners
    if (arg.jsEvent.stopPropagation) {
      arg.jsEvent.stopPropagation();
    } */
  }

  /**
   * Process the received events and update the calendar array.
   * Divides the title in two rows in order to divide the entry and the exit tracking titles.
   *
   * @param t tracking event received from the server
   * @returns
   */
  getEventTitle(t: Tracking) {
    const entryIndex = t.nfcReader.indexOf('ENTRY');
    let modifiedTitle = t.nfcReader;

    if (entryIndex !== -1) {
      const beforeEntry = t.nfcReader.slice(0, entryIndex + 5); // "ENTRY" è lunga 5 caratteri
      const afterEntry = t.nfcReader.slice(entryIndex + 5);
      modifiedTitle = beforeEntry + '<br>' + afterEntry;
    }

    return modifiedTitle;
  }

 
}

/* handleEventClick(info: any) {
    if (this.employee.accountType !== 'USER')
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'You cannot edit your own events',
      }); */

/* if (this.user.accountType !== 'USER') {
      this.visible = true;
      const event = info.event;
      this.eventDetails = {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        description: event.extendedProps.description,
      };
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: "Your account type doesn't have permission to modify data",
      });
    } */
/*  }
 */
/* editEventDates() {
  const calendarApi = this.fullCalendar.getApi(); // Assumendo che tu abbia un riferimento a FullCalendar
  const event = calendarApi.getEventById(this.eventDetails.id);
  
  if (event && this.newStartDate && this.newEndDate) {
    const originalStartDate = event.start ? new Date(event.start) : new Date();
    const originalEndDate = event.end ? new Date(event.end) : new Date();

    const newStartHours = this.newStartDate.getHours();
    const newStartMinutes = this.newStartDate.getMinutes();

    const newEndHours = this.newEndDate.getHours();
    const newEndMinutes = this.newEndDate.getMinutes();

    const updatedStartDate = new Date(originalStartDate);
    updatedStartDate.setHours(newStartHours, newStartMinutes);

    const updatedEndDate = new Date(originalEndDate);
    updatedEndDate.setHours(newEndHours, newEndMinutes);

    console.log(updatedStartDate);
    console.log(updatedEndDate);

    event.setStart(updatedStartDate); // Imposta la nuova data di inizio
    event.setEnd(updatedStartDate); // Imposta la nuova data di fine
    event.setProp('title', this.eventDetails.title);
    event.setExtendedProp('description', this.eventDetails.description);

    event.remove();
    calendarApi.addEvent({
      id: this.eventDetails.id,
      title: this.eventDetails.title,
      start: updatedStartDate,
      end: updatedEndDate,
      extendedProps: {
        description: this.eventDetails.description
      }
    });

    calendarApi.render();

    this.visible = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: "Evend data modified correctly",
    });
  }
s
} */

   /**
   * Shows dialog with event informations
   */
  /* viewEvent() {
    this.visible = true;
  }

  editEvent() {
    console.log('Edit Event');
  }

  deleteEvent() {
    console.log('Delete Event');
  } */
