import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastContainerComponent } from './toast-container.component';

import { AlertModule } from '../alert.module';
import { OverlayComponent } from '../overlay/overlay.component';

@NgModule({
  declarations: [ToastContainerComponent, OverlayComponent],
  exports: [ToastContainerComponent, OverlayComponent],
  imports: [CommonModule, AlertModule],
})
export class ToastContainerModule {}
