import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subscription } from "rxjs";
import { IAppointment } from "../../../../models/IAppointment";
import { ICustomer } from "../../../../models/ICustomer";
import { AppointmentDispatchers, CustomerSelectors, UserSelectors, AppointmentSelectors, BranchSelectors, BranchDispatchers, ServiceSelectors, ServiceDispatchers, SystemInfoSelectors } from "../../../../store";
import * as moment from 'moment';
import { IAppointmentVisit } from "../../../../models/IAppointmentVisit";
import { IBranch } from "../../../../models/IBranch";
import { IService } from "../../../../models/IService";
import { ToastService } from './../../../../services/util/toast.service';
import { ToastContainerDirective } from "ngx-toastr";
import { LocationStrategy } from "@angular/common";

@Component({
  selector: "qm-qm-appointment-history",
  templateUrl: "./qm-appointment-history.component.html",
  styleUrls: ["./qm-appointment-history.component.scss"],
})
export class QmAppointmentHistoryComponent implements OnInit, OnDestroy {
  @ViewChild(ToastContainerDirective, {static: false}) toastContainer: ToastContainerDirective;
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
  public isMilitaryTime: boolean;
  private timeConvention$: Observable<string>;

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
    private toastService: ToastService,
    private systemInfoSelectors: SystemInfoSelectors,
    private locationStrategy: LocationStrategy
  ) {
    this.timeConvention$ = this.systemInfoSelectors.systemInfoTimeConvention$;
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

    this.isMilitaryTime = true;
    const systemInformationSubscription = this.timeConvention$.subscribe(
      timeConvention => {
        if (timeConvention) {
          this.isMilitaryTime = timeConvention !== 'AMPM';
        }
      }
    );
    this.subscriptions.add(systemInformationSubscription);

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
          console.log(appointments);
          
          this.actionAppointments = this.updateAppointments(appointments);
          console.log(this.actionAppointments);

          this.fulAppointmentList = this.actionAppointments;
          this.sortedfullappointmentList = this.actionAppointments;
          this.updateVisibleList();
          this.showTable = true;
        }
      }
    );
    const anAppointmentSubcription = this.appointment$.subscribe(
      appointment => {
          this.selectedAppointment = appointment;
          console.log(this.selectedAppointment);
      }
    );

    const appointmentVisitSubcription = this.appointmentVisit$.subscribe(
      appointmentVisit => {
          this.appointmentVisit = appointmentVisit;
          console.log(appointmentVisit);
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
      // str.replace(/\:"{/g, ":{").replace(/\}"/g, "}");

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
      // newApp.actionBranch = (app.operation === 'DELETE') ? '' : this.mapBranch(app.branchId);
      // newApp.actionData = {};
      // newApp.actionData.start = (app.operation === 'UPDATE') || (app.operation === 'DELETE') ?
      //   updatedAppActionData.start : actionData.start;
      // newApp.actionData.end = (app.operation === 'UPDATE') || (app.operation === 'DELETE') ?
      //   updatedAppActionData.end : actionData.end;
      // newApp.actionData.notes = app.operation === 'DELETE' ? '' : actionData.notes;
      // newApp.actionData.resource = !actionData.resource  ? '' : actionData.resource;
      // newApp.actionData.title = app.operation === 'DELETE' ? '' : actionData.title;
      // newApp.actionData.services = (app.operation === 'UPDATE') || (app.operation === 'DELETE') ?
      //   [this.mapService(updatedAppActionData.services)] : [this.mapService(actionData.services)];
      updatedAppointments.push(newApp);
    });
    return updatedAppointments;
  }

  onChangeElementsPerpage($event) {
    this.elementsPerPage = parseInt($event);
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
    this.currentPage = 1;
    this.updateVisibleList();
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

  updateVisibleList() {
    this.actionAppointments = this.sortedfullappointmentList;
    this.updateDetailList();
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

  appointmentSelected(appId) {
    this.visitDataArray = [];
    this.selectedAppointment = null;
    this.appointmentDispatchers.fetchAnAppointment(appId);
    this.appointmentDispatchers.fetchAppointmentVisit(appId);
    console.log(this.selectedAppointment);
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
  }

  secondsToTime(secs) {
    const date = new Date(0);
    date.setSeconds(secs); // specify value for SECONDS here
    const timeString = date.toISOString().substr(11, 8);
    return timeString;
  }

}
