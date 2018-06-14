import { ActivatedRoute } from '@angular/router';
import { IBranch } from './../../../../models/IBranch';
import { Setting } from './../../../../models/Setting';
import { NavigationService } from './../../../util/navigation.service';
import { IAppointment } from './../../../../models/IAppointment';
import { ICustomer } from './../../../../models/ICustomer';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerSelectors, BookingSelectors, UserSelectors, SettingsAdminSelectors } from '../../../../store/index';
import { PrintSelectors } from '../../../../store/services/print/index';

@Component({
  selector: 'qm-qm-print-confirm',
  templateUrl: './qm-print-confirm.component.html',
  styleUrls: ['./qm-print-confirm.component.scss']
})
export class QmPrintConfirmComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  currentCustomer: ICustomer;
  bookedAppointment: IAppointment;
  userDirection$: Observable<string>;
  printedAppointment$: Observable<IAppointment>;
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  private settingsMap: { [name: string ]: Setting };
  phoneEnabled = true;
  emailEnabled = true;

  constructor(private customerSelectors: CustomerSelectors, private bookingSelectors: BookingSelectors,
              private navigationService: NavigationService, private userSelectors: UserSelectors,
              private settingsMapSelectors: SettingsAdminSelectors, private route: ActivatedRoute,
              private printSelectors: PrintSelectors) {
      this.userDirection$ = this.userSelectors.userDirection$;
      this.settingsMap$ = this.settingsMapSelectors.settingsAsMap$;
      this.printedAppointment$ = this.printSelectors.printedAppointment$;
  }

  ngOnInit() {

    const printAppointmentSubscription = this.printedAppointment$.subscribe(bapp => {
      this.bookedAppointment = bapp;
    });

    this.subscriptions.add(printAppointmentSubscription);

    if (this.bookedAppointment && this.bookedAppointment.customers && this.bookedAppointment.customers.length > 0) {
      this.currentCustomer = this.bookedAppointment.customers[0];
    }

    const settingsSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.settingsMap = settingsMap;
        this.phoneEnabled = settingsMap.CustomerIncludePhone.value;
        this.emailEnabled = settingsMap.CustomerIncludeEmail.value;
      }
    );

   this.subscriptions.add(settingsSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getTimeFormat(): string {
    if (this.settingsMap.TimeFormat.value === 'AMPM') {
      return 'h:mm a';
    } else {
      return 'HH:mm';
    }
  }

  cancelEdit() {
    this.navigationService.goToHome();
  }

  getBranchAddressText(branch: IBranch) {
    let completeAddress = '';
    if (branch) {
      const fieldsToLookFor = [
        'addressLine1',
        'addressLine2',
        'addressZip',
        'addressCity',
        'addressCountry'
      ];

      completeAddress = fieldsToLookFor.reduce((acc, curr) => {
        if (curr in branch) {
          const value = branch[curr];
          if (value !== null && value !== '') {
            if (acc === '') {
              return value;
            } else {
              return (acc += ', ' + value);
            }
          }
        }
        return acc;
      }, '');
    }

    return completeAddress;
  }

  printAppointment() {
    window.print();
  }
}
