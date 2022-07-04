import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManoeuvresComponent } from './manoeuvres/manoeuvres.component';
import { ManoeuvreListComponent } from './manoeuvre-list/manoeuvre-list.component';
import { ManoeuvreComponent } from './manoeuvre/manoeuvre.component';
import { MaterialModule } from '../../shared/material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from '../button';
import { ManoeuvreService } from './manoeuvre.service';
@NgModule({
  declarations: [
    ManoeuvreComponent,
    ManoeuvreListComponent,
    ManoeuvresComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ButtonModule,
  ],
  providers: [ManoeuvreService],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ManoeuvresComponent,
    ManoeuvreListComponent,
    ManoeuvreComponent,
  ],
})
export class ManoeuvresModule { }
