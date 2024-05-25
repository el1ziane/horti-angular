import { Injectable } from '@angular/core';
import { DateAdapter, MatDateFormats } from '@angular/material/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  /** Formats the date for display. */
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      // Return the formatted date string in the format 'dd/MM/yyyy'
      return `${this._formatNumber(day)}/${this._formatNumber(month)}/${year}`;
    } else {
      // Use the default date format for other display formats
      return super.format(date, displayFormat);
    }
  }

  /** Formats numbers to have leading zeros if necessary. */
  private _formatNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}

