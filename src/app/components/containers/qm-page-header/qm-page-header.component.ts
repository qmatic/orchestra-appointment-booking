import { Subject } from 'rxjs/Subject';
import { UserRoleSelectors } from './../../../../store/services/user-role/user-role.selectors';
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserSelectors } from '../../../../store';
import { SPService } from '../../../../services/rest/sp.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import {
  LOGOUT,
  HELP,
  HOME,
  LOGOUT_URL,
  HELP_URL,
  APP_URL
} from './header-navigation';

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
  logoutSubscription: Subscription;

  @Output()
  clickBackToAppointmentsPage: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  handleHeaderNavigations: EventEmitter<string> = new EventEmitter<string>();

  @Input() isPreventHeaderNavigations = false;

  constructor(
    private userSelectors: UserSelectors,
    private userRoleSelectors: UserRoleSelectors,
    private spService: SPService,
    public route: ActivatedRoute
  ) {
    this.userIsAdmin$ = this.userRoleSelectors.isUserAdmin$;
    this.userFullName$ = this.userSelectors.userFullName$;
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {}
  ngOnDestroy() {
    // this.logoutSubscription.unsubscribe();
  }

  logout(event: Event) {
    event.preventDefault();
    if (!this.isPreventHeaderNavigations) {
      this.spService.logout().subscribe(() => {
        window.location.href = LOGOUT_URL;
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

  helpClick($event) {
    $event.preventDefault();
    if (!this.isPreventHeaderNavigations) {
      window.location.href = HELP_URL;
    } else {
      this.handleHeaderNavigations.emit(HELP);
    }
  }

  homeClick($event) {
    $event.preventDefault();
    if (!this.isPreventHeaderNavigations) {
      window.location.href = APP_URL;
    } else {
      this.handleHeaderNavigations.emit(HOME);
    }
  }
}
