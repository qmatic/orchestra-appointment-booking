import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'qm-invalid-license-component',
  templateUrl: './qm-invalid-license.component.html',
  styleUrls: ['./qm-invalid-license.component.scss']
})
export class QmInvalidLicenseComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

}
