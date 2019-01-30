import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Pipe({
  name: 'cl'
})
export class NumberClPipe implements PipeTransform {
  transform(value: any, format: any): any {
    if (parseFloat(value) > 0) {
      console.log('value: ' + parseFloat(value));
      if (format === 'currency') {
        value = (new CurrencyPipe('en-US')).transform(value, 'CLP', '$', '1.0-0');
      }
      else if (format === 'percent') {
        value = (new DecimalPipe('en-US')).transform(value, '1.2-2') + '%';
      }
      else if (format === 'decimal') {
        value = (new DecimalPipe('en-US')).transform(value, '1.2-2');
      }
      return value.replace(',', 'thousand').replace('.', 'decimal').replace('thousand', '.').replace('decimal', ',');
    }
    else {
      return null;
    }
  }

}
