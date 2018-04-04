
export const restEndpoint = '/rest/';
export const calendarEndpoint = '/calendar-backend/api/v1/';

export class DataServiceError<T> {
  constructor(public error: any, public requestData: T) {}
}
