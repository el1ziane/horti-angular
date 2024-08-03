import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalVirgula',
  standalone: true
})
export class DecimalVirgulaPipe implements PipeTransform {

  transform(value: number): string {
    if (value == null) return '';
    return value.toFixed(2).replace('.', ',');
  }

}
