import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';
import { IBranch } from '../../../../models/IBranch';
import { BranchSelectors } from '../../../../store';

@Component({
  selector: 'qm-appointment-list-settings',
  templateUrl: './qm-appointment-list-settings.component.html',
  styleUrls: ['./qm-appointment-list-settings.component.scss']
})
export class QmAppointmentListSettingsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public branchlist = []
  public branches$: Observable<IBranch[]>;

  constructor(
    private branchSelectors: BranchSelectors,
  ) { 
    this.branches$ = this.branchSelectors.branches$;

  }

  ngOnInit(){
    const branchSubscription = this.branches$.subscribe(
      (branches: IBranch[]) => {
        this.branchlist = branches.map(x => x.name)
       console.log(branches)
      }
    );
  }

  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
