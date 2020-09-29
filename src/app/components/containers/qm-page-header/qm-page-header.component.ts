import { Logout } from './../../../../services/util/logout.service';
import { AutoClose } from './../../../../services/util/autoclose.service';
import { TimeslotDispatchers } from './../../../../store/services/timeslot/timeslot.dispatchers';
import { ReserveDataService } from './../../../../store/services/reserve/reserve-data.service';
import { IService } from './../../../../models/IService';
import { BookingHelperSelectors } from './../../../../store/services/booking-helper/booking-helper.selectors';
import { Subject ,  Observable ,  Subscription } from 'rxjs';
import { UserRoleSelectors } from './../../../../store/services/user-role/user-role.selectors';
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { UserSelectors, SystemInfoSelectors, LicenseInfoSelectors } from '../../../../store';
import { SPService } from '../../../../services/rest/sp.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LOGOUT,
  HOME,
  LOGOUT_URL,
  APP_URL,
  SETTINGS_URL
} from './header-navigation';
import { QmModalService } from '../../presentational/qm-modal/qm-modal.service';
import { ISystemInfo } from '../../../../models/ISystemInfo';
import { BookingHelperDispatchers } from '../../../../store/services/booking-helper/booking-helper.dispatchers';

@Component({
  selector: 'qm-page-header',
  templateUrl: './qm-page-header.component.html',
  styleUrls: ['./qm-page-header.component.scss']
})
export class QmPageHeaderComponent implements OnInit, OnDestroy {
  brandLogoSrc = 'images/brand_logo_header.png';
  userFullName$: Observable<string>;
  userDirection$: Observable<string>;
  userIsAdmin$: Observable<boolean>;
  selectedServices$: Observable<IService[]>;
  selectedServices: IService[] = [];
  headerSubscriptions: Subscription = new Subscription();
  isTimeSlotSelected: boolean;
  selectedTime$: Observable<string>;
  private isValidLicense$: Observable<boolean>;
  private isValidLicense: boolean;

  @Output()
  clickBackToAppointmentsPage: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  handleHeaderNavigations: EventEmitter<string> = new EventEmitter<string>();

  @Input() isPreventHeaderNavigations = false;

  constructor(
    private userSelectors: UserSelectors,
    private userRoleSelectors: UserRoleSelectors,
    private spService: SPService,
    public route: ActivatedRoute,
    public qmModalService: QmModalService,
    public bookingHelperSelectors: BookingHelperSelectors,
    private reservationDataService: ReserveDataService,
    private timeslotDispatchers: TimeslotDispatchers,
    public autoCloseService: AutoClose,
    private router: Router,
    private logoutService: Logout,
    private licenseInfoSelectors: LicenseInfoSelectors,
    private bookingHelperDispatchers: BookingHelperDispatchers
  ) {
    this.userIsAdmin$ = this.userRoleSelectors.isUserAdmin$;
    this.userFullName$ = this.userSelectors.userFullName$;
    this.userDirection$ = this.userSelectors.userDirection$;
    this.selectedServices$ = this.bookingHelperSelectors.selectedServices$;
    this.selectedTime$ = this.bookingHelperSelectors.selectedTime$;
    this.isValidLicense$ = this.licenseInfoSelectors.isValidLicense$;
  }

  ngOnInit() {
    this.headerSubscriptions.add(
      this.selectedServices$.subscribe((services: IService[]) => {
        this.selectedServices = services;
      })
    );

    this.headerSubscriptions.add(
      this.selectedTime$.subscribe((selectedTime: string) => {
        if (selectedTime) {
          this.isTimeSlotSelected = true;
        } else {
          this.isTimeSlotSelected = false;
        }
      })
    );

    const licenseSubscription = this.isValidLicense$.subscribe(
      (licenseIsValid: boolean) => {
        this.isValidLicense = licenseIsValid;
      }
    );

    this.headerSubscriptions.add(licenseSubscription);
  }
  ngOnDestroy() {
    this.headerSubscriptions.unsubscribe();
  }

  logout(event: Event) {
    event.preventDefault();
    if (!this.isPreventHeaderNavigations) {
      this.promptUserIfOngoingBooking(() => {
        this.logoutService.logout();
      });
    } else {
      this.handleHeaderNavigations.emit(LOGOUT);
    }
  }

  navigateBackToAppointment($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.clickBackToAppointmentsPage.emit($event);
  }

  navigateToSettings($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.promptUserIfOngoingBooking(() => {
      this.router.navigateByUrl(SETTINGS_URL);
      this.bookingHelperDispatchers.resetAll();
    });
  }

  homeClick($event) {
    $event.preventDefault();
    if (!this.isPreventHeaderNavigations) {
      this.promptUserIfOngoingBooking(() => {
        window.location.href = APP_URL;
      });
    } else {
      this.handleHeaderNavigations.emit(HOME);
    }
  }

  promptUserIfOngoingBooking(successAction) {
    if (this.selectedServices.length > 0) {
      this.qmModalService.openForTransKeys(
        'modal.navigate.booking.page.title',
        'modal.navigate.booking.page.message',
        'modal.navigate.booking.button.cancel',
        'modal.navigate.booking.button.ok',
        (okClicked: Boolean) => {
          if (!okClicked) {
            successAction();
            if (this.isTimeSlotSelected) {
              this.timeslotDispatchers.deselectTimeslot();
            }
          }
        },
        () => {}
      );
    } else {
      successAction();
    }
  }

  hasValidLicense(): boolean {
    return this.isValidLicense;
  }
}
