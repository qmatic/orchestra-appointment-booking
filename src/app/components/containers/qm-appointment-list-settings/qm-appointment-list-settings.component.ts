import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';
import { IBranch } from '../../../../models/IBranch';
import { AppointmentDispatchers, BranchDispatchers, BranchSelectors } from '../../../../store';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgOption } from '@ng-select/ng-select';


@Component({
  selector: 'qm-appointment-list-settings',
  templateUrl: './qm-appointment-list-settings.component.html',
  styleUrls: ['./qm-appointment-list-settings.component.scss']
})
export class QmAppointmentListSettingsComponent implements OnInit, OnDestroy {
  @Output() branchName: EventEmitter<string> = new EventEmitter<string>();
  private subscriptions: Subscription = new Subscription();
  public branchlist = []
  public branches$: Observable<IBranch[]>;
  public fromDate: NgbDateStruct;
  public toDate: NgbDateStruct;
  public languages: NgOption[] = [];
  public branch: any;


  constructor(
    private branchSelectors: BranchSelectors,
    private branchDispatchers: BranchDispatchers,
    private appointmentDispatchers: AppointmentDispatchers
  ) { 
   
    this.branches$ = this.branchSelectors.qpBranches$;

  }

  ngOnInit(){
    this.branchDispatchers.fetchQPBranches();
    const branchSubscription = this.branches$.subscribe(
      (branches: IBranch[]) => {
        this.branchlist = branches;
      }
    );
      this.subscriptions.add(branchSubscription);
  }

  SearchAppointments() {
    if (this.fromDate && this.fromDate.year && this.toDate && this.toDate.year) {
      this.appointmentDispatchers.fetchAppointmentList(
      `${this.fromDate.year}-${this.toDate.month < 10 ? '0' + this.fromDate.month : this.fromDate.month  }-${this.fromDate.day < 10 ? '0' + this.fromDate.day: this.fromDate.day}`,
      `${this.toDate.year}-${this.toDate.month < 10 ? '0' + this.toDate.month: this.toDate.month}-${this.toDate.day < 10 ? '0' + this.toDate.day: this.toDate.day}`,
      `${this.branch}`)
    }
    // this.branchName.emit()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
