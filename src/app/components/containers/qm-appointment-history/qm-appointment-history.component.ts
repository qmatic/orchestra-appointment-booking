import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subscription } from "rxjs";
import { IAppointment } from "../../../../models/IAppointment";
import { ICustomer } from "../../../../models/ICustomer";
import { AppointmentDispatchers, CustomerSelectors, UserSelectors, AppointmentSelectors, BranchSelectors, BranchDispatchers, ServiceSelectors, ServiceDispatchers } from "../../../../store";
import * as moment from 'moment';
import { IAppointmentVisit } from "../../../../models/IAppointmentVisit";
import { IBranch } from "../../../../models/IBranch";
import { IService } from "../../../../models/IService";

@Component({
  selector: "qm-qm-appointment-history",
  templateUrl: "./qm-appointment-history.component.html",
  styleUrls: ["./qm-appointment-history.component.scss"],
})
export class QmAppointmentHistoryComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public currentCustomer: ICustomer;
  private currentCustomer$: Observable<ICustomer>;
  userDirection$: Observable<string>;
  appointments$: Observable<IAppointment[]>;
  appointmentsLoaded$: Observable<boolean>;
  appointmentsLoading$: Observable<boolean>;
  appointment$: Observable<IAppointment>;
  appointmentLoaded$: Observable<boolean>;
  appointmentLoading$: Observable<boolean>;
  appointmentVisit$: Observable<IAppointmentVisit[]>;
  appointments: IAppointment[];
  appointment: IAppointment;
  selectedAppointment: IAppointment = null;
  visitDataArray: any[] = [];
  appointmentVisit: IAppointmentVisit[];
  selectedAppointmentLoaded = false;
  appointmentsLoaded: boolean;
  showTable = false;
  branches$: Observable<IBranch[]>;
  services$: Observable<IService[]>;
  public searchText: '';
  public sortedfullappointmentList: IAppointment[];
  public fulAppointmentList: IAppointment[];
  public elementsPerPage: number;
  public currentPage: number;
  public sortByCondition: string;
  public sortByAsc: boolean;
  public branchlist = [];
  public servicelist = [];

  constructor(
    private userSelectors: UserSelectors,
    private customerSelectors: CustomerSelectors,
    private appointmentDispatchers: AppointmentDispatchers,
    private appointmentSelectors: AppointmentSelectors,
    private translateService: TranslateService,
    private branchSelectors: BranchSelectors,
    private branchDispatchers: BranchDispatchers,
    private serviceSelectors: ServiceSelectors,
    private serviceDispatchers: ServiceDispatchers,
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
    this.appointments$ = this.appointmentSelectors.appointments$;
    this.appointmentsLoaded$ = this.appointmentSelectors.appointmentsLoaded$;
    this.appointmentsLoading$ = this.appointmentSelectors.appointmentsLoading$;
    this.appointment$ = this.appointmentSelectors.appointment$;
    this.appointmentLoaded$ = this.appointmentSelectors.appointmentLoaded$;
    this.appointmentLoading$ = this.appointmentSelectors.appointmentLoading$;
    this.sortByCondition = 'DATE';
    this.sortByAsc = true;
    this.branches$ = this.branchSelectors.qpBranches$;
    this.appointmentVisit$ = this.appointmentSelectors.appointmentVisit$;
    this.services$ = serviceSelectors.allServices$;
    // this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    this.elementsPerPage = 5;
    this.currentPage = 1;
    const currentCustomerSubscription = this.currentCustomer$.subscribe(
      (customer: ICustomer) => {
        this.currentCustomer = customer;
        if (customer) {
          this.appointmentDispatchers.fetchActionAppointments(
            this.currentCustomer.publicId
          );
        }
      }
    );

    const appointmentsSubcription = this.appointments$.subscribe(
      (appointments: IAppointment[]) => {
        if (appointments.length > 0) {
          this.appointments = appointments;
          this.fulAppointmentList = appointments;
          this.sortedfullappointmentList = appointments;
          this.updateVisibleList();
          this.showTable = true;
        }
      }
    );
    const anAppointmentSubcription = this.appointment$.subscribe(
      appointment => {
          this.selectedAppointment = appointment;
      }
    );

    const appointmentVisitSubcription = this.appointmentVisit$.subscribe(
      appointmentVisit => {
          this.appointmentVisit = appointmentVisit;
          this.modelVisitData();
      }
    );
    this.branchDispatchers.fetchQPBranches();
    const branchSubscription = this.branches$.subscribe(
      (branches: IBranch[]) => {
        this.branchlist = branches;
      }
    );

    this.serviceDispatchers.fetchAllServices();
    const serviceSubscription = this.services$.subscribe(
      (services: IService[]) => {
        this.servicelist = services;
        console.log(this.servicelist);
      }
    );

    const appointmentsLoadedSubcription = this.appointmentsLoaded$.subscribe(
      (appointmentsLoaded: boolean) =>
        (this.appointmentsLoaded = appointmentsLoaded)
    );
    const appointmentLoadedSubcription = this.appointmentLoaded$.subscribe(
      (appointmentsLoaded: boolean) =>
        (this.selectedAppointmentLoaded = appointmentsLoaded)
    );

    this.subscriptions.add(currentCustomerSubscription);
    this.subscriptions.add(appointmentsSubcription);
    this.subscriptions.add(anAppointmentSubcription);
    this.subscriptions.add(appointmentsLoadedSubcription);
    this.subscriptions.add(appointmentLoadedSubcription);
    this.subscriptions.add(branchSubscription);
    this.subscriptions.add(serviceSubscription);
    this.subscriptions.add(appointmentVisitSubcription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onChangeElementsPerpage($event) {
    this.elementsPerPage = parseInt($event);
    this.appointments = this.fulAppointmentList.slice((this.currentPage - 1) * this.elementsPerPage, (this.currentPage * this.elementsPerPage));
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

  onSearchTxtChanged() {
    if (this.searchText.trim() !== '') {
      this.sortedfullappointmentList = this.filterList(this.fulAppointmentList, this.searchText.trim().toLowerCase());
    } else {
      this.sortedfullappointmentList = this.fulAppointmentList;
    }
    console.log(this.sortedfullappointmentList);
    this.updateVisibleList();
  }

  updateVisibleList() {
    this.appointments = this.sortedfullappointmentList.slice(0, this.elementsPerPage);
  }

  extractValue(value: string) {
    // console.log(value);

    value = value.replace(/"{"/g, '{"').replace(/"}"/g, '"}').replace(/" }"/g, '"}');
    // console.log(value);
    const obj = JSON.parse(value);
    return obj;
  }

  sortVisitList() {
    if (this.fulAppointmentList) {

      if (this.sortByCondition === 'DATE') {
        this.sortedfullappointmentList = this.fulAppointmentList.slice().sort((a, b) => {

          const nameA = new Date(a.startTime);
          const nameB = new Date(b.startTime);

          if (( nameA < nameB && this.sortByAsc) || (nameA > nameB && !this.sortByAsc)) {
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
          if(this.sortByCondition === 'START' ) {
            var nameA = moment(a.startTime).format('HH:mm');
            var nameB = moment(b.startTime).format('HH:mm');
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
      } else {
        // sort by name
        this.sortedfullappointmentList = this.fulAppointmentList.slice().sort((a, b) => {

          var nameA = a.operation.toUpperCase(); // ignore upper and lowercase
          var nameB = b.username.toUpperCase(); // ignore upper and lowercase

          switch (this.sortByCondition) {
            case 'OPERATION':
              nameA = a.operation.toUpperCase(); // ignore upper and lowercase
              nameB = b.operation.toUpperCase(); // ignore upper and lowercase
              break;
            case 'APP_ID':
              nameA = a.entityId.toUpperCase(); // ignore upper and lowercase
              nameB = b.entityId.toUpperCase(); // ignore upper and lowercase
              break;
            case "RESOURCE":
              nameA = this.extractValue(a.change).after.resource.toUpperCase(); // ignore upper and lowercase
              nameB = this.extractValue(b.change).after.resource.toUpperCase(); // ignore upper and lowercase
              break;
            case "NOTES":
              nameA = this.extractValue(a.change).after.notes.toUpperCase(); // ignore upper and lowercase
              nameB = this.extractValue(b.change).after.notes.toUpperCase(); // ignore upper and lowercase
              break;
            case "SERVICES":
              nameA = this.extractValue(a.change).after.services.toUpperCase(); // ignore upper and lowercase
              nameB = this.extractValue(b.change).after.services.toUpperCase(); // ignore upper and lowercase
              break;
            case "TITLE":
              nameA = this.extractValue(a.change).after.title.toUpperCase(); // ignore upper and lowercase
              nameB = this.extractValue(b.change).after.title.toUpperCase(); // ignore upper and lowercase
              break;
            case "PHONE":
              nameA = a.customers[0].properties.phoneNumber.toUpperCase(); // ignore upper and lowercase
              nameB = b.customers[0].properties.phoneNumber.toUpperCase(); // ignore upper and lowercase
              break;
            case "USER":
              nameA = a.username.toUpperCase(); // ignore upper and lowercase
              nameB = b.username.toUpperCase(); // ignore upper and lowercase
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

  filterList(list: IAppointment[], value: string) {
    const newList =  list.filter(function(app) {
      return app.operation.toLocaleLowerCase().includes(value) ||
      app.entityId.toString().toLocaleLowerCase().includes(value) ||
      // this.extractValue(app.change).after.resource.toLocaleLowerCase().includes(value) ||
      // this.extractValue(app.change).after.services.toLocaleLowerCase().includes(value) ||
      // this.extractValue(app.change).after.title.toLocaleLowerCase().includes(value) ||
      // this.extractValue(app.change).after.notes.toLocaleLowerCase().includes(value) ||
      app.username.toLocaleLowerCase().includes(value);
    });

    return newList;
  }

  appointmentSelected(appId) {
    this.appointmentDispatchers.fetchAnAppointment(appId);
    this.appointmentDispatchers.fetchAppointmentVisit(appId);
  }

  unSelectedAppointment() {
    this.visitDataArray = [];
    this.selectedAppointment = null;
  }

  mapBranch(branchId) {
    return this.branchlist.filter(branch => branch.id === branchId)[0].name;
  }

  mapService(serviceIdList) {
    let services = '';
    serviceIdList.map(serviceId => {
      services = services + this.servicelist.filter(service => serviceId === service.id)[0].name;
    });
    return services;
  }

  modelVisitData() {
    this.appointmentVisit.forEach((visit) => {
      const dsArr = visit.delService.split('|');
      const dsOutcomeArr = visit.delServiceOutcome.split('|');
      const marksArr = visit.mark.replace('|', ',');
      // arrived data
      if (visit.entered > 0) {
        const visitRow: any = [];
        visitRow.queue = visit.queue;
        visitRow.service = visit.service;
        visitRow.time = this.secondsToTime(visit.entered);
        visitRow.visitOutcome = visit.visitOutcome;
        visitRow.entryPoint = visit.entryPoint;
        visitRow.workstation = visit.workstation;
        visitRow.user = visit.user;
        visitRow.notes = visit.notes;
        visitRow.delService = '';
        visitRow.delServiceOutcome = '';
        visitRow.outcome = '';
        visitRow.mark = '';
        visitRow.recycled = 0;
        this.visitDataArray.push(visitRow);
      }
       // called data
       if (visit.called > 0) {
        const visitRow: any = [];
        visitRow.queue = visit.queue;
        visitRow.service = visit.service;
        visitRow.time = this.secondsToTime(visit.called);
        visitRow.visitOutcome = 'called'.toUpperCase();
        visitRow.entryPoint = visit.entryPoint;
        visitRow.workstation = visit.workstation;
        visitRow.user = visit.user;
        visitRow.notes = '';
        visitRow.delService = '';
        visitRow.delServiceOutcome = '';
        visitRow.outcome = '';
        visitRow.mark = '';
        visitRow.recycled = visit.nrRecycled;
        this.visitDataArray.push(visitRow);
      }
       // finished data
       if (visit.finished >= 0) {
        const visitRow: any = [];
        visitRow.queue = visit.queue;
        visitRow.service = visit.service;
        visitRow.time = visit.visitOutcome !== 'REMOVE_BY_RESET' ? this.secondsToTime(visit.finished) : '23:59:59';
        visitRow.visitOutcome = visit.visitOutcome === 'NORMAL' ? 'ended'.toUpperCase() : visit.visitOutcome;
        visitRow.entryPoint = visit.entryPoint;
        visitRow.workstation = visit.workstation;
        visitRow.user = visit.user;
        visitRow.notes = visit.notes;
        visitRow.delService = dsArr;
        visitRow.delServiceOutcome = dsOutcomeArr;
        visitRow.outcome = visit.outcome;
        visitRow.mark = marksArr;
        visitRow.recycled = 0;
        this.visitDataArray.push(visitRow);
      }
    });
  }

  secondsToTime(secs) {
    const date = new Date(0);
    date.setSeconds(secs); // specify value for SECONDS here
    const timeString = date.toISOString().substr(11, 8);
    return timeString;
  }

//   this.secondsToTime = function (secs) {
//     var date = new Date(0);
//     date.setSeconds(secs); // specify value for SECONDS here
//     var timeString = date.toISOString().substr(11, 8);
//     return timeString;
// }
}
