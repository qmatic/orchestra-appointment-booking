import { Router } from '@angular/router';
import { LicenseInfoSelectors } from './../../../../store/services/license.selectors';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'qm-qm-app-loader',
  templateUrl: './qm-app-loader.component.html',
  styleUrls: ['./qm-app-loader.component.scss']
})
export class QmAppLoaderComponent {
  // Load other selector in here to make sure they are loaded before app is launched!!!
  constructor(private licenseSelector: LicenseInfoSelectors, private router: Router) {
    this.licenseSelector.isLicenseLoaded$.subscribe(loadedState => {
      if (loadedState) {
        this.router.navigate(['/app']);
      }
    });
  }
}
