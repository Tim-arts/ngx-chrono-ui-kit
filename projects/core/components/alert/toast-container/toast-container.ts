import { ComponentRef } from '@angular/core';

import { ToastContainerComponent } from './toast-container.component';
import { OverlayComponent } from '../overlay/overlay.component';

export interface ToastContainerReferences {
  [key: string]: ComponentRef<ToastContainerComponent>;
}

export interface OverlayReferences {
  [key: string]: ComponentRef<OverlayComponent>;
}
