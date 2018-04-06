
export const restEndpoint = '/rest/';
export const calendarEndpoint = '/calendar-backend/api/v1/';
export const qsystemEndpoint = '/qsystem/rest/';

export class DataServiceError<T> {
  constructor(public error: any, public requestData: T) {}
}
