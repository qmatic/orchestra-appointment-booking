import { ToastService } from './toast.service';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { SPService } from '../rest/sp.service';
import { UserSelectors } from '../../store/index';
import { LOGOUT_URL } from '../../app/components/containers/qm-page-header/header-navigation';

@Injectable()
export class Logout {
  constructor(
    private spService: SPService,
    private userSelector: UserSelectors,
    private translateService: TranslateService,
    private toastService: ToastService
  ) {}

  logout() {
    this.spService.fetchUserStatus().subscribe((status: any) => {
      if (status.branchId !== null && status.servicePointId !== null) {
        if (this.checkInvalidVisitState(status.visitState) === false) {
          this.userSelector.userUserName$.subscribe(username => {
            this.spService
              .logoutFromServicePoint(
                status.branchId,
                status.servicePointId,
                username
              )
              .subscribe();
            this.spService.logoutFromOrchestra().subscribe();
            window.location.href = LOGOUT_URL;
          });
        } else {
          this.translateService
            .get('message.error.logout.ds.require')
            .subscribe((label: string) => {
              this.toastService.errorToast(label);
            })
            .unsubscribe();
        }
      } else {
        window.location.href = LOGOUT_URL;
      }
    });
  }

  checkInvalidVisitState(visitState) {
    const OUTCOME_NEEDED = 'OUTCOME_NEEDED';
    const DELIVERED_SERVICE_NEEDED = 'DELIVERED_SERVICE_NEEDED';
    const OUTCOME_OR_DELIVERED_SERVICE_NEEDED =
      'OUTCOME_OR_DELIVERED_SERVICE_NEEDED';
    const OUTCOME_FOR_DELIVERED_SERVICE_NEEDED =
      'OUTCOME_FOR_DELIVERED_SERVICE_NEEDED';

    if (visitState === null) {
      return false;
    }
    if (
      visitState === OUTCOME_NEEDED ||
      visitState === DELIVERED_SERVICE_NEEDED ||
      visitState === OUTCOME_FOR_DELIVERED_SERVICE_NEEDED ||
      visitState === OUTCOME_OR_DELIVERED_SERVICE_NEEDED
    ) {
      return true;
    } else {
      return false;
    }
  }
}
