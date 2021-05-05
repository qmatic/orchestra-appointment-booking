import { Component, Input, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// declare let jsPDF;
@Component({
  selector: 'qm-appointment-list-table',
  templateUrl: './qm-appointment-list-table.component.html',
  styleUrls: ['./qm-appointment-list-table.component.scss']
})
export class QmAppointmentListTableComponent implements OnInit, OnDestroy {
  @Input() branchName: string;
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<Object>;
  fullAppDataSource: MatTableDataSource<Object>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private dashboardHeight = 600;
  public dashboardRowCSSHeight = '600px';
  private dashboardRemains = 88;
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
  public dateFormat = 'YY-MM-DD';
  private getDtFormatFromParams: boolean;
  public userDirection: string;

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

  @ViewChild('myDiv') theDiv: ElementRef;
  ngAfterContentChecked() {
    let elem = document.getElementById('dashboard-body');

    let elemHight = elem.clientHeight;
    if (elemHight !== this.dashboardHeight && elemHight > this.dashboardRemains) {
      this.dashboardHeight = elemHight;
      this.dashboardRowCSSHeight = (elemHight - this.dashboardRemains - 23) + 'px';

    }
  }

  ngOnInit() {
    this.elementsPerPage = 5;
    this.currentPage = 1;
    document.title = 'Appointment List';

    
    const settingsSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.settingsMap = settingsMap;
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
        this.getDtFormatFromParams = settingsMap.GetSystemParamsDateFormat.value;
      }
    );
    this.subscriptions.add(settingsSubscription);


    const dateConventionSubscription = this.dateConvention$.subscribe(
      (dateConvention: string) => {
        this.dateFormat = this.getDtFormatFromParams ? dateConvention : this.dateFormat;
      }
    );
    this.subscriptions.add(dateConventionSubscription);

    
    const appointmentSubscription = this.appointmentList$.subscribe(
      (appointments: IAppointment[]) => {
        this.fulAppointmentList = appointments;
        this.dataSource = new MatTableDataSource(this.fulAppointmentList);
        this.fullAppDataSource =  new MatTableDataSource(this.fulAppointmentList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'date': return new Date((item as IAppointment).startTime);
            case 'start': return moment((item as IAppointment).startTime).format('HH:mm');
            case 'end': return moment((item as IAppointment).endTime).format('HH:mm');
            case 'firstName': return (item as IAppointment).customers && (item as IAppointment).customers.length > 0 && (item as IAppointment).customers[0].firstName || '';
            case 'lastName': return (item as IAppointment).customers && (item as IAppointment).customers.length > 0 && (item as IAppointment).customers[0].lastName || '';
            case 'resource': return (item as IAppointment).resourceName.toLowerCase() || '';
            case 'note': return (item as IAppointment).properties.notes.toLowerCase() || '';
            case 'updated': return new Date((item as IAppointment).updateTime);
            case 'email': return (item as IAppointment).customers && (item as IAppointment).customers.length > 0 && (item as IAppointment).customers[0].properties.email || '';
            case 'phone': return (item as IAppointment).customers && (item as IAppointment).customers.length > 0 && (item as IAppointment).customers[0].properties.phoneNumber || '';
            case 'service': return (item as IAppointment).services && (item as IAppointment).services.length > 0 && (item as IAppointment).services[0].name || '';
            case 'status': return (item as IAppointment).status;
            default: return item[property];
          }
        };
        this.dataSource.sort = this.sort;

        if (appointments.length > 0) {
          let timeFormat = 'hh:mm A';
          const dateFormat = this.dateFormat;
          if (this.isMilitaryTime) {
            timeFormat = 'HH:mm';
          }
          this.dataSource.filterPredicate = (data: IAppointment, filter: string) => {
            return  (!(this.settingsMap.ListResource && !this.settingsMap.ListResource.value)) && data.resourceName && data.resourceName.toLowerCase().includes(filter) ||
            (!(this.settingsMap.ListStart && !this.settingsMap.ListStart.value)) && moment(data.startTime).format(timeFormat).toLocaleLowerCase().includes(filter) ||
            (!(this.settingsMap.ListEnd && !this.settingsMap.ListEnd.value)) && moment(data.endTime).format(timeFormat).toLocaleLowerCase().includes(filter) ||
            (!(this.settingsMap.ListDate && !this.settingsMap.ListDate.value)) && moment(data.startTime).format(dateFormat).toLocaleLowerCase().includes(filter) ||
            (!(this.settingsMap.ListUpdated && !this.settingsMap.ListUpdated.value)) && moment(data.updateTime).format(`${dateFormat} ${timeFormat}`).toLocaleLowerCase().includes(filter) ||
            (!(this.settingsMap.ListFirstName && !this.settingsMap.ListFirstName.value)) && data.customers && data.customers.length > 0 && data.customers[0].firstName.toLowerCase().includes(filter) ||
            (!(this.settingsMap.ListLastName && !this.settingsMap.ListLastName.value)) &&  data.customers && data.customers.length > 0 && data.customers[0].lastName.toLowerCase().includes(filter) ||
            (!(this.settingsMap.ListPhoneNumber && !this.settingsMap.ListPhoneNumber.value)) &&  data.customers && data.customers.length > 0 && data.customers[0].properties.phoneNumber.includes(filter) ||
            (!(this.settingsMap.ListEmail && !this.settingsMap.ListEmail.value))  && data.customers && data.customers.length > 0 && data.customers[0].properties.email.toLowerCase().includes(filter) ||
            (!(this.settingsMap.ListNotesConf && !this.settingsMap.ListNotesConf.value)) && data.properties && data.properties.notes.toLowerCase().includes(filter) ||
            (!(this.settingsMap.ListServices && !this.settingsMap.ListServices.value)) && data.services && data.services.length > 0 && data.services[0].name.toLowerCase().includes(filter) ||
            (!(this.settingsMap.ListStatus && !this.settingsMap.ListStatus.value)) && data.status && data.status.toLowerCase().includes(filter);
          };
        }
      }
    );

    this.subscriptions.add(appointmentSubscription);


    const appointmentsLoadedSubcription = this.appointmentsLoading$.subscribe(
      (appointmentsLoaded: boolean) =>
        (this.appointmentsLoaded = appointmentsLoaded)
    );
    this.subscriptions.add(appointmentsLoadedSubcription);

    
    

    const userDirectionSubscription = this.userDirection$.subscribe(
      (userDirection: string) => {
        this.userDirection = userDirection;
      }
    );
    this.subscriptions.add(userDirectionSubscription);

  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
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
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { raw: true });
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
    doc.text(`Appointment List from ${this.branchName}`, 10, 10);
    // @ts-ignore
    doc.autoTable({
      html: '#app-full-list',
      startY: 20
    });
    // @ts-ignore
    doc.save(`Appointment List from ${this.branchName}.pdf`);

  }

  onSearchChange(value) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

      } else if (this.sortByCondition === 'START' || this.sortByCondition === 'END') {
        this.sortedfullappointmentList = this.fulAppointmentList.slice().sort((a, b) => {
          let nameA, nameB;
          if (this.sortByCondition === 'START') {
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
          let nameB = b.customers.length > 0 ? b.customers[0].firstName.toUpperCase() : ''; // ignore upper and lowercase

          switch (this.sortByCondition) {
            case 'FIRST_NAME':
              nameA = a.customers.length > 0 ? a.customers[0].firstName.toUpperCase() : ''; // ignore upper and lowercase
              nameB = b.customers.length > 0 ? b.customers[0].firstName.toUpperCase() : ''; // ignore upper and lowercase
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
              nameA = a.services.length > 0 ? a.services[0].name.toUpperCase() : ''; // ignore upper and lowercase
              nameB = b.services.length > 0 ? b.services[0].name.toUpperCase() : ''; // ignore upper and lowercase
              break;
            case 'EMAIL':
              nameA = a.customers.length > 0 ? a.customers[0].properties.email.toUpperCase() : ''; // ignore upper and lowercase
              nameB = b.customers.length > 0 ? b.customers[0].properties.email.toUpperCase() : ''; // ignore upper and lowercase
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
    const newList = list.filter(function (app) {
      return ((!(settingsMap.ListFirstName && !settingsMap.ListFirstName.value)) && app.customers.length > 0 && app.customers[0].firstName.toLocaleLowerCase().includes(value)) ||
        ((!(settingsMap.ListLastName && !settingsMap.ListLastName.value)) && (app.customers.length > 0 && app.customers[0].lastName.toLocaleLowerCase().includes(value))) ||
        (!(settingsMap.ListResource && !settingsMap.ListResource.value)) && app.resourceName.toLocaleLowerCase().includes(value) ||
        (!(settingsMap.ListNotesConf && !settingsMap.ListNotesConf.value)) && app.properties.notes.toLocaleLowerCase().includes(value) ||
        (!(settingsMap.ListServices && !settingsMap.ListServices.value)) && (app.services.length > 0 && app.services[0].name.toLocaleLowerCase().includes(value)) ||
        (!(settingsMap.ListEmail && !settingsMap.ListEmail.value)) && (app.customers.length > 0 && app.customers[0].properties.email.toLocaleLowerCase().includes(value)) ||
        (!(settingsMap.ListPhoneNumber && !settingsMap.ListPhoneNumber.value)) && (app.customers.length > 0 && app.customers[0].properties.phoneNumber.toLocaleLowerCase().includes(value)) ||
        (!(settingsMap.ListStatus && !settingsMap.ListStatus.value)) && app.status.toLocaleLowerCase().includes(value) ||
        (!(settingsMap.ListDate && !settingsMap.ListDate.value)) && moment(app.startTime).format(dateFormat).toLocaleLowerCase().includes(value) ||
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
        currentPageTo: (this.currentPage * this.elementsPerPage > this.appointmentList.length ? this.appointmentList.length : this.currentPage * this.elementsPerPage),
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
