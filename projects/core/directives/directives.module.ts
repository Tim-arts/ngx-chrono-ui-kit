import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SuperchargingInputNumberDirective } from './superchargingInputNumber/supercharging-input-number.directive';

@NgModule({
  declarations: [
    SuperchargingInputNumberDirective,
  ],
  imports: [CommonModule, DragDropModule],
  exports: [DragDropModule, SuperchargingInputNumberDirective],
})
export class DirectivesModule {}
