import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import * as moment from 'moment';
import { SystemInfoSelectors } from './../../store';
import { mergeMap, switchMap, map } from 'rxjs/operators';

@Pipe({
  name: 'qmDateFormat'
})
export class QmDateFormatPipe implements PipeTransform {
  /**
   *
   */

  constructor(private systemInfoSelectors: SystemInfoSelectors) {

  }

  transform(dateString: string, timeZone?: any): Observable<string> {
    if (dateString) {
      if (timeZone) {
        return this.systemInfoSelectors.dateTimeConvention$.pipe(map(tc => {
            return moment(dateString).tz(timeZone)
            .format(tc);
        }));
      } else {
        return this.systemInfoSelectors.dateTimeConvention$.pipe(map(tc => {
            return moment(dateString).format(tc);
        }));
      }
    }
    return of(dateString);
  }
}
