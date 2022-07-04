import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimePickerSeparatedComponent } from './time-picker-separated.component';
import { ButtonModule } from '../../button';
import { DirectivesModule } from '../../../directives';

@NgModule({
  declarations: [TimePickerSeparatedComponent],
  exports: [TimePickerSeparatedComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DirectivesModule,
  ],
})
export class TimePickerSeparatedModule {}

