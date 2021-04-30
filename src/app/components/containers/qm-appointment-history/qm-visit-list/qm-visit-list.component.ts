import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';
import { AppointmentHistorySelectors, AppointmentHistoryDispatchers, UserSelectors, BranchSelectors, ServiceSelectors } from '../../../../../store/index';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IAppointmentVisit } from "../../../../../models/IAppointmentVisit";
import { IBranch } from '../../../../../models/IBranch';
import { IService } from '../../../../../models/IService';

@Component({
  selector: 'qm-visit-list',
  templateUrl: './qm-visit-list.component.html',
  styleUrls: ['./qm-visit-list.component.scss'],
})
export class QmVisitListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private userDirection$: Observable<string>;
  public visitList: any[] = [];
  public userDirection: string;
  public branchlist = [];
  public servicelist = [];

  displayedColumns: string[] = ['actionTime', 'status', 'queue', 'service', 'outcome', 'mark', 'recycled', 'notes', 'servicePoint', 'user'];
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
        this.dashboardRowCSSHeight = (elemHight - this.dashboardRemains - 25) + 'px';
    
      }
  }

  ngOnInit() {

    const userDirectionSubscription = this.userDirection$.subscribe(
      (userDirection: string) => {
        this.userDirection = userDirection;
      }
    );

    const appointmentVisitSubcription = this.appointmentHistorySelectors.appointmentVisit$.subscribe(
      appointmentVisit => {
          this.visitList = this.processVisitData(appointmentVisit);
          this.dataSource = new MatTableDataSource(this.visitList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch(property) {
              case 'actionTime': return (item as IAppointmentVisit).time;
              case 'status': return (item as IAppointmentVisit).visitOutcome.toLowerCase();
              case 'servicePoint': return (item as IAppointmentVisit).workstation.toLowerCase();
              default: return item[property];
            }
          };
          this.dataSource.sort = this.sort;

          if (appointmentVisit.length > 0){
            this.dataSource.filterPredicate = (data: IAppointmentVisit, filter: string) => {
              return data.visitOutcome && data.visitOutcome.toLowerCase().includes(filter) || 
                     data.workstation && data.workstation.toLowerCase().includes(filter) ||
                     data.queue && data.queue.toLowerCase().includes(filter) ||
                     data.outcome && data.outcome.toLowerCase().includes(filter) ||
                     data.notes && data.notes.toLowerCase().toLowerCase().includes(filter) ||
                     data.mark && data.mark.toLowerCase().includes(filter) ||
                     data.user && data.user.toLowerCase().includes(filter);
             };
          }
      }
    );
  
      const serviceSubscription = this.serviceSelectors.allServices$.subscribe(
        (services: IService[]) => {
          this.servicelist = services;
        }
      );
      this.subscriptions.add(serviceSubscription);

      this.subscriptions.add(appointmentVisitSubcription);
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

  mapService(serviceIdList) {
    let services = '';
    if (serviceIdList) {
      serviceIdList.map(serviceId => {
        services = services + this.servicelist.filter(service => serviceId === service.id)[0].name;
      });
    }
    return services;
  }

  processVisitData(appointmentVisit) {
    var visitDataArray: any[] = [];
    appointmentVisit.forEach((visit) => {
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
        visitDataArray.push(visitRow);
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
        visitDataArray.push(visitRow);
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
        visitDataArray.push(visitRow);
      }
    });

    return visitDataArray;
  }

  secondsToTime(secs) {
    const date = new Date(0);
    date.setSeconds(secs); // specify value for SECONDS here

    // const timeString = date.toISOString().substr(11, 8);
    // console.log(' ---- ' + timeString + ' ------ ' + timeStringNew)
    return date;
  }
}
