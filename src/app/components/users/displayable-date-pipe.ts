import {Pipe, PipeTransform} from '@angular/core';
import {isNumber} from 'lodash-es';

@Pipe({
  name: 'displayableDate',
})
export class DisplayableDatePipe implements PipeTransform {

  transform(value: number): Date | null {
    if (isNumber(value)) {
      return new Date(value);
    }
    return null;
  }

}
