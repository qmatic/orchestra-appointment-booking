
export const restEndpoint = '/rest/servicepoint';
export const calendarEndpoint = '/calendar-backend/api/v1';
export const calendarPublicEndpoint = '/calendar-backend/public/api/v1';
export const calendarPublicEndpointV2 = '/calendar-backend/public/api/v2';
export const qsystemEndpoint = '/qsystem/rest';

export class DataServiceError<T> {
  constructor(public error: any, public requestData: T) {}
}
