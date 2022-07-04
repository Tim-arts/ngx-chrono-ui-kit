import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

import { TimeRangePickerComponent } from "./time-range-picker.component";
import { TimeRangePickerSeparatedModule } from "./time-range-picker-separated/time-range-picker-separated.module";

@NgModule({
  declarations: [TimeRangePickerComponent],
  exports: [TimeRangePickerComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TimeRangePickerSeparatedModule,
  ],
})
export class TimeRangePickerModule { }

