import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AppointmentDispatchers, AppointmentSelectors, BranchSelectors, UserSelectors } from '../../../../store';
import { ToastService } from '../../../../services/util/toast.service';
import { IAppointment } from '../../../../models/IAppointment';
import { Router } from '@angular/router';
import { QmAppointmentListTableComponent } from '../qm-appointment-list-table/qm-appointment-list-table.component';
import { ExportExcel } from "../../../util/exportExcel";
import { ExportPdf } from "../../../util/exportPdf";
import { IBranch } from '../../../../models/IBranch';
import { Setting } from '../../../../models/Setting';
import * as XLSX from 'xlsx';
// @ts-ignore
import jsPDF from 'jspdf'
@Component({
  selector: 'qm-appointment-list',
  templateUrl: './qm-appointment-list.component.html',
  styleUrls: ['./qm-appointment-list.component.scss']
})
export class QmAppointmentListComponent implements OnInit, OnDestroy {
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  @ViewChild (QmAppointmentListTableComponent) appointmentListCom:QmAppointmentListTableComponent;
  private subscriptions: Subscription = new Subscription();
  public userDirection$: Observable<string>;
  public userDirection: string;
  public appointmentList: IAppointment[];
  public appointmentsLoading$: Observable<boolean>;
  public appointmentsLoading: boolean;
  public branchList: IBranch[];
  public selectedBranch: IBranch;
  public allFeildsDisabled: boolean;
  // private settingsMap$: Observable<{ [name: string]: Setting }>;
  displayedColumns: string[] = [];
  constructor(
    private toastService: ToastService,
    private userSelectors: UserSelectors,
    private appointmentSelectors: AppointmentSelectors,
    private appointmentDispatcher: AppointmentDispatchers,
    private router: Router,
    private branchSelectors: BranchSelectors,
    private cdr: ChangeDetectorRef
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.appointmentsLoading$ = this.appointmentSelectors.appointmentsLoading$;
   }

  ngOnInit(): void {
  
    const userDirectionSubscription = this.userDirection$.subscribe(
      (userDirection: string) => {
        this.userDirection = userDirection;
      }
    );
    this.subscriptions.add(userDirectionSubscription);

    const appointmentsLoadedSubcription = this.appointmentsLoading$.subscribe(
      (appointmentsLoading: boolean) =>
        (this.appointmentsLoading = appointmentsLoading)
    );
    this.subscriptions.add(appointmentsLoadedSubcription);

    const branchSubscription = this.branchSelectors.qpBranches$.subscribe(
      (branches: IBranch[]) => {
        this.branchList = branches;
      }
    );
      this.subscriptions.add(branchSubscription);

    const appointmentSubscription = this.appointmentSelectors.appointmentList$.subscribe(
      (appointments: IAppointment[]) => {
        this.appointmentList = appointments;
        if (appointments && appointments.length > 0){
          this.selectedBranch = this.getSelectedBranch();
        }
      }
    );
    this.subscriptions.add(appointmentSubscription);

    this.toastService.setToastContainer(this.toastContainer);
  }

  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }
  appointmentsLoadingCheck() {
    return this.appointmentsLoading;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleHeaderNavigations(navigationType) {
    window.location.href = '/';
  }

  clickBackToAppointmentsPage($event) {
    this.appointmentDispatcher.resetAppointmentList();
    this.router.navigateByUrl('/app');
  }

  onTextChange(value) {
    this.appointmentListCom.onSearchChange(value);
  }

  onDownloadList(value){
    if (value === 'xls') {
      this.exportExcel();
    } else if (value === 'pdf'){
      this.exportPdf();
    }
  }

  getSelectedBranch() {
    const branchId = this.appointmentList[0].branchId;
    const selectedBranch = this.branchList.filter(obj =>{
      return obj.id == branchId;
    })
    return selectedBranch[0];
  }

  isAllFeildsDisabledEmitted(event) {
   this.allFeildsDisabled = event;
  }

  exportExcel(){
    ExportExcel.exportTableToExcel("full-app-hidden-list", `Appointment List from ${this.selectedBranch.name}`+ ' - ' + new Date().toISOString(), this.selectedBranch.name );
  }

  exportPdf(){
    ExportPdf.exportHtmlTableToPdf(`Appointment List from ${this.selectedBranch.name}`,`Appointment List from ${this.selectedBranch.name}`+ ' - ' + new Date().toISOString(),'full-app-hidden-list')
  }

}
