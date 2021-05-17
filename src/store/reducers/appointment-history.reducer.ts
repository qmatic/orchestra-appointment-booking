import { IAppointmentVisit } from '../../models/IAppointmentVisit';
import { IAppointment } from '../../models/IAppointment';
import * as AppointmentHistoryActions from '../actions';

export interface IAppointmentHistoryState {
  loading: boolean;
  appointments: IAppointment[];
  appointment: IAppointment;
  loaded: boolean;
  error: Object;
  appointmentVisit: IAppointmentVisit[];
}

export const initialState: IAppointmentHistoryState = {
  appointments: [],
  appointment: null,
  loading: false,
  loaded: false,
  error: null,
  appointmentVisit: []
};

export function reducer(
  state: IAppointmentHistoryState = initialState,
  action: AppointmentHistoryActions.AllAppointmentHistoryActions
): IAppointmentHistoryState {
  switch (action.type) {
    case AppointmentHistoryActions.FETCH_ACTION_APPOINTMENTS: {
        return {
          ...state,
          loading: true,
          error: null
        };
      }
      case AppointmentHistoryActions.FETCH_ACTION_APPOINTMENTS_SUCCESS: {
        return {
          ...state,
          appointments: updateAppointments(sortAppointment(action.payload.appointmentActions)),
          loading: false,
          loaded: true,
          error: null
        };
      }
      case AppointmentHistoryActions.FETCH_ACTION_APPOINTMENTS_FAIL: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }
    case AppointmentHistoryActions.FETCH_SELECTED_APPOINTMENT: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case AppointmentHistoryActions.FETCH_SELECTED_APPOINTMENT_SUCCESS: {
      return {
        ...state,
        appointment: (action.payload as any).appointment,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case AppointmentHistoryActions.FETCH_SELECTED_APPOINTMENT_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case AppointmentHistoryActions.FETCH_VISIT_DATA: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case AppointmentHistoryActions.FETCH_VISIT_DATA_SUCCESS: {
      return {
        ...state,
        appointmentVisit: processVisitData(action.payload),
        loading: false,
        loaded: true,
        error: null
      };
    }
    case AppointmentHistoryActions.FETCH_VISIT_DATA_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case AppointmentHistoryActions.RESET_ACTION_APPOINTMENTS: {
      return {
        ...state,
        appointments: [],
        appointment: null,
        appointmentVisit: [],
        loaded: false,
        error: null
      };
    }
    case AppointmentHistoryActions.RESET_APPOINTMENT_VISIT: {
      return {
        ...state,
        appointment: null,
        appointmentVisit: [],
        loaded: false,
        error: null
      };
    }
    default: {
      return state;
    }
}
}

function updateAppointments(appointments: IAppointment[]) {
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
    newApp.actionData = {};
    newApp.actionData.start = (app.operation === 'DELETE') ? actionDataBefore.start : actionDataAfter.start;
    newApp.actionData.end = (app.operation === 'DELETE') ? actionDataBefore.end : actionDataAfter.end;
    newApp.actionData.notes = app.operation === 'DELETE' ? actionDataBefore.notes : actionDataAfter.notes;
    newApp.actionData.resource = (app.operation === 'DELETE')  ? actionDataBefore.resource : actionDataAfter.resource;
    newApp.actionData.title = app.operation === 'DELETE' ? actionDataBefore.title : actionDataAfter.title;
    newApp.actionData.services = (app.operation === 'DELETE') ?
      actionDataBefore.services : actionDataAfter.services;
      newApp.aditionalAppointments = [];

    const origin = updatedAppointments.find(x => x.entityId === app.entityId);
    if (origin) {
      let index = updatedAppointments.indexOf(origin);
      updatedAppointments[index].aditionalAppointments.push(newApp);
    } else {
      updatedAppointments.push(newApp);
    }
    } catch(error){
      console.log('JSON parse error in ' + app.entityId)
    }
  });
  return updateInnerAppointment(updatedAppointments);
}

function updateInnerAppointment(appointments: IAppointment[]){
  let obj = appointments;
  obj.forEach((element, index) => {
    if (element.aditionalAppointments.length > 0) {
      var sorted = innerSortAppointment(element.aditionalAppointments);
      sorted.forEach((innerElement, innerIndex) => {
        
        const prvApp = sorted[innerIndex - 1];
        if (prvApp){
          if (innerElement.actionData.start === undefined){
            sorted[innerIndex].actionData.start = prvApp.actionData.start;
          }
          if (innerElement.actionData.end === undefined){
            sorted[innerIndex].actionData.end = prvApp.actionData.end;
          }
          if (innerElement.actionData.notes === undefined){
            sorted[innerIndex].actionData.notes = prvApp.actionData.notes;
          }
          if (innerElement.actionData.resource === undefined){
            sorted[innerIndex].actionData.resource = prvApp.actionData.resource;
          }
          if (innerElement.actionData.title === undefined){
            sorted[innerIndex].actionData.title = prvApp.actionData.title;
          }
          if (innerElement.actionData.services === undefined){
            sorted[innerIndex].actionData.services = prvApp.actionData.services;
          }
        }
      });

      obj[index].aditionalAppointments = sortAppointment(sorted);

      const finalInner = element.aditionalAppointments[element.aditionalAppointments.length - 1];
      if (element.actionData.start === undefined){
        obj[index].actionData.start = finalInner.actionData.start;
      }
      if (element.actionData.end === undefined){
        obj[index].actionData.end = finalInner.actionData.end;
      }
      if (element.actionData.notes === undefined){
        obj[index].actionData.notes = finalInner.actionData.notes;
      }
      if (element.actionData.resource === undefined){
        obj[index].actionData.resource = finalInner.actionData.resource;
      }
      if (element.actionData.title === undefined){
        obj[index].actionData.title = finalInner.actionData.title;
      }
      if (element.actionData.services === undefined){
        obj[index].actionData.services = finalInner.actionData.services;
      }
    }
  });

  return obj;
}

function processVisitData(appointmentVisit) {
  var visitDataArray: any[] = [];
  appointmentVisit.forEach((visit) => {
    const dsArr = visit.delService.split('|');
    const dsOutcomeArr = visit.delServiceOutcome.split('|');
    const marksArr = visit.mark.replace('|', ',');
    // arrived data
    if (visit.entered > 0) {
      const visitRow: any = [];
      visitRow.queue = visit.queue;
      visitRow.ticket = visit.ticket;
      visitRow.service = visit.service;
      visitRow.time = secondsToTime(visit.entered);
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
      visitRow.ticket = visit.ticket;
      visitRow.service = visit.service;
      visitRow.time = secondsToTime(visit.called);
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
      visitRow.ticket = visit.ticket;
      visitRow.service = visit.service;
      visitRow.time = visit.visitOutcome !== 'REMOVE_BY_RESET' ? secondsToTime(visit.finished) : secondsToTime(86399);
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

function secondsToTime(secs) {
  const date = new Date(0);
  date.setSeconds(secs); // specify value for SECONDS here

  return date;
}

function sortAppointment(appList: IAppointment[]): IAppointment[] {
  return appList.slice().sort((a, b) => {
    return <any>new Date(b.timeStamp) - <any>new Date(a.timeStamp);
  });
}

function innerSortAppointment(appList: IAppointment[]): IAppointment[] {
  return appList.slice().sort((a, b) => {
    return <any>new Date(a.timeStamp) - <any>new Date(b.timeStamp);
  });
}
