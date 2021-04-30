import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subscription } from "rxjs";
import { IAppointment } from "../../../../models/IAppointment";
import { ICustomer } from "../../../../models/ICustomer";
import { AppointmentHistoryDispatchers, CustomerSelectors, UserSelectors, AppointmentHistorySelectors, BranchSelectors, BranchDispatchers, ServiceSelectors, ServiceDispatchers, SystemInfoSelectors, CustomerDispatchers, SettingsAdminSelectors } from "../../../../store";
import * as moment from 'moment';
import { IAppointmentVisit } from "../../../../models/IAppointmentVisit";
import { IBranch } from "../../../../models/IBranch";
import { IService } from "../../../../models/IService";
import { ToastService } from './../../../../services/util/toast.service';
import { ToastContainerDirective } from "ngx-toastr";
import { LocationStrategy } from "@angular/common";
import { Router } from "@angular/router";
import { QmHistoryListComponent } from "./qm-history-list/qm-history-list.component";
import { QmVisitListComponent } from "./qm-visit-list/qm-visit-list.component";

@Component({
  selector: "qm-qm-appointment-history",
  templateUrl: "./qm-appointment-history.component.html",
  styleUrls: ["./qm-appointment-history.component.scss"],
})
export class QmAppointmentHistoryComponent implements OnInit, OnDestroy {
  @ViewChild(ToastContainerDirective, {static: false}) toastContainer: ToastContainerDirective;
  @ViewChild (QmHistoryListComponent) historyList:QmHistoryListComponent;
  @ViewChild (QmVisitListComponent) visitList:QmVisitListComponent;

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
  actionAppointments: IAppointment[];
  actionVisits: any[];
  appointment: IAppointment;
  selectedAppointment: IAppointment = null;
  visitDataArray: any[] = [];
  appointmentVisit: IAppointmentVisit[];
  selectedAppointmentLoaded = false;
  appointmentsLoaded: boolean;
  showTable = false;
  branches$: Observable<IBranch[]>;
  services$: Observable<IService[]>;
  searchText: string;
  public searchText_: '';
  public sortedfullappointmentList: IAppointmentVisit[];
  public sortedfullVisitList: any[];
  public fulAppointmentList: IAppointment[];
  public elementsPerPage: number;
  public currentPage: number;
  public sortByCondition: string;
  public sortByAsc: boolean;
  public elementsPerPage_: number;
  public currentPage_: number;
  public sortByCondition_: string;
  public sortByAsc_: boolean;
  public branchlist = [];
  public servicelist = [];
  public isMilitaryTime: boolean;
  private timeConvention$: Observable<string>;

  constructor(
    private userSelectors: UserSelectors,
    private customerSelectors: CustomerSelectors,
    private appointmentHistoryDispatchers: AppointmentHistoryDispatchers,
    private customerDispatchers: CustomerDispatchers,
    private appointmentHistorySelectors: AppointmentHistorySelectors,
    private translateService: TranslateService,
    private branchSelectors: BranchSelectors,
    private branchDispatchers: BranchDispatchers,
    private serviceSelectors: ServiceSelectors,
    private serviceDispatchers: ServiceDispatchers,
    private toastService: ToastService,
    private systemInfoSelectors: SystemInfoSelectors,
    private locationStrategy: LocationStrategy,
    private router: Router
  ) {
    this.timeConvention$ = this.systemInfoSelectors.systemInfoTimeConvention$;
    this.userDirection$ = this.userSelectors.userDirection$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
    //this.appointments$ = this.appointmentHistorySelectors.historyAppointments$;
    // this.appointmentsLoaded$ = this.appointmentHistorySelectors.appointmentsLoaded$;
    // this.appointmentsLoading$ = this.appointmentHistorySelectors.appointmentsLoading$;
    // this.appointment$ = this.appointmentHistorySelectors.appointment$;
    // this.appointmentLoaded$ = this.appointmentHistorySelectors.appointmentLoaded$;
    // this.appointmentLoading$ = this.appointmentHistorySelectors.appointmentLoading$;
    this.sortByCondition = 'DATE';
    this.sortByAsc = true;
    this.branches$ = this.branchSelectors.qpBranches$;
    this.appointmentVisit$ = this.appointmentHistorySelectors.appointmentVisit$;
    this.services$ = serviceSelectors.allServices$;
    // this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;

    // disable browser back button
    history.pushState(null, null, window.location.href);
    this.locationStrategy.onPopState(() => {
    history.pushState(null, null, window.location.href);
});
  }

