import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';
import { AppointmentHistorySelectors, AppointmentHistoryDispatchers, UserSelectors, BranchSelectors, ServiceSelectors } from '../../../../../store/index';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IAppointment } from "../../../../../models/IAppointment";
import { IBranch } from '../../../../../models/IBranch';
import { IService } from '../../../../../models/IService';

@Component({
  selector: 'qm-history-list',
  templateUrl: './qm-history-list.component.html',
  styleUrls: ['./qm-history-list.component.scss'],
})
export class QmHistoryListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private userDirection$: Observable<string>;
  public appointmentList: IAppointment[] = [];

  public userDirection: string;
  public branchlist = [];
  public servicelist = [];

  displayedColumns: string[] = ['actionDate', 'operation', 'appId', 'start', 'end', 'branch', 'resource', 'service', 'title', 'notes', 'user'];
  dataSource: MatTableDataSource<Object>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private dashboardHeight = 600;
  public dashboardRowCSSHeight = '600px';
  private dashboardRemains = 88;

  constructor(
    private appointmentHistorySelectors: AppointmentHistorySelectors,
    private appointmentHistoryDispatcher: AppointmentHistoryDispatchers,
    private userSelectors: UserSelectors,
    private branchSelectors: BranchSelectors,
    private serviceSelectors: ServiceSelectors,
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  @ViewChild('myDiv') theDiv:ElementRef;
  ngAfterContentChecked() {
    let elem = document.getElementById('dashboard-body');
    
      let elemHight = elem.clientHeight;
      if (elemHight !== this.dashboardHeight && elemHight > this.dashboardRemains) {
        this.dashboardHeight = elemHight;
        this.dashboardRowCSSHeight = (elemHight - this.dashboardRemains - 15) + 'px';
    
      }
  }

  ngOnInit() {

    const userDirectionSubscription = this.userDirection$.subscribe(
      (userDirection: string) => {
        this.userDirection = userDirection;
      }
    );

    const appointmentSubcription = this.appointmentHistorySelectors.appointment$.subscribe(
        appointment => {
            if (appointment && appointment.qpId) {
              this.appointmentHistoryDispatcher.fetchAppointmentVisit(appointment.qpId);
            }
        }
      );
      this.subscriptions.add(appointmentSubcription);
      
    const branchSubscription = this.branchSelectors.qpBranches$.subscribe(
        (branches: IBranch[]) => {
          this.branchlist = branches;
        }
      );
      this.subscriptions.add(branchSubscription);
  
      const serviceSubscription = this.serviceSelectors.allServices$.subscribe(
        (services: IService[]) => {
          this.servicelist = services;
        }
      );
      this.subscriptions.add(serviceSubscription);

    const appointmentsSubcription = this.appointmentHistorySelectors.historyAppointments$.subscribe(
        (appointments: IAppointment[]) => {
        
          this.appointmentList = appointments;
          this.dataSource = new MatTableDataSource(this.appointmentList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch(property) {
              case 'resource': return (item as IAppointment).actionData.resource.toLowerCase();
              case 'actionDate': return (item as IAppointment).timeStamp;
              case 'branch': return (this.mapBranch((item as IAppointment).branchId)).toLowerCase();
              case 'service': return (this.mapService((item as IAppointment).actionData.services)).toLowerCase();
              case 'start': return (item as IAppointment).actionData.start;
              case 'end': return (item as IAppointment).actionData.end;
              case 'appId': return (item as IAppointment).entityId;
              case 'notes': return (item as IAppointment).actionData.notes.toLowerCase();
              case 'title': return (item as IAppointment).actionData.title.toLowerCase();
              case 'user': return (item as IAppointment).username.toLowerCase();
              default: return item[property];
            }
          };
          this.dataSource.sort = this.sort;

          if (appointments.length > 0){
             this.dataSource.filterPredicate = (data: IAppointment, filter: string) => {
              return data.entityId.toString().includes(filter) ||
                     data.actionData.title && data.actionData.title.includes(filter) ||
                     data.branchId && this.mapBranch(data.branchId).toLowerCase().includes(filter) ||
                     data.actionData.services && this.mapService(data.actionData.services).toLowerCase().includes(filter) ||
                     data.actionData.notes && data.actionData.notes.toLowerCase().includes(filter) ||
                     data.username && data.username.toLowerCase().includes(filter) ||
                     data.actionData.resource && data.actionData.resource.toLowerCase().includes(filter) ||
                     data.operation && data.operation.toLowerCase().includes(filter);
             };
          }
        }
      );

    this.subscriptions.add(appointmentsSubcription);
    
    
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
  }

  onSearchChange(value) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateAppointments(appointments: IAppointment[]) {
    const updatedAppointments = [];
    appointments.map(app => {
      const newApp: IAppointment = {};
      try {
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
      newApp.actionData.notes = this.getNotes(app.operation === 'DELETE' ? actionDataBefore.notes : actionDataAfter.notes);
      newApp.actionData.resource = (app.operation === 'DELETE')  ? actionDataBefore.resource : actionDataAfter.resource;
      newApp.actionData.title = app.operation === 'DELETE' ? actionDataBefore.title : actionDataAfter.title;
      newApp.actionData.services = (app.operation === 'DELETE') ?
        [this.mapService(actionDataBefore.services)] : [this.mapService(actionDataAfter.services)];
      updatedAppointments.push(newApp);
      } catch(error){
        console.log('JSON parse error in ' + app.entityId)
      }
    });
    return updatedAppointments;
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

  getNotes(notes) {
    return decodeURIComponent(notes);
  }

  appointmentSelected(entityId) {
    this.appointmentHistoryDispatcher.fetchSelectedAppointment(entityId);
  }
}
