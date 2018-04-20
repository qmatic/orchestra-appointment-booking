import { UserSelectors } from './../../../../store/services/user/user.selectors';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { SettingsAdminSelectors, SettingsAdminDispatchers } from '../../../../store/index';

@Component({
  selector: 'qm-qm-settings-admin',
  templateUrl: './qm-settings-admin.component.html',
  styleUrls: ['./qm-settings-admin.component.scss']
})
export class QmSettingsAdminComponent implements OnInit {
  userDirection$: Observable<string>;
  settings$: Observable<Map<string, any>>;
  constructor(private userSelectors: UserSelectors, private settingsAdminSelectors: SettingsAdminSelectors,
    private settingsAdminDispatchers: SettingsAdminDispatchers) {
    this.userDirection$ = this.userSelectors.userDirection$;
   }

  ngOnInit() {
    this.settings$ = this.settingsAdminSelectors.settings$;
    this.settingsAdminDispatchers.fetchSettings();
  }
}
