import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

import { ActionBarDirection, State } from './action-bar';

@Component({
  selector: 'ui-kit-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ActionBarComponent {
  /*
   * Whether the action bar should be draggable or not. If true, it'll display the draggable icon
   */
  @Input() draggable: boolean = true;

  /*
   * Node or selector that will be used to determine the element to which the draggable's position will be constrained.
   * If a string is passed in, it'll be used as a selector that will be matched starting from the element's parent and going up the DOM until a match has been found.
   */
  @Input() draggableBoundary: string | ElementRef<HTMLElement> | HTMLElement = 'body';

  /*
   * Whether the component should be fragmented or not
   */
  @Input() fragmented: boolean = false;

  /*
   * Sets the direction on which the component should be displayed
   */
  @Input() direction: ActionBarDirection = 'horizontal';

  /**
   * Get the default options depending on the 'fragmented' state
   *
   * @return {State}
   */
  get state(): State {
    const defaultState: State = {
      type: 'text',
      size: 'mini',
      iconPosition: 'center',
      inverted: false,
    };
    const fragmentedState: State = {
      type: 'fab',
      size: 'regular',
      iconPosition: 'center',
      inverted: true,
    };

    return this.fragmented ? fragmentedState : defaultState;
  }
}
