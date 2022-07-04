import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { TimePickerResponse } from './time-picker';
import { REGEXP_HHMM_FORMAT } from '../../shared/utils';
import { throwIncorrectValueWarning } from '../../shared/pickers';

@Component({
  selector: 'ui-kit-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements OnChanges, OnInit, AfterViewInit {
  private _value: string | null;
  private _hours: number;
  private _minutes: number;

  /**
   * Whether the component should accept a null value
   */
  @Input() allowsNullValue: boolean = false;

  /**
   * Defines whether the component should set the time to the current time if no default value has been set
   */
  @Input() setDefaultValue: boolean = true;

  /**
   * Allows to initialize the component with a numeric value. For example: a value of `3600` seconds would set the value to `01:00` hour
   * Takes precedence over `value` and `setDefaultValue`
   */
  @Input() time: number;

  /**
   * The value displayed to the user
   * Takes precedence over `setDefaultValue`
   *
   * @param {String | Null} value
   */
  @Input()
  set value(value: string | null) {
    if (typeof value === 'string') {
      if (REGEXP_HHMM_FORMAT.test(value)) {
        const values: string[] = value.split(':');

        this._hours = Number(values[0]);
        this._minutes = Number(values[1]);
        this._value = value;
      } else {
        if (value !== '') {
          throwIncorrectValueWarning();
        }

        this._value = '00:00';
      }
    }
    if (value === null) {
      this._value = value;
    }
  }
  get value(): string | null {
    return this._value;
  }

  @Output() onUpdate: EventEmitter<TimePickerResponse> = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateValues(changes);
  }

  ngOnInit(): void {
    this.checkTimeValidity();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  /**
   * Update the component params when an `onUpdate` child component event is triggered
   *
   * @param {TimePickerResponse} timePickerResponse - Params to update
   */
  update(timePickerResponse: TimePickerResponse): void {
    this.updateValues(timePickerResponse);
  }

  /**
   * Update values during an emit event
   *
   * @param {SimpleChanges | TimePickerResponse} changes
   */
  updateValues(changes: SimpleChanges | TimePickerResponse): void {
    let hasChanged: boolean = false;

    for (const propName in changes) {
      if (Object.getOwnPropertyDescriptor(changes, propName)) {
        const value: any = (changes as any)[propName];
        if (value === undefined) return;
        (this as any)[propName] = typeof value === 'object' ? value.currentValue : value;

        hasChanged = true;
      }
    }

    if (hasChanged) this.cdr.detectChanges();
  }

  /**
   * Public method to get the picker time
   *
   * @return {Number}
   */
  getTime(): number {
    return this.time;
  }

  /**
   * Public method to get the picker value
   *
   * @return {String}
   */
  getValue(): string | null {
    return this.value;
  }

  /**
   * Resets the picker values
   */
  resetValues(): void {
    this.value = this.allowsNullValue ? null : '';
    this.time = 0;
  }

  checkTimeValidity(): void {
    const maxLimit: number = 86400;
    const minLimit: number = 0;

    if (this.time > 86400) {
      console.error(`The time value has exceeded the authorized limit (${maxLimit}). Time param has been reset`);

      this.time = 0;
      this.value = '00:00';
    }
    if (this.time < 0) {
      console.error(`The time value has subceeded the authorized limit (${minLimit}). Time param has been reset`);

      this.time = 0;
      this.value = '00:00';
    }
  }
}
