import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from '../button';
import { DirectivesModule } from '../../directives';

import { MenuExpansionPanelComponent } from './menu-expansion-panel.component';

@NgModule({
  declarations: [MenuExpansionPanelComponent],
  exports: [MenuExpansionPanelComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    DirectivesModule,
    ButtonModule,
  ],
})
export class MenuExpansionPanelModule {}
