import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { ButtonModule } from '../button';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertComponent],
      imports: [BrowserAnimationsModule, MatIconModule, ButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set the icon corresponding to the default status', () => {
    component.setIcon();
    expect(component.icon).toBe('notifications');
  });

  it('should emit an event with the corresponding id as parameter', () => {
    spyOn(component.onDestroy, 'emit');
    component.close();

    fixture.detectChanges();

    expect(component.onDestroy.emit).toHaveBeenCalledWith(component.id);
  });
});


