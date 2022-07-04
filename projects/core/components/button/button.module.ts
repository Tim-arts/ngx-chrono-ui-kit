import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

import { ButtonComponent } from './button.component';

import { DirectivesModule } from '../../directives';

@NgModule({
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
  imports: [CommonModule, MatIconModule, MatRippleModule, DirectivesModule],
})
export class ButtonModule {}
