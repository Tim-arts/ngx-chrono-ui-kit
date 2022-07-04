import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';

import { AdditionalClasses, AlertIcons, AlertOptions, AlertStatuses, AlertTypes } from './alert';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ui-kit-alert',
  styleUrls: ['./alert.component.css'],
  templateUrl: './alert.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'd-block flex-direction-column',
  },
  animations: [
    trigger('visibilityState', [
      transition('* => true', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AlertComponent {
  private _status: AlertStatuses;
  icon: string;

  /*
   * A list of classes that can be added into the component wrapper
   */
  @Input() classes: string | string[];

  /*
   * Defines the content of the alert
   */
  @Input() content: string;

  /*
   * Toast unique id
   */
  @Input() id?: string;

  /*
   * Defines the background-color of the component and its icon
   */
  @Input() get status(): AlertStatuses {
    return this._status;
  }

  set status(value: AlertStatuses) {
    this._status = value;
    this.setIcon();
  }

  /*
   * Defines the title of the alert
   */
  @Input() title: string;

  /*
   * Defines the type of the alert
   *
   * Alert is a text alert shown to the user to display important information
   * Inline is a contextual feedback usually located nearby a text
   * Toast is a notification usually following user actions
   */
  @Input() type: AlertTypes;

  /*
   * Toast options :
   * - duration: The length of time in milliseconds to wait before the alert dismisses automatically.
   * - horizontalPosition: The horizontal position of the alert.
   * - stackable: Whether it's possible to display multiple alerts at the same time.
   * - verticalPosition: The vertical position of the alert.
   * - preventDuplicates: If preventDuplicates is true, toasts with the same title, content and status will not be rendered.
   * - limit: Sets a limit of alerts displayed simultaneously.
   *   Only works when the stackable option is true. If the number of alerts exceeds the allowed limit, the oldest alerts will be deleted.
   *   0 is infinite.
   */
  @Input() toastOptions: AlertOptions;

  /*
   * Event to destroy the toast
   */
  @Output() onDestroy: EventEmitter<string> = new EventEmitter();

  /*
   * Set the fadeIn animation only if the alert is a toast
   */
  @HostBinding('@visibilityState') get getVisibilityState(): boolean {
    return this.type === 'toast';
  }

  /*
   * Adds the class 'status-error' depending on the status
   */
  @HostBinding('class.status-error') get error(): boolean {
    return this.status === 'error';
  }

  /*
   * Adds the class 'status-success' depending on the status
   */
  @HostBinding('class.status-success') get success(): boolean {
    return this.status === 'success';
  }

  /*
   * Adds the class 'status-warning' depending on the status
   */
  @HostBinding('class.status-warning') get warning(): boolean {
    return this.status === 'warning';
  }

  /*
   * Adds the class 'status-information' depending on the status
   */
  @HostBinding('class.status-information') get information(): boolean {
    return this.status === 'information';
  }

  /*
   * Adds the class 'd-flex' depending on the type
   */
  @HostBinding('class.d-flex') get flex(): boolean {
    return this.type === 'alert' || this.type === 'toast';
  }

  /*
   * Adds the class 'd-inline-flex' depending on the type
   */
  @HostBinding('class.d-inline-flex') get inlineFlex(): boolean {
    return this.type === 'inline';
  }

  /*
   * Adds additional classes
   */
  @HostBinding('class') get additionalClasses(): AdditionalClasses {
    const object: AdditionalClasses = {
      'type-alert': this.type === 'alert',
      'type-inline': this.type === 'inline',
      'type-toast': this.type === 'toast',
    };

    if (this.classes) {
      if (typeof this.classes === 'string') {
        object[this.classes] = true;
      } else {
        for (let i = 0; i < this.classes.length; i++) {
          object[this.classes[i]] = true;
        }
      }
    }

    return object;
  }

  ngOnDestroy(): void {
    this.onDestroy.emit();
  }

  /**
   * Set the icon corresponding to the alert status
   */
  setIcon(): void {
    switch (this.status) {
      case 'error':
        this.icon = AlertIcons.error;
        break;
      case 'success':
        this.icon = AlertIcons.success;
        break;
      case 'warning':
        this.icon = AlertIcons.warning;
        break;
      case 'information':
        this.icon = AlertIcons.information;
        break;
      default:
        this.icon = AlertIcons.default;
    }
  }

  /**
   * Public method to close the toast. While closing it, emits an event containing the toast id to the parent component
   */
  close(): void {
    this.onDestroy.emit(this.id);
  }
}
