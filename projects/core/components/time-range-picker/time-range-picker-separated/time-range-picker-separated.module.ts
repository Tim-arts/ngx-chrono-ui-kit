import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeRangePickerSeparatedComponent } from './time-range-picker-separated.component';
import { ButtonModule } from '../../button';
import { DirectivesModule } from '../../../directives';
import { TimePickerSeparatedModule } from "../../time-picker";

@NgModule({
  declarations: [TimeRangePickerSeparatedComponent],
  exports: [TimeRangePickerSeparatedComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DirectivesModule,
    TimePickerSeparatedModule,
  ],
})
export class TimeRangePickerSeparatedModule { }

