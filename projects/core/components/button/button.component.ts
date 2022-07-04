import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { IconService } from '../../services/icons/icon.service';

import { ButtonColors, ButtonIconPosition, ButtonSizes, ButtonRipple, ButtonTypes, ButtonOptions, rippleDefaultOptions } from './button';

@Component({
  selector: 'ui-kit-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'd-inline-flex align-items-center',
    '[style.pointer-events]': '\'none\'',
  },
})
export class ButtonComponent implements OnInit {
  private _disabled: boolean = false;

  /*
   * Makes the container not clickable, so only the button actually triggers an action if clicked
   */
  @HostBinding('style.pointer-events') pointerEvents = 'auto';

  /*
   * What theme color to use
   */
  @Input() color: ButtonColors = 'default';

  /*
   * What type to use
   */
  @Input() type: ButtonTypes = 'elevated';

  /*
   * How large the button should be
   */
  @Input() size: ButtonSizes = 'regular';

  /*
   * Which icon to display
   */
  @Input() icon: string | undefined;

  /*
   * Where to display the icon inside its container
   */
  @Input() iconPosition: ButtonIconPosition = 'none';

  /*
   * If the button should be disabled
   */
  @Input() get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
    this.pointerEvents = this._disabled ? 'none' : 'auto';
  }

  /*
   * Only working in FAB mode, display the button with a white background
   */
  @Input() inverted: boolean = false;

  /*
   * If the button should display an icon menu because it is attached to a matMenu
   */
  @Input() hasMenu: boolean = false;

  /*
   * Button content
   */
  @Input() textContent: string | undefined;

  /*
   * While loading the button dynamically, which options to display
   */
  @Input() buttonOptions: ButtonOptions = {};

  /*
   * User input interaction indicated by the ripple. Options to customize the ripple
   * Documentation can be found here: https://material.angular.io/components/ripple/api#MatRipple
   */
  @Input() rippleOptions: ButtonRipple = {};

  constructor(private iconService: IconService) {}

  ngOnInit(): void {
    this.rippleOptions = { ...rippleDefaultOptions, ...this.rippleOptions };

    if (this.buttonOptions?.icon) {
      this.iconService.checkIconValidity(this.buttonOptions.icon);
    }
  }
}
