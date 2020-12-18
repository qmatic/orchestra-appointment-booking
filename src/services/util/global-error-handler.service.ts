import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from './toast.service';
import { DataServiceError } from './../../store/services/data.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class GlobalErrorHandler {

    private readonly genericErrorKey: string = 'messages.error.generic.with.context';

    showError(contextualErrorKey: string,  errorAction: any, interpolationParams: any = {}) {
        // switch (error.errorCode) {
        // default:
        const dsError = errorAction as DataServiceError<any>;
        this.translateService.get([contextualErrorKey, this.genericErrorKey], {
            errorCode: dsError.errorCode,
            ...interpolationParams
        }).subscribe(
            (errorMsgs: string[]) => {
                this.toastService.errorToast(`${errorMsgs[contextualErrorKey]}. ${errorMsgs[this.genericErrorKey]}`);
            }
            ).unsubscribe();
        // break;
        // }
    }

    handleError<T>(requestData?: T ) {
        return (res: HttpErrorResponse) => {
          const error = new DataServiceError(res, requestData);
          console.error(error);
          return throwError(error);
        };
      }

    constructor(private toastService: ToastService, private translateService: TranslateService) { }
}
