import { SettingsAdminSelectors } from './../../store/services/settings-admin/settings-admin.selectors';
import { Injectable } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LOGOUT_URL } from '../../app/components/containers/qm-page-header/header-navigation';
import { Setting } from '../../models/Setting';
import { SPService } from '../rest/sp.service';

@Injectable()
export class AutoClose {
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  private autoCloseTimeInSeconds = 0;
  private currentAutoCloseTime = 0;
  private autoCloseInterval = null;
  constructor(
    private spService: SPService,
    private settingsAdminSelectors: SettingsAdminSelectors
  ) {
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
    const settingsSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.autoCloseTimeInSeconds = parseInt(
          settingsMap['AutoClosetime']['value'],
          10
        );

        this.currentAutoCloseTime = this.autoCloseTimeInSeconds;
        if (this.autoCloseInterval) {
          clearInterval(this.autoCloseInterval);
        }
        this.autoCloseInterval = setInterval(() => {
          if (this.currentAutoCloseTime === 0) {
            clearInterval(this.autoCloseInterval);
            this.onAutoCloseTimeExpired();
          } else {
            // console.log(this.currentAutoCloseTime);
            this.currentAutoCloseTime -= 1;
          }
        }, 1000);
      }
    );
  }

  onAutoCloseTimeExpired() {
    this.spService.logout().subscribe(() => {
      window.location.href = LOGOUT_URL;
    });
  }

  refreshAutoClose() {
    if (this.currentAutoCloseTime > 0) {
      /*console.log(
        `Updating autoclose timer value currentAutoCloseTime to ${this
          .autoCloseTimeInSeconds}`
      );*/
      this.currentAutoCloseTime = this.autoCloseTimeInSeconds;
    }
  }
}
