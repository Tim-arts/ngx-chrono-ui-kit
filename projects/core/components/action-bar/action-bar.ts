import { ButtonSizes, ButtonTypes, ButtonIconPosition } from '../button';

export declare type ActionBarDirection = 'horizontal' | 'vertical';

export interface State {
  type: ButtonTypes;
  size: ButtonSizes;
  iconPosition: ButtonIconPosition;
  inverted: boolean;
}
