import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';
import { ISystemInfo } from './../../../../models/ISystemInfo';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toArray';
import { IAppState } from '../../../../store/index';

@Component({
  selector: 'qm-global-footer',
  templateUrl: './qm-global-footer.component.html',
  styleUrls: ['./qm-global-footer.component.scss']
})
export class QmGlobalFooterComponent implements OnInit {

  footerText$: Observable<string>;

  constructor(private store: Store<IAppState>, private translate: TranslateService) { }

  ngOnInit() {
    const lang$ = this.translate.use('staffBookingMessages');
    this.footerText$ = lang$.concat(
      this.store.select<ISystemInfo>(store => store.systemInfo.data).map(systemInfo => {
      // 1. Powered by text
      const poweredByText = `${this.translate.instant('label.poweredBy')} Qmatic`;

      // 2. Footer text
      const footerText = `Qmatic ${systemInfo.productName} ${systemInfo.releaseName} [${systemInfo.productVersion}]`;

      // 3. License text
      let licenseText = `${this.translate.instant('label.licensedTo')} ${systemInfo.licenseCompanyName}`;

      // 4. Check if license is valid
      const isValidLicense = this.isValidLicense(systemInfo);

      // 5. If license is not valid, then show no license!!
      if (!isValidLicense) {
        licenseText = this.translate.instant('label.notLicensed');
      }

      // 6. Concat all text messages and return to view!!
      return `${poweredByText} ${footerText} ${licenseText}`;
    })
    );
  }

  isValidLicense = (systemInfo) => {
    return systemInfo.licenseCompanyName !== null && systemInfo.licenseCompanyName !== '';
  }
}
