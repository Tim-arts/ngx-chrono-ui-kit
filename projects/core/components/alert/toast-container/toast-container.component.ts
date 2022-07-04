import {
  ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, OnInit, ViewEncapsulation,
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { OverlayReferences, ToastContainerReferences } from './toast-container';
import { Alert, toastDefaultOptions } from '../alert';
import { OverlayComponent } from '../overlay/overlay.component';
import { allEqualToValue, generateUuid } from '../../../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toasts = new Subject<Alert>();

  toastContainerReferences: ToastContainerReferences = {};
  overlayReferences: OverlayReferences = {};

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
  ) {
  }

  /**
   * Initializes the alert
   *
   * @param {Alert} alert - Alert configuration
   * @param {any} componentClass - Schematic component class from the component using the service
   */
  create(alert: Alert, componentClass: any) {
    alert.toastOptions = { ...toastDefaultOptions, ...alert.toastOptions };
    alert.instance = componentClass.constructor.name;
    alert.type = 'toast';

    if (!alert?.instance) throw new Error('Couldn\'t retrieve the component instance');

    if (!this.toastContainerReferences?.[alert?.instance]) {
      this.injectAlertContainers(alert, alert?.instance);
    }

    setTimeout(() => {
      this._toasts.next(alert);
    }, 0);
  }

  /**
   * Returns an observable containing the alerts
   *
   * @return {Observable<Alert>}
   */
  get toasts(): Observable<Alert> {
    return this._toasts.asObservable();
  }

  /**
   * Injects toast containers instances both into the service and the DOM
   *
   * @param {Alert} alert - Alert configuration
   * @param {String} instance - Name of the component class using the service
   */
  private injectAlertContainers(alert: Alert, instance: string): void {
    // Creates component instance
    const toastContainerFactory = this.componentFactoryResolver.resolveComponentFactory(ToastContainerComponent);
    const overlayFactory = this.componentFactoryResolver.resolveComponentFactory(OverlayComponent);

    // Enables the dynamic component to make use of the dependency injection
    const toastContainerRef = toastContainerFactory.create(this.injector);
    toastContainerRef.instance.instance = instance;
    const overlayRef: ComponentRef<any> = overlayFactory.create(this.injector);

    if (alert?.toastOptions) {
      overlayRef.instance.horizontalPosition = alert.toastOptions.horizontalPosition;
      overlayRef.instance.verticalPosition = alert!.toastOptions.verticalPosition;
    }

    // Attach the new component to the DOM
    const toastContainerDomElement: HTMLElement = (toastContainerRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const overlayDomElement: HTMLElement = (overlayRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    overlayDomElement.querySelector('.overlay-container')?.appendChild(toastContainerDomElement);

    document.body.appendChild(overlayDomElement);

    // Attach the new component to the angular component tree
    this.appRef.attachView(toastContainerRef.hostView);
    this.appRef.attachView(overlayRef.hostView);

    if (this.toastContainerReferences?.[instance]) return;
    this.toastContainerReferences[instance] = toastContainerRef;

    if (this.overlayReferences?.[instance]) return;
    this.overlayReferences[instance] = overlayRef;
  }

  /**
   * Destroys toast containers linked to a specific instance
   *
   * @param {String} instance - Name of the component class using the service
   */
  destroyToastContainer(instance: string): void {
    if (this.toastContainerReferences[instance]) {
      this.appRef.detachView(this.toastContainerReferences[instance].hostView);
    }
    if (this.overlayReferences[instance]) {
      this.appRef.detachView(this.overlayReferences[instance].hostView);
    }

    if (this.toastContainerReferences[instance]) {
      this.toastContainerReferences[instance].destroy();
    }
    if (this.overlayReferences[instance]) {
      this.overlayReferences[instance].destroy();
    }

    delete this.toastContainerReferences[instance];
    delete this.overlayReferences[instance];
  }
}

@Component({
  selector: 'ui-kit-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToastContainerComponent implements OnInit {
  toasts: Alert[] = [];
  serviceLink: Subscription = new Subscription();
  instance: string;

  constructor(private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.serviceLink = this.toastService.toasts.subscribe((alert: Alert) => {
      if (this.instance === alert.instance) {
        this.configure(alert);
      }
    });
  }

  ngOnDestroy(): void {
    this.serviceLink.unsubscribe();
  }

  /**
   * Configure the toast in order to display it
   *
   * @param {Alert} alert - Alert configuration
   */
  configure(alert: Alert): void {
    alert.id = generateUuid();
    alert.type = 'toast';

    if (!alert?.toastOptions) throw new Error('Alert toastOptions are not defined');

    if (alert.toastOptions.preventDuplicates && this.isDuplicate(alert)) return;
    if (!alert.toastOptions.allowsMultiple) {
      this.toasts.length = 0;
    }
    if (alert.toastOptions.limit !== 0) {
      if (this.toasts.length === alert.toastOptions.limit) {
        this.toasts.splice(0, 1);
      }
    }

    this.toasts.push(alert);

    if (alert.toastOptions.duration !== 0) {
      setTimeout(() => {
        this.toasts.shift();
        this.destroyToastContainer();
      }, alert.toastOptions.duration);
    }
  }

  /**
   * Destroys the toast instance
   *
   * @param {String} id - id of the toast being destroyed
   */
  destroyToast(id: string): void {
    if (!id) return;

    const index: number = this.toasts.findIndex((alert: Alert) => alert.id === id);
    this.toasts.splice(index, 1);
    this.destroyToastContainer();
  }

  /**
   * Clears toast containers once every toast have been dismissed
   */
  destroyToastContainer(): void {
    if (this.toasts.length === 0) {
      this.toastService.destroyToastContainer(this.instance);
    }
  }

  /**
   * Checks if the toast already has a duplicate in memory
   *
   * @param {Alert} alert - Alert configuration
   * @return {Boolean}
   */
  isDuplicate(alert: Alert): boolean {
    const isTitleEqual: boolean = this.toasts.filter((x: Alert) => x.title === alert.title).length > 0;
    const isContentEqual: boolean = this.toasts.filter((x: Alert) => x.content === alert.content).length > 0;
    const isStatusEqual: boolean = this.toasts.filter((x: Alert) => x.status === alert.status).length > 0;

    return allEqualToValue([isTitleEqual, isContentEqual, isStatusEqual], true);
  }
}
