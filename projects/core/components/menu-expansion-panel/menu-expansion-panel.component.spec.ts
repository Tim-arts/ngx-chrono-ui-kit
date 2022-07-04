import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ButtonModule } from '../button';

import { MenuExpansionPanelComponent } from './menu-expansion-panel.component';

describe('ButtonsComponent', () => {
  let component: MenuExpansionPanelComponent;
  let fixture: ComponentFixture<MenuExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuExpansionPanelComponent],
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        DragDropModule,
        ButtonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
