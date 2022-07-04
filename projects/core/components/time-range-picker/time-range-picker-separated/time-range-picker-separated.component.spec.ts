import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRangePickerSeparatedComponent } from './time-range-picker-separated.component';

describe('TimePickerComponent', () => {
  let component: TimeRangePickerSeparatedComponent;
  let fixture: ComponentFixture<TimeRangePickerSeparatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeRangePickerSeparatedComponent],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRangePickerSeparatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
