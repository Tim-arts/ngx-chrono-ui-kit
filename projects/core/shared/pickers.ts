import { ElementRef, Injectable } from '@angular/core';
import { ErrorStateMatcher, MatDateFormats, NativeDateAdapter } from '@angular/material/core';
import { FormControl } from '@angular/forms';

import { REGEXP_HHMM_FORMAT } from './utils';

export const APP_TIME_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { hour: 'short', minute: 'short' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'long', month: 'long' },
    dateA11yLabel: { year: 'long', month: 'long', day: 'long'
    },
    monthYearA11yLabel: { year: 'long', month: 'long' },
  }
};

/**
 * An object used to control when error messages are shown
 */
export class TimeErrorStateMatcher implements ErrorStateMatcher {
  element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  isErrorState(control: FormControl | null): boolean {
    const value: string = this.element.nativeElement?.value;

    control?.clearValidators();
    control?.updateValueAndValidity();

    if (!value) return false;

    return !REGEXP_HHMM_FORMAT.test(this.element.nativeElement?.value);
  }
}

/**
 * Modifies the output format from an input
 */
@Injectable()
export class AppTimeAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: string): string {
    if (displayFormat === 'input') {
      const hours: string = String(date.getHours()).padStart(2, '00');
      const minutes: string = String(date.getMinutes()).padStart(2, '00');

      return `${hours}:${minutes}`;
    }

    return date.toDateString();
  }
}

/**
 * Displays a warning in the console when the user set a wrong value for the `value` param
 */
export const throwIncorrectValueWarning = (): void => {
  console.warn('The value parameter is not correctly formatted. Should be of \'HH:MM\' format');
};
