import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManoeuvreComponent } from './manoeuvre.component';

describe('ManoeuvreComponent', () => {
  let component: ManoeuvreComponent;
  let fixture: ComponentFixture<ManoeuvreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManoeuvreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManoeuvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
