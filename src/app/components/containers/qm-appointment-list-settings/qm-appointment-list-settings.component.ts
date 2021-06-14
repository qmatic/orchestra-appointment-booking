import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, Inject, Input } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';
import { IBranch } from '../../../../models/IBranch';
import { AppointmentDispatchers, BranchDispatchers, BranchSelectors, UserSelectors } from '../../../../store';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgOption } from '@ng-select/ng-select';
import { ToastService } from '../../../../services/util/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { ThemePalette } from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

const DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: window.SYSTEM_DATE_FORMAT,
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

export class CustomDateFormats {
  constructor() {}
  get display() {
    return {
          dateInput: window.SYSTEM_DATE_FORMAT,
          monthYearLabel: "YYYY",
          dateA11yLabel: "LL",
          monthYearA11yLabel: "YYYY"
        };
  }
  get parse() {
    return {
          dateInput: window.SYSTEM_DATE_FORMAT
        };
  }
}

@Component({
  selector: 'qm-appointment-list-settings',
  templateUrl: './qm-appointment-list-settings.component.html',
  styleUrls: ['./qm-appointment-list-settings.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useClass: CustomDateFormats},
  ],
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
  searchAppointmentForm: FormGroup;
  userDirection$: Observable<string>;

  @ViewChild('pickerStart') pickerStart: any;
  @Input() editBtn: boolean;


  constructor(
    @Inject(MAT_DATE_FORMATS) private config: CustomDateFormats,
    private fb: FormBuilder,
    private branchSelectors: BranchSelectors,
    private branchDispatchers: BranchDispatchers,
    private appointmentDispatchers: AppointmentDispatchers,
    private toastService: ToastService,
    private translateService: TranslateService,
    private userSelectors: UserSelectors
  ) { 
    this.branches$ = this.branchSelectors.qpBranches$;
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit(){
    this.branchDispatchers.fetchQPBranches();
    const branchSubscription = this.branches$.subscribe(
      (branches: IBranch[]) => {
        this.branchlist = branches;
      }
    );
      this.subscriptions.add(branchSubscription);

      this.buildCustomerForm();
  }

  // Build customer form
  buildCustomerForm() {

    this.searchAppointmentForm = this.fb.group({
      branch: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  searchAppointments() {
    const formModel = this.searchAppointmentForm.value;
    const startDateObj = formModel.startDate.format('YYYY-MM-DD') + 'T00:00';
    const endDateObj = formModel.endDate.format('YYYY-MM-DD') + 'T23:59';
    const branchId = formModel.branch;

    this.appointmentDispatchers.fetchAppointmentList(startDateObj, endDateObj, branchId);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  clear() {
    this.branch = null;
    this.fromDate = null;
    this.toDate = null;
    this.appointmentDispatchers.resetAppointmentList();
  }
}
