import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl, FormGroup } from '@angular/forms';

import { InputType, TimeRangePickerResponse } from './time-range-picker';
import { TimePickerResponse } from '../time-picker';
import { APP_TIME_FORMATS, AppTimeAdapter, TimeErrorStateMatcher } from '../../shared/pickers';
import { getDateFromString, REGEXP_HHMM_FORMAT } from '../../shared/utils';

@Component({
  selector: 'ui-kit-time-range-picker',
  templateUrl: './time-range-picker.component.html',
  styleUrls: ['./time-range-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: AppTimeAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_TIME_FORMATS }
  ]
})
export class TimeRangePickerComponent implements OnChanges, OnInit, AfterViewInit {
  @ViewChild('startValueElement', { static: false }) startValueElement: ElementRef;
  @ViewChild('endValueElement', { static: false }) endValueElement: ElementRef;

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
  @Input() startTime: number;
  @Input() endTime: number;
  @Input() startValue: string | null;
  @Input() endValue: string | null;

  @Output() onUpdate: EventEmitter<TimePickerResponse> = new EventEmitter();

  errorStateMatcherStartValue: TimeErrorStateMatcher;
  errorStateMatcherEndValue: TimeErrorStateMatcher;

  timeRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateValues(changes);
  }

  ngOnInit(): void {
    if (this.startTime) {
      this.setStartValueFromTime();
    } else {
      this.updateStartValue();
    }
    if (this.endTime) {
      this.setEndValueFromTime();
    } else {
      this.updateEndValue();
    }
  }

  ngAfterViewInit(): void {
    this.errorStateMatcherStartValue = new TimeErrorStateMatcher(this.startValueElement);
    this.errorStateMatcherEndValue = new TimeErrorStateMatcher(this.endValueElement);
    this.cdr.detectChanges();
  }

  /**
   * Update the component params when an `onUpdate` child component event is triggered
   *
   * @param {TimeRangePickerResponse} timeRangePickerResponse - Params to update
   */
  update(timeRangePickerResponse: TimeRangePickerResponse): void {
    this.updateValues(timeRangePickerResponse);
    this.cdr.detectChanges();
  }

  /**
   * Update values while there are changes
   *
   * @param {SimpleChanges | TimeRangePickerResponse} changes
   */
  updateValues(changes: SimpleChanges | TimeRangePickerResponse): void {
    for (const propName in changes) {
      if (Object.getOwnPropertyDescriptor(changes, propName)) {
        const value: any = (changes as any)[propName];
        if (value === undefined) return;
        (this as any)[propName] = typeof value === 'object' ? value.currentValue : value;
      }
    }

    if (changes.startValue && changes.startValue instanceof Date) {
      this.updateStartValue(changes.startValue);
    }
    if (changes.endValue && changes.endValue instanceof Date) {
      this.updateEndValue(changes.endValue);
    }
  }

  /**
   * Public method to get the picker start time
   *
   * @return {Number}
   */
  getStartTime(): number {
    return this.startTime;
  }

  /**
   * Public method to get the picker end time
   *
   * @return {Number}
   */
  getEndTime(): number {
    return this.endTime;
  }

  /**
   * Public method to get the picker start value
   *
   * @return {String | Null | Undefined}
   */
  getStartValue(): string | null | undefined {
    if (!this.timeRange.get('start')?.value) return undefined;
    return this.getValueFromDate(this.timeRange.get('start')?.value);
  }

  /**
   * Public method to get the picker end value
   *
   * @return {String | Null | Undefined}
   */
  getEndValue(): string | null | undefined {
    if (!this.timeRange.get('end')?.value) return undefined;
    return this.getValueFromDate(this.timeRange.get('end')?.value);
  }

  /**
   * Resets the picker values
   */
  resetValues(): void {
    this.resetStartValue();
    this.resetEndValue();
  }

  /**
   * Reset start value
   */
  resetStartValue(): void {
    this.timeRange.patchValue({ start: this.allowsNullValue ? null : '' });
    this.startTime = 0;
  }

  /**
   * Reset end value
   */
  resetEndValue(): void {
    this.timeRange.patchValue({ end: this.allowsNullValue ? null : '' });
    this.endTime = 0;
  }

  /**
   * Triggers while the input value has changed
   *
   * @param {MatDatepickerInputEvent} $event
   * @param {InputType} input
   */
  dateChange($event: MatDatepickerInputEvent<any>, input: InputType): void {
    const value: string = ($event.targetElement as HTMLInputElement).value;

    if (!REGEXP_HHMM_FORMAT.test(value)) {
      if (input === 'start') {
        this.resetStartValue();
      }
      if (input === 'end') {
        this.resetEndValue();
      }

      return;
    }

    const date: Date | null = getDateFromString(value);

    if (input === 'start') {
      this.timeRange.patchValue({ start: date });
      this.startValue = date ? this.getValueFromDate(date) : null;
    }
    if (input === 'end') {
      this.timeRange.patchValue({ end: date });
      this.endValue = date ? this.getValueFromDate(date) : null;
    }
  }

  /**
   * Get date from a string
   *
   * @param {String | Null} value
   * @return {Date | Null}
   */
  convertStringToDate(value: string | null): Date | null {
    if (value === undefined) {
      switch (true) {
        case this.setDefaultValue:
          return new Date();
        case this.allowsNullValue:
          return null;
        default:
          return getDateFromString();
      }
    }

    return getDateFromString(value);
  }

  /**
   * Update start value while it changes
   *
   * @param {Date | Null} date
   */
  updateStartValue(date?: Date | null): void {
    if (!date && this.startValue === undefined && !this.setDefaultValue) return;
    this.timeRange.patchValue({ 'start': date ? date : this.convertStringToDate(this.startValue) });
  }

  /**
   * Update end value while it changes
   *
   * @param {Date | Null} date
   */
  updateEndValue(date?: Date | null): void {
    if (!date && this.endValue === undefined && !this.setDefaultValue) return;
    this.timeRange.patchValue({ 'end': date ? date : this.convertStringToDate(this.endValue) });
  }

  /**
   * Get the hours and minutes values and return the corresponding string
   *
   * @param {Date} date
   * @return {String}
   */
  getValueFromDate(date: Date): string {
    return String(date.getHours()).padStart(2, '00') + ':' + String(date.getMinutes()).padStart(2, '00');
  }

  /**
   * Toggle the visibility of the clear button
   *
   * @return {Boolean}
   */
  isClearButtonHidden(): boolean {
    if (!this.timeRange.get('start')?.value && !this.timeRange.get('end')?.value) return true;
    if (this.timeRange.get('start')?.value && this.timeRange.get('end')?.value) return false;
    if (this.timeRange.get('start')?.value === '00:00' && this.timeRange.get('end')?.value === '00:00') return false;

    return false;
  }

  /**
   * Set startValue if a time has been initialized
   */
  setStartValueFromTime(): void {
    const hours = Math.floor(this.startTime / 3600);
    const minutes = Math.floor((this.startTime - hours * 3600) / 60);
    const value: string = `${hours}:${minutes}`;

    this.timeRange.patchValue({ 'start': this.convertStringToDate(value) });
  }

  /**
   * Set endValue if a time has been initialized
   */
  setEndValueFromTime(): void {
    const hours = Math.floor(this.endTime / 3600);
    const minutes = Math.floor((this.endTime - hours * 3600) / 60);
    const value: string = `${hours}:${minutes}`;

    this.timeRange.patchValue({ 'end': this.convertStringToDate(value) });
  }
}
