import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProductSortPanelComponent } from './filter-product-sort-panel.component';

describe('FilterProductSortPanelComponent', () => {
  let component: FilterProductSortPanelComponent;
  let fixture: ComponentFixture<FilterProductSortPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterProductSortPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterProductSortPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
