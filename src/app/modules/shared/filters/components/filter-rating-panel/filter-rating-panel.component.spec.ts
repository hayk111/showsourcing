import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRatingPanelComponent } from './filter-rating-panel.component';

describe('FilterRatingPanelComponent', () => {
  let component: FilterRatingPanelComponent;
  let fixture: ComponentFixture<FilterRatingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterRatingPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRatingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
