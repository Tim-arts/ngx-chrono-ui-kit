export interface ActionDelegate {
  (event: Event): any | void;
}

export interface ButtonIcon {
  fontIcon?: string;
  text?: string;
  action?: ActionDelegate | null;
  disabled?: boolean;
}

export interface ButtonOptions {
  icon?: ButtonIcon;
  ripple?: ButtonRipple;
}

export interface ButtonRipple {
  disabled?: boolean;
}

export declare type ButtonColors =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary';
export declare type ButtonTypes =
  | 'elevated'
  | 'filled'
  | 'filled-tonal'
  | 'outlined'
  | 'text'
  | 'fab'
  | 'extended-fab';
export declare type ButtonSizes = 'mini' | 'regular' | 'large';
export declare type ButtonIconPosition = 'none' | 'left' | 'right' | 'center';

export const rippleDefaultOptions: ButtonRipple = {
  disabled: false,
};
