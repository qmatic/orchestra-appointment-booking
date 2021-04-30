import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import * as moment from "moment";
import { SystemInfoSelectors } from './../../store';
import { mergeMap, switchMap, map } from 'rxjs/operators';

@Pipe({
  name: 'qmTimeFormat'
})
export class QmTimeFormatPipe implements PipeTransform {
  /**
   *
   */
  private readonly Hour24Format ='HH:mm';
  private readonly Hour12Format ='hh:mm A';

  constructor(private systemInfoSelectors: SystemInfoSelectors) {

    
  }

  transform(timeString: string, timeZone?: any): Observable<string> {
    if(timeString) {
      if(timeZone) {
        return this.systemInfoSelectors.systemInfoTimeConvention$.pipe(map(tc => {
            return tc === '24' ? moment(timeString).tz(timeZone)
            .format(this.Hour24Format) : moment(timeString).tz(timeZone)
            .format(this.Hour12Format);
        }));
      }
      else {
        return this.systemInfoSelectors.systemInfoTimeConvention$.pipe(map(tc => {
          return tc === '24' ? moment(timeString)
          .format(this.Hour24Format) : moment(timeString)
          .format(this.Hour12Format);
      }));
      }
    }
    return of(timeString);
  }
}
