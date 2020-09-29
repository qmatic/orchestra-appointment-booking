import { AutoClose } from './../../../../services/util/autoclose.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsAdminSelectors } from '../../../../store/index';
import { Setting } from '../../../../models/Setting';
import { Observable ,  Subscription } from 'rxjs';
import { SPService } from '../../../../services/rest/sp.service';
import { LOGOUT_URL } from '../qm-page-header/header-navigation';

@Component({
  selector: 'qm-auto-close',
  templateUrl: './qm-auto-close.component.html',
  styleUrls: ['./qm-auto-close.component.scss']
})
export class QmAutoCloseComponent implements OnInit {
  constructor(private autoCloseService: AutoClose) {}

  ngOnInit() {}

  refreshAutoClose() {
    this.autoCloseService.refreshAutoClose();
  }
}
