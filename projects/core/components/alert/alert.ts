import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export enum AlertIcons {
  default = 'notifications',
  error = 'error',
  success = 'check_circle',
  warning = 'warning',
  information = 'info',
}

export interface Alert {
  classes?: string | string[];
  content?: string;
  id?: string;
  instance?: string;
  title: string;
  type?: AlertTypes;
  toastOptions?: AlertOptions;
  status?: AlertStatuses;
}

export interface AlertOptions {
  allowsMultiple?: boolean;
  duration?: number;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  limit?: number;
  preventDuplicates?: boolean;
  verticalPosition?: MatSnackBarVerticalPosition;
}

export interface AdditionalClasses {
  'type-alert': boolean;
  'type-inline': boolean;
  'type-toast': boolean;

  [key: string]: boolean;
}

export type AlertTypes = 'alert' | 'inline' | 'toast';
export type AlertStatuses =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'information';

export const toastDefaultOptions: AlertOptions = {
  /**
   * Whether it's possible to display multiple alerts at the same time.
   */
  allowsMultiple: true,

  /**
   * The length of time in milliseconds to wait before the alert dismisses automatically.
   */
  duration: 5000,

  /**
   * The horizontal position of the alert.
   */
  horizontalPosition: 'center',

  /*
   * Sets a limit of alerts displayed simultaneously. Only works when the `stackable` option is true.
   * If the number of alerts exceeds the allowed limit, the oldest alerts will be deleted.
   * 0 is infinite. Only works if `allowsMultiple` is true.
   */
  limit: 0,

  /**
   * If preventDuplicates is true, toasts with the same `title`, `content` and `status` will not be rendered.
   */
  preventDuplicates: false,

  /**
   * The vertical position of the alert.
   */
  verticalPosition: 'top',
};
