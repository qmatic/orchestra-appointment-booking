import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'qmAppListFilter'
})
export class QmAppListFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