  ngOnInit() {
    this.toastService.setToastContainer(this.toastContainer);
    this.elementsPerPage = 5;
    this.currentPage = 1;
    this.elementsPerPage_ = 2;
    this.currentPage_ = 1;

    this.branchDispatchers.fetchQPBranches();
    this.serviceDispatchers.fetchAllServices();

    this.customerDispatchers.resetCurrentCustomer();

    this.isMilitaryTime = true;
    const systemInformationSubscription = this.timeConvention$.subscribe(
      timeConvention => {
        if (timeConvention) {
          this.isMilitaryTime = timeConvention !== 'AMPM';
        }
      }
    );
    this.subscriptions.add(systemInformationSubscription);

    const branchSubscription = this.branches$.subscribe(
      (branches: IBranch[]) => {
        this.branchlist = branches;
      }
    );
    this.subscriptions.add(branchSubscription);

    const serviceSubscription = this.services$.subscribe(
      (services: IService[]) => {
        this.servicelist = services;
      }
    );
    this.subscriptions.add(serviceSubscription);

    const currentCustomerSubscription = this.currentCustomer$.subscribe(
      (customer: ICustomer) => {
        this.currentCustomer = customer;
        if (customer) {
          this.appointmentHistoryDispatchers.fetchActionsAppointments(
            this.currentCustomer.publicId
          );
        }
      }
    );

    const appointmentsSubcription = this.appointmentHistorySelectors.historyAppointments$.subscribe(
      (appointments: IAppointment[]) => {
        this.actionAppointments = appointments;
        if (appointments.length > 0) {
          
          // this.fulAppointmentList = this.actionAppointments;
          // this.sortedfullappointmentList = this.actionAppointments;
          // this.updateVisibleList();
          // this.showTable = true;
        }
      }
    );
    // const anAppointmentSubcription = this.appointmentHistorySelectors.appointment$.subscribe(
    //   appointment => {
    //       this.selectedAppointment = appointment;
    //       if (this.selectedAppointment && appointment.qpId) {
    //         this.appointmentHistoryDispatchers.fetchAppointmentVisit(appointment.qpId);
    //       }
    //   }
    // );

    const appointmentVisitSubcription = this.appointmentHistorySelectors.appointmentVisit$.subscribe(
      appointmentVisit => {
          this.appointmentVisit = appointmentVisit;
          // console.log(appointmentVisit);
          // this.modelVisitData();
      }
    );

    const appointmentsLoadedSubcription = this.appointmentHistorySelectors.appointmentsLoaded$.subscribe(
      (appointmentsLoaded: boolean) =>
        (this.appointmentsLoaded = appointmentsLoaded)
    );
    const appointmentLoadedSubcription = this.appointmentHistorySelectors.appointmentLoaded$.subscribe(
      (appointmentsLoaded: boolean) =>
        (this.selectedAppointmentLoaded = appointmentsLoaded)
    );

    this.subscriptions.add(currentCustomerSubscription);
    this.subscriptions.add(appointmentsSubcription);
    this.subscriptions.add(appointmentsLoadedSubcription);
    this.subscriptions.add(appointmentLoadedSubcription);
    this.subscriptions.add(appointmentVisitSubcription);

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  nevigateToAB() {
    this.router.navigateByUrl('/app');
    this.customerDispatchers.resetCurrentCustomer();
  }

  extractValue(app: IAppointment, allowNull?: boolean) {
    return JSON.parse((app.change).toString().replace(/"{"/g, '{"').replace(/"}"/g, '"}').replace(/" }"/g, '"}'));
  }


  updateAppointments(appointments: IAppointment[]) {
    const updatedAppointments = [];
    appointments.map(app => {
      const newApp: IAppointment = {};
      const actionDataAfter = JSON.parse((app.change).toString().replace(/"{"/g, '{"').replace(/"}"/g, '"}').replace(/" }"/g, '"}')).after;
      const actionDataBefore = JSON.parse((app.change).toString().replace(/"{"/g, '{"').replace(/"}"/g, '"}').replace(/" }"/g, '"}'))
      .before;
      const updatedApp = appointments.filter(appointment => appointment.entityId === app.entityId)
      .filter(appointmentCreate => appointmentCreate.operation === 'CREATE');
      const updatedAppActionData = JSON.parse((updatedApp[0].change).toString()
      .replace(/"{"/g, '{"').replace(/"}"/g, '"}').replace(/" }"/g, '"}')).after;

      newApp.branchId = app.branchId;
      newApp.timeStamp = app.timeStamp;
      newApp.entityId = app.entityId;
      newApp.operation = app.operation;
      newApp.username = app.username;
      newApp.actionBranch = this.mapBranch(app.branchId);
      newApp.actionData = {};
      newApp.actionData.start = (app.operation === 'DELETE') ? actionDataBefore.start : actionDataAfter.start;
      newApp.actionData.end = (app.operation === 'DELETE') ? actionDataBefore.end : actionDataAfter.end;
      newApp.actionData.notes = app.operation === 'DELETE' ? actionDataBefore.notes : actionDataAfter.notes;
      newApp.actionData.resource = (app.operation === 'DELETE')  ? actionDataBefore.resource : actionDataAfter.resource;
      newApp.actionData.title = app.operation === 'DELETE' ? actionDataBefore.title : actionDataAfter.title;
      newApp.actionData.services = (app.operation === 'DELETE') ?
        [this.mapService(actionDataBefore.services)] : [this.mapService(actionDataAfter.services)];
      updatedAppointments.push(newApp);
    });
    return updatedAppointments;
  }

  onChangeElementsPerpage($event) {
    this.elementsPerPage = parseInt($event);
  }

  onChangeElementsPerpage_($event) {
    this.elementsPerPage_ = parseInt($event);
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

  sortByChange_(value: string) {
    if (this.sortByCondition_ === value) {
      this.sortByAsc_ = !this.sortByAsc_;
      this.sortVisitList_();
    } else {
      this.sortByAsc_ = true;
      this.sortByCondition_ = value;
      this.sortVisitList_();
    }
  }

  onSearchTxtChanged() {
    if (this.searchText.trim() !== '') {
      this.sortedfullappointmentList = this.filterList(this.fulAppointmentList, this.searchText.trim().toLowerCase());
    } else {
      this.sortedfullappointmentList = this.fulAppointmentList;
    }
    this.currentPage = 1;
    this.updateVisibleList();
  }

  onSearchTxtChanged_() {
    if (this.searchText_.trim() !== '') {
      this.sortedfullVisitList = this.filterList_(this.actionVisits, this.searchText_.trim().toLowerCase());
    } else {
      this.sortedfullVisitList = this.actionVisits;
    }
    this.currentPage_ = 1;
    this.updateVisibleList_();
  }

  filterList(list: IAppointment[], value: string) {

    let timeFormat = 'hh:mm A';

    if (this.isMilitaryTime) {
      timeFormat = 'HH:mm';
    }
    const newList =  list.filter(function(app) {

      const resource = (app.actionData.resource) ? app.actionData.resource.toLocaleLowerCase().includes(value) : false;
      const title = (app.actionData.title) ? app.actionData.title.toString().toLocaleLowerCase().includes(value) : false;
      const notes = (app.actionData.notes) ? app.actionData.notes.toLocaleLowerCase().includes(value) : false;
      const branch = (app.actionBranch) ? app.actionBranch.toLocaleLowerCase().includes(value) : false;
      let services = false;
      if (app.actionData.services) {
        services = app.actionData.services.some(function (service) {
          return service.toLocaleLowerCase().includes(value);
        });
      }
      const a = app.operation.toLocaleLowerCase().includes(value) ||
      app.entityId.toString().toLocaleLowerCase().includes(value) ||
      app.username.toString().toLocaleLowerCase().includes(value) ||
      moment(app.timeStamp).format('DD-MM-YYYY').includes(value) ||
      moment(app.timeStamp).format(timeFormat).includes(value) ||
      moment(app.actionData.start).format('DD-MM-YYYY').includes(value) ||
      moment(app.actionData.start).format(timeFormat).includes(value) ||
      moment(app.actionData.end).format('DD-MM-YYYY').includes(value) ||
      moment(app.actionData.end).format(timeFormat).includes(value) ||
      title || notes || resource || services || branch;
      return a;
    });
    return newList;
  }

  filterList_(list: any[], value: string) {

    let timeFormat = 'hh:mm A';

    if (this.isMilitaryTime) {
      timeFormat = 'HH:mm';
    }
    const newList =  list.filter(function(app) {

      const a = app.queue.toString().toLocaleLowerCase().includes(value) ||
      app.service.toString().toLocaleLowerCase().includes(value) ||
      app.visitOutcome.toString().toLocaleLowerCase().includes(value) ||
      app.time.toString().toLocaleLowerCase().includes(value) ||
      app.entryPoint.toString().toLocaleLowerCase().includes(value) ||
      app.workstation.toString().toLocaleLowerCase().includes(value) ||
      app.user.toString().toLocaleLowerCase().includes(value) ||
      app.notes.toString().toLocaleLowerCase().includes(value) ||
      app.delService.toString().toLocaleLowerCase().includes(value) ||
      app.outcome.toString().toLocaleLowerCase().includes(value) ||
      app.mark.toString().toLocaleLowerCase().includes(value) ||
      app.recycled.toString().toLocaleLowerCase().includes(value);
      return a;
    });
    return newList;
  }

  updateVisibleList() {
    this.actionAppointments = this.sortedfullappointmentList;
    this.updateDetailList();
  }

  updateVisibleList_() {
    this.actionVisits = this.sortedfullVisitList;
    this.updateDetailList_();
  }

  updateDetailList() {
    let label = '';
    this.translateService
      .get('label.list.founded', {
        currentPageFrom: (this.currentPage - 1) * this.elementsPerPage + 1,
        currentPageTo: (this.currentPage * this.elementsPerPage > this.sortedfullappointmentList.length  ?
          this.sortedfullappointmentList.length : this.currentPage * this.elementsPerPage),
        all: this.sortedfullappointmentList.length
      })
      .subscribe(
        (listFoundLabel: string) => (label = listFoundLabel)
      )
      .unsubscribe();
      return label;
  }

  updateDetailList_() {
    let label = '';
    this.translateService
      .get('label.list.founded', {
        currentPageFrom: (this.currentPage_ - 1) * this.elementsPerPage_ + 1,
        currentPageTo: (this.currentPage_ * this.elementsPerPage_ > this.sortedfullVisitList.length  ?
          this.sortedfullVisitList.length : this.currentPage_ * this.elementsPerPage_),
        all: this.sortedfullVisitList.length
      })
      .subscribe(
        (listFoundLabel: string) => (label = listFoundLabel)
      )
      .unsubscribe();
      return label;
  }

  sortVisitList() {
    if (this.fulAppointmentList) {

      if (this.sortByCondition === 'DATE') {
        this.sortedfullappointmentList = this.fulAppointmentList.slice().sort((a, b) => {

          const nameA = new Date(a.timeStamp);
          const nameB = new Date(b.timeStamp);

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
            var nameA = moment(a.actionData.start).format('HH:mm');
            var nameB = moment(b.actionData.start).format('HH:mm');
          } else {
            var nameA = moment(a.actionData.end).format('HH:mm');
            var nameB = moment(b.actionData.end).format('HH:mm');
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

          let nameA = a.operation.toUpperCase(); // ignore upper and lowercase
          let nameB = b.operation.toUpperCase(); // ignore upper and lowercase

          switch (this.sortByCondition) {
            case 'OPERATION':
              nameA = a.operation.toUpperCase(); // ignore upper and lowercase
              nameB = b.operation.toUpperCase(); // ignore upper and lowercase
              break;
            case 'APP_ID':
              nameA = a.entityId.toString().toUpperCase(); // ignore upper and lowercase
              nameB = b.entityId.toString().toUpperCase(); // ignore upper and lowercase
              break;
            case 'RESOURCE':
              nameA = a.actionData.resource.toUpperCase(); // ignore upper and lowercase
              nameB = b.actionData.resource.toUpperCase(); // ignore upper and lowercase
              break;
            case 'NOTES':
              nameA = a.actionData.notes.toString().toUpperCase(); // ignore upper and lowercase
              nameB = b.actionData.notes.toString().toUpperCase(); // ignore upper and lowercase
              break;
            case 'SERVICES':
              nameA = a.actionData.services[0].toUpperCase(); // ignore upper and lowercase
              nameB = b.actionData.services[0].toUpperCase(); // ignore upper and lowercase
              break;
            case 'TITLE':
              nameA = a.actionData.title.toString().toUpperCase(); // ignore upper and lowercase
              nameB = b.actionData.title.toString().toUpperCase(); // ignore upper and lowercase
              break;
            case 'BRANCH':
              nameA = (a.actionBranch) ? a.actionBranch.toString().toUpperCase() : ''; // ignore upper and lowercase
              nameB = (b.actionBranch) ? b.actionBranch.toString().toUpperCase() : ''; // ignore upper and lowercase
              break;
            case 'USER':
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

  appointmentSelected(appointment) {
    this.visitDataArray = [];
    this.selectedAppointment = null;
    this.appointmentHistoryDispatchers.fetchSelectedAppointment(appointment.entityId);
    console.log(this.selectedAppointment);
  }

  sortVisitList_() {
    if (this.actionVisits) {

      // sort by name
      this.sortedfullVisitList = this.actionVisits.slice().sort((a, b) => {

        let nameA = a.status.toUpperCase(); // ignore upper and lowercase
        let nameB = b.status.toUpperCase(); // ignore upper and lowercase

        switch (this.sortByCondition_) {
          case 'TIME':
            nameA = a.time.toString().toUpperCase(); // ignore upper and lowercase
            nameB = b.time.toString().toUpperCase(); // ignore upper and lowercase
            break;
          case 'STATUS':
            nameA = a.visitOutcome.toString().toUpperCase(); // ignore upper and lowercase
            nameB = b.visitOutcome.toString().toUpperCase(); // ignore upper and lowercase
            break;
          case 'QUEUE':
            nameA = a.queue.toString().toUpperCase(); // ignore upper and lowercase
            nameB = b.queue.toString().toUpperCase(); // ignore upper and lowercase
            break;
          case 'SERVICE':
            nameA = a.service.toString().toUpperCase(); // ignore upper and lowercase
            nameB = b.service.toString().toUpperCase(); // ignore upper and lowercase
            break;
          case 'OUTCOME':
            nameA = a.outcome.toString().toUpperCase(); // ignore upper and lowercase
            nameB = b.outcome.toString().toUpperCase(); // ignore upper and lowercase
            break;
          case 'MARK':
            nameA = a.mark.toString().toUpperCase(); // ignore upper and lowercase
            nameB = b.mark.toString().toUpperCase(); // ignore upper and lowercase
            break;
          case 'RECYCLED':
            nameA = a.recycled.toString().toUpperCase(); // ignore upper and lowercase
            nameB = b.recycled.toString().toUpperCase(); // ignore upper and lowercase
            break;
          case 'NOTES':
            nameA = a.notes.toString().toUpperCase(); // ignore upper and lowercase
            nameB = b.notes.toString().toUpperCase(); // ignore upper and lowercase
            break;
          case 'ENTRY_POINT':
            nameA = a.entryPoint.toString().toUpperCase(); // ignore upper and lowercase
            nameB = b.entryPoint.toString().toUpperCase(); // ignore upper and lowercase
            break;
          case 'USER':
            nameA = a.user.toString().toUpperCase(); // ignore upper and lowercase
            nameB = b.user.toString().toUpperCase(); // ignore upper and lowercase
            break;
        }

        if ((nameA < nameB && this.sortByAsc_) || (nameA > nameB && !this.sortByAsc_)) {
          return -1;
        }
        if ((nameA > nameB && this.sortByAsc_) || (nameA < nameB && !this.sortByAsc_)) {
          return 1;
        }
        // names must be equal
        return 0;
      });
      this.updateVisibleList_();
    }
  }

  // appointmentSelected(appId) {
  //   this.visitDataArray = [];
  //   this.selectedAppointment = null;
  //   this.appointmentDispatchers.fetchAnAppointment(appId);
  //   this.appointmentDispatchers.fetchAppointmentVisit(appId);

  // }

  unSelectedAppointment() {
    this.visitDataArray = [];
    this.selectedAppointment = null;
  }

  mapBranch(branchId) {
    return this.branchlist.filter(branch => branch.id === branchId)[0].name;
  }

  mapService(serviceIdList) {
    let services = '';
    if (serviceIdList) {
      serviceIdList.map(serviceId => {
        services = services + this.servicelist.filter(service => serviceId === service.id)[0].name;
      });
    }
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
        console.log(visitRow);
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
    this.sortedfullVisitList = this.visitDataArray;
    this.actionVisits = this.visitDataArray;
  }

  secondsToTime(secs) {
    const date = new Date(0);
    date.setSeconds(secs); // specify value for SECONDS here
    const timeString = date.toISOString().substr(11, 8);
    return timeString;
  }

  handleHeaderNavigations(navigationType) {
    window.location.href = '/';
  }

  clickBackToAppointmentsPage($event) {
    this.customerDispatchers.resetCurrentCustomer();
    this.appointmentHistoryDispatchers.resetActionAppointment();
    this.router.navigateByUrl('/app');
  }

  backToAppointmentList() {
    this.appointmentHistoryDispatchers.resetAppointmentVisit();
  }

  onTextChange(value) {
    if (this.appointmentVisit.length > 0) {
      this.visitList.onSearchChange(value);
    } else {
      this.historyList.onSearchChange(value);
    }
  }

}
