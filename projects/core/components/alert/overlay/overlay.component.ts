import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-kit-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'd-flex',
  },
})
export class OverlayComponent {
  _horizontalPosition: string;
  _verticalPosition: string;

  /**
   * Set the horizontal position for the toast container
   */
  @Input() get horizontalPosition(): string {
    return this._horizontalPosition;
  }

  set horizontalPosition(value: string) {
    switch (true) {
      case value === 'start':
        this._horizontalPosition = 'justify-content-flex-start';
        break;
      case value === 'center':
        this._horizontalPosition = 'justify-content-center';
        break;
      case value === 'end':
        this._horizontalPosition = 'justify-content-flex-end';
        break;
      case value === 'left':
        this._horizontalPosition = 'justify-content-flex-start';
        break;
      case value === 'right':
        this._horizontalPosition = 'justify-content-flex-end';
        break;
      default:
        console.warn('Horizontal value has no matching value!');
    }
  }

  /**
   * Set the vertical position for the toast container
   */
  @Input() get verticalPosition(): string {
    return this._verticalPosition;
  }

  set verticalPosition(value: string) {
    switch (true) {
      case value === 'top':
        this._verticalPosition = 'align-items-flex-start';
        break;
      case value === 'bottom':
        this._verticalPosition = 'align-items-flex-end';
        break;
      default:
        console.warn('Vertical value has no matching value!');
    }
  }
}
