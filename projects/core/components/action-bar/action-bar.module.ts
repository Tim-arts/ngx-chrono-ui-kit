import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

import { ButtonModule } from '../button';
import { DirectivesModule } from '../../directives';

import { ActionBarComponent } from './action-bar.component';

@NgModule({
  declarations: [ActionBarComponent],
  exports: [ActionBarComponent],
  imports: [CommonModule, MatDividerModule, DirectivesModule, ButtonModule],
})
export class ActionBarModule {}
