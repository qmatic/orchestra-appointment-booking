import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISystemInfo } from './../../../../models/ISystemInfo';
import { SystemInfoSelectors } from '../../../../store';

@Component({
  selector: 'qm-page-footer',
  templateUrl: './qm-page-footer.component.html',
  styleUrls: ['./qm-page-footer.component.scss']
})
export class QmPageFooterComponent implements OnInit {

  systemInformation$: Observable<ISystemInfo>;

  constructor(
    private systemInfoSelectors: SystemInfoSelectors
  ) {
    this.systemInformation$ = this.systemInfoSelectors.systemInfo$;
  }

  ngOnInit() { }

  hasValidLicense (systemInfo) {
    return systemInfo.licenseCompanyName !== null && systemInfo.licenseCompanyName !== '';
  }
}
