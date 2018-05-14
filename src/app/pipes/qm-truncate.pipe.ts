import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class QmTruncatePipe implements PipeTransform {
  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, 13).lastIndexOf(' ');
    }
    if (value.length <= limit) {
      return `${value}`;
    } else {
      return `${value.substr(0, limit)}${ellipsis}`;
    }
  }
}
