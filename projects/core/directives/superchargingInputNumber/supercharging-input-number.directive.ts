import { Directive, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

import { SuperchargingInputNumberResponse } from './supercharging-input-number';

@Directive({
  selector: '[superchargingInputNumber]',
})
export class SuperchargingInputNumberDirective implements OnInit {
  direction: number;

  @HostListener('keydown', ['$event']) keyDown($event: KeyboardEvent) {
    this.surcharge($event);
  }

  @HostListener('wheel', ['$event']) wheel($event: WheelEvent) {
    this.surcharge($event);

    setTimeout(() => {
      const inputValue: number = Number(this.pad(($event.target as HTMLInputElement).value));
      this.onWheel.emit({ value: inputValue, direction: this.direction });
    }, 0);
  }

  @Output() onWheel:EventEmitter<SuperchargingInputNumberResponse> = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.elementRef.nativeElement.value = this.pad(this.elementRef.nativeElement.value);
    }, 0);
  }

  /**
   * Extends the default input controls with new ones:
   *
   * If presses up or down, add or subtract 1
   * If holds shift and press up or down, add or subtract 10
   * If holds alt and press up or down, add or subtract 0.1
   * If holds ctrl and press up or down, add or subtract 100. On Mac, it uses the cmd key for consistency.
   * If the input is empty, calculate from the min attribute value.
   * Any other interaction with the input should use the default behavior.
   *
   * @param {KeyboardEvent | WheelEvent} $event
   */
  surcharge($event: KeyboardEvent | WheelEvent): void {
    const correctType: boolean = $event instanceof KeyboardEvent ? ['ArrowUp', 'ArrowDown'].indexOf($event?.key) > -1 : $event.type === 'wheel';

    this.direction = ((): number => {
      let _direction: number = 0;

      if ($event instanceof WheelEvent) {
        _direction = $event.deltaY < 0 ? 1 : -1;
      }
      if ($event instanceof KeyboardEvent) {
        _direction = $event.key === 'ArrowUp' ? 1 : -1;
      }

      return _direction;
    })();

    if (correctType) {
      $event.preventDefault();

      const isMac = navigator.platform === 'MacIntel';
      const target: HTMLInputElement = $event.target as HTMLInputElement;
      const minValue: number | null = target?.getAttribute('min') ? parseFloat((target.getAttribute('min')) as string) : 0;
      const maxValue: number | null = target?.getAttribute('max') ? parseFloat((target.getAttribute('max') as string)) : null;
      let currentValue: number;

      if (isNaN(parseFloat(target.value))) {
        currentValue = minValue ? minValue : 0;
      } else {
        currentValue = parseFloat(target.value);
      }

      const modifier = (isMac ? $event.metaKey : $event.ctrlKey) ? 100 : $event.shiftKey ? 10 : $event.altKey ? 0.1 : 1;
      const decimals = Math.max((currentValue.toString().split('.')[1] || '').length, $event.altKey ? 1 : 0);
      let newValue: number = currentValue + this.direction * modifier;

      if (maxValue) {
        if (newValue > maxValue) {
          newValue = minValue;
        }
      }

      if (minValue || minValue === 0) {
        if ((newValue < minValue) && maxValue) {
          newValue = maxValue;
        }
      }

      target.value = this.pad(newValue.toFixed(decimals));
    }
  }

  /**
   * Formats a string, so it always has a length of 2
   * Example: 5 => 05
   *
   * @param {String} value - The string passed as parameter
   * @return {String}
   */
  pad(value: string): string {
    if (!value) return '00';
    return value.length < 2 ? '0' + value.toString() : value.toString();
  }
}
