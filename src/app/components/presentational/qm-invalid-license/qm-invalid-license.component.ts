import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { UserSelectors } from '../../../../store';

@Component({
  selector: 'qm-invalid-license-component',
  templateUrl: './qm-invalid-license.component.html',
  styleUrls: ['./qm-invalid-license.component.scss']
})
export class QmInvalidLicenseComponent implements OnInit {
  public userDirection$: Observable<string>;
  constructor(private translate: TranslateService, private userSelectors: UserSelectors) {
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {
  }
}
