import { Injectable } from '@angular/core';

import { ButtonIcon } from '../../components/button/button';

export const exceptionIcons: string[] = ['close', 'drag_indicator'];

@Injectable({
  providedIn: 'root',
})
export class IconService {
  /**
   * Checks the validity of the icon passed as parameter
   *
   * @param {ButtonIcon} icon
   */
  checkIconValidity(icon: ButtonIcon): void {
    if (!icon) return;
    if (!this.isPartOfExceptionsIcons(icon) && !this.hasActionAuthorized(icon)) {
      console.warn(`Icon action (${icon?.fontIcon}) has not been defined correctly. It should be a function.`);
    }
  }

  /**
   * Checks if the icon passed as parameter is one of the exception icons
   *
   * @param {ButtonIcon} icon
   * @return {Boolean}
   */
  isPartOfExceptionsIcons(icon: ButtonIcon): boolean {
    if (!icon || !icon?.fontIcon) return false;
    return (exceptionIcons.indexOf(icon?.fontIcon) > -1 && icon?.action === undefined);
  }

  /**
   * Checks if the icon passed as parameter is not part of the exceptions and has a defined action
   *
   * @param {ButtonIcon} icon
   * @return {Boolean}
   */
  hasActionAuthorized(icon: ButtonIcon): boolean {
    if (!icon || Object.keys(icon).length === 0) return false;
    return !this.isPartOfExceptionsIcons(icon) && this.hasDefinedAction(icon);
  }

  /**
   * Checks if the icon action is valid enough to be executed
   *
   * @param {ButtonIcon} icon
   * @return {Boolean}
   */
  hasDefinedAction(icon: ButtonIcon): boolean {
    return icon && typeof icon?.action === 'function';
  }

  /**
   * Checks if the icon matches the close icon
   *
   * @param {ButtonIcon} icon
   * @return {Boolean}
   */
  isCloseIcon(icon: ButtonIcon): boolean {
    return icon?.fontIcon === 'close' && icon?.action === undefined;
  }

  /**
   * Executes the function passed as parameter
   *
   * @param {Event} event
   * @param {ButtonIcon} icon
   */
  executeIconAction(event: Event, icon: ButtonIcon): void {
    if (!icon?.action) return;
    if (this.hasDefinedAction(icon)) {
      icon.action(event);
    }
  }
}
