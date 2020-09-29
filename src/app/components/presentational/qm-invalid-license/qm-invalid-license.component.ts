import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSelectors } from '../../../../store';

@Component({
  selector: 'qm-invalid-license-component',
  templateUrl: './qm-invalid-license.component.html',
  styleUrls: ['./qm-invalid-license.component.scss']
})
export class QmInvalidLicenseComponent {
  public userDirection$: Observable<string>;
  constructor(private userSelectors: UserSelectors) {
    this.userDirection$ = this.userSelectors.userDirection$;
  }
}
