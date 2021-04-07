import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subscription } from "rxjs";
import { IAppointment } from "../../../../models/IAppointment";
import { ICustomer } from "../../../../models/ICustomer";
import { AppointmentDispatchers, CustomerSelectors, UserSelectors, AppointmentSelectors } from "../../../../store";

@Component({
  selector: "qm-qm-appointment-history",
  templateUrl: "./qm-appointment-history.component.html",
  styleUrls: ["./qm-appointment-history.component.scss"],
})
export class QmAppointmentHistoryComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public currentCustomer: ICustomer;
  private currentCustomer$: Observable<ICustomer>;
  userDirection$: Observable<string>;
  appointments$: Observable<IAppointment[]>;
  appointmentsLoaded$: Observable<boolean>;
  appointmentsLoading$: Observable<boolean>;
  appointments: IAppointment[];
  appointmentsLoaded: boolean;
  showTable = false;

  constructor(
    private userSelectors: UserSelectors,
    private customerSelectors: CustomerSelectors,
    private appointmentDispatchers: AppointmentDispatchers,
    private appointmentSelectors: AppointmentSelectors,
    private translateService: TranslateService,
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
    this.appointments$ = this.appointmentSelectors.appointments$;
    this.appointmentsLoaded$ = this.appointmentSelectors.appointmentsLoaded$;
    this.appointmentsLoading$ = this.appointmentSelectors.appointmentsLoading$;
    // this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const currentCustomerSubscription = this.currentCustomer$.subscribe(
      (customer: ICustomer) => {
        this.currentCustomer = customer;
        if (customer) {
          console.log(this.currentCustomer.publicId);
          this.appointmentDispatchers.fetchActionAppointments(
            this.currentCustomer.publicId
          );
          console.log(this.appointments);
        }
      }
    );

    const appointmentsSubcription = this.appointments$.subscribe(
      (appointments: IAppointment[]) => {
        if (appointments.length > 0) {
          console.log(appointments);
          this.appointments = appointments;
          this.showTable = true;
        }
      }
    );

    const appointmentsLoadedSubcription = this.appointmentsLoaded$.subscribe(
      (appointmentsLoaded: boolean) =>
        (this.appointmentsLoaded = appointmentsLoaded)
    );

    this.subscriptions.add(currentCustomerSubscription);
    this.subscriptions.add(appointmentsSubcription);
    this.subscriptions.add(appointmentsLoadedSubcription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  extractValue(value: string) {
    console.log(value);

    value = value.replace(/"{"/g, '{"').replace(/"}"/g, '"}').replace(/" }"/g, '"}');
    console.log(value);
    const obj = JSON.parse(value);
    return obj;
  }

}
