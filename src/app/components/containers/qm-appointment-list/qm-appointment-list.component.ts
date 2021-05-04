import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  public branchList: IBranch[];
  public selectedBranch: IBranch;
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  displayedColumns: string[] = [];
  constructor(
    private toastService: ToastService,
    private userSelectors: UserSelectors,
    private appointmentSelectors: AppointmentSelectors,
    private appointmentDispatcher: AppointmentDispatchers,
    private router: Router,
    private branchSelectors: BranchSelectors,
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
   }

  ngOnInit(): void {

    const userDirectionSubscription = this.userDirection$.subscribe(
      (userDirection: string) => {
        this.userDirection = userDirection;
      }
    );
    this.subscriptions.add(userDirectionSubscription);

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

    const settingsSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        if (settingsMap.ListDate.value) this.displayedColumns.push('date')
        if (settingsMap.ListStart.value) this.displayedColumns.push('start')
        if (settingsMap.ListEnd.value) this.displayedColumns.push('end')
        if (settingsMap.ListFirstName.value) this.displayedColumns.push('firstName')
        if (settingsMap.ListLastName.value) this.displayedColumns.push('lastName')
        if (settingsMap.ListResource.value) this.displayedColumns.push('resource')
        if (settingsMap.ListNotesConf.value) this.displayedColumns.push('note')
        if (settingsMap.ListServices.value) this.displayedColumns.push('service')
        if (settingsMap.ListEmail.value) this.displayedColumns.push('email')
        if (settingsMap.ListPhoneNumber.value) this.displayedColumns.push('phone')
        if (settingsMap.ListUpdated.value) this.displayedColumns.push('updated')
        if (settingsMap.ListStatus.value) this.displayedColumns.push('status')
      }
    );
    this.subscriptions.add(settingsSubscription);
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

  exportExcel(){
    ExportExcel.exportTableToExcel("app-full-list");
  }

  exportPdf(){
    ExportPdf.exportTableToPdf(this.appointmentList,this.displayedColumns);
  }

}
