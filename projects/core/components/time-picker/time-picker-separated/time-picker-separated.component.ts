import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { TimePickerResponse } from '../time-picker';
import { SuperchargingInputNumberResponse } from '../../../directives';

@Component({
  selector: 'ui-kit-time-picker-separated',
  templateUrl: './time-picker-separated.component.html',
  styleUrls: ['./time-picker-separated.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TimePickerSeparatedComponent implements OnChanges, OnInit {
  hours: number;
  minutes: number;

  isInHoursMode: boolean;
  isInMinutesMode: boolean;
  isInHoursMinuteMode: boolean = true;

  /**
   * Whether the component should accept a value equal to null
   */
  @Input() allowsNullValue: boolean;

  /**
   * Defines whether the component should set the time to the current time if no default value has been set
   */
  @Input() setDefaultValue: boolean;

  /**
   * Allows to initialize the component with a numeric value. For example: a value of `3600` seconds would set the value to `01:00` hour.
   * `time` takes precedence over `value` and `setDefaultValue`
   */
  @Input() time: number;

  /**
   * The value displayed to the user. `value` takes precedence over `setDefaultValue`
   */
  @Input() value: string | null;

  @Output() onUpdate: EventEmitter<TimePickerResponse> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.time !== undefined && !this.time) {
      this.time = changes.time.currentValue;
      this.updateHoursAndMinutes();
    }

    if (changes.value !== undefined && !changes.time) {
      this.updateValue(changes);
    }
  }

  ngOnInit(): void {
    switch (true) {
      case !!this.time:
        this.updateHoursAndMinutes();
        this.update();

        break;
      case !!this.value: {
        this.updateValue();

        break;
      }
      case this.setDefaultValue: {
        const currentDate: Date = new Date();

        this.hours = currentDate.getHours();
        this.minutes = currentDate.getMinutes();
        this.update();

        break;
      }
      case !this.allowsNullValue && !this.setDefaultValue:
        this.update();

        break;
    }
  }

  /**
   * Updates the hours value
   *
   * @param {Number} $event
   */
  updateHours($event: number): void {
    this.hours = $event;
    this.update();
  }

  /**
   * Updates the minutes value
   *
   * @param {Number} $event
   */
  updateMinutes($event: number): void {
    this.minutes = $event;
    this.update();
  }

  /**
   * Updates value during a wheel event
   *
   * @param {SuperchargingInputNumberResponse} response - Response sent by the directive
   */
  wheelUpdateHours(response: SuperchargingInputNumberResponse): void {
    if (response.direction > 0) {
      this.incrementHours(response.value);
    } else {
      this.decrementHours(response.value);
    }
  }

  /**
   * Update value during a keydown event
   *
   * @param {KeyboardEvent} $event
   */
  keyDownUpdateHours($event: KeyboardEvent): void {
    const value: number = Number(($event.target as HTMLInputElement)?.value);
    this.updateHours(value);
  }

  /**
   * Update value during a keydown event
   *
   * @param {KeyboardEvent} $event
   */
  keyDownUpdateMinutes($event: KeyboardEvent): void {
    const value: number = Number(($event.target as HTMLInputElement)?.value);
    this.updateMinutes(value);
  }

  /**
   * Increments the hours if no param is passed
   * If there's a parameter, increase the hours corresponding to that value
   *
   * @param {Number} hours - Response sent by the directive
   */
  incrementHours(hours?: number): void {
    if (isNaN(this.hours)) this.hours = 0;

    this.hours = this.hours === 23 ? 0 : hours ? hours : this.hours + 1;
    this.update();
  }

  /**
   * Decrements the hours if no param is passed
   * If there's a parameter, decrease the hours corresponding to that value
   *
   * @param {Number} hours - Response sent by the directive
   */
  decrementHours(hours?: number): void {
    if (isNaN(this.hours)) this.hours = 0;

    this.hours = this.hours === 0 ? 23 : hours ? hours : this.hours - 1;
    this.update();
  }

  /**
   * Updates the minutes during a wheel event
   *
   * @param {SuperchargingInputNumberResponse} response - Response sent by the directive
   */
  wheelUpdateMinutes(response: SuperchargingInputNumberResponse): void {
    if (response.direction > 0) {
      this.incrementMinutes(response.value);
    } else {
      this.decrementMinutes(response.value);
    }
  }

  /**
   * Increments the minutes if no param is passed
   * If there's a parameter, increase the minutes corresponding to that value
   *
   * @param {Number} minutes - Response sent by the directive
   */
  incrementMinutes(minutes?: number): void {
    if (isNaN(this.minutes)) this.minutes = 0;
    if (this.minutes === 59 || minutes === 0) {
      this.incrementHours();
      this.minutes = 0;
    } else {
      this.minutes = minutes ? minutes : this.minutes + 1;
    }

    this.update();
  }

  /**
   * Decrements the minutes if no param is passed
   * If there's a parameter, decrement the minutes corresponding to that value
   *
   * @param {Number} minutes - Response sent by the directive
   */
  decrementMinutes(minutes?: number): void {
    if (isNaN(this.minutes)) this.minutes = 0;
    if (this.minutes === 0 || minutes === 59) {
      this.decrementHours();
      this.minutes = 59;
    } else {
      this.minutes = minutes ? minutes : this.minutes - 1;
    }

    this.update();
  }

  /**
   * Updates `time` and `value` from the `hours` and `minutes` values params
   * Emits the new values to its parent component
   */
  update(): void {
    if (!this.hours) this.hours = 0;
    if (!this.minutes) this.minutes = 0;

    this.time = this.hours * 60 * 60 + this.minutes * 60;
    this.value = String(this.hours).padStart(2, '00') + ':' + String(this.minutes).padStart(2, '00');
    this.onUpdate.emit({
      time: this.time,
      value: this.value,
    });
  }

  /**
   * Displays the default view where hours and minutes are shown
   */
  showDefaultView(): void {
    this.isInHoursMode = false;
    this.isInMinutesMode = false;
    this.isInHoursMinuteMode = true;
  }

  /**
   * Displays the hours picker
   */
  showHoursView(): void {
    this.isInHoursMode = true;
    this.isInMinutesMode = false;
    this.isInHoursMinuteMode = false;
  }

  /**
   * Displays the minutes picker
   */
  showMinutesView(): void {
    this.isInHoursMode = false;
    this.isInMinutesMode = true;
    this.isInHoursMinuteMode = false;
  }

  /**
   * Sets hours with the value corresponding to the one the user selected from the picker
   *
   * @param {Number} hours - Selected hours from the picker
   */
  setHours(hours: number): void {
    this.hours = hours;
    this.update();

    this.isInHoursMode = false;
    this.isInMinutesMode = false;
    this.isInHoursMinuteMode = true;
  }

  /**
   * Sets minutes with the value corresponding to the one the user selected from the picker
   *
   * @param {Number} minutes - Selected minutes from the picker
   */
  setMinutes(minutes: number): void {
    this.minutes = minutes;
    this.update();

    this.isInHoursMode = false;
    this.isInMinutesMode = false;
    this.isInHoursMinuteMode = true;
  }

  /**
   * Updates hours and minutes
   */
  updateHoursAndMinutes(): void {
    this.hours = Math.floor(this.time / 3600);
    this.minutes = Math.floor((this.time - this.hours * 3600) / 60);
  }

  /**
   * Generates the values for the hours picker
   *
   * @return {Number[]}
   */
  generateHours(): number[] {
    return [...Array(24).keys()].map((x: number, index: number) => index);
  }

  /**
   * Generates the values for the minutes picker
   *
   * @return {Number[]}
   */
  generateMinutes(): number[] {
    const divider: number = 5;
    return [...Array(60 / divider).keys()].map((x: number, index: number) => index * divider);
  }

  /**
   * Updates value
   *
   * @param {SimpleChanges} changes
   */
  updateValue(changes?: SimpleChanges): void {
    const value: string = (changes && changes.value.currentValue ? changes.value.currentValue : this.value);

    if ((!this.value && !changes) || !value) return;

    const splitValue: string[] = value.split(':');

    this.hours = Number(splitValue[0]);
    this.minutes = Number(splitValue[1]);

    this.update();
  }
}
