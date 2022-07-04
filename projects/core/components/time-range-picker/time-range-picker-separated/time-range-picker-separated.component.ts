import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { InputType, TimeRangePickerResponse } from '../time-range-picker';
import { TimePickerResponse } from "../../time-picker";
import { getDateFromString } from "../../../shared/utils";

@Component({
  selector: 'ui-kit-time-range-picker-separated',
  templateUrl: './time-range-picker-separated.component.html',
  styleUrls: ['./time-range-picker-separated.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TimeRangePickerSeparatedComponent {
  @Input() startTime: number;
  @Input() endTime: number;

  @Input() startValue: string | null;
  @Input() endValue: string | null;

  /**
   * Whether the component should accept a value equal to null
   */
  @Input() allowsNullValue: boolean;

  /**
   * Defines whether the component should set the time to the current time if no default value has been set
   */
  @Input() setDefaultValue: boolean;

  @Output() onUpdate: EventEmitter<TimeRangePickerResponse> = new EventEmitter();

  update(changes: TimePickerResponse, input: InputType): void {
    for (const propName in changes) {
      if (Object.getOwnPropertyDescriptor(changes, propName)) {
        const value: any = (changes as any)[propName];
        if (value === undefined) return;
        (this as any)[propName] = typeof value === 'object' ? value.currentValue : value;
      }
    }

    this.onUpdate.emit(this.createObjectToEmit(changes, input));
  }

  createObjectToEmit(changes: TimePickerResponse, input: InputType): TimeRangePickerResponse {
    const object: TimeRangePickerResponse = {};

    if (input === 'start') {
      if (changes.time || changes.time === 0) {
        this.startTime = changes.time;
        object.startTime = changes.time;
      }
      if (changes.value || (this.allowsNullValue && changes.value === null)) {
        if (changes.value) {
          object.startValue = getDateFromString(changes.value);
        } else {
          object.startValue = null;
        }

        this.startValue = changes.value;
      }
    }
    if (input === 'end') {
      if (changes.time || changes.time === 0) {
        this.endTime = changes.time;
        object.endTime = changes.time;
      }
      if (changes.value || (this.allowsNullValue && changes.value === null)) {
        if (changes.value) {
          object.endValue = getDateFromString(changes.value);
        } else {
          object.endValue = null;
        }

        this.endValue = changes.value;
      }
    }

    return object;
  }
}
