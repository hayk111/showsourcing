import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSmartPanelComponent } from './filter-smart-panel.component';

describe('FilterSmartPanelComponent', () => {
  let component: FilterSmartPanelComponent;
  let fixture: ComponentFixture<FilterSmartPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSmartPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSmartPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
