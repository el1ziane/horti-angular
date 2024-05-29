import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {

  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = this._formatNumber(date.getDate());
      const month = this._formatNumber(date.getMonth() + 1);
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } else {
      return super.format(date, displayFormat);
    }
  }

  private _formatNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
