import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LicenseInfoSelectors } from './../store/services/license/license.selectors';
import { SettingsAdminSelectors } from '../store/index';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class SettingsErrorGuard implements CanActivate {
    constructor(private settingsAdminSelector: SettingsAdminSelectors, private router: Router) { }
    canActivate(): Observable<boolean> {
        return this.settingsAdminSelector.settingsLoaded$
            .pipe(
                filter(status => status === true),
                switchMap(() => {
                    return this.settingsAdminSelector.settingsError$;
                }),
                map((errorPayLoad: any) => {
                    let isActivated = true;
                    if (errorPayLoad && errorPayLoad.responseData && errorPayLoad.responseData.status === 401) {
                        this.router.navigate(['/error'], {
                            queryParams: {
                                'error-label-key': 'label.settings.permission.error'
                            }
                        });

                        isActivated = false;
                    }
                    return isActivated;
                })
            );
    }
}
