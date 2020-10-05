import { Pipe, PipeTransform } from '@angular/core';
import * as momentFromTz from "moment-timezone";
import * as moment from "moment";

@Pipe({
  name: 'amTz'
})
export class QmTimeZonePipe implements PipeTransform {

  transform(value: moment.MomentInput, tzdata: string, parseInZone: boolean = false): any {
    if (parseInZone) {
      return momentFromTz.tz(value, tzdata);
    }
    return moment(value).tz(tzdata);
  }
}
