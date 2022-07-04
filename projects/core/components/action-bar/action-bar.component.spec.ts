import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { By } from '@angular/platform-browser';

import { ButtonModule } from '../button';

import { ActionBarComponent } from './action-bar.component';

describe('ActionBarComponent', () => {
  let component: ActionBarComponent;
  let fixture: ComponentFixture<ActionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionBarComponent],
      imports: [DragDropModule, ButtonModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should display the draggable icon when \'draggable\' is set to true', () => {
    expect(fixture.debugElement.query(By.css('.dragging-handle'))).toBeTruthy();
  });

  it('Should not display the draggable icon when \'draggable\' is set to false', () => {
    component.draggable = false;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.dragging-handle'))).toBeNull();
  });

  it('should have a defined state after initialization', () => {
    const state: boolean = !!component.state;
    expect(state).toBeTrue();
  });
});
