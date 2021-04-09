import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';
import { IBranch } from '../../../../models/IBranch';
import { AppointmentDispatchers, BranchDispatchers, BranchSelectors } from '../../../../store';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgOption } from '@ng-select/ng-select';
import { ToastService } from '../../../../services/util/toast.service';
import { TranslateService } from '@ngx-translate/core';

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
    private appointmentDispatchers: AppointmentDispatchers,
    private toastService: ToastService,
    private translateService: TranslateService,
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
    if (this.fromDate && this.fromDate.year && this.toDate && this.toDate.year && this.branch) {

      var fromDateObj = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day).getTime()
      var toDateObj = new Date(this.toDate.year, this.toDate.month, this.toDate.day).getTime()
      if (toDateObj - fromDateObj < 0) {
        this.translateService.get('label.list.date.error').subscribe(
          (label: string) =>  {
            this.toastService.errorToast(label);
          }
        ).unsubscribe();
      } else {
        this.appointmentDispatchers.fetchAppointmentList(
          `${this.fromDate.year}-${this.toDate.month < 10 ? '0' + this.fromDate.month : this.fromDate.month  }-${this.fromDate.day < 10 ? '0' + this.fromDate.day: this.fromDate.day}`,
          `${this.toDate.year}-${this.toDate.month < 10 ? '0' + this.toDate.month: this.toDate.month}-${this.toDate.day < 10 ? '0' + this.toDate.day: this.toDate.day}`,
          `${this.branch}`)
          var branchName = this.branchlist.filter(x => {
            return x.qpId.toString() === this.branch.toString();
          });
          if(branchName) {
            this.branchName.emit(branchName[0].name) ;
          }
    
      }
 

    } else {
      this.translateService.get('label.list.invalid.feild').subscribe(
        (label: string) =>  {
          this.toastService.errorToast(label);
        }
      ).unsubscribe();
    }
    
  
    // this.toastService.successToast('hello');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  clear() {
    this.branch = null;
    this.fromDate = null;
    this.toDate = null;

  }
}
