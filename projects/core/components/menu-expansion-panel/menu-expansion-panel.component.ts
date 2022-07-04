import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { IconService } from '../../services';

import { MenuExpansionPanelTitle } from './menu-expansion-panel';
import { ButtonOptions, ButtonIcon } from '../button/button';

@Component({
  selector: 'ui-kit-menu-expansion-panel',
  templateUrl: './menu-expansion-panel.component.html',
  styleUrls: ['./menu-expansion-panel.component.css'],
  animations: [trigger('visibilityState', [state('true', style({
    opacity: 1, display: 'block',
  })), state('false', style({
    opacity: 0, display: 'none',
  })), transition('true <=> false', animate('150ms'))])],
  encapsulation: ViewEncapsulation.None,
})
export class MenuExpansionPanelComponent {
  /**
   * Defines the title of the component
   * - text corresponds to the actual title displayed
   * - number corresponds to additional information as the line number
   */
  @Input() title: MenuExpansionPanelTitle = {
    text: 'Titre du menu', number: null,
  };

  /*
   * Whether the component should be disabled
   */
  @Input() disabled: boolean = false;

  /*
   * Whether the component should be expanded
   */
  @Input() expanded: boolean = true;

  /*
   * Whether the chevron (⌃) icon is displayed
   */
  @Input() hideToggle: boolean = false;

  /*
   * Whether the close (X) icon is displayed
   */
  @Input() hideClose: boolean = false;

  /*
   * Whether the draggable icon is displayed
   */
  @Input() draggable: boolean = true;

  /*
   * Node or selector that will be used to determine the element to which the draggable's position will be constrained.
   * If a string is passed in, it'll be used as a selector that will be matched starting from the element's parent and going up the DOM until a match has been found.
   */
  @Input() draggableBoundary: string | ElementRef<HTMLElement> | HTMLElement = 'body';

  /*
   * Whether the component is visible
   */
  @Input() visible: boolean = true;

  /*
   * A list of icons that can be added into the header, on the right side
   */
  @Input() headerIcons: ButtonOptions[] = [{
    icon: {
      fontIcon: 'close',
    },
  }];

  constructor(private iconsService: IconService) {}

  /**
   * Public method to toggle the panel visibility
   */
  togglePanelVisibility(): void {
    this.visible = !this.visible;
  }

  /**
   * Checks if the icon is the close one
   *
   * @param {ButtonIcon} icon - Icon passed as parameter
   * @return {Boolean}
   */
  isCloseIcon(icon: ButtonIcon): boolean {
    return this.iconsService.isCloseIcon(icon);
  }

  /**
   * Execute the user action passed as parameter
   *
   * @param {Event} event - User event
   * @param {ButtonOptions} options - Icon options passed as parameter
   */
  executeIconAction(event: Event, options: ButtonOptions): void {
    if (!options?.icon) return;
    this.iconsService.executeIconAction(event, options?.icon);
  }

  /**
   * Verifies that the icon can be displayed if:
   *  - the panel is not disabled
   *  - the icon is not the close icon
   *  - the icon is set
   *  - the icon is not disabled
   *
   * @param {ButtonOptions} options - Icon options passed as parameter
   * @return {Boolean}
   */
  displayIcon(options: ButtonOptions): boolean {
    if (!options?.icon) return false;
    if (this.disabled || (this.hideClose && this.isCloseIcon(options.icon))) return false;
    return !(!(options && options?.icon) || options?.icon?.disabled);
  }
}
