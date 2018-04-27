import { UserRoleSelectors } from './../../../../store/services/user-role/user-role.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserSelectors } from '../../../../store';
import { SPService } from '../../../../services/rest/sp.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'qm-page-header',
  templateUrl: './qm-page-header.component.html',
  styleUrls: ['./qm-page-header.component.scss']
})
export class QmPageHeaderComponent implements OnInit, OnDestroy {
  brandLogoSrc = 'assets/images/brand_logo_header.png';
  userFullName$: Observable<string>;
  userDirection$: Observable<string>;
  userIsAdmin$: Observable<boolean>;
  logoutSubscription: Subscription;

  constructor(
    private userSelectors: UserSelectors,
    private userRoleSelectors: UserRoleSelectors,
    private spService: SPService,
    private route: ActivatedRoute
  ) {
    this.userIsAdmin$ = this.userRoleSelectors.isUserAdmin$;
    this.userFullName$ = this.userSelectors.userFullName$;
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() { }
  ngOnDestroy() {
    // this.logoutSubscription.unsubscribe();
  }

  logout(event: Event) {
    event.preventDefault();
    this.spService.logout().subscribe(() => {
      window.location.href = '/logout.jsp';
    });
  }
}
