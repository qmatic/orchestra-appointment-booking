import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject ,  Observable ,  Subscription } from 'rxjs';
import { TimeslotDispatchers, ReserveDispatchers, TimeslotSelectors, SystemInfoSelectors } from '../../../../store';
import { BookingHelperService } from '../../../../services/util/bookingHelper.service';
import { IBookingInformation } from '../../../../models/IBookingInformation';
import { IAppointment } from '../../../../models/IAppointment';
import { Setting } from '../../../../models/Setting';
@Component({
  selector: 'qm-timeslot-booker',
  templateUrl: './qm-timeslot-booker.component.html',
  styleUrls: ['./qm-timeslot-booker.component.scss'],
})
export class QmTimeslotBookerComponent implements OnInit, OnDestroy {
  @Input()
  settingsMap: { [name: string]: Setting };

  @Input()
  userDirection: string;

  private subscriptions: Subscription = new Subscription();
  private selectedTime$: Observable<string>;
  private selectedTime: string;
  private timeConvention$: Observable<string>;
  private timeConvention: string;

  public times$: Observable<string[]>;
  public times: string[];
  public timeToScrollTo$: Subject<number> = new Subject<number>();

  constructor(
    private timeslotDispatchers: TimeslotDispatchers,
    private reserveDispatchers: ReserveDispatchers,
    private bookingHelperService: BookingHelperService,
    private timeslotSelectors: TimeslotSelectors,
    private systemInfoSelectors: SystemInfoSelectors
  ) {
    this.times$ = this.timeslotSelectors.times$;
    this.selectedTime$ = this.timeslotSelectors.selectedTime$;
    this.timeConvention$ = this.systemInfoSelectors.systemInfoTimeConvention$;
  }

  ngOnInit() {
    const timesSubsciption = this.times$.subscribe(
      (times: string[]) => {
        this.times = times;
      }
    );

    const selectedTimeSubscription = this.selectedTime$.subscribe(
      (selectedTime: string) => {
        this.selectedTime = selectedTime;
      }
    );

    const timeConventionSubscription = this.timeConvention$.subscribe(
      timeConvention => this.timeConvention = timeConvention
    );

    this.subscriptions.add(timesSubsciption);
    this.subscriptions.add(selectedTimeSubscription);
    this.subscriptions.add(timeConventionSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

    /************/
  /*   TIMES  */
  /************/

  /**
   * Click handler for time selection
   * @param timeslot - Selected time
   */
  handleTimeslotSelection(timeslot: string) {
    const isSelected = this.isTimeslotSelected(timeslot);

    if (isSelected) {
      this.timeslotDispatchers.deselectTimeslot();
    } else {
      this.timeslotDispatchers.selectTimeslot(timeslot);
      this.reserveAppointment();
    }
  }

  /**
   * Reserve appointment
   */
  reserveAppointment() {
    const bookingInformation: IBookingInformation = this.bookingHelperService.getBookingInformation();
    const appointment: IAppointment = this.bookingHelperService.getAppointmentInformation();

    this.reserveDispatchers.reserveAppointment(bookingInformation, appointment);
  }

  getTimeAsDate(time: string): Date {
    const now = new Date();
    const splitTime = time.split(':');
    now.setHours(parseInt(splitTime[0], 10));
    now.setMinutes(parseInt(splitTime[1], 10));

    return now;
  }

  getTimeFormat(): string {
    if (this.timeConvention === 'AMPM') {
      return 'shortTime';
    } else {
      return 'HH:mm';
    }
  }

  /**
   * Handles scrolling in time list
   */
  handleSidebarClick(timeToScrollTo: string) {
    const nextClosestTime = this.getNextClosestTime(timeToScrollTo);
    const indexOfChild = this.getPositionOfTimeInList(nextClosestTime);
    this.timeToScrollTo$.next(indexOfChild);
  }

  getPositionOfTimeInList(timeToFind) {
    return this.times.indexOf(timeToFind);
  }

  getNextClosestTime(time: string): string {
    const timeFormat = this.timeConvention;

    if (timeFormat === 'AMPM') {
      return this.getNextClosestTimeAMPM(time);
    } else {
      return this.getNextClosestTime24Hours(time);
    }
  }

  getNextClosestTime24Hours(time: string): string {
    const clickedTime: number = parseInt(time, 10);
    const timeToScrollTo = this.times.reduce(
      (nextClosestTime: string, currTime: string) => {
        const currentHour: string = currTime.split(':')[0];
        const currentIterTime = parseInt(currentHour, 10);

        if (nextClosestTime === '' && currentIterTime >= clickedTime) {
          return currTime;
        } else {
          return nextClosestTime;
        }
      }, ''
    );

    return timeToScrollTo;
  }

  getNextClosestTimeAMPM(ampm: string) {
    const timeToScrollTo = this.times.reduce(
      (nextClosestTime: string, currTime: string) => {
        const clickedAMPM: string = ampm;

        if (clickedAMPM === 'AM') {
          if (nextClosestTime === '') {
            return currTime;
          } else {
            return nextClosestTime;
          }
        }

        if (clickedAMPM === 'PM') {
          const currentHour: string = currTime.split(':')[0];
          const currentIterTime = parseInt(currentHour, 10);

          if (nextClosestTime === '' && currentIterTime >= 12) {
            return currTime;
          } else {
            return nextClosestTime;
          }
        }
      }, ''
    );

    return timeToScrollTo;
  }

  /**
   * Check if provided time is already the selected time
   * @param time - Provided time
   */
  isTimeslotSelected(time: string) {
    return this.selectedTime === time;
  }
}
