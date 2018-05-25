import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserSelectors, SettingsAdminSelectors } from '../../../../store';
import { Setting } from '../../../../models/Setting';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'qm-resource-text',
  templateUrl: './qm-resource-text.component.html',
  styleUrls: ['./qm-resource-text.component.scss'],
})
export class QmResourceTextComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public userDirection$: Observable<string>;
  private adminSettings$: Observable<{ [name: string]: Setting }>;

  private resourceEnabled: boolean;

  @Input()
  text = '';

  constructor(
    private userSelectors: UserSelectors,
    private settingsAdminSelectors: SettingsAdminSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.adminSettings$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const adminSettingsSubscription = this.adminSettings$.subscribe(
      (adminSettings: { [name: string]: Setting }) =>
        this.resourceEnabled = adminSettings.ShowResource.value
    );

    this.subscriptions.add(adminSettingsSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  showResource() {
    return this.text !== '' && this.resourceEnabled;
  }
}
