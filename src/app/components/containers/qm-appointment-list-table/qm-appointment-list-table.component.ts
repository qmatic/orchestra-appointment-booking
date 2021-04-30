import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppointmentDispatchers, AppointmentSelectors, SettingsAdminSelectors, SystemInfoSelectors, UserSelectors } from '../../../../store';
import { Subscription, Observable } from 'rxjs';
import { IAppointment } from '../../../../models/IAppointment';

import * as XLSX from 'xlsx';
// @ts-ignore
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Setting } from '../../../../models/Setting';

// declare let jsPDF;
@Component({
  selector: 'qm-appointment-list-table',
  templateUrl: './qm-appointment-list-table.component.html',
  styleUrls: ['./qm-appointment-list-table.component.scss']
})
export class QmAppointmentListTableComponent implements OnInit, OnDestroy  {
  @Input() branchName: string;
  private subscriptions: Subscription = new Subscription();
  public appointmentList$: Observable<IAppointment[]>;
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  appointmentsLoaded$: Observable<boolean>;
  appointmentsLoading$: Observable<boolean>;
  public appointmentList: IAppointment[]
  public sortedfullappointmentList: IAppointment[]
  public fulAppointmentList: IAppointment[]
  public elementsPerPage: number;
  public currentPage: number;
  public sortByCondition: string;
  public sortByAsc: boolean;
  public searchText = '';
  private timeConvention$: Observable<string>;
  public isMilitaryTime: boolean;
  public appointmentsLoaded: boolean;
  public settingsMap: { [name: string]: Setting };
  public userDirection$: Observable<string>;
  public allFeildsDisabled: boolean;
  private dateConvention$: Observable<string>;
  public dateFormat = 'DD-MM-YYYY';
  private getDtFormatFromParams: boolean;

  constructor(
    private appointmentSelectors: AppointmentSelectors,
    private systemInfoSelectors: SystemInfoSelectors,
    private translateService: TranslateService,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private appointmentDispatchers: AppointmentDispatchers,
    private userSelectors: UserSelectors,
  ) {
    this.timeConvention$ = this.systemInfoSelectors.systemInfoTimeConvention$;
    this.appointmentList$ = this.appointmentSelectors.appointmentList$;
    this.appointmentsLoaded$ = this.appointmentSelectors.appointmentsLoaded$;
    this.appointmentsLoading$ = this.appointmentSelectors.appointmentsLoading$;
    this.userDirection$ = this.userSelectors.userDirection$;
    this.sortByCondition = 'DATE';
    this.sortByAsc = true;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
    this.dateConvention$ = this.systemInfoSelectors.systemInfoDateConvention$;
  }

