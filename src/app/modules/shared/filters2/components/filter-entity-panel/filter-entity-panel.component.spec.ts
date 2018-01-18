import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterEntityPanelComponent } from './filter-entity-panel.component';

describe('FilterEntityPanelComponent', () => {
  let component: FilterEntityPanelComponent;
  let fixture: ComponentFixture<FilterEntityPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterEntityPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterEntityPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
