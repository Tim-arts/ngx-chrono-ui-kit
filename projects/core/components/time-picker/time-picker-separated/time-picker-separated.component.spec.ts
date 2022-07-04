import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerSeparatedComponent } from './time-picker-separated.component';

describe('TimePickerComponent', () => {
  let component: TimePickerSeparatedComponent;
  let fixture: ComponentFixture<TimePickerSeparatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimePickerSeparatedComponent],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerSeparatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
