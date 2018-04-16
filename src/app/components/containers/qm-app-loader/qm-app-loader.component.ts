import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { LicenseInfoSelectors } from './../../../../store/services/license/license.selectors';

@Component({
  selector: 'qm-qm-app-loader',
  templateUrl: './qm-app-loader.component.html',
  styleUrls: ['./qm-app-loader.component.scss']
})
export class QmAppLoaderComponent implements OnDestroy {
  // Load other selector in here to make sure they are loaded before app is launched!!!
  licenseSubscription: Subscription;
  constructor(
    private licenseSelector: LicenseInfoSelectors,
    private router: Router
  ) {
    this.licenseSubscription = this.licenseSelector.isLicenseLoaded$.subscribe(loadedState => {
      if (loadedState) {
        this.router.navigate(['/app']);
      }
    });
  }

  ngOnDestroy(): void {
    this.licenseSubscription.unsubscribe();
  }
}
