import { Component, OnInit } from '@angular/core';
import { AppointmentSelectors } from '../../../../store';
import { Subscription, Observable } from 'rxjs';
import { IAppointment } from '../../../../models/IAppointment';

import * as XLSX from 'xlsx';
//@ts-ignore
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'
import * as moment from 'moment';

// declare let jsPDF;
@Component({
  selector: 'qm-appointment-list-table',
  templateUrl: './qm-appointment-list-table.component.html',
  styleUrls: ['./qm-appointment-list-table.component.scss']
})
export class QmAppointmentListTableComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  public appointmentList$: Observable<IAppointment[]>;
  public appointmentList: IAppointment[]
  public sortedfullappointmentList: IAppointment[]
  public fulAppointmentList: IAppointment[]
  public elementsPerPage: number;
  public currentPage: number;
  public sortByCondition: string;
  public sortByAsc: boolean;
  public searchText: '';

  constructor(
    private appointmentSelectors: AppointmentSelectors
  ) {
    this.appointmentList$ = this.appointmentSelectors.appointmentList$;
    this.sortByCondition = 'DATE';
    this.sortByAsc = true;
  }

  ngOnInit() {
    this.elementsPerPage = 5;
    this.currentPage = 1;
    const appointmentSubscription = this.appointmentList$.subscribe(
      (appointments: IAppointment[]) => {
        this.fulAppointmentList = appointments;
        this.sortedfullappointmentList = appointments;
        this.updateVisibleList();
        // console.log(this.appointmentList)
      }
    );
    this.subscriptions.add(appointmentSubscription);
  }

  onChangeElementsPerpage($event) {
    this.elementsPerPage = parseInt($event);
    this.appointmentList = this.fulAppointmentList.slice((this.currentPage - 1) * this.elementsPerPage, (this.currentPage * this.elementsPerPage));
  }
  exportToExcel() {
    /*name of the excel-file which will be downloaded. */
    var fileName = 'Appointments.xlsx';
    /* table id is passed over here */
    let element = document.getElementById('app-list');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);

  }

  exportToPdf() {
    const doc = new jsPDF('l');
    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    //@ts-ignore
    doc.autoTable({ html: '#app-list' })

    // // Or use javascript directly:
    // doc.autoTable({
    //   head: [['Name', 'Email', 'Country']],
    //   body: [
    //     ['David', 'david@example.com', 'Sweden'],
    //     ['Castille', 'castille@example.com', 'Spain'],
    //     // ...
    //   ],
    // })

    doc.save('Appointments.pdf')

  }

  onSearchTxtChanged() {
    if (this.searchText.trim() !== '') { 
      this.sortedfullappointmentList = this.filterList(this.fulAppointmentList, this.searchText.trim().toLowerCase());
    } else {
      this.sortedfullappointmentList = this.fulAppointmentList;
    }
    // console.log(this.sortedfullappointmentList)
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
    this.appointmentList = this.sortedfullappointmentList.slice(0, this.elementsPerPage)
  }

  sortVisitList() {
    if (this.fulAppointmentList) {

      if (this.sortByCondition == 'DATE' || this.sortByCondition == 'UPDATED') {
        this.sortedfullappointmentList = this.fulAppointmentList.slice().sort((a, b) => {

          if (this.sortByCondition == 'DATE') {
            var nameA = new Date(a.startTime) 
            var nameB = new Date(b.startTime) 
  
          } else {
            var nameA = new Date(a.updateTime) 
            var nameB = new Date(b.updateTime) 
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

      } else if (this.sortByCondition == 'START' ||this.sortByCondition == 'END') {
        this.sortedfullappointmentList = this.fulAppointmentList.slice().sort((a, b) => {
          if(this.sortByCondition == 'START' ) {
            var nameA = moment(a.startTime).format("HH:mm"); 
            var nameB = moment(b.startTime).format("HH:mm"); 
          } else {
            var nameA = moment(a.endTime).format("HH:mm"); 
            var nameB = moment(b.endTime).format("HH:mm"); 
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
      else {

        // sort by name
        this.sortedfullappointmentList = this.fulAppointmentList.slice().sort((a, b) => {

          var nameA = a.customers[0].firstName.toUpperCase(); // ignore upper and lowercase
          var nameB = b.customers[0].firstName.toUpperCase(); // ignore upper and lowercase

          switch (this.sortByCondition) {
            case "FIRST_NAME":
              nameA = a.customers[0].firstName.toUpperCase(); // ignore upper and lowercase
              nameB = b.customers[0].firstName.toUpperCase(); // ignore upper and lowercase
              break;
            case "LAST_NAME":
              nameA = a.customers[0].lastName.toUpperCase(); // ignore upper and lowercase
              nameB = b.customers[0].lastName.toUpperCase(); // ignore upper and lowercase
              break;
            case "RESOURCE":
              nameA = a.resourceName.toUpperCase(); // ignore upper and lowercase
              nameB = b.resource.name.toUpperCase(); // ignore upper and lowercase
              break;
            case "NOTE":
              nameA = a.properties.notes.toUpperCase(); // ignore upper and lowercase
              nameB = b.properties.notes.toUpperCase(); // ignore upper and lowercase
              break;
            case "SERVICES":
              nameA = a.services[0].name.toUpperCase(); // ignore upper and lowercase
              nameB = b.services[0].name.toUpperCase(); // ignore upper and lowercase
              break;
            case "EMAIL":
              nameA = a.customers[0].properties.email.toUpperCase(); // ignore upper and lowercase
              nameB = b.customers[0].properties.email.toUpperCase(); // ignore upper and lowercase
              break;
            case "PHONE":
              nameA = a.customers[0].properties.phoneNumber.toUpperCase(); // ignore upper and lowercase
              nameB = b.customers[0].properties.phoneNumber.toUpperCase(); // ignore upper and lowercase
              break;
            case "STATUS":
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

  // filterList(list: IAppointment[], value: string) {
  //   return list.filter(object => {
  //     return  moment(object.startTime).format("DD-MM-YYYY") == value || 
  //             moment(object.startTime).format("hh:mm A") == value || 
  //             moment(object.updateTime).format("DD-MM-YYYY - hh:mm A") == value || 
  //             moment(object.endTime).format("hh:mm A") == value || 
  //            object.customers[0].firstName == value ||
  //            object.customers[0].lastName == value ||
  //            object.resourceName == value ||
  //            object.properties.notes  == value ||
  //            object.services[0].name == value ||
  //            object.customers[0].properties.email == value ||
  //            object.customers[0].properties.phoneNumber == value ||
  //            object.status == value ;
  //   });
  // }
  filterList(list: IAppointment[], value: string) { 
    var newList =  list.filter(function(app) {
      return app.customers[0].firstName.toLocaleLowerCase().includes(value) || 
      app.customers[0].lastName.toLocaleLowerCase().includes(value) ||
      app.resourceName.toLocaleLowerCase().includes(value) ||
      app.properties.notes.toLocaleLowerCase().includes(value) ||
      app.services[0].name.toLocaleLowerCase().includes(value) ||
      app.customers[0].properties.email.toLocaleLowerCase().includes(value) ||
      app.customers[0].properties.phoneNumber.toLocaleLowerCase().includes(value) ||
      app.status.toLocaleLowerCase().includes(value);
    });
  
    return newList;
  }
  
}
