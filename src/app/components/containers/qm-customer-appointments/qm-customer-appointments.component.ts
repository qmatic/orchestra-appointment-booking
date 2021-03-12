import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable ,  Subscription } from 'rxjs';
import * as moment from 'moment';

import {
  AppointmentSelectors,
  AppointmentDispatchers,
  CustomerSelectors,
  UserSelectors
} from '../../../../store';

import { IAppointment } from '../../../../models/IAppointment';
import { ICustomer } from '../../../../models/ICustomer';
import { Router } from '@angular/router';

@Component({
  selector: 'qm-customer-appointments',
  templateUrl: './qm-customer-appointments.component.html',
  styleUrls: ['./qm-customer-appointments.component.scss']
})
export class QmCustomerAppointmentsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  appointments$: Observable<IAppointment[]>;
  currentCustomer$: Observable<ICustomer>;
  appointmentsLoaded$: Observable<boolean>;
  appointmentsLoading$: Observable<boolean>;
  appointments: IAppointment[];
  currentCustomer: ICustomer;
  appointmentsLoaded: boolean;
  dropdownLabel: string;
  isExpand: boolean;

  public userDirection$: Observable<string>;

  constructor(
    private appointmentSelectors: AppointmentSelectors,
    private customerSelectors: CustomerSelectors,
    private appointmentDispatchers: AppointmentDispatchers,
    private translateService: TranslateService,
    private userSelectors: UserSelectors,
    private router: Router
  ) {
    this.appointments$ = this.appointmentSelectors.appointments$;
    this.appointmentsLoaded$ = this.appointmentSelectors.appointmentsLoaded$;
    this.appointmentsLoading$ = this.appointmentSelectors.appointmentsLoading$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {
    const appointmentsSubcription = this.appointments$.subscribe(
      (appointments: IAppointment[]) => {
        console.log(appointments);
        this.appointments = [...appointments].sort(this.sortDate);
        this.updateDropdownLabel();
        if (this.appointments.length > 0) {
          this.isExpand = true;
        }
      }
    );

    const appointmentsLoadedSubcription = this.appointmentsLoaded$.subscribe(
      (appointmentsLoaded: boolean) =>
        (this.appointmentsLoaded = appointmentsLoaded)
    );

    const customerSubcription = this.currentCustomer$.subscribe(
      (currentCustomer: ICustomer) => (this.currentCustomer = currentCustomer)
    );

    this.subscriptions.add(appointmentsSubcription);
    this.subscriptions.add(appointmentsLoadedSubcription);
    this.subscriptions.add(customerSubcription);
  }

  toggleDrop() {
    this.isExpand = !this.isExpand;
  }

  updateDropdownLabel(): void {
    this.translateService
      .get('button.customerAppointments.dropdown', {
        0: this.appointments.length
      })
      .subscribe(
        (dropdownLabel: string) => (this.dropdownLabel = dropdownLabel)
      )
      .unsubscribe();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  sortDate(appointment1: IAppointment, appointment2: IAppointment) {
    const date1 = moment(appointment1.start).valueOf();
    const date2 = moment(appointment2.start).valueOf();

    if (date1 > date2) {
      return 1;
    }
    if (date1 < date2) {
      return -1;
    }
    return 0;
  }

  fetchAppointments(): void {
    this.appointmentDispatchers.fetchAppointments(
      this.currentCustomer.publicId
    );
    console.log(this.appointments);
    
  }

  toAppHistory(){
    this.router.navigateByUrl('/app-history');
  }
}
