import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { AlertComponent } from './alert.component';

import { ButtonModule } from '../button/button.module';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [AlertComponent],
  exports: [AlertComponent],
  imports: [CommonModule, BrowserAnimationsModule, MatIconModule, MatDatepickerModule, ButtonModule],
  providers: [MatDatepickerModule],
})
export class AlertModule {}
