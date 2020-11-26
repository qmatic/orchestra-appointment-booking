import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LicenseInfoSelectors } from './../store/services/license/license.selectors';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
@Injectable()
export class LicenseAuthGuard implements CanActivate {
  constructor(private licenseStatusSelector: LicenseInfoSelectors, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.licenseStatusSelector.getLicenseInfo$.pipe(map(licenseState => {
      if (licenseState.loaded) {
         if (licenseState.status) {
            return true;
         } else {
           this.router.navigate(['/invalid-license']);
           return false;
         }
      } else {
        this.router.navigate(['/loading'], { skipLocationChange: true });
        return false;
      }
    }));
  }
}
