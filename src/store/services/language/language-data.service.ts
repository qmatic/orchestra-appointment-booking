import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { calendarEndpoint, qsystemEndpoint, restEndpoint } from '../data.service';
import { GlobalErrorHandler } from '../../../services/util/global-error-handler.service';
import { ILanguage } from '../../../models/ILanguage';

@Injectable()
export class LanguageDataService {
  constructor(private http: HttpClient, private errorHandler: GlobalErrorHandler) {}
 
  getLanguage(): Observable<any> {
    return this.http
      .get<ILanguage[]>(`${qsystemEndpoint}/config/applications/notificationservice/variables/groups/languages`)
      .pipe(
        catchError(this.errorHandler.handleError())
      );
  }
}