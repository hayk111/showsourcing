import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBtnsPanelComponent } from './filter-btns-panel.component';

describe('FilterBtnsPanelComponent', () => {
  let component: FilterBtnsPanelComponent;
  let fixture: ComponentFixture<FilterBtnsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterBtnsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBtnsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