  ngOnInit() {
    this.elementsPerPage = 5;
    this.currentPage = 1;
    document.title = 'Appointment List'
    const appointmentSubscription = this.appointmentList$.subscribe(
      (appointments: IAppointment[]) => {
        this.fulAppointmentList = appointments;
        this.sortedfullappointmentList = appointments;
        this.updateVisibleList();
      }
    );
    this.subscriptions.add(appointmentSubscription);
    const settingsSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.settingsMap = settingsMap;
        this.getDtFormatFromParams = settingsMap.GetSystemParamsDateFormat.value;
        this.allFeildsDisabled =  (settingsMap.ListDate && !settingsMap.ListDate.value) &&
        (settingsMap.ListStart && !settingsMap.ListStart.value) &&
        (settingsMap.ListEnd && !settingsMap.ListEnd.value) &&
        (settingsMap.ListFirstName && !settingsMap.ListFirstName.value) &&
        (settingsMap.ListLastName && !settingsMap.ListLastName.value) &&
        (settingsMap.ListResource && !settingsMap.ListResource.value) &&
        (settingsMap.ListNotesConf && !settingsMap.ListNotesConf.value) &&
        (settingsMap.ListServices && !settingsMap.ListServices.value) &&
        (settingsMap.ListEmail && !settingsMap.ListEmail.value) &&
        (settingsMap.ListPhoneNumber && !settingsMap.ListPhoneNumber.value) &&
        (settingsMap.ListUpdated && !settingsMap.ListUpdated.value) &&
        (settingsMap.ListStatus && !settingsMap.ListStatus.value);
      }
    );
    this.subscriptions.add(settingsSubscription);
    this.isMilitaryTime = true;
    const systemInformationSubscription = this.timeConvention$.subscribe(
      timeConvention => {
        if (timeConvention) {
          this.isMilitaryTime = timeConvention !== 'AMPM';
        }
      }
    );
    this.subscriptions.add(systemInformationSubscription);

    const appointmentsLoadedSubcription = this.appointmentsLoading$.subscribe(
      (appointmentsLoaded: boolean) =>
        (this.appointmentsLoaded = appointmentsLoaded)
    );
    this.subscriptions.add(appointmentsLoadedSubcription);

    const dateConventionSubscription = this.dateConvention$.subscribe(
      (dateConvention: string) => {
        this.dateFormat = this.getDtFormatFromParams ? dateConvention  : this.dateFormat;
      }
    );
    this.subscriptions.add(dateConventionSubscription);

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.appointmentDispatchers.resetAppointmentList();
  }
  onChangeElementsPerpage($event) {
    this.elementsPerPage = parseInt($event);
  }

  exportToExcel() {
    /*name of the excel-file which will be downloaded. */
    const fileName = 'Appointments List.xlsx';
    /* table id is passed over here */
    const element = document.getElementById('app-full-list');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, {raw: true});
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${this.branchName}`);
    // XLSX.utils.format_cell(ws['A2'].w.s);
    /* save to file */
    XLSX.writeFile(wb, fileName);

  }



  exportToPdf() {
    const doc = new jsPDF('l');
    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    doc.setLineWidth(2);
    doc.text(`Appointment List from ${this.branchName}`,10, 10);
    // @ts-ignore
    doc.autoTable({
        html: '#app-full-list',
        startY: 20
    });
    // @ts-ignore
    doc.save(`Appointment List from ${this.branchName}.pdf`);

  }

  onSearchTxtChanged() {
    if (this.searchText.trim() !== '') {
      this.sortedfullappointmentList = this.filterList(this.fulAppointmentList, this.searchText.trim().toLowerCase(), this.settingsMap);
    } else {
      this.sortedfullappointmentList = this.fulAppointmentList;
    }
    this.currentPage = 1;
    this.updateVisibleList();
  }
  sortByChange(value: string) {
    if (this.sortByCondition === value) {
      this.sortByAsc = !this.sortByAsc;
      this.sortVisitList();
    } else {
      this.sortByAsc = true;
      this.sortByCondition = value;
      this.sortVisitList();
    }
  }

  updateVisibleList() {
    this.appointmentList = this.sortedfullappointmentList;
    this.updateDetailList();
  }

  sortVisitList() {
    if (this.fulAppointmentList) {

      if (this.sortByCondition == 'DATE' || this.sortByCondition == 'UPDATED') {
        this.sortedfullappointmentList = this.fulAppointmentList.slice().sort((a, b) => {
          let nameA, nameB;
          if (this.sortByCondition == 'DATE') {
             nameA = new Date(a.startTime);
             nameB = new Date(b.startTime);

          } else {
             nameA = new Date(a.updateTime);
             nameB = new Date(b.updateTime);
          }

          if ((nameA < nameB && this.sortByAsc) || (nameA > nameB && !this.sortByAsc)) {
            return -1;
          }
          if ((nameA > nameB && this.sortByAsc) || (nameA < nameB && !this.sortByAsc)) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        this.updateVisibleList();

      } else if (this.sortByCondition === 'START' ||this.sortByCondition === 'END') {
        this.sortedfullappointmentList = this.fulAppointmentList.slice().sort((a, b) => {
          let nameA, nameB;
          if(this.sortByCondition === 'START' ) {
             nameA = moment(a.startTime).format('HH:mm');
             nameB = moment(b.startTime).format('HH:mm');
          } else {
             nameA = moment(a.endTime).format('HH:mm');
             nameB = moment(b.endTime).format('HH:mm');
          }
          if ((nameA < nameB && this.sortByAsc) || (nameA > nameB && !this.sortByAsc)) {
            return -1;
          }
          if ((nameA > nameB && this.sortByAsc) || (nameA < nameB && !this.sortByAsc)) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        this.updateVisibleList();
      } else {

        // sort by name
        this.sortedfullappointmentList = this.fulAppointmentList.slice().sort((a, b) => {

          let nameA = a.customers.length > 0 ? a.customers[0].firstName.toUpperCase() : ''; // ignore upper and lowercase
          let nameB =  b.customers.length > 0 ? b.customers[0].firstName.toUpperCase() : ''; // ignore upper and lowercase

          switch (this.sortByCondition) {
            case 'FIRST_NAME':
              nameA = a.customers.length > 0 ? a.customers[0].firstName.toUpperCase() : ''; // ignore upper and lowercase
              nameB =  b.customers.length > 0 ? b.customers[0].firstName.toUpperCase() : ''; // ignore upper and lowercase
              break;
            case 'LAST_NAME':
              nameA = a.customers.length > 0 ? a.customers[0].lastName.toUpperCase() : ''; // ignore upper and lowercase
              nameB = b.customers.length > 0 ? b.customers[0].lastName.toUpperCase() : ''; // ignore upper and lowercase
              break;
            case 'RESOURCE':
              nameA = a.resourceName.toUpperCase(); // ignore upper and lowercase
              nameB = b.resourceName.toUpperCase(); // ignore upper and lowercase
              break;
            case 'NOTE':
              nameA = a.properties.notes.toUpperCase(); // ignore upper and lowercase
              nameB = b.properties.notes.toUpperCase(); // ignore upper and lowercase
              break;
            case 'SERVICES':
              nameA = a.services.length > 0 ?  a.services[0].name.toUpperCase() : ''; // ignore upper and lowercase
              nameB = b.services.length > 0 ?  b.services[0].name.toUpperCase() : ''; // ignore upper and lowercase
              break;
            case 'EMAIL':
              nameA =  a.customers.length > 0 ? a.customers[0].properties.email.toUpperCase() : ''; // ignore upper and lowercase
              nameB =  b.customers.length > 0 ? b.customers[0].properties.email.toUpperCase() : ''; // ignore upper and lowercase
              break;
            case 'PHONE':
              nameA = a.customers.length > 0 ? a.customers[0].properties.phoneNumber.toUpperCase() : ''; // ignore upper and lowercase
              nameB = b.customers.length > 0 ? b.customers[0].properties.phoneNumber.toUpperCase() : ''; // ignore upper and lowercase
              break;
            case 'STATUS':
              nameA = a.status.toUpperCase(); // ignore upper and lowercase
              nameB = b.status.toUpperCase(); // ignore upper and lowercase
              break;
          }

          if ((nameA < nameB && this.sortByAsc) || (nameA > nameB && !this.sortByAsc)) {
            return -1;
          }
          if ((nameA > nameB && this.sortByAsc) || (nameA < nameB && !this.sortByAsc)) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        this.updateVisibleList();

      }

    }
  }

  filterList(list: IAppointment[], value: string, settingsMap: { [name: string]: Setting }) {
    let timeFormat = 'hh:mm A';
    const dateFormat = this.dateFormat;

    if (this.isMilitaryTime) {
      timeFormat = 'HH:mm';
    }
    const newList =  list.filter(function(app) {
      return ((!(settingsMap.ListFirstName && !settingsMap.ListFirstName.value)) && app.customers.length > 0 && app.customers[0].firstName.toLocaleLowerCase().includes(value)) ||
      ((!(settingsMap.ListLastName && !settingsMap.ListLastName.value)) && (app.customers.length > 0 && app.customers[0].lastName.toLocaleLowerCase().includes(value))) ||
      (!(settingsMap.ListResource && !settingsMap.ListResource.value)) && app.resourceName.toLocaleLowerCase().includes(value) ||
      (!(settingsMap.ListNotesConf && !settingsMap.ListNotesConf.value)) && app.properties.notes.toLocaleLowerCase().includes(value) ||
      (!(settingsMap.ListServices && !settingsMap.ListServices.value)) && (app.services.length > 0 && app.services[0].name.toLocaleLowerCase().includes(value)) ||
      (!(settingsMap.ListEmail && !settingsMap.ListEmail.value)) && (app.customers.length > 0 && app.customers[0].properties.email.toLocaleLowerCase().includes(value)) ||
      (!(settingsMap.ListPhoneNumber && !settingsMap.ListPhoneNumber.value)) && (app.customers.length > 0 && app.customers[0].properties.phoneNumber.toLocaleLowerCase().includes(value)) ||
      (!(settingsMap.ListStatus && !settingsMap.ListStatus.value)) && app.status.toLocaleLowerCase().includes(value) ||
      (!(settingsMap.ListDate && !settingsMap.ListDate.value) ) && moment(app.startTime).format(dateFormat).toLocaleLowerCase().includes(value) ||
      (!(settingsMap.ListStart && !settingsMap.ListStart.value)) && moment(app.startTime).format(timeFormat).toLocaleLowerCase().includes(value) ||
      (!(settingsMap.ListEnd && !settingsMap.ListEnd.value)) && moment(app.endTime).format(timeFormat).toLocaleLowerCase().includes(value) ||
      (!(settingsMap.ListUpdated && !settingsMap.ListUpdated.value)) && moment(app.updateTime).format(`${dateFormat} - ${timeFormat}`).toLocaleLowerCase().includes(value);
    });

    return newList;
  }

  getNotes(notes) {
    return decodeURIComponent(notes);
  }

  updateDetailList() {
    let label = '';
    this.translateService
      .get('label.list.founded', {
        currentPageFrom: (this.currentPage - 1) * this.elementsPerPage + 1,
        currentPageTo: (this.currentPage * this.elementsPerPage > this.appointmentList.length  ? this.appointmentList.length : this.currentPage * this.elementsPerPage),
        all: this.appointmentList.length
      })
      .subscribe(
        (listFoundLabel: string) => (label = listFoundLabel)
      )
      .unsubscribe();
      return label;
  }
  clear() {
    this.searchText = '';
    this.onSearchTxtChanged();
  }
}
