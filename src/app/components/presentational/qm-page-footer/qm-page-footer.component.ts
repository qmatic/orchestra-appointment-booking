import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISystemInfo } from './../../../../models/ISystemInfo';
import { SystemInfoSelectors, LicenseInfoSelectors } from '../../../../store';

@Component({
  selector: 'qm-page-footer',
  templateUrl: './qm-page-footer.component.html',
  styleUrls: ['./qm-page-footer.component.scss']
})
export class QmPageFooterComponent implements OnInit {

  public systemInformation$: Observable<ISystemInfo>;
  public licenseIsValid$: Observable<boolean>;

  constructor(
    private systemInfoSelectors: SystemInfoSelectors,
    private licenseInfoSelectors: LicenseInfoSelectors
  ) {
    this.systemInformation$ = this.systemInfoSelectors.systemInfo$;
    this.licenseIsValid$ = this.licenseInfoSelectors.isValidLicense$;
  }

  ngOnInit() { }

  hasValidLicense (systemInfo) {
    return systemInfo.licenseCompanyName !== null && systemInfo.licenseCompanyName !== '';
  }
}
